'use client';

import React, { useRef, useEffect } from 'react';
import { DataPoint } from '../../lib/types';

interface Props {
  data: DataPoint[];
  color?: string;
}

export default function ScatterPlot({ data, color = '#f59e0b' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.clientWidth);
    const height = (canvas.height = canvas.clientHeight);

    ctx.clearRect(0, 0, width, height);

    const points = data.slice(-200);
    const values = points.map((p) => p.value);
    const minVal = Math.min(...values, 0);
    const maxVal = Math.max(...values, 1);

    // subtle background grid
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // draw points
    points.forEach((p, i) => {
      const x = (i / points.length) * width;
      const y = height - ((p.value - minVal) / (maxVal - minVal)) * height;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'rgba(245,158,11,0.1)');
      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
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
