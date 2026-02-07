import React from 'react';
import { Zap, ShieldCheck, TrendingUp } from 'lucide-react';

interface FigureProps {
  name: string;
  image: string;
  level: number;
  rarity: 'Common' | 'Rare' | 'Legendary';
  serialNumber: string;
}

export const FigureCard: React.FC<FigureProps> = ({ name, image, level, rarity, serialNumber }) => {
  const rarityColors = {
    Common: 'border-zinc-800 hover:border-zinc-700',
    Rare: 'border-blue-900/30 hover:border-blue-500/50 bg-blue-500/5',
    Legendary: 'border-amber-900/30 hover:border-amber-400/50 bg-amber-500/5',
  };

  const rarityText = {
    Common: 'text-zinc-400',
    Rare: 'text-blue-400',
    Legendary: 'text-amber-400',
  };

  return (
    /* Updated the hover:scale to 1.05 and added -translate-y-2 
       to give it that "floating" lift seen in your video.
    */
    <div className={`group relative w-72 rounded-[2.5rem] border p-5 transition-all duration-500 ease-out 
      bg-zinc-950 hover:scale-105 hover:-translate-y-3 
      hover:shadow-[0_30px_60px_-15px_rgba(232,65,66,0.3)] ${rarityColors[rarity]}`}>
      
      {/* Image Container: Added a glow effect behind the image on hover */}
      <div className="relative aspect-[4/5] mb-5 overflow-hidden rounded-[1.8rem] bg-zinc-900 shadow-inner">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
        
        {/* Level Badge - styled to look more premium */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-xl rounded-full text-[10px] font-black tracking-tighter text-white border border-white/20 shadow-xl">
          LVL {level}
        </div>

        {/* Rarity Tag - Top Right */}
        <div className={`absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest ${rarityText[rarity]}`}>
          {rarity}
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-4 px-1">
        <div>
          <h3 className="text-xl font-black text-white group-hover:text-red-500 transition-colors tracking-tight">
            {name}
          </h3>
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">
            ID: {serialNumber}
          </p>
        </div>

        {/* Stats Section: Updated to look cleaner like the video UI */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 p-3 rounded-2xl bg-zinc-900/80 border border-white/5 group-hover:border-red-500/20 transition-colors">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-red-500" />
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Power</span>
            </div>
            <span className="text-white font-bold text-sm">88</span>
          </div>
          
          <div className="flex flex-col gap-1 p-3 rounded-2xl bg-zinc-900/80 border border-white/5 group-hover:border-green-500/20 transition-colors">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Boost</span>
            </div>
            <span className="text-white font-bold text-sm">1.2k</span>
          </div>
        </div>
      </div>

      {/* Avalanche Red "Active" Bar - only shows on hover at the bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity" />
    </div>
  );
};