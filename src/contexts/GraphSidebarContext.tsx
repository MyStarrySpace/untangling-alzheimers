'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types
interface GraphSidebarState {
  /** Whether the sidebar is visible (desktop only) */
  isOpen: boolean;
  /** Whether scroll-sync is enabled */
  isSyncEnabled: boolean;
  /** Current active preset ID (from scroll sync or manual selection) */
  activePresetId: string | null;
  /** Whether a preset was set manually (prevents auto-update from scroll) */
  isManuallySet: boolean;
  /** Whether mobile modal is open */
  isMobileModalOpen: boolean;
}

interface GraphSidebarContextValue extends GraphSidebarState {
  /** Toggle sidebar visibility */
  toggleSidebar: () => void;
  /** Set sidebar open state explicitly */
  setSidebarOpen: (open: boolean) => void;
  /** Toggle scroll-sync mode */
  toggleSync: () => void;
  /** Set sync enabled state explicitly */
  setSyncEnabled: (enabled: boolean) => void;
  /** Set active preset from scroll sync (respects manual override) */
  setPresetFromScroll: (presetId: string | null) => void;
  /** Set preset manually (disables auto-update until sync is toggled) */
  setPresetManually: (presetId: string | null) => void;
  /** Clear manual selection and re-enable scroll sync */
  clearManualSelection: () => void;
  /** Open mobile modal */
  openMobileModal: () => void;
  /** Close mobile modal */
  closeMobileModal: () => void;
}

const GraphSidebarContext = createContext<GraphSidebarContextValue | null>(null);

interface GraphSidebarProviderProps {
  children: ReactNode;
  /** Default sidebar open state */
  defaultOpen?: boolean;
  /** Default sync enabled state */
  defaultSyncEnabled?: boolean;
}

export function GraphSidebarProvider({
  children,
  defaultOpen = true,
  defaultSyncEnabled = true,
}: GraphSidebarProviderProps) {
  const [state, setState] = useState<GraphSidebarState>({
    isOpen: defaultOpen,
    isSyncEnabled: defaultSyncEnabled,
    activePresetId: null,
    isManuallySet: false,
    isMobileModalOpen: false,
  });

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const setSidebarOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, isOpen: open }));
  }, []);

  const toggleSync = useCallback(() => {
    setState(prev => ({
      ...prev,
      isSyncEnabled: !prev.isSyncEnabled,
      // When re-enabling sync, clear manual selection
      isManuallySet: prev.isSyncEnabled ? prev.isManuallySet : false,
    }));
  }, []);

  const setSyncEnabled = useCallback((enabled: boolean) => {
    setState(prev => ({
      ...prev,
      isSyncEnabled: enabled,
      // When re-enabling sync, clear manual selection
      isManuallySet: enabled ? false : prev.isManuallySet,
    }));
  }, []);

  const setPresetFromScroll = useCallback((presetId: string | null) => {
    setState(prev => {
      // Don't update if sync is disabled or user has manually selected
      if (!prev.isSyncEnabled || prev.isManuallySet) {
        return prev;
      }
      return { ...prev, activePresetId: presetId };
    });
  }, []);

  const setPresetManually = useCallback((presetId: string | null) => {
    setState(prev => ({
      ...prev,
      activePresetId: presetId,
      isManuallySet: presetId !== null, // Clear manual flag if clearing preset
    }));
  }, []);

  const clearManualSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      isManuallySet: false,
    }));
  }, []);

  const openMobileModal = useCallback(() => {
    setState(prev => ({ ...prev, isMobileModalOpen: true }));
  }, []);

  const closeMobileModal = useCallback(() => {
    setState(prev => ({ ...prev, isMobileModalOpen: false }));
  }, []);

  const value: GraphSidebarContextValue = {
    ...state,
    toggleSidebar,
    setSidebarOpen,
    toggleSync,
    setSyncEnabled,
    setPresetFromScroll,
    setPresetManually,
    clearManualSelection,
    openMobileModal,
    closeMobileModal,
  };

  return (
    <GraphSidebarContext.Provider value={value}>
      {children}
    </GraphSidebarContext.Provider>
  );
}

export function useGraphSidebar() {
  const context = useContext(GraphSidebarContext);
  if (!context) {
    throw new Error('useGraphSidebar must be used within a GraphSidebarProvider');
  }
  return context;
}

// Optional: hook that returns null if outside provider (for conditional use)
export function useGraphSidebarOptional() {
  return useContext(GraphSidebarContext);
}
