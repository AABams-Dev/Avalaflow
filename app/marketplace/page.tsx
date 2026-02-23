'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { useNFTs } from '@/hooks/useNFTs';
import { Search, Filter, Grid, List, Sparkles, Zap, ShoppingCart, Loader2, ArrowRight, Shield } from 'lucide-react';
import { useAccount, useWriteContract } from 'wagmi';
import { AVALA_NFT_ADDRESS, AVALA_NFT_ABI } from '@/lib/contracts';
import { formatUnits, parseEther } from 'viem';

export default function MarketplacePage() {
    const { nfts, isLoading } = useNFTs();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState('');
    const CATEGORIES = ["All", "Trending", "Art", "PFP", "Gaming", "Photography"];

    const filteredNFTs = nfts.filter(nft =>
        nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nft.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { writeContract, isPending } = useWriteContract();
    const { isConnected } = useAccount();

    const handleMintJoepeg = () => {
        if (!isConnected) return alert("Connect wallet first!");

        // Simulating the user minting/buying from our marketplace UI 
        // using the underlying Avalaflow protocol 
        writeContract({
            address: AVALA_NFT_ADDRESS as `0x${string}`,
            abi: AVALA_NFT_ABI,
            functionName: 'mintFigure',
            args: ["JOEPEG-NFC-" + Math.random().toString(36).substring(7), "0x00", "ipfs://QmMockJoepegURI..."],
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#06080F]"> {/* Very dark background like Joepegs */}
            <Header />

            <main className="flex-1 w-full pb-20">
                {/* Hero Banner Section */}
                <div className="relative w-full h-[400px] bg-gradient-to-r from-brand-red/20 via-black to-brand-mint/10 border-b border-white/5 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                    <div className="relative z-10 text-center px-6">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
                            The Avalanche <br /><span className="text-brand-red">Marketplace</span>
                        </h1>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
                            Discover, collect, and trade extraordinary NFTs across the Avalanche Ecosystem. Powered by Joepegs & Avalaflow.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button className="btn-primary px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2">
                                <Search className="w-5 h-5" /> Explore Collections
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1600px] mx-auto w-full px-6 py-12">

                    {/* Filters and Search - Joepegs style */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between sticky top-[73px] bg-[#06080F]/90 backdrop-blur-xl z-40 py-4 border-b border-white/5">
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-white text-black' : 'bg-[#11131A] text-text-secondary hover:text-white border border-white/5'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex-1 md:w-80 flex items-center gap-3 bg-[#11131A] border border-white/5 rounded-full px-4 py-2.5 focus-within:border-brand-red/50 transition-colors">
                                <Search className="w-4 h-4 text-text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Search items, collections..."
                                    className="bg-transparent border-none outline-none text-sm text-white w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex bg-[#11131A] border border-white/5 rounded-full p-1">
                                <button className="p-2 bg-[#2A2E3D] rounded-full text-white"><Grid className="w-4 h-4" /></button>
                                <button className="p-2 text-text-secondary hover:text-white transition-colors"><List className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>

                    {/* NFT Grid - Mixed with on-chain data */}
                    <h2 className="text-xl font-bold text-white mb-6">Explore Items</h2>

                    {isLoading ? (
                        <div className="flex justify-center py-32">
                            <Loader2 className="w-10 h-10 text-brand-red animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredNFTs.length === 0 ? (
                                <div className="col-span-full text-center py-20 bg-[#11131A] rounded-3xl border border-white/5">
                                    <p className="text-text-secondary mb-4">No NFTs found on the protocol matching your search.</p>
                                    <button onClick={handleMintJoepeg} className="btn-primary py-2 px-6 rounded-full text-sm flex items-center mx-auto gap-2">
                                        <Zap className="w-4 h-4" /> Mint Demo NFT
                                    </button>
                                </div>
                            ) : (
                                filteredNFTs.map((nft) => (
                                    <div key={nft.id} className="bg-[#11131A] border border-white/5 rounded-[24px] overflow-hidden group hover:border-brand-red/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(232,65,66,0.15)] flex flex-col">
                                        <div className="aspect-square relative bg-[#1A1D27] overflow-hidden flex items-center justify-center p-6">
                                            {/* Dynamic color based on NFT ID for visual variety */}
                                            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-brand-red to-brand-mint mix-blend-overlay group-hover:opacity-40 transition-opacity"></div>
                                            <Sparkles className="w-16 h-16 text-white/10 group-hover:scale-110 transition-transform duration-500" />

                                            {/* Joepegs style badges */}
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
                                                <span className="text-[10px] font-bold text-white tracking-wider">LIVE</span>
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <div className="text-[10px] uppercase font-bold text-text-secondary tracking-wider mb-1">Avalaflow Protocol</div>
                                                    <h3 className="font-bold text-white text-lg truncate group-hover:text-brand-red transition-colors">{nft.name}</h3>
                                                </div>
                                            </div>

                                            <div className="bg-[#06080F] rounded-xl p-3 border border-white/5 mb-4 flex justify-between items-center">
                                                <div>
                                                    <div className="text-[10px] text-text-secondary font-medium">Price</div>
                                                    <div className="font-bold text-white flex items-center gap-1">
                                                        {nft.price}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] text-text-secondary font-medium">Owner</div>
                                                    <div className="font-mono text-xs text-brand-mint">{nft.owner}</div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleMintJoepeg}
                                                disabled={isPending}
                                                className="w-full mt-auto bg-brand-red text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-red/90 transition-colors"
                                            >
                                                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
                                                Buy Now
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
