// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title AvalaflowToken ($AVA)
 * @dev Native utility token for the Avalaflow ecosystem.
 * Powers governance, staking rewards, NFT upgrades, and marketplace discounts.
 */
contract AvalaflowToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    
    // Max supply: 100,000,000 $AVA
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18;

    constructor(address initialOwner)
        ERC20("Avalaflow", "AVA")
        Ownable(initialOwner)
        ERC20Permit("Avalaflow")
    {
        // Initial mint for liquidity, ecosystem rewards, and team
        _mint(initialOwner, MAX_SUPPLY);
    }

    /**
     * @dev Burn tokens from the caller's account. Used for ecosystem sinks.
     */
    function burn(uint256 amount) public override {
        super.burn(amount);
    }
}
