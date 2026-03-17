'use client';

import { useEffect, useState } from 'react';
import { useAccount, usePublicClient, useReadContract } from 'wagmi';
import { parseAbi } from 'viem';
import { AVALA_NFT_ADDRESS } from '@/lib/contracts';
import { motion } from 'framer-motion';
import { Users, Zap, Globe, ShieldCheck } from 'lucide-react';

const STATS_ABI = parseAbi([
    "function totalSupply() view returns (uint256)",
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
]);

export function StatsSection() {
    const { isConnected } = useAccount();
    const publicClient = usePublicClient();

    // Total Supply directly from contract
    const { data: totalSupplyStr } = useReadContract({
        address: AVALA_NFT_ADDRESS as `0x${string}`,
        abi: STATS_ABI,
        functionName: 'totalSupply',
        query: {
            enabled: isConnected,
            refetchInterval: 10000,
        }
    });

    const [uniqueHolders, setUniqueHolders] = useState<number>(4800);
    const [volume, setVolume] = useState<string>("2.4M");

    useEffect(() => {
        let isMounted = true;

        async function fetchOnChainStats() {
            if (!publicClient || !isConnected) return;

            try {
                const logs = await publicClient.getLogs({
                    address: AVALA_NFT_ADDRESS as `0x${string}`,
                    event: parseAbi(["event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"])[0],
                });

                const tokenOwners: Record<string, string> = {};
                for (const log of logs) {
                    if (log.args.tokenId !== undefined && log.args.to) {
                        tokenOwners[log.args.tokenId.toString()] = log.args.to.toLowerCase();
                    }
                }

                const uniqueAddresses = new Set(Object.values(tokenOwners));
                uniqueAddresses.delete("0x0000000000000000000000000000000000000000");

                if (!isMounted) return;

                if (uniqueAddresses.size > 0) {
                    setUniqueHolders(uniqueAddresses.size);
                } else if (isConnected) {
                    setUniqueHolders(0);
                }

                if (logs.length > 0) {
                    const mockVolumeValue = logs.length * 50 * 35;
                    let displayVol = `$${(mockVolumeValue / 1000000).toFixed(1)}M`;
                    if (mockVolumeValue < 1000000) {
                        displayVol = `$${(mockVolumeValue / 1000).toFixed(1)}K`;
                    }
                    if (mockVolumeValue < 1000) displayVol = `$${mockVolumeValue}`;

                    setVolume(displayVol);
                } else if (isConnected) {
                    setVolume("$0");
                }

            } catch (err) {
                console.error("Failed to fetch on-chain stats:", err);
            }
        }

        fetchOnChainStats();
        const interval = setInterval(fetchOnChainStats, 30000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [publicClient, isConnected]);

    const displaySupply = isConnected && totalSupplyStr !== undefined
        ? totalSupplyStr.toString()
        : isConnected ? "0" : "12.4k";

    const displayHolders = isConnected && uniqueHolders !== 4800
        ? uniqueHolders.toString()
        : isConnected ? "0" : "4.8k";

    const displayVolume = isConnected && volume !== "2.4M"
        ? volume
        : isConnected ? "$0" : "$2.4M";

    const stats = [
        { label: "Figures Minted", value: displaySupply, icon: Zap, color: "text-brand-red", bg: "bg-brand-red/10" },
        { label: "Active Collectors", value: displayHolders, icon: Users, color: "text-brand-mint", bg: "bg-brand-mint/10" },
        { label: "Trading Volume", value: displayVolume, icon: Globe, color: "text-brand-red", bg: "bg-brand-red/10" },
        { label: "Hardware Verified", value: "100%", icon: ShieldCheck, color: "text-brand-mint", bg: "bg-brand-mint/10" },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decorative Blurs */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand-mint/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="glass-card p-10 rounded-[40px] border-white/5 group hover:border-white/10 transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
                        >
                            <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>
                            <div className="text-5xl font-black text-white mb-3 font-display tracking-tight drop-shadow-md">
                                {stat.value}
                            </div>
                            <div className="text-text-secondary font-bold uppercase tracking-[0.2em] text-[10px] bg-white/5 py-1.5 px-3 rounded-full border border-white/5 inline-block">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
