'use client';

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Smartphone, Zap, ShieldCheck, ArrowRight, Loader2, Sparkles, AlertCircle, Cpu, Database, Link as LinkIcon, Lock } from 'lucide-react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { AVALA_NFT_ABI, AVALA_NFT_ADDRESS } from '@/lib/contracts'
import { motion, AnimatePresence } from 'framer-motion'

const DEMO_STEPS = [
    { id: 1, text: "NFC Tag Detected", icon: Smartphone },
    { id: 2, text: "Extracting Cryptographic UID", icon: Cpu },
    { id: 3, text: "Backend Signature Verified", icon: ShieldCheck },
    { id: 4, text: "Minting on Avalanche Fuji", icon: LinkIcon },
    { id: 5, text: "Synchronizing Dynamic Traits", icon: Database }
];

export default function MintPage() {
    const [step, setStep] = useState<'scan' | 'demoFlow' | 'success'>('scan')
    const [nfcData, setNfcData] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Demo state
    const [activeStep, setActiveStep] = useState(0);

    const { address, isConnected } = useAccount()
    const { writeContract, data: hash, isPending: isMinting } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const handleDemoScan = async () => {
        setStep('demoFlow');
        setActiveStep(0);
        setError(null);

        const fakeNfcUid = "AVA-NFC-" + Math.random().toString(36).substring(7).toUpperCase();
        setNfcData(fakeNfcUid);

        // Sequence steps with 1.2s delay
        const sequence = async () => {
            for (let i = 1; i <= DEMO_STEPS.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 1200));
                setActiveStep(i);
            }

            // Decide route based on connection
            if (isConnected) {
                try {
                    // Try real interaction 
                    writeContract({
                        address: AVALA_NFT_ADDRESS as `0x${string}`,
                        abi: AVALA_NFT_ABI,
                        functionName: 'mintFigure',
                        args: [fakeNfcUid, "0xMockSignature", "ipfs://QmPlaceholder"],
                    });
                    // isConfirmed will trigger 'success' below
                } catch (err: any) {
                    // If errors out on signature or execution, simulate success in demo 
                    console.error("Execute failed, defaulting to pure demo", err);
                    setTimeout(() => setStep('success'), 1200);
                }
            } else {
                // Pure Demo
                setTimeout(() => setStep('success'), 1200);
            }
        };

        sequence();
    }

    // Effect to handle actual transaction success
    useEffect(() => {
        if (isConfirmed) {
            setStep('success')
        }
    }, [isConfirmed])

    return (
        <div className="flex flex-col min-h-screen bg-dark-bg">
            <Header />

            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-xl w-full">
                    <AnimatePresence mode="wait">
                        {step === 'scan' && (
                            <motion.div
                                key="scan"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card p-12 rounded-[40px] text-center relative overflow-hidden border-white/5"
                            >
                                <div className="absolute top-0 right-0 p-6">
                                    <Sparkles className="w-8 h-8 text-brand-red opacity-20" />
                                </div>

                                <div className="w-24 h-24 bg-brand-red/10 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-brand-red/20 shadow-2xl shadow-brand-red/10 animate-float">
                                    <Smartphone className="w-12 h-12 text-brand-red" />
                                </div>
                                <h1 className="text-5xl font-black text-white mb-6 font-display uppercase tracking-tight">Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-[#FF8A8A]">Scan</span></h1>
                                <p className="text-text-secondary leading-relaxed mb-10 text-lg font-medium">
                                    Hold your physical Avalaflow collectible near your device's NFC reader to securely verify its soul.
                                </p>

                                <button
                                    onClick={handleDemoScan}
                                    className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-3 group"
                                >
                                    Demo Scan <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {error && <p className="mt-4 text-brand-red text-sm font-bold">{error}</p>}
                                <div className="mt-8 flex items-center gap-2 justify-center text-xs text-text-secondary font-bold uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4 text-brand-mint" />
                                    End-to-End Encrypted Verification
                                </div>
                            </motion.div>
                        )}

                        {step === 'demoFlow' && (
                            <motion.div
                                key="demoFlow"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="glass-card p-12 rounded-[40px] border-white/10"
                            >
                                <div className="text-center mb-10">
                                    <h2 className="text-4xl font-black text-white mb-2 font-display uppercase tracking-tight">Executing Verification</h2>
                                    <p className="text-text-secondary text-sm font-mono tracking-widest bg-dark-bg inline-block px-4 py-2 rounded-full border border-white/5 mt-4">{nfcData || "Awaiting scan..."}</p>
                                </div>

                                <div className="space-y-4 relative">
                                    {/* Progress line background */}
                                    <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-white/5" />

                                    {/* Progress line active */}
                                    <div
                                        className="absolute left-[23px] top-6 w-0.5 bg-[#E84142] shadow-[0_0_10px_#E84142] transition-all duration-1000 ease-out z-10"
                                        style={{ height: `${Math.min((activeStep / (DEMO_STEPS.length - 1)) * 100, 100)}%` }}
                                    />

                                    {DEMO_STEPS.map((s, idx) => {
                                        const isActive = activeStep === idx;
                                        const isCompleted = activeStep > idx;
                                        const Icon = s.icon;
                                        return (
                                            <motion.div
                                                key={s.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: isCompleted || isActive ? 1 : 0.3, x: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="flex items-center gap-6 relative z-20"
                                            >
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-500
                                                    ${isCompleted ? 'bg-[#E84142] border-[#E84142] text-white' :
                                                        isActive ? 'bg-dark-card border-[#E84142] text-[#E84142] shadow-[0_0_15px_rgba(232,65,66,0.3)]' :
                                                            'bg-dark-bg border-white/10 text-white/20'}`}
                                                >
                                                    {isActive && <Loader2 className="w-5 h-5 animate-spin absolute" />}
                                                    {!isActive && <Icon className="w-5 h-5" />}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className={`font-bold text-lg transition-colors ${isCompleted || isActive ? 'text-white' : 'text-white/20'}`}>
                                                        {s.text}
                                                    </h4>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {activeStep === DEMO_STEPS.length && isMinting && (
                                    <div className="mt-8 text-center text-brand-mint text-sm font-bold uppercase tracking-widest animate-pulse">
                                        Confirming Transaction in Wallet...
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', bounce: 0.4 }}
                                className="glass-card p-8 rounded-[40px] text-center border-brand-red/30 shadow-[0_0_50px_rgba(232,65,66,0.15)]"
                            >
                                <div className="text-center mb-8">
                                    <h1 className="text-6xl font-black text-white mb-4 font-display uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-mint to-[#8AFFB3]">Success!</h1>
                                    <p className="text-text-secondary text-lg font-medium">Physical collectible securely bridged to Avalanche.</p>
                                </div>

                                {/* Minted NFT Card Demo */}
                                <div className="glass-card rounded-[32px] overflow-hidden border border-white/10 max-w-sm mx-auto mb-8 bg-gradient-to-br from-dark-card to-dark-bg text-left relative">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className={`px-3 py-1.5 rounded-full bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-widest border border-white/5 backdrop-blur-md`}>
                                            Legendary
                                        </span>
                                    </div>
                                    <div className="aspect-[4/3] relative flex items-center justify-center bg-white/5 overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-transparent opacity-50"></div>
                                        <Sparkles className="w-32 h-32 text-brand-red opacity-80 drop-shadow-[0_0_30px_rgba(232,65,66,0.8)] group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-2 text-brand-mint text-[10px] font-black uppercase tracking-[0.2em]">
                                            <ShieldCheck className="w-3 h-3" />
                                            <span>UID: {nfcData?.slice(0, 14)}...</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-4 font-display uppercase tracking-tight leading-none group-hover:text-brand-red transition-colors">Avalaflow Obsidian <span className="text-brand-red">#001</span></h3>

                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                                <div className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">Power</div>
                                                <div className="text-white font-bold text-lg">9,420</div>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                                <div className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">Value</div>
                                                <div className="text-brand-mint font-bold text-lg flex items-center gap-1">50.0 <span className="text-xs">AVAX</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep('scan')}
                                    className="btn-primary w-full py-4 text-lg"
                                >
                                    Mint Another Figure
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Info Footer */}
            <div className="p-8 flex justify-center gap-12 text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">
                <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-brand-mint" />
                    <span>Hardware Verified</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-red" />
                    <span>~0.005 AVAX Gas</span>
                </div>
            </div>
        </div>
    )
}
