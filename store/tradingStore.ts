import { create } from 'zustand';

interface TradingState {
    assetCode: string; // e.g., 'BTC'
    assetPair: string; // e.g., 'BTC/USD'
    setAsset: (code: string, pair: string) => void;

    leverage: number;
    setLeverage: (leverage: number) => void;

    positionSizeInput: string; // Input string to handle decimals easily
    setPositionSizeInput: (size: string) => void;

    isLong: boolean;
    setIsLong: (isLong: boolean) => void;

    // UI State
    chartTimeframe: string;
    setChartTimeframe: (tf: string) => void;
}

export const useTradingStore = create<TradingState>((set) => ({
    assetCode: 'BTC',
    assetPair: 'BTC/USD',
    setAsset: (code, pair) => set({ assetCode: code, assetPair: pair }),

    leverage: 5,
    setLeverage: (leverage) => set({ leverage }),

    positionSizeInput: '',
    setPositionSizeInput: (size) => set({ positionSizeInput: size }),

    isLong: true,
    setIsLong: (isLong) => set({ isLong }),

    chartTimeframe: '15m',
    setChartTimeframe: (tf) => set({ chartTimeframe: tf }),
}));
