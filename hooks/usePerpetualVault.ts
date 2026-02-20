'use client';

import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';
// import { VAULT_ABI } from '@/contracts/VaultABI'; // TODO: Add ABI

const VAULT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with KUB Chain address

export function usePerpetualVault() {
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();

    // READ HOOKS
    /*
    const { data: totalLiquidity } = useReadContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'totalLiquidity',
    });
    */

    // WRITE ACTIONS
    const depositCollateral = async (amount: string) => {
        if (!amount) return;
        try {
            console.log('Depositing', amount);
            // await writeContractAsync({
            //   address: VAULT_ADDRESS,
            //   abi: VAULT_ABI,
            //   functionName: 'deposit',
            //   args: [parseEther(amount)],
            // });
        } catch (error) {
            console.error('Deposit failed:', error);
            throw error;
        }
    };

    const withdrawCollateral = async (amount: string) => {
        if (!amount) return;
        try {
            console.log('Withdrawing', amount);
            // await writeContractAsync({
            //   address: VAULT_ADDRESS,
            //   abi: VAULT_ABI,
            //   functionName: 'withdraw',
            //   args: [parseEther(amount)],
            // });
        } catch (error) {
            console.error('Withdraw failed:', error);
            throw error;
        }
    };

    return {
        depositCollateral,
        withdrawCollateral,
        totalLiquidity: undefined, // formatEther(totalLiquidity || 0n),
    };
}
