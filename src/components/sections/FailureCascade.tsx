'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, BarChart3 } from 'lucide-react';
import { Container, Section, SectionHeader } from '@/components/ui';
import {
  marketFailures,
  failureCascadeNarrative,
  investmentDisparity,
  trialEconomicsData,
  insuranceData,
  adSubtypesData,
  timingData,
  getSection,
} from '@/data';

import { MenopauseComparison, AncestryRiskChart, FatDistributionChart } from '@/components/sections';

const sectionConfig = getSection('system')!;

// Color palette for cards - cycling through theme colors
const cardColors = [
  { bg: 'bg-[#486393]/10', border: 'border-[#486393]/30', icon: 'text-[#486393]', accent: '#486393' },
  { bg: 'bg-[#007385]/10', border: 'border-[#007385]/30', icon: 'text-[#007385]', accent: '#007385' },
  { bg: 'bg-[#C9461D]/10', border: 'border-[#C9461D]/30', icon: 'text-[#C9461D]', accent: '#C9461D' },
  { bg: 'bg-[#E5AF19]/10', border: 'border-[#E5AF19]/30', icon: 'text-[#b38600]', accent: '#b38600' },
  { bg: 'bg-[#C3577F]/10', border: 'border-[#C3577F]/30', icon: 'text-[#C3577F]', accent: '#C3577F' },
  { bg: 'bg-[#486393]/10', border: 'border-[#486393]/30', icon: 'text-[#486393]', accent: '#486393' },
  { bg: 'bg-[#007385]/10', border: 'border-[#007385]/30', icon: 'text-[#007385]', accent: '#007385' },
  { bg: 'bg-[#C9461D]/10', border: 'border-[#C9461D]/30', icon: 'text-[#C9461D]', accent: '#C9461D' },
];

// Modal content types
type ModalContent =
  | 'patent-system'
  | 'fda-structure'
  | 'trial-economics'
  | 'insurance-structure'
  | 'subtype-blindness'
  | 'sex-difference'
  | 'ancestry-gap'
  | 'timing-catastrophe'
  | null;

