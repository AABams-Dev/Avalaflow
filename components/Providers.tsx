'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defineChain } from 'viem';
import { useState } from 'react';

import { avalanche, avalancheFuji } from 'wagmi/chains';

export const config = createConfig({
    chains: [avalanche, avalancheFuji, mainnet],
    transports: {
        [avalanche.id]: http(),
        [avalancheFuji.id]: http(),
        [mainnet.id]: http(),
    },
});

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
