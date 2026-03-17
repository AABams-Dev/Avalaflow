import './globals.css';
import type { Metadata } from 'next';
import { Outfit, Space_Grotesk } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { Footer } from '@/components/layout/Footer';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Avalaflow | Premium Collectible Finance Platform',
  description: 'Bridge physical NFC-tagged collectibles with digital ownership on Avalanche C-Chain. Scan, Verify, and Mint.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-dark-bg text-text-primary antialiased overflow-x-hidden font-sans">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
