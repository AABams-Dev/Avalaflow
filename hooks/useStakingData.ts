'use client';

import { useAccount, useReadContract, useReadContracts } from 'wagmi';
import { AVALA_STAKING_ADDRESS, STAKING_ABI, AVALA_NFT_ADDRESS, AVALA_NFT_ABI, AVALA_TOKEN_ADDRESS, TOKEN_ABI } from '@/lib/contracts';
import { useEffect, useState } from 'react';
import { formatUnits } from 'viem';

export function useStakingData() {
    const { address, isConnected } = useAccount();

    // 1. Fetch staked count for user
    const { data: stakedCount } = useReadContract({
        address: AVALA_STAKING_ADDRESS as `0x${string}`,
        abi: STAKING_ABI as any,
        functionName: 'stakedCount',
        args: address ? [address] : undefined,
        query: { enabled: !!address }
    });

    // 2. Fetch Token balance
    const { data: tokenBalance } = useReadContract({
        address: AVALA_TOKEN_ADDRESS as `0x${string}`,
        abi: TOKEN_ABI as any,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address }
    });

    return {
        stakedCount: stakedCount ? Number(stakedCount) : 0,
        rewardsBalance: tokenBalance ? formatUnits(tokenBalance as bigint, 18) : "0.0",
        isConnected
    };
}
