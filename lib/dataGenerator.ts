// lib/dataGenerator.ts

import { DataPoint } from './types';

const categories = ['A', 'B', 'C', 'D'];

/**
 * Helper to generate a random number between min and max
 */
function rand(min = 0, max = 1): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate a single data point with some time-based variation.
 */
export function generatePoint(seq = 0): DataPoint {
  const now = Date.now();
  return {
    id: `${now}-${Math.floor(rand(0, 1e6))}-${seq}`,
    timestamp: now,
    value: Math.round((Math.sin(now / 1000 + seq) * 50 + 50 + rand(-5, 5)) * 100) / 100,
    category: categories[Math.floor(rand(0, categories.length))],
    metadata: { seq },
  };
}

/**
 * Generate a batch of points.
 */
export function generatePoints(count = 1): DataPoint[] {
  const arr: DataPoint[] = [];
  for (let i = 0; i < count; i++) {
    arr.push(generatePoint(i));
  }
  return arr;
}
