import { createPublicClient, http, parseAbi } from 'viem';
import { avalancheFuji } from 'viem/chains';

const client = createPublicClient({
  chain: avalancheFuji,
  transport: http()
});

const AVALA_NFT_ADDRESS = "0xce091967269601007e4f633d6a455ac4ec36987f"; // Maybe check from .env? I couldn't read .env fully

const ABI = parseAbi([
    "function totalSupply() view returns (uint256)",
    "function name() view returns (string)"
]);

async function main() {
    try {
        const name = await client.readContract({
            address: AVALA_NFT_ADDRESS,
            abi: ABI,
            functionName: 'name',
        });
        console.log("Name:", name);
        const totalSupply = await client.readContract({
            address: AVALA_NFT_ADDRESS,
            abi: ABI,
            functionName: 'totalSupply',
        });
        console.log("Total Supply:", totalSupply);
    } catch (e) {
        console.error("Error:", e.message);
    }
}
main();
