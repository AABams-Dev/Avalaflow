'use client';

import Link from 'next/link';
import { Hexagon, Globe, Star } from 'lucide-react';

export function Footer() {
    return (
        <footer className="py-20 border-t border-white/5 bg-dark-bg">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                    <div>
                        <Link href="/" className="flex items-center gap-2.5 mb-6 group">
                            <Hexagon className="w-8 h-8 text-brand-red fill-brand-red/10 border-brand-red/20 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-2xl tracking-tight text-white font-display">
                                AVALA<span className="text-brand-red">FLOW</span>
                            </span>
                        </Link>
                        <p className="text-text-secondary max-w-sm mb-6 font-medium">
                            The premiere NFT platform for physical collectibles on the Avalanche blockchain. Bridging artifacts with cryptographic souls.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-brand-red transition-colors cursor-pointer group">
                                <Globe className="w-5 h-5 text-white group-hover:text-brand-red transition-colors" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-brand-red transition-colors cursor-pointer group">
                                <Star className="w-5 h-5 text-white group-hover:text-brand-red transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
                        <div className="flex flex-col gap-4">
                            <span className="text-white font-black uppercase tracking-widest text-[10px]">Platform</span>
                            <Link href="/explore" className="text-text-secondary font-bold hover:text-brand-red transition-colors">Explore</Link>
                            <Link href="/mint" className="text-text-secondary font-bold hover:text-brand-red transition-colors">Mint NFC</Link>
                            <Link href="/staking" className="text-text-secondary font-bold hover:text-brand-red transition-colors">Staking</Link>
                            <Link href="/trade" className="text-text-secondary font-bold hover:text-brand-red transition-colors">Trade</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-white font-black uppercase tracking-widest text-[10px]">Ecosystem</span>
                            <Link href="/marketplace" className="text-text-secondary font-bold hover:text-brand-red transition-colors">Marketplace</Link>
                            <Link href="/liquidity" className="text-text-secondary font-bold hover:text-brand-red transition-colors">Liquidity</Link>
                            <Link href="/referrals" className="text-text-secondary font-bold hover:text-brand-red transition-colors">Referrals</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-white font-black uppercase tracking-widest text-[10px]">Resources</span>
                            <Link href="/whitepaper" className="text-text-secondary font-bold hover:text-brand-red transition-colors">Whitepaper</Link>
                            <Link href="/help" className="text-text-secondary font-bold hover:text-brand-red transition-colors">Help Center</Link>
                            <Link href="/terms" className="text-text-secondary font-bold hover:text-brand-red transition-colors">Terms of Use</Link>
                        </div>
                    </div>
                </div>
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-text-secondary text-[10px] font-black uppercase tracking-[0.2em]">
                    <p>&copy; 2026 Avalaflow Ecosystem. Built on Avalanche.</p>
                    <div className="flex gap-8">
                        <span>Status: <span className="text-white">Active</span></span>
                        <span className="text-brand-mint">Mainnet Live</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
