'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Lock, Zap, Coins, TrendingUp, ShieldCheck, ChevronRight, Info, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStakingData } from '@/hooks/useStakingData';
import { useNFTs } from '@/hooks/useNFTs';

export default function StakingPage() {
    const [activeTab, setActiveTab] = useState<'staked' | 'unstaked'>('staked');
    const {
        userNFTs,
        totalStakedGlobal,
        rewardsBalance,
        walletBalance,
        stakeNFT,
        unstakeNFT,
        claimAllRewards,
        isLoading,
        refetch
    } = useStakingData();

    const STAKING_STATS = [
        { label: "Total NFTs Staked", value: totalStakedGlobal.toString(), icon: Lock, color: "text-brand-red", bg: "bg-brand-red/10" },
        { label: "Reward Pool APR", value: "24.5%", icon: TrendingUp, color: "text-brand-mint", bg: "bg-brand-mint/10" }, // Mock APR as it usually depends on external stats
        { label: "AVA Distributed", value: "1.2M", icon: Coins, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    ];

    const handleAction = async (nft: any) => {
        try {
            if (nft.staked) {
                await unstakeNFT(nft.tokenId);
            } else {
                await stakeNFT(nft.tokenId);
            }
            refetch();
        } catch (e) {
            console.error("Action failed", e);
        }
    };

    const handleClaim = async () => {
        try {
            await claimAllRewards();
            refetch();
        } catch (e) {
            console.error("Claim failed", e);
        }
    };

    const displayNFTs = userNFTs.filter(n => activeTab === 'staked' ? n.staked : !n.staked);

    return (
        <div className="flex flex-col min-h-screen bg-dark-bg selection:bg-brand-red/30">
            <Header />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-24 pt-32 pb-32">
                {/* Hero / Hero Stats */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">Active Rewards Period</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-4 font-display uppercase leading-none">
                            The Staking <span className="text-brand-red">Vaults</span>
                        </h1>
                        <p className="text-xl text-text-secondary font-medium max-w-xl mb-12">
                            Deposit your physical digital representations into the Avalaflow secure vaults to accrue $AVA yield.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {STAKING_STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                                className="glass-card p-10 rounded-[40px] border-white/5 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] -z-10 group-hover:bg-white/10 transition-colors" />
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/5", stat.bg)}>
                                    <stat.icon className={cn("w-7 h-7", stat.color)} />
                                </div>
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">{stat.label}</div>
                                <div className="text-4xl font-black text-white font-display">{stat.value}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Main Staking Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: NFT Inventory */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-4">
                            <div className="flex bg-white/5 p-1.5 rounded-[24px] border border-white/5 backdrop-blur-md">
                                <button
                                    onClick={() => setActiveTab('staked')}
                                    className={cn(
                                        "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        activeTab === 'staked' ? "bg-white text-dark-bg shadow-2xl" : "text-white/40 hover:text-white"
                                    )}
                                >
                                    Staked Vaults ({userNFTs.filter(n => n.staked).length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('unstaked')}
                                    className={cn(
                                        "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        activeTab === 'unstaked' ? "bg-white text-dark-bg shadow-2xl" : "text-white/40 hover:text-white"
                                    )}
                                >
                                    Inventory ({userNFTs.filter(n => !n.staked).length})
                                </button>
                            </div>

                            <div className="flex gap-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        type="text"
                                        placeholder="Search Collection..."
                                        className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-xs text-white placeholder:text-white/10 focus:border-brand-red/30 focus:bg-white/10 transition-all outline-none"
                                    />
                                </div>
                                <button className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white">
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
                                        <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Scanning C-Chain Vaults...</p>
                                    </div>
                                ) : displayNFTs.length === 0 ? (
                                    <div className="col-span-full py-20 px-10 glass-card rounded-[48px] border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                                        <Info className="w-12 h-12 text-white/10 mb-6" />
                                        <p className="text-xl font-black text-white/40 font-display uppercase tracking-tight">No Assets Found</p>
                                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-2">{activeTab === 'staked' ? "You haven't staked any vaults yet." : "Your inventory is currently empty."}</p>
                                    </div>
                                ) : displayNFTs.map((nft) => (
                                    <motion.div
                                        key={nft.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="glass-card rounded-[48px] border-white/5 overflow-hidden group hover:border-white/20 transition-all p-4"
                                    >
                                        <div className="relative aspect-square rounded-[36px] overflow-hidden mb-6">
                                            <img src={nft.image} alt={nft.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                                                    {nft.rarity}
                                                </span>
                                                <span className="px-3 py-1.5 bg-brand-mint/20 backdrop-blur-md rounded-full text-[8px] font-black text-brand-mint uppercase tracking-widest border border-brand-mint/20">
                                                    {nft.multiplier} Multiplier
                                                </span>
                                            </div>
                                            {nft.staked && (
                                                <div className="absolute inset-0 bg-brand-red/20 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="p-4 bg-white rounded-full text-dark-bg cursor-pointer hover:scale-110 transition-transform">
                                                        <Lock className="w-6 h-6" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="px-4 pb-4">
                                            <h3 className="text-xl font-black text-white font-display uppercase tracking-tight mb-4">{nft.name}</h3>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Current Yield</div>
                                                    <div className="text-lg font-black text-brand-mint font-mono">{parseFloat(nft.reward).toFixed(4)} <span className="text-[10px]">AVA</span></div>
                                                </div>
                                                <button
                                                    onClick={() => handleAction(nft)}
                                                    className={cn(
                                                        "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                                        nft.staked
                                                            ? "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                                                            : "bg-brand-red text-white shadow-[0_10px_20px_rgba(232,65,66,0.3)] hover:scale-105"
                                                    )}>
                                                    {nft.staked ? "Unstake Vault" : "Stake Vault"}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: Rewards Panel */}
                    <div className="space-y-6">
                        <div className="glass-card p-10 rounded-[56px] border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-3xl sticky top-32">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-brand-mint/10 border border-brand-mint/20 flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-brand-mint" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white font-display uppercase tracking-tight">Claim Center</h3>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-0.5">Real-time Rewards Accumulation</p>
                                </div>
                            </div>

                            <div className="space-y-8 mb-10">
                                <div className="p-8 rounded-[32px] bg-white/5 border border-white/5">
                                    <div className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-4">Accrued $AVA Balance</div>
                                    <div className="text-4xl font-black text-white font-display mb-2">{parseFloat(rewardsBalance).toFixed(4)}</div>
                                    <div className="flex items-center gap-2 text-xs font-black text-brand-mint uppercase tracking-widest">
                                        <TrendingUp className="w-4 h-4" /> Dynamic Yield Active
                                    </div>
                                </div>

                                <div className="p-8 rounded-[32px] bg-brand-red/5 border border-brand-red/10">
                                    <div className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em] mb-4">Wallet Balance</div>
                                    <div className="text-2xl font-black text-white font-display truncate">{walletBalance}</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40 px-2">
                                        <span>Gas Fee Est.</span>
                                        <span className="text-white font-mono">~0.002 AVA</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40 px-2">
                                        <span>Reward Efficiency</span>
                                        <span className="text-brand-mint font-mono">98.2%</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleClaim}
                                disabled={parseFloat(rewardsBalance) <= 0}
                                className="w-full py-6 rounded-[32px] bg-brand-mint text-dark-bg font-black uppercase tracking-[0.3em] text-sm shadow-[0_20px_40px_rgba(0,255,163,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-3 group">
                                Claim Rewards
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-8 pt-8 border-t border-white/5">
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                                    <Info className="w-5 h-5 text-white/20 shrink-0" />
                                    <p className="text-[10px] text-white/40 leading-relaxed font-bold uppercase tracking-widest">
                                        Rewards are computed at every block. Staking higher rarity items increases your node weight.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-10 py-6 glass-card rounded-[32px] border-brand-red/20 flex flex-col items-center gap-4 text-center">
                            <ShieldCheck className="w-8 h-8 text-brand-red" />
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Vault Security Verification</h4>
                            <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                                Your digital representations are cryptographically secured using the Avalanche Fuji consensus engine.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
