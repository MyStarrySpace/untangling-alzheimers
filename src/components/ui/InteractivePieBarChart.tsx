'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataItem {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface InteractivePieBarChartProps {
  data: DataItem[];
  height?: number;
}

/**
 * Interactive Pie-to-Bar Chart
 * - Hover: Other segments fade out
 * - Click: Transforms from pie to horizontal bar for easier comparison
 * - Shift+Click: Multi-select items for side-by-side comparison
 */
export function InteractivePieBarChart({ data, height = 180 }: InteractivePieBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<'pie' | 'bar'>('pie');

  const total = useMemo(() => data.reduce((sum, d) => sum + d.amount, 0), [data]);
  const maxAmount = useMemo(() => Math.max(...data.map(d => d.amount)), [data]);

  // Handle click with shift-key support
  const handleClick = (index: number, e: React.MouseEvent) => {
    if (e.shiftKey) {
      // Shift+Click: Toggle selection for multi-compare
      setSelectedIndices(prev => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
      if (viewMode === 'pie') setViewMode('bar');
    } else {
      // Normal click: Single select and switch to bar view
      if (selectedIndices.has(index) && selectedIndices.size === 1) {
        // Clicking selected item again - deselect and go back to pie
        setSelectedIndices(new Set());
        setViewMode('pie');
      } else {
        setSelectedIndices(new Set([index]));
        setViewMode('bar');
      }
    }
  };

  // Calculate pie slices
  const pieSlices = useMemo(() => {
    let currentAngle = -90; // Start from top
    return data.map((item, index) => {
      const angle = (item.amount / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      // Calculate path for pie slice
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const radius = 70;
      const innerRadius = 40;
      const cx = 90;
      const cy = 90;

      const x1 = cx + radius * Math.cos(startRad);
      const y1 = cy + radius * Math.sin(startRad);
      const x2 = cx + radius * Math.cos(endRad);
      const y2 = cy + radius * Math.sin(endRad);
      const x3 = cx + innerRadius * Math.cos(endRad);
      const y3 = cy + innerRadius * Math.sin(endRad);
      const x4 = cx + innerRadius * Math.cos(startRad);
      const y4 = cy + innerRadius * Math.sin(startRad);

      const largeArc = angle > 180 ? 1 : 0;

      const path = `
        M ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
        L ${x3} ${y3}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
        Z
      `;

      // Label position (middle of arc, outside)
      const midAngle = (startAngle + endAngle) / 2;
      const midRad = (midAngle * Math.PI) / 180;
      const labelRadius = radius + 15;
      const labelX = cx + labelRadius * Math.cos(midRad);
      const labelY = cy + labelRadius * Math.sin(midRad);

      return { path, labelX, labelY, midAngle, item, index };
    });
  }, [data, total]);

  // Sort data for bar view - selected items first, then by amount
  const sortedForBar = useMemo(() => {
    return [...data]
      .map((item, originalIndex) => ({ item, originalIndex }))
      .sort((a, b) => {
        const aSelected = selectedIndices.has(a.originalIndex);
        const bSelected = selectedIndices.has(b.originalIndex);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return b.item.amount - a.item.amount;
      });
  }, [data, selectedIndices]);

  const isItemActive = (index: number) => {
    if (selectedIndices.size === 0) return hoveredIndex === null || hoveredIndex === index;
    return selectedIndices.has(index);
  };

  return (
    <div className="relative" style={{ height }}>
      {/* View mode toggle hint */}
      <div className="absolute top-0 right-0 text-[10px] text-[var(--text-muted)] z-10">
        {viewMode === 'pie' ? 'Click to compare' : 'Click segment to return'}
        {selectedIndices.size > 0 && ' · Shift+click for multi-select'}
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'pie' ? (
          <motion.div
            key="pie"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center h-full"
          >
            <svg width="180" height="180" viewBox="0 0 180 180">
              {pieSlices.map(({ path, item, index }) => (
                <motion.path
                  key={index}
                  d={path}
                  fill={item.color}
                  stroke="white"
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: isItemActive(index) ? 1 : 0.25,
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={(e) => handleClick(index, e)}
                />
              ))}
              {/* Center text */}
              <text
                x="90"
                y="85"
                textAnchor="middle"
                className="text-xs fill-[var(--text-muted)]"
              >
                Total
              </text>
              <text
                x="90"
                y="100"
                textAnchor="middle"
                className="text-sm font-bold fill-[var(--text-primary)]"
              >
                ${(total / 1000).toFixed(1)}B
              </text>
            </svg>

            {/* Hover tooltip */}
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute bottom-0 left-0 right-0 text-center"
                >
                  <span
                    className="inline-block px-2 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: data[hoveredIndex].color }}
                  >
                    {data[hoveredIndex].name}: ${data[hoveredIndex].amount}M ({data[hoveredIndex].percentage}%)
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full overflow-y-auto pr-2"
          >
            <div className="space-y-1.5">
              {sortedForBar.map(({ item, originalIndex }, sortedIndex) => {
                const isSelected = selectedIndices.has(originalIndex);
                const barWidth = (item.amount / maxAmount) * 100;

                return (
                  <motion.div
                    key={originalIndex}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isItemActive(originalIndex) ? 1 : 0.3,
                      x: 0,
                    }}
                    transition={{ duration: 0.3, delay: sortedIndex * 0.03 }}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredIndex(originalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={(e) => handleClick(originalIndex, e)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span
                        className={`text-[10px] w-24 truncate ${
                          isSelected ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {item.name}
                      </span>
                      <div className="flex-1 h-4 bg-[var(--bg-secondary)] relative overflow-hidden">
                        <motion.div
                          className="h-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ duration: 0.5, delay: sortedIndex * 0.05 }}
                        />
                        <span className="absolute right-1 top-0 h-full flex items-center text-[9px] font-mono text-[var(--text-body)]">
                          ${item.amount}M
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Comparison summary for multi-select */}
            {selectedIndices.size > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 pt-2 border-t border-[var(--border)] text-xs"
              >
                <span className="text-[var(--text-muted)]">Selected total: </span>
                <span className="font-mono font-semibold text-[var(--text-primary)]">
                  ${Array.from(selectedIndices).reduce((sum, i) => sum + data[i].amount, 0)}M
                </span>
                <span className="text-[var(--text-muted)]">
                  {' '}({Math.round(Array.from(selectedIndices).reduce((sum, i) => sum + data[i].percentage, 0))}% of total)
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
