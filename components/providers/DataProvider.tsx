'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { DataPoint, ChartConfig } from '../../lib/types';

interface DataContextValue {
  data: DataPoint[];
  clear: () => void;
  totalCount: number;
  globalCategoryCount: Record<string, number>;
  chartConfigs: ChartConfig[];
  setChartConfigs: React.Dispatch<React.SetStateAction<ChartConfig[]>>;
  activeCategories: string[];
  setActiveCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const DataContext = createContext<DataContextValue>({
  data: [],
  clear: () => {},
  totalCount: 0,
  globalCategoryCount: {},
  chartConfigs: [],
  setChartConfigs: () => {},
  activeCategories: [],
  setActiveCategories: () => {},
});

export function useData() {
  return useContext(DataContext);
}

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [globalCategoryCount, setGlobalCategoryCount] = useState<Record<string, number>>({});
  const [chartConfigs, setChartConfigs] = useState<ChartConfig[]>([
    { type: 'line', dataKey: 'value', color: '#2563eb', visible: true },
    { type: 'bar', dataKey: 'value', color: '#10b981', visible: false },
    { type: 'scatter', dataKey: 'value', color: '#f59e0b', visible: false },
    { type: 'heatmap', dataKey: 'value', color: '#ef4444', visible: false },
  ]);

  // Active categories filter
  const [activeCategories, setActiveCategories] = useState<string[]>(['A', 'B', 'C', 'D']);

  const workerRef = useRef<Worker | null>(null);

  const batchSize = 10;
  const interval = 100;
  const visibleWindow = 10000;
  const pruneInterval = 5000;

  useEffect(() => {
    // Initialize Web Worker
    workerRef.current = new Worker(new URL('../../lib/dataWorker.js', import.meta.url), {
      type: 'module',
    });

    workerRef.current.postMessage({ batchSize, interval });

    workerRef.current.onmessage = (e) => {
      const newPoints: DataPoint[] = e.data;

      // ✅ Filter out inactive categories
      const filteredPoints = newPoints.filter((p) => activeCategories.includes(p.category));

      setTotalCount((prev) => prev + filteredPoints.length);

      // Update global totals
      setGlobalCategoryCount((prev) => {
        const updated = { ...prev };
        for (const p of filteredPoints) {
          updated[p.category] = (updated[p.category] || 0) + 1;
        }
        return updated;
      });

      // Maintain a sliding visible window
      setData((prev) => {
        const next = prev.concat(filteredPoints);
        return next.length > visibleWindow ? next.slice(-visibleWindow) : next;
      });
    };

    // Prune old data periodically to save memory
    const pruneTimer = setInterval(() => {
      setData((prev) => prev.slice(-visibleWindow));
    }, pruneInterval);

    return () => {
      clearInterval(pruneTimer);
      workerRef.current?.terminate();
    };
  }, [activeCategories]); // 👈 reapply filtering when categories change

  const clear = () => {
    setData([]);
    setTotalCount(0);
    setGlobalCategoryCount({});
  };

  return (
    <DataContext.Provider
      value={{
        data,
        clear,
        totalCount,
        globalCategoryCount,
        chartConfigs,
        setChartConfigs,
        activeCategories,
        setActiveCategories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
