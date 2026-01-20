'use client';

import { useState, Fragment, useMemo, memo, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top + window.scrollY - 8,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
  }, []);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible, updatePosition]);

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="fixed px-3 py-1.5 bg-[var(--text-primary)] text-white text-sm rounded-md whitespace-nowrap shadow-lg pointer-events-none"
          style={{
            top: coords.top,
            left: coords.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
          }}
        >
          {full}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--text-primary)]" />
        </motion.span>
      )}
    </AnimatePresence>
  );

  return (
    <span
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="underline decoration-dotted decoration-[var(--text-muted)] underline-offset-2 cursor-help">
        {abbr}
      </span>
      {mounted && createPortal(tooltipContent, document.body)}
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
