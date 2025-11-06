import { useState, useRef, useCallback } from 'react';

export function useChartInteraction(totalPoints: number) {
  const [viewStart, setViewStart] = useState(0);
  const [viewEnd, setViewEnd] = useState(totalPoints);
  const [isLive, setIsLive] = useState(true);
  const dragRef = useRef<number | null>(null);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const zoomFactor = 0.1;
      const delta = event.deltaY > 0 ? 1 + zoomFactor : 1 - zoomFactor;
      const mid = (viewStart + viewEnd) / 2;
      const range = (viewEnd - viewStart) * delta;

      let newStart = Math.max(0, mid - range / 2);
      let newEnd = Math.min(totalPoints, mid + range / 2);

      if (newEnd - newStart < 50) return; // prevent over-zoom
      setViewStart(newStart);
      setViewEnd(newEnd);
      setIsLive(false);
    },
    [viewStart, viewEnd, totalPoints]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      dragRef.current = e.clientX;
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragRef.current === null) return;
      const dx = e.clientX - dragRef.current;
      dragRef.current = e.clientX;
      const shift = dx * (viewEnd - viewStart) / 800; // assume 800px width
      setViewStart(s => Math.max(0, s - shift));
      setViewEnd(e => Math.min(totalPoints, e - shift));
      setIsLive(false);
    },
    [viewStart, viewEnd, totalPoints]
  );

  const handleMouseUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const resetLive = useCallback(() => {
    setIsLive(true);
    setViewStart(Math.max(0, totalPoints - 1000));
    setViewEnd(totalPoints);
  }, [totalPoints]);

  return {
    viewStart,
    viewEnd,
    isLive,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetLive,
  };
}
