'use client';

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Smartphone, Zap, ShieldCheck, ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { AVALA_NFT_ABI, AVALA_NFT_ADDRESS } from '@/lib/contracts'
import { parseEther } from 'viem'

export default function MintPage() {
    const [step, setStep] = useState<'scan' | 'verifying' | 'minting' | 'success'>('scan')
    const [nfcData, setNfcData] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const { address, isConnected } = useAccount()
    const { writeContract, data: hash, isPending: isMinting } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const handleMint = async () => {
        if (!isConnected) {
            alert("Please connect your wallet first!")
            return
        }

        setStep('verifying')
        setError(null)

        try {
            // 1. Simulate/Fetch NFC UID (In a real app, this would come from a browser NFC API or mobile bridge)
            const fakeNfcUid = "AVA-NFC-" + Math.random().toString(36).substring(7).toUpperCase()
            setNfcData(fakeNfcUid)

            // 2. Call backend to verify and sign
            const response = await fetch('/api/verify-nfc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nfcUid: fakeNfcUid, walletAddress: address })
            })

            const data = await response.json()
            if (!data.success) throw new Error(data.error || "Verification failed")

            // 3. Mint on Avalanche C-Chain
            setStep('minting')
            writeContract({
                address: AVALA_NFT_ADDRESS as `0x${string}`,
                abi: AVALA_NFT_ABI,
                functionName: 'mintFigure',
                args: [data.nfcUid, data.signature, "ipfs://QmPlaceholder..."], // In production, metadata URI would be generated
            })

        } catch (err: any) {
            console.error(err)
            setError(err.message)
            setStep('scan')
        }
    }

    // Effect to handle transaction success
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
                    {step === 'scan' && (
                        <div className="glass-card p-12 rounded-[40px] text-center animate-float relative overflow-hidden border-white/5">
                            <div className="absolute top-0 right-0 p-6">
                                <Sparkles className="w-8 h-8 text-brand-red opacity-20" />
                            </div>

                            <div className="w-24 h-24 bg-brand-red/10 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-brand-red/20 shadow-2xl shadow-brand-red/10">
                                <Smartphone className="w-12 h-12 text-brand-red" />
                            </div>
                            <h1 className="text-4xl font-black text-white mb-6">Ready to Scan</h1>
                            <p className="text-text-secondary leading-relaxed mb-10 text-lg">
                                Hold your physical Avalaflow collectible near your device's NFC reader to securely verify its soul.
                            </p>
                            <button
                                onClick={handleMint}
                                disabled={isMinting || isConfirming}
                                className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-3 group"
                            >
                                {isMinting || isConfirming ? 'Transaction Pending...' : 'Scan NFC Figure'}
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                            {error && <p className="mt-4 text-brand-red text-sm font-bold">{error}</p>}
                            <div className="mt-8 flex items-center gap-2 justify-center text-xs text-text-secondary font-bold uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4 text-brand-mint" />
                                End-to-End Encrypted Verification
                            </div>
                        </div>
                    )}

                    {step === 'verifying' && (
                        <div className="glass-card p-12 rounded-[40px] text-center border-brand-red/30">
                            <Loader2 className="w-20 h-20 text-brand-red animate-spin mx-auto mb-10" />
                            <h1 className="text-4xl font-black text-white mb-4">Verifying Soul</h1>
                            <p className="text-text-secondary text-lg">Communicating with the secure Avalaflow Node.js backend to validate NFC UID authenticity...</p>
                        </div>
                    )}

                    {step === 'minting' && (
                        <div className="glass-card p-12 rounded-[40px] text-center border-brand-mint/30">
                            <div className="relative w-32 h-32 mx-auto mb-10">
                                <div className="absolute inset-0 bg-brand-mint/5 blur-2xl rounded-full" />
                                <Zap className="w-full h-full text-brand-mint relative animate-pulse" />
                            </div>
                            <h1 className="text-4xl font-black text-white mb-4">Forging Digital Twin</h1>
                            <div className="flex flex-col gap-3 mb-8">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-text-secondary">
                                    <span>Status</span>
                                    <span className="text-brand-mint">Minting on Avalanche...</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-mint w-2/3 animate-pulse" />
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="text-[10px] text-text-secondary uppercase font-bold mb-1">Authenticated NFC UID</div>
                                <div className="text-white font-mono text-sm">{nfcData}</div>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="glass-card p-12 rounded-[40px] text-center border-brand-mint/30 shadow-[0_0_50px_rgba(0,255,163,0.1)]">
                            <div className="w-24 h-24 bg-brand-mint/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-brand-mint/30">
                                <ShieldCheck className="w-12 h-12 text-brand-mint" />
                            </div>
                            <h1 className="text-5xl font-black text-white mb-6">Minted!</h1>
                            <p className="text-text-secondary text-xl mb-12">Congratulations! Your physical collectible is now professionally bridged to the Avalanche C-Chain.</p>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <button className="bg-white/5 border border-white/10 text-white p-4 rounded-3xl font-bold hover:bg-white/10 transition-all flex flex-col items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-brand-mint" />
                                    <span className="text-xs uppercase tracking-widest">Share on X</span>
                                </button>
                                <button className="bg-white/5 border border-white/10 text-white p-4 rounded-3xl font-bold hover:bg-white/10 transition-all flex flex-col items-center gap-2">
                                    <Loader2 className="w-6 h-6 text-brand-red" />
                                    <span className="text-xs uppercase tracking-widest">View on Snowtrace</span>
                                </button>
                            </div>

                            <button
                                onClick={() => setStep('scan')}
                                className="btn-primary w-full py-5 text-xl"
                            >
                                Go to My Collection
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Info Footer */}
            <div className="p-8 flex justify-center gap-12 text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>NFC Read Active</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-red" />
                    <span>0.005 AVAX Gas required</span>
                </div>
            </div>
        </div>
    )
}
