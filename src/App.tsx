import React, { useState } from 'react';
import { Tablet, ShieldCheck, Zap, AlertCircle, CheckCircle2, Loader2, Camera, X } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { FigureCard } from './components/FigureCard';
import Scanner from './components/Scanner'; // 1. Import our new Scanner

const MOCK_COLLECTION = [
  { name: "Cyber Samurai", rarity: "Legendary", level: 12, serialNumber: "AF-9001", image: "https://api.dicebear.com/7.x/bottts/svg?seed=1" },
  { name: "Neon Runner", rarity: "Rare", level: 5, serialNumber: "AF-4421", image: "https://api.dicebear.com/7.x/bottts/svg?seed=2" },
  { name: "Void Walker", rarity: "Common", level: 2, serialNumber: "AF-1109", image: "https://api.dicebear.com/7.x/bottts/svg?seed=3" },
] as const;

const App: React.FC = () => {
  const { address, isConnected } = useAccount();
  
  // 2. Updated States for QR Flow
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<{ serialNumber: string } | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateScan = () => {
    setScannedData({ serialNumber: "MOCK-QR-UID-12345" });
  };

  const handleMintFlow = async () => {
    if (!isConnected) {
        alert("Please connect your wallet first!");
        return;
    }
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setMintSuccess(true);
    }, 3000);
  };

  // 3. Callback for successful QR capture
  const onScanSuccess = (decodedText: string) => {
    setScannedData({ serialNumber: decodedText });
    setIsScanning(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-500/30">
      <nav className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-black tracking-tighter italic text-red-500 uppercase">AvalaFlow</h1>
        <div className="flex gap-4 items-center">
            <button className="hidden md:block text-zinc-400 text-sm hover:text-white transition-colors" onClick={simulateScan}>
                Simulate Demo
            </button>
            <ConnectButton accountStatus="address" chainStatus="name" showBalance={false} />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            Bring your <span className="text-red-500">Physical</span> figures to life.
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Scan QR codes on collectibles and mint their Digital Twins on Avalanche.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: QR Scanner Viewport */}
            <div className="relative group mx-auto w-full max-w-sm">
                {isScanning ? (
                  <div className="relative space-y-4">
                    <Scanner onScanSuccess={onScanSuccess} onScanError={(err) => console.log(err)} />
                    <button 
                      onClick={() => setIsScanning(false)}
                      className="w-full py-3 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-zinc-800 transition-all"
                    >
                      <X size={16} /> Cancel Scan
                    </button>
                  </div>
                ) : (
                  <button 
                      onClick={() => setIsScanning(true)}
                      disabled={isMinting}
                      className={`w-full aspect-square rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 flex flex-col items-center justify-center gap-4 transition-all duration-500 overflow-hidden relative`}
                  >
                      <div className="p-6 rounded-full bg-zinc-800">
                          <Camera size={48} className="text-zinc-500" />
                      </div>
                      <div className="text-center">
                          <span className="block font-bold text-xl uppercase tracking-widest">
                              {isMinting ? 'Minting NFT...' : 'Scan Figure QR'}
                          </span>
                          <p className="text-zinc-500 text-xs mt-1">Camera will open to scan code</p>
                      </div>
                  </button>
                )}
            </div>

            {/* Right: Status Section */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 min-h-[300px] flex flex-col justify-center">
                {!scannedData && !isMinting && !mintSuccess && (
                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                            <Zap className="text-zinc-500" size={24} />
                        </div>
                        <p className="text-zinc-400">Scan a figure QR to view its digital twin and evolution stats.</p>
                    </div>
                )}

                {scannedData && !mintSuccess && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-red-500/20 rounded-xl border border-red-500/30 flex items-center justify-center text-red-500 font-bold">
                              ID
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Figure Detected</h3>
                                <p className="text-zinc-500 font-mono text-sm">{scannedData.serialNumber}</p>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-zinc-800/50 rounded-2xl space-y-2 border border-zinc-700/50">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">Authenticity</span>
                                <span className="text-green-500 font-bold flex items-center gap-1">
                                    <ShieldCheck size={14} /> Verified
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">Network</span>
                                <span className="text-zinc-300">Avalanche Fuji</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleMintFlow}
                            disabled={isMinting}
                            className="w-full py-4 bg-red-500 hover:bg-red-600 disabled:bg-zinc-800 rounded-2xl font-bold transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                        >
                            {isMinting && <Loader2 size={20} className="animate-spin" />}
                            {isMinting ? "Processing Mint..." : "Mint Digital Twin"}
                        </button>
                    </div>
                )}

                {mintSuccess && (
                    <div className="text-center space-y-4 animate-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                            <CheckCircle2 className="text-green-500" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Minted Successfully!</h3>
                        <p className="text-zinc-400 text-sm italic">"Your figure has entered the digital realm."</p>
                        <button className="w-full py-3 border border-zinc-700 rounded-xl font-medium hover:bg-zinc-800 transition-all">
                            View in Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Dashboard Section */}
        <section className="mt-24 pt-12 border-t border-zinc-800">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold italic tracking-tighter uppercase">My Collection</h2>
              <p className="text-zinc-500">Your physical world, digitized.</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest block mb-1">Total Assets</span>
              <span className="text-2xl font-black text-red-500">0{MOCK_COLLECTION.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COLLECTION.map((fig) => (
              <FigureCard key={fig.serialNumber} {...fig} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;