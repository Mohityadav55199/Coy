import { NextResponse } from 'next/server';
import { resetDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    resetDatabase();
    return NextResponse.json({
      success: true,
      message: 'Database has been successfully reset to initial seeded profiles.',
    });
  } catch (error: any) {
    console.error('Error resetting database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to reset database' },
      { status: 500 }
    );
  }
}

