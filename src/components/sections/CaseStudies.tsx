'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Calendar, DollarSign, AlertCircle, ChevronRight } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent, Button } from '@/components/ui';
import { caseStudies } from '@/data';

export function CaseStudies() {
  const [activeCase, setActiveCase] = useState(caseStudies[0].id);

  const currentCase = caseStudies.find((c) => c.id === activeCase) || caseStudies[0];

  return (
    <Section id="cases" className="bg-slate-950/50">
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
                <Card variant="highlighted" hover={false}>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {currentCase.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {currentCase.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {currentCase.cost}
                      </span>
                      <span className="px-2 py-1 rounded bg-slate-700 text-xs capitalize">
                        {currentCase.patentStatus}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-blue-400 uppercase tracking-wide mb-2">
                          Key Finding
                        </h4>
                        <p className="text-slate-300 text-lg">{currentCase.keyFinding}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-500/30">
                          <h4 className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4" />
                            What Should Happen
                          </h4>
                          <p className="text-slate-300">{currentCase.whatShouldHappen}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-red-900/20 border border-red-500/30">
                          <h4 className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            What Actually Happened
                          </h4>
                          <p className="text-slate-300">{currentCase.whatActuallyHappened}</p>
                        </div>
                      </div>

                      {currentCase.quote && (
                        <div className="mt-6 p-6 rounded-lg bg-slate-800/50 border-l-4 border-amber-500">
                          <Quote className="w-6 h-6 text-amber-500 mb-2" />
                          <blockquote className="text-slate-300 italic text-lg">
                            &ldquo;{currentCase.quote}&rdquo;
                          </blockquote>
                          {currentCase.quoteSource && (
                            <cite className="text-sm text-slate-500 mt-2 block not-italic">
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
                <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                  Other Cases
                </h4>
                {caseStudies
                  .filter((c) => c.id !== currentCase.id)
                  .map((study) => (
                    <motion.button
                      key={study.id}
                      className="w-full text-left p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors"
                      onClick={() => setActiveCase(study.id)}
                      whileHover={{ x: 4 }}
                    >
                      <h5 className="font-medium text-white mb-1">{study.drug}</h5>
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {study.keyFinding}
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
