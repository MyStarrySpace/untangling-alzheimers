'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, X } from 'lucide-react';
import { useGraphSidebar } from '@/contexts/GraphSidebarContext';
import { MechanisticNetworkGraph } from '@/components/sections/MechanisticNetworkGraph';
import { getPresetById } from '@/data/mechanisticFramework/presets';

/**
 * Floating button for mobile/tablet screens that opens a fullscreen graph modal
 * Only visible below xl breakpoint (1280px)
 */
export function MobileGraphButton() {
  const {
    isMobileModalOpen,
    activePresetId,
    openMobileModal,
    closeMobileModal,
    setPresetManually,
  } = useGraphSidebar();

  // Handle preset changes from the graph component
  const handlePresetChange = useCallback((presetId: string | null) => {
    setPresetManually(presetId);
  }, [setPresetManually]);

  // Get current preset info for display
  const currentPreset = activePresetId ? getPresetById(activePresetId) : null;

  return (
    <>
      {/* Floating button - only visible on smaller screens */}
      <button
        onClick={openMobileModal}
        className="xl:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[var(--accent-orange)] text-white rounded-full shadow-lg hover:bg-[var(--accent-orange)]/90 transition-colors"
        title="Open mechanistic graph"
      >
        <Network className="w-5 h-5" />
        <span className="text-sm font-medium">Graph</span>
        {currentPreset && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
            {currentPreset.label.split(' ')[0]}
          </span>
        )}
      </button>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isMobileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden fixed inset-0 z-50 bg-white"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-[var(--accent-orange)]" />
                <h2 className="text-base font-medium text-[var(--text-primary)]">
                  Mechanistic Graph
                </h2>
                {currentPreset && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${currentPreset.color}20`,
                      color: currentPreset.color,
                    }}
                  >
                    {currentPreset.label}
                  </span>
                )}
              </div>

              <button
                onClick={closeMobileModal}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] rounded transition-colors"
                title="Close graph"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hint text */}
            <div className="px-4 py-2 bg-[var(--accent-orange-light)] text-[11px] text-[var(--accent-orange)]">
              Explore the mechanistic network. Use the preset picker to view different hypotheses and pathways.
            </div>

            {/* Graph container */}
            <div className="h-[calc(100vh-100px)]">
              <MechanisticNetworkGraph
                height="100%"
                showControls={true}
                showMiniMap={true}
                compactMode={false}
                activePresetId={activePresetId}
                onPresetChange={handlePresetChange}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
