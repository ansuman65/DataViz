'use client';

import React, { useRef, useEffect } from 'react';
import { useChartRenderer } from '../../hooks/useChartRenderer';
import { DataPoint } from '../../lib/types';

interface LineChartProps {
  data: DataPoint[];
  color?: string;
}

export default function LineChart({ data, color = '#2563eb' }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // use the existing hook (optimized renderer)
  useChartRenderer(canvasRef, data, { lineColor: color });

  // Resize dynamically with parent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: 8,
      }}
    />
  );
}
