// lib/types.ts

export interface DataPoint {
  id: string;
  timestamp: number;
  value: number;
  category: string;
  metadata?: Record<string, any>;
}

// defines configuration for each chart type
export interface ChartConfig {
  type: 'line' | 'bar' | 'scatter' | 'heatmap';
  dataKey: string;
  color: string;
  visible: boolean;
}

// for the performance monitor (optional extension)
export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  dataProcessingTime: number;
}
