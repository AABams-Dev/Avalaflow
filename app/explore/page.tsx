'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Globe, Award, Sparkles, TrendingUp,
    ArrowRight, Map as MapIcon, Compass, Target,
    Smartphone, ShieldCheck, Activity, Users, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const COLLECTIONS = [
    { id: 1, name: "Neon District", items: 1200, floor: "12 AVA", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80", tag: "Cyber" },
    { id: 2, name: "Ethereal Echoes", items: 850, floor: "45 AVA", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80", tag: "Fantasy" },
    { id: 3, name: "Void Mariners", items: 420, floor: "89 AVA", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", tag: "Space" },
    { id: 4, name: "Primal Shards", items: 2500, floor: "2.5 AVA", image: "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=800&q=80", tag: "Ancient" },
];

const DROPS = [
    { id: 1, name: "Solaris Prime #001", time: "Starts in 2h 14m", rarity: "Ascended", image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80" },
    { id: 2, name: "Deep Sea Core", time: "Starts in 1d 4h", rarity: "Legendary", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80" },
];

export default function ExplorePage() {
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg selection:bg-brand-red/30">
            <Header />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-24 pt-32 pb-32">
                {/* Hero / Discovery */}
                <div className="relative mb-32 group">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md">
                            <Compass className="w-4 h-4 text-brand-mint" />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">Discovery Prototypes</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tight mb-10 font-display uppercase leading-none">
                            The New <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mint to-[#00FFF0]">Frontier</span>
                        </h1>
                        <p className="text-2xl text-text-secondary leading-relaxed mb-12 font-medium max-w-3xl">
                            Traverse the Avalaflow ecosystem. Discover physical artifacts with unique cryptographic souls, upcoming subnet releases, and trending community assets.
                        </p>
                    </motion.div>

                    {/* Featured Drop Card (Horizontal) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="glass-card p-1 rounded-[64px] border-white/5 overflow-hidden relative"
                    >
                        <div className="flex flex-col lg:flex-row gap-10 p-10 lg:p-16">
                            <div className="relative flex-1 aspect-square lg:aspect-video rounded-[48px] overflow-hidden group/img">
                                <img src="https://images.unsplash.com/photo-1634157703702-3c124b455499?w=1200&q=80" alt="Featured" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Featured Collection</span>
                                    </div>
                                    <div className="w-16 h-16 bg-brand-red rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-[400px] flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-brand-mint mb-4">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Avalanche Genesis Drop</span>
                                </div>
                                <h2 className="text-4xl font-black text-white mb-6 font-display uppercase tracking-tight">The Origin <br />Prototypes</h2>
                                <p className="text-text-secondary mb-10 text-lg leading-relaxed font-medium">
                                    The first series of physical figures built with the NTAG 424 DNA security chips. Only 500 units worldwide.
                                </p>
                                <div className="space-y-4 mb-10">
                                    <div className="flex justify-between items-center text-xs px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                                        <span className="text-text-secondary uppercase font-black tracking-widest text-[10px]">Release Price</span>
                                        <span className="text-white font-mono font-black">120 AVA</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                                        <span className="text-text-secondary uppercase font-black tracking-widest text-[10px]">Current Status</span>
                                        <span className="text-brand-mint uppercase font-black tracking-widest text-[10px]">Sold Out</span>
                                    </div>
                                </div>
                                <button className="w-full py-6 rounded-[32px] bg-white text-dark-bg font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group">
                                    View Full Archive
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Collections Ticker / Grid */}
                <div className="mb-32">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl font-black text-white mb-4 font-display uppercase tracking-tight">Verified Collections</h2>
                            <p className="text-text-secondary font-medium">Curated high-performance assets on the Avalaflow Subnet.</p>
                        </div>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-brand-red transition-all group">
                            Explore All Collections <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {COLLECTIONS.map((col, i) => (
                            <motion.div
                                key={col.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="glass-card p-4 rounded-[48px] border-white/5 cursor-pointer group hover:border-brand-mint/30 transition-all duration-500 overflow-hidden"
                            >
                                <div className="relative aspect-square rounded-[36px] overflow-hidden mb-6">
                                    <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                                            {col.tag}
                                        </span>
                                    </div>
                                </div>
                                <div className="px-4 pb-4 text-center">
                                    <h3 className="text-xl font-black text-white mb-2 font-display uppercase tracking-tight group-hover:text-brand-mint transition-colors">{col.name}</h3>
                                    <div className="flex justify-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Items</span>
                                            <span className="text-xs font-black text-white font-mono">{col.items}</span>
                                        </div>
                                        <div className="w-[1px] h-6 bg-white/5" />
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Floor</span>
                                            <span className="text-xs font-black text-brand-mint font-mono">{col.floor}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Subnet Activity Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
                    <div className="lg:col-span-2">
                        <h2 className="text-4xl font-black text-white mb-12 font-display uppercase tracking-tight flex items-center gap-4">
                            <Activity className="w-8 h-8 text-brand-red" /> Subnet Pulse
                        </h2>
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="glass-card p-8 rounded-[32px] border-white/5 flex items-center gap-8 group hover:bg-white/5 transition-all">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 overflow-hidden flex-shrink-0">
                                        <div className="w-full h-full bg-gradient-to-br from-brand-red to-brand-mint opacity-20 group-hover:opacity-40 transition-opacity" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Verification Node 0x{i}df...32ed</div>
                                            <div className="text-[10px] font-black text-brand-mint uppercase tracking-widest bg-brand-mint/10 px-3 py-1 rounded-full">Success</div>
                                        </div>
                                        <p className="text-lg font-black text-white uppercase tracking-tight font-display">New Figure Synthesis Authorized</p>
                                        <div className="mt-4 flex items-center gap-6">
                                            <div className="flex items-center gap-2">
                                                <Smartphone className="w-3.5 h-3.5 text-text-secondary" />
                                                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">NFC Read Verified</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="w-3.5 h-3.5 text-brand-mint" />
                                                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">EIP-712 Signed</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <div className="text-sm font-black text-white font-mono mb-1">2.4m ago</div>
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center ml-auto">
                                            <ChevronRight className="w-4 h-4 text-white/20" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div>
                            <h2 className="text-4xl font-black text-white mb-12 font-display uppercase tracking-tight">Active Drops</h2>
                            <div className="space-y-6">
                                {DROPS.map(drop => (
                                    <div key={drop.id} className="glass-card rounded-[40px] border-white/10 overflow-hidden relative group">
                                        <div className="aspect-video relative overflow-hidden">
                                            <img src={drop.image} alt={drop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 to-transparent" />
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-brand-red animate-pulse text-[10px] font-black uppercase tracking-widest">Upcoming</span>
                                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                                    <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{drop.time}</span>
                                                </div>
                                                <h3 className="text-xl font-black text-white font-display uppercase mb-1">{drop.name}</h3>
                                                <div className="text-[10px] text-brand-mint font-black uppercase tracking-widest">{drop.rarity} Rarity</div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                                                Remind Me
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-10 rounded-[48px] border-brand-mint/20 bg-brand-mint/5 flex flex-col items-center text-center">
                            <Users className="w-12 h-12 text-brand-mint mb-6" />
                            <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight mb-4">Community Nodes</h3>
                            <p className="text-text-secondary text-sm font-medium mb-8 leading-relaxed">
                                Join over 24,000 active collectors in our decentralized social layer. Share your figures, exchange metadata, and discover early prototypes.
                            </p>
                            <button className="w-full py-5 rounded-3xl bg-brand-mint text-dark-bg font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-105 transition-all">
                                Access Portal
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

