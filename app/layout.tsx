import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Avalaflow | Physical-Digital Collectible Platform',
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
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-dark-bg text-text-primary antialiased overflow-x-hidden`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
