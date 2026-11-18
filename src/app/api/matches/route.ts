import { NextResponse } from 'next/server';
import { getMatches } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const matches = getMatches();
    return NextResponse.json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error: any) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}

