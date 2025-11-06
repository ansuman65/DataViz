'use client';

import React, { useRef, useEffect } from 'react';
import { DataPoint } from '../../lib/types';

interface Props {
  data: DataPoint[];
  color?: string;
}

export default function BarChart({ data, color = '#10b981' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.clientWidth);
    const height = (canvas.height = canvas.clientHeight);

    ctx.clearRect(0, 0, width, height);

    const points = data.slice(-100); // last 100 points
    const barWidth = width / points.length;

    const maxVal = Math.max(...points.map((p) => p.value), 1);
    const minVal = Math.min(...points.map((p) => p.value), 0);

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    points.forEach((p, i) => {
      const barHeight = ((p.value - minVal) / (maxVal - minVal)) * (height - 20);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(i * barWidth, height - barHeight, barWidth * 0.8, barHeight, 3);
      ctx.fill();
    });

    // axis baseline
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height - 1);
    ctx.lineTo(width, height - 1);
    ctx.stroke();
  }, [data, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 8,
        background: 'linear-gradient(180deg,#f9fafb 0%,#ffffff 100%)',
      }}
    />
  );
}
