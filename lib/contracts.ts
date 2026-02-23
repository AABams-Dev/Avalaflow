import { parseAbi } from 'viem';

export const AVALA_NFT_ABI = parseAbi([
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function tokenURI(uint256) view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function ownerOf(uint256) view returns (address)",
    "function mintFigure(string, bytes, string) external",
    "event FigureMinted(address indexed owner, uint256 indexed tokenId, string nfcUid)"
]);

export const STAKING_ABI = parseAbi([
    "function stake(uint256) external",
    "function unstake(uint256) external",
    "function calculateRewards(uint256) view returns (uint256)",
    "function stakedCount(address) view returns (uint256)",
    "function vault(uint256) view returns (uint256 tokenId, uint256 timestamp, address owner)"
]);

export const TOKEN_ABI = parseAbi([
    "function balanceOf(address) view returns (uint256)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
]);

// Placeholders - User should replace with their deployed contract addresses
export const AVALA_NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS || "0xce091967269601007e4f633d6a455ac4ec36987f";
export const AVALA_STAKING_ADDRESS = process.env.NEXT_PUBLIC_STAKING_ADDRESS || "0xcc29967269601007e4f633d6a455ac4ec36987f";
export const AVALA_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS || "0xbb191967269601007e4f633d6a455ac4ec36987f";
