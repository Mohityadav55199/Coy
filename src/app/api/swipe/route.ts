import { NextRequest, NextResponse } from 'next/server';
import { recordSwipe } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileId, action } = body;

    if (!profileId || typeof profileId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'profileId is required and must be a string' },
        { status: 400 }
      );
    }

    if (action !== 'like' && action !== 'pass') {
      return NextResponse.json(
        { success: false, error: "action must be either 'like' or 'pass'" },
        { status: 400 }
      );
    }

    const result = recordSwipe(profileId, action);

    return NextResponse.json({
      success: true,
      action,
      match: result.match,
      profile: result.profile,
    });
  } catch (error: any) {
    console.error('Error recording swipe:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to record swipe' },
      { status: 500 }
    );
  }
}

