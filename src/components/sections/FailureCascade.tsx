'use client';

import { motion } from 'framer-motion';
import { ArrowDown, AlertTriangle } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardHeader, CardContent } from '@/components/ui';
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
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card variant="warning" hover={false}>
            <CardContent>
              <div className="flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <div className="space-y-4 text-slate-300">
                  {failureCascadeNarrative.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Failure cascade flow */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-amber-500 to-red-500 hidden lg:block" />

          <div className="space-y-8">
            {marketFailures
              .sort((a, b) => a.order - b.order)
              .map((failure, index) => (
                <FailureNode key={failure.id} failure={failure} index={index} />
              ))}
          </div>
        </div>

        {/* The result */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-900/30 border border-red-500/50">
            <span className="text-red-400 font-mono text-lg">Result:</span>
            <span className="text-white font-bold text-lg">99% Trial Failure Rate</span>
          </div>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            The standard explanation is that the disease is complex. The real explanation
            is that the system is designed to fail.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}

interface FailureNodeProps {
  failure: (typeof marketFailures)[0];
  index: number;
}

function FailureNode({ failure, index }: FailureNodeProps) {
  const Icon = failure.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`flex items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Card */}
      <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
        <Card variant="default">
          <CardHeader>
            <div className={`flex items-center gap-3 ${isEven ? 'lg:justify-end' : ''}`}>
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-mono">0{failure.order}</span>
                <h3 className="text-lg font-bold text-white">{failure.title}</h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-3">{failure.description}</p>
            <p className="text-sm text-amber-400/80 italic">{failure.impact}</p>
          </CardContent>
        </Card>
      </div>

      {/* Center node */}
      <div className="hidden lg:flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-slate-700 border-2 border-blue-500 z-10" />
        {index < marketFailures.length - 1 && (
          <ArrowDown className="w-4 h-4 text-slate-600 my-2" />
        )}
      </div>

      {/* Spacer */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  );
}
