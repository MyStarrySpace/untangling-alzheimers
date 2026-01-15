'use client';

import { useState, useMemo } from 'react';
import type { BoundaryVariant } from '@/data/mechanisticFramework/types';

type ViewMode = 'simple' | 'graph' | 'table';

interface BoundaryVariantPanelProps {
  variants: BoundaryVariant[];
  defaultVariant?: string;
  selectedVariant: string | null;
  hoveredVariant: string | null;
  onVariantSelect: (variantId: string | null) => void;
  onVariantHover: (variantId: string | null) => void;
}

export function BoundaryVariantPanel({
  variants,
  defaultVariant,
  selectedVariant,
  hoveredVariant,
  onVariantSelect,
  onVariantHover,
}: BoundaryVariantPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('simple');

  // Active variant is either selected (locked) or hovered
  const activeVariant = selectedVariant || hoveredVariant || defaultVariant;
  const activeVariantData = useMemo(
    () => variants.find(v => v.id === activeVariant),
    [variants, activeVariant]
  );

  // Max magnitude for scaling the bar chart
  const maxMagnitude = useMemo(
    () => Math.max(...variants.map(v => v.effectMagnitude || 1)),
    [variants]
  );

  return (
    <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded p-3">
      {/* View mode toggle */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-medium text-[var(--text-muted)]">Variants</span>
        <div className="flex gap-1">
          {(['simple', 'graph', 'table'] as ViewMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-2 py-0.5 text-[10px] rounded ${
                viewMode === mode
                  ? 'bg-[var(--accent-orange)] text-white'
                  : 'bg-white border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent-orange)]'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Simple view - variant chips with hover/click */}
      {viewMode === 'simple' && (
        <div className="space-y-2">
          {/* Variant chips */}
          <div className="flex flex-wrap gap-1">
            {variants.map(variant => (
              <button
                key={variant.id}
                onClick={() => onVariantSelect(selectedVariant === variant.id ? null : variant.id)}
                onMouseEnter={() => onVariantHover(variant.id)}
                onMouseLeave={() => onVariantHover(null)}
                className={`px-2 py-1 text-[10px] rounded border transition-all ${
                  selectedVariant === variant.id
                    ? 'ring-2 ring-offset-1'
                    : hoveredVariant === variant.id
                    ? 'ring-1 ring-offset-1'
                    : ''
                }`}
                style={{
                  backgroundColor: variant.color ? `${variant.color}20` : '#f5f3f0',
                  borderColor: variant.color || '#e5e2dd',
                  color: variant.color || '#4a4a4a',
                  // Use CSS custom property for ring color
                  ['--tw-ring-color' as string]: variant.color || '#e36216',
                } as React.CSSProperties}
              >
                {variant.label}
                {selectedVariant === variant.id && ' ✓'}
              </button>
            ))}
          </div>

          {/* Active variant details */}
          {activeVariantData && (
            <div className="text-xs space-y-1 pt-2 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    activeVariantData.effectDirection === 'protective'
                      ? 'bg-[var(--success-light)] text-[var(--success)]'
                      : activeVariantData.effectDirection === 'risk'
                      ? 'bg-[var(--danger-light)] text-[var(--danger)]'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                  }`}
                >
                  {activeVariantData.effectDirection === 'protective' ? '↓ Protective' :
                   activeVariantData.effectDirection === 'risk' ? '↑ Risk' : '— Neutral'}
                </span>
                {activeVariantData.effectMagnitude && (
                  <span className="text-[var(--text-muted)]">
                    OR: {activeVariantData.effectMagnitude}x
                  </span>
                )}
                {activeVariantData.frequency && (
                  <span className="text-[var(--text-muted)]">
                    Freq: {(activeVariantData.frequency * 100).toFixed(0)}%
                  </span>
                )}
              </div>
              {activeVariantData.effectDescription && (
                <p className="text-[var(--text-body)]">{activeVariantData.effectDescription}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Graph view - horizontal bar chart */}
      {viewMode === 'graph' && (
        <div className="space-y-2">
          {variants.map(variant => {
            const magnitude = variant.effectMagnitude || 1;
            const isReference = magnitude === 1;
            const barWidth = isReference ? 50 : (magnitude / maxMagnitude) * 100;

            return (
              <div
                key={variant.id}
                onClick={() => onVariantSelect(selectedVariant === variant.id ? null : variant.id)}
                onMouseEnter={() => onVariantHover(variant.id)}
                onMouseLeave={() => onVariantHover(null)}
                className={`cursor-pointer transition-all ${
                  selectedVariant === variant.id || hoveredVariant === variant.id
                    ? 'ring-1 ring-offset-1 rounded'
                    : ''
                }`}
                style={{ ['--tw-ring-color' as string]: variant.color || '#e36216' } as React.CSSProperties}
              >
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="w-24 truncate text-[var(--text-body)]">{variant.label}</span>
                  <div className="flex-1 h-4 bg-[var(--bg-secondary)] rounded overflow-hidden">
                    <div
                      className="h-full rounded transition-all"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: variant.color || '#787473',
                        opacity: selectedVariant === variant.id || hoveredVariant === variant.id ? 1 : 0.7,
                      }}
                    />
                  </div>
                  <span className="w-12 text-right text-[var(--text-muted)]">
                    {magnitude}x
                  </span>
                </div>
              </div>
            );
          })}
          <div className="text-[10px] text-[var(--text-muted)] text-center pt-1 border-t border-[var(--border)]">
            Odds Ratio (relative to reference)
          </div>
        </div>
      )}

      {/* Table view - detailed comparison */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-1 text-[var(--text-muted)] font-medium">Variant</th>
                <th className="text-center py-1 text-[var(--text-muted)] font-medium">Effect</th>
                <th className="text-right py-1 text-[var(--text-muted)] font-medium">OR</th>
                <th className="text-right py-1 text-[var(--text-muted)] font-medium">Freq</th>
              </tr>
            </thead>
            <tbody>
              {variants.map(variant => (
                <tr
                  key={variant.id}
                  onClick={() => onVariantSelect(selectedVariant === variant.id ? null : variant.id)}
                  onMouseEnter={() => onVariantHover(variant.id)}
                  onMouseLeave={() => onVariantHover(null)}
                  className={`border-b border-[var(--border)] cursor-pointer transition-all ${
                    selectedVariant === variant.id
                      ? 'bg-[var(--accent-orange-light)]'
                      : hoveredVariant === variant.id
                      ? 'bg-[var(--bg-secondary)]'
                      : ''
                  }`}
                >
                  <td className="py-1.5">
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-1"
                      style={{ backgroundColor: variant.color || '#787473' }}
                    />
                    {variant.label}
                  </td>
                  <td className="text-center py-1.5">
                    <span
                      className={`px-1 rounded ${
                        variant.effectDirection === 'protective'
                          ? 'bg-[var(--success-light)] text-[var(--success)]'
                          : variant.effectDirection === 'risk'
                          ? 'bg-[var(--danger-light)] text-[var(--danger)]'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                      }`}
                    >
                      {variant.effectDirection === 'protective' ? '↓' :
                       variant.effectDirection === 'risk' ? '↑' : '—'}
                    </span>
                  </td>
                  <td className="text-right py-1.5 font-mono">
                    {variant.effectMagnitude || 1}x
                  </td>
                  <td className="text-right py-1.5 text-[var(--text-muted)]">
                    {variant.frequency ? `${(variant.frequency * 100).toFixed(0)}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lock indicator */}
      {selectedVariant && (
        <div className="mt-2 pt-2 border-t border-[var(--border)] flex justify-between items-center">
          <span className="text-[10px] text-[var(--text-muted)]">
            Locked: {variants.find(v => v.id === selectedVariant)?.label}
          </span>
          <button
            onClick={() => onVariantSelect(null)}
            className="text-[10px] text-[var(--accent-orange)] hover:underline"
          >
            Unlock
          </button>
        </div>
      )}
    </div>
  );
}
