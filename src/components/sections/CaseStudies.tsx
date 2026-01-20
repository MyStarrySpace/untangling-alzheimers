'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Calendar, DollarSign, AlertCircle, ChevronRight } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent, TextWithAbbreviations, GraphLink } from '@/components/ui';
import { caseStudies, getSection } from '@/data';
import { getPresetForCaseStudy } from '@/data/sectionPresetMapping';

const sectionConfig = getSection('cases')!;

export function CaseStudies() {
  const [activeCase, setActiveCase] = useState(caseStudies[0].id);

  const currentCase = caseStudies.find((c) => c.id === activeCase) || caseStudies[0];

  return (
    <Section id={sectionConfig.id} className="bg-[var(--bg-secondary)]">
      <Container>
        <SectionHeader
          title={sectionConfig.title}
          subtitle={sectionConfig.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Card variant="default" hover={false}>
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCase.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                      {currentCase.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {currentCase.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {currentCase.cost}
                      </span>
                      <span className="px-2 py-1 bg-[var(--bg-secondary)] text-xs capitalize">
                        {currentCase.patentStatus}
                      </span>
                      {/* Graph link - show if this case has a preset mapping */}
                      {getPresetForCaseStudy(currentCase.id) && (
                        <GraphLink
                          presetId={getPresetForCaseStudy(currentCase.id)!}
                          variant="compact"
                          label="View pathway"
                        />
                      )}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
                          Key Finding
                        </h4>
                        <p className="text-[var(--text-body)] text-lg">
                          <TextWithAbbreviations text={currentCase.keyFinding} />
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-[var(--success-light)] border-l-4 border-[var(--success)]">
                          <h4 className="text-sm font-semibold text-[var(--success)] mb-2 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4" />
                            What Should Happen
                          </h4>
                          <p className="text-[var(--text-body)] text-sm">
                            <TextWithAbbreviations text={currentCase.whatShouldHappen} />
                          </p>
                        </div>
                        <div className="p-4 bg-[var(--danger-light)] border-l-4 border-[var(--danger)]">
                          <h4 className="text-sm font-semibold text-[var(--danger)] mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            What Actually Happened
                          </h4>
                          <p className="text-[var(--text-body)] text-sm">
                            <TextWithAbbreviations text={currentCase.whatActuallyHappened} />
                          </p>
                        </div>
                      </div>

                      {currentCase.quote && (
                        <div className="mt-6 p-6 bg-[var(--accent-orange-light)] border-l-4 border-[var(--accent-orange)]">
                          <Quote className="w-5 h-5 text-[var(--accent-orange)] mb-2" />
                          <blockquote className="text-[var(--text-body)] italic">
                            &ldquo;{currentCase.quote}&rdquo;
                          </blockquote>
                          {currentCase.quoteSource && (
                            <cite className="text-sm text-[var(--text-muted)] mt-2 block not-italic">
                              — {currentCase.quoteSource}
                            </cite>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with all cases */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-4 pl-4">
              Case Studies
            </h4>
            <div>
              {caseStudies.map((study, index) => {
                const isActive = study.id === currentCase.id;
                return (
                  <button
                    key={study.id}
                    className={`w-full text-left p-4 transition-colors ${
                      index > 0 ? 'border-t border-[var(--border)]' : ''
                    } ${isActive ? 'bg-[var(--bg-secondary)] border-r-4 border-r-[var(--accent-orange)]' : 'hover:bg-[var(--bg-secondary)]'}`}
                    onClick={() => setActiveCase(study.id)}
                  >
                    <h5 className={`font-medium mb-0.5 ${isActive ? 'text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'}`}>
                      {study.drug}
                    </h5>
                    <p className="text-xs text-[var(--text-muted)]">
                      {study.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
