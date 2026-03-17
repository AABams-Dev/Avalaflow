'use client';

import Link from 'next/link';
import { Wallet, LogOut, Hexagon, Zap, Shield, Search, Menu, X, ArrowRight } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useBalance, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { avalancheFuji } from 'wagmi/chains';
import { useState, useEffect } from 'react';
import { formatEther } from 'viem';
import { cn } from '@/lib/utils';
import { useStakingData } from '@/hooks/useStakingData';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
    const { address, isConnected, chainId } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { switchChain } = useSwitchChain();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { rewardsBalance } = useStakingData();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { data: balanceData } = useBalance({
        address: address,
        chainId: avalancheFuji.id,
    });

    const avaxBalance = balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(3) : "0.000";

    const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    const handleConnect = () => {
        try {
            if (typeof window !== 'undefined' && !(window as any).ethereum) {
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile) {
                    window.location.href = `https://metamask.app.link/dapp/${window.location.host}`;
                    return;
                }
                alert("Please install a Web3 wallet extension like MetaMask to connect.");
                return;
            }
            connect({ connector: injected(), chainId: avalancheFuji.id });
        } catch (e) {
            console.error("Connection error:", e);
            alert("Connection error occurred. Please try again.");
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={cn(
                    "flex items-center justify-between transition-all duration-300 rounded-[2rem]",
                    scrolled ? "glass-card px-6 py-3 w-full max-w-5xl shadow-2xl" : "px-6 py-4 w-full max-w-7xl bg-transparent"
                )}
            >
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative flex items-center justify-center w-10 h-10 bg-brand-red/10 rounded-xl border border-brand-red/20 shadow-[0_0_15px_rgba(232,65,66,0.2)] group-hover:shadow-[0_0_25px_rgba(232,65,66,0.4)] transition-all">
                            <Hexagon className="w-6 h-6 text-brand-red fill-brand-red/20" />
                        </div>
                        <span className="font-black text-xl tracking-tight text-white hidden sm:block font-display">
                            AVALA<span className="text-brand-red">FLOW</span>
                        </span>
                    </Link>

                    <nav className="hidden xl:flex items-center gap-6 bg-dark-card/50 px-6 py-2.5 rounded-full border border-white/5 backdrop-blur-md">
                        <Link href="/explore" className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors">Explore</Link>
                        <Link href="/mint" className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors">Mint</Link>
                        <Link href="/staking" className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors">Vault</Link>
                        <Link href="/marketplace" className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors">Market</Link>
                        <Link href="/trade" className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors">Trade</Link>
                        <Link href="/liquidity" className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors">Yield</Link>
                        <Link href="/referrals" className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors">Nexus</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {isConnected && address ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden lg:flex items-center gap-2 bg-dark-card px-4 py-2 rounded-full border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
                                <span className="text-xs font-bold font-mono">{truncateAddress(address)}</span>
                            </div>
                            <button
                                onClick={() => disconnect()}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red/20 hover:text-brand-red hover:border-brand-red/50 transition-all"
                                title="Disconnect"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleConnect}
                            className="bg-white text-dark-bg font-black px-6 py-2.5 rounded-full hover:bg-white/90 transition-all flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            <span>Connect</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}

                    <button
                        className="lg:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute top-24 left-4 right-4 glass-card rounded-[32px] p-6 lg:hidden z-40 border border-brand-red/20 shadow-[-0_0_50px_rgba(232,65,66,0.15)]"
                    >
                        <nav className="flex flex-col gap-4 text-center">
                            <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white hover:text-brand-red transition-colors font-display uppercase tracking-widest">Explore</Link>
                            <Link href="/mint" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white hover:text-brand-red transition-colors font-display uppercase tracking-widest">Mint</Link>
                            <Link href="/staking" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white hover:text-brand-red transition-colors font-display uppercase tracking-widest">Vault</Link>
                            <Link href="/marketplace" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white hover:text-brand-red transition-colors font-display uppercase tracking-widest">Market</Link>
                            <Link href="/trade" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white hover:text-brand-red transition-colors font-display uppercase tracking-widest">Trade</Link>
                            <Link href="/liquidity" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white hover:text-brand-red transition-colors font-display uppercase tracking-widest">Yield</Link>
                            <Link href="/referrals" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white hover:text-brand-red transition-colors font-display uppercase tracking-widest">Nexus</Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
