'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Syringe,
  Link2,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Lightbulb,
  Zap,
  Clock,
  FlaskConical,
} from 'lucide-react';
import { Container, Section, SectionHeader, TextWithAbbreviations } from '@/components/ui';
import {
  postInfectiousRisks,
  protectiveFactors,
  mecfsConnections,
  getPostInfectiousSummary,
  type PostInfectiousRisk,
  type ProtectiveFactor,
  type MECFSConnection,
} from '@/data/postInfectiousRisk';

// ============================================================================
// PIVOTAL DISCOVERIES - Why Now?
// ============================================================================

interface PivotalDiscovery {
  id: string;
  year: string;
  title: string;
  finding: string;
  implication: string;
  icon: 'paradigm' | 'warning' | 'hope' | 'connection';
}

const pivotalDiscoveries: PivotalDiscovery[] = [
  {
    id: 'gpcr-aab',
    year: '2018',
    title: 'AD is autoimmune, not just amyloid',
    finding: '91% of AD patients have GPCR autoantibodies vs only 33% in Lewy body dementia.',
    implication: 'AD and LBD may be fundamentally different diseases. AD looks autoimmune/vascular; LBD looks like true proteinopathy.',
    icon: 'paradigm',
  },
  {
    id: 'covid-risk',
    year: '2022',
    title: 'COVID reveals the infection-dementia link',
    finding: 'COVID-19 increases AD risk by 69% within one year. Long COVID shares the same GPCR-AAB signature as ME/CFS and AD.',
    implication: 'We may face a wave of early-onset dementia in 10-20 years from Long COVID. The ME/CFS-AD connection is now undeniable.',
    icon: 'warning',
  },
  {
    id: 'vaccine-protection',
    year: '2023-26',
    title: 'Vaccines protect via trained immunity',
    finding: 'Shingrix (17-18%), BCG (~45%), RSV vaccines (29%) all reduce dementia risk far beyond preventing their target infections.',
    implication: 'Trained immunity reprograms microglia. Vaccination is neuroprotective. We have tools to prevent AD today.',
    icon: 'hope',
  },
  {
    id: 'prion-myth',
    year: '2018',
    title: 'Plaques don\'t self-template',
    finding: 'Tau seeds are "exhausted after one generation" without polyanion cofactors (Fichou 2018). Dense-core plaques are protective, not harmful (Yuan 2016).',
    implication: 'The "prion spread" hypothesis is wrong. Aggregation follows cell damage, not autonomous templating. We\'ve been targeting the wrong mechanism.',
    icon: 'paradigm',
  },
];

// ============================================================================
// CONSTANTS
// ============================================================================

type TabId = 'discoveries' | 'risks' | 'protection' | 'mecfs';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'discoveries', label: 'Paradigm Shifts', icon: <Zap className="w-4 h-4" /> },
  { id: 'risks', label: 'COVID Warning', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'protection', label: 'Vaccine Protection', icon: <Syringe className="w-4 h-4" /> },
  { id: 'mecfs', label: 'ME/CFS Link', icon: <Link2 className="w-4 h-4" /> },
];

// ============================================================================
// DISCOVERY CARD COMPONENT
// ============================================================================

function DiscoveryCard({ discovery }: { discovery: PivotalDiscovery }) {
  const iconColors = {
    paradigm: { bg: 'bg-[#007385]/10', text: 'text-[#007385]', border: 'border-[#007385]' },
    warning: { bg: 'bg-[var(--danger-light)]', text: 'text-[var(--danger)]', border: 'border-[var(--danger)]' },
    hope: { bg: 'bg-[var(--success-light)]', text: 'text-[var(--success)]', border: 'border-[var(--success)]' },
    connection: { bg: 'bg-[var(--accent-orange-light)]', text: 'text-[var(--accent-orange)]', border: 'border-[var(--accent-orange)]' },
  };

  const colors = iconColors[discovery.icon];
  const Icon = discovery.icon === 'paradigm' ? Zap :
               discovery.icon === 'warning' ? AlertTriangle :
               discovery.icon === 'hope' ? CheckCircle2 : Link2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-[var(--bg-card)] border border-[var(--border)] p-6 border-l-4 ${colors.border}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full flex-shrink-0 ${colors.bg}`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[var(--text-muted)]">{discovery.year}</span>
          </div>
          <h4 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2">
            {discovery.title}
          </h4>
          <p className="text-sm text-[var(--text-body)] mb-3">
            {discovery.finding}
          </p>
          <p className={`text-sm font-medium ${colors.text}`}>
            {discovery.implication}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// RISK CARD COMPONENT
// ============================================================================

function RiskCard({
  risk,
  isSelected,
  onClick,
}: {
  risk: PostInfectiousRisk;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border transition-all ${
        isSelected
          ? 'bg-[var(--danger-light)] border-l-4 border-l-[var(--danger)] border-[var(--danger)]'
          : 'bg-[var(--bg-card)] border-[var(--border)] hover:bg-[var(--bg-secondary)] border-l-4 border-l-transparent'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full flex-shrink-0 ${isSelected ? 'bg-[var(--danger)]' : 'bg-[var(--bg-secondary)]'}`}>
          <ShieldAlert className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[var(--text-muted)]'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm ${isSelected ? 'text-[var(--danger)]' : 'text-[var(--text-primary)]'}`}>
            {risk.trigger}
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{risk.timeframe}</p>
          <p className="text-sm font-bold text-[var(--danger)] mt-1">{risk.riskIncrease}</p>
        </div>
      </div>
    </button>
  );
}

