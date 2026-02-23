import { Header } from '@/components/layout/Header';
import { HelpCircle, MessagesSquare, Search, FileText } from 'lucide-react';

export default function HelpPage() {
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg">
            <Header />

            <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20 pb-32">
                <div className="text-center mb-16">
                    <div className="w-20 h-20 rounded-3xl bg-brand-mint/10 inline-flex flex-col items-center justify-center border border-brand-mint/20 shadow-lg mb-8 shadow-brand-mint/10">
                        <HelpCircle className="w-10 h-10 text-brand-mint" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">How can we help?</h1>

                    <div className="max-w-2xl mx-auto flex items-center bg-dark-card border border-white/10 rounded-full px-6 py-4 focus-within:border-brand-mint/50 transition-colors">
                        <Search className="w-6 h-6 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search for articles, guides, or troubleshooting..."
                            className="bg-transparent border-none outline-none text-white w-full ml-4 placeholder-text-secondary text-lg"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    <div className="glass-card hover:border-brand-mint/30 transition-all p-8 rounded-3xl cursor-pointer">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Getting Started</h3>
                        <p className="text-text-secondary text-sm">Learn how to connect your wallet, use the NFC scanner, and mint your first physical collectible.</p>
                    </div>

                    <div className="glass-card hover:border-brand-mint/30 transition-all p-8 rounded-3xl cursor-pointer">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                            <span className="text-2xl">⚡️</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Minting Issues</h3>
                        <p className="text-text-secondary text-sm">Troubleshoot NFC tag read errors, failed Avalanche transactions, or signature issues.</p>
                    </div>

                    <div className="glass-card hover:border-brand-mint/30 transition-all p-8 rounded-3xl cursor-pointer">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                            <span className="text-2xl">💰</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Staking $AVA</h3>
                        <p className="text-text-secondary text-sm">Detailed guide on how to stake your NFTs, claim rewards, and understand APR metrics.</p>
                    </div>
                </div>

                <div className="glass-card p-10 mt-12 rounded-[32px] border-brand-mint/20 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-brand-mint/20 flex items-center justify-center mb-6">
                        <MessagesSquare className="w-8 h-8 text-brand-mint" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Still need help?</h3>
                    <p className="text-text-secondary max-w-xl mb-8">
                        Our technical support team is available 24/7 on Discord. We typically respond within 15 minutes.
                    </p>
                    <button className="bg-brand-mint hover:bg-brand-mint/80 text-dark-bg font-black px-8 py-4 rounded-xl transition-colors">
                        Join Discord Support
                    </button>
                </div>
            </main>
        </div>
    );
}
