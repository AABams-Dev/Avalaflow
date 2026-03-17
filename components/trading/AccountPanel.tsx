'use client';

import { Wallet, Briefcase, Activity, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AccountPanel() {
    // Mock data
    const positions = [
        {
            id: 1,
            pair: 'BTC/USD',
            type: 'Long',
            leverage: 10,
            pnl: 45.20,
            pnlPercent: 12.5,
            entry: 64100,
            mark: 64230,
            size: 5000,
            liq: 58000
        }
    ];

    return (
        <div className="h-full flex flex-col bg-transparent">
            {/* Account Header */}
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-white font-display uppercase tracking-tight flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-brand-mint" /> Portfolio
                    </h3>
                    <div className="px-3 py-1 bg-brand-mint/10 border border-brand-mint/30 rounded-full text-[10px] font-black text-brand-mint uppercase tracking-widest">
                        Standard
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all duration-500">
                        <div className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1 flex items-center gap-1.5">
                            <Activity className="w-3 h-3" /> Equity
                        </div>
                        <div className="text-2xl font-black text-white font-display">$1,420.50</div>
                    </div>
                    <div className="p-5 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all duration-500">
                        <div className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1 flex items-center gap-1.5">
                            <TrendingUp className="w-3 h-3 text-brand-mint" /> Unr. PnL
                        </div>
                        <div className="text-2xl font-black text-brand-mint font-display">+$45.20</div>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 custom-scrollbar">
                <div className="flex items-center justify-between mb-4 sticky top-0 bg-dark-card/80 backdrop-blur-md py-2 z-10 rounded-xl px-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5" /> Active Vaults
                    </h4>
                    <span className="bg-white/5 border border-white/5 px-3 py-1 rounded-full text-[10px] font-black text-white/40">{positions.length}</span>
                </div>

                <div className="space-y-4">
                    {positions.map((pos) => (
                        <div key={pos.id} className="p-5 rounded-[32px] bg-white/5 border border-white/5 hover:border-brand-mint/30 hover:bg-white/10 transition-all duration-500 cursor-pointer group relative overflow-hidden">
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${pos.type === 'Long' ? 'bg-brand-mint' : 'bg-brand-red'}`} />

                            <div className="flex justify-between items-center mb-4 pl-2">
                                <div className="flex flex-col">
                                    <span className="font-black text-white font-display uppercase tracking-tight">{pos.pair}</span>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest",
                                            pos.type === 'Long' ? 'text-brand-mint' : 'text-brand-red'
                                        )}>
                                            {pos.type}
                                        </span>
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                                            {pos.leverage}x
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={cn(
                                        "text-lg font-black font-display",
                                        pos.pnl >= 0 ? 'text-brand-mint' : 'text-brand-red'
                                    )}>
                                        {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)}
                                    </div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest font-mono">
                                        {pos.pnlPercent}%
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-[10px] text-text-secondary pl-2 font-mono">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded-lg">
                                        <span className="uppercase font-black text-[8px] opacity-40">Entry</span>
                                        <span className="text-white font-bold">{pos.entry.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded-lg">
                                        <span className="uppercase font-black text-[8px] opacity-40">Mark</span>
                                        <span className="text-white font-bold">{pos.mark.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded-lg">
                                        <span className="uppercase font-black text-[8px] opacity-40">Size</span>
                                        <span className="text-white font-bold">${pos.size.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded-lg">
                                        <span className="uppercase font-black text-[8px] opacity-40 text-brand-red">Liq</span>
                                        <span className="text-brand-red font-bold">{pos.liq.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {positions.length === 0 && (
                        <div className="text-center py-16 px-6 glass-card rounded-[32px] border-white/5 border-dashed">
                            <Briefcase className="w-12 h-12 text-white/5 mx-auto mb-4" />
                            <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">
                                No active vaults detected
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Status */}
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-mint" /> Margin Safe
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-brand-red" /> 12ms Edge
                </div>
            </div>
        </div>
    );
}
