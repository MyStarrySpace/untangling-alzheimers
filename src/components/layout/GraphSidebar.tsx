'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link2, Link2Off, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGraphSidebar } from '@/contexts/GraphSidebarContext';
import { MechanisticNetworkGraph } from '@/components/sections/MechanisticNetworkGraph';
import { getPresetById } from '@/data/mechanisticFramework/presets';

/**
 * Fixed sidebar containing the mechanistic network graph
 * Only visible on xl screens (1280px+)
 */
export function GraphSidebar() {
  const {
    isOpen,
    isSyncEnabled,
    activePresetId,
    isManuallySet,
    toggleSidebar,
    toggleSync,
    setPresetManually,
    clearManualSelection,
  } = useGraphSidebar();

  // Handle preset changes from the graph component
  const handlePresetChange = useCallback((presetId: string | null) => {
    setPresetManually(presetId);
  }, [setPresetManually]);

  // Get current preset info for display
  const currentPreset = activePresetId ? getPresetById(activePresetId) : null;

  return (
    <>
      {/* Collapse/Expand toggle button - always visible */}
      <button
        onClick={toggleSidebar}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-white border border-r-0 border-[var(--border)] rounded-l px-1 py-4 hover:bg-[var(--bg-secondary)] transition-colors shadow-sm"
        title={isOpen ? 'Collapse graph sidebar' : 'Expand graph sidebar'}
      >
        {isOpen ? (
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-[var(--text-muted)]" />
        )}
      </button>

      {/* Sidebar panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-14 bottom-0 bg-white border-l border-[var(--border)] z-30 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-[var(--text-primary)]">
                  Mechanistic Graph
                </h3>
                {currentPreset && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${currentPreset.color}20`,
                      color: currentPreset.color,
                    }}
                  >
                    {currentPreset.label.split(' ')[0]}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {/* Sync toggle */}
                <button
                  onClick={toggleSync}
                  className={`flex items-center gap-1 px-2 py-1 text-[10px] rounded transition-colors ${
                    isSyncEnabled
                      ? 'bg-[var(--accent-orange)] text-white'
                      : 'bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title={isSyncEnabled ? 'Disable scroll sync' : 'Enable scroll sync'}
                >
                  {isSyncEnabled ? (
                    <>
                      <Link2 className="w-3 h-3" />
                      Sync
                    </>
                  ) : (
                    <>
                      <Link2Off className="w-3 h-3" />
                      Manual
                    </>
                  )}
                </button>

                {/* Clear manual selection (only shown when manually set) */}
                {isManuallySet && (
                  <button
                    onClick={clearManualSelection}
                    className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    title="Clear manual selection and resume sync"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Collapse button */}
                <button
                  onClick={toggleSidebar}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  title="Collapse sidebar"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sync status indicator */}
            {isSyncEnabled && !isManuallySet && (
              <div className="px-3 py-1.5 bg-[var(--accent-orange-light)] text-[10px] text-[var(--accent-orange)] flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] animate-pulse" />
                Graph updates as you scroll
              </div>
            )}

            {/* Manual mode indicator */}
            {isManuallySet && (
              <div className="px-3 py-1.5 bg-[var(--bg-secondary)] text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                Manual mode (click Clear to resume sync)
              </div>
            )}

            {/* Graph container */}
            <div className="h-[calc(100%-80px)]">
              <MechanisticNetworkGraph
                height="100%"
                showControls={true}
                showMiniMap={false}
                compactMode={true}
                activePresetId={activePresetId}
                onPresetChange={handlePresetChange}
              />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
