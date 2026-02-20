// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title AvalaflowNFT
 * @dev Dynamic NFT contract that bridges physical NFC collectibles with digital ownership.
 * Features:
 * - Secure minting via backend-signed NFC UIDs.
 * - Dynamic metadata updates based on gameplay or achievements.
 * - Built for the Avalanche C-Chain.
 */
contract AvalaflowNFT is ERC721, ERC721URIStorage, Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    uint256 private _nextTokenId;
    address public verifierAddress;

    // Mapping from NFC UID to Token ID to prevent double minting
    mapping(string => uint256) public nfcToTokenId;
    // Mapping from NFC UID to whether it has been used
    mapping(string => bool) public nfcUsed;

    event FigureMinted(address indexed owner, uint256 indexed tokenId, string nfcUid);
    event MetadataUpdated(uint256 indexed tokenId, string newUri);

    constructor(address initialOwner, address _verifierAddress)
        ERC721("Avalaflow Collectible", "AVAFLO")
        Ownable(initialOwner)
    {
        verifierAddress = _verifierAddress;
    }

    /**
     * @dev Sets the verifier address responsible for signing NFC UIDs.
     */
    function setVerifierAddress(address _verifierAddress) external onlyOwner {
        verifierAddress = _verifierAddress;
    }

    /**
     * @dev Mints a new figure NFT. Requires a valid signature from the verifier.
     * @param nfcUid The unique identifier of the NFC tag.
     * @param signature The signature from the backend verifier.
     * @param uri The initial metadata URI (IPFS).
     */
    function mintFigure(
        string calldata nfcUid,
        bytes calldata signature,
        string calldata uri
    ) external {
        require(!nfcUsed[nfcUid], "NFC UID already used for minting");
        
        // Verify signature
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, nfcUid));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        
        require(ethSignedMessageHash.recover(signature) == verifierAddress, "Invalid verifier signature");

        uint256 tokenId = _nextTokenId++;
        nfcUsed[nfcUid] = true;
        nfcToTokenId[nfcUid] = tokenId;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        emit FigureMinted(msg.sender, tokenId, nfcUid);
    }

    /**
     * @dev Updates the metadata URI of a token. Can be called by the owner or authorized game controllers.
     * In a production environment, this might be restricted to a "Game Engine" contract.
     */
    function updateMetadata(uint256 tokenId, string calldata newUri) external onlyOwner {
        _setTokenURI(tokenId, newUri);
        emit MetadataUpdated(tokenId, newUri);
    }

    // Overrides for ERC721URIStorage

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
