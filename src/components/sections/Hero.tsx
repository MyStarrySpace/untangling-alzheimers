'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Brain, TrendingDown } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { keyStatistics } from '@/data';
import { formatNumber } from '@/lib/utils';

export function Hero() {
  return (
    <Section id="hero" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Brain className="w-16 h-16 mx-auto text-blue-500 mb-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
          >
            Alzheimer&apos;s Disease:
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Anatomy of Market Failure
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto"
          >
            Why the drugs that might help you will never be tested
          </motion.p>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <StatCard
              value={formatNumber(keyStatistics.globalPatients)}
              label="People affected globally"
              icon={<Brain className="w-5 h-5" />}
            />
            <StatCard
              value={`${keyStatistics.trialFailureRate}%`}
              label="Clinical trial failure rate"
              icon={<TrendingDown className="w-5 h-5" />}
              highlight
            />
            <StatCard
              value={`${keyStatistics.investmentRatio}:1`}
              label="Patent vs generic investment"
            />
            <StatCard
              value="3x"
              label="Projected increase by 2050"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 text-lg text-slate-500 max-w-2xl mx-auto"
          >
            This is not a failure of science.{' '}
            <span className="text-amber-500 font-medium">It is a failure of markets.</span>
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-slate-600" />
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

function StatCard({ value, label, icon, highlight }: StatCardProps) {
  return (
    <div className={`p-4 rounded-lg ${highlight ? 'bg-red-900/20 border border-red-500/30' : 'bg-slate-800/50'}`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        {icon && <span className={highlight ? 'text-red-400' : 'text-blue-400'}>{icon}</span>}
        <span className={`text-2xl sm:text-3xl font-bold font-mono ${highlight ? 'text-red-400' : 'text-white'}`}>
          {value}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-slate-400">{label}</p>
    </div>
  );
}
