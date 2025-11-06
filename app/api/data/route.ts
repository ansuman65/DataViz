// app/api/data/route.ts

import { NextResponse } from 'next/server';
import { generatePoints } from '../../../lib/dataGenerator';

export async function GET(request: Request) {
  try {
    // extract ?count=5 from query string
    const url = new URL(request.url);
    const countParam = url.searchParams.get('count') ?? '1';
    const count = Math.max(1, Math.min(1000, parseInt(countParam, 10) || 1));

    // generate fake points
    const points = generatePoints(count);

    return NextResponse.json({ ok: true, points });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
