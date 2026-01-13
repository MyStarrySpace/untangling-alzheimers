'use client';

import { ScrollProgress, Header, Footer } from '@/components/layout';
import {
  Hero,
  HistoricalTimeline,
  TrialBarriers,
  EvidenceGraveyard,
  FailureCascade,
  CaseStudies,
  HopefulDevelopments,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="relative">
        {/* Act I: The Paradox */}
        <Hero />
        <HistoricalTimeline />
        <TrialBarriers />

        {/* Act II: The System */}
        <EvidenceGraveyard />
        <FailureCascade />
        <CaseStudies />

        {/* Act III: Reasons for Hope */}
        <HopefulDevelopments />
      </main>
      <Footer />
    </>
  );
}
