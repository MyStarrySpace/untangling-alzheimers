'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Clock, Heart } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent } from '@/components/ui';
import { keyStatistics } from '@/data';
import { formatNumber } from '@/lib/utils';

export function Stakes() {
  return (
    <Section id="stakes">
      <Container>
        <SectionHeader
          title="The Human Cost"
          subtitle="Behind every statistic is a person. Behind every failed trial is a family waiting for hope."
        />

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StakeCard
            icon={<Users className="w-8 h-8" />}
            value={formatNumber(keyStatistics.globalPatients)}
            label="People living with Alzheimer's today"
            color="blue"
          />
          <StakeCard
            icon={<TrendingUp className="w-8 h-8" />}
            value={formatNumber(keyStatistics.projectedBy2050)}
            label="Projected cases by 2050"
            color="amber"
          />
          <StakeCard
            icon={<Clock className="w-8 h-8" />}
            value="10+ years"
            label="Average time from discovery to trial"
            color="red"
          />
          <StakeCard
            icon={<Heart className="w-8 h-8" />}
            value="Immeasurable"
            label="Impact on families & caregivers"
            color="purple"
          />
        </div>

        {/* The alternative timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card variant="default" hover={false}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
                What If Funding Followed Evidence?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-[var(--accent-orange)]">The Current Reality</h4>
                  <ul className="space-y-3 text-[var(--text-body)]">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--danger)] mt-1">-</span>
                      <span>$50B+ invested in patented amyloid drugs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--danger)] mt-1">-</span>
                      <span>27-35% slowing of decline (best case)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--danger)] mt-1">-</span>
                      <span>$26,500/year per patient</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--danger)] mt-1">-</span>
                      <span>Treatment only after diagnosis</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-[var(--success)]">The Alternative</h4>
                  <ul className="space-y-3 text-[var(--text-body)]">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--success)] mt-1">+</span>
                      <span>Trials for TNF inhibitors, lithium, nebivolol</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--success)] mt-1">+</span>
                      <span>50-70% prevention potential (TNF data)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--success)] mt-1">+</span>
                      <span>$50-200/year per patient</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--success)] mt-1">+</span>
                      <span>Prevention before symptoms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-[var(--text-body)] max-w-3xl mx-auto mb-8">
            The goal is not to argue for any specific treatment, but to make visible
            the structural forces that shape—and distort—Alzheimer&apos;s research.
          </p>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            Understanding the system is the first step toward changing it.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}

interface StakeCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: 'blue' | 'amber' | 'red' | 'purple';
}

const colorClasses = {
  blue: 'text-[var(--category-amyloid)] bg-blue-50 border-[var(--category-amyloid)]',
  amber: 'text-[var(--accent-orange)] bg-[var(--accent-orange-light)] border-[var(--accent-orange)]',
  red: 'text-[var(--danger)] bg-[var(--danger-light)] border-[var(--danger)]',
  purple: 'text-[var(--category-vascular)] bg-purple-50 border-[var(--category-vascular)]',
};

function StakeCard({ icon, value, label, color }: StakeCardProps) {
  return (
    <motion.div
      className={`p-6 rounded-xl border ${colorClasses[color]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={`${colorClasses[color].split(' ')[0]} mb-4`}>{icon}</div>
      <div className="text-3xl font-bold text-[var(--text-primary)] font-mono mb-2">{value}</div>
      <p className="text-sm text-[var(--text-muted)]">{label}</p>
    </motion.div>
  );
}
