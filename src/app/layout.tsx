import type { Metadata } from 'next';
import { Neuton, Encode_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';

const neuton = Neuton({
  variable: '--font-neuton',
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  display: 'swap',
});

const encodeSans = Encode_Sans({
  variable: '--font-encode-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Untangling Alzheimer's",
  description:
    'The science, the system, and the search for a cure. An interactive exploration of Alzheimer\'s research barriers, competing theories, and emerging treatments.',
  keywords: [
    'Alzheimer\'s disease',
    'dementia research',
    'clinical trials',
    'drug development',
    'amyloid hypothesis',
    'tau protein',
    'neurodegeneration',
    'visualization',
  ],
  authors: [{ name: 'GoInvo Healthcare Design Studio' }],
  openGraph: {
    title: "Untangling Alzheimer's",
    description:
      'The science, the system, and the search for a cure. Exploring barriers, theories, and breakthroughs in Alzheimer\'s research.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${neuton.variable} ${encodeSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
