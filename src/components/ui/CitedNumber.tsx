'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { investmentSources } from '@/data';

// Source IDs that can be used with this component
export type SourceId = keyof typeof investmentSources;

interface CitedNumberProps {
  children: React.ReactNode;
  sourceId: SourceId;
  keyFinding?: string; // Override the default keyFinding from the source
  className?: string;
}

export const CitedNumber = memo(function CitedNumber({ children, sourceId, keyFinding, className = '' }: CitedNumberProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
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

  // Look up source by ID
  const source = investmentSources[sourceId];
  if (!source) {
    console.warn(`CitedNumber: Unknown sourceId "${sourceId}"`);
    return <span className={className}>{children}</span>;
  }

  // Extract source properties
  const title = source.title;
  const authors = 'authors' in source ? source.authors : undefined;
  const journal = 'journal' in source ? source.journal : undefined;
  const year = source.year;
  const pmid = 'pmid' in source ? source.pmid : undefined;
  const doi = 'doi' in source ? source.doi : undefined;
  const url = 'url' in source ? source.url : undefined;
  const defaultKeyFinding = source.keyFindings?.[0];

  // Use provided keyFinding or fall back to first from source
  const displayKeyFinding = keyFinding || defaultKeyFinding;

  // Build citation link
  const citationLink = pmid
    ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
    : doi
    ? `https://doi.org/${doi}`
    : url;

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="fixed w-72 p-3 bg-white border border-[var(--border)] rounded-md shadow-lg text-left"
          style={{
            top: coords.top,
            left: coords.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {/* Source info */}
          <p className="text-xs font-medium text-[var(--text-primary)] mb-1 leading-tight">
            {title}
          </p>
          {authors && (
            <p className="text-[10px] text-[var(--text-muted)] mb-1">
              {authors}
            </p>
          )}
          <p className="text-[10px] text-[var(--text-muted)]">
            {journal && `${journal}, `}{year}
            {pmid && ` • PMID: ${pmid}`}
          </p>

          {/* Key finding if provided */}
          {displayKeyFinding && (
            <p className="text-[10px] text-[var(--accent-orange)] mt-2 pt-2 border-t border-[var(--border)] italic">
              &quot;{displayKeyFinding}&quot;
            </p>
          )}

          {/* Link */}
          {citationLink && (
            <a
              href={citationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-[10px] text-[var(--chart-secondary)] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View source →
            </a>
          )}

          {/* Arrow */}
          <span className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-white" />
          <span
            className="absolute left-1/2 -translate-x-1/2 top-full mt-[-1px] border-4 border-transparent border-t-[var(--border)]"
            style={{ zIndex: -1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      {/* The number */}
      <span>{children}</span>

      {/* Info icon with tooltip */}
      <span
        ref={iconRef}
        className="relative inline-flex items-center cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Info
          className="w-3.5 h-3.5 text-[var(--text-muted)] hover:text-[var(--accent-orange)] transition-colors"
          style={{ verticalAlign: 'text-top' }}
        />
        {mounted && createPortal(tooltipContent, document.body)}
      </span>
    </span>
  );
});
