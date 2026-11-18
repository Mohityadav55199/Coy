import { NextResponse } from 'next/server';
import { getFeed } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profiles = getFeed();
    return NextResponse.json({
      success: true,
      count: profiles.length,
      profiles,
    });
  } catch (error: any) {
    console.error('Error fetching feed:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch feed' },
      { status: 500 }
    );
  }
}

