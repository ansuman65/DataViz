'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg,#f8fafc 0%, #ffffff 40%)',
        color: '#0f172a',
      }}
    >
      {/* Top NAV */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '18px 28px',
          borderBottom: '1px solid rgba(15,23,42,0.04)',
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            aria-hidden
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background:
                'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(37,99,235,0.12)',
              color: 'white',
              fontWeight: 700,
            }}
          >
            DV
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>DataViz</div>
            <div style={{ fontSize: 12, color: '#475569' }}>Realtime dashboard</div>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: 8,
              background: '#2563eb',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
            aria-label="Go to dashboard"
          >
            Launch Dashboard
          </Link>

          <Link
            href="https://github.com/your-repo"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#0f172a', textDecoration: 'none', fontSize: 14 }}
          >
            GitHub
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: 28,
          alignItems: 'center',
          padding: '48px 56px',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Left: Hero text */}
        <div>
          <h1
            style={{
              fontSize: 44,
              lineHeight: 1.05,
              margin: 0,
              color: '#0b1220',
            }}
          >
            Real-time data visualization, engineered for speed.
          </h1>

          <p
            style={{
              marginTop: 18,
              maxWidth: 640,
              color: '#475569',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            High-performance charts (Canvas + Web Workers) that stay smooth under load.
            Swap visualizations, filter streams, and scale to tens of thousands of points.
            Built for demoing performance and real-world monitoring.
          </p>

          <div style={{ marginTop: 22, display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '12px 18px',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
              }}
              aria-label="Launch dashboard"
            >
              🚀 Launch dashboard
            </button>

            <button
              onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })}
              style={{
                background: 'transparent',
                color: '#2563eb',
                border: '1px solid #e6eefc',
                padding: '10px 14px',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Learn more
            </button>
          </div>

          {/* small feature badges */}
          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              'Canvas renderer',
              'Web Worker data',
              'OffscreenCanvas ready',
              'TypeScript',
              'Low memory profile',
            ].map((t) => (
              <div
                key={t}
                style={{
                  padding: '6px 10px',
                  background: '#f1f8ff',
                  borderRadius: 999,
                  color: '#1e3a8a',
                  fontSize: 13,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live preview / quick card */}
        <aside
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 18,
            boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
            minHeight: 260,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: '#475569', marginBottom: 8 }}>
              Live preview
            </div>

            {/* Decorative mini canvas placeholder */}
            <div
              style={{
                height: 140,
                borderRadius: 8,
                overflow: 'hidden',
                position: 'relative',
                background:
                  'linear-gradient(180deg, rgba(37,99,235,0.04), rgba(124,58,237,0.02))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg viewBox="0 0 300 80" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0" stopColor="#60a5fa" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#f97316" stopOpacity="0.75" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#g1)" strokeWidth="1.6">
                  <path d="M0 60 C 40 20, 80 20, 120 60 S 200 100, 300 60" strokeLinecap="round" />
                </g>
              </svg>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>FPS</div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>60</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>Data points</div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>10,000+</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                background: '#111827',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: 8,
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Open Dashboard
            </button>

            <a
              href="https://github.com/your-repo"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e6eefc',
                textDecoration: 'none',
                color: '#0f172a',
                fontWeight: 600,
              }}
            >
              Repo
            </a>
          </div>
        </aside>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: '18px 56px 64px',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <h3 style={{ marginTop: 6, marginBottom: 14, color: '#0b1220' }}>
          What you’ll see in the demo
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {[
            {
              title: 'Real-time streaming',
              desc: 'Simulated live feed — batch processing using Web Workers to keep UI responsive.',
            },
            {
              title: 'High-performance rendering',
              desc: 'Canvas-based charts with LOD sampling + requestAnimationFrame optimizations.',
            },
            {
              title: 'Multiple chart types',
              desc: 'Line, bar, scatter and heatmap — switch instantly on the client.',
            },
            {
              title: 'Scalable architecture',
              desc: 'Sliding windows and pruning prevent memory growth during long runs.',
            },
          ].map((f) => (
            <article
              key={f.title}
              style={{
                background: '#fff',
                padding: 16,
                borderRadius: 12,
                boxShadow: '0 8px 24px rgba(2,6,23,0.04)',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
              <div style={{ color: '#475569', fontSize: 14 }}>{f.desc}</div>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ padding: 28, textAlign: 'center', color: '#64748b' }}>
        © {new Date().getFullYear()} DataViz — built for performance demos •
        <span style={{ marginLeft: 8 }}>
          <Link href="/dashboard">Open Dashboard</Link>
        </span>
      </footer>
    </main>
  );
}
