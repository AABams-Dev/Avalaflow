import { Header } from '@/components/layout/Header'
import { Filter, Search, Grid, List, Flame, Zap, Shield, Sparkles } from 'lucide-react'

const FEATURED_COLLECTIONS = [
    { id: 1, name: "Avala-Mecha Gen 1", creator: "CyberLabs", price: "12.5 AVAX", rarity: "Legendary", color: "text-brand-red", bg: "bg-brand-red/10" },
    { id: 2, name: "Neon Samurai", creator: "ShogunArts", price: "4.2 AVAX", rarity: "Rare", color: "text-brand-mint", bg: "bg-brand-mint/10" },
    { id: 3, name: "Frost Dragon", creator: "WinterForge", price: "28.0 AVAX", rarity: "Mythical", color: "text-blue-400", bg: "bg-blue-400/10" },
    { id: 4, name: "Shadow Stalker", creator: "VoidDevs", price: "1.5 AVAX", rarity: "Common", color: "text-white/40", bg: "bg-white/5" },
    { id: 5, name: "Solar Flare", creator: "NovaCorp", price: "8.8 AVAX", rarity: "Epic", color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { id: 6, name: "Bio-Hazard", creator: "ToxicTeam", price: "3.3 AVAX", rarity: "Uncommon", color: "text-green-400", bg: "bg-green-400/10" },
]

export default function ExplorePage() {
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-white mb-4">Explore the <span className="text-brand-red">Galaxy</span></h1>
                    <p className="text-text-secondary">Discover unique physical-to-digital collectibles verified on Avalanche.</p>
                </header>

                {/* Filters & Tools */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="flex items-center gap-4 bg-dark-card border border-white/5 rounded-2xl px-4 py-2 w-full md:w-96 focus-within:border-brand-red/50 transition-all">
                        <Search className="w-5 h-5 text-text-secondary" />
                        <input type="text" placeholder="Search collections, items..." className="bg-transparent border-none outline-none text-white w-full" />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </button>
                        <div className="h-8 w-px bg-white/10 mx-2" />
                        <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1">
                            <button className="p-2 bg-brand-red rounded-xl text-white shadow-lg shadow-brand-red/20"><Grid className="w-5 h-5" /></button>
                            <button className="p-2 text-text-secondary hover:text-white transition-colors"><List className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>

                {/* Featured Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_COLLECTIONS.map((item) => (
                        <div key={item.id} className="glass-card rounded-[32px] overflow-hidden group glass-card-hover border border-white/5">
                            <div className="aspect-[4/3] relative bg-gradient-to-br from-dark-card to-dark-bg overflow-hidden">
                                {/* Placeholder for NFT Image */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className={`w-20 h-20 ${item.color} opacity-20 group-hover:scale-125 transition-transform duration-700`} />
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1.5 rounded-full ${item.bg} ${item.color} text-[10px] font-black uppercase tracking-widest border border-white/5 backdrop-blur-md`}>
                                        {item.rarity}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-dark-bg/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-white font-bold text-xs">
                                    {item.price}
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-2 text-brand-mint text-[10px] font-black uppercase tracking-[0.2em]">
                                    <Zap className="w-3 h-3" />
                                    <span>Verified Original</span>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-brand-red transition-colors">{item.name}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20" />
                                        <span className="text-sm text-text-secondary">{item.creator}</span>
                                    </div>
                                    <button className="text-brand-red hover:underline font-bold text-sm">View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-20 flex justify-center">
                    <button className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                        Load More
                    </button>
                </div>
            </main>
        </div>
    )
}
