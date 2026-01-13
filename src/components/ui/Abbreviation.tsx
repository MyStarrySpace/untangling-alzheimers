'use client';

import { useState, Fragment, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { abbreviations, getAbbreviationPattern, type AbbreviationKey } from '@/data/abbreviations';

// Pre-compute regex at module level (only once)
const ABBREVIATION_REGEX = new RegExp(`(${getAbbreviationPattern()})`, 'g');

interface AbbreviationProps {
  abbr: string;
  full: string;
}

// Memoized abbreviation component to prevent unnecessary re-renders
export const Abbreviation = memo(function Abbreviation({ abbr, full }: AbbreviationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="underline decoration-dotted decoration-[var(--text-muted)] underline-offset-2 cursor-help">
        {abbr}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[var(--text-primary)] text-white text-sm rounded-md whitespace-nowrap z-50 shadow-lg pointer-events-none"
          >
            {full}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--text-primary)]" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
});

// Processes text and wraps known abbreviations with tooltip components
interface TextWithAbbreviationsProps {
  text: string;
  className?: string;
}

export const TextWithAbbreviations = memo(function TextWithAbbreviations({ text, className }: TextWithAbbreviationsProps) {
  const parts = useMemo(() => text.split(ABBREVIATION_REGEX), [text]);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part in abbreviations) {
          return (
            <Abbreviation
              key={`${part}-${index}`}
              abbr={part}
              full={abbreviations[part as AbbreviationKey]}
            />
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </span>
  );
});

// Re-export for convenience
export { abbreviations, type AbbreviationKey };
