'use client';

import { Network } from 'lucide-react';

interface GraphLinkProps {
  /** The preset ID to load when clicked */
  presetId: string;
  /** Optional custom label (defaults to preset name) */
  label?: string;
  /** Button variant */
  variant?: 'inline' | 'button' | 'compact';
  /** Additional class names */
  className?: string;
}

/**
 * Inline button that opens the graph sidebar with a specific preset.
 *
 * NOTE: Graph component is being rebuilt with Excel-based data.
 * This is a temporary placeholder that shows the link but doesn't do anything.
 */
export function GraphLink({
  presetId,
  label,
  variant = 'inline',
  className = '',
}: GraphLinkProps) {
  const displayLabel = label || 'View in Graph';

  // Inline variant - minimal, flows with text
  if (variant === 'inline') {
    return (
      <span
        className={`inline-flex items-center gap-1 text-[var(--text-muted)] text-sm cursor-not-allowed ${className}`}
        title="Graph is being rebuilt"
      >
        <Network className="w-3.5 h-3.5" />
        <span className="line-through">{displayLabel}</span>
      </span>
    );
  }

  // Compact variant - small badge-like button
  if (variant === 'compact') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded bg-[var(--bg-secondary)] text-[var(--text-muted)] cursor-not-allowed ${className}`}
        title="Graph is being rebuilt"
      >
        <Network className="w-3 h-3" />
        {displayLabel}
      </span>
    );
  }

  // Button variant - more prominent
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[var(--border)] rounded text-[var(--text-muted)] cursor-not-allowed ${className}`}
      title="Graph is being rebuilt"
    >
      <Network className="w-4 h-4" />
      {displayLabel}
    </span>
  );
}
