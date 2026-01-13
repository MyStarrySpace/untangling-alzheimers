'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Users,
  DollarSign,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Building2,
  Heart,
  Pill,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent } from '@/components/ui';
import {
  trialRequirements,
  adTrialPhaseCosts,
  fundingSources,
  getFundingGapAnalysis,
  redirectedDrugs,
  adDevelopmentStatistics,
} from '@/data/trialBarriers';
import { investmentData, comparisonData } from '@/data';
import { formatCurrency } from '@/lib/utils';

// Format large numbers with suffix
function formatLargeNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(0)}M`;
  }
  return `$${num.toLocaleString()}`;
}

// Phase cost bar component
function PhaseCostBar({
  phase,
  index,
}: {
  phase: (typeof adTrialPhaseCosts)[0];
  index: number;
}) {
  const maxCost = 462_000_000;
  const widthPercent = (phase.perDrugCost / maxCost) * 100;

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[var(--text-primary)] font-medium">{phase.phase}</span>
        <span className="text-[var(--text-muted)] text-sm">{phase.typicalDuration}</span>
      </div>
      <div className="relative h-10 bg-[var(--bg-secondary)] rounded-lg overflow-hidden border border-[var(--border)]">
        <motion.div
          className={`h-full rounded-lg ${
            index === 2
              ? 'bg-gradient-to-r from-[var(--danger)] to-red-400'
              : 'bg-gradient-to-r from-blue-500 to-blue-400'
          }`}
          initial={{ width: 0 }}
          whileInView={{ width: `${widthPercent}%` }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
        <div className="absolute inset-0 flex items-center px-4">
          <span className="text-white font-bold font-mono text-lg drop-shadow">
            {formatLargeNumber(phase.perDrugCost)}
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-[var(--text-muted)]">
          {phase.typicalPatients} patients
        </span>
        <span className="text-xs text-[var(--danger)]">{phase.failureRate}% failure rate</span>
      </div>
    </motion.div>
  );
}

// Funding source card
function FundingBubble({
  source,
  index,
  phase3Cost,
}: {
  source: (typeof fundingSources)[0];
  index: number;
  phase3Cost: number;
}) {
  const budgetUSD = source.annualBudget * 1_000_000;
  const percentOfPhase3 = (budgetUSD / phase3Cost) * 100;

  const typeColors = {
    government: 'bg-blue-50 border-blue-200 text-blue-600',
    nonprofit: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    industry: 'bg-purple-50 border-purple-200 text-purple-600',
  };

  const typeIcons = {
    government: <Building2 className="w-4 h-4" />,
    nonprofit: <Heart className="w-4 h-4" />,
    industry: <Pill className="w-4 h-4" />,
  };

  return (
    <motion.div
      className={`flex flex-col items-center p-3 rounded-lg border ${typeColors[source.type]}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-1 mb-1">
        {typeIcons[source.type]}
        <span className="text-xs font-medium truncate max-w-[120px]">
          {source.name.split('(')[0].trim()}
        </span>
      </div>
      <span className="text-lg font-bold font-mono">
        ${source.annualBudget >= 1000
          ? `${(source.annualBudget / 1000).toFixed(1)}B`
          : `${source.annualBudget}M`}
      </span>
      <span className="text-xs opacity-70">
        {percentOfPhase3 >= 100
          ? `${Math.floor(percentOfPhase3 / 100)} trials/yr`
          : `${percentOfPhase3.toFixed(0)}% of 1 trial`}
      </span>
    </motion.div>
  );
}

