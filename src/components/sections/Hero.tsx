'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroStat, InfoTooltip } from '@/components/ui';

// Source data for hero statistics
const heroSources = {
  failureRate: {
    content: 'From 1995 to 2021, the pharmaceutical industry invested approximately $42.5 billion in AD drug development, with a 99% failure rate.',
    source: 'Cummings et al., Alzheimers Dement, 2022',
    href: 'https://pubmed.ncbi.nlm.nih.gov/35124968/',
  },
  worldwide: {
    content: 'An estimated 32 million people worldwide have Alzheimer\'s disease dementia, with prevalence expected to triple by 2050 due to population aging.',
    source: 'Alzheimer\'s Disease International, World Alzheimer Report 2023',
    href: 'https://www.alzint.org/resource/world-alzheimer-report-2023/',
  },
  investmentRatio: {
    content: '79% of Phase 3 trials are industry-funded for patented drugs, while 77% of repurposed drug trials rely on non-industry (NIH/academic) sources. This creates an 85:1 funding disparity.',
    source: 'Cummings et al., Alzheimers Dement Transl Res Clin Interv, 2024',
    href: 'https://pubmed.ncbi.nlm.nih.gov/38659717/',
  },
  totalInvestment: {
    content: 'Total private clinical R&D from 1995-2021 was $42.5 billion, with Phase 3 alone costing $24.1 billion (57% of total). Average Phase 3 cost per drug: $462 million.',
    source: 'Cummings et al., Alzheimers Dement, 2022',
    href: 'https://pubmed.ncbi.nlm.nih.gov/35124968/',
  },
};

export function Hero() {
  const scrollToContent = () => {
    const contentSection = document.getElementById('paradox');
    contentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="flex items-center justify-center relative px-6 overflow-hidden"
      style={{
        minHeight: 'calc(100vh - 64px)',
        paddingBottom: '80px',
      }}
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="relative px-6 py-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight font-serif leading-tight"
          >
            Untangling Alzheimer&apos;s
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto"
          >
            The science, the system, and the search for a cure
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 text-sm text-[var(--text-muted)] max-w-xl mx-auto"
          >
            Three acts: why funding follows patents over science, how promising drugs die in translation, and what&apos;s finally working.
          </motion.p>

          {/* Hero stat - the most impactful number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 mb-12"
          >
            <div className="relative inline-block">
              <HeroStat
                value={99}
                suffix="%"
                label="Clinical trial failure rate"
                sublabel="Over 400 trials failed between 2002-2012"
                color="danger"
              />
              <span className="absolute -top-2 -right-6">
                <InfoTooltip
                  content={heroSources.failureRate.content}
                  source={heroSources.failureRate.source}
                  href={heroSources.failureRate.href}
                  size="md"
                />
              </span>
            </div>
          </motion.div>

          {/* Supporting stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto"
          >
            <StatCard
              value="32M+"
              label="People with Alzheimer's worldwide"
              tooltip={heroSources.worldwide}
            />
            <StatCard
              value="85:1"
              label="Patented vs. generic R&D investment"
              tooltip={heroSources.investmentRatio}
            />
            <StatCard
              value="$42.5B"
              label="Private R&D spent (1995-2021)"
              tooltip={heroSources.totalInvestment}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        aria-label="Scroll to explore content"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 1 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <span aria-hidden="true" className="text-sm text-[var(--text-muted)] mb-2 group-hover:text-[var(--text-body)] transition-colors">
          Scroll to explore
        </span>
        <ChevronDown aria-hidden="true" className="w-8 h-8 text-[var(--text-muted)] group-hover:text-[var(--text-body)] transition-colors" />
      </motion.button>
    </section>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  tooltip?: {
    content: string;
    source: string;
    href: string;
  };
}

function StatCard({ value, label, tooltip }: StatCardProps) {
  return (
    <figure
      role="group"
      aria-label={`${value} - ${label}`}
      className="bg-[var(--bg-secondary)] rounded border border-[var(--border)] p-6 text-center relative"
    >
      <span aria-hidden="true" className="text-2xl sm:text-3xl font-bold font-serif text-[var(--accent-orange)] block">
        {value}
      </span>
      <figcaption className="mt-2 text-sm text-[var(--text-muted)]">{label}</figcaption>
      {tooltip && (
        <span className="absolute top-2 right-2">
          <InfoTooltip
            content={tooltip.content}
            source={tooltip.source}
            href={tooltip.href}
            size="sm"
          />
        </span>
      )}
    </figure>
  );
}
