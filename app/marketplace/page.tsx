import { Header } from '@/components/layout/Header'
import { ShoppingBag, TrendingUp, History, Tag, ArrowRight } from 'lucide-react'

export default function MarketplacePage() {
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg">
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-brand-red/10 rounded-3xl flex items-center justify-center mb-10 border border-brand-red/20">
                    <ShoppingBag className="w-12 h-12 text-brand-red" />
                </div>
                <h1 className="text-5xl font-black text-white mb-6">Marketplace <span className="text-brand-red">Coming Soon</span></h1>
                <p className="text-xl text-text-secondary max-w-2xl leading-relaxed mb-12">
                    The decentralized arena for trading Avalaflow collectibles is currently being forged by our master blacksmiths.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                    <div className="glass-card p-8 rounded-3xl border border-white/5">
                        <TrendingUp className="w-8 h-8 text-brand-mint mb-4 mx-auto" />
                        <h3 className="text-lg font-bold text-white mb-2">Real-time Trading</h3>
                        <p className="text-sm text-text-secondary">Low-fee atomic swaps on Avalanche C-Chain.</p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl border border-white/5">
                        <History className="w-8 h-8 text-brand-mint mb-4 mx-auto" />
                        <h3 className="text-lg font-bold text-white mb-2">Provenance History</h3>
                        <p className="text-sm text-text-secondary">Complete physical-to-digital chain of custody.</p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl border border-white/5">
                        <Tag className="w-8 h-8 text-brand-mint mb-4 mx-auto" />
                        <h3 className="text-lg font-bold text-white mb-2">Creator Royalties</h3>
                        <p className="text-sm text-text-secondary">Supporting the artists behind every figure.</p>
                    </div>
                </div>

                <button className="btn-primary mt-12 px-10 py-4 flex items-center gap-3 group">
                    Follow Development on X <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </main>
        </div>
    )
}
