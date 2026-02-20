'use client';

import { Header } from '@/components/layout/Header';
import { Info, DollarSign, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function LiquidityPage() {
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'swap'>('deposit');
    const [swapFrom, setSwapFrom] = useState('USDT');
    const [swapTo, setSwapTo] = useState('KUB');

    return (
        <div className="flex flex-col min-h-screen bg-dark-bg text-text-primary">
            <Header />

            <main className="flex-1 px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h1 className="text-3xl font-bold">Liquidity Vault (KLP)</h1>
                        <div className="flex items-center gap-2 text-sm text-text-secondary bg-dark-card px-3 py-1.5 rounded-lg border border-dark-border">
                            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                            <span>Rewards distributed every Wednesday</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Stats Card */}
                        <div className="bg-dark-card border border-dark-border rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-32 bg-brand-green/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-green/10 transition-colors" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-10 h-10 bg-brand-green/20 rounded-lg flex items-center justify-center text-brand-green shadow-[0_0_15px_rgba(63,182,139,0.2)]">
                                        <DollarSign className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-text-secondary text-sm font-medium">Total Value Locked</h3>
                                        <div className="text-3xl font-bold font-mono text-white">$14,240,050</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 bg-dark-bg/50 p-4 rounded-xl border border-dark-border">
                                    <div>
                                        <div className="text-text-secondary text-xs mb-1 flex items-center gap-1">
                                            Current APR <Info className="w-3 h-3 cursor-help text-text-secondary/70" />
                                        </div>
                                        <div className="text-xl font-bold text-brand-green font-mono">24.5%</div>
                                    </div>
                                    <div>
                                        <div className="text-text-secondary text-xs mb-1">KLP Price</div>
                                        <div className="text-xl font-bold text-white font-mono">$1.142</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions Card */}
                        <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-xl">
                            <div className="flex gap-2 mb-6 bg-dark-bg p-1 rounded-lg">
                                <button
                                    onClick={() => setActiveTab('deposit')}
                                    className={cn(
                                        "flex-1 py-2 rounded-md font-bold text-sm transition-all",
                                        activeTab === 'deposit' ? "bg-dark-card shadow text-white ring-1 ring-dark-border" : "text-text-secondary hover:text-white"
                                    )}
                                >
                                    Deposit
                                </button>
                                <button
                                    onClick={() => setActiveTab('withdraw')}
                                    className={cn(
                                        "flex-1 py-2 rounded-md font-bold text-sm transition-all",
                                        activeTab === 'withdraw' ? "bg-dark-card shadow text-white ring-1 ring-dark-border" : "text-text-secondary hover:text-white"
                                    )}
                                >
                                    Withdraw
                                </button>
                                <button
                                    onClick={() => setActiveTab('swap')}
                                    className={cn(
                                        "flex-1 py-2 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-1",
                                        activeTab === 'swap' ? "bg-dark-card shadow text-white ring-1 ring-dark-border" : "text-text-secondary hover:text-white"
                                    )}
                                >
                                    Swap <ArrowRightLeft className="w-3 h-3" />
                                </button>
                            </div>

                            {activeTab === 'swap' ? (
                                /* SWAP UI */
                                <div className="mb-6 space-y-4">
                                    <div>
                                        <label className="text-text-secondary text-xs mb-1 block">From</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                placeholder="0.00"
                                                className="w-full bg-dark-bg border border-dark-border rounded-lg pl-4 pr-24 py-3 text-white font-mono outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/50 transition-all placeholder:text-dark-border"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                <select
                                                    value={swapFrom}
                                                    onChange={(e) => setSwapFrom(e.target.value)}
                                                    className="bg-dark-card border border-dark-border rounded px-2 py-1 text-xs font-bold text-white outline-none cursor-pointer"
                                                >
                                                    <option value="USDT">USDT</option>
                                                    <option value="KUB">KUB</option>
                                                    <option value="KKUB">KKUB</option>
                                                    <option value="KUSDT">KUSDT</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <button className="p-2 rounded-full bg-dark-bg border border-dark-border hover:border-brand-green transition-colors">
                                            <ArrowRightLeft className="w-4 h-4 text-text-secondary rotate-90" />
                                        </button>
                                    </div>

                                    <div>
                                        <label className="text-text-secondary text-xs mb-1 block">To (Estimated)</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                placeholder="0.00"
                                                readOnly
                                                className="w-full bg-dark-bg/50 border border-dark-border rounded-lg pl-4 pr-24 py-3 text-white font-mono outline-none cursor-not-allowed"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                <select
                                                    value={swapTo}
                                                    onChange={(e) => setSwapTo(e.target.value)}
                                                    className="bg-dark-card border border-dark-border rounded px-2 py-1 text-xs font-bold text-white outline-none cursor-pointer"
                                                >
                                                    <option value="KUB">KUB</option>
                                                    <option value="KKUB">KKUB</option>
                                                    <option value="KUSDT">KUSDT</option>
                                                    <option value="USDT">USDT</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* DEPOSIT/WITHDRAW UI */
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-text-secondary">Amount</span>
                                        <span className="text-text-secondary text-xs">Wallet: 0.00 USDC</span>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder="0.00"
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/50 transition-all placeholder:text-dark-border"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <span className="text-xs font-bold text-text-secondary">USDC</span>
                                            <button className="text-brand-green text-xs font-bold hover:underline">MAX</button>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-6 text-xs text-text-secondary">
                                        <div className="flex justify-between">
                                            <span>Fees</span>
                                            <span className="font-mono text-white">-</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>{activeTab === 'deposit' ? 'Receive' : 'Burn'}</span>
                                            <span className="font-mono text-white">- KLP</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button className={cn(
                                "w-full py-3 text-dark-bg font-bold rounded-lg hover:opacity-90 transition-all shadow-[0_0_15px_rgba(63,182,139,0.2)]",
                                activeTab === 'deposit' || activeTab === 'swap' ? "bg-brand-green" : "bg-brand-green opacity-80"
                            )}>
                                {activeTab === 'deposit' ? 'Buy KLP' : activeTab === 'withdraw' ? 'Sell KLP' : 'Swap Tokens'}
                            </button>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                        <h3 className="font-bold mb-6 text-lg">Vault Composition</h3>
                        <div className="space-y-6">

                            {/* KUB */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">K</div>
                                        <div>
                                            <div className="font-bold text-sm text-white">KUB</div>
                                            <div className="text-xs text-text-secondary">Target: 40%</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-sm text-white font-mono">$5,696,020</div>
                                        <div className="text-xs text-text-secondary">Current: 40.0%</div>
                                    </div>
                                </div>
                                <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden border border-dark-border/50">
                                    <div className="bg-emerald-500 w-[40.0%] h-full rounded-full shadow-[0_0_10px_#10b981]" />
                                </div>
                            </div>

                            {/* KUSDT */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#26a17b] flex items-center justify-center text-white font-bold text-[10px] shadow-lg">KT</div>
                                        <div>
                                            <div className="font-bold text-sm text-white">KUSDT</div>
                                            <div className="text-xs text-text-secondary">Target: 30%</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-sm text-white font-mono">$4,272,015</div>
                                        <div className="text-xs text-text-secondary">Current: 30.0%</div>
                                    </div>
                                </div>
                                <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden border border-dark-border/50">
                                    <div className="bg-[#26a17b] w-[30.0%] h-full rounded-full shadow-[0_0_10px_#26a17b]" />
                                </div>
                            </div>

                            {/* KKUB */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1e40af] flex items-center justify-center text-white font-bold text-[10px] shadow-lg">KK</div>
                                        <div>
                                            <div className="font-bold text-sm text-white">KKUB</div>
                                            <div className="text-xs text-text-secondary">Target: 15%</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-sm text-white font-mono">$2,136,007</div>
                                        <div className="text-xs text-text-secondary">Current: 15.0%</div>
                                    </div>
                                </div>
                                <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden border border-dark-border/50">
                                    <div className="bg-[#1e40af] w-[15.0%] h-full rounded-full shadow-[0_0_10px_#1e40af]" />
                                </div>
                            </div>

                            {/* USDT */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#2775ca] flex items-center justify-center text-white font-bold text-xs shadow-lg">$</div>
                                        <div>
                                            <div className="font-bold text-sm text-white">USDT</div>
                                            <div className="text-xs text-text-secondary">Target: 15%</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-sm text-white font-mono">$2,136,007</div>
                                        <div className="text-xs text-text-secondary">Current: 15.0%</div>
                                    </div>
                                </div>
                                <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden border border-dark-border/50">
                                    <div className="bg-[#2775ca] w-[15.0%] h-full rounded-full shadow-[0_0_10px_#2775ca]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
