'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defineChain } from 'viem';
import { useState } from 'react';

import { avalancheFuji as baseFuji } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

const avalancheFuji = defineChain({
    ...baseFuji,
    rpcUrls: {
        ...baseFuji.rpcUrls,
        default: {
            http: ['https://api.avax-test.network/ext/bc/C/rpc?ext=bc'],
        },
        public: {
            http: ['https://api.avax-test.network/ext/bc/C/rpc?ext=bc'],
        },
    },
});

export const config = createConfig({
    chains: [avalancheFuji],
    connectors: [injected()],
    transports: {
        [avalancheFuji.id]: http(),
    },
    ssr: true,
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
