'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Pill,
  DollarSign,
  FlaskConical,
  Quote,
  GitBranch,
  Dna,
  Beaker,
  ArrowRight,
  CheckCircle2,
  Users,
  Lightbulb,
} from 'lucide-react';
import { Container, Section, SectionHeader, TextWithAbbreviations } from '@/components/ui';
import { promisingFrontierData, type PromisingDrug } from '@/data/promisingFrontier';
import { getSection } from '@/data';
import {
  tijmsSubtypes,
  apoeStratification,
  extendedBiomarkerPanel,
  combinationRegimens,
  stratificationAlgorithm,
  keyInsights,
  type ADSubtype,
  type BiomarkerPanel,
} from '@/data/precisionMedicine';

const sectionConfig = getSection('promising-frontier')!;

// Two-panel list component for drugs
function DrugsList({ drugs }: { drugs: PromisingDrug[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = drugs.find((d) => d.id === selectedId);

  if (drugs.length === 0) {
    return <p className="text-center text-[var(--text-muted)] py-8">No drugs to display.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Drug list */}
      <div className={`transition-all duration-300 ${selected ? 'lg:w-1/2' : 'w-full'}`}>
        <div className="bg-[var(--bg-card)] border border-[var(--border)]">
          {drugs.map((drug, index) => {
            const isSelected = selectedId === drug.id;
            return (
              <button
                key={drug.id}
                className={`w-full flex items-center justify-between p-4 text-left hover:bg-[var(--bg-secondary)] transition-all ${
                  index > 0 ? 'border-t border-[var(--border)]' : ''
                } ${isSelected ? 'bg-[var(--bg-secondary)] border-l-4 border-l-[var(--accent-orange)]' : 'border-l-4 border-l-transparent'}`}
                onClick={() => setSelectedId(isSelected ? null : drug.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold text-sm ${isSelected ? 'text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'}`}>
                      {drug.drug}
                    </h4>
                    <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                      {drug.status}
                    </span>
                  </div>
                  <p className="text-[var(--text-muted)] text-xs">
                    {drug.mechanism}
                  </p>
                  {/* Show brief "why it matters" on mobile when not selected */}
                  <p className="text-[var(--accent-orange)] text-xs mt-1 line-clamp-1 lg:hidden">
                    <TextWithAbbreviations text={drug.whyItMatters} />
                  </p>
                </div>
                <div className="text-xs text-[var(--text-muted)] ml-2 shrink-0">
                  {drug.costPerMonth}
                </div>
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
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Pill className="w-5 h-5 text-[var(--accent-orange)]" />
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{selected.drug}</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">{selected.mechanism}</p>
              </div>

              <div className="space-y-4">
                {/* Key Evidence */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Key Evidence
                  </h4>
                  <p className="text-sm text-[var(--text-body)]">
                    <TextWithAbbreviations text={selected.keyEvidence} />
                  </p>
                </div>

                {/* Why It Matters */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Why It Matters
                  </h4>
                  <p className="text-sm text-[var(--accent-orange)] font-medium">
                    <TextWithAbbreviations text={selected.whyItMatters} />
                  </p>
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 border-[var(--accent-orange)] pl-4 bg-[var(--bg-secondary)] py-3 pr-3">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm italic text-[var(--text-body)]">&quot;{selected.quote}&quot;</p>
                      <cite className="block text-xs text-[var(--text-muted)] mt-1 not-italic">— {selected.quoteSource}</cite>
                    </div>
                  </div>
                </blockquote>

                {/* Details row */}
                <div className="flex flex-wrap gap-4 text-sm pt-2 border-t border-[var(--border)]">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-[var(--text-muted)]">Cost:</span>
                    <span className="text-[var(--text-primary)] font-medium">{selected.costPerMonth}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FlaskConical className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-[var(--text-muted)]">Status:</span>
                    <span className="text-[var(--text-primary)]">{selected.status}</span>
                  </div>
                </div>

                {/* Decisive Trial */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Decisive Trial Needed
                  </h4>
                  <p className="text-sm text-[var(--text-body)]">
                    <TextWithAbbreviations text={selected.decisiveTrial} />
                  </p>
                </div>

                {/* Caveat */}
                <div className="flex items-start gap-2 p-3 bg-[var(--bg-secondary)] border-l-2 border-[var(--text-muted)]">
                  <AlertTriangle className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                      Key Caveat
                    </h4>
                    <p className="text-sm text-[var(--text-muted)]">
                      <TextWithAbbreviations text={selected.keyCaveat} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Stratification Flowchart Component
function StratificationFlowchart() {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  return (
    <div className="space-y-4">
      {stratificationAlgorithm.map((step) => (
        <motion.div
          key={step.step}
          className="border border-[var(--border)] bg-[var(--bg-card)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: step.step * 0.1 }}
        >
          <button
            className="w-full p-4 flex items-center justify-between text-left hover:bg-[var(--bg-secondary)] transition-colors"
            onClick={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-orange)] text-white flex items-center justify-center font-bold text-sm">
                {step.step}
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text-primary)]">{step.title}</h4>
                <p className="text-xs text-[var(--text-muted)]">{step.action}</p>
              </div>
            </div>
            <GitBranch className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${expandedStep === step.step ? 'rotate-90' : ''}`} />
          </button>

          <AnimatePresence>
            {expandedStep === step.step && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 space-y-2">
                  {step.branches.map((branch, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] border-l-4"
                      style={{ borderLeftColor: branch.color }}
                    >
                      <ArrowRight className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{branch.condition}</p>
                        <p className="text-sm text-[var(--text-body)]">{branch.result}</p>
                        {branch.recommendation && (
                          <p className="text-xs text-[var(--accent-orange)] mt-1 font-medium">
                            Recommendation: {branch.recommendation}
                          </p>
                        )}
                        {branch.nextStep && (
                          <p className="text-xs text-[var(--text-muted)] mt-1">
                            Continue to Step {branch.nextStep}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// Subtype Card Component
function SubtypeCard({ subtype, isSelected, onClick }: { subtype: ADSubtype; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 text-left border transition-all ${
        isSelected
          ? 'border-[var(--accent-orange)] bg-[var(--bg-secondary)]'
          : 'border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)]'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: subtype.color }}
        />
        <span className="text-xs font-medium text-[var(--text-muted)]">{subtype.shortName}</span>
      </div>
      <h4 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{subtype.name}</h4>
      <p className="text-xs text-[var(--text-muted)]">{subtype.prevalence}</p>
      <div className="mt-2 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < subtype.frameworkRelevance ? 'bg-[var(--accent-orange)]' : 'bg-[var(--border)]'
            }`}
          />
        ))}
        <span className="text-xs text-[var(--text-muted)] ml-1">relevance</span>
      </div>
    </button>
  );
}

// Subtypes Section Component
function SubtypesSection() {
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>('innate_immune');
  const selected = tijmsSubtypes.find(s => s.id === selectedSubtype);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {tijmsSubtypes.map((subtype) => (
          <SubtypeCard
            key={subtype.id}
            subtype={subtype}
            isSelected={selectedSubtype === subtype.id}
            onClick={() => setSelectedSubtype(subtype.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[var(--bg-card)] border border-[var(--border)] p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{selected.name}</h3>
                <p className="text-sm text-[var(--text-muted)]">{selected.molecularSignature}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                  selected.prognosis === 'faster'
                    ? 'bg-[var(--danger-light)] text-[var(--danger)]'
                    : selected.prognosis === 'baseline'
                    ? 'bg-[var(--success-light)] text-[var(--success)]'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                }`}>
                  {selected.prognosis === 'faster' ? `Faster progression (HR ${selected.prognosisHR})` :
                   selected.prognosis === 'baseline' ? 'Baseline prognosis' : 'Variable'}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
                  Biomarker Signature
                </h4>
                {selected.biomarkers.elevated.length > 0 && (
                  <div className="mb-2">
                    <span className="text-xs text-[var(--danger)]">Elevated:</span>
                    <ul className="mt-1 space-y-1">
                      {selected.biomarkers.elevated.map((b, i) => (
                        <li key={i} className="text-sm text-[var(--text-body)] flex items-center gap-1">
                          <span className="text-[var(--danger)]">+</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selected.biomarkers.reduced.length > 0 && (
                  <div>
                    <span className="text-xs text-[var(--success)]">Reduced:</span>
                    <ul className="mt-1 space-y-1">
                      {selected.biomarkers.reduced.map((b, i) => (
                        <li key={i} className="text-sm text-[var(--text-body)] flex items-center gap-1">
                          <span className="text-[var(--success)]">-</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
                  Treatment Priorities
                </h4>
                {selected.treatmentPriority.length > 0 ? (
                  <div className="space-y-2">
                    {selected.treatmentPriority.map((tp, i) => (
                      <div key={i} className="p-2 bg-[var(--bg-secondary)] border-l-2 border-[var(--accent-orange)]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[var(--text-primary)]">{tp.target}</span>
                          <span className="text-xs text-[var(--text-muted)]">
                            Priority: {Array.from({ length: tp.priority }).map(() => '★').join('')}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{tp.drugs.join(', ')}</p>
                        <p className="text-xs text-[var(--text-body)] mt-1">{tp.rationale}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-muted)]">Treatment priorities not yet established for this subtype.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Biomarker Panel Component
function BiomarkerPanelSection() {
  const categories = ['genetic', 'tau', 'amyloid', 'inflammation', 'iron', 'gut'] as const;
  const categoryLabels: Record<string, string> = {
    genetic: 'Genetic',
    tau: 'Tau',
    amyloid: 'Amyloid',
    inflammation: 'Inflammation',
    iron: 'Iron Axis',
    gut: 'Gut-Brain',
  };

  return (
    <div className="space-y-6">
      <p className="text-center text-[var(--text-body)] max-w-3xl mx-auto">
        The <span className="font-semibold">$300 Prevention Panel</span>: Cheap, routine tests can detect upstream
        risk factors YEARS before expensive AD-specific biomarkers become abnormal.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left p-3 font-semibold text-[var(--text-primary)]">Test</th>
              <th className="text-left p-3 font-semibold text-[var(--text-primary)]">Category</th>
              <th className="text-left p-3 font-semibold text-[var(--text-primary)]">Cost</th>
              <th className="text-left p-3 font-semibold text-[var(--text-primary)]">E4/4 Relevance</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              extendedBiomarkerPanel
                .filter(b => b.category === category)
                .map((biomarker, idx) => (
                  <tr
                    key={biomarker.name}
                    className={`border-b border-[var(--border)] ${idx % 2 === 0 ? 'bg-[var(--bg-secondary)]' : ''}`}
                  >
                    <td className="p-3">
                      <div>
                        <span className="font-medium text-[var(--text-primary)]">{biomarker.marker}</span>
                        {biomarker.availability === 'research' && (
                          <span className="ml-2 text-xs px-1.5 py-0.5 bg-[var(--bg-secondary)] text-[var(--text-muted)] rounded">
                            Research
                          </span>
                        )}
                      </div>
                      {biomarker.threshold && (
                        <div className="text-xs text-[var(--text-muted)] mt-0.5">
                          Threshold: {biomarker.threshold}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="text-xs px-2 py-1 rounded bg-[var(--bg-card)] border border-[var(--border)]">
                        {categoryLabels[biomarker.category]}
                      </span>
                    </td>
                    <td className="p-3 text-[var(--text-body)]">{biomarker.cost}</td>
                    <td className="p-3 text-[var(--text-muted)] text-xs max-w-xs">{biomarker.e4Relevance}</td>
                  </tr>
                ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Key Insights Component
function KeyInsightsSection() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {keyInsights.map((insight, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="p-4 bg-[var(--bg-card)] border border-[var(--border)] border-l-4 border-l-[var(--accent-orange)]"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[var(--accent-orange)] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-1">{insight.title}</h4>
              <p className="text-sm text-[var(--text-body)]">{insight.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function PromisingFrontier() {
  const [activeTab, setActiveTab] = useState<'drugs' | 'precision'>('drugs');

  const tabs = [
    { id: 'drugs', label: 'Promising Drugs', icon: Pill },
    { id: 'precision', label: 'Precision Medicine', icon: Dna },
  ] as const;

  return (
    <Section id={sectionConfig.id} className="bg-[var(--bg-primary)]">
      <Container>
        <SectionHeader
          title={sectionConfig.title}
          subtitle={sectionConfig.subtitle}
        />

        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-1 border-b border-[var(--border)]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-medium transition-all relative flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabPromisingFrontier"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-orange)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'drugs' && (
              <div>
                {/* Summary stats - simplified to just numbers */}
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-8 text-center">
                  <div>
                    <div className="text-3xl font-serif font-bold text-[var(--accent-orange)]">{promisingFrontierData.length}</div>
                    <div className="text-sm text-[var(--text-muted)]">promising candidates</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-bold text-[#007385]">&lt;$50</div>
                    <div className="text-sm text-[var(--text-muted)]">monthly cost</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-bold text-[var(--text-primary)]">Generic</div>
                    <div className="text-sm text-[var(--text-muted)]">patent status</div>
                  </div>
                </div>

                {/* Intro text */}
                <p className="text-center text-[var(--text-body)] mb-10 max-w-3xl mx-auto">
                  These drugs target <span className="font-semibold text-[var(--text-primary)]">upstream mechanisms</span>—not
                  downstream amyloid—and have early human or strong preclinical evidence. Because they&apos;re
                  generic or off-patent, no company will fund the decisive trials.
                </p>

                {/* Drug list */}
                <DrugsList drugs={promisingFrontierData} />

                {/* Bottom message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mt-12 text-center max-w-3xl mx-auto"
                >
                  <p className="text-lg text-[var(--text-body)] leading-relaxed">
                    Each of these drugs could be tested with{' '}
                    <span className="font-semibold text-[var(--accent-orange)]">short, inexpensive biomarker trials</span>.
                    The science exists. The patients exist. What&apos;s missing is a{' '}
                    <span className="font-semibold text-[var(--text-primary)]">funding model</span> that doesn&apos;t require
                    patent protection.
                  </p>
                </motion.div>
              </div>
            )}

            {activeTab === 'precision' && (
              <div className="space-y-12">
                {/* Summary stats for precision medicine */}
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-8 text-center">
                  <div>
                    <div className="text-3xl font-serif font-bold text-[var(--accent-orange)]">5</div>
                    <div className="text-sm text-[var(--text-muted)]">molecular subtypes</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-bold text-[#007385]">$300</div>
                    <div className="text-sm text-[var(--text-muted)]">prevention panel cost</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-bold text-[var(--text-primary)]">2-3x</div>
                    <div className="text-sm text-[var(--text-muted)]">progression difference</div>
                  </div>
                </div>

                {/* Key Insights */}
                <div>
                  <h3 className="text-xl font-bold font-serif text-[var(--text-primary)] mb-4 text-center">
                    The Path Forward
                  </h3>
                  <KeyInsightsSection />
                </div>

                {/* Stratification Algorithm */}
                <div>
                  <h3 className="text-xl font-bold font-serif text-[var(--text-primary)] mb-2 text-center">
                    Patient Stratification Algorithm
                  </h3>
                  <p className="text-center text-[var(--text-muted)] mb-6 max-w-2xl mx-auto">
                    Match treatment to molecular subtype: genetic testing first, then biomarkers, then CSF proteomics
                  </p>
                  <StratificationFlowchart />
                </div>

                {/* Tijms Subtypes */}
                <div>
                  <h3 className="text-xl font-bold font-serif text-[var(--text-primary)] mb-2 text-center">
                    Molecular Subtypes (Tijms 2024)
                  </h3>
                  <p className="text-center text-[var(--text-muted)] mb-6 max-w-2xl mx-auto">
                    CSF proteomics reveals 5 distinct AD subtypes with different prognoses and treatment responses
                  </p>
                  <SubtypesSection />
                </div>

                {/* Biomarker Panel */}
                <div>
                  <h3 className="text-xl font-bold font-serif text-[var(--text-primary)] mb-2 text-center">
                    Extended Biomarker Panel
                  </h3>
                  <BiomarkerPanelSection />
                </div>

                {/* Call to action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center max-w-3xl mx-auto pt-8 border-t border-[var(--border)]"
                >
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-[var(--text-primary)] mb-4">
                    &quot;One drug fits all&quot; will <span className="text-[var(--accent-orange)]">never work</span> for a heterogeneous disease.
                  </h3>
                  <p className="text-lg text-[var(--text-body)] leading-relaxed">
                    The path forward: <span className="font-semibold">stratify patients by subtype</span> (genetic + proteomic + inflammatory biomarkers),{' '}
                    <span className="font-semibold">match combination regimens</span> to dominant pathological loops, and{' '}
                    <span className="font-semibold">use biomarkers</span> to guide real-time treatment adjustments.
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
}
