# Real-Time Performance Data Visualization Dashboard

A high-performance real-time data visualization dashboard built using **Next.js (App Router)**, **React**, and **TypeScript**, capable of rendering over **10,000 live data points at 60 FPS** using optimized **Canvas rendering** and **Web Workers** for background data processing.

---

## Overview

This project demonstrates real-time streaming visualization with a focus on front-end performance engineering.  
It simulates continuous data flow using Web Workers and visualizes dynamic datasets across multiple chart types (Line, Bar, Scatter, Heatmap), maintaining smooth frame rates and a low memory footprint.

---

## Features

- Multi-chart architecture (Line, Bar, Scatter, Heatmap) built on a shared rendering core.  
- Real-time updates through Web Workers simulating continuous data streams.  
- Optimized rendering with `requestAnimationFrame`, maintaining 60 FPS for 10K+ points.  
- Low memory usage achieved through sliding window data pruning.  
- Canvas-based rendering for high-density visualizations.  
- Dynamic chart switching and responsive layout.  
- Built-in performance monitor tracking FPS and memory usage.  
- Glassmorphic, adaptive user interface designed for clarity and performance.  
- Next.js 14+ App Router with server–client component separation.

---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | Next.js 14+ (App Router) |
| Frontend | React + TypeScript |
| Rendering | HTML5 Canvas API |
| Data Processing | Web Workers |
| Styling | Custom inline CSS (Tailwind-style layout) |
| Performance | requestAnimationFrame, sliding window pruning |

---

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ansuman65/performance-dashboard.git
cd performance-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

## Project Structure
```bash
performance-dashboard/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx          # Dashboard entry
│   │   └── layout.tsx
│   └── page.tsx              # Homepage
├── components/
│   ├── charts/               # Line, Bar, Scatter, Heatmap
│   ├── ui/                   # DashboardShell, PerformanceMonitor
│   ├── controls/             # FilterPanel
│   └── providers/            # DataProvider (Web Worker logic)
├── hooks/                    # useDataStream, useChartRenderer, etc.
├── lib/
│   └── types.ts              # Shared type definitions
├── public/workers/           # dataWorker.js
├── README.md
└── package.json
```

