'use client';

import { Header } from '@/components/layout/Header'
import { Hexagon, Zap, TrendingUp, Layers, ArrowRight, Shield } from 'lucide-react'

import { useStakingData } from '@/hooks/useStakingData'
import { useAvaxPrice } from '@/hooks/useAvaxPrice'

const STAKER_PLACEHOLDER = [
    { id: 101, name: "Staked NFT #1", rewards: "0.00 AVA", apr: "65%", image: "AVA-1" },
]

export default function StakingPage() {
    const { stakedCount, rewardsBalance, isConnected } = useStakingData();
    const { price: avaxPrice } = useAvaxPrice();

    return (
        <div className="flex flex-col min-h-screen bg-dark-bg">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Stats & Actions */}
                    <div className="flex-1">
                        <header className="mb-12">
                            <h1 className="text-4xl font-black text-white mb-4">Staking <span className="text-brand-red">Vault</span></h1>
                            <p className="text-text-secondary">Commit your digital soul to the network and earn $AVA rewards.</p>
                        </header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                            <div className="glass-card p-10 rounded-[32px] border-brand-red/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <TrendingUp className="w-20 h-20 text-brand-red" />
                                </div>
                                <div className="text-[10px] uppercase font-black tracking-[0.2em] text-brand-red mb-2">Total Rewards</div>
                                <div className="text-5xl font-black text-white mb-2">{Number(rewardsBalance).toLocaleString()} <span className="text-xl">AVA</span></div>
                                <div className="text-sm text-brand-mint font-bold">≈ ${(Number(rewardsBalance) * 2.5).toFixed(2)} USD</div>
                                <button className="btn-primary w-full mt-8 py-4">Claim All Rewards</button>
                            </div>

                            <div className="glass-card p-10 rounded-[32px] border-white/5">
                                <div className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary mb-2">My Staked Equity</div>
                                <div className="text-5xl font-black text-white mb-2">{stakedCount} <span className="text-xl text-text-secondary">NFTs</span></div>
                                <div className="text-sm text-text-secondary">Average APR: <span className="text-brand-mint font-bold">65%</span></div>
                                <button className="bg-white/5 border border-white/10 text-white w-full mt-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">Stake New Items</button>
                            </div>
                        </div>

                        {/* Staked List */}
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-brand-red" />
                            Currently Staked
                        </h3>
                        <div className="space-y-4">
                            {STAKER_PLACEHOLDER.map((item) => (
                                <div key={item.id} className="glass-card p-6 rounded-3xl flex items-center justify-between group glass-card-hover border border-white/5">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Hexagon className="w-10 h-10 text-brand-red opacity-20" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white group-hover:text-brand-red transition-colors">{item.name}</h4>
                                            <div className="flex items-center gap-4 text-xs mt-1">
                                                <span className="text-brand-mint font-bold">APR: {item.apr}</span>
                                                <span className="text-text-secondary">Staked 14 days ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-black text-white">{item.rewards}</div>
                                        <button className="text-brand-red font-bold text-xs hover:underline mt-1">Unstake & Claim</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Info & Economy */}
                    <div className="w-full lg:w-96">
                        <div className="glass-card p-10 rounded-[32px] border border-brand-mint/20 sticky top-32">
                            <h3 className="text-2xl font-black text-white mb-6">Tokenomics</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-5 h-5 text-brand-mint" />
                                        <span className="text-sm font-bold text-white/80">Avalanche Price</span>
                                    </div>
                                    <span className="text-white font-black">${avaxPrice ? avaxPrice.toLocaleString() : '...'}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-brand-mint" />
                                        <span className="text-sm font-bold text-white/80">TVL</span>
                                    </div>
                                    <span className="text-white font-black">$12.4M</span>
                                </div>
                                <div className="p-4 bg-brand-mint/5 border border-brand-mint/20 rounded-2xl mt-8">
                                    <p className="text-xs text-brand-mint leading-relaxed font-medium">
                                        $AVA tokens power governance, exclusive drops, and NFT upgrades within the ecosystem.
                                    </p>
                                </div>
                                <button className="flex items-center justify-between w-full p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/30 transition-all text-white font-bold group">
                                    <span>Get $AVA Tokens</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
