import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Pizza Gajà - Menu Digitale Premium',
  description: 'Menu digitale della pizzeria Pizza Gajà - Pizzeria d\'asporto a Galliate. Scopri le nostre pizze classiche, speciali e le nostre esclusive.',
  keywords: ['pizza', 'pizzeria', 'Galliate', 'Pizza Gajà', 'menu digitale', 'asporto'],
  authors: [{ name: 'Pizza Gajà' }],
  openGraph: {
    title: 'Pizza Gajà - Menu Digitale',
    description: 'Scopri il menu della pizzeria Pizza Gajà',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-navy text-foreground">
        {children}
      </body>
    </html>
  );
}
