import { ArrowRight, Smartphone, ShieldCheck, Zap, Layers, Globe, Star, Hexagon } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-bg">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-red/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-mint/5 blur-[100px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-float">
                <Star className="w-4 h-4 text-brand-mint fill-brand-mint" />
                <span className="text-xs font-bold tracking-widest uppercase text-white/80">The Future of Collectibles is Here</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
                Physical Soul. <br />
                <span className="text-brand-red">Digital Power.</span>
              </h1>

              <p className="text-xl text-text-secondary mb-12 max-w-3xl leading-relaxed">
                Avalaflow bridges the gap between physical collectible figures and digital ownership on the Avalanche C-Chain. Scan, Verify, and Mint your collection into the future.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/mint" className="btn-primary flex items-center gap-3 text-lg px-10 py-4">
                  Scan to Mint <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/explore" className="bg-white/5 border border-white/10 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm text-white flex items-center gap-3">
                  Explore Galaxy
                </Link>
              </div>
            </div>

            {/* Mockup / Visual Element */}
            <div className="mt-24 relative max-w-5xl mx-auto">
              <div className="glass-card rounded-[32px] p-2 border border-white/10">
                <div className="aspect-[21/9] rounded-[24px] bg-gradient-to-br from-brand-red/20 via-dark-card to-brand-mint/10 overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white/20 font-black text-9xl tracking-[0.2em] select-none group-hover:scale-110 transition-transform duration-700">AVALAFLOW</div>
                    </div>
                  </div>
                  {/* Floating Elements (Visual Mockups) */}
                  <div className="absolute inset-0 flex items-center justify-center gap-12">
                    <div className="w-48 h-64 glass-card rounded-2xl rotate-[-12deg] translate-y-8 animate-float shadow-2xl overflow-hidden border-brand-red/30">
                      <div className="h-40 bg-brand-red/10 flex items-center justify-center">
                        <Zap className="w-12 h-12 text-brand-red" />
                      </div>
                      <div className="p-4">
                        <div className="h-2 w-12 bg-brand-red rounded mb-2" />
                        <div className="h-4 w-24 bg-white/20 rounded" />
                      </div>
                    </div>
                    <div className="w-56 h-72 glass-card rounded-3xl scale-110 z-10 shadow-2xl overflow-hidden border-brand-mint/30">
                      <div className="h-48 bg-brand-mint/10 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-4 border-brand-mint flex items-center justify-center animate-spin-slow">
                          <ShieldCheck className="w-12 h-12 text-brand-mint" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="h-2 w-16 bg-brand-mint rounded mb-2" />
                        <div className="h-4 w-32 bg-white/20 rounded" />
                      </div>
                    </div>
                    <div className="w-48 h-64 glass-card rounded-2xl rotate-[12deg] translate-y-8 animate-float-delayed shadow-2xl overflow-hidden border-white/20">
                      <div className="h-40 bg-white/5 flex items-center justify-center">
                        <Layers className="w-12 h-12 text-text-secondary" />
                      </div>
                      <div className="p-4">
                        <div className="h-2 w-12 bg-white/20 rounded mb-2" />
                        <div className="h-4 w-24 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6 border-t border-white/5 bg-dark-card/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-10 rounded-[32px] glass-card-hover">
                <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6">
                  <Smartphone className="w-7 h-7 text-brand-red" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">NFC Verification</h3>
                <p className="text-text-secondary leading-relaxed">
                  Securely bridge physical toys to the blockchain using encrypted NFC UIDs. Each scan is unique and cryptographically verified.
                </p>
              </div>

              <div className="glass-card p-10 rounded-[32px] glass-card-hover">
                <div className="w-14 h-14 rounded-2xl bg-brand-mint/10 flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-brand-mint" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Dynamic Evolution</h3>
                <p className="text-text-secondary leading-relaxed">
                  Your NFTs aren't static. Earn achievements and participate in our ecosystem to evolve your digital companion's traits and powers.
                </p>
              </div>

              <div className="glass-card p-10 rounded-[32px] glass-card-hover">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Universal Economy</h3>
                <p className="text-text-secondary leading-relaxed">
                  Stake your collectibles to earn $AVA tokens, used for governance, exclusive mints, and marketplace fee discounts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-5xl font-black text-white mb-2">12k+</div>
                <div className="text-brand-red font-bold uppercase tracking-widest text-xs">Figures Minted</div>
              </div>
              <div>
                <div className="text-5xl font-black text-white mb-2">4.8k</div>
                <div className="text-brand-mint font-bold uppercase tracking-widest text-xs">Active Collectors</div>
              </div>
              <div>
                <div className="text-5xl font-black text-white mb-2">$2.4M</div>
                <div className="text-brand-red font-bold uppercase tracking-widest text-xs">Trading Volume</div>
              </div>
              <div>
                <div className="text-5xl font-black text-white mb-2">100%</div>
                <div className="text-brand-mint font-bold uppercase tracking-widest text-xs">Authentic</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <Link href="/" className="flex items-center gap-2.5 mb-6">
                <Hexagon className="w-8 h-8 text-brand-red fill-brand-red/10" />
                <span className="font-bold text-2xl tracking-tight text-white">
                  Avala<span className="text-brand-red">flow</span>
                </span>
              </Link>
              <p className="text-text-secondary max-w-sm mb-6">
                The premiere NFT platform for physical collectibles on the Avalanche blockchain.
              </p>
              <div className="flex gap-4">
                {/* Social Icons Placeholder */}
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-brand-red transition-colors cursor-pointer">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-brand-red transition-colors cursor-pointer">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="flex flex-col gap-4">
                <span className="text-white font-bold">Platform</span>
                <Link href="/explore" className="text-text-secondary hover:text-brand-red transition-colors">Explore</Link>
                <Link href="/mint" className="text-text-secondary hover:text-brand-red transition-colors">Mint NFC</Link>
                <Link href="/staking" className="text-text-secondary hover:text-brand-red transition-colors">Staking</Link>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-white font-bold">Resources</span>
                <Link href="/whitepaper" className="text-text-secondary hover:text-brand-red transition-colors">Whitepaper</Link>
                <Link href="/help" className="text-text-secondary hover:text-brand-red transition-colors">Help Center</Link>
                <Link href="/terms" className="text-text-secondary hover:text-brand-red transition-colors">Terms of Use</Link>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-text-secondary text-sm">
            <p>&copy; 2026 Avalaflow Ecosystem. Built on Avalanche.</p>
            <div className="flex gap-8">
              <span>Status: Active</span>
              <span className="text-brand-mint">Mainnet Live</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
