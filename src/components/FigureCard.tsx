import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

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
    Legendary: 'from-amber-400/30 to-amber-600/10 border-amber-500/40 shadow-amber-500/10 text-amber-500',
    Rare: 'from-blue-400/30 to-blue-600/10 border-blue-500/40 shadow-blue-500/10 text-blue-500',
    Common: 'from-zinc-400/20 to-zinc-600/10 border-zinc-500/30 shadow-white/5 text-zinc-500',
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400&auto=format&fit=crop"; 
  };

  return (
    <div
      className={`group relative bg-zinc-900 rounded-[2rem] p-4 border transition-all duration-500 overflow-hidden
        ${rarityStyles[rarity]?.split(' text-')[0] || rarityStyles['Common'].split(' text-')[0]}
        ${owned ? 'shadow-2xl border-solid' : 'border-dashed opacity-80'}
        hover:scale-[1.02] hover:bg-zinc-800/80 active:scale-95
      `}
    >
    
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black p-1.5 rounded-full shadow-lg">
        <ArrowUpRight size={14} strokeWidth={3} />
      </div>

      <div className={`absolute top-4 left-4 z-20 text-[9px] font-black uppercase tracking-[0.2em] bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 ${rarityStyles[rarity]?.split(' ')[rarityStyles[rarity]?.split(' ').length - 1]}`}>
        {rarity}
      </div>

      <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-950 flex items-center justify-center mb-4 border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-zinc-800/40 via-transparent to-transparent pointer-events-none" />
        <img
          src={image && image !== '' ? image : "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400&auto=format&fit=crop"}
          alt={name}
          onError={handleImageError}
          className="relative z-10 h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="text-left space-y-1 relative z-20 px-1">
        <h3 className="text-md font-black uppercase italic tracking-tighter text-white leading-tight truncate">{name}</h3>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-red-500 uppercase">LVL {level}</span>
           <span className="text-[10px] font-mono text-zinc-600">
            #{typeof serialNumber === 'string' ? (serialNumber.length > 4 ? serialNumber.slice(-4) : serialNumber) : serialNumber}
           </span>
        </div>
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${owned ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
          <span className={`text-[9px] font-black uppercase tracking-widest ${owned ? 'text-green-500' : 'text-zinc-600'}`}>
            {owned ? 'Anchored' : 'Ghost State'}
          </span>
        </div>
      </div>
    </div>
  );
};