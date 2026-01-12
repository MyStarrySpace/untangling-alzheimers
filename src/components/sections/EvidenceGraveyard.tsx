'use client';

import { motion } from 'framer-motion';
import { Skull, Calendar, BookOpen, ArrowRight, XCircle } from 'lucide-react';
import { Container, Section, SectionHeader } from '@/components/ui';
import { evidenceGraveyardData } from '@/data';

export function EvidenceGraveyard() {
  return (
    <Section id="graveyard" className="bg-slate-950/50">
      <Container>
        <SectionHeader
          title="The Evidence Graveyard"
          subtitle="Promising interventions with substantial evidence—abandoned because they cannot generate profit."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evidenceGraveyardData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Tombstone {...item} />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-12 text-center text-slate-400 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Each of these interventions has evidence suggesting benefit—yet lacks
          the funding infrastructure needed for confirmatory trials.
        </motion.p>
      </Container>
    </Section>
  );
}

interface TombstoneProps {
  drug: string;
  evidence: string;
  year: number;
  source: string;
  shouldHappen: string;
  actuallyHappened: string;
}

function Tombstone({
  drug,
  evidence,
  year,
  source,
  shouldHappen,
  actuallyHappened,
}: TombstoneProps) {
  return (
    <div className="relative group">
      {/* Tombstone shape */}
      <div className="bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-[100px] rounded-b-lg p-6 border border-slate-600 min-h-[320px] flex flex-col">
        {/* Cross/Skull icon */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <Skull className="w-8 h-8 text-slate-500" />
        </div>

        {/* Drug name */}
        <h3 className="text-xl font-bold text-white text-center mt-8 mb-4">{drug}</h3>

        {/* Evidence */}
        <p className="text-sm text-slate-300 text-center mb-4 flex-grow">{evidence}</p>

        {/* Year and source */}
        <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {year}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {source}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-600 pt-4">
          {/* What should happen vs what happened */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-emerald-400">
                <span className="font-medium">Should:</span> {shouldHappen}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-400">
                <span className="font-medium">Reality:</span> {actuallyHappened}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ground shadow */}
      <div className="h-2 bg-gradient-to-b from-slate-800 to-transparent rounded-b-lg" />
    </div>
  );
}
