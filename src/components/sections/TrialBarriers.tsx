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
  Info,
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
import { Container, Section, SectionHeader, Card, CardContent, TextWithAbbreviations } from '@/components/ui';
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
          <p className="text-[var(--text-muted)] text-sm">
            <TextWithAbbreviations text={drug.mechanism} />
          </p>
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
              <TextWithAbbreviations text={drug.adRationale} />
            </p>
            <p className="text-sm text-[var(--text-body)] mb-2">
              <strong className="text-[var(--accent-orange)]">Why not AD:</strong>{' '}
              <TextWithAbbreviations text={drug.whyNotAD} />
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

        {/* Funding gap visualization with bar chart */}
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

          {/* Bar chart visualization */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6 mb-6">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={fundingComparisonData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  type="number"
                  tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(1)}B` : `${value}M`}`}
                  stroke="var(--text-muted)"
                  fontSize={12}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={160}
                  tick={{ fontSize: 12, fill: 'var(--text-body)' }}
                />
                <Tooltip
                  formatter={(value) => [`$${(value as number) >= 1000 ? `${((value as number) / 1000).toFixed(1)}B` : `${value}M`}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                <ReferenceLine
                  x={462}
                  stroke="var(--danger)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{
                    value: 'Phase 3 Cost ($462M)',
                    position: 'top',
                    fill: 'var(--danger)',
                    fontSize: 11,
                  }}
                />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {fundingComparisonData.map((entry, index) => {
                    const colors: Record<string, string> = {
                      blue: '#3b82f6',
                      emerald: '#10b981',
                      cyan: '#06b6d4',
                      amber: '#f59e0b',
                      purple: '#8b5cf6',
                      red: '#ef4444',
                    };
                    return <Cell key={`cell-${index}`} fill={colors[entry.color] || '#6b7280'} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#3b82f6]"></span>
                Pharma
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#10b981]"></span>
                NIH Total
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#06b6d4]"></span>
                NIH Trials
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#f59e0b]"></span>
                Non-Amyloid
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#8b5cf6]"></span>
                Nonprofits
              </span>
              <span className="flex items-center gap-1.5 text-[var(--danger)]">
                <span className="w-8 h-0.5 border-t-2 border-dashed border-[var(--danger)]"></span>
                Phase 3 Cost
              </span>
            </div>
          </div>

          {/* Why not just rely on NIH? - Expanded with visualizations */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-3 mb-6">
              <Info className="w-6 h-6 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-[var(--text-primary)] font-serif">
                  &quot;Why not just rely on NIH?&quot;
                </h4>
                <p className="text-[var(--text-body)] mt-1">
                  The NIH has ${nihLimitations.totalBudget.toLocaleString()}M for AD research—but structural constraints prevent it from filling the Phase 3 gap.
                </p>
              </div>
            </div>

            {/* 1. Amyloid Concentration - Pie Chart */}
            <Card variant="default" hover={false} className="mb-4">
              <CardContent className="p-6">
                <h5 className="font-semibold text-[var(--text-primary)] mb-1">1. Amyloid Concentration</h5>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Nearly half of NIA&apos;s AD research budget is concentrated on amyloid-focused studies, leaving alternative hypotheses underfunded.
                </p>
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="w-full lg:w-1/2">
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={niaSpendingByFocus}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="amount"
                          nameKey="name"
                          label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {niaSpendingByFocus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`$${value}M`, 'Budget']}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {niaSpendingByFocus.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-sm shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-[var(--text-body)]">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>30%</strong> of the budget goes to amyloid-focused research alone—more than vascular, metabolic, and neuroinflammation research combined.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Basic vs Applied - Stacked Bar Chart */}
            <Card variant="default" hover={false} className="mb-4">
              <CardContent className="p-6">
                <h5 className="font-semibold text-[var(--text-primary)] mb-1">2. Basic vs Applied Research</h5>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  NIH&apos;s mandate prioritizes understanding disease (basic research) over developing treatments (applied research like Phase 3 trials).
                </p>
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="w-full lg:w-2/3">
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart
                        data={basicVsAppliedFunding}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis
                          type="number"
                          tickFormatter={(value) => `$${(value / 1000).toFixed(1)}B`}
                          stroke="var(--text-muted)"
                          fontSize={11}
                        />
                        <YAxis
                          type="category"
                          dataKey="category"
                          tick={{ fontSize: 12, fill: 'var(--text-body)' }}
                        />
                        <Tooltip
                          formatter={(value) => [`$${value}M`, '']}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                        />
                        <Bar dataKey="basic" stackId="a" fill="#94a3b8" name="Basic Research" />
                        <Bar dataKey="applied" stackId="a" fill="#10b981" name="Applied (Trials)" />
                        <Bar dataKey="other" stackId="a" fill="#e2e8f0" name="Other" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full lg:w-1/3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-[#94a3b8]" />
                        <span>Basic Research</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-[#10b981]" />
                        <span>Applied (Clinical Trials)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-[#e2e8f0]" />
                        <span>Other (Care, Infrastructure)</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                      <p className="text-sm text-emerald-800">
                        NIH: <strong>70%</strong> basic, <strong>15%</strong> applied<br />
                        Pharma: <strong>10%</strong> basic, <strong>80%</strong> applied
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Grant Cycles - Visual Comparison */}
            <Card variant="default" hover={false} className="mb-4">
              <CardContent className="p-6">
                <h5 className="font-semibold text-[var(--text-primary)] mb-1">3. Grant Cycles Don&apos;t Scale</h5>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  NIH grants are structured for academic timelines, not commercial drug development—making large, sustained Phase 3 investments structurally difficult.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                    <h6 className="font-medium text-[var(--text-primary)] text-sm mb-3">
                      {grantCycleComparison.nihGrant.label}
                    </h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Duration:</span>
                        <span className="text-[var(--text-primary)]">{grantCycleComparison.nihGrant.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Total Budget:</span>
                        <span className="text-[var(--text-primary)] font-mono">${grantCycleComparison.nihGrant.totalBudget}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Annual:</span>
                        <span className="text-[var(--text-primary)] font-mono">${grantCycleComparison.nihGrant.annualBudget}M/yr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Renewal:</span>
                        <span className="text-amber-600 text-xs">{grantCycleComparison.nihGrant.renewalUncertainty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border-2 border-[var(--danger)] bg-[var(--danger-light)]">
                    <h6 className="font-medium text-[var(--text-primary)] text-sm mb-3">
                      {grantCycleComparison.phase3Trial.label}
                    </h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Duration:</span>
                        <span className="text-[var(--text-primary)]">{grantCycleComparison.phase3Trial.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Total Budget:</span>
                        <span className="text-[var(--danger)] font-mono font-bold">${grantCycleComparison.phase3Trial.totalBudget}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Annual:</span>
                        <span className="text-[var(--text-primary)] font-mono">~${grantCycleComparison.phase3Trial.annualBudget}M/yr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Commitment:</span>
                        <span className="text-[var(--danger)] text-xs">{grantCycleComparison.phase3Trial.commitmentRequired}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>{grantCycleComparison.gap.budgetMultiple}x gap:</strong> {grantCycleComparison.gap.insight}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 4. Academic Infrastructure - Comparison Table */}
            <Card variant="default" hover={false} className="mb-4">
              <CardContent className="p-6">
                <h5 className="font-semibold text-[var(--text-primary)] mb-1">4. Academic Infrastructure Gaps</h5>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Universities excel at discovery research but lack the operational capacity for large-scale clinical trials that pharmaceutical companies have built over decades.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Capability</th>
                        <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Academic</th>
                        <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Pharma</th>
                      </tr>
                    </thead>
                    <tbody>
                      {infrastructureComparison.map((row, idx) => (
                        <tr key={idx} className="border-b border-[var(--border)] last:border-0">
                          <td className="py-2 px-3 text-[var(--text-primary)] font-medium">{row.capability}</td>
                          <td className={`py-2 px-3 ${row.advantage === 'academic' ? 'text-[var(--success)] bg-[var(--success-light)]' : 'text-[var(--text-body)]'}`}>
                            {row.academic}
                          </td>
                          <td className={`py-2 px-3 ${row.advantage === 'pharma' ? 'text-[var(--success)] bg-[var(--success-light)]' : 'text-[var(--text-body)]'}`}>
                            {row.pharma}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <p className="text-sm text-purple-800">
                    <strong>Key insight:</strong> Academia&apos;s strength is discovery. Pharma&apos;s strength is execution. Phase 3 trials require execution at scale—something the academic system was never designed to provide.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key insight */}
          <motion.div
            className="p-6 rounded-lg bg-[var(--danger-light)] border border-[var(--danger)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-[var(--danger)] text-lg">
              <strong>The math doesn&apos;t work:</strong> NIH only allocates ~${nihLimitations.nonAmyloidTrialBudget}M/year for non-amyloid trials.
              A single Phase 3 costs ${nihLimitations.phase3Cost}M. Even dedicating their entire non-amyloid trial budget would only cover{' '}
              <span className="font-bold">{nihLimitations.mathDoesntWork.percentCovered}%</span> of one trial.
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
