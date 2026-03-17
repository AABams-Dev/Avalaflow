'use client';

import { Header } from '@/components/layout/Header';
import { TradingChart } from '@/components/trading/TradingChart';
import { OrderForm } from '@/components/trading/OrderForm';
import { AccountPanel } from '@/components/trading/AccountPanel';
import { useTradingStore } from '@/store/tradingStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Activity, Zap, TrendingUp, Shield, BarChart3 } from 'lucide-react';

export default function TradePage() {
    const { chartTimeframe, setChartTimeframe } = useTradingStore();
    const timeframes = ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '8h', '1d', '1M', '2M', '4M', '1Y'];

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-dark-bg text-text-primary selection:bg-brand-red/30">
            <Header />

            {/* Main Content Area - Grid Layout */}
            <main className="flex-1 min-h-0 pt-20 p-4">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 h-full min-h-0">

                    {/* Left & Middle: Chart & Market Info */}
                    <div className="xl:col-span-9 min-w-0 min-h-0 flex flex-col gap-4">

                        {/* Market Bar */}
                        <div className="glass-card px-6 py-4 rounded-[32px] border-white/5 flex flex-wrap items-center justify-between gap-6 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-brand-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                            <div className="flex items-center gap-6 relative z-10">
                                <div className="flex items-center gap-4 cursor-pointer hover:bg-white/5 p-2 rounded-2xl transition-all group/asset">
                                    <div className="w-10 h-10 bg-gradient-to-br from-brand-red to-[#FF8A8A] rounded-full flex items-center justify-center font-black text-white text-lg shadow-[0_0_20px_rgba(232,65,66,0.3)] group-hover/asset:scale-110 transition-transform">₿</div>
                                    <div>
                                        <h2 className="font-black text-xl leading-none font-display uppercase tracking-tight">BTC <span className="text-text-secondary/50">/</span> USD</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-text-secondary font-black bg-white/5 px-2 py-0.5 rounded-full border border-white/5 uppercase tracking-widest">Perp-Vault</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-10 w-px bg-white/5 hidden md:block" />

                                <div className="flex gap-8 text-xs font-mono items-center">
                                    <div className="flex flex-col">
                                        <span className="text-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">Index Price</span>
                                        <span className="text-brand-mint font-black text-lg font-display">$64,230.50</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">24h Change</span>
                                        <span className="text-brand-mint font-black text-sm">+2.42%</span>
                                    </div>
                                    <div className="hidden lg:flex flex-col">
                                        <span className="text-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">24h Volume</span>
                                        <span className="text-white font-black text-sm">$1.24B</span>
                                    </div>
                                    <div className="hidden lg:flex flex-col">
                                        <span className="text-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">Funding</span>
                                        <span className="text-[#FFD600] font-black text-sm">0.0100%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Timeframe Selector */}
                            <div className="flex bg-white/5 rounded-full p-1.5 border border-white/5 overflow-x-auto max-w-full no-scrollbar relative z-10">
                                {timeframes.map(tf => (
                                    <button
                                        key={tf}
                                        onClick={() => setChartTimeframe(tf)}
                                        className={cn(
                                            "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all whitespace-nowrap",
                                            chartTimeframe === tf
                                                ? "bg-white text-dark-bg shadow-lg"
                                                : "text-text-secondary hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {tf}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chart Component Area */}
                        <div className="flex-1 glass-card rounded-[40px] border-white/5 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light pointer-events-none"></div>
                            <div className="h-full w-full">
                                <TradingChart />
                            </div>

                            {/* Floating Chart Stats Overlay */}
                            <div className="absolute top-6 left-6 flex gap-3 pointer-events-none z-20">
                                <div className="glass-card/90 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl text-[10px] font-mono text-text-secondary shadow-2xl">
                                    <span className="font-black text-white/40 mr-1">O</span> <span className="text-brand-mint font-bold">64,210.3</span>
                                    <span className="mx-2 opacity-20">|</span>
                                    <span className="font-black text-white/40 mr-1">H</span> <span className="text-brand-mint font-bold">64,250.7</span>
                                    <span className="mx-2 opacity-20">|</span>
                                    <span className="font-black text-white/40 mr-1">L</span> <span className="text-brand-red font-bold">64,190.2</span>
                                    <span className="mx-2 opacity-20">|</span>
                                    <span className="font-black text-white/40 mr-1">C</span> <span className="text-brand-mint font-bold">64,230.5</span>
                                </div>
                                <div className="glass-card/90 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl text-[10px] font-black text-brand-mint uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                                    <Activity className="w-3 h-3" /> Live Protocol
                                </div>
                            </div>
                        </div>

                        {/* Positions / History (Integrated into Account Panel below but could be a separate row if needed) */}
                    </div>

                    {/* Right: Execution Stack */}
                    <div className="xl:col-span-3 min-w-0 min-h-0 flex flex-col gap-4">
                        <div className="flex-1 min-h-0 flex flex-col glass-card rounded-[40px] border-white/5 overflow-hidden shadow-2xl">
                            <OrderForm />
                        </div>
                        <div className="h-[300px] shrink-0 flex flex-col glass-card rounded-[40px] border-white/5 overflow-hidden shadow-2xl">
                            <AccountPanel />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
