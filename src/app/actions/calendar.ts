'use server';

import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Session } from 'next-auth';
import { LunarCalendarConverter } from '@/lib/lunar-api';
import { Birthday } from '@/lib/types';

// Extend Session type to include the properties we need
interface ExtendedSession extends Session {
  accessToken?: string;
  refreshToken?: string;
}

export async function getCalendarApi(session: ExtendedSession) {
  if (!session.accessToken) {
    throw new Error('No access token available');
  }

  const oauth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/api/auth/callback/google'
  });
  
  oauth2Client.setCredentials({ 
    access_token: session.accessToken,
    refresh_token: session.refreshToken
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

export async function addCalendarEvents(session: ExtendedSession, birthdays: Birthday[]) {
  try {
    const calendar = await getCalendarApi(session);
    
    for (const birthday of birthdays) {
      const dates = LunarCalendarConverter.getMultiYearDates(
        birthday.lunarBirthday.month,
        birthday.lunarBirthday.day,
        birthday.lunarBirthday.isLeapMonth || false
      );

      for (const date of dates) {
        await calendar.events.insert({
          calendarId: 'primary',
          requestBody: {
            summary: `${birthday.name}'s Lunar Birthday`,
            description: 'Lunar Birthday Reminder',
            start: {
              date: `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
            },
            end: {
              date: `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
            },
            recurrence: [],
            reminders: {
              useDefault: true
            }
          }
        });
      }
    }
    return { success: true };
  } catch (error) {
    console.error('Calendar API Error:', error);
    throw new Error('Failed to create calendar events');
  }
} 