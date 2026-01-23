'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Expand,
  Minimize2,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Beaker,
  Users,
  Clock,
  Target,
  Dna,
} from 'lucide-react';
import {
  Container,
  Section,
  SectionHeader,
  Card,
  CardContent,
} from '@/components/ui';
import {
  animalModels,
  pathologyFeatureLabels,
  organismTypeLabels,
  translationalInsights,
  getModelsByOrganism,
  getPathologyStatus,
} from '@/data/translationalFailures';
import { getSection } from '@/data';
import type { AnimalModel, PathologyFeature, PathologyPresence } from '@/types';

const sectionConfig = getSection('translational-failures')!;

// ============================================================================
// CONSTANTS
// ============================================================================

const COLLAPSED_HEIGHT = 400;

const PATHOLOGY_COLUMNS: PathologyFeature[] = [
  'amyloid_plaques',
  'tau_tangles',
  'neuronal_loss',
  'neuroinflammation',
  'cognitive_decline',
  'natural_aging',
];

const ORGANISM_FILTERS: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'transgenic_mouse', label: 'Tg Mice' },
  { id: 'knockin_mouse', label: 'KI Mice' },
  { id: 'rat', label: 'Rats' },
  { id: 'dog', label: 'Dogs' },
  { id: 'degu', label: 'Degus' },
  { id: 'non_human_primate', label: 'Primates' },
  { id: 'simple_organism', label: 'Simple' },
];

// ============================================================================
// BADGE COMPONENT
// ============================================================================

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

function Badge({
  children,
  variant = 'default'
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-[var(--bg-secondary)] text-[var(--text-body)] border-[var(--border)]',
    primary: 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)] border-[var(--accent-orange)]',
    success: 'bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]',
    warning: 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)] border-[var(--accent-orange)]',
    danger: 'bg-[var(--danger-light)] text-[var(--danger)] border-[var(--danger)]',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium border ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

// ============================================================================
// COMPACT PATHOLOGY INDICATOR
// ============================================================================

function PathologyCell({ status }: { status: PathologyPresence | undefined }) {
  if (!status) {
    return <span className="text-[var(--text-muted)]">—</span>;
  }

  const { present, humanRelevance, notes } = status;
  let symbol: string;
  let colorClass: string;
  let title: string;

  if (present === true) {
    if (humanRelevance === 'high') {
      symbol = '✓';
      colorClass = 'text-[var(--success)] font-bold';
      title = 'Present (high human relevance)';
    } else if (humanRelevance === 'debated') {
      symbol = '?';
      colorClass = 'text-[var(--text-muted)]';
      title = 'Present but debated relevance';
    } else {
      symbol = '✓';
      colorClass = 'text-[var(--accent-orange)]';
      title = 'Present (moderate relevance)';
    }
  } else if (present === 'partial') {
    symbol = '◐';
    colorClass = 'text-[var(--accent-orange)]';
    title = 'Partial';
  } else {
    symbol = '✗';
    colorClass = 'text-[var(--danger)]';
    title = 'Absent';
  }

  if (notes) title += `: ${notes}`;

  return (
    <span className={`${colorClass} cursor-help`} title={title}>
      {symbol}
    </span>
  );
}

// ============================================================================
// EXPANDED ROW DETAILS
// ============================================================================

