'use client';

import { motion } from 'framer-motion';
import { Container, Section } from '@/components/ui';

/**
 * AlzheimerLegacy - A dramatic typographic intro section
 *
 * Presents Alzheimer's four original observations (1907) with bold typography,
 * contrasting what the field studied vs. ignored for over a century.
 */
export function AlzheimerLegacy() {
  return (
    <Section id="alzheimer-legacy" className="bg-[var(--bg-primary)] py-20 md:py-28">
      <Container>
        {/* Opening Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-24"
        >
          <p className="text-lg md:text-xl text-[var(--text-muted)] mb-4">
            In 1907, Alois Alzheimer described
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
            Four observations.
          </h2>
        </motion.div>

        {/* The Four Observations Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mb-20 md:mb-28">
          {/* Studied: Plaques */}
          <ObservationCard
            number="48,500"
            label="papers"
            title="Amyloid Plaques"
            quote="Minute miliary foci"
            status="studied"
            delay={0}
          />

          {/* Studied: Tangles */}
          <ObservationCard
            number="42,300"
            label="papers"
            title="Tau Tangles"
            quote="Striking changes of neurofibrils"
            status="studied"
            delay={0.1}
          />

          {/* Ignored: LDAM */}
          <ObservationCard
            number="87"
            label="papers"
            title="Lipid-Laden Microglia"
            quote="Many glia showing adipose saccules"
            status="ignored"
            ignoredYears={113}
            delay={0.2}
          />

          {/* Ignored: Clasmatodendrosis */}
          <ObservationCard
            number="70"
            label="papers"
            title="Astrocyte Damage"
            quote="Astrocyte distal process loss"
            status="ignored"
            ignoredYears={106}
            delay={0.3}
          />
        </div>

        {/* The Dramatic Contrast */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
            <div className="text-center">
              <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--chart-primary)]">
                90,800
              </span>
              <p className="text-sm text-[var(--text-muted)] mt-1">papers on two</p>
            </div>
            <span className="text-3xl md:text-4xl text-[var(--text-muted)] font-light">vs</span>
            <div className="text-center">
              <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--danger)]">
                157
              </span>
              <p className="text-sm text-[var(--text-muted)] mt-1">papers on two</p>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-[var(--text-body)] leading-relaxed mb-6">
            The field studied the <span className="text-[var(--chart-primary)] font-semibold">downstream symptoms</span>.
            <br className="hidden md:block" />
            It ignored the <span className="text-[var(--danger)] font-semibold">upstream causes</span> for over a century.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-[var(--accent-orange)] font-serif font-medium"
          >
            Alzheimer saw the whole picture. We chose to see only half.
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}

interface ObservationCardProps {
  number: string;
  label: string;
  title: string;
  quote: string;
  status: 'studied' | 'ignored';
  ignoredYears?: number;
  delay: number;
}

function ObservationCard({
  number,
  label,
  title,
  quote,
  status,
  ignoredYears,
  delay,
}: ObservationCardProps) {
  const isStudied = status === 'studied';
  const accentColor = isStudied ? 'var(--chart-primary)' : 'var(--danger)';
  const bgColor = isStudied ? 'rgba(72, 99, 147, 0.05)' : 'rgba(199, 81, 70, 0.05)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative p-8 md:p-10 border-l-4 transition-all"
      style={{
        borderColor: accentColor,
        backgroundColor: bgColor,
      }}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        {isStudied ? (
          <span className="text-xs font-medium px-2 py-1 bg-[var(--chart-primary)] text-white">
            HEAVILY STUDIED
          </span>
        ) : (
          <span className="text-xs font-medium px-2 py-1 bg-[var(--danger)] text-white">
            IGNORED {ignoredYears} YEARS
          </span>
        )}
      </div>

      {/* Big Number */}
      <div className="mb-4">
        <span
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight"
          style={{ color: accentColor }}
        >
          {number}
        </span>
        <span className="text-lg text-[var(--text-muted)] ml-2">{label}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-serif font-bold text-[var(--text-primary)] mb-3">
        {title}
      </h3>

      {/* Original Quote */}
      <p className="text-[var(--text-muted)] italic">
        &ldquo;{quote}&rdquo;
        <span className="not-italic text-xs ml-2">— Alzheimer, 1907</span>
      </p>
    </motion.div>
  );
}
