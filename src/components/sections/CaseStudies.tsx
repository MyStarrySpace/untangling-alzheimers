'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Calendar, DollarSign, AlertCircle, ChevronRight } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent, Button, TextWithAbbreviations } from '@/components/ui';
import { caseStudies } from '@/data';

export function CaseStudies() {
  const [activeCase, setActiveCase] = useState(caseStudies[0].id);

  const currentCase = caseStudies.find((c) => c.id === activeCase) || caseStudies[0];

  return (
    <Section id="cases" className="bg-[var(--bg-secondary)]">
      <Container>
        <SectionHeader
          title="Case Studies in Market Failure"
          subtitle="Real stories of promising treatments that were abandoned not for scientific reasons, but economic ones."
        />

        {/* Case selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {caseStudies.map((study) => (
            <Button
              key={study.id}
              variant={activeCase === study.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveCase(study.id)}
            >
              {study.drug}
            </Button>
          ))}
        </div>

        {/* Active case content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <Card variant="default" hover={false}>
                  <CardContent className="p-8">
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
                      <span className="px-2 py-1 rounded bg-[var(--bg-secondary)] text-xs capitalize">
                        {currentCase.patentStatus}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-[var(--category-amyloid)] uppercase tracking-wide mb-2">
                          Key Finding
                        </h4>
                        <p className="text-[var(--text-body)] text-lg">
                          <TextWithAbbreviations text={currentCase.keyFinding} />
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-[var(--success-light)] border border-[var(--success)]">
                          <h4 className="text-sm font-medium text-[var(--success)] mb-2 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4" />
                            What Should Happen
                          </h4>
                          <p className="text-[var(--text-body)]">
                            <TextWithAbbreviations text={currentCase.whatShouldHappen} />
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-[var(--danger-light)] border border-[var(--danger)]">
                          <h4 className="text-sm font-medium text-[var(--danger)] mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            What Actually Happened
                          </h4>
                          <p className="text-[var(--text-body)]">
                            <TextWithAbbreviations text={currentCase.whatActuallyHappened} />
                          </p>
                        </div>
                      </div>

                      {currentCase.quote && (
                        <div className="mt-6 p-6 rounded-lg bg-[var(--accent-orange-light)] border-l-4 border-[var(--accent-orange)]">
                          <Quote className="w-6 h-6 text-[var(--accent-orange)] mb-2" />
                          <blockquote className="text-[var(--text-body)] italic text-lg">
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
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar with other cases */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide">
                  Other Cases
                </h4>
                {caseStudies
                  .filter((c) => c.id !== currentCase.id)
                  .map((study) => (
                    <motion.button
                      key={study.id}
                      className="w-full text-left p-4 rounded-lg bg-white border border-[var(--border)] hover:border-[var(--accent-orange)] transition-colors"
                      onClick={() => setActiveCase(study.id)}
                      whileHover={{ x: 4 }}
                    >
                      <h5 className="font-medium text-[var(--text-primary)] mb-1">{study.drug}</h5>
                      <p className="text-sm text-[var(--text-muted)] line-clamp-2">
                        <TextWithAbbreviations text={study.keyFinding} />
                      </p>
                    </motion.button>
                  ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
}
