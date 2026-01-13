'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  FlaskConical,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  ArrowDown,
  User,
  Building2,
} from 'lucide-react';
import { Container, Section, SectionHeader, TextWithAbbreviations } from '@/components/ui';
import { getTimelineEras, TimelineEvent, TimelineEventType, FrameworkId } from '@/data';

// Event type icons
function getEventIcon(type: TimelineEventType) {
  switch (type) {
    case 'discovery':
      return <Lightbulb className="w-4 h-4" />;
    case 'hypothesis':
      return <FlaskConical className="w-4 h-4" />;
    case 'milestone':
      return <CheckCircle className="w-4 h-4" />;
    case 'failure':
      return <TrendingDown className="w-4 h-4" />;
    case 'scandal':
      return <AlertTriangle className="w-4 h-4" />;
    case 'approval':
      return <CheckCircle className="w-4 h-4" />;
    case 'rejection':
      return <XCircle className="w-4 h-4" />;
    default:
      return <Lightbulb className="w-4 h-4" />;
  }
}

// Framework display info with explicit Tailwind classes (for JIT compilation)
const frameworkInfo: Record<string, { label: string; borderColor: string; bgHover: string; dot: string; textColor: string }> = {
  amyloid: {
    label: 'Amyloid',
    borderColor: 'border-l-[var(--category-amyloid)]',
    bgHover: 'hover:bg-blue-50',
    dot: 'bg-[var(--category-amyloid)]',
    textColor: 'text-blue-600',
  },
  cholinergic: {
    label: 'Cholinergic',
    borderColor: 'border-l-[#10b981]', // emerald-500
    bgHover: 'hover:bg-emerald-50',
    dot: 'bg-[#10b981]',
    textColor: 'text-emerald-600',
  },
  tau: {
    label: 'Tau',
    borderColor: 'border-l-[#f59e0b]', // amber-500
    bgHover: 'hover:bg-amber-50',
    dot: 'bg-[#f59e0b]',
    textColor: 'text-amber-600',
  },
  vascular: {
    label: 'Vascular',
    borderColor: 'border-l-[var(--category-vascular)]',
    bgHover: 'hover:bg-purple-50',
    dot: 'bg-[var(--category-vascular)]',
    textColor: 'text-purple-600',
  },
  metabolic: {
    label: 'Metabolic',
    borderColor: 'border-l-[var(--category-metabolic)]',
    bgHover: 'hover:bg-orange-50',
    dot: 'bg-[var(--category-metabolic)]',
    textColor: 'text-orange-600',
  },
  mitochondrial: {
    label: 'Mitochondrial',
    borderColor: 'border-l-[var(--category-mitochondrial)]',
    bgHover: 'hover:bg-cyan-50',
    dot: 'bg-[var(--category-mitochondrial)]',
    textColor: 'text-cyan-600',
  },
  lysosomal: {
    label: 'Lysosomal',
    borderColor: 'border-l-[var(--category-lysosomal)]',
    bgHover: 'hover:bg-emerald-50',
    dot: 'bg-[var(--category-lysosomal)]',
    textColor: 'text-emerald-600',
  },
  infection: {
    label: 'Infection',
    borderColor: 'border-l-[#ef4444]', // red-500
    bgHover: 'hover:bg-red-50',
    dot: 'bg-[#ef4444]',
    textColor: 'text-red-600',
  },
  neuroinflammation: {
    label: 'Neuroinflammation',
    borderColor: 'border-l-[#ec4899]', // pink-500
    bgHover: 'hover:bg-pink-50',
    dot: 'bg-[#ec4899]',
    textColor: 'text-pink-600',
  },
  myelin: {
    label: 'Myelin',
    borderColor: 'border-l-[var(--category-myelin)]',
    bgHover: 'hover:bg-pink-50',
    dot: 'bg-[var(--category-myelin)]',
    textColor: 'text-pink-600',
  },
  null: {
    label: 'General',
    borderColor: 'border-l-[var(--text-muted)]',
    bgHover: 'hover:bg-gray-50',
    dot: 'bg-[var(--text-muted)]',
    textColor: 'text-[var(--text-muted)]',
  },
};

