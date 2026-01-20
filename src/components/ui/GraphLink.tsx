'use client';

import { useCallback } from 'react';
import { Network } from 'lucide-react';
import { useGraphSidebarOptional } from '@/contexts/GraphSidebarContext';
import { getPresetById } from '@/data/mechanisticFramework/presets';

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
 * Falls back gracefully if used outside of the SidebarLayoutWrapper context.
 */
export function GraphLink({
  presetId,
  label,
  variant = 'inline',
  className = '',
}: GraphLinkProps) {
  const context = useGraphSidebarOptional();
  const preset = getPresetById(presetId);

  const handleClick = useCallback(() => {
    if (!context) return;

    // Set the preset manually
    context.setPresetManually(presetId);

    // On mobile, open the modal
    if (window.innerWidth < 1280) {
      context.openMobileModal();
    } else {
      // On desktop, ensure sidebar is open
      context.setSidebarOpen(true);
    }
  }, [context, presetId]);

  // If no context or preset, render nothing
  if (!context || !preset) {
    return null;
  }

  const displayLabel = label || `View ${preset.label.split(' ')[0]}`;

  // Inline variant - minimal, flows with text
  if (variant === 'inline') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1 text-[var(--accent-orange)] hover:text-[var(--accent-orange)]/80 transition-colors text-sm ${className}`}
        title={`View ${preset.label} in the mechanistic graph`}
      >
        <Network className="w-3.5 h-3.5" />
        <span className="underline underline-offset-2">{displayLabel}</span>
      </button>
    );
  }

  // Compact variant - small badge-like button
  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded transition-colors ${className}`}
        style={{
          backgroundColor: `${preset.color}15`,
          color: preset.color,
        }}
        title={`View ${preset.label} in the mechanistic graph`}
      >
        <Network className="w-3 h-3" />
        {displayLabel}
      </button>
    );
  }

  // Button variant - more prominent
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded transition-colors hover:bg-[var(--bg-secondary)] ${className}`}
      style={{
        borderColor: preset.color,
        color: preset.color,
      }}
      title={`View ${preset.label} in the mechanistic graph`}
    >
      <Network className="w-4 h-4" />
      {displayLabel}
    </button>
  );
}
