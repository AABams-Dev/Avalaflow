'use client';

import Link from 'next/link';
import { Wallet, LogOut, Hexagon, Zap, Shield, Search } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { formatEther } from 'viem';
import { cn } from '@/lib/utils';

export function Header() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();

    const { data: balanceData } = useBalance({
        address: address,
    });

    const avaxBalance = balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(3) : "0.000";

    const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    const handleConnect = () => {
        connect({ connector: injected() });
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

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/5 border border-brand-red/20 text-[10px] uppercase tracking-widest font-bold text-brand-red">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                    Avalanche C-Chain
                </div>

                {isConnected && address ? (
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex flex-col items-end text-[10px] mr-1">
                            <span className="text-white font-bold">{avaxBalance} AVAX</span>
                            <span className="text-brand-mint font-bold">420.50 AVA</span>
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
                        <span>Connect Wallet</span>
                    </button>
                )}
            </div>
        </header>
    );
}
