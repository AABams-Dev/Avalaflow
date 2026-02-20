// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title AvalaflowStaking
 * @dev Staking contract for Avalaflow NFTs.
 * Users earn $AVA tokens for committing their digital collectibles to the vault.
 */
contract AvalaflowStaking is Ownable, ReentrancyGuard {
    
    IERC721 public immutable nftCollection;
    IERC20 public immutable rewardsToken;

    uint256 public rewardRatePerBlock = 1 * 10**16; // 0.01 $AVA per block per NFT

    struct Stake {
        uint256 tokenId;
        uint256 timestamp;
        address owner;
    }

    // Mapping from Token ID to Stake info
    mapping(uint256 => Stake) public vault;
    // Mapping from owner to number of NFTs staked
    mapping(address => uint256) public stakedCount;

    event Staked(address indexed user, uint256 tokenId);
    event Unstaked(address indexed user, uint256 tokenId, uint256 rewards);

    constructor(address _nftCollection, address _rewardsToken, address initialOwner) 
        Ownable(initialOwner) 
    {
        nftCollection = IERC721(_nftCollection);
        rewardsToken = IERC20(_rewardsToken);
    }

    /**
     * @dev Stake an NFT into the vault.
     */
    function stake(uint256 tokenId) external nonReentrant {
        require(nftCollection.ownerOf(tokenId) == msg.sender, "Not the owner");
        
        nftCollection.transferFrom(msg.sender, address(this), tokenId);
        
        vault[tokenId] = Stake({
            tokenId: tokenId,
            timestamp: block.timestamp,
            owner: msg.sender
        });

        stakedCount[msg.sender]++;
        emit Staked(msg.sender, tokenId);
    }

    /**
     * @dev Unstake an NFT and claim rewards.
     */
    function unstake(uint256 tokenId) external nonReentrant {
        Stake memory userStake = vault[tokenId];
        require(userStake.owner == msg.sender, "Not the owner of stake");

        uint256 rewards = calculateRewards(tokenId);
        
        delete vault[tokenId];
        stakedCount[msg.sender]--;
        
        nftCollection.transferFrom(address(this), msg.sender, tokenId);
        
        if (rewards > 0) {
            require(rewardsToken.balanceOf(address(this)) >= rewards, "Insufficient reward tokens in vault");
            rewardsToken.transfer(msg.sender, rewards);
        }

        emit Unstaked(msg.sender, tokenId, rewards);
    }

    /**
     * @dev Simple reward calculation based on time.
     */
    function calculateRewards(uint256 tokenId) public view returns (uint256) {
        Stake memory userStake = vault[tokenId];
        if (userStake.owner == address(0)) return 0;

        uint256 duration = block.timestamp - userStake.timestamp;
        // Mock reward logic: 1 token per 24 hours (86400 seconds)
        return (duration * 10**18) / 86400;
    }

    /**
     * @dev Emergency withdraw for owner.
     */
    function withdrawRewards(uint256 amount) external onlyOwner {
        rewardsToken.transfer(msg.sender, amount);
    }
}
