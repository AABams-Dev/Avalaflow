import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FigureProps {
  name?: string;
  image?: string;
  level?: number;
  rarity?: 'Common' | 'Rare' | 'Legendary';
  serialNumber?: string;
  owned?: boolean;
}

export const FigureCard: React.FC<FigureProps> = ({
  name = 'Unknown NFT',
  image = '',
  level = 1,
  rarity = 'Common',
  serialNumber = 'N/A',
  owned = false,
}) => {
  const rarityStyles = {
    Legendary: 'from-amber-400/30 to-amber-600/10 border-amber-500/40 shadow-amber-500/10',
    Rare: 'from-blue-400/30 to-blue-600/10 border-blue-500/40 shadow-blue-500/10',
    Common: 'from-zinc-400/20 to-zinc-600/10 border-zinc-500/30 shadow-white/5',
  };

  // Professional fallback: A sleek geometric figure silhouette instead of the robot
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400&auto=format&fit=crop"; 
  };

  return (
    <div
      className={`group relative bg-zinc-900 rounded-3xl p-4 border transition-all duration-500
        ${rarityStyles[rarity] || rarityStyles['Common']}
        ${owned ? 'shadow-xl border-solid' : 'border-dashed opacity-80'}
        hover:scale-[1.02] hover:bg-zinc-800/80
      `}
    >
      {/* Rarity Badge */}
      <div className="absolute top-3 left-3 z-20 text-[10px] font-bold uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
        {rarity || 'Common'}
      </div>

      {/* Image Container - Spotlight Effect */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-950 flex items-center justify-center mb-4 border border-white/5 shadow-inner">
        {/* Gallery Spotlight Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-zinc-800/40 via-transparent to-transparent pointer-events-none" />
        
        <img
          src={image && image !== '' ? image : "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400&auto=format&fit=crop"}
          alt={name}
          onError={handleImageError}
          // Changed to object-contain so we see the full figure art
          className="relative z-10 h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Subtle scan-line overlay for tech vibe */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 z-10" />
      </div>

      {/* Info Section */}
      <div className="text-center space-y-1 relative z-20">
        <h3 className="text-lg font-bold text-white leading-tight truncate px-2">{name}</h3>
        
        <div className="flex items-center justify-center gap-2">
           <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/5 font-bold">
            LVL {level}
           </span>
           <span className="text-[10px] font-mono text-zinc-500">
            #{typeof serialNumber === 'string' ? (serialNumber.length > 6 ? serialNumber.slice(-6) : serialNumber) : serialNumber}
           </span>
        </div>

        {/* Status */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${owned ? 'bg-green-500' : 'bg-zinc-600'}`} />
          <span className={`text-[10px] font-black uppercase tracking-wider ${owned ? 'text-green-500' : 'text-zinc-600'}`}>
            {owned ? 'Verified Digital Twin' : 'Pending Mint'}
          </span>
        </div>
      </div>
    </div>
  );
};