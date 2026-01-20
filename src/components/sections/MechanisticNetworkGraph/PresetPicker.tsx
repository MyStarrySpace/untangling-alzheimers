'use client';

import { useState, useMemo, useCallback } from 'react';
import { ChevronDown, ChevronRight, X, Pill, Heart, Lightbulb, XCircle, Activity } from 'lucide-react';
import {
  presetGroups,
  type PresetOption,
  type PresetCategory,
  type PresetGroup,
} from '@/data/mechanisticFramework/presets';

// ============================================================================
// TYPES
// ============================================================================

interface PresetPickerProps {
  /** Called when a preset is selected */
  onSelectPreset: (preset: PresetOption) => void;
  /** Called to close the picker */
  onClose: () => void;
  /** Currently selected preset ID */
  selectedPresetId?: string | null;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const CATEGORY_ICONS: Record<PresetCategory, typeof Pill> = {
  approved_drugs: Pill,
  failed_stage1: XCircle,
  failed_stage2: XCircle,
  failed_stage3: XCircle,
  lifestyle: Heart,
  hypotheses: Lightbulb,
};

const CATEGORY_COLORS: Record<PresetCategory, string> = {
  approved_drugs: '#5a8a6e',
  failed_stage1: '#c75146',
  failed_stage2: '#c75146',
  failed_stage3: '#c75146',
  lifestyle: '#34d399',
  hypotheses: '#a78bfa',
};

// ============================================================================
// COMPONENT
// ============================================================================

export function PresetPicker({
  onSelectPreset,
  onClose,
  selectedPresetId,
}: PresetPickerProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<PresetCategory>>(
    new Set(['hypotheses']) // Start with hypotheses expanded
  );

  const toggleCategory = useCallback((category: PresetCategory) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const handlePresetClick = useCallback((preset: PresetOption) => {
    onSelectPreset(preset);
  }, [onSelectPreset]);

  return (
    <div className="bg-white border border-[var(--border)] rounded shadow-lg w-[320px] max-h-[480px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
        <span className="text-sm font-medium text-[var(--text-primary)]">
          Load Preset
        </span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[var(--bg-secondary)] rounded transition-colors"
        >
          <X className="w-4 h-4 text-[var(--text-muted)]" />
        </button>
      </div>

      {/* Preset groups */}
      <div className="flex-1 overflow-y-auto">
        {presetGroups.map(group => {
          const Icon = CATEGORY_ICONS[group.category];
          const isExpanded = expandedCategories.has(group.category);
          const categoryColor = CATEGORY_COLORS[group.category];

          return (
            <div key={group.category} className="border-b border-[var(--border)] last:border-b-0">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(group.category)}
                className="w-full flex items-center gap-2 p-2.5 hover:bg-[var(--bg-secondary)] transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                )}
                <Icon
                  className="w-4 h-4"
                  style={{ color: categoryColor }}
                />
                <span className="text-sm font-medium text-[var(--text-primary)] flex-1 text-left">
                  {group.label}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {group.options.length}
                </span>
              </button>

              {/* Category options */}
              {isExpanded && (
                <div className="pb-1">
                  {group.options.map(preset => {
                    const isSelected = selectedPresetId === preset.id;

                    return (
                      <button
                        key={preset.id}
                        onClick={() => handlePresetClick(preset)}
                        className={`w-full text-left px-4 py-2 transition-all ${
                          isSelected
                            ? 'bg-[var(--accent-orange-light)] border-l-2 border-[var(--accent-orange)]'
                            : 'hover:bg-[var(--bg-secondary)] border-l-2 border-transparent'
                        }`}
                      >
                        {/* Preset name with color indicator */}
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: preset.color }}
                          />
                          <span className="text-sm text-[var(--text-primary)]">
                            {preset.label}
                          </span>
                        </div>

                        {/* Description */}
                        <div className="mt-0.5 pl-4 text-[10px] text-[var(--text-muted)] line-clamp-2">
                          {preset.description}
                        </div>

                        {/* Metadata */}
                        <div className="mt-1 pl-4 flex items-center gap-2">
                          {preset.treatmentIds && preset.treatmentIds.length > 0 && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded text-[var(--text-muted)]">
                              {preset.treatmentIds.length} treatments
                            </span>
                          )}
                          {preset.nodeIds && preset.nodeIds.length > 0 && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded text-[var(--text-muted)]">
                              {preset.nodeIds.length} nodes
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-[var(--border)] text-[10px] text-[var(--text-muted)] text-center">
        Select a preset to highlight related pathways
      </div>
    </div>
  );
}

export default PresetPicker;
