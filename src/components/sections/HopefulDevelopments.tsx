'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill,
  Lightbulb,
  Heart,
  Activity,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  FlaskConical,
  AlertTriangle,
} from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent, TextWithAbbreviations } from '@/components/ui';
import {
  hopefulDevelopments,
  getApprovedTreatments,
  getPipelineDrugs,
  getLifestyleInterventions,
  getDevelopmentsByCategory,
  type HopefulDevelopment,
  type DevelopmentCategory,
} from '@/data/hopefulDevelopments';

// Status badge colors
const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  fda_approved: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'FDA Approved' },
  phase_3: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Phase 3' },
  phase_2: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Phase 2' },
  preclinical: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Preclinical' },
  evidence_based: { bg: 'bg-teal-100', text: 'text-teal-700', label: 'Evidence-Based' },
};

// Category icons
function getCategoryIcon(category: DevelopmentCategory) {
  switch (category) {
    case 'approved_drug':
      return <Pill className="w-5 h-5" />;
    case 'pipeline_drug':
      return <FlaskConical className="w-5 h-5" />;
    case 'device_therapy':
      return <Activity className="w-5 h-5" />;
    case 'lifestyle':
      return <Heart className="w-5 h-5" />;
    case 'supplement':
      return <Sparkles className="w-5 h-5" />;
    case 'research_tool':
      return <Lightbulb className="w-5 h-5" />;
    default:
      return <Pill className="w-5 h-5" />;
  }
}

