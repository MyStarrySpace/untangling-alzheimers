'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  fullHeight?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section({ children, id, className, fullHeight = true }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        data-section-id={id}
        className={cn(
          'relative py-24 sm:py-32 lg:py-40',
          fullHeight && 'min-h-screen flex items-center',
          className
        )}
      >
        {children}
      </section>
    );
  }
);
