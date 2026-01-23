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
  Info,
  ExternalLink,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  PieChart,
  Pie,
  Legend,
} from 'recharts';
import { Container, Section, SectionHeader, Card, CardContent, TextWithAbbreviations, DataCard, InteractivePieBarChart } from '@/components/ui';
import { bibliography } from '@/data/bibliography';
import {
  trialRequirements,
  adTrialPhaseCosts,
  fundingSources,
  getFundingGapAnalysis,
  redirectedDrugs,
  adDevelopmentStatistics,
  fundingComparisonData,
  nihLimitations,
  niaSpendingByFocus,
  basicVsAppliedFunding,
  grantCycleComparison,
  infrastructureComparison,
  diseaseComparisonChartData,
  neuroDiseaseTrialComparison,
} from '@/data/trialBarriers';
import { getSection } from '@/data';

const sectionConfig = getSection('trial-barriers')!;

// Theme-consistent chart colors
const chartColors = {
  primary: '#e36216',      // orange - primary for takeaways/highlights
  secondary: '#007385',    // teal - secondary
  tertiary: '#486393',     // blue - tertiary/supporting
  warning: '#E5AF19',      // amerindian yellow
  muted: '#787473',        // muted gray
  lightBlue: '#7ED3FF',    // sky blue
  lightOrange: '#FFA380',  // light orange
  pink: '#C3577F',         // nigerian pink
  dark: '#263238',         // dark
  accent: '#C9461D',       // darker orange for AD data
};

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
    government: 'bg-[#486393]/10 border-[#486393]/30 text-[#486393]',
    nonprofit: 'bg-[#007385]/10 border-[#007385]/30 text-[#007385]',
    industry: 'bg-[#C3577F]/10 border-[#C3577F]/30 text-[#C3577F]',
  };

  const typeIcons = {
    government: <Building2 className="w-4 h-4" />,
    nonprofit: <Heart className="w-4 h-4" />,
    industry: <Pill className="w-4 h-4" />,
  };

  return (
    <motion.div
      className={`flex flex-col items-center p-3 border ${typeColors[source.type]}`}
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

// Collapsible question section
function CollapsibleQuestion({
  question,
  summary,
  children,
  defaultExpanded = false,
}: {
  question: string;
  summary: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
    >
      <button
        className="w-full flex items-start gap-3 text-left cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <Info className="w-6 h-6 mt-0.5 shrink-0 transition-colors" style={{ color: expanded ? chartColors.secondary : chartColors.muted }} />
        <div className="flex-1">
          <h4 className="text-xl font-bold text-[var(--text-primary)] font-serif group-hover:text-[var(--accent-orange)] transition-colors">
            {question}
          </h4>
          <p className="text-[var(--text-body)] mt-1">{summary}</p>
        </div>
        <div className="shrink-0 mt-1">
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pl-9">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Helper to get source info from bibliography
function getSourceInfo(sourceId: string) {
  const source = bibliography.find(s => s.id === sourceId);
  if (!source) return null;
  return {
    id: source.id,
    title: source.title,
    authors: source.authors,
    year: source.year,
    url: source.url || (source.doi ? `https://doi.org/${source.doi}` : null),
  };
}

// Redirected drugs list with expandable details
function RedirectedDrugsList({ drugs }: { drugs: typeof redirectedDrugs }) {
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);

  const statusColors = {
    none: 'text-[var(--danger)] bg-[var(--danger-light)]',
    phase_1: 'text-[#b38600] bg-[#E5AF19]/10',
    phase_2: 'text-[#486393] bg-[#486393]/10',
    phase_3: 'text-[var(--success)] bg-[var(--success-light)]',
    abandoned: 'text-[var(--text-muted)] bg-[var(--bg-secondary)]',
    preclinical: 'text-[#C3577F] bg-[#C3577F]/10',
  };

  const statusLabels = {
    none: 'No AD trial',
    phase_1: 'Phase 1',
    phase_2: 'Phase 2',
    phase_3: 'Phase 3',
    abandoned: 'Abandoned',
    preclinical: 'Preclinical',
  };

  const selected = drugs.find((d) => d.id === selectedDrug);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Drug list */}
      <div className={`transition-all duration-300 ${selected ? 'lg:w-1/2' : 'w-full'}`}>
        <div>
          {drugs.map((drug, index) => {
            const isSelected = selectedDrug === drug.id;
            return (
              <button
                key={drug.id}
                className={`w-full flex items-center justify-between p-4 text-left hover:bg-[var(--bg-secondary)] ${
                  index > 0 ? 'border-t border-[var(--border)]' : ''
                } ${isSelected ? 'bg-[var(--bg-secondary)]' : ''}`}
                onClick={() => setSelectedDrug(isSelected ? null : drug.id)}
              >
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold text-sm ${isSelected ? 'text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'}`}>{drug.name}</h4>
                  <p className="text-[var(--text-muted)] text-xs truncate">
                    <TextWithAbbreviations text={drug.mechanism} />
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 font-medium shrink-0 ml-3 ${statusColors[drug.adTrialStatus]}`}
                >
                  {statusLabels[drug.adTrialStatus]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Details panel - only shows when item selected */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-white border border-[var(--border)] p-6 h-full">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{selected.name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    <TextWithAbbreviations text={selected.mechanism} />
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 font-medium shrink-0 ${statusColors[selected.adTrialStatus]}`}
                >
                  {statusLabels[selected.adTrialStatus]}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    AD Rationale
                  </h4>
                  <p className="text-sm text-[var(--text-body)]">
                    <TextWithAbbreviations text={selected.adRationale} />
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[var(--accent-orange)] uppercase tracking-wide mb-1">
                    Why Not AD
                  </h4>
                  <p className="text-sm text-[var(--text-body)]">
                    <TextWithAbbreviations text={selected.whyNotAD} />
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
                    Current Indications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.currentIndications.map((ind) => (
                      <span
                        key={ind}
                        className="text-xs px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-body)]"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sources */}
                {selected.sourceIds && selected.sourceIds.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-[var(--border)]">
                    <div className="flex justify-end">
                      <div className="flex flex-wrap gap-2 justify-end">
                        {selected.sourceIds.map((sourceId) => {
                          const sourceInfo = getSourceInfo(sourceId);
                          if (!sourceInfo || !sourceInfo.url) return null;
                          return (
                            <a
                              key={sourceId}
                              href={sourceInfo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--accent-orange)] transition-colors"
                              title={`${sourceInfo.authors[0]} et al. (${sourceInfo.year})`}
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>{sourceInfo.authors[0]?.split(' ').pop()} {sourceInfo.year}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TrialBarriers() {
  const analysis = getFundingGapAnalysis();
  const phase3Cost = adTrialPhaseCosts.find((p) => p.phase === 'Phase 3')!.perDrugCost;

  return (
    <Section id={sectionConfig.id}>
      <Container>
        <SectionHeader
          title={sectionConfig.title}
          subtitle={sectionConfig.subtitle}
        />

        {/* Key statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-white border border-[var(--border)] p-4 text-center">
            <span className="text-2xl font-bold font-serif text-[var(--text-primary)]">$42.5B</span>
            <p className="text-xs text-[var(--text-muted)] mt-1">Private investment (1995-2021)</p>
          </div>
          <div className="bg-white border border-[var(--border)] p-4 text-center">
            <span className="text-2xl font-bold font-serif text-[var(--accent-orange)]">
              {adDevelopmentStatistics.overallFailureRate}%
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">Phase 2/3 failure rate</p>
          </div>
          <div className="bg-white border border-[var(--border)] p-4 text-center">
            <span className="text-2xl font-bold font-serif text-[var(--text-primary)]">
              {(adDevelopmentStatistics.totalParticipants / 1000).toFixed(0)}K
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">Trial participants enrolled</p>
          </div>
          <div className="bg-white border border-[var(--border)] p-4 text-center">
            <span className="text-2xl font-bold font-serif text-[var(--text-primary)]">
              {adDevelopmentStatistics.fdaApprovals}
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">FDA approvals (26 years)</p>
          </div>
        </motion.div>

        {/* How to read this */}
        <motion.p
          className="text-xs text-[var(--text-muted)] border-l-2 border-[var(--border)] pl-3 mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <strong>How to read:</strong> Charts show why AD trials are uniquely expensive. Hover for details.
          The <span className="text-[var(--danger)]">red dashed line</span> marks Phase 3 cost ($462M) for comparison.
          Expand &quot;Why not rely on NIH?&quot; below to see funding constraints.
        </motion.p>

        {/* Phase costs + Funding gap side by side */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 items-end">
          {/* Phase costs visualization - Vertical */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-serif">
              Cost Per Drug by Phase
            </h3>
            <p className="text-[var(--text-muted)] mb-6 text-sm">
              Phase 3 alone costs <span className="text-[var(--danger)] font-bold">$462M</span> per drug.
            </p>
            <div className="bg-white border border-[var(--border)] p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={adTrialPhaseCosts}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) => `$${(value / 1_000_000).toFixed(0)}M`}
                    stroke="var(--text-muted)"
                    fontSize={11}
                  />
                  <YAxis
                    type="category"
                    dataKey="phase"
                    width={70}
                    tick={{ fontSize: 12, fill: 'var(--text-body)' }}
                  />
                  <Tooltip
                    formatter={(value) => [`$${((value as number) / 1_000_000).toFixed(0)}M`, 'Cost']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid var(--border)',
                      borderRadius: '0',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="perDrugCost" >
                    {adTrialPhaseCosts.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 2 ? chartColors.accent : chartColors.tertiary}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-between text-xs text-[var(--text-muted)] mt-4 pt-4 border-t border-[var(--border)]">
                {adTrialPhaseCosts.map((phase) => (
                  <div key={phase.phase} className="text-center">
                    <div className="font-medium text-[var(--text-primary)]">{phase.phase}</div>
                    <div>{phase.typicalDuration}</div>
                    <div className="text-[var(--danger)]">{phase.failureRate}% fail</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Funding gap visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-serif">The Funding Gap</h3>
            <p className="text-[var(--text-muted)] mb-6 text-sm">
              Who funds AD research, and can they afford a Phase 3 trial?
            </p>
            <div className="bg-white border border-[var(--border)] p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={fundingComparisonData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(1)}B` : `${value}M`}`}
                    stroke="var(--text-muted)"
                    fontSize={11}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tick={{ fontSize: 11, fill: 'var(--text-body)' }}
                  />
                  <Tooltip
                    formatter={(value) => [`$${(value as number) >= 1000 ? `${((value as number) / 1000).toFixed(1)}B` : `${value}M`}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid var(--border)',
                      borderRadius: '0',
                      fontSize: '12px',
                    }}
                  />
                  <ReferenceLine
                    x={462}
                    stroke="var(--danger)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Bar dataKey="amount" >
                    {fundingComparisonData.map((entry, index) => {
                      const colors: Record<string, string> = {
                        blue: chartColors.tertiary,
                        emerald: chartColors.secondary,
                        cyan: chartColors.lightBlue,
                        amber: chartColors.warning,
                        purple: chartColors.pink,
                        red: chartColors.accent,
                      };
                      return <Cell key={`cell-${index}`} fill={colors[entry.color] || chartColors.muted} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-2 text-xs text-[var(--danger)] mt-4 pt-4 border-t border-[var(--border)]">
                <span className="w-6 h-0.5 border-t-2 border-dashed border-[var(--danger)]"></span>
                Phase 3 Cost ($462M)
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why not just rely on NIH? - Collapsible */}
        <CollapsibleQuestion
          question="Why not just rely on NIH?"
          summary={`The NIH has $${nihLimitations.totalBudget.toLocaleString()}M for AD research, but structural constraints prevent it from filling the Phase 3 gap.`}
        >
          {/* 2x2 Grid of NIH constraint cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* 1. Amyloid Concentration - Interactive Pie/Bar Chart */}
            <DataCard
              title="1. Amyloid Concentration"
              description="Nearly half of NIA's AD research budget is concentrated on amyloid-focused studies."
              callout={{
                text: <><strong>Only ~$170M/year</strong> goes to non-amyloid trials, yet a single Phase 3 costs $462M.</>,
                color: 'teal',
              }}
            >
              <InteractivePieBarChart data={niaSpendingByFocus} height={180} />
            </DataCard>

            {/* 2. Basic vs Applied - Stacked Bar Chart */}
            <DataCard
              title="2. Basic vs Applied Research"
              description="NIH prioritizes understanding disease over developing treatments."
              callout={{
                text: <>NIH: <strong>70%</strong> basic, <strong>15%</strong> applied • Pharma: <strong>10%</strong> basic, <strong>80%</strong> applied</>,
                color: 'teal',
              }}
            >
              <ResponsiveContainer width="100%" height={140}>
                <BarChart
                  data={basicVsAppliedFunding}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(1)}B`}
                    stroke="var(--text-muted)"
                    fontSize={10}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    tick={{ fontSize: 10, fill: 'var(--text-body)' }}
                  />
                  <Tooltip
                    formatter={(value) => [`$${value}M`, '']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid var(--border)',
                      borderRadius: '0',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="basic" stackId="a" fill={chartColors.muted} name="Basic Research" />
                  <Bar dataKey="applied" stackId="a" fill={chartColors.secondary} name="Applied (Trials)" />
                  <Bar dataKey="other" stackId="a" fill="#E6F1F6" name="Other" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 text-xs mt-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2" style={{ backgroundColor: chartColors.muted }} />
                  Basic
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2" style={{ backgroundColor: chartColors.secondary }} />
                  Applied
                </span>
              </div>
            </DataCard>

            {/* 3. Grant Cycles - Neurodegenerative Disease Comparison */}
            <DataCard
              title="3. Grant Cycles Don't Scale"
              description="AD trials dwarf other neurodegenerative diseases in both duration and cost."
              callout={{
                text: <><strong>{grantCycleComparison.gap.budgetMultiple}x gap:</strong> A single Phase 3 costs as much as {grantCycleComparison.gap.budgetMultiple} R01 grants.</>,
                color: 'warning',
              }}
            >
              <div className="space-y-4">
                {/* Duration comparison */}
                <div>
                  <h6 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5">
                    Trial Duration (months)
                  </h6>
                  <ResponsiveContainer width="100%" height={100}>
                    <BarChart
                      data={neuroDiseaseTrialComparison.durationComparison}
                      layout="vertical"
                      margin={{ top: 0, right: 35, left: 55, bottom: 0 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="disease"
                        tick={{ fontSize: 9, fill: 'var(--text-body)' }}
                        axisLine={false}
                        tickLine={false}
                        width={55}
                      />
                      <Tooltip
                        formatter={(value, name, props) => [`${value} months`, props.payload.disease]}
                        contentStyle={{ fontSize: '11px', borderRadius: '0' }}
                      />
                      <Bar dataKey="duration" barSize={12}>
                        {neuroDiseaseTrialComparison.durationComparison.map((entry, index) => (
                          <Cell key={`dur-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Budget comparison */}
                <div>
                  <h6 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5">
                    Phase 3 Budget ($M)
                  </h6>
                  <ResponsiveContainer width="100%" height={100}>
                    <BarChart
                      data={neuroDiseaseTrialComparison.budgetComparison}
                      layout="vertical"
                      margin={{ top: 0, right: 35, left: 55, bottom: 0 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="disease"
                        tick={{ fontSize: 9, fill: 'var(--text-body)' }}
                        axisLine={false}
                        tickLine={false}
                        width={55}
                      />
                      <Tooltip
                        formatter={(value, name, props) => [`$${value}M`, props.payload.disease]}
                        contentStyle={{ fontSize: '11px', borderRadius: '0' }}
                      />
                      <Bar dataKey="budget" barSize={12}>
                        {neuroDiseaseTrialComparison.budgetComparison.map((entry, index) => (
                          <Cell key={`bud-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </DataCard>

            {/* 4. Academic Infrastructure - Comparison Table */}
            <DataCard
              title="4. Academic Infrastructure Gaps"
              description="Universities lack capacity for large-scale clinical trials."
              callout={{
                text: <><strong>Result:</strong> Phase 3 is entirely dependent on pharma, which only funds patentable compounds.</>,
                color: 'pink',
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-1.5 px-2 text-[var(--text-muted)] font-medium">Capability</th>
                      <th className="text-left py-1.5 px-2 text-[var(--text-muted)] font-medium">Academic</th>
                      <th className="text-left py-1.5 px-2 text-[var(--text-muted)] font-medium">Pharma</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infrastructureComparison.slice(0, 4).map((row, idx) => (
                      <tr key={idx} className="border-b border-[var(--border)] last:border-0">
                        <td className="py-1.5 px-2 text-[var(--text-primary)] font-medium">{row.capability}</td>
                        <td className={`py-1.5 px-2 ${row.advantage === 'academic' ? 'text-[var(--success)]' : 'text-[var(--text-body)]'}`}>
                          {row.academic}
                        </td>
                        <td className={`py-1.5 px-2 ${row.advantage === 'pharma' ? 'text-[var(--success)]' : 'text-[var(--text-body)]'}`}>
                          {row.pharma}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DataCard>
          </div>
        </CollapsibleQuestion>

        {/* Why Companies Test Elsewhere First - Collapsible */}
        <CollapsibleQuestion
          question="Why do companies test elsewhere first?"
          summary="AD trials are dramatically more expensive, longer, and require more patients than almost any other disease."
        >

          {/* Comparison charts grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cost comparison */}
            <DataCard
              title="Phase 3 Cost by Disease"
              callout={{
                text: <>AD trials cost <span className="font-semibold">3-5x more</span> than most other diseases</>,
                color: 'danger',
              }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={diseaseComparisonChartData.costComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" tickFormatter={(v) => `$${v}M`} fontSize={11} />
                  <YAxis type="category" dataKey="disease" width={80} fontSize={11} />
                  <Tooltip
                    formatter={(value) => [`$${value}M`, 'Cost']}
                    contentStyle={{ fontSize: '12px', borderRadius: '0' }}
                  />
                  <Bar dataKey="cost" >
                    {diseaseComparisonChartData.costComparison.map((entry, index) => (
                      <Cell key={`cost-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </DataCard>

            {/* Duration comparison */}
            <DataCard
              title="Trial Duration by Disease"
              callout={{
                text: <>AD trials take <span className="font-semibold">2-3x longer</span> to complete</>,
                color: 'danger',
              }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={diseaseComparisonChartData.durationComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" tickFormatter={(v) => `${v}mo`} fontSize={11} />
                  <YAxis type="category" dataKey="disease" width={80} fontSize={11} />
                  <Tooltip
                    formatter={(value) => [`${value} months`, 'Duration']}
                    contentStyle={{ fontSize: '12px', borderRadius: '0' }}
                  />
                  <Bar dataKey="duration" >
                    {diseaseComparisonChartData.durationComparison.map((entry, index) => (
                      <Cell key={`duration-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </DataCard>

            {/* Patients comparison */}
            <DataCard
              title="Patients Required by Disease"
              callout={{
                text: <>AD trials need <span className="font-semibold">3-5x more patients</span> to detect cognitive changes</>,
                color: 'danger',
              }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={diseaseComparisonChartData.patientsComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" tickFormatter={(v) => v.toLocaleString()} fontSize={11} />
                  <YAxis type="category" dataKey="disease" width={80} fontSize={11} />
                  <Tooltip
                    formatter={(value) => [value?.toLocaleString(), 'Patients']}
                    contentStyle={{ fontSize: '12px', borderRadius: '0' }}
                  />
                  <Bar dataKey="patients" >
                    {diseaseComparisonChartData.patientsComparison.map((entry, index) => (
                      <Cell key={`patients-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </DataCard>

            {/* Failure rate comparison */}
            <DataCard
              title="Clinical Trial Failure Rate"
              callout={{
                text: <>AD has the <span className="font-semibold">highest failure rate</span> of any therapeutic area</>,
                color: 'danger',
              }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={diseaseComparisonChartData.failureRateComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} fontSize={11} />
                  <YAxis type="category" dataKey="disease" width={80} fontSize={11} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Failure Rate']}
                    contentStyle={{ fontSize: '12px', borderRadius: '0' }}
                  />
                  <Bar dataKey="rate" >
                    {diseaseComparisonChartData.failureRateComparison.map((entry, index) => (
                      <Cell key={`rate-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </DataCard>
          </div>

          {/* Summary insight */}
          <div className="mt-6 p-4 bg-[var(--accent-orange-light)] border border-[var(--accent-orange)]">
            <p className="text-[var(--accent-orange)] text-sm">
              <strong>The result:</strong> Companies test promising drugs in diabetes, Parkinson&apos;s, or cancer first, where trials are faster, cheaper, and more likely to succeed. By the time they might consider AD, the patent clock has often run out.
            </p>
          </div>
        </CollapsibleQuestion>

        {/* Redirected drugs - Collapsible */}
        <CollapsibleQuestion
          question="What drugs might help AD but were tested elsewhere?"
          summary="These drugs have plausible mechanisms for AD but were tested in faster, cheaper indications first."
        >
          <RedirectedDrugsList drugs={redirectedDrugs} />
        </CollapsibleQuestion>
      </Container>
    </Section>
  );
}
