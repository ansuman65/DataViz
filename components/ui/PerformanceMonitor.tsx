'use client';

import React from 'react';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';

export default function PerformanceMonitor() {
  const { fps, memory } = usePerformanceMonitor();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        transform: 'translate(-8px, 40px)', // 👈 brings it lower & inline with title
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        minWidth: 160, // 👈 stretches it horizontally
        padding: '10px 18px',
        borderRadius: 10,
        background:
          'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#e2e8f0',
        fontFamily: 'monospace',
        fontSize: 13,
        lineHeight: 1.4,
      }}
    >
      <div>
        <div style={{ color: '#86efac', fontWeight: 600 }}>FPS</div>
        <div style={{ color: '#22c55e', fontSize: 14 }}>{fps}</div>
      </div>

      <div
        style={{
          height: '60%',
          width: 1,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 1,
        }}
      />

      <div>
        <div style={{ color: '#93c5fd', fontWeight: 600 }}>MEM</div>
        <div style={{ color: '#38bdf8', fontSize: 14 }}>
          {memory ? `${memory.toFixed(1)} MB` : '—'}
        </div>
      </div>
    </div>
  );
}
