'use client';

import Link from 'next/link';
import { Wallet, LogOut, Hexagon, Zap, Shield, Search, Menu, X } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useState } from 'react';
import { formatEther } from 'viem';
import { cn } from '@/lib/utils';
import { useStakingData } from '@/hooks/useStakingData';

export function Header() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { rewardsBalance } = useStakingData();

    const { data: balanceData } = useBalance({
        address: address,
    });

    const avaxBalance = balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(3) : "0.000";

    const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    const handleConnect = () => {
        try {
            if (typeof window !== 'undefined' && !(window as any).ethereum) {
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile) {
                    // Deep link directly to the MetaMask mobile app browser
                    window.location.href = `https://metamask.app.link/dapp/${window.location.host}`;
                    return;
                }
                alert("Please install a Web3 wallet extension like MetaMask to connect.");
                return;
            }
            connect({ connector: injected() });
        } catch (e) {
            console.error("Connection error:", e);
            alert("Connection error occurred. Please try again.");
        }
    };

    return (
        <header className="px-6 py-4 flex items-center justify-between border-b border-dark-border bg-dark-bg/60 backdrop-blur-xl sticky top-0 z-50">
            <div className="flex items-center gap-10">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative">
                        <Hexagon className="w-9 h-9 text-brand-red fill-brand-red/10 group-hover:rotate-12 transition-transform duration-300" />
                        <Zap className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white">
                        Avala<span className="text-brand-red">flow</span>
                    </span>
                </Link>

                <nav className="hidden lg:flex items-center gap-8">
                    <Link href="/explore" className="text-sm font-semibold text-text-secondary hover:text-white transition-all hover:scale-105">Explore</Link>
                    <Link href="/mint" className="text-sm font-semibold text-text-secondary hover:text-white transition-all hover:scale-105">Mint</Link>
                    <Link href="/staking" className="text-sm font-semibold text-text-secondary hover:text-white transition-all hover:scale-105">Staking</Link>
                    <Link href="/marketplace" className="text-sm font-semibold text-text-secondary hover:text-white transition-all hover:scale-105">Marketplace</Link>
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center bg-dark-card/50 border border-dark-border rounded-full px-4 py-2 gap-2 focus-within:border-brand-red/50 transition-all">
                    <Search className="w-4 h-4 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search collectibles..."
                        className="bg-transparent border-none outline-none text-xs text-white w-48"
                    />
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-[10px] uppercase tracking-widest font-bold text-brand-mint">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
                    Fuji Testnet
                </div>

                {isConnected && address && parseFloat(avaxBalance) === 0 ? (
                    <a
                        href="https://core.app/tools/testnet-faucet/?subnet=c&token=c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="animate-pulse flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-mint border border-brand-mint text-[10px] uppercase tracking-widest font-black text-dark-bg hover:bg-white transition-all shadow-[0_0_15px_rgba(46,204,113,0.4)]"
                    >
                        <Zap className="w-3 h-3" />
                        Request Faucet AVAX
                    </a>
                ) : (
                    <a
                        href="https://core.app/tools/testnet-faucet/?subnet=c&token=c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white hover:bg-white/10 hover:text-brand-mint transition-all"
                    >
                        <Zap className="w-3 h-3 text-brand-mint" />
                        Testnet Faucet
                    </a>
                )}

                {isConnected && address ? (
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex flex-col items-end text-[10px] mr-1">
                            <span className="text-white font-bold">{avaxBalance} AVAX</span>
                            <span className="text-brand-mint font-bold">{Number(rewardsBalance).toFixed(2)} AVA</span>
                        </div>

                        <div className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-full pl-4 pr-1.5 py-1.5 glass-card">
                            <span className="text-xs font-bold text-white/90">{truncateAddress(address)}</span>
                            <button
                                onClick={() => disconnect()}
                                className="p-2 hover:bg-brand-red/10 rounded-full transition-all text-text-secondary hover:text-brand-red"
                                title="Disconnect"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={handleConnect}
                        className="btn-primary flex items-center gap-2 text-sm"
                    >
                        <Wallet className="w-4 h-4" />
                        <span className="hidden sm:inline">Connect Wallet</span>
                        <span className="sm:hidden">Connect</span>
                    </button>
                )}

                <button
                    className="lg:hidden p-2 text-text-secondary hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-dark-bg/95 backdrop-blur-3xl border-b border-dark-border p-6 flex flex-col gap-6 lg:hidden z-50">
                    <nav className="flex flex-col gap-4">
                        <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white hover:text-brand-red transition-colors">Explore</Link>
                        <Link href="/mint" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white hover:text-brand-red transition-colors">Mint</Link>
                        <Link href="/staking" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white hover:text-brand-red transition-colors">Staking</Link>
                        <Link href="/marketplace" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white hover:text-brand-red transition-colors">Marketplace</Link>
                        <div className="h-px bg-white/10 my-2" />
                        <Link href="/whitepaper" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-secondary hover:text-white transition-colors">Whitepaper</Link>
                        <Link href="/help" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-secondary hover:text-white transition-colors">Help Center</Link>
                        <Link href="/terms" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-secondary hover:text-white transition-colors">Terms of Use</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
