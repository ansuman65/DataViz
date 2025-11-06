// hooks/usePerformanceMonitor.ts
import { useEffect, useState } from 'react';

export interface PerfStats {
  fps: number;
  memory?: number;
}

export function usePerformanceMonitor(): PerfStats {
  const [stats, setStats] = useState<PerfStats>({ fps: 0, memory: undefined });

  useEffect(() => {
    let frames = 0;
    let lastTime = performance.now();

    const update = () => {
      frames++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const fps = Math.round((frames * 1000) / (now - lastTime));
        const memory =
          (performance as any).memory?.usedJSHeapSize /
          1024 /
          1024 || undefined;

        setStats({ fps, memory });
        frames = 0;
        lastTime = now;
      }
      requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(0);
  }, []);

  return stats;
}
