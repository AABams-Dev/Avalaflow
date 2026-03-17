'use client';

import { Header } from '@/components/layout/Header';
import { ShieldAlert, BookOpen, Scale, Gavel, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg selection:bg-brand-red/30">
            <Header />

            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-24 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row items-center gap-6 mb-16"
                >
                    <div className="w-20 h-20 rounded-3xl bg-brand-red/10 flex items-center justify-center border border-brand-red/20 shadow-2xl shadow-brand-red/10">
                        <Gavel className="w-10 h-10 text-brand-red" />
                    </div>
                    <div>
                        <h1 className="text-6xl font-black text-white tracking-tight font-display uppercase">Rules of <span className="text-brand-red">Engagement</span></h1>
                        <p className="text-text-secondary font-black uppercase tracking-[0.2em] text-[10px] mt-2 ml-1">Protocol Governance & Legal Framework</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="glass-card p-10 sm:p-20 rounded-[48px] border border-white/5 space-y-12 text-text-secondary leading-relaxed backdrop-blur-3xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 blur-[120px] -z-10" />

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-brand-red uppercase tracking-widest bg-brand-red/10 px-3 py-1 rounded-full">Section 01</span>
                            <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight">Acceptance of Terms</h2>
                        </div>
                        <p className="text-lg">
                            By accessing and interacting with the Avalaflow Subnet, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use and all applicable decentralized governance regulations. If you do not agree with any of these terms, you are prohibited from using the protocol.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-brand-mint uppercase tracking-widest bg-brand-mint/10 px-3 py-1 rounded-full">Section 02</span>
                            <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight">Digital Assets and Ownership</h2>
                        </div>
                        <p className="text-lg">
                            Avalaflow facilitates the secure mapping of physical artifacts to ERC-721 Digital Twins on the Avalanche C-Chain. Ownership of an Avalaflow NFT confirms possession of the digital surrogate and its associated metadata on-chain. Commercial licensing of character IP remains vested in the original creators unless an explicit Smart Contract Grant is executed.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full">Section 03</span>
                            <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight">Operational Security</h2>
                        </div>
                        <ul className="grid gap-4 list-none p-0">
                            {[
                                "Users maintain sole custody and liability for their cryptographic private keys.",
                                "Platform interaction must not violate international AML/CFT regulation.",
                                "Extraction of system value via smart contract exploitation is strictly forbidden."
                            ].map((text, i) => (
                                <li key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all font-medium">
                                    <ShieldCheck className="w-5 h-5 text-brand-mint shrink-0" />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Section 04</span>
                            <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight">Assumption of Risk</h2>
                        </div>
                        <p className="text-lg">
                            Cryptographic asset interactions involve inherent volatility and technical complexity. You assume all catastrophic risks associated with blockchain state changes, smart contract execution, and hardware interface failures. Avalaflow Core Contributors are not liable for equity dissipation due to market volatility.
                        </p>
                    </section>

                    <section>
                        <div className="p-8 bg-brand-red/10 border border-brand-red/20 rounded-[32px] mt-12 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                            <AlertTriangle className="w-10 h-10 text-brand-red shrink-0" />
                            <div>
                                <h4 className="text-white font-black uppercase tracking-widest mb-2 font-display">Protocol Disclaimer</h4>
                                <p className="text-sm text-white/60 font-medium">
                                    The Avalaflow protocol is provided <span className="text-white">"AS IS"</span> without warranty of any kind. Automated code is law—exercise extreme caution.
                                </p>
                            </div>
                        </div>
                    </section>
                </motion.div>

                <div className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                    Last Updated: March 2026 • Avalaflow Foundation
                </div>
            </main>
        </div>
    );
}
