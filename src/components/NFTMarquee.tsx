import React from 'react';
import { FigureCard } from './FigureCard';

interface MarqueeProps {
  nfts: any[]; // Use your NFT interface here
}

export const NFTMarquee: React.FC<MarqueeProps> = ({ nfts }) => {
  // We triple the list so there is NEVER a gap in the rolling motion
  const rollingList = [...nfts, ...nfts, ...nfts];

  return (
    <div className="relative w-full overflow-hidden bg-black py-20">
      {/* This div is the 'train' that moves */}
      <div className="flex animate-marquee whitespace-nowrap">
        {rollingList.map((nft, index) => (
          <div key={index} className="px-6 flex-shrink-0">
            <FigureCard 
              name={nft.name}
              image={nft.image}
              level={nft.level}
              rarity={nft.rarity}
              serialNumber={nft.serialNumber}
            />
          </div>
        ))}
      </div>
    </div>
  );
};