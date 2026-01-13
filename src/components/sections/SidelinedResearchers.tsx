'use client';

import { motion } from 'framer-motion';
import { User, Calendar, Lightbulb, ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent, TextWithAbbreviations } from '@/components/ui';
import { sidelinedResearchers } from '@/data';

export function SidelinedResearchers() {
  return (
    <Section id="researchers">
      <Container>
        <SectionHeader
          title="The Sidelined Researchers"
          subtitle="Behind each alternative hypothesis is a researcher who built their career on a theory that challenged amyloid primacy—and paid the price in marginalized funding."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sidelinedResearchers.map((researcher, index) => (
            <motion.div
              key={researcher.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ResearcherCard researcher={researcher} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card variant="highlighted" hover={false}>
            <CardContent>
              <p className="text-[var(--text-body)] text-lg">
                Each of these researchers proposed that amyloid was a{' '}
                <span className="text-[var(--accent-orange)] font-semibold">consequence</span>—not a{' '}
                <span className="text-[var(--accent-orange)] font-semibold">cause</span>—of upstream
                dysfunction. Each was marginalized as the field consolidated around the
                amyloid cascade hypothesis.{' '}
                <span className="text-[var(--text-primary)] font-semibold">Each may have been right.</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
}

interface ResearcherCardProps {
  researcher: (typeof sidelinedResearchers)[0];
}

function ResearcherCard({ researcher }: ResearcherCardProps) {
  return (
    <Card variant="default" className="h-full">
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--category-amyloid)] to-[var(--category-vascular)] flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--text-primary)]">{researcher.name}</h3>
            <p className="text-sm text-[var(--text-muted)]">{researcher.institution}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[var(--accent-orange)]" />
            <span className="text-[var(--accent-orange)] font-medium">{researcher.hypothesis}</span>
            <span className="text-xs text-[var(--text-muted)]">({researcher.year})</span>
          </div>

          <p className="text-sm text-[var(--text-body)]">
            <TextWithAbbreviations text={researcher.keyFinding} />
          </p>

          <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
            <ArrowRight className="w-4 h-4 text-[var(--category-amyloid)]" />
            <span className="text-xs text-[var(--text-muted)]">
              Cascade Stage {researcher.cascadeStage}:{' '}
              <span className="text-[var(--category-amyloid)]">{researcher.stageName}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
