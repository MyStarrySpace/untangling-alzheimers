'use client';

import { Header, Footer, SidebarLayoutWrapper } from '@/components/layout';
import { ChapterBreak, SectionDivider, PauseCard } from '@/components/ui';
import {
  Hero,
  AlzheimerLegacy,
  InvestmentWaterfall,
  HistoricalTimeline,
  TrialBarriers,
  PromisingFrontier,
  FailureCascade,
  TranslationalFailures,
  CaseStudies,
  HopefulDevelopments,
  EmergingRiskFactors,
} from '@/components/sections';

// Act I pause card content
const actIPauseContent = {
  actLabel: 'Act I',
  summary: "We can now detect Alzheimer's pathology 15-45 years before symptoms—yet research investment is driven by patent status, not scientific promise.",
  claimsWithEvidence: [
    {
      claim: 'Biomarkers can detect AD pathology decades before symptoms: pericyte injury (45 years), BBB breakdown (18 years), tau changes (15 years).',
      evidence: 'CSF sPDGFRβ elevates by age 20 in APOE4 carriers; plasma p-tau217 detects disease 15+ years pre-symptom with >95% accuracy.',
      sourceNote: 'Montagne et al., 2020; Hansson 2024',
    },
    {
      claim: '$42.5 billion went to patented drugs while only ~$500 million funded generic alternatives—an 85:1 funding disparity.',
      evidence: 'Analysis of clinical trial spending from 1995-2021 shows systematic underinvestment in off-patent compounds.',
      sourceNote: 'Cummings et al., 2022',
    },
    {
      claim: 'The patent system abandons promising compounds: metformin, lithium, and TNF inhibitors lack Phase 3 trials despite epidemiological evidence.',
      evidence: 'Clinical trials cost $300-600M and take 6+ years, making generic drug development economically impossible.',
      sourceNote: 'PhRMA, Cummings 2018',
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
  summary: 'Precision medicine is transforming AD treatment: molecular subtyping reveals 5 distinct disease variants requiring different therapeutic approaches.',
  claimsWithEvidence: [
    {
      claim: 'CSF proteomics identifies 5 molecular subtypes with different pathways—"hyperplasticity" (36-59%), "innate immune" (26-29%), and "BBB dysfunction" (7-10%).',
      evidence: 'Tijms et al. (2024) replicated subtypes across 419 patients; each shows distinct progression rates and treatment responses.',
      sourceNote: 'Tijms et al., Nature Aging 2024',
    },
    {
      claim: 'APOE4 carriers respond differently to treatments: HRT benefits APOE4 women more than non-carriers; intranasal insulin helps only APOE4-negative patients.',
      evidence: 'EPAD cohort showed larger HRT cognitive benefit in APOE4 women; SNIFF trials showed genotype-specific insulin response.',
      sourceNote: 'Saleh 2023; SNIFF trials',
    },
    {
      claim: 'Combination therapy matching subtype may finally succeed where single-target approaches failed.',
      evidence: 'Anti-amyloid + anti-inflammatory for immune subtypes; BBB-protective + metabolic agents for vascular subtypes now in development.',
    },
  ],
  lookAhead: 'The future is personalized: biomarker-guided stratification could finally deliver the right treatment to the right patient.',
};

export default function Home() {
  return (
    <>
      <Header />
      <SidebarLayoutWrapper>
        <main className="relative mt-14 lg:mt-0">
          <Hero />

          {/* Intro: Alzheimer's Legacy */}
          <AlzheimerLegacy />

          {/* Act I: The Paradox */}
          <ChapterBreak label="Act I" variant="default">
            The paradox of Alzheimer&apos;s research.
          </ChapterBreak>
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
          <TranslationalFailures />
          <SectionDivider variant="tick" />
          <CaseStudies />
          <SectionDivider variant="tick" />
          <EmergingRiskFactors />

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
      </SidebarLayoutWrapper>
    </>
  );
}
