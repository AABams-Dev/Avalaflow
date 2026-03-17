'use client';

import { Header } from '@/components/layout/Header';
import { Copy, Users, DollarSign, Clock, Share2, Award, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReferralsPage() {
    const { address } = useAccount();
    const [copied, setCopied] = useState(false);

    const referralCode = address ? address.slice(2, 8).toUpperCase() : 'CONNECT WALLET';
    const referralLink = address ? `https://avalaflow.io/ref/${referralCode}` : 'Connect Wallet to Generate';

    const copyToClipboard = () => {
        if (!address) return;
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-dark-bg selection:bg-brand-red/30">
            <Header />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-24 pt-32 pb-32">
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                            <Award className="w-4 h-4 text-brand-red" />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">Affiliate Protocol v2.0</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-4 font-display uppercase leading-none">
                            Growth <span className="text-brand-red">Nexus</span>
                        </h1>
                        <p className="text-xl text-text-secondary font-medium max-w-xl">
                            Expand the Avalaflow ecosystem. Invite collectors and receive a 10% perpetual kickback on all protocol fees generated.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {[
                        { label: "Active Nodes", value: "124", icon: Users, color: "text-white", bg: "bg-white/5" },
                        { label: "Total Revenue", value: "$1,420.50", icon: DollarSign, color: "text-brand-mint", bg: "bg-brand-mint/10" },
                        { label: "Pending Settle", value: "$45.20", icon: Clock, color: "text-brand-red", bg: "bg-brand-red/10", action: "Claim Rewards" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                            className="glass-card p-10 rounded-[40px] border-white/5 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] -z-10" />
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/5", stat.bg)}>
                                <stat.icon className={cn("w-7 h-7", stat.color)} />
                            </div>
                            <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">{stat.label}</div>
                            <div className={cn("text-4xl font-black font-display", stat.color)}>{stat.value}</div>
                            {stat.action && (
                                <button className="mt-8 w-full py-4 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-red/20 hover:scale-105 transition-all">
                                    {stat.action}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Link Generation */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="glass-card p-12 rounded-[56px] border-white/5 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 blur-3xl -z-10" />
                            <h3 className="text-3xl font-black text-white font-display uppercase tracking-tight mb-8">Node Invitations</h3>
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 bg-white/5 border border-white/10 rounded-[28px] px-8 py-6 flex items-center justify-between backdrop-blur-3xl group focus-within:border-brand-red/50 transition-all">
                                        <span className={cn("font-mono text-lg truncate pr-4", !address ? "text-white/20" : "text-white")}>
                                            {referralLink}
                                        </span>
                                        {address && (
                                            <button
                                                onClick={copyToClipboard}
                                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-dark-bg transition-all shrink-0"
                                            >
                                                {copied ? <span className="text-[10px] font-black">OK</span> : <Copy className="w-5 h-5" />}
                                            </button>
                                        )}
                                    </div>
                                    <button className="bg-brand-red text-white px-12 py-6 rounded-[28px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                                        Transmit <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                                {!address && (
                                    <p className="text-[10px] font-black text-brand-red uppercase tracking-widest px-4">
                                        Wallet connection required to authorize referral streams.
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Leaderboard */}
                        <div>
                            <h3 className="text-3xl font-black text-white font-display uppercase tracking-tight mb-10 flex items-center gap-4">
                                <TrendingUp className="w-8 h-8 text-brand-mint" /> Global Vanguard
                            </h3>
                            <div className="glass-card rounded-[48px] border-white/5 overflow-hidden backdrop-blur-3xl">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white/5 border-b border-white/5">
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Rank</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Node Address</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Affiliates</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Revenue Share</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[1, 2, 3, 4, 5].map((rank) => (
                                            <tr key={rank} className="hover:bg-white/5 transition-all group">
                                                <td className="px-10 py-8">
                                                    <span className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black font-display",
                                                        rank === 1 ? "bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]" :
                                                            rank === 2 ? "bg-white/20 text-white" : "bg-white/5 text-white/40"
                                                    )}>
                                                        {rank}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-8 font-mono text-sm text-white/80 group-hover:text-brand-red transition-colors">0x7a...8b9c</td>
                                                <td className="px-10 py-8 text-white font-black">{(1000 - rank * 45).toLocaleString()}</td>
                                                <td className="px-10 py-8 text-right font-mono text-brand-mint font-black">${(50000 - rank * 2000).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Info Sidebar */}
                    <div className="space-y-6">
                        <div className="glass-card p-10 rounded-[48px] border-brand-mint/20 bg-brand-mint/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-mint/10 blur-3xl -z-10" />
                            <Zap className="w-10 h-10 text-brand-mint mb-8" />
                            <h4 className="text-xl font-black text-white font-display uppercase tracking-tight mb-4">Recursive Rewards</h4>
                            <p className="text-text-secondary text-sm font-medium leading-relaxed mb-8">
                                Your earnings are settled in real-time onto the Avalanche C-Chain.
                                Kickbacks are calculated post-swap and distributed every 6300 blocks.
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-brand-mint uppercase tracking-widest group cursor-pointer">
                                Learn about Tiers <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        <div className="glass-card p-10 rounded-[48px] border-white/10 flex flex-col items-center text-center">
                            <Share2 className="w-10 h-10 text-brand-red mb-6" />
                            <h4 className="text-xl font-black text-white font-display uppercase tracking-tight mb-4">Direct Transmissions</h4>
                            <p className="text-text-secondary text-sm font-medium mb-8 leading-relaxed">
                                Connect with your network across decentralized protocols.
                                Support for Farcaster & Lens integrated.
                            </p>
                            <button className="w-full py-4 rounded-3xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                                Sync Social Nodes
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
