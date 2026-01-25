'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Network, X, Construction } from 'lucide-react';
import { useGraphSidebar } from '@/contexts/GraphSidebarContext';

/**
 * Floating button for mobile/tablet screens that opens a fullscreen graph modal
 * Only visible below xl breakpoint (1280px)
 *
 * NOTE: Graph component is being rebuilt with Excel-based data.
 * This is a temporary placeholder.
 */
export function MobileGraphButton() {
  const { isMobileModalOpen, openMobileModal, closeMobileModal } = useGraphSidebar();

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
      </button>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isMobileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="xl:hidden fixed inset-0 z-50 bg-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
              <h3 className="text-base font-medium text-[var(--text-primary)]">
                Mechanistic Graph
              </h3>
              <button
                onClick={closeMobileModal}
                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Placeholder content */}
            <div className="h-[calc(100%-57px)] flex flex-col items-center justify-center p-6 text-center">
              <Construction className="w-16 h-16 text-[var(--accent-orange)] mb-6" />
              <h4 className="text-xl font-medium text-[var(--text-primary)] mb-3">
                Graph Under Construction
              </h4>
              <p className="text-base text-[var(--text-muted)] max-w-sm">
                The mechanistic network graph is being rebuilt with a new Excel-based data system for easier editing and collaboration.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
