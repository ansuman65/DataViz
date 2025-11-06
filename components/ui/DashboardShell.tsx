'use client';

import React from 'react';
import ChartContainer from '../charts/ChartContainer';
import { useData } from '../providers/DataProvider';
import { useDataStats } from '../../hooks/useDataStream';
import PerformanceMonitor from '../ui/PerformanceMonitor';
import FilterPanel from '../controls/FilterPanel';

export default function DashboardShell() {
  const { data, clear, totalCount } = useData();
  const { last, byCategoryWindow, byCategoryGlobal } = useDataStats();

  return (
    <main
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 360px',
        gap: 20,
        padding: '24px 28px',
        minHeight: '100vh',
        background: 'linear-gradient(180deg,#f8fafc 0%,#ffffff 80%)',
        color: '#0f172a',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Main Content */}
      <section
        style={{
          position: 'relative',
          background: '#ffffffb3',
          backdropFilter: 'blur(6px)',
          padding: 20,
          borderRadius: 12,
          boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Filters on top */}
        <FilterPanel />

        {/* Title Row with aligned Performance Monitor */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
            position: 'relative',
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: '#0b1220',
              margin: 0,
            }}
          >
            Live Data Stream
          </h2>

          {/* Move Performance Monitor here */}
          <div style={{ position: 'relative', marginRight: 10 }}>
            <PerformanceMonitor />
          </div>
        </div>

        {/* Meta Info */}
        <p style={{ margin: '4px 0', color: '#475569' }}>
          Total data points:{' '}
          <strong style={{ color: '#2563eb' }}>
            {totalCount.toLocaleString()}
          </strong>
        </p>
        <p style={{ margin: '4px 0', color: '#475569' }}>
          Last point:{' '}
          {last
            ? `${new Date(last.timestamp).toLocaleTimeString()} • ${last.value.toFixed(
                2
              )} • ${last.category}`
            : '—'}
        </p>

        {/* Chart Container */}
        <div
          style={{
            height: 380,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(180deg,#f1f5f9 0%,#f8fafc 100%)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <ChartContainer />
        </div>

        {/* Clear Button */}
        <button
          style={{
            alignSelf: 'flex-start',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            boxShadow: '0 2px 6px rgba(37,99,235,0.3)',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#1e3a8a')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#2563eb')}
          onClick={() => clear()}
        >
          Clear Data
        </button>
      </section>

      {/* Sidebar */}
      <aside
        style={{
          background: '#ffffffb3',
          backdropFilter: 'blur(6px)',
          padding: 20,
          borderRadius: 12,
          boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Recent Points Table */}
        <div>
          <h3
            style={{
              marginBottom: 8,
              fontWeight: 600,
              color: '#0b1220',
            }}
          >
            Recent Points
          </h3>
          <div
            style={{
              maxHeight: 380,
              overflowY: 'auto',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
            }}
          >
            <table
              style={{
                width: '100%',
                fontSize: 12,
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: '#f8fafc',
                    color: '#475569',
                  }}
                >
                  <th style={{ textAlign: 'left', padding: '6px 8px' }}>
                    Time
                  </th>
                  <th style={{ padding: '6px 8px' }}>Value</th>
                  <th style={{ padding: '6px 8px' }}>Cat</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(-50)
                  .reverse()
                  .map((p) => (
                    <tr key={p.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '4px 8px' }}>
                        {new Date(p.timestamp).toLocaleTimeString()}
                      </td>
                      <td style={{ padding: '4px 8px' }}>
                        {p.value.toFixed(2)}
                      </td>
                      <td style={{ padding: '4px 8px' }}>{p.category}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Stats */}
        <div style={{ marginTop: 12 }}>
          <h4 style={{ fontSize: 14, marginBottom: 6, color: '#334155' }}>
            Visible Window (Last 10,000)
          </h4>
          <ul style={{ paddingLeft: 16, fontSize: 13, color: '#475569' }}>
            {Array.from(byCategoryWindow.entries()).map(([k, v]) => (
              <li key={k}>
                {k}: {v}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 12 }}>
          <h4 style={{ fontSize: 14, marginBottom: 6, color: '#334155' }}>
            Global Totals (All Time)
          </h4>
          <ul style={{ paddingLeft: 16, fontSize: 13, color: '#475569' }}>
            {Object.entries(byCategoryGlobal).map(([k, v]) => (
              <li key={k}>
                {k}: {v}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
