import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Zap, CheckCircle2, Loader2, Camera, X, Trophy, Activity, Cpu, ArrowUpRight, Globe } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'; 
import { FigureCard } from './components/FigureCard';
import Scanner from './components/Scanner';

const ALCHEMY_KEY = "MbXj4Z6VpDD4QlemDrOJs"; 
const CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138"; 

const CONTRACT_ABI = [
  { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "uri", "type": "string" }, { "internalType": "string", "name": "serialNumber", "type": "string" }], "name": "mintFigure", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "levelUp", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
] as const;

interface Figure {
  name: string;
  image: string;
  level: number;
  rarity: 'Common' | 'Rare' | 'Legendary';
  serialNumber: string;
}

const MOCK_ACTIVITY = [
  "User 0x71C... minted a Legendary Cyber Samurai",
  "New Level Up: Neon Runner reached Level 15",
  "User 0x4a2... anchored a Rare Void Walker",
  "Global Event: Avalanche Fuji bridge speed increased by 15%",
  "User 0x992... just evolved an asset to Level 20",
  "Mint Alert: Figure #AF-9001 synchronized successfully",
];

const MOCK_COLLECTION: Figure[] = [
  { name: "Cyber Samurai", rarity: "Legendary", level: 12, serialNumber: "AF-9001", image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=400&auto=format&fit=crop" },
  { name: "Neon Runner", rarity: "Rare", level: 5, serialNumber: "AF-4421", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400&auto=format&fit=crop" },
  { name: "Void Walker", rarity: "Common", level: 2, serialNumber: "AF-1109", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop" },
];

const App: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<{ serialNumber: string } | null>(null);
  const [onChainCollection, setOnChainCollection] = useState<Figure[]>([]);
  const [activeFigure, setActiveFigure] = useState<Figure | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: hash, writeContract, isPending: isMintingAction } = useWriteContract();
  const { isLoading: isWaitingForTx, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash });

  const isProcessing = isMintingAction || isWaitingForTx;

  const mintSuccess = txSuccess && !activeFigure;
  const evolutionSuccess = txSuccess && !!activeFigure;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isScanning) return;
    let scrollPosition = 0;
    const speed = 0.4;
    const scrollLoop = () => {
      if (!container) return;
      scrollPosition += speed;
      if (scrollPosition >= container.scrollWidth / 2) scrollPosition = 0;
      container.scrollLeft = scrollPosition;
      requestAnimationFrame(scrollLoop);
    };
    const animationFrame = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, [onChainCollection, isScanning]);

  useEffect(() => {
    if (!isConnected || !address) {
      setOnChainCollection([]);
      return;
    }
    const fetchNFTs = async () => {
      try {
        const res = await fetch(`https://avalanche-fuji.g.alchemy.com/nft/v3/${ALCHEMY_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true`);
        const data = await res.json();
        if (!data.ownedNfts) return;
        const nfts: Figure[] = data.ownedNfts.map((nft: any) => ({
          name: nft.name || `Figure #${nft.tokenId.slice(-4)}`,
          image: nft.image?.cachedUrl || nft.image?.originalUrl || '',
          level: nft.raw?.metadata?.level || 1,
          rarity: nft.raw?.metadata?.attributes?.find((a: any) => a.trait_type?.toLowerCase() === 'rarity')?.value || 'Common',
          serialNumber: nft.tokenId,
        }));
        setOnChainCollection(nfts);
      } catch (err) { console.error(err); }
    };
    fetchNFTs();
  }, [isConnected, address, txSuccess]);

  const onScanSuccess = (decodedText: string) => { 
    if (window.navigator.vibrate) window.navigator.vibrate([50, 30, 50]);
    setScannedData({ serialNumber: decodedText }); 
    setIsScanning(false); 
  };

  const handleMintFlow = async () => {
    if (!isConnected) return alert("Connect Wallet!");
    if (!scannedData) return;

    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'mintFigure',
      args: [address!, "ipfs://placeholder-metadata-uri", scannedData.serialNumber],
    });
  };

  const handleLevelUp = () => {
    if (!activeFigure) return;
  
    const numericId = activeFigure.serialNumber.replace(/\D/g, "");
    
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'levelUp',
      args: [BigInt(numericId || "0")],
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-red-500/30 overflow-x-hidden pb-20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <nav className="flex justify-between items-center p-6 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            <Zap size={18} fill="white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter italic text-white uppercase">AvalaFlow</h1>
        </div>
        <ConnectButton accountStatus="address" chainStatus="name" showBalance={false} />
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16 relative z-10">
       
        {activeFigure && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
            <div className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
              <button onClick={() => setActiveFigure(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-20">
                <X size={24} />
              </button>
              
              <div className="text-center space-y-6 relative z-10">
                {evolutionSuccess ? (
                  <div className="py-10 animate-in zoom-in">
                    <CheckCircle2 className="text-green-500 mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]" size={64} />
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">Evolution Complete</h3>
                    <p className="text-zinc-400 text-sm mt-2 font-medium uppercase tracking-widest">On-Chain State Mutated</p>
                    <button onClick={() => setActiveFigure(null)} className="mt-8 w-full py-4 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest">Close Vault Access</button>
                  </div>
                ) : (
                  <>
                    <div className="relative inline-block group">
                      <div className={`absolute inset-0 blur-2xl opacity-20 transition-all ${isProcessing ? 'bg-white scale-110' : 'bg-red-500'}`} />
                      <img src={activeFigure.image} alt={activeFigure.name} className={`w-56 h-56 object-contain mx-auto rounded-3xl relative z-10 transition-transform ${isProcessing ? 'scale-110' : ''}`} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter italic">{activeFigure.name}</h3>
                      <div className="flex justify-center gap-4 mt-2">
                        <span className="text-xs font-mono text-zinc-500">ID: {activeFigure.serialNumber.slice(-6)}</span>
                        <span className="text-xs font-black text-red-500 uppercase italic">Level {activeFigure.level}</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleLevelUp}
                      disabled={isProcessing}
                      className="w-full py-5 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 rounded-2xl font-black uppercase tracking-tighter flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                    >
                      {isProcessing ? <Loader2 className="animate-spin" /> : <Zap size={20} fill="currentColor" />}
                      {isProcessing ? 'Confirming Mutation...' : 'Boost Asset Evolution'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            <Activity size={12} className="text-red-500" /> Avalanche Fuji Mainnet Bridge
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            DIGITIZE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-orange-500">LEGACY.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
        
          <div className="relative group max-w-md mx-auto w-full">
            {isScanning ? (
              <div className="relative space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="aspect-square rounded-[2rem] overflow-hidden border-2 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.3)] bg-black relative">
                  <div className="absolute inset-0 z-10 border-[30px] border-black/40 pointer-events-none" />
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500/50 shadow-[0_0_15px_red] animate-[scan_2s_ease-in-out_infinite] z-20" />
                  <Scanner onScanSuccess={onScanSuccess} onScanError={() => {}} />
                </div>
                <button onClick={() => setIsScanning(false)} className="w-full py-4 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-zinc-800 transition-all uppercase tracking-widest">
                  <X size={18} /> Abort Link
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setIsScanning(true); setScannedData(null); }}
                className="w-full aspect-square rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-red-500/40 flex flex-col items-center justify-center gap-6 transition-all duration-700 relative overflow-hidden group shadow-2xl"
              >
                <div className="p-8 rounded-full bg-white/5 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-inner">
                  <Camera size={48} className="text-zinc-400 group-hover:text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-center">
                  <span className="block font-black text-2xl uppercase tracking-tighter">Initialize Link</span>
                  <p className="text-zinc-500 text-sm font-medium opacity-60">Ready for Figure Authentication</p>
                </div>
              </button>
            )}
          </div>

          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-[2.5rem] p-10 min-h-[450px] flex flex-col justify-center relative overflow-hidden shadow-2xl">
            {!scannedData && !isProcessing && !mintSuccess && (
              <div className="text-center space-y-6">
                <Cpu className="text-zinc-800 animate-pulse mx-auto" size={60} strokeWidth={1} />
                <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] font-black">NFC / QR Standby</p>
              </div>
            )}

            {scannedData && !mintSuccess && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-red-500/10 rounded-3xl border border-red-500/20 flex items-center justify-center text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                    <Zap size={32} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter italic">Secured.</h3>
                    <p className="text-zinc-500 font-mono text-xs tracking-widest">{scannedData.serialNumber}</p>
                  </div>
                </div>

                <button 
                  onClick={handleMintFlow} 
                  disabled={isProcessing}
                  className="group relative w-full py-5 bg-white text-black rounded-[1.5rem] font-black text-lg uppercase tracking-tighter transition-all hover:scale-[0.98] disabled:bg-zinc-800"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isProcessing ? <Loader2 className="animate-spin" /> : 'Synchronize Soul'}
                  </span>
                </button>
              </div>
            )}

            {mintSuccess && (
              <div className="text-center space-y-8 animate-in zoom-in duration-500 relative">
                <CheckCircle2 className="text-green-500 mx-auto drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" size={80} strokeWidth={3} />
                <div className="space-y-2">
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter">Synchronized.</h3>
                  <p className="text-zinc-400 font-medium text-sm">Asset permanently anchored to Avalanche Fuji</p>
                </div>
                <button onClick={() => setScannedData(null)} className="w-full py-4 bg-red-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-red-500 transition-all">
                  Secure Another Asset
                </button>
              </div>
            )}
          </div>
        </div>

        <section className="mt-40">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">The Vault</h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live Blockchain Feed
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-8 overflow-hidden pb-10 mask-fade">
            {(onChainCollection.length ? onChainCollection : MOCK_COLLECTION)
              .concat(onChainCollection.length ? onChainCollection : MOCK_COLLECTION)
              .map((fig, idx) => (
                <div key={`${fig.serialNumber}-${idx}`} className="flex-shrink-0 w-64 cursor-pointer" onClick={() => setActiveFigure(fig)}>
                  <FigureCard {...fig} owned={true} />
                </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-black/60 backdrop-blur-xl border-t border-white/5 py-3 z-[80] overflow-hidden">
        <div className="flex items-center whitespace-nowrap animate-marquee">
          {[...MOCK_ACTIVITY, ...MOCK_ACTIVITY].map((text, i) => (
            <div key={i} className="flex items-center gap-4 px-8 border-r border-white/5">
              <Globe size={12} className="text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{text}</span>
            </div>
          ))}
        </div>
      </footer>

      <style>{`
        .mask-fade { mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); }
        @keyframes scan { 0%, 100% { top: 10%; } 50% { top: 90%; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;