'use client';

import React, { useEffect, useRef } from 'react';
import { DataPoint } from '../../lib/types';

interface Props {
  data: DataPoint[];
  color?: string;
}

export default function Heatmap({ data, color = '#ef4444' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.clientWidth);
    const height = (canvas.height = canvas.clientHeight);
    ctx.clearRect(0, 0, width, height);

    const points = data.slice(-400);
    if (!points.length) return;

    const cols = 20;
    const rows = 10;
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    const maxVal = Math.max(...points.map((p) => p.value));
    const minVal = Math.min(...points.map((p) => p.value));

    const valueRange = maxVal - minVal || 1;

    const gradientColors = [
      { stop: 0, color: '#3b82f6' },
      { stop: 0.5, color: '#f59e0b' },
      { stop: 1, color: '#ef4444' },
    ];

    const getColor = (value: number) => {
      const ratio = (value - minVal) / valueRange;
      const colorIndex = Math.floor(ratio * (gradientColors.length - 1));
      const start = gradientColors[colorIndex];
      const end = gradientColors[colorIndex + 1] || start;

      const blend =
        (ratio * (gradientColors.length - 1)) % 1;

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const parseRGB = (hex: string) =>
        hex
          .match(/[A-Za-z0-9]{2}/g)!
          .map((v) => parseInt(v, 16));

      const sRGB = parseRGB(start.color.slice(1));
      const eRGB = parseRGB(end.color.slice(1));

      const mixed = sRGB.map((c, i) => Math.round(lerp(c, eRGB[i], blend)));
      return `rgb(${mixed.join(',')})`;
    };

    ctx.strokeStyle = 'rgba(0,0,0,0.05)';
    ctx.lineWidth = 1;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const index = (y * cols + x) % points.length;
        const value = points[index].value;
        ctx.fillStyle = getColor(value);
        ctx.beginPath();
        ctx.roundRect(
          x * cellWidth,
          y * cellHeight,
          cellWidth - 1,
          cellHeight - 1,
          3
        );
        ctx.fill();
      }
    }
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
