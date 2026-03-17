'use client';

import { Header } from '@/components/layout/Header';
import { HelpCircle, MessagesSquare, Search, FileText, Cpu, Zap, Coins, ArrowRight, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
    {
        icon: Smartphone,
        title: "Provisioning",
        desc: "Initialize your physical hardware. Sync NFC tags with your Avalanche wallet using our secure mobile interface.",
        color: "text-brand-red",
        bg: "bg-brand-red/10"
    },
    {
        icon: Zap,
        title: "Edge Minting",
        desc: "Real-time cryptographic verification for physical collectibles. Troubleshooting tag read errors and Fuji signatures.",
        color: "text-brand-mint",
        bg: "bg-brand-mint/10"
    },
    {
        icon: Coins,
        title: "Vault Dynamics",
        desc: "Maximize yields through Digital Twin staking. Learn about node-locked rewards and $AVA distribution cycles.",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10"
    }
];

export default function HelpPage() {
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg selection:bg-brand-mint/30">
            <Header />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-24 pt-32 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <div className="w-24 h-24 rounded-[32px] bg-brand-mint/10 inline-flex flex-col items-center justify-center border border-brand-mint/20 shadow-2xl mb-12 shadow-brand-mint/10 animate-float">
                        <HelpCircle className="w-12 h-12 text-brand-mint" />
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-10 font-display uppercase leading-none">
                        Protocol <span className="text-brand-mint">Assistance</span>
                    </h1>

                    <div className="max-w-3xl mx-auto relative group">
                        <div className="absolute inset-0 bg-brand-mint/10 blur-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-[32px] px-8 py-6 focus-within:border-brand-mint/50 focus-within:bg-white/10 transition-all backdrop-blur-3xl">
                            <Search className="w-6 h-6 text-brand-mint" />
                            <input
                                type="text"
                                placeholder="Query the Avalaflow Knowledge Base..."
                                className="bg-transparent border-none outline-none text-white w-full ml-6 placeholder-white/20 text-xl font-medium"
                            />
                            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black tracking-widest text-white/40 uppercase">
                                <span className="text-xs">⌘</span> K
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {CATEGORIES.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                            className="glass-card hover:border-brand-mint/30 hover:bg-white/5 transition-all p-10 rounded-[48px] border-white/5 cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-mint/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className={`w-16 h-16 ${cat.bg} rounded-3xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform`}>
                                <cat.icon className={`w-8 h-8 ${cat.color}`} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 font-display uppercase tracking-tight">{cat.title}</h3>
                            <p className="text-text-secondary text-base leading-relaxed mb-8 font-medium">{cat.desc}</p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-brand-mint uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                Read Documentation <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-16 rounded-[64px] border-brand-mint/20 text-center flex flex-col items-center backdrop-blur-3xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-mint/30 to-transparent" />
                    <div className="w-20 h-20 rounded-full bg-brand-mint/10 flex items-center justify-center mb-8 border border-brand-mint/20 shadow-2xl shadow-brand-mint/10">
                        <MessagesSquare className="w-10 h-10 text-brand-mint" />
                    </div>
                    <h3 className="text-4xl font-black text-white mb-6 font-display uppercase tracking-tight">Direct Node Support</h3>
                    <p className="text-text-secondary max-w-2xl mb-12 text-lg font-medium">
                        Our engineering team is active 24/7 in the restricted Support Channels.
                        Response times are prioritized by NFT Rarity Tier.
                    </p>
                    <button className="bg-brand-mint hover:scale-105 active:scale-95 text-dark-bg font-black px-12 py-6 rounded-[24px] transition-all uppercase tracking-widest text-sm shadow-[0_10px_40px_rgba(0,255,163,0.3)]">
                        Access Neural Support
                    </button>
                </motion.div>
            </main>
        </div>
    );
}
