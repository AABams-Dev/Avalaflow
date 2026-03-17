'use client';

import { Header } from '@/components/layout/Header';
import { Info, DollarSign, ArrowRightLeft, Zap, ShieldCheck, Wallet, ChevronRight, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiquidityPage() {
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'swap'>('deposit');
    const [swapFrom, setSwapFrom] = useState('USDC');
    const [swapTo, setSwapTo] = useState('AVA');

    return (
        <div className="flex flex-col min-h-screen bg-dark-bg selection:bg-brand-mint/30">
            <Header />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-24 pt-32 pb-32">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">Liquidity Subnet Active</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-4 font-display uppercase leading-none">
                            Yield <span className="text-brand-mint">Orchestra</span>
                        </h1>
                        <p className="text-xl text-text-secondary font-medium max-w-xl">
                            The ALP (Avalaflow Liquidity Protocol). A multi-asset liquidity vault generating real yield for the physical-to-digital bridge.
                        </p>
                    </motion.div>

                    <div className="px-6 py-3 glass-card rounded-2xl border-brand-mint/20 flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-brand-mint" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Protocol Health: Optimal</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    {/* Stats Panel */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-10 rounded-[48px] border-white/5 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-mint/5 blur-[60px] -z-10" />
                                <div className="w-14 h-14 bg-brand-mint/10 rounded-2xl flex items-center justify-center text-brand-mint border border-brand-mint/20 mb-8">
                                    <DollarSign className="w-7 h-7" />
                                </div>
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">Internal Treasury</div>
                                <div className="text-4xl font-black text-white font-display mb-6">$14,240,050</div>
                                <div className="grid grid-cols-2 gap-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                                    <div>
                                        <div className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1 flex items-center gap-1">
                                            Current APR <Info className="w-3 h-3 text-white/20" />
                                        </div>
                                        <div className="text-xl font-black text-brand-mint font-mono">24.5%</div>
                                    </div>
                                    <div>
                                        <div className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">ALP Value</div>
                                        <div className="text-xl font-black text-white font-mono">$1.142</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="glass-card p-10 rounded-[48px] border-white/5 relative overflow-hidden group"
                            >
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-red/5 blur-[60px] -z-10" />
                                <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red border border-brand-red/20 mb-8">
                                    <Zap className="w-7 h-7" />
                                </div>
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">Protocol Revenue</div>
                                <div className="text-4xl font-black text-white font-display mb-6">$842,120</div>
                                <div className="flex items-center gap-4 p-6 bg-white/5 rounded-3xl border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-brand-mint/20 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-brand-mint" />
                                    </div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">
                                        100% of trading fees are redistributed to ALP stakers. Verified by Avalanche.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Composition */}
                        <div className="glass-card p-12 rounded-[56px] border-white/5 backdrop-blur-3xl">
                            <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight mb-10">Vault Architecture</h3>
                            <div className="space-y-8">
                                {[
                                    { name: "AVA", label: "Native Utility", color: "bg-brand-red", shadow: "shadow-brand-red", target: 40, current: 40.2, price: "$5,696,020" },
                                    { name: "USDC", label: "Stable Reserve", color: "bg-blue-500", shadow: "shadow-blue-500", target: 30, current: 29.8, price: "$4,272,015" },
                                    { name: "ETH", label: "Synoptic Bridge", color: "bg-indigo-500", shadow: "shadow-indigo-500", target: 15, current: 15.0, price: "$2,136,007" },
                                    { name: "BTC", label: "Macro Layer", color: "bg-orange-500", shadow: "shadow-orange-500", target: 15, current: 15.0, price: "$2,136,007" },
                                ].map((asset, i) => (
                                    <div key={i} className="group">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-2xl", asset.color)}>
                                                    {asset.name[0]}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-white uppercase tracking-tight">{asset.name}</div>
                                                    <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-0.5">{asset.label}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-black text-white font-mono">{asset.price}</div>
                                                <div className="text-[10px] font-black text-brand-mint uppercase tracking-widest mt-0.5">Target: {asset.target}%</div>
                                            </div>
                                        </div>
                                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${asset.current}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className={cn("h-full rounded-full transition-all duration-1000", asset.color, `shadow-[0_0_15px_rgba(var(--${asset.name.toLowerCase()}-rgb),0.5)]`)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Hub */}
                    <div className="space-y-6">
                        <div className="glass-card p-10 rounded-[56px] border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-3xl sticky top-32">
                            <div className="flex gap-2 mb-10 bg-white/5 p-1.5 rounded-3xl border border-white/5">
                                {(['deposit', 'withdraw', 'swap'] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "flex-1 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all",
                                            activeTab === tab ? "bg-white text-dark-bg shadow-2xl" : "text-white/40 hover:text-white"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-8 mb-10">
                                {activeTab === 'swap' ? (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between px-2">
                                                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Syphon From</label>
                                                <span className="text-[10px] font-black text-brand-mint uppercase tracking-widest">Balance: 2,450.00</span>
                                            </div>
                                            <div className="relative">
                                                <input type="text" placeholder="0.00" className="w-full bg-white/5 border border-white/5 rounded-[28px] pl-6 pr-28 py-6 text-2xl font-black text-white font-mono focus:border-brand-mint/30 focus:bg-white/10 transition-all outline-none" />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-2xl border border-white/10">
                                                    <span className="text-xs font-black text-white">USDC</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center -my-3 relative z-10">
                                            <button className="p-3 rounded-full bg-white text-dark-bg border border-white hover:scale-110 transition-transform">
                                                <ArrowRightLeft className="w-4 h-4 rotate-90" />
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between px-2">
                                                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Settle To</label>
                                            </div>
                                            <div className="relative">
                                                <input type="text" placeholder="0.00" readOnly className="w-full bg-white/5 border border-white/5 rounded-[28px] pl-6 pr-28 py-6 text-2xl font-black text-white/20 font-mono outline-none" />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-2xl border border-white/10">
                                                    <span className="text-xs font-black text-white">AVA</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between px-2">
                                                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Deposit Principal</label>
                                                <span className="text-[10px] font-black text-brand-mint uppercase tracking-widest">Wallet: 12,040.80</span>
                                            </div>
                                            <div className="relative">
                                                <input type="text" placeholder="0.00" className="w-full bg-white/5 border border-white/5 rounded-[28px] pl-6 pr-28 py-6 text-2xl font-black text-white font-mono focus:border-brand-mint/30 focus:bg-white/10 transition-all outline-none" />
                                                <button className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-mint text-dark-bg text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform">MAX</button>
                                            </div>
                                        </div>
                                        <div className="space-y-4 px-4 bg-white/5 p-6 rounded-[32px] border border-white/5">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                                                <span>Protocol Fee</span>
                                                <span className="text-white">0.02%</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                                                <span>{activeTab === 'deposit' ? 'ALP Minted' : 'ALP Burned'}</span>
                                                <span className="text-brand-mint">0.00</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button className="w-full py-6 rounded-[32px] bg-brand-mint text-dark-bg font-black uppercase tracking-[0.3em] text-sm shadow-[0_20px_40px_rgba(0,255,163,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                {activeTab === 'deposit' ? 'Initiate Mint' : activeTab === 'withdraw' ? 'Burn & Settle' : 'Execute Swap'}
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
                                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 w-full">
                                    <ShieldCheck className="w-5 h-5 text-brand-mint" />
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Audited by Synthetix Labs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
