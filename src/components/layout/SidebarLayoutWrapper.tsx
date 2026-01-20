'use client';

import { ReactNode, useCallback } from 'react';
import { GraphSidebarProvider, useGraphSidebar } from '@/contexts/GraphSidebarContext';
import { useScrollSync } from '@/hooks/useScrollSync';
import { GraphSidebar } from './GraphSidebar';
import { MobileGraphButton } from './MobileGraphButton';

interface SidebarLayoutWrapperProps {
  children: ReactNode;
}

/**
 * Inner component that uses the GraphSidebar context
 */
function SidebarLayoutInner({ children }: SidebarLayoutWrapperProps) {
  const {
    isOpen,
    isSyncEnabled,
    setPresetFromScroll,
  } = useGraphSidebar();

  // Set up scroll sync
  useScrollSync({
    enabled: isSyncEnabled,
    onPresetChange: useCallback((presetId: string | null) => {
      setPresetFromScroll(presetId);
    }, [setPresetFromScroll]),
  });

  return (
    <div className="relative">
      {/* Main layout grid - sidebar only on xl screens */}
      <div
        className={`
          xl:grid xl:transition-all xl:duration-300
          ${isOpen ? 'xl:grid-cols-[1fr_400px]' : 'xl:grid-cols-[1fr_0px]'}
        `}
      >
        {/* Content column */}
        <div className="min-w-0">
          {children}
        </div>

        {/* Sidebar column - desktop only */}
        <div className="hidden xl:block">
          <GraphSidebar />
        </div>
      </div>

      {/* Mobile floating button - shown on smaller screens */}
      <MobileGraphButton />
    </div>
  );
}

/**
 * Wrapper component that provides the sidebar context and layout structure
 */
export function SidebarLayoutWrapper({ children }: SidebarLayoutWrapperProps) {
  return (
    <GraphSidebarProvider defaultOpen={false}>
      <SidebarLayoutInner>{children}</SidebarLayoutInner>
    </GraphSidebarProvider>
  );
}
