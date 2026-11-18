import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = getCurrentUser();
    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

