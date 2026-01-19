'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, BookOpen, Eye, EyeOff, Clock, Quote } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent } from '@/components/ui';
import { getSection, alzheimerObservations, inversionComparisons } from '@/data';
import { getCitation } from '@/data/bibliography';

const sectionConfig = getSection('forgotten-observations')!;

// ============================================================================
// OBSERVATIONS TABLE
// ============================================================================

function ObservationsTable() {
  const maxPaperCount = Math.max(...alzheimerObservations.map((o) => o.paperCount));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-[var(--border)]">
            <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">
              Alzheimer&apos;s Description (1907/1910)
            </th>
            <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Modern Term</th>
            <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Papers</th>
            <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {alzheimerObservations.map((obs, index) => {
            const barWidth = (obs.paperCount / maxPaperCount) * 100;
            const isIgnored = obs.status === 'ignored';

            return (
              <motion.tr
                key={obs.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className={`border-b border-[var(--border)] ${
                  isIgnored ? 'bg-[var(--danger-light)]' : ''
                }`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-start gap-2">
                    {isIgnored ? (
                      <EyeOff className="w-4 h-4 text-[var(--danger)] mt-0.5 flex-shrink-0" />
                    ) : (
                      <Eye className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                    )}
                    <span className="italic text-[var(--text-body)]">
                      &ldquo;{obs.originalDescription}&rdquo;
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-[var(--text-primary)]">{obs.modernTerm}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-4 bg-[var(--bg-secondary)] overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isIgnored ? 'bg-[var(--danger)]' : 'bg-[var(--chart-primary)]'
                        }`}
                        style={{ width: `${Math.max(barWidth, 1)}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-mono ${
                        isIgnored ? 'text-[var(--danger)]' : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {obs.paperCount.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {isIgnored ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--danger)] text-white text-xs font-medium">
                      <AlertTriangle className="w-3 h-3" />
                      Ignored {obs.gapYears} years
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--chart-primary)] text-white text-xs font-medium">
                      Heavily Studied
                    </span>
                  )}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// GAP TIMELINE VISUALIZATION
// ============================================================================

function GapTimeline() {
  const ignoredObs = alzheimerObservations.filter((o) => o.status === 'ignored');
  const startYear = 1907;
  const endYear = 2025;
  const totalSpan = endYear - startYear;

  return (
    <div className="space-y-6">
      <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
        The Century-Long Gap
      </h3>
      <div className="relative">
        {/* Timeline axis */}
        <div className="h-2 bg-[var(--bg-secondary)] relative">
          {/* Year markers */}
          {[1907, 1950, 2000, 2025].map((year) => {
            const position = ((year - startYear) / totalSpan) * 100;
            return (
              <div
                key={year}
                className="absolute top-full pt-1 text-xs text-[var(--text-muted)]"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
              >
                {year}
              </div>
            );
          })}
        </div>

        {/* Observation timelines */}
        {ignoredObs.map((obs, index) => {
          const startPos = ((obs.yearObserved - startYear) / totalSpan) * 100;
          const rediscoverPos = obs.yearRediscovered
            ? ((obs.yearRediscovered - startYear) / totalSpan) * 100
            : 100;

          return (
            <motion.div
              key={obs.id}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 relative"
              style={{ transformOrigin: 'left' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {obs.modernTerm}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  ({obs.gapYears} years ignored)
                </span>
              </div>
              <div className="relative h-6">
                {/* Gap period (red) */}
                <div
                  className="absolute h-full bg-[var(--danger)] opacity-30"
                  style={{
                    left: `${startPos}%`,
                    width: `${rediscoverPos - startPos}%`,
                  }}
                />
                {/* Observation point */}
                <div
                  className="absolute w-3 h-3 bg-[var(--chart-primary)] rounded-full top-1/2 -translate-y-1/2 border-2 border-white shadow"
                  style={{ left: `${startPos}%`, transform: 'translate(-50%, -50%)' }}
                  title={`Observed: ${obs.yearObserved}`}
                />
                {/* Rediscovery point */}
                {obs.yearRediscovered && (
                  <div
                    className="absolute w-3 h-3 bg-[var(--success)] rounded-full top-1/2 -translate-y-1/2 border-2 border-white shadow"
                    style={{ left: `${rediscoverPos}%`, transform: 'translate(-50%, -50%)' }}
                    title={`Rediscovered: ${obs.yearRediscovered}`}
                  />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Legend */}
        <div className="mt-8 flex items-center gap-6 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[var(--chart-primary)] rounded-full" />
            <span>First observed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[var(--success)] rounded-full" />
            <span>Rediscovered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 bg-[var(--danger)] opacity-30" />
            <span>Ignored period</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INVERSION BAR CHART
// ============================================================================

function InversionChart() {
  return (
    <div className="space-y-6">
      <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
        The Research Investment Inversion
      </h3>
      <p className="text-sm text-[var(--text-muted)] mb-4">
        Papers published on downstream pathology vs. upstream mechanisms (PubMed)
      </p>

      <div className="space-y-6">
        {inversionComparisons.map((comp, index) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center text-sm">
              <span className="text-[var(--text-muted)]">{comp.description}</span>
              <span className="font-mono font-bold text-[var(--accent-orange)]">{comp.ratio}</span>
            </div>

            {/* Studied (blue) */}
            <div className="flex items-center gap-2">
              <div className="w-24 text-xs text-right text-[var(--chart-primary)] truncate">
                {comp.studiedTopic}
              </div>
              <div className="flex-1 h-6 bg-[var(--bg-secondary)] relative">
                <motion.div
                  className="h-full bg-[var(--chart-primary)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-mono">
                  {comp.studiedCount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Ignored (orange) */}
            <div className="flex items-center gap-2">
              <div className="w-24 text-xs text-right text-[var(--accent-orange)] truncate">
                {comp.ignoredTopic}
              </div>
              <div className="flex-1 h-6 bg-[var(--bg-secondary)] relative">
                <motion.div
                  className="h-full bg-[var(--accent-orange)]"
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(comp.ignoredCount / comp.studiedCount) * 100}%`,
                  }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  style={{ minWidth: '2px' }}
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[var(--text-body)] font-mono">
                  {comp.ignoredCount.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// QUOTE BLOCK
// ============================================================================

function QuoteBlock({
  citationId,
  highlight,
}: {
  citationId: string;
  highlight?: string;
}) {
  const citation = getCitation(citationId);
  if (!citation) return null;

  // Find which source contains this citation for attribution
  const source = citationId.split('-').slice(0, -1).join('-'); // e.g., "marschallinger-2020" from "marschallinger-2020-ldam"

  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative border-l-4 border-[var(--accent-orange)] bg-[var(--bg-card)] p-6 my-6"
    >
      <Quote className="absolute top-4 right-4 w-8 h-8 text-[var(--accent-orange)] opacity-20" />
      <p className="text-[var(--text-body)] leading-relaxed italic pr-10">
        {highlight ? (
          <>
            {citation.quote.split(highlight).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <mark className="bg-[var(--accent-orange-light)] px-0.5">{highlight}</mark>
                )}
              </span>
            ))}
          </>
        ) : (
          citation.quote
        )}
      </p>
      <footer className="mt-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <BookOpen className="w-4 h-4" />
        <span>{source.replace(/-/g, ' ').replace(/(\d{4})/, '($1)')}</span>
      </footer>
    </motion.blockquote>
  );
}

// ============================================================================
// UPSTREAM/DOWNSTREAM DIAGRAM
// ============================================================================

function CascadeDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-[var(--bg-card)] border border-[var(--border)] p-6 overflow-x-auto"
    >
      <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] mb-6">
        The Upstream/Downstream Pattern
      </h3>

      <div className="min-w-[600px]">
        {/* Header row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-[var(--danger)] text-white text-xs font-medium">
              IGNORED (Upstream)
            </span>
          </div>
          <div></div>
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-[var(--chart-primary)] text-white text-xs font-medium">
              STUDIED (Downstream)
            </span>
          </div>
        </div>

        {/* LDAM pathway */}
        <div className="grid grid-cols-3 gap-4 items-center mb-6">
          <div className="bg-[var(--danger-light)] border border-[var(--danger)] p-3">
            <p className="font-medium text-[var(--text-primary)] text-sm">LDAM</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Lipid-laden microglia with impaired phagocytosis
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-muted)] ml-2">impaired clearance</span>
            <ArrowRight className="w-6 h-6 text-[var(--text-muted)] ml-2" />
          </div>
          <div className="bg-blue-50 border border-[var(--chart-primary)] p-3">
            <p className="font-medium text-[var(--text-primary)] text-sm">Amyloid Plaques</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Aβ accumulation in extracellular space
            </p>
          </div>
        </div>

        {/* Clasmatodendrosis pathway */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="bg-[var(--danger-light)] border border-[var(--danger)] p-3">
            <p className="font-medium text-[var(--text-primary)] text-sm">Clasmatodendrosis</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Astrocyte endfoot damage → AQP4 depolarization
            </p>
            <p className="text-xs text-[var(--accent-orange)] mt-1">↓ Glymphatic failure</p>
          </div>
          <div className="flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-muted)] ml-2">impaired waste removal</span>
            <ArrowRight className="w-6 h-6 text-[var(--text-muted)] ml-2" />
          </div>
          <div className="bg-blue-50 border border-[var(--chart-primary)] p-3">
            <p className="font-medium text-[var(--text-primary)] text-sm">Tau Tangles</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Hyperphosphorylated tau in neurons
            </p>
          </div>
        </div>

        {/* Key insight */}
        <div className="mt-6 pt-4 border-t border-[var(--border)]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[var(--accent-orange)] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--text-body)]">
              <strong>Both ignored observations involve glial dysfunction upstream of the studied pathology.</strong>{' '}
              Targeting plaques and tangles without addressing their glial causes is like mopping the
              floor while the faucet runs.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ForgottenObservations() {
  return (
    <Section id={sectionConfig.id} className="bg-[var(--bg-primary)]">
      <Container>
        <SectionHeader title={sectionConfig.title} subtitle={sectionConfig.subtitle} />

        {/* Opening narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-lg text-[var(--text-body)] leading-relaxed">
            In 1907, Alois Alzheimer described{' '}
            <span className="font-serif font-bold">four</span> pathological features in his index
            patient. Two became the focus of{' '}
            <span className="font-serif font-bold text-[var(--chart-primary)]">100,000+ papers</span>{' '}
            each. The other two received{' '}
            <span className="font-serif font-bold text-[var(--danger)]">fewer than 200 combined</span>
            —and weren&apos;t seriously studied until the 2010s and 2020s.
          </p>
        </motion.div>

        {/* Observations table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="default" hover={false}>
            <CardContent className="p-0">
              <ObservationsTable />
            </CardContent>
          </Card>
        </motion.div>

        {/* Gap timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card variant="default" hover={false}>
            <CardContent className="p-6">
              <GapTimeline />
            </CardContent>
          </Card>
        </motion.div>

        {/* Quote from Marschallinger */}
        <QuoteBlock
          citationId="marschallinger-2020-ldam"
          highlight="lipid deposits in microglia had mostly been ignored for almost a century"
        />

        {/* Inversion chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card variant="default" hover={false}>
            <CardContent className="p-6">
              <InversionChart />
            </CardContent>
          </Card>
        </motion.div>

        {/* Quote from Hulse */}
        <QuoteBlock
          citationId="hulse-2001-clasmatodendrosis"
          highlight="largely lost in the modern literature"
        />

        {/* Cascade diagram */}
        <div className="mt-12">
          <CascadeDiagram />
        </div>

        {/* Closing card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card variant="highlighted" hover={false}>
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-orange-light)] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[var(--accent-orange)]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-[var(--text-primary)] mb-3">
                    The Pattern Alzheimer Saw
                  </h4>
                  <p className="text-[var(--text-body)] leading-relaxed">
                    The field systematically ignored glial pathology—the{' '}
                    <strong>upstream mechanisms</strong> that may drive the{' '}
                    <strong>downstream plaques and tangles</strong> everyone was studying. This
                    directly explains why amyloid-targeting drugs have failed: they attacked the
                    symptom, not the cause.
                  </p>
                  <p className="text-[var(--accent-orange)] mt-4 font-medium">
                    Alzheimer described the whole picture. We chose to see only half of it.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
}
