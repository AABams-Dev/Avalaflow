'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, ShoppingCart, Tag, TrendingUp,
    ArrowUpRight, Clock, Heart, Share2, Shield,
    Layers, Zap, ChevronRight, LayoutGrid, List
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MARKETS = ["All", "Figure", "Cards", "Limited", "Bundles"];

const MOCK_LISTINGS = [
    {
        id: 1,
        name: "Shadow Blade Figure",
        collection: "Origins",
        price: "450",
        currency: "AVA",
        likes: 124,
        rarity: "Legendary",
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80",
        timeLeft: "2h 45m"
    },
    {
        id: 2,
        name: "Void Core Card",
        collection: "Artifacts",
        price: "1,200",
        currency: "AVA",
        likes: 89,
        rarity: "Epic",
        image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80",
        timeLeft: "12h 10m"
    },
    {
        id: 3,
        name: "Neon Pulse Figure",
        collection: "Cyber-Series",
        price: "890",
        currency: "AVA",
        likes: 256,
        rarity: "Legendary",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
        timeLeft: "Expired"
    },
    {
        id: 4,
        name: "Ancient Relic #44",
        collection: "Elders",
        price: "2,500",
        currency: "AVA",
        likes: 412,
        rarity: "Mythic",
        image: "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=800&q=80",
        timeLeft: "3d 2h"
    },
];

export default function MarketplacePage() {
    const [selectedMarket, setSelectedMarket] = useState("All");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    return (
        <div className="flex flex-col min-h-screen bg-dark-bg selection:bg-brand-red/30">
            <Header />

            <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 py-24 pt-32 pb-32">
                {/* Hero / Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                            <Tag className="w-3 h-3 text-brand-red" />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">Global Collection Access</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-4 font-display uppercase leading-none">
                            Avalaflow <span className="text-brand-red">Exchange</span>
                        </h1>
                        <p className="text-xl text-text-secondary font-medium max-w-xl">
                            The premier high-fidelity marketplace for verifiable physical collectibles on Avalanche.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-end gap-4"
                    >
                        <div className="flex bg-white/5 p-1.5 rounded-3xl border border-white/5 backdrop-blur-md">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn("p-4 rounded-2xl transition-all", viewMode === 'grid' ? "bg-white text-dark-bg shadow-xl" : "text-white/40 hover:text-white")}
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn("p-4 rounded-2xl transition-all", viewMode === 'list' ? "bg-white text-dark-bg shadow-xl" : "text-white/40 hover:text-white")}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="hidden lg:flex items-center gap-8 px-8 py-4 glass-card rounded-[32px] border-white/5">
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Volume 24h</span>
                                <span className="text-lg font-black text-white font-mono">1.2M AVA</span>
                            </div>
                            <div className="w-[1px] h-8 bg-white/5" />
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Floor Cap</span>
                                <span className="text-lg font-black text-brand-mint font-mono">$45.2M</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Filters & Search Ticker */}
                <div className="sticky top-24 z-30 mb-12 px-2">
                    <div className="glass-card p-4 rounded-[40px] border-white/10 backdrop-blur-3xl shadow-2xl flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex-1 w-full relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                            <input
                                type="text"
                                placeholder="Search by name, collection, or hardware UID..."
                                className="w-full bg-white/5 border border-white/5 rounded-[28px] pl-16 pr-8 py-5 text-lg text-white placeholder:text-white/10 focus:border-brand-red/30 focus:bg-white/10 transition-all outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide no-scrollbar w-full md:w-auto">
                            {MARKETS.map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setSelectedMarket(m)}
                                    className={cn(
                                        "px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                                        selectedMarket === m ? "bg-brand-red text-white border-brand-red shadow-lg" : "bg-white/5 text-white/40 border-white/5 hover:bg-white/10"
                                    )}
                                >
                                    {m}
                                </button>
                            ))}
                            <div className="w-[1px] h-8 bg-white/10 mx-2" />
                            <button className="p-4 bg-white/5 border border-white/5 rounded-[24px] hover:bg-white/10 transition-all text-white/40 hover:text-white flex items-center gap-2">
                                <Filter className="w-5 h-5" />
                                <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest">Advanced</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Listing Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {MOCK_LISTINGS.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.6 }}
                                className="glass-card rounded-[48px] border-white/5 flex flex-col group hover:border-brand-red/30 transition-all duration-500 overflow-hidden relative"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[4/5] p-5 overflow-hidden">
                                    <div className="w-full h-full rounded-[40px] overflow-hidden relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {/* Tags */}
                                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                                            <div className="flex flex-col gap-2">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-md border",
                                                    item.rarity === 'Legendary' ? 'bg-orange-500/20 text-orange-500 border-orange-500/20' :
                                                        item.rarity === 'Epic' ? 'bg-brand-mint/20 text-brand-mint border-brand-mint/20' :
                                                            'bg-brand-red/20 text-brand-red border-brand-red/20'
                                                )}>
                                                    #{item.rarity}
                                                </span>
                                                <span className="px-3 py-1.5 bg-black/40 text-white/80 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-md border border-white/10">
                                                    {item.collection}
                                                </span>
                                            </div>
                                            <button className="p-3 bg-black/20 hover:bg-brand-red/80 backdrop-blur-md rounded-2xl border border-white/10 transition-all group/btn">
                                                <Heart className="w-4 h-4 text-white group-hover/btn:fill-white" />
                                            </button>
                                        </div>

                                        {/* Hover Actions */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                            <button className="px-10 py-5 bg-white text-dark-bg rounded-[24px] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-transform">
                                                Fast Buy
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Container */}
                                <div className="p-10 pt-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-black text-white font-display uppercase tracking-tight group-hover:text-brand-red transition-colors">{item.name}</h3>
                                        <div className="flex items-center gap-1.5 text-text-secondary text-[10px] font-black uppercase tracking-widest">
                                            <Clock className="w-3.5 h-3.5" /> {item.timeLeft}
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between p-6 rounded-[32px] bg-white/5 border border-white/5 group-hover:bg-white/10 transition-all">
                                        <div>
                                            <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Current Offer</div>
                                            <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
                                                {item.price} <span className="text-sm text-brand-red font-display">{item.currency}</span>
                                            </div>
                                        </div>
                                        <button className="w-12 h-12 rounded-2xl bg-brand-red text-white flex items-center justify-center shadow-lg shadow-brand-red/20 hover:scale-110 transition-transform">
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between px-2">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-bg bg-white/5 overflow-hidden">
                                                    <div className="w-full h-full bg-gradient-to-br from-brand-red to-orange-500 opacity-40" />
                                                </div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full border-2 border-dark-bg bg-white/10 flex items-center justify-center text-[8px] font-black text-white uppercase">
                                                +{item.likes}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-white/20">
                                            <Share2 className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                                            <ArrowUpRight className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Market Summary Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 p-16 rounded-[64px] bg-gradient-to-br from-brand-red/10 via-dark-bg to-brand-mint/10 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-3xl -z-10" />
                    <div className="flex-1">
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 font-display uppercase tracking-tight">Institutional <br />Liquidity Access</h2>
                        <p className="text-text-secondary text-lg font-medium max-w-xl">
                            Our proprietary matching engine handles over 50k transactions per second with sub-10ms latency on the Avalaflow Subnet.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button className="px-12 py-6 bg-brand-red text-white rounded-[24px] font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(232,65,66,0.3)] hover:scale-105 transition-all">
                            Sell Assets
                        </button>
                        <button className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[24px] font-black uppercase tracking-widest text-sm backdrop-blur-md hover:bg-white/10 transition-all">
                            API Documentation
                        </button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
