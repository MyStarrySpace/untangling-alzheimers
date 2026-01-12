'use client';

import { cn } from '@/lib/cn';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  fullHeight?: boolean;
}

export function Section({ children, id, className, fullHeight = true }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 sm:py-24 lg:py-32',
        fullHeight && 'min-h-screen flex items-center',
        className
      )}
    >
      {children}
    </section>
  );
}
