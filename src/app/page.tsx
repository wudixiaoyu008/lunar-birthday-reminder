'use client';

import { useSession, signIn } from 'next-auth/react';
import BirthdayForm from '@/components/forms/BirthdayForm';
import { LunarCalendarConverter } from '@/lib/lunar-api';
import { Birthday } from '@/lib/types';
import { useState, useEffect } from 'react';
import { addCalendarEvents } from '@/app/actions/calendar';

export default function Home() {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasReminders, setHasReminders] = useState(false);

  useEffect(() => {
    if (session) {
      console.log('Checking for reminders...');
      // Use fetch to check reminders
      fetch('/api/calendar/check')
        .then(res => res.json())
        .then(data => {
          console.log('Has reminders:', data.hasReminders);
          setHasReminders(data.hasReminders);
        })
        .catch(console.error);
    }
  }, [session]);

  const handleSubmit = async (birthdays: Birthday[]) => {
    if (!session) {
      signIn('google');
      return;
    }

    try {
      console.log('Adding birthdays:', birthdays);
      await addCalendarEvents(session, birthdays);
      alert('Birthday reminders have been added to your Google Calendar!');
      setHasReminders(true);
    } catch (error) {
      console.error('Error adding to calendar:', error);
      alert('Failed to add reminders to calendar. Please try again.');
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete all lunar birthday reminders?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch('/api/calendar', {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        alert(`Successfully deleted ${result.deletedCount} birthday reminder${result.deletedCount !== 1 ? 's' : ''}`);
        setHasReminders(false);
      } else {
        throw new Error('Failed to delete reminders');
      }
    } catch (error) {
      console.error('Error deleting reminders:', error);
      alert('Failed to delete reminders. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {!session ? (
        <div className="text-center">
          <button
            onClick={() => signIn('google')}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <BirthdayForm 
          onSubmit={handleSubmit}
          onDelete={handleDeleteAll}
          isDeleting={isDeleting}
          hasReminders={hasReminders}
        />
      )}
    </main>
  );
}
