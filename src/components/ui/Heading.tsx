'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface HeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  animate?: boolean;
}

const headingStyles = {
  h1: 'text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight',
  h2: 'text-3xl sm:text-4xl font-bold tracking-tight',
  h3: 'text-2xl sm:text-3xl font-semibold',
  h4: 'text-xl sm:text-2xl font-semibold',
};

export function Heading({ children, as = 'h2', className, animate = true }: HeadingProps) {
  const Component = as;

  if (!animate) {
    return (
      <Component className={cn(headingStyles[as], 'text-[var(--text-primary)]', className)}>
        {children}
      </Component>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Component className={cn(headingStyles[as], 'text-[var(--text-primary)]', className)}>
        {children}
      </Component>
    </motion.div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 text-center', className)}>
      <Heading as="h2">{title}</Heading>
      {subtitle && (
        <motion.p
          className="mt-4 text-lg text-[var(--text-muted)] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
