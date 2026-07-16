import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    ok: true,
    service: 'tech-brief-ai-api',
    timestamp: new Date().toISOString()
  });
}
