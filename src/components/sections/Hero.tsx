'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToContent = () => {
    const contentSection = document.getElementById('paradox');
    contentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="flex items-center justify-center relative px-6 overflow-hidden"
      style={{
        minHeight: 'calc(100vh - 64px)',
        paddingBottom: '80px',
      }}
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="relative px-6 py-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight font-serif leading-tight"
          >
            Untangling Alzheimer&apos;s
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg text-[var(--text-muted)] max-w-2xl mx-auto"
          >
            The science, the system, and the search for a cure
          </motion.p>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <StatCard
              value="55 million+"
              label="People living with dementia worldwide (2020)"
            />
            <StatCard
              value="99%"
              label="Clinical trial failure rate (2002-2012)"
            />
            <StatCard
              value="~850:1"
              label="Novel molecule vs. repurposed drug trial ratio"
            />
            <StatCard
              value="$42.5 Billion"
              label="Cumulative private R&D expenditure (1995 - 2001)"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 1 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <span className="text-sm text-[var(--text-muted)] mb-2 group-hover:text-[var(--text-body)] transition-colors">
          Scroll to explore
        </span>
        <ChevronDown className="w-8 h-8 text-[var(--text-muted)] group-hover:text-[var(--text-body)] transition-colors" />
      </motion.button>
    </section>
  );
}

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-lg p-6 text-center">
      <span className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)] block">
        {value}
      </span>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{label}</p>
    </div>
  );
}
