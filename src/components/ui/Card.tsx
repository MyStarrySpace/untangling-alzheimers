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
  default: 'bg-slate-800/50 border-slate-700',
  highlighted: 'bg-blue-900/30 border-blue-500/50',
  warning: 'bg-amber-900/20 border-amber-500/50',
  success: 'bg-emerald-900/20 border-emerald-500/50',
  danger: 'bg-red-900/20 border-red-500/50',
};

export function Card({ children, className, variant = 'default', hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-xl border p-6 backdrop-blur-sm',
        variantClasses[variant],
        hover && 'transition-colors hover:border-slate-600',
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
  return <div className={cn('text-slate-300', className)}>{children}</div>;
}
