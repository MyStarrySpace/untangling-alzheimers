import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Alzheimer's Disease: Anatomy of Market Failure",
  description:
    'An interactive visualization exposing how patent incentives, regulatory structures, and funding mechanisms systematically prevent promising Alzheimer\'s interventions from reaching patients.',
  keywords: [
    'Alzheimer\'s disease',
    'market failure',
    'healthcare',
    'drug research',
    'clinical trials',
    'generic drugs',
    'visualization',
  ],
  authors: [{ name: 'GoInvo Healthcare Design Studio' }],
  openGraph: {
    title: "Alzheimer's Disease: Anatomy of Market Failure",
    description:
      'Why the drugs that might help you will never be tested. A visualization of structural failures in AD research.',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
