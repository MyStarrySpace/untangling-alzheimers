'use client';

import { ScrollProgress, Header, Footer } from '@/components/layout';
import { ChapterBreak, SectionDivider, PauseCard } from '@/components/ui';
import {
  Hero,
  InvestmentWaterfall,
  HistoricalTimeline,
  TrialBarriers,
  PromisingFrontier,
  FailureCascade,
  CaseStudies,
  HopefulDevelopments,
} from '@/components/sections';

// Act I pause card content
const actIPauseContent = {
  actLabel: 'Act I',
  summary: "Alzheimer's research investment is driven by patent status, not scientific promise—creating a 85:1 funding disparity.",
  claimsWithEvidence: [
    {
      claim: '$42.5 billion went to patented drugs (mainly amyloid-targeting) while only ~$500 million funded generic alternatives.',
      evidence: 'Analysis of clinical trial spending from 1995-2021 shows systematic underinvestment in off-patent compounds.',
      sourceNote: 'Cummings et al., 2022',
    },
    {
      claim: 'Clinical trials cost $300-600M and take 6+ years, creating an insurmountable barrier for non-patentable treatments.',
      evidence: 'Phase 3 Alzheimer\'s trials require 1,500-3,000 patients with 18-24 month follow-up, averaging $460M.',
      sourceNote: 'PhRMA, Cummings 2018',
    },
    {
      claim: 'The patent system creates a structural gap where promising generic compounds are abandoned regardless of efficacy.',
      evidence: 'Multiple drugs showing epidemiological benefit (metformin, lithium, TNF inhibitors) lack Phase 3 trials due to economics, not science.',
    },
  ],
  lookAhead: 'Next: How this funding structure creates interconnected market failures.',
};

// Act II pause card content
const actIIPauseContent = {
  actLabel: 'Act II',
  summary: 'Seven interconnected market failures explain why 99% of Alzheimer\'s trials fail—and why promising alternatives never get tested.',
  claimsWithEvidence: [
    {
      claim: 'The "patent cliff" drives investment toward novel compounds, regardless of scientific merit.',
      evidence: 'Generic drugs cannot recoup trial costs ($460M+), so companies pursue patentable molecules even when generics show promise.',
    },
    {
      claim: 'The Lesne scandal shows how a single fraudulent paper ($287M/year misdirected) can distort an entire field.',
      evidence: 'The 2006 Nature paper claiming Aβ*56 causality was retracted in 2024 after evidence of image manipulation; 2,300+ citations.',
      sourceNote: 'Science investigation, 2022; Nature retraction, 2024',
    },
    {
      claim: 'Real treatments are abandoned for economic reasons, not scientific ones.',
      evidence: 'GV-971 terminated due to "gloomy biotech capital market"; 40Hz gamma therapy still in Phase 3 after 10+ years; TNF inhibitors show 60-70% risk reduction but only one small trial.',
    },
  ],
  lookAhead: 'Next: What\'s actually working—and what could work with proper funding.',
};

// Act III pause card content
const actIIIPauseContent = {
  actLabel: 'Act III',
  summary: 'For the first time, we have FDA-approved treatments that slow decline, plus evidence-based interventions available today.',
  claimsWithEvidence: [
    {
      claim: 'Lecanemab and donanemab are the first drugs proven to slow cognitive decline in Alzheimer\'s patients.',
      evidence: 'Phase 3 trials showed 27% (lecanemab) and 35% (donanemab) slowing of cognitive decline vs placebo.',
      sourceNote: 'CLARITY-AD (2023), TRAILBLAZER-ALZ 2 (2024)',
    },
    {
      claim: 'Lifestyle interventions can reduce dementia risk by 30-50%, addressing many of the same upstream mechanisms.',
      evidence: 'FINGER trial, MIND diet studies, and meta-analyses of exercise show consistent risk reduction across populations.',
    },
    {
      claim: 'The pipeline includes drugs targeting mechanisms beyond amyloid: neuroinflammation, metabolism, and the gut-brain axis.',
      evidence: 'Phase 2/3 trials underway for ISRIB-like compounds, GLP-1 agonists, and multi-target approaches.',
    },
  ],
  lookAhead: 'The best time to act is now—whether through available interventions or by advocating for research funding reform.',
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="relative mt-14 lg:mt-0">
        {/* Act I: The Paradox */}
        <ChapterBreak label="Act I" variant="default">
          The paradox of Alzheimer&apos;s research.
        </ChapterBreak>
        <Hero />
        <SectionDivider variant="tick" />
        <InvestmentWaterfall />
        <SectionDivider variant="tick" />
        <HistoricalTimeline />
        <SectionDivider variant="tick" />
        <TrialBarriers />

        {/* Act I Summary */}
        <PauseCard {...actIPauseContent} variant="warm" />

        {/* Transition to Act II */}
        <ChapterBreak label="Act II" variant="warm">
          Here&apos;s the system that prevents cures.
        </ChapterBreak>

        {/* Act II: The System */}
        <FailureCascade />
        <SectionDivider variant="tick" />
        <CaseStudies />

        {/* Act II Summary */}
        <PauseCard {...actIIPauseContent} variant="default" />

        {/* Transition to Act III */}
        <ChapterBreak label="Act III" variant="teal">
          But there are reasons for hope.
        </ChapterBreak>

        {/* Act III: Reasons for Hope */}
        <HopefulDevelopments />
        <SectionDivider variant="tick" />
        <PromisingFrontier />

        {/* Act III Summary / Conclusion */}
        <PauseCard {...actIIIPauseContent} variant="teal" />
      </main>
      <Footer />
    </>
  );
}
