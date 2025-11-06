'use client';

import React from 'react';
import { useData } from '../providers/DataProvider';
import { ChartConfig } from '../../lib/types';

const chartTypes: ChartConfig['type'][] = ['line', 'bar', 'scatter', 'heatmap'];
const categories = ['A', 'B', 'C', 'D'];

export default function FilterPanel() {
  const { chartConfigs, setChartConfigs, activeCategories, setActiveCategories } = useData();
  const selectedChart = chartConfigs.find((c) => c.visible)?.type || 'line';

  const handleChartChange = (type: ChartConfig['type']) => {
    setChartConfigs((prev) =>
      prev.map((cfg) => ({ ...cfg, visible: cfg.type === type }))
    );
  };

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 16px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: 10,
        flexWrap: 'wrap',
        gap: 10,
      }}
    >
      {/* Chart Type Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>
          Chart Type:
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          {chartTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleChartChange(type)}
              style={{
                padding: '5px 10px',
                borderRadius: 20,
                border: selectedChart === type ? '2px solid #2563eb' : '1px solid #e2e8f0',
                background: selectedChart === type ? '#2563eb' : '#f8fafc',
                color: selectedChart === type ? '#fff' : '#0f172a',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>
          Visible Categories:
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              style={{
                padding: '5px 10px',
                borderRadius: 20,
                border: activeCategories.includes(cat)
                  ? '2px solid #2563eb'
                  : '1px solid #e2e8f0',
                background: activeCategories.includes(cat)
                  ? '#2563eb'
                  : '#f8fafc',
                color: activeCategories.includes(cat) ? '#fff' : '#0f172a',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
