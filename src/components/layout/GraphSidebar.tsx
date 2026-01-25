'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Construction } from 'lucide-react';
import { useGraphSidebar } from '@/contexts/GraphSidebarContext';

/**
 * Fixed sidebar containing the mechanistic network graph
 * Only visible on xl screens (1280px+)
 *
 * NOTE: Graph component is being rebuilt with Excel-based data.
 * This is a temporary placeholder.
 */
export function GraphSidebar() {
  const { isOpen, toggleSidebar } = useGraphSidebar();

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
              <h3 className="text-sm font-medium text-[var(--text-primary)]">
                Mechanistic Graph
              </h3>
              <button
                onClick={toggleSidebar}
                className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                title="Collapse sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Placeholder content */}
            <div className="h-[calc(100%-45px)] flex flex-col items-center justify-center p-6 text-center">
              <Construction className="w-12 h-12 text-[var(--accent-orange)] mb-4" />
              <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">
                Graph Under Construction
              </h4>
              <p className="text-sm text-[var(--text-muted)] max-w-xs">
                The mechanistic network graph is being rebuilt with a new Excel-based data system for easier editing and collaboration.
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
