'use client';

import { motion } from 'framer-motion';
import { ArrowDown, AlertTriangle } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent } from '@/components/ui';
import { marketFailures, failureCascadeNarrative } from '@/data';

export function FailureCascade() {
  return (
    <Section id="system">
      <Container>
        <SectionHeader
          title="The Failure Cascade"
          subtitle="Each market failure reinforces the others, creating a system that systematically excludes the most promising interventions."
        />

        {/* Narrative intro */}
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card variant="highlighted" hover={false}>
            <CardContent>
              <div className="flex gap-4">
                <AlertTriangle className="w-6 h-6 text-[var(--accent-orange)] flex-shrink-0 mt-1" />
                <div className="space-y-4 text-[var(--text-body)]">
                  {failureCascadeNarrative.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Failure cascade - vertically stacked list */}
        <div className="max-w-2xl mx-auto space-y-4">
          {marketFailures
            .sort((a, b) => a.order - b.order)
            .map((failure, index) => (
              <FailureItem key={failure.id} failure={failure} index={index} isLast={index === marketFailures.length - 1} />
            ))}
        </div>

        {/* The result */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--danger-light)] border border-[var(--danger)]">
            <span className="text-[var(--danger)] font-mono text-lg">Result:</span>
            <span className="text-[var(--text-primary)] font-bold text-lg">99% Trial Failure Rate</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

interface FailureItemProps {
  failure: (typeof marketFailures)[0];
  index: number;
  isLast: boolean;
}

function FailureItem({ failure, index, isLast }: FailureItemProps) {
  const Icon = failure.icon;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        viewport={{ once: true }}
      >
        <Card variant="default" hover={false}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Number and icon */}
              <div className="flex-shrink-0 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-sm font-bold text-[var(--text-muted)]">
                  {failure.order}
                </span>
                <div className="w-10 h-10 rounded-lg bg-[var(--category-amyloid)]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[var(--category-amyloid)]" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{failure.title}</h3>
                <p className="text-sm text-[var(--text-body)] mb-2">{failure.description}</p>
                <p className="text-xs text-[var(--accent-orange)] italic">{failure.impact}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Arrow between items */}
      {!isLast && (
        <motion.div
          className="py-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.08 + 0.2 }}
          viewport={{ once: true }}
        >
          <ArrowDown className="w-5 h-5 text-[var(--text-muted)]" />
        </motion.div>
      )}
    </div>
  );
}
