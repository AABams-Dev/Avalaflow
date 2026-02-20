import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

/**
 * API Route: /api/verify-nfc
 * Securely verifies an NFC UID and returns a signed message for minting.
 * This simulates a Node.js backend.
 */
export async function POST(request: Request) {
    try {
        const { nfcUid, walletAddress } = await request.json();

        if (!nfcUid || !walletAddress) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        // 1. Verify NFC UID (In production, this would check a secure database)
        // For this demonstration, we'll assume any UID starting with "AVA-" is valid.
        if (!nfcUid.startsWith('AVA-')) {
            return NextResponse.json({ error: 'Invalid NFC UID' }, { status: 403 });
        }

        // 2. Prevent replay/double minting (In production, check DB)
        // const isUsed = await db.checkNfc(nfcUid);
        // if (isUsed) return ...

        // 3. SECURE SIGNING
        // The private key should be stored in environment variables.
        // NEVER hardcode private keys in production.
        const PRIVATE_KEY = process.env.VERIFIER_PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
        const wallet = new ethers.Wallet(PRIVATE_KEY);

        // Prepare message for EIP-712 or simple hash
        // Match the logic in AvalaflowNFT.sol: keccak256(abi.encodePacked(msg.sender, nfcUid))
        const messageHash = ethers.solidityPackedKeccak256(
            ['address', 'string'],
            [walletAddress, nfcUid]
        );

        // Sign the message
        const signature = await wallet.signMessage(ethers.getBytes(messageHash));

        return NextResponse.json({
            success: true,
            nfcUid,
            signature,
            message: 'NFC UID verified and authorized for minting.'
        });

    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