// Get framework info, defaulting to null for general events
function getFrameworkInfo(framework: FrameworkId) {
  return frameworkInfo[framework || 'null'];
}

// Event card component
function EventCard({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const info = getFrameworkInfo(event.framework);
  const hasResearcher = !!event.researcher;

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Event card */}
      <div
        className={`border border-l-4 ${info.borderColor} rounded-r-lg p-5 cursor-pointer transition-all ${info.bgHover}
          ${hasResearcher
            ? 'bg-gradient-to-r from-amber-50 to-white border-amber-200 shadow-md ring-1 ring-amber-100'
            : 'bg-white border-[var(--border)]'}`}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-serif font-bold text-[var(--text-primary)]">
              {event.year}
            </span>
            <span className={info.textColor}>{getEventIcon(event.type)}</span>
          </div>
          {event.expandedDescription && (
            <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Title */}
        <h4 className="text-[var(--text-primary)] font-semibold mb-2">
          <TextWithAbbreviations text={event.title} />
        </h4>

        {/* Description */}
        <AnimatePresence mode="wait">
          {expanded && event.expandedDescription ? (
            <motion.p
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-[var(--text-body)] text-sm leading-relaxed"
            >
              <TextWithAbbreviations text={event.expandedDescription} />
            </motion.p>
          ) : (
            <motion.p
              key="short"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[var(--text-muted)] text-sm"
            >
              <TextWithAbbreviations text={event.description} />
            </motion.p>
          )}
        </AnimatePresence>

        {/* Researcher callout */}
        {hasResearcher && (
          <div className="mt-4 pt-3 border-t border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <User className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {event.researcher!.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <Building2 className="w-3 h-3" />
                  <span>{event.researcher!.institution}</span>
                </div>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                  {event.researcher!.hypothesis}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Era section component
function EraSection({
  era,
  eraIndex,
}: {
  era: ReturnType<typeof getTimelineEras>[0];
  eraIndex: number;
}) {
  const [isCollapsed, setIsCollapsed] = useState(eraIndex > 1);

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Era header */}
      <button
        className="w-full flex items-center justify-between gap-4 mb-6 group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent w-12" />
          <div className="text-left">
            <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-orange)] transition-colors font-serif">
              {era.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              {era.startYear}–{era.endYear}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-muted)]">
            {era.events.length} events
          </span>
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
          ) : (
            <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
          )}
        </div>
      </button>

      {/* Era description */}
      <motion.p
        className="text-[var(--text-muted)] mb-6 max-w-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <TextWithAbbreviations text={era.description} />
      </motion.p>

      {/* Events */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-0"
          >
            {era.events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HistoricalTimeline() {
  const eras = getTimelineEras();
  const [activeFilter, setActiveFilter] = useState<FrameworkId | 'all'>('all');
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current || !sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const filterRect = filterRef.current.getBoundingClientRect();

      const shouldStick = sectionRect.top < 80 && sectionRect.bottom > filterRect.height + 100;
      setIsFilterSticky(shouldStick);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Skip to next section
  const skipToNextSection = () => {
    const nextSection = document.getElementById('trial-barriers');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter events based on selected framework
  const filterEvents = (events: TimelineEvent[]) => {
    if (activeFilter === 'all') return events;
    return events.filter(e => e.framework === activeFilter);
  };

  // Get filtered eras
  const filteredEras = eras
    .map(era => ({
      ...era,
      events: filterEvents(era.events),
    }))
    .filter(era => era.events.length > 0);

  // Count events by framework
  const allEvents = eras.flatMap(era => era.events);
  const frameworkCounts: Record<string, number> = {};
  Object.keys(frameworkInfo).forEach(fw => {
    if (fw === 'null') {
      frameworkCounts['general'] = allEvents.filter(e => e.framework === null).length;
    } else {
      frameworkCounts[fw] = allEvents.filter(e => e.framework === fw).length;
    }
  });

  // Get frameworks that have events
  const activeFrameworks = Object.keys(frameworkInfo).filter(
    fw => fw !== 'null' && frameworkCounts[fw] && frameworkCounts[fw] > 0
  );

  return (
    <Section id="timeline" className="bg-[var(--bg-secondary)]" ref={sectionRef}>
      <Container>
        <SectionHeader
          title="A Century of Search"
          subtitle="From the first case in 1906 to today's controversies—the long road that led us here."
        />

        {/* Sticky Filter Bar */}
        <div
          ref={filterRef}
          className={`
            ${isFilterSticky
              ? 'fixed top-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[var(--border)] py-2 shadow-sm'
              : 'relative mb-8'
            }
            transition-all duration-200
          `}
        >
          <div className={isFilterSticky ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}>
            <div className="flex items-center justify-between gap-4">
              {/* Section label */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Timeline
                </span>
                <span className="text-[var(--border)]">|</span>
              </div>

              {/* Filter controls */}
              <div className="flex-1 overflow-x-auto">
                <div className="flex items-center gap-1 min-w-max">
                  {/* All toggle */}
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`
                      px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded
                      ${activeFilter === 'all'
                        ? 'bg-[var(--text-primary)] text-white'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                      }
                    `}
                  >
                    All
                  </button>

                  <span className="text-[var(--border)] mx-1">·</span>

                  {/* Framework toggles */}
                  {activeFrameworks.map(framework => {
                    const info = frameworkInfo[framework];
                    const isActive = activeFilter === framework;
                    return (
                      <button
                        key={framework}
                        onClick={() => setActiveFilter(framework as FrameworkId)}
                        className={`
                          flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium
                          transition-all duration-200 rounded border
                          ${isActive
                            ? `bg-white ${info.textColor} border-current`
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border-transparent hover:bg-[var(--bg-secondary)]'
                          }
                        `}
                      >
                        <span className={`w-2 h-2 rounded-full ${info.dot}`} />
                        <span className="hidden sm:inline">{info.label}</span>
                        <span className="text-xs opacity-60">
                          {frameworkCounts[framework]}
                        </span>
                      </button>
                    );
                  })}

                  {/* General events toggle */}
                  {frameworkCounts['general'] > 0 && (
                    <>
                      <span className="text-[var(--border)] mx-1">·</span>
                      <button
                        onClick={() => setActiveFilter(null)}
                        className={`
                          flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium
                          transition-all duration-200 rounded border
                          ${activeFilter === null
                            ? 'bg-white text-[var(--text-primary)] border-[var(--text-muted)]'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border-transparent hover:bg-[var(--bg-secondary)]'
                          }
                        `}
                      >
                        <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]" />
                        <span className="hidden sm:inline">General</span>
                        <span className="text-xs opacity-60">
                          {frameworkCounts['general']}
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Skip to next section button */}
              <button
                onClick={skipToNextSection}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[var(--text-muted)]
                  hover:text-[var(--accent-orange)] hover:bg-[var(--bg-secondary)] rounded transition-all duration-200
                  whitespace-nowrap shrink-0"
              >
                <span className="hidden sm:inline">Skip</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Spacer when filter is sticky */}
        {isFilterSticky && <div className="h-12" />}

        {/* Timeline */}
        <div className="relative">
          {/* Eras */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter === 'all' ? 'all' : activeFilter || 'general'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredEras.length > 0 ? (
                filteredEras.map((era, index) => (
                  <EraSection key={era.id} era={era} eraIndex={index} />
                ))
              ) : (
                <div className="text-center py-12 text-[var(--text-muted)]">
                  No events match this filter.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Summary insight */}
        <motion.div
          className="mt-12 p-6 rounded-lg bg-[var(--accent-orange-light)] border border-[var(--accent-orange)] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[var(--accent-orange)] text-lg font-medium">
            Over 100 years of research. Billions of dollars invested. And a
            hypothesis that dominated for 30 years despite mounting evidence it
            was incomplete.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