// Development card component
function DevelopmentCard({ development }: { development: HopefulDevelopment }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusStyles[development.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card variant="default" hover={false} className="overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div
            className="p-5 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--accent-orange)]">
                  {getCategoryIcon(development.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{development.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    <TextWithAbbreviations text={development.description} />
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                  {status.label}
                </span>
                {expanded ? (
                  <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
                )}
              </div>
            </div>

            {/* Why Hopeful - always visible */}
            <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
              <p className="text-sm text-emerald-800">
                <span className="font-medium">Why it matters:</span>{' '}
                <TextWithAbbreviations text={development.whyHopeful} />
              </p>
            </div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 border-t border-[var(--border)]">
                  {/* Mechanism */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">How it works</h4>
                    <p className="text-sm text-[var(--text-body)]">
                      <TextWithAbbreviations text={development.mechanism} />
                    </p>
                  </div>

                  {/* Evidence */}
                  {development.evidence.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Evidence</h4>
                      <div className="space-y-3">
                        {development.evidence.map((ev, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                            <div className="flex items-center gap-2 mb-1">
                              {ev.trialName && (
                                <span className="font-medium text-sm text-[var(--text-primary)]">
                                  {ev.trialName}
                                </span>
                              )}
                              {ev.trialPhase && (
                                <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-muted)]">
                                  {ev.trialPhase}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[var(--text-body)]">
                              <TextWithAbbreviations text={ev.result} />
                            </p>
                            {ev.limitation && (
                              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                <TextWithAbbreviations text={ev.limitation} />
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cost & Availability */}
                  <div className="mt-4 flex flex-wrap gap-4">
                    {development.cost && (
                      <div className="text-sm">
                        <span className="font-medium text-[var(--text-primary)]">Cost:</span>{' '}
                        <span className="text-[var(--text-body)]">{development.cost}</span>
                      </div>
                    )}
                    {development.availability && (
                      <div className="text-sm">
                        <span className="font-medium text-[var(--text-primary)]">Availability:</span>{' '}
                        <span className="text-[var(--text-body)]">{development.availability}</span>
                      </div>
                    )}
                  </div>

                  {/* Caveats */}
                  {development.caveats && development.caveats.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Important caveats</h4>
                      <ul className="space-y-1">
                        {development.caveats.map((caveat, idx) => (
                          <li key={idx} className="text-sm text-[var(--text-muted)] flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <TextWithAbbreviations text={caveat} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Summary stat component
function SummaryStat({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: 'emerald' | 'blue' | 'purple' | 'amber';
}) {
  const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className={`w-16 h-16 mx-auto rounded-full ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-[var(--text-primary)]">{value}</div>
      <div className="text-sm text-[var(--text-muted)] mt-1">{label}</div>
    </motion.div>
  );
}

export function HopefulDevelopments() {
  const [activeTab, setActiveTab] = useState<'approved' | 'pipeline' | 'lifestyle'>('approved');

  const approvedTreatments = getApprovedTreatments();
  const pipelineDrugs = getPipelineDrugs();
  const supplements = getDevelopmentsByCategory('supplement');
  const lifestyleInterventions = getLifestyleInterventions();

  const tabs = [
    { id: 'approved', label: 'Approved Treatments', count: approvedTreatments.length },
    { id: 'pipeline', label: 'Promising Pipeline', count: pipelineDrugs.length + supplements.length },
    { id: 'lifestyle', label: 'Lifestyle Interventions', count: lifestyleInterventions.length },
  ] as const;

  return (
    <Section id="hopeful-developments" className="bg-gradient-to-b from-[var(--bg-primary)] to-emerald-50/30">
      <Container>
        <SectionHeader
          title="Reasons for Hope"
          subtitle="For the first time in history, we have treatments that slow cognitive decline—and evidence-based interventions available to everyone today."
        />

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <SummaryStat
            icon={<CheckCircle2 className="w-7 h-7" />}
            value={approvedTreatments.length}
            label="FDA-approved disease-modifying treatments"
            color="emerald"
          />
          <SummaryStat
            icon={<FlaskConical className="w-7 h-7" />}
            value={pipelineDrugs.length + supplements.length}
            label="Promising approaches in development"
            color="blue"
          />
          <SummaryStat
            icon={<Heart className="w-7 h-7" />}
            value={lifestyleInterventions.length}
            label="Evidence-based lifestyle interventions"
            color="purple"
          />
          <SummaryStat
            icon={<Clock className="w-7 h-7" />}
            value="Now"
            label="Time to start prevention"
            color="amber"
          />
        </div>

        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-[var(--bg-secondary)] p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[var(--bg-secondary)] text-xs">
                  {tab.count}
                </span>
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
              <div className="space-y-4">
                <p className="text-center text-[var(--text-body)] mb-6 max-w-2xl mx-auto">
                  These are the first treatments ever shown to slow Alzheimer's progression in clinical trials.
                  While benefits are modest, they represent a historic milestone.
                </p>
                {approvedTreatments.map((dev) => (
                  <DevelopmentCard key={dev.id} development={dev} />
                ))}
              </div>
            )}

            {activeTab === 'pipeline' && (
              <div className="space-y-4">
                <p className="text-center text-[var(--text-body)] mb-6 max-w-2xl mx-auto">
                  Beyond amyloid-targeting drugs, researchers are pursuing approaches based on
                  alternative hypotheses—many addressing upstream causes.
                </p>
                {[...pipelineDrugs, ...supplements].map((dev) => (
                  <DevelopmentCard key={dev.id} development={dev} />
                ))}
              </div>
            )}

            {activeTab === 'lifestyle' && (
              <div className="space-y-4">
                <p className="text-center text-[var(--text-body)] mb-6 max-w-2xl mx-auto">
                  You don't need to wait for a drug. Evidence-based lifestyle interventions can reduce
                  dementia risk by 30-50%—and they're available today.
                </p>
                {lifestyleInterventions.map((dev) => (
                  <DevelopmentCard key={dev.id} development={dev} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card variant="highlighted" hover={false} className="inline-block max-w-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                The Best Time to Act is Now
              </h3>
              <p className="text-[var(--text-body)]">
                While we wait for better treatments, the evidence is clear: exercise, diet, sleep,
                and cognitive engagement can meaningfully reduce your risk. These interventions
                address the same upstream mechanisms that sidelined researchers identified decades ago.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
}