// Redirected drug card
function RedirectedDrugCard({
  drug,
  index,
}: {
  drug: (typeof redirectedDrugs)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    none: 'text-[var(--danger)] bg-[var(--danger-light)]',
    phase_1: 'text-amber-600 bg-amber-50',
    phase_2: 'text-blue-600 bg-blue-50',
    phase_3: 'text-[var(--success)] bg-[var(--success-light)]',
    abandoned: 'text-[var(--text-muted)] bg-gray-100',
  };

  const statusLabels = {
    none: 'No AD trial',
    phase_1: 'Phase 1',
    phase_2: 'Phase 2',
    phase_3: 'Phase 3',
    abandoned: 'Abandoned',
  };

  return (
    <motion.div
      className="p-4 rounded-lg bg-white border border-[var(--border)] cursor-pointer
        hover:shadow-md hover:-translate-y-0.5 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-[var(--text-primary)] font-semibold">{drug.name}</h4>
          <p className="text-[var(--text-muted)] text-sm">{drug.mechanism}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded font-medium ${statusColors[drug.adTrialStatus]}`}
        >
          {statusLabels[drug.adTrialStatus]}
        </span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-[var(--border)]"
          >
            <p className="text-sm text-[var(--text-body)] mb-2">
              <strong className="text-[var(--success)]">AD Rationale:</strong>{' '}
              {drug.adRationale}
            </p>
            <p className="text-sm text-[var(--text-body)] mb-2">
              <strong className="text-[var(--accent-orange)]">Why not AD:</strong>{' '}
              {drug.whyNotAD}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {drug.currentIndications.map((ind) => (
                <span
                  key={ind}
                  className="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                >
                  {ind}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function TrialBarriers() {
  const [showAllDrugs, setShowAllDrugs] = useState(false);
  const analysis = getFundingGapAnalysis();
  const phase3Cost = adTrialPhaseCosts.find((p) => p.phase === 'Phase 3')!.perDrugCost;

  return (
    <Section id="trial-barriers">
      <Container>
        <SectionHeader
          title="Why AD Trials Are Different"
          subtitle="Alzheimer's trials are 3-5x more expensive, take 2-3x longer, and have higher failure rates than almost any other disease."
        />

        {/* Key statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="p-4 rounded-lg bg-white border border-[var(--border)] text-center">
            <DollarSign className="w-6 h-6 mx-auto text-blue-500 mb-2" />
            <span className="text-2xl font-bold font-mono text-[var(--text-primary)]">$42.5B</span>
            <p className="text-xs text-[var(--text-muted)] mt-1">Invested 1995-2021</p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--danger-light)] border border-[var(--danger)] text-center">
            <AlertTriangle className="w-6 h-6 mx-auto text-[var(--danger)] mb-2" />
            <span className="text-2xl font-bold font-mono text-[var(--danger)]">
              {adDevelopmentStatistics.overallFailureRate}%
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">Failure rate</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-[var(--border)] text-center">
            <Users className="w-6 h-6 mx-auto text-[var(--success)] mb-2" />
            <span className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {(adDevelopmentStatistics.totalParticipants / 1000).toFixed(0)}K
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">Trial participants</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-[var(--border)] text-center">
            <Clock className="w-6 h-6 mx-auto text-[var(--accent-orange)] mb-2" />
            <span className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {adDevelopmentStatistics.fdaApprovals}
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">FDA approvals (26 yrs)</p>
          </div>
        </motion.div>

        {/* Phase costs visualization */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 font-serif">
            Cost Per Drug by Phase
          </h3>
          <div className="max-w-2xl">
            {adTrialPhaseCosts.map((phase, index) => (
              <PhaseCostBar key={phase.phase} phase={phase} index={index} />
            ))}
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-4 max-w-2xl">
            Phase 3 alone costs <span className="text-[var(--danger)] font-bold">$462 million</span> per drug.
            This is why generic drugs with expired patents are rarely tested—no one can recoup the investment.
          </p>
        </motion.div>

        {/* Funding gap visualization */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-serif">The Funding Gap</h3>
          <p className="text-[var(--text-muted)] mb-6">
            Who funds AD research, and can they afford a Phase 3 trial?
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {fundingSources.map((source, index) => (
              <FundingBubble
                key={source.id}
                source={source}
                index={index}
                phase3Cost={phase3Cost}
              />
            ))}
          </div>

          {/* Key insight */}
          <motion.div
            className="p-6 rounded-lg bg-[var(--danger-light)] border border-[var(--danger)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-[var(--danger)] text-lg">
              <strong>The math doesn&apos;t work:</strong> All AD nonprofits combined
              (~${(analysis.totalNonprofitAnnualUSD / 1_000_000).toFixed(0)}M/year)
              cannot fund a single Phase 3 trial (${(phase3Cost / 1_000_000).toFixed(0)}M).
              This leaves Phase 3 entirely dependent on pharma—which only funds patentable compounds.
            </p>
          </motion.div>
        </motion.div>

        {/* Requirements comparison table */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 font-serif">
            Why Companies Test Elsewhere First
          </h3>
          <Card variant="default" hover={false}>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">
                        Factor
                      </th>
                      <th className="text-left py-3 px-4 text-[var(--danger)] font-medium">
                        AD Trials
                      </th>
                      <th className="text-left py-3 px-4 text-[var(--success)] font-medium">
                        Other Diseases
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {trialRequirements.slice(0, 5).map((req, index) => (
                      <motion.tr
                        key={req.factor}
                        className="border-b border-[var(--border)] last:border-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <td className="py-3 px-4 text-[var(--text-primary)] font-medium">
                          {req.factor}
                        </td>
                        <td className="py-3 px-4 text-[var(--text-body)]">{req.adTrials}</td>
                        <td className="py-3 px-4 text-[var(--text-body)]">
                          {req.otherIndications}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Redirected drugs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-serif">
            Drugs That Might Help—Tested Elsewhere
          </h3>
          <p className="text-[var(--text-muted)] mb-6">
            These drugs have plausible mechanisms for AD but were tested in faster, cheaper indications first.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {(showAllDrugs ? redirectedDrugs : redirectedDrugs.slice(0, 4)).map(
              (drug, index) => (
                <RedirectedDrugCard key={drug.id} drug={drug} index={index} />
              )
            )}
          </div>

          {redirectedDrugs.length > 4 && (
            <button
              className="mt-4 flex items-center gap-2 text-[var(--accent-orange)] hover:underline mx-auto font-medium"
              onClick={() => setShowAllDrugs(!showAllDrugs)}
            >
              {showAllDrugs ? (
                <>
                  Show less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show {redirectedDrugs.length - 4} more <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </motion.div>

        {/* Investment Asymmetry Section */}
        <motion.div
          className="mt-20 pt-16 border-t border-[var(--border)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 text-center font-serif">
            The Investment Asymmetry
          </h3>
          <p className="text-[var(--text-muted)] mb-12 text-center max-w-2xl mx-auto">
            The drugs that receive investment are selected based on patent status, not scientific promise.
          </p>

          {/* Waterfall visualization */}
          <div className="mb-16 p-8 bg-white rounded-xl border border-[var(--border)]">
            <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-16">
              {/* Patented bar */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'bottom' }}
              >
                <div className="relative">
                  <motion.div
                    className="w-32 sm:w-40 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
                    style={{ height: '280px' }}
                    initial={{ height: 0 }}
                    whileInView={{ height: 280 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <DollarSign className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-2xl sm:text-3xl font-bold font-mono block">
                          {formatCurrency(investmentData.patented.total, true)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </motion.div>
                </div>
                <p className="mt-4 text-[var(--text-primary)] font-semibold">{investmentData.patented.label}</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  {investmentData.patented.examples.join(', ')}
                </p>
              </motion.div>

              {/* Ratio indicator */}
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl sm:text-5xl font-bold font-serif text-[var(--accent-orange)]">
                  {investmentData.ratio}:1
                </span>
                <p className="text-[var(--text-muted)] mt-2">Investment Ratio</p>
              </motion.div>

              {/* Generic bar */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'bottom' }}
              >
                <div className="relative h-[280px] flex items-end">
                  <motion.div
                    className="w-32 sm:w-40 bg-gradient-to-t from-[var(--success)] to-emerald-400 rounded-t-lg flex items-center justify-center"
                    initial={{ height: 0 }}
                    whileInView={{ height: 3 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    style={{ minHeight: '3px' }}
                  />
                  <motion.div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-xl sm:text-2xl font-bold font-mono text-[var(--success)] block">
                      {formatCurrency(investmentData.generic.total, true)}
                    </span>
                    <TrendingDown className="w-5 h-5 text-[var(--success)] mx-auto mt-1" />
                  </motion.div>
                </div>
                <p className="mt-4 text-[var(--text-primary)] font-semibold">{investmentData.generic.label}</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  {investmentData.generic.examples.join(', ')}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card variant="default" hover={false}>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Category</th>
                        <th className="text-left py-3 px-4 text-blue-600 font-medium">Patented Drugs</th>
                        <th className="text-left py-3 px-4 text-[var(--success)] font-medium">Generic/Supplement</th>
                        <th className="text-left py-3 px-4 text-[var(--accent-orange)] font-medium">Delta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, index) => (
                        <motion.tr
                          key={row.category}
                          className="border-b border-[var(--border)] last:border-0"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <td className="py-3 px-4 text-[var(--text-primary)] font-medium">{row.category}</td>
                          <td className="py-3 px-4 text-[var(--text-body)]">{row.patented}</td>
                          <td className="py-3 px-4 text-[var(--text-body)]">{row.generic}</td>
                          <td className="py-3 px-4 text-[var(--accent-orange)] font-mono">{row.delta || '—'}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
