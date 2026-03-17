'use client';

import { useReadContract, useReadContracts } from 'wagmi';
import { AVALA_NFT_ABI, AVALA_NFT_ADDRESS } from '@/lib/contracts';
import { useEffect, useState } from 'react';

export function useNFTs() {
    const { data: totalSupply, isLoading: isLoadingSupply, isSuccess: isSupplySuccess, isError: isSupplyError } = useReadContract({
        address: AVALA_NFT_ADDRESS as `0x${string}`,
        abi: AVALA_NFT_ABI,
        functionName: 'totalSupply',
    });

    const tokenCount = totalSupply ? Number(totalSupply) : 0;
    const limit = Math.min(tokenCount, 12);

    const contracts = [];
    if (isSupplySuccess && tokenCount > 0) {
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
    }

    const { data: nftDetails, isLoading: isLoadingDetails } = useReadContracts({
        contracts: contracts as any,
        query: {
            enabled: contracts.length > 0,
        }
    });

    const [nfts, setNfts] = useState<any[]>([]);
    const [isFormatting, setIsFormatting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        async function formatNFTs() {
            if (tokenCount === 0 || isSupplyError) {
                if (isMounted) setNfts([]);
                return;
            }
            if (nftDetails && nftDetails.length === contracts.length) {
                if (isMounted) setIsFormatting(true);
                const formattedNfts = [];
                for (let i = 0; i < limit; i++) {
                    const uriResult = nftDetails[i * 2]?.result as string;
                    const ownerResult = nftDetails[i * 2 + 1]?.result as string;

                    let imageUrl = '';
                    let nftName = `Avalaflow #${i}`;
                    let rarity = i % 3 === 0 ? "Legendary" : i % 2 === 0 ? "Rare" : "Common";

                    try {
                        if (uriResult) {
                            const httpUrl = uriResult.startsWith('ipfs://') ? uriResult.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/') : uriResult;
                            const response = await fetch(httpUrl);
                            if (response.ok) {
                                const metadata = await response.json();
                                imageUrl = metadata.image ? (metadata.image.startsWith('ipfs://') ? metadata.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/') : metadata.image) : '';
                                if (metadata.name) nftName = metadata.name;
                                if (metadata.attributes) {
                                    const rarityTrait = metadata.attributes.find((a: any) => a.trait_type === 'Rarity');
                                    if (rarityTrait) rarity = rarityTrait.value;
                                }
                            }
                        }
                    } catch (e) {
                        console.error("Failed to fetch metadata for token", i, e);
                    }

                    formattedNfts.push({
                        id: i,
                        tokenId: i.toString(),
                        name: nftName,
                        owner: ownerResult ? `${ownerResult.slice(0, 6)}...${ownerResult.slice(-4)}` : 'Unknown',
                        uri: uriResult,
                        image: imageUrl,
                        price: "Unlisted",
                        rarity: rarity,
                        color: rarity === "Legendary" ? "text-brand-red" : rarity === "Rare" ? "text-brand-mint" : "text-white/40",
                        bg: rarity === "Legendary" ? "bg-brand-red/10" : rarity === "Rare" ? "bg-brand-mint/10" : "bg-white/5",
                    });
                }
                if (isMounted) {
                    setNfts(formattedNfts);
                    setIsFormatting(false);
                }
            }
        }
        formatNFTs();
        return () => {
            isMounted = false;
        };
    }, [nftDetails, limit, tokenCount, isSupplyError]);

    return {
        nfts,
        isLoading: isLoadingSupply || isLoadingDetails || isFormatting || (isSupplySuccess && tokenCount > 0 && nfts.length === 0 && !isSupplyError),
        tokenCount
    };
}
