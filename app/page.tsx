'use client';

import { ArrowRight, Smartphone, ShieldCheck, Zap, Layers, Globe, Star, Hexagon } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { StatsSection } from '@/components/StatsSection'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg selection:bg-brand-red/30">
      <Header />

      <main className="flex-1">
        {/* Cinematic Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-20 px-6 overflow-hidden">
          {/* Framer Motion Particle Effects (Simulated with DOM for simplicity of setup) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  opacity: Math.random() * 0.5 + 0.1
                }}
                animate={{
                  y: [null, Math.random() * -100 - 50],
                  opacity: [null, 0]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
              />
            ))}
            {/* Glow Orbs */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-red/15 blur-[120px] rounded-full mix-blend-screen"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-mint/10 blur-[100px] rounded-full mix-blend-screen"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-start text-left pt-12 lg:pt-0"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                  <Star className="w-4 h-4 text-brand-mint fill-brand-mint animate-pulse-slow" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80">Next-Gen Collectibles</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[1.05] tracking-tight font-display uppercase">
                  Physical <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-[#FF8A8A] drop-shadow-[0_0_20px_rgba(232,65,66,0.3)]">
                    Dominance.
                  </span>
                </h1>

                <p className="text-xl text-text-secondary mb-10 max-w-xl leading-relaxed">
                  Bridge the gap between physical collectible figures and digital verification on the Avalanche C-Chain. Supreme aesthetics meet immutable ownership.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                  <Link href="/mint" className="btn-primary flex items-center justify-center gap-3 text-lg px-10 py-5 w-full sm:w-auto">
                    Summon Twin <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/explore" className="bg-white/5 border border-white/10 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm text-white flex items-center justify-center gap-3 hover:border-white/20">
                    Explore Vault
                  </Link>
                </div>

                {/* Authority metrics */}
                <div className="mt-16 flex items-center gap-8 border-t border-white/5 pt-8 w-full max-w-md">
                  <div>
                    <div className="text-3xl font-black text-white font-display">100%</div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mt-1">Hardware Verified</div>
                  </div>
                  <div className="w-px h-12 bg-white/10"></div>
                  <div>
                    <div className="text-3xl font-black text-brand-mint font-display">&lt;1s</div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mt-1">Fuji Mint Time</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Mockup / 3D Element Showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.4 }}
                className="relative lg:h-[700px] flex items-center justify-center pointer-events-none mt-16 lg:mt-0"
              >
                {/* Central Floating Figure Card */}
                <div className="relative z-20 glass-card p-4 rounded-[40px] border border-brand-red/30 shadow-[0_0_80px_rgba(232,65,66,0.15)] animate-float">
                  <div className="absolute top-6 left-6 z-30 flex gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-dark-bg/80 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                      Obsidian Edition
                    </span>
                  </div>
                  <div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-[32px] overflow-hidden relative group bg-dark-bg">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 via-transparent to-brand-mint/10 opacity-50 mixing-blend-screen" />

                    {/* Mock 3D Figure (using pure CSS shapes/glows to simulate abstract premium collectible) */}
                    <div className="absolute inset-0 flex items-center justify-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                      <div className="relative w-48 h-64 md:w-64 md:h-80 opacity-90">
                        {/* Abstract Geometry representing the figure */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/5 border border-white/20 rounded-full rotate-45 transform-gpu blur-[1px] shadow-[0_0_50px_rgba(255,255,255,0.1)]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-red/10 border border-brand-red/30 rounded-3xl -rotate-12 transform-gpu blur-[2px] shadow-[0_0_80px_rgba(232,65,66,0.3)]" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-dark-card border border-white/10 rounded-xl rotate-12 transform-gpu shadow-2xl overflow-hidden flex items-center justify-center">
                          <Hexagon className="w-24 h-24 text-brand-red/50 stroke-[0.5]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orbital Trait Cards */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 -right-12 md:-right-8 z-30 glass-card p-4 rounded-2xl border-white/10 shadow-2xl pointer-events-auto"
                >
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mb-1">Rarity</div>
                  <div className="text-xl font-black text-brand-red font-display">Supreme</div>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-1/4 -left-12 md:-left-8 z-30 glass-card p-4 rounded-2xl border-white/10 shadow-2xl pointer-events-auto"
                >
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mb-1">Power Level</div>
                  <div className="text-xl font-black text-brand-mint font-display flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-brand-mint" /> 9,420
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* Cinematic Features Grid */}
        <section className="py-32 px-6 border-t border-white/5 bg-dark-card/20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent opacity-50" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-white font-display mb-4">Architectural <span className="text-brand-red">Excellence</span></h2>
              <p className="text-text-secondary max-w-2xl mx-auto">Built precisely on Avalanche C-Chain for instantaneous settlement and cryptographically proven authenticity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-10 rounded-[32px] glass-card-hover group border-white/5 hover:border-brand-red/40">
                <div className="w-16 h-16 rounded-3xl bg-brand-red/10 flex items-center justify-center mb-8 border border-brand-red/20 group-hover:bg-brand-red transition-colors duration-500">
                  <Smartphone className="w-8 h-8 text-brand-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white font-display">NFC Encryption</h3>
                <p className="text-text-secondary leading-relaxed group-hover:text-white/80 transition-colors">
                  Securely bridge physical toys using encrypted NFC UIDs. Each scan is dynamically signed by the collector.
                </p>
              </div>

              <div className="glass-card p-10 rounded-[32px] glass-card-hover group border-white/5 hover:border-brand-mint/40">
                <div className="w-16 h-16 rounded-3xl bg-brand-mint/10 flex items-center justify-center mb-8 border border-brand-mint/20 group-hover:bg-brand-mint transition-colors duration-500">
                  <Layers className="w-8 h-8 text-brand-mint group-hover:text-dark-bg transition-colors" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white font-display">Living Meta</h3>
                <p className="text-text-secondary leading-relaxed group-hover:text-white/80 transition-colors">
                  Your NFTs aren't static JPEGs. Trait powers evolve directly on-chain based on community action and staking parameters.
                </p>
              </div>

              <div className="glass-card p-10 rounded-[32px] glass-card-hover group border-white/5 hover:border-white/40">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white transition-colors duration-500">
                  <ShieldCheck className="w-8 h-8 text-white group-hover:text-dark-bg transition-colors" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white font-display">Sovereign Vault</h3>
                <p className="text-text-secondary leading-relaxed group-hover:text-white/80 transition-colors">
                  Stake your assets into the Avalaflow smart contracts to passively accumulate network authority and $AVA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />
      </main>
    </div>
  )
}
