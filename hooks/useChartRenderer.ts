import { useEffect, useCallback } from 'react';
import { DataPoint } from '../lib/types';

interface ChartOptions {
  background?: string;
  lineColor?: string;
  maxPoints?: number;
  fps?: number;
}

/**
 * High-performance canvas renderer hook for real-time and manual rendering.
 * Supports auto-animation loop + manual frame rendering (for zoom/pan).
 */
export function useChartRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  data: DataPoint[],
  {
    background = '#fafafa',
    lineColor = '#2563eb',
    maxPoints = 10000,
    fps = 60,
  }: ChartOptions = {}
) {
  // 🖼️ reusable render function for any given set of points
  const renderFrame = useCallback(
    (points: DataPoint[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // semi-transparent fade to reduce full clears (smooth effect)
      ctx.fillStyle = background;
      ctx.globalAlpha = 0.4;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;

      if (!points.length) return;

      const minVal = Math.min(...points.map((p) => p.value));
      const maxVal = Math.max(...points.map((p) => p.value));
      const range = maxVal - minVal || 1e-6;

      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Level of Detail (LOD) skipping — prevents overdraw at large sizes
      const step = Math.max(1, Math.floor(points.length / width));
      const scaleX = width / (points.length / step);
      const scaleY = height / range;

      for (let i = 0, j = 0; i < points.length; i += step, j++) {
        const p = points[i];
        const x = j * scaleX;
        const y = height - (p.value - minVal) * scaleY;
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
    },
    [canvasRef, background, lineColor]
  );

  // 🎬 Auto animation loop (default real-time mode)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameReq: number;
    let running = true;
    let lastLen = 0;
    let lastTime = performance.now();
    const frameInterval = 1000 / fps;

    const loop = () => {
      if (!running) return;
      const now = performance.now();
      const elapsed = now - lastTime;

      if (elapsed >= frameInterval) {
        lastTime = now - (elapsed % frameInterval);

        const len = data.length;
        if (len !== lastLen) {
          lastLen = len;
          const slice = data.slice(-maxPoints);
          renderFrame(slice);
        }
      }

      frameReq = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      running = false;
      cancelAnimationFrame(frameReq);
    };
  }, [data, fps, maxPoints, renderFrame]);

  return { renderFrame };
}
