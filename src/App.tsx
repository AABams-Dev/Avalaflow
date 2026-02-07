import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Zap, CheckCircle2, Loader2, Camera, X } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { FigureCard } from './components/FigureCard';
import Scanner from './components/Scanner';

// 1. ADD YOUR KEY HERE
const ALCHEMY_KEY = "YOUR_ALCHEMY_KEY"; 

interface Figure {
  name: string;
  image: string;
  level: number;
  rarity: 'Common' | 'Rare' | 'Legendary';
  serialNumber: string;
}

const MOCK_COLLECTION: Figure[] = [
  { name: "Cyber Samurai", rarity: "Legendary", level: 12, serialNumber: "AF-9001", image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=400&auto=format&fit=crop" },
  { name: "Neon Runner", rarity: "Rare", level: 5, serialNumber: "AF-4421", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400&auto=format&fit=crop" },
  { name: "Void Walker", rarity: "Common", level: 2, serialNumber: "AF-1109", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop" },
];

const App: React.FC = () => {
  const { isConnected, address } = useAccount();

  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<{ serialNumber: string } | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [onChainCollection, setOnChainCollection] = useState<Figure[]>([]);
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let scrollPosition = 0;
    const speed = 0.3;
    const scrollLoop = () => {
      if (!container) return;
      scrollPosition += speed;
      if (scrollPosition >= container.scrollWidth / 2) scrollPosition = 0;
      container.scrollLeft = scrollPosition;
      requestAnimationFrame(scrollLoop);
    };
    const animationFrame = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, [onChainCollection]);

  // --- Fetch on-chain NFTs (RESCUE LOGIC) ---
  useEffect(() => {
    if (!isConnected || !address) {
      setOnChainCollection([]);
      return;
    }

    const fetchNFTs = async () => {
      setIsLoadingCollection(true);
      try {
        const res = await fetch(
          `https://avalanche-fuji.g.alchemy.com/nft/v3/${ALCHEMY_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true`
        );
        const data = await res.json();

        if (!data.ownedNfts) {
          setOnChainCollection([]);
          return;
        }

        const nfts: Figure[] = data.ownedNfts.map((nft: any) => {
          // 1. Get the raw URL from Alchemy
          let rawUrl = 
            nft.image?.cachedUrl || 
            nft.image?.originalUrl || 
            nft.raw?.metadata?.image || 
            nft.raw?.metadata?.image_url || 
            '';

          // 2. PROTOCOL RESOLVER (Fixes the "Robot" issue)
          const resolveProtocol = (url: string) => {
            if (!url) return '';
            // If it's ipfs://, use a fast public gateway
            if (url.startsWith('ipfs://')) {
              return url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
            }
            // If it's a raw CID
            if (url.startsWith('Qm') && !url.includes('http')) {
              return `https://cloudflare-ipfs.com/ipfs/${url}`;
            }
            return url;
          };

          const finalImage = resolveProtocol(rawUrl);

          const metadata = nft.raw?.metadata || {};
          const rarityAttr = metadata.attributes?.find(
            (attr: any) => attr.trait_type?.toLowerCase() === 'rarity'
          );

          return {
            name: nft.name || metadata.name || `Figure #${nft.tokenId.slice(-4)}`,
            image: finalImage,
            level: metadata.level || 1,
            rarity: rarityAttr?.value || 'Common',
            serialNumber: nft.tokenId,
          };
        });

        setOnChainCollection(nfts);
      } catch (err) {
        console.error('Fetch Error:', err);
      } finally {
        setIsLoadingCollection(false);
      }
    };

    fetchNFTs();
  }, [isConnected, address]);

  const simulateScan = () => setScannedData({ serialNumber: "MOCK-QR-UID-12345" });
  const onScanSuccess = (decodedText: string) => { setScannedData({ serialNumber: decodedText }); setIsScanning(false); };
  const handleMintFlow = async () => {
    if (!isConnected) return alert("Connect wallet!");
    setIsMinting(true);
    setTimeout(() => { setIsMinting(false); setMintSuccess(true); }, 3000);
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
          <div className="relative group mx-auto w-full max-w-sm">
            {isScanning ? (
              <div className="relative space-y-4">
                <Scanner onScanSuccess={onScanSuccess} onScanError={(err) => console.log(err)} />
                <button onClick={() => setIsScanning(false)} className="w-full py-3 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-zinc-800 transition-all">
                  <X size={16} /> Cancel Scan
                </button>
              </div>
            ) : (
              <button onClick={() => setIsScanning(true)} disabled={isMinting} className="w-full aspect-square rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 flex flex-col items-center justify-center gap-4 transition-all duration-500 overflow-hidden relative">
                <div className="p-6 rounded-full bg-zinc-800">
                  <Camera size={48} className="text-zinc-500" />
                </div>
                <div className="text-center">
                  <span className="block font-bold text-xl uppercase tracking-widest">{isMinting ? 'Minting NFT...' : 'Scan Figure QR'}</span>
                  <p className="text-zinc-500 text-xs mt-1">Camera will open to scan code</p>
                </div>
              </button>
            )}
          </div>

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
                  <div className="w-16 h-16 bg-red-500/20 rounded-xl border border-red-500/30 flex items-center justify-center text-red-500 font-bold">ID</div>
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
                    <span className="text-zinc-300">Avalanche Fuji</span>
                  </div>
                </div>

                <button onClick={handleMintFlow} disabled={isMinting} className="w-full py-4 bg-red-500 hover:bg-red-600 disabled:bg-zinc-800 rounded-2xl font-bold transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2">
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

        <section className="mt-24 pt-12 border-t border-zinc-800">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold italic tracking-tighter uppercase">My Collection</h2>
              <p className="text-zinc-500">
                {isLoadingCollection ? 'Fetching from Avalanche...' : 'Your physical world, digitized.'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest block mb-1">Total Assets</span>
              <span className="text-2xl font-black text-red-500">
                {isLoadingCollection ? <Loader2 size={24} className="animate-spin inline" /> : (onChainCollection.length || MOCK_COLLECTION.length)}
              </span>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-6 overflow-hidden pb-4">
            {(onChainCollection.length ? onChainCollection : MOCK_COLLECTION)
              .concat(onChainCollection.length ? onChainCollection : MOCK_COLLECTION)
              .map((fig, idx) => (
                <div key={`${fig.serialNumber}-${idx}`} className={`flex-shrink-0 w-60 transition-opacity duration-500 ${isLoadingCollection ? 'opacity-50' : 'opacity-100'}`}>
                  <FigureCard {...fig} owned={true} />
                </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;