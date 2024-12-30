import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { getCalendarApi } from '@/app/actions/calendar';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      console.log('No access token in session:', session);
      return NextResponse.json({ hasReminders: false });
    }

    const calendar = await getCalendarApi(session);

    const events = await calendar.events.list({
      calendarId: 'primary',
      q: 'Lunar Birthday',
      maxResults: 1,
      orderBy: 'startTime',
      singleEvents: true,
      showDeleted: false
    });

    const hasReminders = (events.data.items?.length || 0) > 0;
    return NextResponse.json({ hasReminders });
  } catch (error) {
    console.error('Calendar API Error:', error);
    return NextResponse.json(
      { error: 'Failed to check calendar events' },
      { status: 500 }
    );
  }
} 