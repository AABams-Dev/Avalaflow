'use client';

import { Header } from '@/components/layout/Header';
import { BookOpen, Award, ArrowDownToLine, Users, Zap, Coins, Shield, Globe, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhitepaperPage() {
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg selection:bg-brand-red/30">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-24 pt-32">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Main Content */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-20"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">Protocol v1.0.4</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-10 font-display uppercase leading-none">
                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-[#FF8A8A]">Avalaflow</span> <br />Architecture
                            </h1>
                            <p className="text-2xl text-text-secondary leading-relaxed mb-10 font-medium max-w-2xl">
                                Engineering the future of physical-to-digital equity through cryptographic NFC synchronization and the Avalanche C-Chain.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="flex items-center gap-3 bg-brand-red hover:scale-105 transition-all px-10 py-5 rounded-full text-white font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(232,65,66,0.3)] group">
                                    <ArrowDownToLine className="w-5 h-5 group-hover:translate-y-1 transition-transform" /> Spec PDF
                                </button>
                                <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-all px-10 py-5 rounded-full text-white font-black uppercase tracking-widest text-sm border border-white/10 backdrop-blur-md">
                                    <Globe className="w-5 h-5" /> Explore Subnet
                                </button>
                            </div>
                        </motion.div>

                        <div className="prose prose-invert prose-2xl max-w-none text-text-secondary space-y-24">
                            <motion.section
                                id="executive-summary"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="scroll-mt-32"
                            >
                                <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-4 font-display uppercase tracking-tight">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center border border-brand-red/20">
                                        <BookOpen className="w-6 h-6 text-brand-red" />
                                    </div>
                                    01. Executive Thesis
                                </h2>
                                <p className="text-xl leading-relaxed font-medium">
                                    Legacy collectibles are tethered to analog verification methods that fail in a global secondary market. Avalaflow introduces <span className="text-white font-bold">Cryptographic Anchoring</span>—a protocol that binds high-security hardware (NTAG 424 DNA) to EVM-compatible digital signatures. This ensures that every physical asset has a singular, untamperable digital soul.
                                </p>
                            </motion.section>

                            <motion.section
                                id="system-architecture"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="scroll-mt-32"
                            >
                                <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-4 font-display uppercase tracking-tight">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-mint/10 flex items-center justify-center border border-brand-mint/20">
                                        <Zap className="w-6 h-6 text-brand-mint" />
                                    </div>
                                    02. Technical Implementation
                                </h2>
                                <div className="grid gap-6">
                                    <div className="glass-card p-10 rounded-[40px] border-white/5 group hover:border-white/10 transition-all duration-500">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Shield className="w-5 h-5 text-brand-red" />
                                            <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">2.1 Verification Oracle</h3>
                                        </div>
                                        <p className="text-lg leading-relaxed">Avalaflow utilizes a decentralized oracle network to verify the SUN (Secure Unique Nonce) generated by the onboard NFC hardware. This process prevents replay attacks and ensures that only physically scanned items can trigger metadata updates or transfers.</p>
                                    </div>

                                    <div className="glass-card p-10 rounded-[40px] border-white/5 group hover:border-white/10 transition-all duration-500">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Layers className="w-5 h-5 text-brand-mint" />
                                            <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">2.2 Dynamic Metadata</h3>
                                        </div>
                                        <p className="text-lg leading-relaxed">Unlike static NFTs, Avalaflow Digital Twins feature active state management. Physical interactions (scans, games, events) update on-chain traits, evolving the NFT's rarity and utility in real-time on the Avalanche C-Chain.</p>
                                    </div>
                                </div>
                            </motion.section>

                            <motion.section
                                id="tokenomics"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="scroll-mt-32"
                            >
                                <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-4 font-display uppercase tracking-tight">
                                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                                        <Coins className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    03. $AVA Ecosystem
                                </h2>
                                <p className="text-xl leading-relaxed font-medium mb-10">
                                    The $AVA token is the fuel for the Avalaflow Subnet. It incentivizes hardware verification and secures the platform's liquidity layer through physical-backed staking.
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { val: "40%", label: "Ecosystem" },
                                        { val: "20%", label: "Liquidity" },
                                        { val: "15%", label: "Founders" },
                                        { val: "25%", label: "Public" }
                                    ].map((item, i) => (
                                        <div key={i} className="glass-card p-8 rounded-3xl border-white/5 text-center group hover:bg-white/5 transition-all">
                                            <div className="text-4xl font-black text-white mb-2 font-display">{item.val}</div>
                                            <div className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em]">{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        </div>
                    </div>

                    {/* Table of Contents Sidebar */}
                    <aside className="hidden lg:block w-80 sticky top-32 self-start">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="glass-card p-10 rounded-[40px] border-white/10"
                        >
                            <h3 className="font-black text-white uppercase tracking-[0.2em] text-[10px] mb-10 flex items-center gap-3">
                                <Activity className="w-4 h-4 text-brand-red" />
                                Documentation
                            </h3>
                            <ul className="space-y-6 text-sm font-black uppercase tracking-widest text-text-secondary">
                                {['Executive Thesis', 'Technical Implementation', 'AVA Ecosystem', 'Roadmap', 'Legal Frame'].map((text, i) => (
                                    <li key={i}>
                                        <a
                                            href={`#${text.toLowerCase().replace(' ', '-')}`}
                                            className="hover:text-brand-red transition-all flex items-center gap-3 group"
                                        >
                                            <span className="text-[8px] opacity-20">0{i + 1}</span>
                                            <span className="group-hover:translate-x-1 transition-transform">{text}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-12 pt-8 border-t border-white/5">
                                <div className="flex items-center gap-2 mb-4">
                                    <ShieldCheck className="w-4 h-4 text-brand-mint" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Audited Protocol</span>
                                </div>
                                <p className="text-[10px] text-text-secondary leading-relaxed font-bold">
                                    All Avalaflow smart contracts have been formally verified for the Avalanche Fuji Testnet.
                                </p>
                            </div>
                        </motion.div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

import { Activity, ShieldCheck } from 'lucide-react';
