'use client';

import React from 'react';
import { useData } from '../providers/DataProvider';
import ChartRenderer from './ChartRenderer';

export default function ChartContainer() {
  const { data, chartConfigs } = useData();

  const visibleCharts = chartConfigs.filter((cfg) => cfg.visible);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${visibleCharts.length}, 1fr)`,
        gap: 20,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 80%)',
        borderRadius: 12,
        padding: 10,
      }}
    >
      {visibleCharts.map((cfg) => (
        <div
          key={cfg.type}
          style={{
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChartRenderer config={cfg} data={data} />
        </div>
      ))}

      {visibleCharts.length === 0 && (
        <div
          style={{
            color: '#64748b',
            fontStyle: 'italic',
            textAlign: 'center',
            fontSize: 14,
            margin: 'auto',
          }}
        >
          No active charts selected
        </div>
      )}
    </div>
  );
}