export function FailureCascade() {
  const sortedFailures = marketFailures.sort((a, b) => a.order - b.order);
  const [modalContent, setModalContent] = useState<ModalContent>(null);

  return (
    <Section id={sectionConfig.id}>
      <Container>
        <SectionHeader
          title={sectionConfig.title}
          subtitle={sectionConfig.subtitle}
        />

        {/* Narrative intro - compact */}
        <motion.div
          className="max-w-2xl mx-auto mb-6 flex items-start gap-3 p-4 border border-[var(--accent-orange)] bg-[var(--accent-orange-light)]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AlertTriangle className="w-5 h-5 text-[var(--accent-orange)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--accent-orange)]">{failureCascadeNarrative}</p>
        </motion.div>

        {/* How to read this */}
        <motion.p
          className="text-center text-xs text-[var(--text-muted)] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] inline-flex items-center justify-center text-[8px]">📊</span>
            Click any card to see supporting data
          </span>
        </motion.p>

        {/* Descending Stairs Layout - 4 columns */}
        <div className="max-w-6xl mx-auto">
          {/* Row 1: Items 1-4 descending like stairs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sortedFailures.slice(0, 4).map((failure, index) => {
              const colors = cardColors[index];
              // Each card steps down progressively
              const stepDown = index * 24; // 24px step per card
              return (
                <div key={failure.id} style={{ marginTop: stepDown }}>
                  <FailureCard
                    failure={failure}
                    index={index}
                    colors={colors}
                    onOpenChart={() => setModalContent(failure.id as ModalContent)}
                  />
                </div>
              );
            })}
          </div>

          {/* Row 2: Items 5-8 (if they exist) positioned below 1-4 */}
          {sortedFailures.length > 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              {sortedFailures.slice(4, 8).map((failure, index) => {
                const colors = cardColors[index + 4];
                // Continue the stair pattern from row 1
                const stepDown = index * 24;
                return (
                  <div key={failure.id} style={{ marginTop: stepDown }}>
                    <FailureCard
                      failure={failure}
                      index={index + 4}
                      colors={colors}
                      onOpenChart={() => setModalContent(failure.id as ModalContent)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* The result */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-widest text-[var(--text-muted)] mb-2">
            The Result
          </p>
          <p className="text-5xl md:text-6xl font-serif font-bold text-[var(--danger)]">
            99%
          </p>
          <p className="text-xl md:text-2xl font-serif text-[var(--text-primary)] mt-1">
            Trial Failure Rate
          </p>
        </motion.div>
      </Container>

      {/* Modal for charts */}
      <AnimatePresence>
        {modalContent && (
          <ChartModal
            type={modalContent}
            onClose={() => setModalContent(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

interface FailureCardProps {
  failure: (typeof marketFailures)[0];
  index: number;
  colors: typeof cardColors[0];
  onOpenChart?: () => void;
}

function FailureCard({ failure, index, colors, onOpenChart }: FailureCardProps) {
  const Icon = failure.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div
        className={`p-3 border ${colors.bg} ${colors.border} transition-all duration-200 hover:shadow-md h-full flex flex-col`}
      >
        {/* Header row */}
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-8 h-8 flex items-center justify-center ${colors.bg}`}>
            <Icon className={`w-4 h-4 ${colors.icon}`} />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span
              className="text-xs font-bold px-1.5 py-0.5"
              style={{ backgroundColor: colors.accent, color: 'white' }}
            >
              {failure.order}
            </span>
            <h3 className="text-sm font-bold text-[var(--text-primary)] truncate">
              {failure.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[var(--text-body)] mb-2 leading-relaxed">
          {failure.description}
        </p>

        {/* Impact - styled as a quote */}
        <p
          className="text-xs italic pl-3 border-l-2 flex-1"
          style={{ borderColor: colors.accent, color: colors.accent }}
        >
          {failure.impact}
        </p>

        {/* Chart button for specific cards */}
        {onOpenChart && (
          <button
            onClick={onOpenChart}
            className="mt-3 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium
              bg-white border border-[var(--border)] shadow-sm
              hover:shadow-md hover:border-[var(--accent-orange)] hover:text-[var(--accent-orange)]
              text-[var(--text-body)] transition-all duration-200"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>View Data</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Chart colors
const colors = {
  blue: '#486393',
  teal: '#007385',
  orange: '#C9461D',
  yellow: '#E5AF19',
  muted: '#787473',
  dark: '#263238',
  lightBlue: '#E6F1F6',
  lightOrange: '#FFA38040',
};

// Patent System Chart
function PatentSystemChart() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[var(--border)] p-6">
        <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">
          Investment Disparity: Patented vs Generic Drugs
        </h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium" style={{ color: colors.dark }}>Patented Drug Investment</span>
              <span className="text-sm font-bold" style={{ color: colors.orange }}>${investmentDisparity.patentedInvestment.toLocaleString()}M</span>
            </div>
            <div className="h-8 bg-[var(--bg-secondary)]">
              <motion.div
                className="h-full"
                style={{ backgroundColor: colors.orange }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium" style={{ color: colors.dark }}>Generic Drug Investment</span>
              <span className="text-sm font-bold" style={{ color: colors.teal }}>~${investmentDisparity.genericInvestment}M</span>
            </div>
            <div className="h-8 bg-[var(--bg-secondary)]">
              <motion.div
                className="h-full"
                style={{ backgroundColor: colors.teal }}
                initial={{ width: 0 }}
                whileInView={{ width: '0.12%' }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-2xl font-bold font-serif" style={{ color: colors.orange }}>
          {investmentDisparity.ratio} Ratio
        </p>
        <p className="mt-2 text-sm text-center" style={{ color: colors.muted }}>
          Source: {investmentDisparity.source}
        </p>
      </div>

      <div className="bg-white border border-[var(--border)] p-6">
        <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">Key Barriers for Generic Drugs</h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm">
            <span className="text-[var(--accent-orange)] mt-1">•</span>
            <span>"Generic drugs lack marketing protection, which leads to higher market competition"</span>
          </li>
          <li className="flex items-start gap-3 text-sm">
            <span className="text-[var(--accent-orange)] mt-1">•</span>
            <span>"Obtaining 'second medical use' patents can be difficult, as the repurposed indication may not be novel due to already published literature"</span>
          </li>
          <li className="flex items-start gap-3 text-sm">
            <span className="text-[var(--accent-orange)] mt-1">•</span>
            <span>"Bringing a repurposed compound to market still costs hundreds of millions to billions of dollars"</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Trial Economics Chart
function TrialEconomicsChart() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          className="bg-white border border-[var(--border)] p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl font-bold font-serif" style={{ color: colors.orange }}>
            ${(trialEconomicsData.totalInvestment / 1000).toFixed(1)}B
          </div>
          <div className="text-xs mt-1" style={{ color: colors.muted }}>Total Investment</div>
        </motion.div>
        <motion.div
          className="bg-white border border-[var(--border)] p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl font-bold font-serif" style={{ color: colors.orange }}>
            {trialEconomicsData.failureRate}%
          </div>
          <div className="text-xs mt-1" style={{ color: colors.muted }}>Failure Rate</div>
        </motion.div>
        <motion.div
          className="bg-white border border-[var(--border)] p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl font-bold font-serif" style={{ color: colors.teal }}>
            {trialEconomicsData.successCount}
          </div>
          <div className="text-xs mt-1" style={{ color: colors.muted }}>Drugs Approved</div>
        </motion.div>
        <motion.div
          className="bg-white border border-[var(--border)] p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl font-bold font-serif" style={{ color: colors.blue }}>
            {(trialEconomicsData.totalParticipants / 1000).toFixed(0)}K
          </div>
          <div className="text-xs mt-1" style={{ color: colors.muted }}>Trial Participants</div>
        </motion.div>
      </div>

      <div className="bg-white border border-[var(--border)] p-6">
        <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">Cost by Development Phase</h4>
        <div className="space-y-3">
          {trialEconomicsData.phaseCosts.map((phase, idx) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: colors.dark }}>{phase.phase}</span>
                <span className="text-sm" style={{ color: colors.muted }}>${phase.cost}M ({phase.percent}%)</span>
              </div>
              <div className="h-6 bg-[var(--bg-secondary)]">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: idx === 2 ? colors.orange : colors.blue }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${phase.percent}%` }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--accent-orange-light)] border border-[var(--accent-orange)] p-4">
        <p className="text-sm" style={{ color: colors.orange }}>
          <strong>The Funding Gap:</strong> Average academic grant = ${trialEconomicsData.fundingGap.academicGrant}M.
          Phase 3 trial = ${trialEconomicsData.fundingGap.phase3Cost}M.
          That's a <strong>{trialEconomicsData.fundingGap.ratio}× gap</strong> that only patent-protected drugs can bridge.
        </p>
      </div>
    </div>
  );
}

// Insurance Structure Chart
function InsuranceChart() {
  const total = insuranceData.payers.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[var(--border)] p-6">
        <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">Who Pays for Alzheimer's Care</h4>
        <p className="text-sm mb-4" style={{ color: colors.muted }}>
          Annual cost per AD patient: ${insuranceData.annualCostPerPatient.toLocaleString()} (excluding family caregiving)
        </p>
        <div className="space-y-3">
          {insuranceData.payers.map((payer, idx) => (
            <motion.div
              key={payer.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: colors.dark }}>{payer.name}</span>
                <span className="text-sm" style={{ color: colors.muted }}>${payer.amount.toLocaleString()}</span>
              </div>
              <div className="h-6 bg-[var(--bg-secondary)]">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: payer.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(payer.amount / total) * 100}%` }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </div>
              <p className="text-xs" style={{ color: colors.muted }}>{payer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-[var(--border)] p-4">
          <div className="text-3xl font-bold font-serif text-center" style={{ color: colors.orange }}>
            {insuranceData.medicaidNursingHomePercent}%
          </div>
          <p className="text-sm text-center mt-2" style={{ color: colors.muted }}>
            of nursing home residents have moderate to severe dementia
          </p>
        </div>
        <div className="bg-white border border-[var(--border)] p-4">
          <div className="text-3xl font-bold font-serif text-center" style={{ color: colors.teal }}>
            +{insuranceData.additionalMedicareCost}%
          </div>
          <p className="text-sm text-center mt-2" style={{ color: colors.muted }}>
            additional Medicare cost for AD patients vs. same-risk controls
          </p>
        </div>
      </div>

      <div className="bg-[var(--accent-orange-light)] border border-[var(--accent-orange)] p-4">
        <p className="text-sm" style={{ color: colors.orange }}>
          <strong>Key Problem:</strong> Medicare pays for medical care but not prevention. Medicaid pays for
          long-term care after disease progression. There is no reimbursement pathway for prevention in healthy individuals.
        </p>
      </div>
    </div>
  );
}

// Subtypes Chart
function SubtypesChart() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[var(--border)] p-6">
        <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">AD Biological Subtypes</h4>
        <div className="space-y-4">
          {adSubtypesData.subtypes.map((subtype, idx) => (
            <motion.div
              key={subtype.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: colors.dark }}>{subtype.name}</span>
                <span className="text-sm font-bold" style={{ color: subtype.color }}>{subtype.percent}%</span>
              </div>
              <div className="h-8 bg-[var(--bg-secondary)]">
                <motion.div
                  className="h-full flex items-center px-2"
                  style={{ backgroundColor: subtype.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${subtype.percent}%` }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {subtype.percent > 20 && (
                    <span className="text-xs text-white truncate">{subtype.description}</span>
                  )}
                </motion.div>
              </div>
              {subtype.percent <= 20 && (
                <p className="text-xs mt-1" style={{ color: colors.muted }}>{subtype.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] p-6">
        <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">Factors Driving Heterogeneity</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {adSubtypesData.heterogeneityFactors.map((item, idx) => (
            <motion.div
              key={item.factor}
              className="border border-[var(--border)] p-3"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="font-medium text-sm" style={{ color: colors.orange }}>{item.factor}</div>
              <div className="text-sm" style={{ color: colors.muted }}>{item.impact}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-[var(--border)] p-4 text-center">
          <div className="text-4xl font-bold font-serif" style={{ color: colors.orange }}>
            {adSubtypesData.earlyOnsetAtypical}%
          </div>
          <p className="text-sm mt-2" style={{ color: colors.muted }}>
            of early-onset AD patients have atypical (non-memory) presentations
          </p>
        </div>
        <div className="bg-[var(--accent-orange-light)] border border-[var(--accent-orange)] p-4">
          <p className="text-sm" style={{ color: colors.orange }}>
            <strong>Trial Implication:</strong> {adSubtypesData.trialImplication}
          </p>
        </div>
      </div>
    </div>
  );
}

// Timing Chart
function TimingChart() {
  const midpoint = timingData.timeline.findIndex(t => t.year === 0);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[var(--border)] p-6">
        <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">Disease Timeline vs Intervention Window</h4>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

          {/* Events */}
          <div className="space-y-4 pl-10">
            {timingData.timeline.map((event, idx) => (
              <motion.div
                key={event.label}
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Dot */}
                <div
                  className="absolute -left-8 top-1 w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: event.stage === 'clinical' ? colors.orange : colors.teal,
                  }}
                />
                {/* Content */}
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-sm font-mono font-bold min-w-[50px]"
                    style={{ color: event.stage === 'clinical' ? colors.orange : colors.teal }}
                  >
                    {event.year > 0 ? `+${event.year}` : event.year} yr
                  </span>
                  <span className="text-sm" style={{ color: colors.dark }}>{event.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Intervention marker */}
          <div className="mt-6 flex items-center gap-2 pl-10">
            <div className="flex-1 h-px bg-[var(--danger)]" />
            <span className="text-xs font-medium text-[var(--danger)]">Most trials begin here</span>
            <div className="flex-1 h-px bg-[var(--danger)]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[var(--border)] p-4 text-center">
          <div className="text-3xl font-bold font-serif" style={{ color: colors.teal }}>
            {timingData.decadesBeforeSymptoms}+
          </div>
          <p className="text-sm mt-1" style={{ color: colors.muted }}>years pathology precedes symptoms</p>
        </div>
        <div className="bg-white border border-[var(--border)] p-4 text-center">
          <div className="text-3xl font-bold font-serif" style={{ color: colors.orange }}>
            {timingData.failedCompounds}
          </div>
          <p className="text-sm mt-1" style={{ color: colors.muted }}>failed Phase II/III compounds</p>
        </div>
        <div className="bg-white border border-[var(--border)] p-4 text-center">
          <div className="text-3xl font-bold font-serif" style={{ color: colors.orange }}>
            {timingData.successRate}%
          </div>
          <p className="text-sm mt-1" style={{ color: colors.muted }}>success rate since 2003</p>
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] p-6">
        <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">Key Insights from Failed Trials</h4>
        <div className="space-y-4">
          {timingData.trialLessons.map((item, idx) => (
            <motion.div
              key={item.lesson}
              className="border-l-4 border-[var(--accent-orange)] pl-4 py-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="font-medium text-sm" style={{ color: colors.orange }}>{item.lesson}</div>
              <div className="text-sm italic" style={{ color: colors.muted }}>"{item.quote}"</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--accent-orange-light)] border border-[var(--accent-orange)] p-4">
        <p className="text-sm" style={{ color: colors.orange }}>
          <strong>Key Insight:</strong> {timingData.keyInsight}
        </p>
      </div>
    </div>
  );
}

interface ChartModalProps {
  type: Exclude<ModalContent, null>;
  onClose: () => void;
}

const modalTitles: Record<Exclude<ModalContent, null>, string> = {
  'patent-system': 'The Patent System',
  'fda-structure': 'FDA Regulatory Structure',
  'trial-economics': 'Trial Economics',
  'insurance-structure': 'Insurance Structure',
  'subtype-blindness': 'Subtype Blindness',
  'sex-difference': 'Sex Differences in AD',
  'ancestry-gap': 'Ancestry Gap in AD Research',
  'timing-catastrophe': 'Timing Catastrophe',
};

function ChartModal({ type, onClose }: ChartModalProps) {
  const title = modalTitles[type];

  const renderContent = () => {
    switch (type) {
      case 'patent-system':
        return <PatentSystemChart />;
      case 'trial-economics':
        return <TrialEconomicsChart />;
      case 'insurance-structure':
        return <InsuranceChart />;
      case 'subtype-blindness':
        return <SubtypesChart />;
      case 'timing-catastrophe':
        return <TimingChart />;
      case 'sex-difference':
        return (
          <div>
            <h3 className="text-lg font-serif font-semibold text-[var(--text-primary)] mb-4">
              Menopause Transition Comparison
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              The hormonal changes during menopause create a critical window of vulnerability for AD development in women.
            </p>
            <MenopauseComparison />
          </div>
        );
      case 'ancestry-gap':
        return (
          <>
            <div>
              <h3 className="text-lg font-serif font-semibold text-[var(--text-primary)] mb-4">
                APOE4 Risk by Ancestry
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                The same APOE4 gene variant confers dramatically different risk levels across ancestral populations.
              </p>
              <AncestryRiskChart />
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-serif font-semibold text-[var(--text-primary)] mb-4">
                Fat Distribution by Ancestry
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Metabolic risk factors for AD vary significantly by ancestry, affecting how treatments should be targeted.
              </p>
              <FatDistributionChart />
            </div>
          </>
        );
      case 'fda-structure':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-[var(--border)] p-6">
              <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">
                FDA Staging for Early AD
              </h4>
              <p className="text-sm mb-4" style={{ color: colors.muted }}>
                The FDA has established a three-stage classification for early AD—but all stages require existing pathology.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-[var(--chart-secondary)] pl-4 py-2">
                  <div className="font-medium" style={{ color: colors.teal }}>Stage 1 (Preclinical)</div>
                  <p className="text-sm" style={{ color: colors.dark }}>Biomarkers abnormal, but no cognitive complaints or detectable decline</p>
                </div>
                <div className="border-l-4 border-[var(--chart-secondary)] pl-4 py-2">
                  <div className="font-medium" style={{ color: colors.teal }}>Stage 2 (Preclinical)</div>
                  <p className="text-sm" style={{ color: colors.dark }}>Subtle cognitive effects, but no functional deficits</p>
                </div>
                <div className="border-l-4 border-[var(--accent-orange)] pl-4 py-2">
                  <div className="font-medium" style={{ color: colors.orange }}>Stage 3 (Prodromal)</div>
                  <p className="text-sm" style={{ color: colors.dark }}>Problems with daily tasks, corresponds to mild cognitive impairment</p>
                </div>
              </div>
            </div>
            <div className="bg-[var(--accent-orange-light)] border border-[var(--accent-orange)] p-4">
              <p className="text-sm" style={{ color: colors.orange }}>
                <strong>The Gap:</strong> There is no regulatory pathway for true prevention—treating healthy 50-year-olds
                to prevent disease at 75. All FDA pathways require existing pathology, making prevention trials
                economically unfeasible without patent protection.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-4 md:inset-8 lg:inset-16 bg-white z-50 overflow-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border)] px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-serif font-bold text-[var(--text-primary)]">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </motion.div>
    </>
  );
}
