'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill,
  Lightbulb,
  Heart,
  Activity,
  Sparkles,
  CheckCircle2,
  Clock,
  FlaskConical,
  AlertTriangle,
  Syringe,
} from 'lucide-react';
import { Container, Section, SectionHeader, TextWithAbbreviations, GraphLink } from '@/components/ui';
import {
  getApprovedTreatments,
  getPipelineDrugs,
  getLifestyleInterventions,
  getVaccines,
  getDevelopmentsByCategory,
  type HopefulDevelopment,
  type DevelopmentCategory,
} from '@/data/hopefulDevelopments';
import { getSection } from '@/data';

const sectionConfig = getSection('hopeful-developments')!;

// Status badge styles - minimal palette with typography emphasis
const statusStyles: Record<string, { bg: string; text: string; label: string; weight: string }> = {
  fda_approved: { bg: 'bg-[var(--success-light)]', text: 'text-[var(--success)]', label: 'FDA Approved', weight: 'font-bold' },
  phase_3: { bg: 'bg-[var(--bg-secondary)]', text: 'text-[var(--text-body)]', label: 'Phase 3', weight: 'font-medium' },
  phase_2: { bg: 'bg-[var(--bg-secondary)]', text: 'text-[var(--text-muted)]', label: 'Phase 2', weight: 'font-medium' },
  preclinical: { bg: 'bg-[var(--bg-secondary)]', text: 'text-[var(--text-muted)]', label: 'Preclinical', weight: 'font-normal' },
  evidence_based: { bg: 'bg-[#007385]/10', text: 'text-[#007385]', label: 'Evidence-Based', weight: 'font-medium' },
};

// Treatment type badge styles
const treatmentTypeStyles: Record<string, { bg: string; text: string; label: string }> = {
  disease_modifying: { bg: 'bg-[var(--accent-orange-light)]', text: 'text-[var(--accent-orange)]', label: 'Disease-modifying' },
  symptomatic: { bg: 'bg-[var(--bg-secondary)]', text: 'text-[var(--text-muted)]', label: 'Symptomatic' },
};

// Category icons
function getCategoryIcon(category: DevelopmentCategory) {
  switch (category) {
    case 'approved_drug':
      return <Pill className="w-4 h-4" />;
    case 'pipeline_drug':
      return <FlaskConical className="w-4 h-4" />;
    case 'device_therapy':
      return <Activity className="w-4 h-4" />;
    case 'lifestyle':
      return <Heart className="w-4 h-4" />;
    case 'supplement':
      return <Sparkles className="w-4 h-4" />;
    case 'research_tool':
      return <Lightbulb className="w-4 h-4" />;
    case 'vaccine':
      return <Syringe className="w-4 h-4" />;
    default:
      return <Pill className="w-4 h-4" />;
  }
}

