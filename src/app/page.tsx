'use client';

import { ScrollProgress, Header, Footer } from '@/components/layout';
import {
  Hero,
  InvestmentWaterfall,
  EvidenceGraveyard,
  FailureCascade,
  CaseStudies,
  Stakes,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="relative">
        {/* Act I: The Paradox */}
        <Hero />
        <InvestmentWaterfall />

        {/* Act II: The System */}
        <EvidenceGraveyard />
        <FailureCascade />
        <CaseStudies />

        {/* Act III: The Stakes */}
        <Stakes />
      </main>
      <Footer />
    </>
  );
}
