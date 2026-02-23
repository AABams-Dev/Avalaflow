'use client';

import { useReadContract, useReadContracts } from 'wagmi';
import { AVALA_NFT_ABI, AVALA_NFT_ADDRESS } from '@/lib/contracts';
import { useEffect, useState } from 'react';

export function useNFTs() {
    // 1. Fetch total supply to know how many NFTs to fetch
    const { data: totalSupply, isLoading: isLoadingSupply } = useReadContract({
        address: AVALA_NFT_ADDRESS as `0x${string}`,
        abi: AVALA_NFT_ABI,
        functionName: 'totalSupply',
    });

    // 2. Prepare calls for tokenURIs and Owners (Example: fetch first 6)
    const tokenCount = totalSupply ? Number(totalSupply) : 0;
    const limit = Math.min(tokenCount, 6);

    // We'll fetch the most recent ones (if we know the order, but let's just do 0-5 for now)
    const contracts = [];
    for (let i = 0; i < limit; i++) {
        contracts.push({
            address: AVALA_NFT_ADDRESS as `0x${string}`,
            abi: AVALA_NFT_ABI,
            functionName: 'tokenURI',
            args: [BigInt(i)],
        });
        contracts.push({
            address: AVALA_NFT_ADDRESS as `0x${string}`,
            abi: AVALA_NFT_ABI,
            functionName: 'ownerOf',
            args: [BigInt(i)],
        });
    }

    const { data: nftDetails, isLoading: isLoadingDetails } = useReadContracts({
        contracts,
    });

    const [nfts, setNfts] = useState<any[]>([]);

    useEffect(() => {
        if (nftDetails) {
            const formattedNfts = [];
            for (let i = 0; i < limit; i++) {
                const uri = nftDetails[i * 2]?.result as string;
                const owner = nftDetails[i * 2 + 1]?.result as string;

                // In a real app, you'd fetch the metadata from the URI (IPFS/HTTP)
                // For now, we'll format it with what we have
                formattedNfts.push({
                    id: i,
                    name: `Avalaflow #${i}`,
                    owner: owner ? `${owner.slice(0, 6)}...${owner.slice(-4)}` : 'Unknown',
                    uri: uri,
                    // Default styles for the display cards
                    price: "Unlisted",
                    rarity: i % 3 === 0 ? "Legendary" : i % 2 === 0 ? "Rare" : "Common",
                    color: i % 3 === 0 ? "text-brand-red" : i % 2 === 0 ? "text-brand-mint" : "text-white/40",
                    bg: i % 3 === 0 ? "bg-brand-red/10" : i % 2 === 0 ? "bg-brand-mint/10" : "bg-white/5",
                });
            }
            setNfts(formattedNfts);
        }
    }, [nftDetails, limit]);

    return {
        nfts,
        isLoading: isLoadingSupply || isLoadingDetails,
        tokenCount
    };
}
