'use client';

import { useTradingStore } from '@/store/tradingStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Zap, Target, Layers, ArrowRight, Shield, TrendingUp, Info } from 'lucide-react';

export function OrderForm() {
    const { isLong, setIsLong, leverage, setLeverage, positionSizeInput, setPositionSizeInput } = useTradingStore();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col bg-transparent">
            {/* Header */}
            <div className="p-6 border-b border-white/5">
                <h3 className="text-xl font-black text-white font-display uppercase tracking-tight flex items-center gap-2">
                    <Target className="w-5 h-5 text-brand-red" />
                    Market <span className="text-brand-red">Execute</span>
                </h3>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 custom-scrollbar space-y-8">
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsLong(true)}
                        className={cn(
                            'flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all relative overflow-hidden flex flex-col items-center gap-1',
                            isLong
                                ? 'bg-brand-mint/10 text-brand-mint border border-brand-mint/30 shadow-[0_0_20px_rgba(0,255,163,0.1)]'
                                : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10 hover:text-white'
                        )}
                    >
                        <TrendingUp className="w-4 h-4" />
                        Long
                    </button>
                    <button
                        onClick={() => setIsLong(false)}
                        className={cn(
                            'flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all relative overflow-hidden flex flex-col items-center gap-1',
                            !isLong
                                ? 'bg-brand-red/10 text-brand-red border border-brand-red/30 shadow-[0_0_20px_rgba(232,65,66,0.1)]'
                                : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10 hover:text-white'
                        )}
                    >
                        <Zap className="w-4 h-4" />
                        Short
                    </button>
                </div>

                {/* Amount Input */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                        <span className="flex items-center gap-1.5"><Layers className="w-3 h-3" /> Position Size</span>
                        <span className="text-white/60">Balance: 1,420 <span className="text-brand-mint">USDC</span></span>
                    </div>
                    <div className="relative group">
                        <input
                            type="text"
                            value={positionSizeInput}
                            onChange={(e) => setPositionSizeInput(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-white/5 border border-white/5 rounded-3xl px-6 py-4 text-white font-mono text-lg placeholder:text-white/10 focus:border-brand-red/30 focus:bg-white/10 transition-all outline-none"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-brand-mint uppercase tracking-widest">
                            USDC
                        </div>
                    </div>
                </div>

                {/* Leverage Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary flex items-center gap-1.5">
                            <Zap className="w-3 h-3" /> Execution Leverage
                        </span>
                        <span className="text-xs font-black text-white bg-brand-red/20 px-3 py-1 rounded-full border border-brand-red/30">{leverage}x</span>
                    </div>
                    <div className="px-2">
                        <input
                            type="range"
                            min="1"
                            max="50"
                            step="1"
                            value={leverage}
                            onChange={(e) => setLeverage(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-brand-red hover:accent-brand-red/80 transition-all"
                        />
                        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-white/20 mt-3">
                            <span>1x</span>
                            <span>10x</span>
                            <span>25x</span>
                            <span>50x</span>
                        </div>
                    </div>
                </div>

                {/* Summary Info */}
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                        <span>Liquidation Price</span>
                        <span className="text-brand-red font-mono">$61,100.20</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                        <span>Execution Fee</span>
                        <span className="text-white font-mono">$1.20</span>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-white">Total Allocated</span>
                        <span className="text-brand-mint font-mono text-sm">$121.20</span>
                    </div>
                </div>
            </div>

            {/* Pinned Footer Action */}
            <div className="p-6 border-t border-white/5 bg-transparent relative z-10">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={cn(
                        'w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-3 group',
                        isLong
                            ? 'bg-brand-mint text-dark-bg shadow-[0_10px_30px_rgba(0,255,163,0.3)]'
                            : 'bg-brand-red text-white shadow-[0_10px_30px_rgba(232,65,66,0.3)]',
                        loading && 'opacity-70 cursor-not-allowed'
                    )}
                >
                    {loading ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        <>
                            {isLong ? `Long Market` : `Short Market`}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
                <div className="mt-4 flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-widest text-white/20">
                    <Shield className="w-3 h-3 text-brand-mint" /> Protected by Avalaflow Subnet
                </div>
            </div>
        </div>
    );
}

