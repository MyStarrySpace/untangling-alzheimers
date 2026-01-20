'use client';

import { useState, useRef, useEffect, useCallback, memo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { cn } from '@/lib/cn';

interface TooltipProps {
  /** The content shown in the tooltip */
  content: ReactNode;
  /** The element that triggers the tooltip on hover */
  children: ReactNode;
  /** Visual variant */
  variant?: 'dark' | 'light';
  /** Position preference */
  position?: 'top' | 'bottom';
  /** Additional className for the wrapper */
  className?: string;
  /** Max width of tooltip */
  maxWidth?: number;
}

/**
 * Unified Tooltip component with consistent styling across the app.
 * Uses portal rendering to avoid clipping issues.
 */
export const Tooltip = memo(function Tooltip({
  content,
  children,
  variant = 'dark',
  position = 'top',
  className,
  maxWidth = 280,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Calculate position
    let top: number;
    if (position === 'top') {
      top = rect.top + scrollY - 8;
    } else {
      top = rect.bottom + scrollY + 8;
    }

    setCoords({
      top,
      left: rect.left + rect.width / 2 + scrollX,
    });
  }, [position]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      // Update on scroll/resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible, updatePosition]);

  const variantStyles = {
    dark: {
      bg: 'bg-[var(--text-primary)]',
      text: 'text-white',
      border: '',
      arrow: 'border-t-[var(--text-primary)]',
      arrowBottom: 'border-b-[var(--text-primary)]',
    },
    light: {
      bg: 'bg-white',
      text: 'text-[var(--text-primary)]',
      border: 'border border-[var(--border)] shadow-lg',
      arrow: 'border-t-white',
      arrowBottom: 'border-b-white',
    },
  };

  const styles = variantStyles[variant];

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, y: position === 'top' ? 4 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? 4 : -4 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'fixed z-[9999] px-3 py-2 text-sm rounded-md pointer-events-none',
            styles.bg,
            styles.text,
            styles.border
          )}
          style={{
            top: coords.top,
            left: coords.left,
            transform: position === 'top' ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
            maxWidth,
          }}
        >
          {content}
          {/* Arrow */}
          <span
            className={cn(
              'absolute left-1/2 -translate-x-1/2 border-4 border-transparent',
              position === 'top' ? `top-full ${styles.arrow}` : `bottom-full ${styles.arrowBottom}`
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <span
      ref={triggerRef}
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {mounted && createPortal(tooltipContent, document.body)}
    </span>
  );
});

/**
 * InfoTooltip - A small info icon with tooltip, used for citing sources
 */
interface InfoTooltipProps {
  /** Main text to display */
  content: ReactNode;
  /** Optional source/citation info */
  source?: string;
  /** Optional link URL */
  href?: string;
  /** Icon size */
  size?: 'sm' | 'md';
  /** Additional className */
  className?: string;
}

export const InfoTooltip = memo(function InfoTooltip({
  content,
  source,
  href,
  size = 'sm',
  className,
}: InfoTooltipProps) {
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
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    setCoords({
      top: rect.top + scrollY - 8,
      left: rect.left + rect.width / 2 + scrollX,
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

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="fixed z-[9999] w-72 p-3 bg-white border border-[var(--border)] rounded-md shadow-lg text-left"
          style={{
            top: coords.top,
            left: coords.left,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {/* Main content */}
          <p className="text-sm text-[var(--text-body)] leading-relaxed">{content}</p>

          {/* Source citation */}
          {source && (
            <p className="mt-2 pt-2 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
              Source: {source}
            </p>
          )}

          {/* Link */}
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs text-[var(--chart-secondary)] hover:underline"
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
    <span
      ref={triggerRef}
      className={cn('inline-flex items-center cursor-help', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Info
        className={cn(
          iconSize,
          'text-[var(--text-muted)] hover:text-[var(--accent-orange)] transition-colors'
        )}
      />
      {mounted && createPortal(tooltipContent, document.body)}
    </span>
  );
});

/**
 * SourceTooltip - Combines a value/text with an info icon tooltip
 * Used for citing statistics with their sources
 */
interface SourceTooltipProps {
  /** The main value or text to display */
  children: ReactNode;
  /** Tooltip content explaining the source */
  content: ReactNode;
  /** Source citation text */
  source?: string;
  /** Link to the source */
  href?: string;
  /** Additional className for the wrapper */
  className?: string;
}

export const SourceTooltip = memo(function SourceTooltip({
  children,
  content,
  source,
  href,
  className,
}: SourceTooltipProps) {
  return (
    <span className={cn('inline-flex items-baseline gap-1', className)}>
      <span>{children}</span>
      <InfoTooltip content={content} source={source} href={href} size="sm" />
    </span>
  );
});
