'use client';

import { Header } from '@/components/layout/Header';
import { Copy, Users, DollarSign, Clock } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAccount } from 'wagmi';

export default function ReferralsPage() {
    const { address } = useAccount();
    const [copied, setCopied] = useState(false);

    // Mock referral data
    const referralCode = address ? `${address.slice(0, 6)}...KUB` : 'Connect Wallet';
    const referralLink = address ? `https://kubpreps.io/ref/${address.slice(0, 6)}` : 'Connect Wallet to Generate';

    const copyToClipboard = () => {
        if (!address) return;
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-dark-bg text-text-primary">
            <Header />

            <main className="flex-1 px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">Referrals</h1>
                    <p className="text-text-secondary mb-8">Invite friends and earn 10% of their trading fees.</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-dark-card border border-dark-border p-6 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-16 bg-brand-green/5 blur-[50px] rounded-full pointer-events-none" />
                            <div className="flex items-center gap-3 mb-2 text-text-secondary">
                                <Users className="w-5 h-5" />
                                <span className="font-medium text-sm">Total Referrals</span>
                            </div>
                            <div className="text-3xl font-bold font-mono text-white">124</div>
                        </div>

                        <div className="bg-dark-card border border-dark-border p-6 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-16 bg-brand-green/5 blur-[50px] rounded-full pointer-events-none" />
                            <div className="flex items-center gap-3 mb-2 text-text-secondary">
                                <DollarSign className="w-5 h-5" />
                                <span className="font-medium text-sm">Total Earned</span>
                            </div>
                            <div className="text-3xl font-bold font-mono text-brand-green">$1,420.50</div>
                        </div>

                        <div className="bg-dark-card border border-dark-border p-6 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-16 bg-brand-yellow/5 blur-[50px] rounded-full pointer-events-none" />
                            <div className="flex items-center gap-3 mb-2 text-text-secondary">
                                <Clock className="w-5 h-5" />
                                <span className="font-medium text-sm">Pending Rewards</span>
                            </div>
                            <div className="text-3xl font-bold font-mono text-brand-yellow">$45.20</div>
                            <button className="mt-4 w-full py-2 bg-dark-bg border border-dark-border hover:border-brand-green text-sm font-bold rounded-lg transition-colors">
                                Claim
                            </button>
                        </div>
                    </div>

                    {/* Link Generation */}
                    <div className="bg-dark-card border border-dark-border rounded-xl p-8 mb-12">
                        <h3 className="font-bold mb-6 text-lg">Your Referral Link</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-4 py-3 flex items-center justify-between">
                                <span className={cn("font-mono", !address && "text-text-secondary")}>
                                    {referralLink}
                                </span>
                                {address && (
                                    <button
                                        onClick={copyToClipboard}
                                        className="text-brand-green hover:text-white transition-colors"
                                    >
                                        {copied ? <span className="text-xs font-bold">Copied!</span> : <Copy className="w-5 h-5" />}
                                    </button>
                                )}
                            </div>
                            <button className="bg-brand-green text-dark-bg px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                                Tweet Link
                            </button>
                        </div>
                    </div>

                    {/* Leaderboard (Mock) */}
                    <div>
                        <h3 className="font-bold mb-6 text-lg">Top Referrers</h3>
                        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-dark-bg text-text-secondary uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Rank</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Referrals</th>
                                        <th className="px-6 py-4 text-right">Total Earned</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-border">
                                    {[1, 2, 3, 4, 5].map((rank) => (
                                        <tr key={rank} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-mono text-text-secondary">#{rank}</td>
                                            <td className="px-6 py-4 font-mono text-brand-green">0x7a...8b9c</td>
                                            <td className="px-6 py-4 text-white">{(1000 - rank * 45).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right font-mono text-white">${(50000 - rank * 2000).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