// ============================================================================
// PROTECTION CARD COMPONENT
// ============================================================================

function ProtectionCard({
  factor,
  isSelected,
  onClick,
}: {
  factor: ProtectiveFactor;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border transition-all ${
        isSelected
          ? 'bg-[var(--success-light)] border-l-4 border-l-[var(--success)] border-[var(--success)]'
          : 'bg-[var(--bg-card)] border-[var(--border)] hover:bg-[var(--bg-secondary)] border-l-4 border-l-transparent'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full flex-shrink-0 ${isSelected ? 'bg-[var(--success)]' : 'bg-[var(--bg-secondary)]'}`}>
          <Syringe className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[var(--text-muted)]'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm ${isSelected ? 'text-[var(--success)]' : 'text-[var(--text-primary)]'}`}>
            {factor.intervention}
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{factor.availability}</p>
          <p className="text-sm font-bold text-[var(--success)] mt-1">{factor.riskReduction}</p>
        </div>
      </div>
    </button>
  );
}

// ============================================================================
// CONNECTION CARD COMPONENT
// ============================================================================

function ConnectionCard({
  connection,
  isSelected,
  onClick,
}: {
  connection: MECFSConnection;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border transition-all ${
        isSelected
          ? 'bg-[var(--accent-orange-light)] border-l-4 border-l-[var(--accent-orange)] border-[var(--accent-orange)]'
          : 'bg-[var(--bg-card)] border-[var(--border)] hover:bg-[var(--bg-secondary)] border-l-4 border-l-transparent'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full flex-shrink-0 ${isSelected ? 'bg-[var(--accent-orange)]' : 'bg-[var(--bg-secondary)]'}`}>
          <Link2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[var(--text-muted)]'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm ${isSelected ? 'text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'}`}>
            {connection.finding}
          </h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {connection.sharedWith.map((condition, idx) => (
              <span
                key={idx}
                className="text-xs px-1.5 py-0.5 bg-[var(--bg-secondary)] text-[var(--text-muted)]"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

// ============================================================================
// DETAIL PANEL COMPONENT
// ============================================================================

function DetailPanel({ type, item }: { type: TabId; item: PostInfectiousRisk | ProtectiveFactor | MECFSConnection }) {
  if (type === 'risks') {
    const risk = item as PostInfectiousRisk;
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{risk.trigger}</h3>
          <p className="text-2xl font-bold text-[var(--danger)] mt-1">{risk.riskIncrease}</p>
          <p className="text-sm text-[var(--text-muted)]">{risk.timeframe}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
            Mechanism
          </h4>
          <p className="text-sm text-[var(--text-body)] whitespace-pre-line">
            <TextWithAbbreviations text={risk.mechanism} />
          </p>
        </div>

        {risk.evidence.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
              Key Evidence
            </h4>
            <div className="space-y-2">
              {risk.evidence.map((ev, idx) => (
                <div key={idx} className="p-2 bg-[var(--bg-secondary)] text-xs border-l-2 border-[var(--border)]">
                  <span className="font-semibold text-[var(--text-primary)]">{ev.study}: </span>
                  <span className="text-[var(--text-body)]">{ev.finding}</span>
                  {ev.effectSize && (
                    <span className="ml-2 text-[var(--danger)] font-semibold">({ev.effectSize})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {risk.preventionOptions.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-[var(--success)] uppercase tracking-wide mb-2">
              Prevention Options
            </h4>
            <ul className="space-y-1">
              {risk.preventionOptions.map((option, idx) => (
                <li key={idx} className="text-sm text-[var(--text-body)] flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] flex-shrink-0 mt-0.5" />
                  <span>{option}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {risk.keyInsight && (
          <div className="p-3 bg-[var(--danger-light)] border-l-4 border-[var(--danger)]">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[var(--danger)] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--text-body)]">{risk.keyInsight}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'protection') {
    const factor = item as ProtectiveFactor;
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{factor.intervention}</h3>
          <p className="text-2xl font-bold text-[var(--success)] mt-1">{factor.riskReduction}</p>
          <p className="text-sm text-[var(--text-muted)]">{factor.availability}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
            How It Works
          </h4>
          <p className="text-sm text-[var(--text-body)] whitespace-pre-line">
            <TextWithAbbreviations text={factor.mechanism} />
          </p>
        </div>

        {factor.evidence.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
              Key Evidence
            </h4>
            <div className="space-y-2">
              {factor.evidence.map((ev, idx) => (
                <div key={idx} className="p-2 bg-[var(--bg-secondary)] text-xs border-l-2 border-[var(--border)]">
                  <span className="font-semibold text-[var(--text-primary)]">{ev.study}: </span>
                  <span className="text-[var(--text-body)]">{ev.finding}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {factor.caveats && factor.caveats.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-[var(--accent-orange)] uppercase tracking-wide mb-2">
              Important Caveats
            </h4>
            <ul className="space-y-1">
              {factor.caveats.map((caveat, idx) => (
                <li key={idx} className="text-xs text-[var(--text-muted)] flex items-start gap-1.5">
                  <span className="text-[var(--accent-orange)] mt-0.5">*</span>
                  {caveat}
                </li>
              ))}
            </ul>
          </div>
        )}

        {factor.keyInsight && (
          <div className="p-3 bg-[var(--success-light)] border-l-4 border-[var(--success)]">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-[var(--success)] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--text-body)]">{factor.keyInsight}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ME/CFS connection
  const connection = item as MECFSConnection;
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-[var(--text-primary)]">{connection.finding}</h3>
        <div className="flex flex-wrap gap-1 mt-2">
          {connection.sharedWith.map((condition, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-[var(--accent-orange-light)] text-[var(--accent-orange)]"
            >
              {condition}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
          Implication
        </h4>
        <p className="text-sm text-[var(--text-body)] whitespace-pre-line">
          <TextWithAbbreviations text={connection.implication} />
        </p>
      </div>

      {connection.evidence.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
            Evidence
          </h4>
          <div className="space-y-2">
            {connection.evidence.map((ev, idx) => (
              <div key={idx} className="p-2 bg-[var(--bg-secondary)] text-xs border-l-2 border-[var(--border)]">
                <span className="font-semibold text-[var(--text-primary)]">{ev.study}: </span>
                <span className="text-[var(--text-body)]">{ev.finding}</span>
                {ev.effectSize && (
                  <span className="ml-2 text-[var(--accent-orange)] font-semibold">({ev.effectSize})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SUMMARY STAT COMPONENT
// ============================================================================

function SummaryStat({
  icon,
  value,
  label,
  variant = 'default',
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  variant?: 'default' | 'danger' | 'success';
}) {
  const colorClasses = {
    default: 'text-[var(--text-primary)]',
    danger: 'text-[var(--danger)]',
    success: 'text-[var(--success)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className={`w-12 h-12 mx-auto flex items-center justify-center mb-2 ${colorClasses[variant]}`}>
        {icon}
      </div>
      <div className={`text-4xl font-bold font-serif mb-1 ${colorClasses[variant]}`}>
        {value}
      </div>
      <div className="text-sm text-[var(--text-muted)] leading-snug">{label}</div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function EmergingRiskFactors() {
  const [activeTab, setActiveTab] = useState<TabId>('discoveries');
  const [selectedRiskId, setSelectedRiskId] = useState<string | null>(postInfectiousRisks[0]?.id || null);
  const [selectedProtectionId, setSelectedProtectionId] = useState<string | null>(protectiveFactors[0]?.id || null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(mecfsConnections[0]?.id || null);

  const summary = getPostInfectiousSummary();

  const selectedRisk = postInfectiousRisks.find(r => r.id === selectedRiskId);
  const selectedProtection = protectiveFactors.find(p => p.id === selectedProtectionId);
  const selectedConnection = mecfsConnections.find(c => c.id === selectedConnectionId);

  const getSelectedItem = () => {
    switch (activeTab) {
      case 'risks':
        return selectedRisk;
      case 'protection':
        return selectedProtection;
      case 'mecfs':
        return selectedConnection;
      default:
        return null;
    }
  };

  return (
    <Section id="why-now" className="bg-[var(--bg-secondary)]">
      <Container>
        <SectionHeader
          title="Why Now?"
          subtitle="A pivotal moment in Alzheimer's research"
        />

        {/* Hero statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <p className="text-xl md:text-2xl text-[var(--text-body)] leading-relaxed mb-6">
            In the last decade, a series of discoveries have{' '}
            <span className="font-semibold text-[var(--text-primary)]">fundamentally changed</span>{' '}
            what we know about Alzheimer&apos;s disease. The COVID-19 pandemic accelerated this shift,
            revealing connections that were hiding in plain sight.
          </p>
          <p className="text-lg text-[var(--accent-orange)] font-semibold">
            We now understand: AD may be an autoimmune vascular disease, not a proteinopathy.
            And we have tools to prevent it today.
          </p>
        </motion.div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-y border-[var(--border)]">
          <SummaryStat
            icon={<Zap className="w-6 h-6" />}
            value="91%"
            label="of AD patients have autoantibodies (vs 33% LBD)"
          />
          <SummaryStat
            icon={<TrendingUp className="w-6 h-6" />}
            value={summary.covidRiskIncrease}
            label="increased AD risk after COVID"
            variant="danger"
          />
          <SummaryStat
            icon={<Syringe className="w-6 h-6" />}
            value="17-45%"
            label="dementia reduction from vaccines"
            variant="success"
          />
          <SummaryStat
            icon={<Clock className="w-6 h-6" />}
            value="10-20yr"
            label="until Long COVID wave hits"
            variant="danger"
          />
        </div>

        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-1 border-b border-[var(--border)]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium transition-all relative flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeRiskTab"
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
            {/* Discoveries tab - full-width grid */}
            {activeTab === 'discoveries' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pivotalDiscoveries.map((discovery, index) => (
                  <motion.div
                    key={discovery.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <DiscoveryCard discovery={discovery} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Other tabs - two-panel layout */}
            {activeTab !== 'discoveries' && (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Card list */}
                <div className="lg:w-1/2">
                  <div className="space-y-2">
                    {activeTab === 'risks' &&
                      postInfectiousRisks.map((risk) => (
                        <RiskCard
                          key={risk.id}
                          risk={risk}
                          isSelected={selectedRiskId === risk.id}
                          onClick={() => setSelectedRiskId(risk.id)}
                        />
                      ))}
                    {activeTab === 'protection' &&
                      protectiveFactors.map((factor) => (
                        <ProtectionCard
                          key={factor.id}
                          factor={factor}
                          isSelected={selectedProtectionId === factor.id}
                          onClick={() => setSelectedProtectionId(factor.id)}
                        />
                      ))}
                    {activeTab === 'mecfs' &&
                      mecfsConnections.map((connection) => (
                        <ConnectionCard
                          key={connection.id}
                          connection={connection}
                          isSelected={selectedConnectionId === connection.id}
                          onClick={() => setSelectedConnectionId(connection.id)}
                        />
                      ))}
                  </div>
                </div>

                {/* Right: Detail panel */}
                <div className="lg:w-1/2">
                  {getSelectedItem() && (
                    <div className="bg-white border border-[var(--border)] p-6 sticky top-20">
                      <DetailPanel type={activeTab} item={getSelectedItem()!} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom takeaway */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-[var(--accent-orange-light)] border-l-4 border-[var(--accent-orange)] p-8 max-w-3xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <FlaskConical className="w-8 h-8 text-[var(--accent-orange)] flex-shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-xl text-[var(--text-primary)] mb-3">
                The Paradigm Is Shifting
              </h4>
              <p className="text-[var(--text-body)] leading-relaxed mb-4">
                These discoveries point to a{' '}
                <span className="font-semibold">unified autoimmune-vascular model</span> of Alzheimer&apos;s disease.
                COVID-19 has infected billions. If Long COVID drives AD via the same GPCR-AAB mechanisms seen in ME/CFS,
                we may face a massive wave of early-onset dementia in 10-20 years.
              </p>
              <p className="text-[var(--text-body)] leading-relaxed mb-4">
                The good news: we have tools today.{' '}
                <span className="font-semibold">Vaccines protect via trained immunity</span>, not just infection prevention.
                The dense-core plaque is a protective response. The prion hypothesis was wrong.
              </p>
              <p className="text-[var(--accent-orange)] font-semibold">
                This isn&apos;t fringe science. It&apos;s a fundamental rethinking of the disease.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
