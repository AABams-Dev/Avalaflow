'use client';

import { useAccount, useReadContract, useReadContracts, useWriteContract, useBalance } from 'wagmi';
import { AVALA_STAKING_ADDRESS, STAKING_ABI, AVALA_NFT_ADDRESS, AVALA_NFT_ABI, AVALA_TOKEN_ADDRESS, TOKEN_ABI } from '@/lib/contracts';
import { useEffect, useState } from 'react';
import { formatUnits, parseUnits } from 'viem';
import { avalancheFuji } from 'wagmi/chains';

export function useStakingData() {
    const { address, isConnected } = useAccount();
    const { writeContractAsync } = useWriteContract();

    // 1. Fetch live AVA balance
    const { data: balanceData } = useBalance({
        address: address,
        chainId: avalancheFuji.id,
    });

    // 2. Fetch total staked count (Global TVL)
    const { data: totalStaked } = useReadContract({
        address: AVALA_STAKING_ADDRESS as `0x${string}`,
        abi: STAKING_ABI as any,
        functionName: 'totalStaked',
    });

    // 3. Fetch user's staked count
    const { data: userStakedCount } = useReadContract({
        address: AVALA_STAKING_ADDRESS as `0x${string}`,
        abi: STAKING_ABI as any,
        functionName: 'stakedCount',
        args: address ? [address] : undefined,
        query: { enabled: !!address }
    });

    // 4. Fetch user's token balance (Rewards Token)
    const { data: tokenBalance } = useReadContract({
        address: AVALA_TOKEN_ADDRESS as `0x${string}`,
        abi: TOKEN_ABI as any,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address }
    });

    // 5. Fetch NFTs and check ownership/staking status
    // For this prototype, we'll check the first 20 tokens
    const nftChecks = [];
    for (let i = 1; i <= 20; i++) {
        nftChecks.push({
            address: AVALA_NFT_ADDRESS as `0x${string}`,
            abi: AVALA_NFT_ABI as any,
            functionName: 'ownerOf',
            args: [BigInt(i)],
        });
        nftChecks.push({
            address: AVALA_STAKING_ADDRESS as `0x${string}`,
            abi: STAKING_ABI as any,
            functionName: 'vault',
            args: [BigInt(i)],
        });
        nftChecks.push({
            address: AVALA_STAKING_ADDRESS as `0x${string}`,
            abi: STAKING_ABI as any,
            functionName: 'calculateRewards',
            args: [BigInt(i)],
        });
    }

    const { data: nftData, refetch: refetchNFTs } = useReadContracts({
        contracts: nftChecks as any,
        query: { enabled: !!address }
    });

    const [userNFTs, setUserNFTs] = useState<any[]>([]);
    const [totalRewards, setTotalRewards] = useState<string>("0.0");

    useEffect(() => {
        if (!nftData || !address) return;

        const formatted = [];
        let accrued = 0n;

        for (let i = 0; i < 20; i++) {
            const tokenId = i + 1;
            const ownerResult = nftData[i * 3];
            const vaultResult = nftData[i * 3 + 1];
            const rewardResult = nftData[i * 3 + 2];

            const owner = ownerResult?.result as string;
            const vault = vaultResult?.result as [bigint, bigint, string]; // tokenId, timestamp, owner
            const reward = rewardResult?.result as bigint || 0n;

            const isOwner = owner?.toLowerCase() === address.toLowerCase();
            const isStaked = vault && vault[2]?.toLowerCase() === address.toLowerCase();

            if (isOwner || isStaked) {
                if (isStaked) accrued += reward;

                formatted.push({
                    id: tokenId,
                    tokenId: tokenId.toString(),
                    name: `Avalaflow #${tokenId}`,
                    rarity: tokenId % 5 === 0 ? "Legendary" : tokenId % 3 === 0 ? "Epic" : "Rare",
                    multiplier: tokenId % 5 === 0 ? "2.5x" : tokenId % 3 === 0 ? "1.8x" : "1.2x",
                    staked: isStaked,
                    reward: formatUnits(reward, 18),
                    image: `https://images.unsplash.com/photo-${1614850523296 + tokenId}?w=800&q=80`
                });
            }
        }
        setUserNFTs(formatted);
        setTotalRewards(formatUnits(accrued, 18));
    }, [nftData, address]);

    // WRITE FUNCTIONS
    const stakeNFT = async (tokenId: string) => {
        return writeContractAsync({
            address: AVALA_STAKING_ADDRESS as `0x${string}`,
            abi: STAKING_ABI as any,
            functionName: 'stake',
            args: [BigInt(tokenId)],
        });
    };

    const unstakeNFT = async (tokenId: string) => {
        return writeContractAsync({
            address: AVALA_STAKING_ADDRESS as `0x${string}`,
            abi: STAKING_ABI as any,
            functionName: 'unstake',
            args: [BigInt(tokenId)],
        });
    };

    const claimAllRewards = async () => {
        // In this implementation, we claim per NFT or have a bulk claim if supported
        // For now, let's claim for the first staked NFT found as a proxy
        const staked = userNFTs.find(n => n.staked);
        if (!staked) return;
        return writeContractAsync({
            address: AVALA_STAKING_ADDRESS as `0x${string}`,
            abi: STAKING_ABI as any,
            functionName: 'claimRewards',
            args: [BigInt(staked.tokenId)],
        });
    };

    return {
        totalStakedGlobal: totalStaked ? Number(totalStaked) : 0,
        userStakedCount: userStakedCount ? Number(userStakedCount) : 0,
        rewardsBalance: totalRewards,
        walletBalance: balanceData ? `${parseFloat(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4)} ${balanceData.symbol}` : "0.0000 AVA",
        userNFTs,
        stakeNFT,
        unstakeNFT,
        claimAllRewards,
        isLoading: !nftData && isConnected,
        isConnected,
        refetch: refetchNFTs
    };
}
