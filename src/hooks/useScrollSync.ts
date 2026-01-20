'use client';

import { useEffect, useRef, useCallback } from 'react';
import { getPresetForSection } from '@/data/sectionPresetMapping';

interface UseScrollSyncOptions {
  /** Callback when active section changes */
  onSectionChange?: (sectionId: string | null) => void;
  /** Callback when preset should change based on section */
  onPresetChange?: (presetId: string | null) => void;
  /** Whether scroll sync is enabled */
  enabled?: boolean;
  /** Header offset in pixels (default: 64) */
  headerOffset?: number;
  /** Debounce delay in ms (default: 100) */
  debounceMs?: number;
  /** Root margin for intersection (default: '-64px 0px -50% 0px') */
  rootMargin?: string;
}

/**
 * Hook that uses Intersection Observer to detect which section is currently
 * in view and triggers callbacks for section/preset changes.
 *
 * Uses data-section-id attributes on elements to identify sections.
 */
export function useScrollSync({
  onSectionChange,
  onPresetChange,
  enabled = true,
  headerOffset = 64,
  debounceMs = 100,
  rootMargin,
}: UseScrollSyncOptions = {}) {
  const lastSectionRef = useRef<string | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visibleSectionsRef = useRef<Map<string, number>>(new Map());

  // Calculate root margin - top accounts for header, bottom for "in viewport" threshold
  const calculatedRootMargin = rootMargin ?? `-${headerOffset}px 0px -40% 0px`;

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!enabled) return;

      // Update visibility map for all observed entries
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section-id');
        if (!sectionId) return;

        if (entry.isIntersecting) {
          // Store intersection ratio for priority calculation
          visibleSectionsRef.current.set(sectionId, entry.intersectionRatio);
        } else {
          visibleSectionsRef.current.delete(sectionId);
        }
      });

      // Clear existing debounce
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Debounce the section change to prevent rapid updates during scroll
      debounceTimeoutRef.current = setTimeout(() => {
        // Find the section with highest visibility
        let activeSectionId: string | null = null;
        let highestRatio = 0;

        visibleSectionsRef.current.forEach((ratio, sectionId) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            activeSectionId = sectionId;
          }
        });

        // Only trigger if section actually changed
        if (activeSectionId !== lastSectionRef.current) {
          lastSectionRef.current = activeSectionId;

          // Trigger section change callback
          onSectionChange?.(activeSectionId);

          // Get and trigger preset change
          const presetId = activeSectionId
            ? getPresetForSection(activeSectionId)
            : null;
          onPresetChange?.(presetId);
        }
      }, debounceMs);
    },
    [enabled, onSectionChange, onPresetChange, debounceMs]
  );

  useEffect(() => {
    if (!enabled) return;

    // Create intersection observer
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: calculatedRootMargin,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    });

    // Find all elements with data-section-id attribute
    const sections = document.querySelectorAll('[data-section-id]');
    sections.forEach((section) => observer.observe(section));

    // Cleanup
    return () => {
      observer.disconnect();
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      visibleSectionsRef.current.clear();
    };
  }, [enabled, handleIntersection, calculatedRootMargin]);

  // Return current section for external use if needed
  return {
    currentSection: lastSectionRef.current,
  };
}

/**
 * Simpler hook that just returns the current section ID without callbacks
 */
export function useCurrentSection(enabled = true): string | null {
  const sectionRef = useRef<string | null>(null);

  useScrollSync({
    enabled,
    onSectionChange: (sectionId) => {
      sectionRef.current = sectionId;
    },
  });

  return sectionRef.current;
}
