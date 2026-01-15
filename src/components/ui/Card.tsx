'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted' | 'warning' | 'success' | 'danger';
  hover?: boolean;
}

const variantClasses = {
  default: 'bg-white border-[var(--border)]',
  highlighted: 'bg-[var(--accent-orange-light)] border-[var(--accent-orange)]',
  warning: 'bg-amber-50 border-amber-300',
  success: 'bg-[var(--success-light)] border-[var(--success)]',
  danger: 'bg-[var(--danger-light)] border-[var(--danger)]',
};

export function Card({ children, className, variant = 'default', hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        'border p-6',
        variantClasses[variant],
        hover && 'transition-all hover:shadow-md hover:-translate-y-0.5',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

// Accent colors for DataCard takeaway text
const takeawayColors = {
  teal: '#007385',
  warning: '#b38600',
  pink: '#C3577F',
  orange: '#e36216',
  danger: 'var(--danger)',
};

interface DataCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  callout?: {
    text: React.ReactNode;
    color?: keyof typeof takeawayColors;
  };
  className?: string;
}

/**
 * DataCard - Consistent card for data visualizations and statistics.
 * Used throughout TrialBarriers and similar sections for charts, comparisons, and metrics.
 * Features: No rounded corners, consistent padding, typographic takeaway pinned to bottom.
 */
export function DataCard({ title, description, children, callout, className }: DataCardProps) {
  const takeawayColor = callout ? takeawayColors[callout.color || 'teal'] : null;

  return (
    <motion.div
      className={cn('bg-white border border-[var(--border)] p-5 flex flex-col', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h5 className="font-semibold text-[var(--text-primary)] mb-1 text-sm">{title}</h5>
      {description && (
        <p className="text-xs text-[var(--text-muted)] mb-3">{description}</p>
      )}
      <div className="data-card-content flex-1">{children}</div>
      {callout && takeawayColor && (
        <p
          className="mt-4 pt-3 border-t border-[var(--border)] text-sm font-medium leading-snug"
          style={{ color: takeawayColor }}
        >
          {callout.text}
        </p>
      )}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('text-[var(--text-body)]', className)}>{children}</div>;
}
