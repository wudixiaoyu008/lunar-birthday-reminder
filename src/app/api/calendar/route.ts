import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth';
import { addCalendarEvents, getCalendarApi } from '@/app/actions/calendar';

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const calendar = await getCalendarApi(session);

    // Get all events with "Lunar Birthday" in the title
    const events = await calendar.events.list({
      calendarId: 'primary',
      q: 'Lunar Birthday',
      maxResults: 2500,
    });

    if (events.data.items?.length) {
      await Promise.all(
        events.data.items.map((event) =>
          calendar.events.delete({
            calendarId: 'primary',
            eventId: event.id!,
          })
        )
      );
    }

    return NextResponse.json({ 
      success: true, 
      deletedCount: events.data.items?.length || 0 
    });
  } catch (error) {
    console.error('Calendar API Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete calendar events' },
      { status: 500 }
    );
  }
} 