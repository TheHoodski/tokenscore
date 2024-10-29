// src/app/api/analyze/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { tokenAddress } = await request.json();

    // Call Python backend
    const response = await fetch('http://localhost:8000/analyze-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenAddress }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze token' },
      { status: 500 }
    );
  }
}