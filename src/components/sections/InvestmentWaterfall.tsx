'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent } from '@/components/ui';
import { investmentData, comparisonData } from '@/data';
import { formatCurrency } from '@/lib/utils';

export function InvestmentWaterfall() {
  return (
    <Section id="paradox">
      <Container>
        <SectionHeader
          title="The Investment Asymmetry"
          subtitle="The drugs that receive investment are selected based on patent status, not scientific promise."
        />

        {/* Waterfall visualization */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-16">
            {/* Patented bar */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              style={{ transformOrigin: 'bottom' }}
            >
              <div className="relative">
                <motion.div
                  className="w-32 sm:w-40 bg-gradient-to-t from-[var(--category-amyloid)] to-blue-300 rounded-t-lg"
                  style={{ height: '300px' }}
                  initial={{ height: 0 }}
                  whileInView={{ height: 300 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <DollarSign className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-2xl sm:text-3xl font-bold font-mono block">
                        {formatCurrency(investmentData.patented.total, true)}
                      </span>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -top-8 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <TrendingUp className="w-6 h-6 text-[var(--category-amyloid)]" />
                </motion.div>
              </div>
              <p className="mt-4 text-[var(--text-primary)] font-semibold">{investmentData.patented.label}</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {investmentData.patented.examples.join(', ')}
              </p>
            </motion.div>

            {/* Ratio indicator */}
            <motion.div
              className="text-center py-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-4xl sm:text-5xl font-bold font-mono text-[var(--accent-orange)]">
                {investmentData.ratio}:1
              </span>
              <p className="text-[var(--text-muted)] mt-2">Investment Ratio</p>
            </motion.div>

            {/* Generic bar */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              viewport={{ once: true }}
              style={{ transformOrigin: 'bottom' }}
            >
              <div className="relative h-[300px] flex items-end">
                <motion.div
                  className="w-32 sm:w-40 bg-gradient-to-t from-[var(--success)] to-emerald-300 rounded-t-lg flex items-center justify-center"
                  initial={{ height: 0 }}
                  whileInView={{ height: 3 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  style={{ minHeight: '3px' }}
                />
                <motion.div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="text-xl sm:text-2xl font-bold font-mono text-[var(--success)] block">
                    {formatCurrency(investmentData.generic.total, true)}
                  </span>
                  <TrendingDown className="w-5 h-5 text-[var(--success)] mx-auto mt-1" />
                </motion.div>
              </div>
              <p className="mt-4 text-[var(--text-primary)] font-semibold">{investmentData.generic.label}</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {investmentData.generic.examples.join(', ')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card variant="default" hover={false}>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Category</th>
                      <th className="text-left py-3 px-4 text-[var(--category-amyloid)] font-medium">Patented Drugs</th>
                      <th className="text-left py-3 px-4 text-[var(--success)] font-medium">Generic/Supplement</th>
                      <th className="text-left py-3 px-4 text-[var(--accent-orange)] font-medium">Delta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <motion.tr
                        key={row.category}
                        className="border-b border-[var(--border)] last:border-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <td className="py-3 px-4 text-[var(--text-primary)] font-medium">{row.category}</td>
                        <td className="py-3 px-4 text-[var(--text-body)]">{row.patented}</td>
                        <td className="py-3 px-4 text-[var(--text-body)]">{row.generic}</td>
                        <td className="py-3 px-4 text-[var(--accent-orange)] font-mono">{row.delta || '—'}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
}
