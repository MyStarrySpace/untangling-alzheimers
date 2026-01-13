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
        'rounded-lg border p-6',
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