// Two-panel list component for developments
function DevelopmentsList({ developments, emptyMessage }: { developments: HopefulDevelopment[]; emptyMessage: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = developments.find((d) => d.id === selectedId);

  if (developments.length === 0) {
    return <p className="text-center text-[var(--text-muted)] py-8">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Development list */}
      <div className={`transition-all duration-300 ${selected ? 'lg:w-1/2' : 'w-full'}`}>
        <div>
          {developments.map((dev, index) => {
            const isSelected = selectedId === dev.id;
            return (
              <button
                key={dev.id}
                className={`w-full flex items-center justify-between p-4 text-left hover:bg-[var(--bg-secondary)] transition-all ${
                  index > 0 ? 'border-t border-[var(--border)]' : ''
                } ${isSelected ? 'bg-[var(--bg-secondary)] border-l-4 border-l-[var(--accent-orange)]' : 'border-l-4 border-l-transparent'}`}
                onClick={() => setSelectedId(isSelected ? null : dev.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className={`font-semibold text-sm ${isSelected ? 'text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'}`}>{dev.name}</h4>
                    {dev.treatmentType && (
                      <span className={`text-[10px] px-1.5 py-0.5 ${treatmentTypeStyles[dev.treatmentType].bg} ${treatmentTypeStyles[dev.treatmentType].text}`}>
                        {treatmentTypeStyles[dev.treatmentType].label}
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--text-muted)] text-xs truncate">
                    <TextWithAbbreviations text={dev.description} />
                  </p>
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
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{selected.name}</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  <TextWithAbbreviations text={selected.description} />
                </p>
              </div>

              <div className="space-y-4">
                {/* Why it matters */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Why It Matters
                  </h4>
                  <p className="text-sm text-[var(--text-body)]">
                    <TextWithAbbreviations text={selected.whyHopeful} />
                  </p>
                </div>

                {/* Mechanism */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    How It Works
                  </h4>
                  <p className="text-sm text-[var(--text-body)]">
                    <TextWithAbbreviations text={selected.mechanism} />
                  </p>
                </div>

                {/* Evidence summary */}
                {selected.evidence.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
                      Key Evidence
                    </h4>
                    <div className="space-y-2">
                      {selected.evidence.slice(0, 2).map((ev, idx) => (
                        <div key={idx} className="p-2 bg-[var(--bg-secondary)] text-xs border-l-2 border-[var(--border)]">
                          {ev.trialName && (
                            <span className="font-semibold text-[var(--text-primary)]">{ev.trialName}: </span>
                          )}
                          <span className="text-[var(--text-body)]">
                            <TextWithAbbreviations text={ev.result} />
                          </span>
                          {ev.limitation && (
                            <p className="text-[var(--text-muted)] mt-1 flex items-center gap-1 italic">
                              <AlertTriangle className="w-3 h-3 text-[var(--accent-orange)]" />
                              <TextWithAbbreviations text={ev.limitation} />
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cost & Availability */}
                {(selected.cost || selected.availability) && (
                  <div className="flex flex-wrap gap-4 text-xs pt-2 border-t border-[var(--border)]">
                    {selected.cost && (
                      <div>
                        <span className="font-medium text-[var(--text-muted)]">Cost:</span>{' '}
                        <span className="text-[var(--text-body)]">{selected.cost}</span>
                      </div>
                    )}
                    {selected.availability && (
                      <div>
                        <span className="font-medium text-[var(--text-muted)]">Availability:</span>{' '}
                        <span className="text-[var(--text-body)]">{selected.availability}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Caveats */}
                {selected.caveats && selected.caveats.length > 0 && (
                  <div className="pt-2 border-t border-[var(--border)]">
                    <h4 className="text-xs font-semibold text-[var(--accent-orange)] uppercase tracking-wide mb-1">
                      Important Caveats
                    </h4>
                    <ul className="space-y-1">
                      {selected.caveats.map((caveat, idx) => (
                        <li key={idx} className="text-xs text-[var(--text-muted)] flex items-start gap-1.5">
                          <span className="text-[var(--accent-orange)] mt-0.5">•</span>
                          <TextWithAbbreviations text={caveat} />
                        </li>
                      ))}
                    </ul>
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

// Summary stat component - typography-driven, minimal color
function SummaryStat({
  icon,
  value,
  label,
  highlight = false,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className={`w-12 h-12 mx-auto flex items-center justify-center mb-2 ${highlight ? 'text-[var(--accent-orange)]' : 'text-[var(--text-muted)]'}`}>
        {icon}
      </div>
      <div className={`text-4xl font-bold font-serif mb-1 ${highlight ? 'text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'}`}>
        {value}
      </div>
      <div className="text-sm text-[var(--text-muted)] leading-snug">{label}</div>
    </motion.div>
  );
}

export function HopefulDevelopments() {
  const [activeTab, setActiveTab] = useState<'approved' | 'pipeline' | 'vaccines' | 'lifestyle'>('approved');

  const approvedTreatments = getApprovedTreatments();
  const pipelineDrugs = getPipelineDrugs();
  const supplements = getDevelopmentsByCategory('supplement');
  const vaccines = getVaccines();
  const lifestyleInterventions = getLifestyleInterventions();

  const tabs = [
    { id: 'approved', label: 'Approved Treatments', count: approvedTreatments.length },
    { id: 'pipeline', label: 'Promising Pipeline', count: pipelineDrugs.length + supplements.length },
    { id: 'vaccines', label: 'Protective Vaccines', count: vaccines.length },
    { id: 'lifestyle', label: 'Lifestyle Interventions', count: lifestyleInterventions.length },
  ] as const;

  return (
    <Section id={sectionConfig.id} className="bg-[var(--bg-primary)]">
      <Container>
        <SectionHeader
          title={sectionConfig.title}
          subtitle={sectionConfig.subtitle}
        />

        {/* Summary stats - typography-driven */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12 py-8 border-y border-[var(--border)]">
          <SummaryStat
            icon={<CheckCircle2 className="w-6 h-6" />}
            value={approvedTreatments.length}
            label="FDA-approved Alzheimer's treatments"
          />
          <SummaryStat
            icon={<FlaskConical className="w-6 h-6" />}
            value={pipelineDrugs.length + supplements.length}
            label="Promising approaches in development"
          />
          <SummaryStat
            icon={<Syringe className="w-6 h-6" />}
            value={vaccines.length}
            label="Vaccines with dementia protection"
          />
          <SummaryStat
            icon={<Heart className="w-6 h-6" />}
            value={lifestyleInterventions.length}
            label="Evidence-based lifestyle interventions"
          />
          <SummaryStat
            icon={<Clock className="w-6 h-6" />}
            value="Now"
            label="Time to start prevention"
            highlight
          />
        </div>

        {/* Tab navigation - clean underline style */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-1 border-b border-[var(--border)]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
                }`}
              >
                {tab.label}
                <span className={`ml-2 text-xs ${activeTab === tab.id ? 'text-[var(--accent-orange)] font-semibold' : ''}`}>
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-orange)]"
                  />
                )}
              </button>
            ))}
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
            {activeTab === 'approved' && (
              <div>
                <div className="text-center mb-6 max-w-2xl mx-auto">
                  <p className="text-[var(--text-body)] mb-2">
                    Two types of FDA-approved treatments exist: <strong>disease-modifying</strong> drugs
                    (lecanemab, donanemab) that slow underlying progression, and <strong>symptomatic</strong> drugs
                    that treat symptoms without altering disease course.
                  </p>
                  <GraphLink presetId="all_approved" variant="inline" label="View approved drugs in graph" />
                </div>
                <DevelopmentsList
                  developments={approvedTreatments}
                  emptyMessage="No approved treatments to display."
                />
              </div>
            )}

            {activeTab === 'pipeline' && (
              <div>
                <div className="text-center mb-6 max-w-2xl mx-auto">
                  <p className="text-[var(--text-body)] mb-2">
                    Beyond amyloid-targeting drugs, researchers are pursuing approaches based on
                    alternative hypotheses, many addressing upstream causes.
                  </p>
                  <GraphLink presetId="neuroinflammation_hypothesis" variant="inline" label="View alternative hypotheses" />
                </div>
                <DevelopmentsList
                  developments={[...pipelineDrugs, ...supplements]}
                  emptyMessage="No pipeline developments to display."
                />
              </div>
            )}

            {activeTab === 'vaccines' && (
              <div>
                <div className="text-center mb-6 max-w-2xl mx-auto">
                  <p className="text-[var(--text-body)] mb-2">
                    Multiple vaccines show <strong>17-45% reductions</strong> in dementia risk via
                    trained immunity. Protection extends beyond preventing the target infection.
                  </p>
                  <p className="text-sm text-[var(--accent-orange)] mt-2">
                    Both adjuvanted and non-adjuvanted vaccines show benefit, suggesting multiple protective mechanisms.
                  </p>
                </div>
                <DevelopmentsList
                  developments={vaccines}
                  emptyMessage="No vaccines to display."
                />
              </div>
            )}

            {activeTab === 'lifestyle' && (
              <div>
                <div className="text-center mb-6 max-w-2xl mx-auto">
                  <p className="text-[var(--text-body)] mb-2">
                    You don&apos;t need to wait for a drug. Evidence-based lifestyle interventions can reduce
                    dementia risk by 30-50%, and they&apos;re available today.
                  </p>
                  <GraphLink presetId="all_lifestyle" variant="inline" label="View lifestyle interventions" />
                </div>
                <DevelopmentsList
                  developments={lifestyleInterventions}
                  emptyMessage="No lifestyle interventions to display."
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to action - typography-driven emphasis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto pt-12 border-t border-[var(--border)]"
        >
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-[var(--text-primary)] mb-6">
            The Best Time to Act is <span className="text-[var(--accent-orange)]">Now.</span>
          </h3>
          <p className="text-lg text-[var(--text-body)] leading-relaxed mb-4">
            While we wait for better treatments, the evidence is clear:
          </p>
          <p className="text-xl md:text-2xl text-[var(--text-primary)] mb-6">
            <span className="font-semibold">Exercise</span>,{' '}
            <span className="font-semibold">diet</span>,{' '}
            <span className="font-semibold">sleep</span>, and{' '}
            <span className="font-semibold">cognitive engagement</span>{' '}
            can reduce your risk by{' '}
            <span className="font-bold text-[var(--accent-orange)] text-2xl md:text-3xl">30-50%</span>.
          </p>
          <p className="text-[var(--text-muted)]">
            These interventions address the same upstream mechanisms that sidelined researchers identified decades ago.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
