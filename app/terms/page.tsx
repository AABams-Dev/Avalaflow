import { Header } from '@/components/layout/Header';
import { ShieldAlert, BookOpen, Scale } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg">
            <Header />

            <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center border border-brand-red/20 shadow-lg shadow-brand-red/10">
                        <Scale className="w-8 h-8 text-brand-red" />
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tight">Terms of Use</h1>
                </div>

                <div className="glass-card p-8 sm:p-12 rounded-[32px] border border-white/5 space-y-8 text-text-secondary leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using Avalaflow, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Digital Assets and NFTs</h2>
                        <p>
                            Avalaflow connects physical collectibles to digital representations (NFTs) on the Avalanche C-Chain. Ownership of an Avalaflow NFT represents ownership of the specific digital token, but does not grant commercial rights to the underlying intellectual property unless explicitly stated by the creator.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You are solely responsible for the security of your wallet and private keys.</li>
                            <li>You agree not to use the platform for illegal activities, including money laundering or terrorism financing.</li>
                            <li>You agree not to exploit bugs or vulnerabilities in the smart contracts.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Risk Assumption</h2>
                        <p>
                            Cryptocurrency assets and NFTs are extremely volatile. You assume all risks associated with cryptographic systems, smart contracts, and blockchain technology. Avalaflow is not responsible for any losses incurred due to market fluctuations or smart contract failures.
                        </p>
                    </section>

                    <section>
                        <div className="p-6 bg-brand-red/10 border border-brand-red/20 rounded-2xl mt-8 flex gap-4 items-start">
                            <ShieldAlert className="w-6 h-6 text-brand-red shrink-0" />
                            <p className="text-sm text-white/90">
                                <strong>Disclaimer:</strong> The Avalaflow protocol is provided "as is" and "as available" without any warranty of any kind. Use the platform at your own risk.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