function ExpandedDetails({ model }: { model: AnimalModel }) {
  return (
    <div className="p-4 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Genetic Basis</p>
          <p className="text-[var(--text-body)]">{model.geneticBasis}</p>
        </div>
        <div>
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Primary Use</p>
          <p className="text-[var(--text-body)]">{model.primaryUseCase}</p>
        </div>
        <div>
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Key Points</p>
          <div className="flex flex-wrap gap-1">
            <span className="text-[var(--success)] text-xs">+{model.strengths.length} strengths</span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--danger)] text-xs">-{model.limitations.length} limitations</span>
          </div>
        </div>
      </div>

      {model.failedTranslations.length > 0 && (
        <div className="mt-4">
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-2">Failed Translations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {model.failedTranslations.map((ft, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] p-2 text-xs">
                <div className="font-medium text-[var(--text-primary)]">
                  {ft.drugName} <span className="text-[var(--text-muted)]">({ft.year})</span>
                </div>
                <div className="mt-1 text-[var(--text-muted)]">
                  <span className="text-[var(--success)]">Model:</span> {ft.modelResult.slice(0, 50)}...
                </div>
                <div className="text-[var(--text-muted)]">
                  <span className="text-[var(--danger)]">Human:</span> {ft.humanResult.slice(0, 50)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {model.keyInsight && (
        <div className="mt-4 bg-[var(--accent-orange-light)] border-l-4 border-[var(--accent-orange)] p-3">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-[var(--accent-orange)] flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-bold text-[var(--text-primary)]">{model.keyInsight.title}:</span>{' '}
              <span className="text-[var(--text-body)]">{model.keyInsight.description}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function TranslationalFailures() {
  const [filterOrganism, setFilterOrganism] = useState('all');
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  const filteredModels = getModelsByOrganism(filterOrganism);
  const totalFailures = animalModels.reduce((sum, m) => sum + m.failedTranslations.length, 0);

  const toggleModel = (modelId: string) => {
    setExpandedModel(expandedModel === modelId ? null : modelId);
  };

  return (
    <Section id={sectionConfig.id} className="bg-[var(--bg-secondary)]">
      <Container>
        <SectionHeader
          title={sectionConfig.title}
          subtitle={sectionConfig.subtitle}
        />

        {/* Narrative Lead-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-lg text-[var(--text-body)] leading-relaxed">
            Over <span className="font-serif font-bold text-[var(--accent-orange)]">400 drugs</span> have
            shown promise in Alzheimer&apos;s animal models. Yet more than{' '}
            <span className="font-serif font-bold text-[var(--danger)]">99%</span> failed in human trials.
            The question isn&apos;t whether our models are wrong—it&apos;s{' '}
            <em>how</em> they&apos;re wrong, and what that reveals about the disease itself.
          </p>
        </motion.div>

        {/* How to read this + Filter + Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 space-y-3"
        >
          {/* How to read */}
          <p className="text-xs text-[var(--text-muted)] border-l-2 border-[var(--border)] pl-3">
            <strong>How to read:</strong> Each row is an animal model. Columns show which AD features it replicates.
            <span className="text-[var(--success)] font-bold ml-1">✓</span> = human-relevant,
            <span className="text-[var(--accent-orange)] ml-1">◐</span> = partial,
            <span className="text-[var(--danger)] ml-1">✗</span> = absent.
            Click any row to see failed drug translations.
          </p>

          {/* Filter + Legend Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1">
              {ORGANISM_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setFilterOrganism(filter.id);
                    setExpandedModel(null);
                  }}
                  className={`px-3 py-1 text-xs transition-colors ${
                    filterOrganism === filter.id
                      ? 'bg-[var(--accent-orange)] text-white'
                      : 'bg-[var(--bg-card)] text-[var(--text-body)] hover:bg-[var(--bg-primary)] border border-[var(--border)]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
              <span><span className="text-[var(--success)] font-bold">✓</span> High</span>
              <span><span className="text-[var(--accent-orange)]">✓</span> Moderate</span>
              <span><span className="text-[var(--accent-orange)]">◐</span> Partial</span>
              <span><span className="text-[var(--danger)]">✗</span> Absent</span>
            </div>
          </div>
        </motion.div>

        {/* Collapsible Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="default" hover={false}>
            <CardContent className="p-0">
              {/* Table container with collapse logic */}
              <div
                className={`relative transition-all duration-500 ${
                  !isTableExpanded ? 'overflow-hidden' : ''
                }`}
                style={!isTableExpanded ? { maxHeight: COLLAPSED_HEIGHT } : undefined}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] bg-[var(--bg-primary)]">
                        <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Model</th>
                        <th className="text-left py-3 px-2 text-[var(--text-muted)] font-medium">Species</th>
                        {PATHOLOGY_COLUMNS.map((feature) => (
                          <th
                            key={feature}
                            className="text-center py-3 px-2 text-[var(--text-muted)] font-medium"
                            title={pathologyFeatureLabels[feature].label}
                          >
                            {pathologyFeatureLabels[feature].shortLabel}
                          </th>
                        ))}
                        <th className="text-center py-3 px-2 text-[var(--text-muted)] font-medium">Failures</th>
                        <th className="py-3 px-2 w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredModels.map((model) => {
                        const orgInfo = organismTypeLabels[model.organismType];
                        const isExpanded = expandedModel === model.id;

                        return (
                          <AnimatePresence key={model.id} mode="wait">
                            <motion.tr
                              className={`border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] cursor-pointer transition-colors ${
                                isExpanded ? 'bg-[var(--bg-secondary)]' : ''
                              }`}
                              onClick={() => toggleModel(model.id)}
                            >
                              <td className="py-2 px-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-base">{orgInfo?.icon || '🧬'}</span>
                                  <div>
                                    <div className="font-medium text-[var(--text-primary)]">{model.name}</div>
                                    <div className="text-xs text-[var(--text-muted)]">{model.commonName}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-2 px-2 text-[var(--text-body)]">{model.species}</td>
                              {PATHOLOGY_COLUMNS.map((feature) => (
                                <td key={feature} className="py-2 px-2 text-center">
                                  <PathologyCell status={getPathologyStatus(model, feature)} />
                                </td>
                              ))}
                              <td className="py-2 px-2 text-center">
                                {model.failedTranslations.length > 0 ? (
                                  <Badge variant="danger">{model.failedTranslations.length}</Badge>
                                ) : (
                                  <span className="text-[var(--text-muted)]">—</span>
                                )}
                              </td>
                              <td className="py-2 px-2 text-center">
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-[var(--text-muted)] inline-block" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-[var(--text-muted)] inline-block" />
                                )}
                              </td>
                            </motion.tr>

                            {isExpanded && (
                              <motion.tr
                                key={`${model.id}-expanded`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <td colSpan={PATHOLOGY_COLUMNS.length + 4} className="p-0">
                                  <ExpandedDetails model={model} />
                                </td>
                              </motion.tr>
                            )}
                          </AnimatePresence>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Gradient fade overlay when collapsed */}
                {!isTableExpanded && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, transparent, var(--bg-card))',
                    }}
                  />
                )}
              </div>

              {/* Expand/Collapse button */}
              <div className="flex justify-center py-4 border-t border-[var(--border)] bg-[var(--bg-card)]">
                <button
                  onClick={() => setIsTableExpanded(!isTableExpanded)}
                  className="flex items-center gap-2 px-5 py-2 bg-white border border-[var(--border)]
                    shadow-sm hover:shadow-md hover:border-[var(--accent-orange)]
                    text-[var(--text-body)] hover:text-[var(--accent-orange)] transition-all duration-200 text-sm"
                >
                  {isTableExpanded ? (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      <span>Collapse Table</span>
                    </>
                  ) : (
                    <>
                      <Expand className="w-4 h-4" />
                      <span>Expand All {animalModels.length} Models</span>
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ================================================================== */}
        {/* TRANSLATIONAL INSIGHTS - Storytelling Flow */}
        {/* ================================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          {/* Section intro */}
          <div className="max-w-3xl mb-12">
            <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-4">
              Why Do Models Fail to Predict Human Outcomes?
            </h3>
            <p className="text-[var(--text-body)] leading-relaxed">
              The {totalFailures} documented translation failures in our database reveal recurring patterns.
              Understanding these patterns isn&apos;t just academic—it&apos;s essential for designing
              better trials and choosing the right therapeutic targets.
            </p>
          </div>

          {/* Core insight cards - 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Card 1: Speed Mismatch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--bg-card)] border border-[var(--border)] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-orange-light)] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[var(--accent-orange)]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2">
                    Speed Mismatch
                  </h4>
                  <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                    Mouse models develop pathology in <strong>months</strong> via gene overexpression.
                    Human AD unfolds over <strong>decades</strong>. Drugs that clear rapid artificial
                    buildup may not affect slow natural accumulation.
                  </p>
                  <p className="text-sm text-[var(--accent-orange)]">
                    Fast-acting drugs succeed in fast models, fail in slow disease.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Missing Tau */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--danger-light)] flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[var(--danger)]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2">
                    Missing Tau
                  </h4>
                  <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                    Humans get both amyloid plaques and tau tangles. Most mouse models develop only one.
                    The few models with both use mutant tau, not the wild-type form found in sporadic AD.
                  </p>
                  <p className="text-sm text-[var(--danger)]">
                    Combination therapies cannot be properly tested.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Different Immune Systems */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--success-light)] flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[var(--success)]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2">
                    Different Immune Systems
                  </h4>
                  <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                    Mouse and human microglia respond differently to amyloid. Anti-inflammatory drugs
                    that work in mice routinely fail in human trials.
                  </p>
                  <p className="text-sm text-[var(--success)]">
                    Neuroinflammation targets need human-relevant validation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4: The Degu Question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-orange-light)] flex items-center justify-center flex-shrink-0">
                  <Beaker className="w-6 h-6 text-[var(--accent-orange)]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2">
                    The Degu Question
                  </h4>
                  <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                    Degus have human-identical Aβ and develop natural plaques with age. No genetic
                    manipulation needed. Yet cognitive effects remain debated.
                  </p>
                  <p className="text-sm text-[var(--accent-orange)]">
                    If natural plaques don&apos;t cause dementia, what does?
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 5: The Prion Myth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] p-6 lg:col-span-2"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--danger-light)] flex items-center justify-center flex-shrink-0">
                  <Dna className="w-6 h-6 text-[var(--danger)]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2">
                    The Prion Myth
                  </h4>
                  <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                    Tau and Aβ don&apos;t actually self-template. In vitro studies require{' '}
                    <strong>polyanion cofactors</strong> (HSPGs, RNA) for aggregation.
                    Fichou 2018 showed brain-derived tau seeds are &quot;exhausted after one
                    generation&quot; without cofactor supplementation—they simply depolymerize.
                  </p>
                  <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                    The &quot;prion-like spread&quot; narrative assumes autonomous self-templating.
                    But the data suggests <strong>spread follows cofactor availability</strong>,
                    not intrinsic seeding. Cellular dysfunction releases cofactors (RNA, DNA,
                    polyanions), creating a permissive environment. The aggregation is a{' '}
                    <em>consequence</em> of cell damage, not the cause.
                  </p>
                  <p className="text-sm text-[var(--danger)]">
                    Therapies targeting &quot;prion spread&quot; may be chasing a phantom mechanism.
                    The real target is the upstream cell damage that releases cofactors.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom takeaway */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--accent-orange-light)] border-l-4 border-[var(--accent-orange)] p-8 max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-[var(--accent-orange)] flex-shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-xl text-[var(--text-primary)] mb-3">
                  The Fundamental Problem
                </h4>
                <p className="text-[var(--text-body)] leading-relaxed mb-4">
                  We&apos;ve been testing drugs that clear amyloid in models that don&apos;t
                  recapitulate the human disease. Success in mice tells us a drug <em>can</em> clear
                  plaques, not that clearing plaques <em>helps</em> humans.
                </p>
                <p className="text-[var(--accent-orange)] font-semibold">
                  The 99% failure rate isn&apos;t a failure of drug development. It&apos;s a
                  failure of the hypothesis being tested.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
