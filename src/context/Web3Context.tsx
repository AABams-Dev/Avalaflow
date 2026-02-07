import React, { type ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { avalancheFuji } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// 1. Configure the Avalanche Network & Wallet Connect
// Note: For a hackathon, you can use a placeholder for projectId
const config = getDefaultConfig({
  appName: 'AvalaFlow',
  projectId: '9542833390c54415891392687063462a', // Placeholder ID
  chains: [avalancheFuji],
  ssr: false, 
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#ef4444', // This matches your AvalaFlow Red
            accentColorForeground: 'white',
            borderRadius: 'large',
          })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

