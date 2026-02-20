'use client';

import { useTradingStore } from '@/store/tradingStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function OrderForm() {
    const { isLong, setIsLong, leverage, setLeverage, positionSizeInput, setPositionSizeInput } = useTradingStore();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col bg-dark-card">
            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 custom-scrollbar space-y-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsLong(true)}
                        className={cn(
                            'flex-1 py-2 rounded-lg font-bold text-sm transition-all relative overflow-hidden',
                            isLong
                                ? 'bg-brand-green/20 text-brand-green ring-1 ring-brand-green shadow-[0_0_15px_rgba(63,182,139,0.2)]'
                                : 'bg-dark-bg text-text-secondary hover:text-white'
                        )}
                    >
                        Long
                    </button>
                    <button
                        onClick={() => setIsLong(false)}
                        className={cn(
                            'flex-1 py-2 rounded-lg font-bold text-sm transition-all relative overflow-hidden',
                            !isLong
                                ? 'bg-brand-red/20 text-brand-red ring-1 ring-brand-red shadow-[0_0_15px_rgba(255,83,83,0.2)]'
                                : 'bg-dark-bg text-text-secondary hover:text-white'
                        )}
                    >
                        Short
                    </button>
                </div>

                {/* Order Type */}
                <div className="flex gap-2">
                    <button className="flex-1 py-1.5 text-xs font-medium rounded bg-dark-bg border border-brand-green/30 text-brand-green">Market</button>
                    <button className="flex-1 py-1.5 text-xs font-medium rounded bg-transparent border border-dark-border text-text-secondary hover:border-text-secondary transition-colors">Limit</button>
                </div>

                {/* Amount Input */}
                <div>
                    <div className="flex justify-between text-xs text-text-secondary mb-2">
                        <span>Amount</span>
                        <span>Balance: 1,420.50 USDC</span>
                    </div>
                    <div className="relative group">
                        <input
                            type="text"
                            value={positionSizeInput}
                            onChange={(e) => setPositionSizeInput(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white font-mono placeholder:text-dark-border focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/50 transition-all outline-none"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary font-medium">
                            USDC
                        </div>
                    </div>
                </div>

                {/* Leverage Slider */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs text-text-secondary">Leverage</span>
                        <span className="text-sm font-mono text-white bg-dark-bg px-2 py-0.5 rounded border border-dark-border">{leverage}x</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        step="1"
                        value={leverage}
                        onChange={(e) => setLeverage(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-dark-border rounded-lg appearance-none cursor-pointer accent-brand-green hover:accent-emerald-400 transition-all"
                    />
                    <div className="flex justify-between text-[10px] text-text-secondary mt-2 font-mono">
                        <span>1x</span>
                        <span>10x</span>
                        <span>25x</span>
                        <span>50x</span>
                    </div>
                </div>

                {/* Summary Info */}
                <div className="space-y-3 pt-4 border-t border-dark-border text-xs">
                    <div className="flex justify-between items-center text-text-secondary">
                        <span>Entry Price</span>
                        <span className="text-white font-mono">$64,230.50</span>
                    </div>
                    <div className="flex justify-between items-center text-text-secondary">
                        <span>Liquidation Price</span>
                        <span className="text-brand-yellow font-mono">$61,100.20</span>
                    </div>
                    <div className="flex justify-between items-center text-text-secondary">
                        <span>Fee (0.1%)</span>
                        <span className="text-white font-mono">$1.20</span>
                    </div>
                    <div className="flex justify-between items-center text-text-secondary pt-2 border-t border-dark-border/50">
                        <span>Total Needed</span>
                        <span className="text-white font-bold font-mono">$121.20</span>
                    </div>
                </div>
            </div>

            {/* Pinned Footer Action */}
            <div className="p-4 border-t border-dark-border bg-dark-card z-10">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={cn(
                        'w-full py-4 rounded-xl font-bold text-dark-bg transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2',
                        isLong
                            ? 'bg-brand-green shadow-[0_4px_20px_rgba(63,182,139,0.3)] hover:shadow-[0_4px_25px_rgba(63,182,139,0.4)]'
                            : 'bg-brand-red shadow-[0_4px_20px_rgba(255,83,83,0.3)] hover:shadow-[0_4px_25px_rgba(255,83,83,0.4)]',
                        loading && 'opacity-70 cursor-not-allowed'
                    )}
                >
                    {loading ? 'Processing...' : (isLong ? `Long BTC` : `Short BTC`)}
                </button>
            </div>
        </div>
    );
} 
