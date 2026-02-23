import { Header } from '@/components/layout/Header';
import { BookOpen, Award, ArrowDownToLine, Users, Zap, Coins } from 'lucide-react';

export default function WhitepaperPage() {
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg">
            <Header />

            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">Version 1.0 (Feb 2026)</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8">
                                The Avalaflow <br /><span className="text-brand-red">Protocol</span>
                            </h1>
                            <p className="text-xl text-text-secondary leading-relaxed mb-8">
                                Bridging the physical-digital divide through cryptographic NFC verification, dynamic NFTs, and robust tokenomics on the Avalanche Ecosystem.
                            </p>
                            <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-all px-8 py-4 rounded-full text-white font-bold backdrop-blur-md border border-white/10">
                                <ArrowDownToLine className="w-5 h-5" /> Download PDF
                            </button>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-text-secondary space-y-12">
                            <section id="executive-summary" className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <BookOpen className="w-8 h-8 text-brand-red" />
                                    1. Executive Summary
                                </h2>
                                <p>
                                    Traditional collectibles suffer from counterfeiting, lack of provenance, and disconnected secondary markets. Avalaflow presents a rigorous hardware-to-blockchain solution. By embedding cryptographic NFC chips into physical figures, we bind physical ownership to digital Ethereum-Virtual-Machine signatures, creating verifiably scarce "Digital Twins."
                                </p>
                            </section>

                            <section id="system-architecture" className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Zap className="w-8 h-8 text-brand-mint" />
                                    2. System Architecture
                                </h2>
                                <ul className="list-none pl-0 space-y-6">
                                    <li className="glass-card p-6 rounded-2xl border-white/5">
                                        <h3 className="text-xl font-bold text-white mb-2">2.1 Verification Oracle</h3>
                                        <p>A Node.js backend handles reading the NTAG 424 DNA encrypted payload, preventing clone attacks. It signs messages via EIP-712 to authorize minting.</p>
                                    </li>
                                    <li className="glass-card p-6 rounded-2xl border-white/5">
                                        <h3 className="text-xl font-bold text-white mb-2">2.2 Avalanche Smart Contracts</h3>
                                        <p>Our ERC-721 implementation includes dynamic URI updates for metadata evolution. The protocol is highly optimized for low-fee C-Chain execution.</p>
                                    </li>
                                </ul>
                            </section>

                            <section id="tokenomics" className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Coins className="w-8 h-8 text-yellow-500" />
                                    3. $AVA Tokenomics
                                </h2>
                                <p>
                                    The $AVA utility token powers the ecosystem. It is distributed primarily through the Staking Vault, where users lock their Digital Twins to provide liquidity to the underlying protocol.
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                                    <div className="bg-dark-card border border-white/5 rounded-xl p-4 text-center">
                                        <div className="text-2xl font-black text-white">40%</div>
                                        <div className="text-[10px] text-text-secondary uppercase">Ecosystem/Staking</div>
                                    </div>
                                    <div className="bg-dark-card border border-white/5 rounded-xl p-4 text-center">
                                        <div className="text-2xl font-black text-white">20%</div>
                                        <div className="text-[10px] text-text-secondary uppercase">Liquidity</div>
                                    </div>
                                    <div className="bg-dark-card border border-white/5 rounded-xl p-4 text-center">
                                        <div className="text-2xl font-black text-white">15%</div>
                                        <div className="text-[10px] text-text-secondary uppercase">Team (Vested)</div>
                                    </div>
                                    <div className="bg-dark-card border border-white/5 rounded-xl p-4 text-center">
                                        <div className="text-2xl font-black text-white">25%</div>
                                        <div className="text-[10px] text-text-secondary uppercase">Public/Partners</div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Table of Contents Sidebar */}
                    <div className="hidden lg:block w-72 sticky top-32 self-start">
                        <div className="glass-card p-6 rounded-3xl border-white/10">
                            <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                                <Users className="w-4 h-4 text-brand-red" />
                                Contents
                            </h3>
                            <ul className="space-y-4 text-sm font-medium text-text-secondary">
                                <li><a href="#executive-summary" className="hover:text-brand-red transition-colors">1. Executive Summary</a></li>
                                <li><a href="#system-architecture" className="hover:text-brand-red transition-colors">2. System Architecture</a></li>
                                <li><a href="#tokenomics" className="hover:text-brand-red transition-colors">3. $AVA Tokenomics</a></li>
                                <li><a href="#" className="hover:text-brand-red transition-colors">4. Roadmap</a></li>
                                <li><a href="#" className="hover:text-brand-red transition-colors">5. Legal</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
