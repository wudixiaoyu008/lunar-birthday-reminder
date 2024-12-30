'use client';

import { useState } from 'react';
import { addCalendarEvents } from '@/app/actions/calendar';
import { useSession } from 'next-auth/react';
import { LunarDate, Birthday } from '@/lib/types';
import InputField from './InputField';

interface BirthdayFormProps {
  onSubmit: (birthdays: Birthday[]) => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  hasReminders?: boolean;
}

export default function BirthdayForm({ 
  onSubmit, 
  onDelete, 
  isDeleting = false, 
  hasReminders = false 
}: BirthdayFormProps) {
  const { data: session } = useSession();
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [name, setName] = useState('');
  const [month, setMonth] = useState('1');
  const [day, setDay] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddBirthday = (e: React.FormEvent) => {
    e.preventDefault();
    const newBirthday: Birthday = {
      name,
      lunarBirthday: {
        year: new Date().getFullYear(),
        month: parseInt(month),
        day: parseInt(day),
      },
    };
    setBirthdays([...birthdays, newBirthday]);
    // Reset form
    setName('');
    setMonth('1');
    setDay('1');
  };

  const handleRemoveBirthday = (index: number) => {
    setBirthdays(birthdays.filter((_, i) => i !== index));
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    try {
      if (!session) {
        throw new Error('Not authenticated');
      }
      await addCalendarEvents(session, birthdays);
      setBirthdays([]); // Clear the list after successful submission
    } catch (error) {
      console.error('Failed to add events:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border border-neutral-800 rounded-lg p-8">
      <div className="flex flex-col gap-4 mb-8">
        <h2 className="text-3xl font-bold text-white">
          Add Lunar Birthdays
        </h2>
        {hasReminders && onDelete && (
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className={`${
              isDeleting ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'
            } text-white py-2 px-4 rounded transition-colors w-full`}
          >
            {isDeleting ? 'Deleting...' : 'Delete All Reminders'}
          </button>
        )}
      </div>
      
      {birthdays.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Added Birthdays:
          </h3>
          <ul className="space-y-3">
            {birthdays.map((birthday, index) => (
              <li 
                key={index}
                className="flex justify-between items-center p-3 bg-white dark:bg-gray-600 rounded-md shadow-sm"
              >
                <span className="text-gray-700 dark:text-gray-200">
                  {birthday.name} - {birthday.lunarBirthday.month}/{birthday.lunarBirthday.day}
                </span>
                <button
                  onClick={() => handleRemoveBirthday(index)}
                  className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleAddBirthday} className="space-y-6">
        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mom, Dad"
              className="w-full p-2 border border-neutral-800 rounded-md bg-neutral-800 text-white focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="form-group w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Month
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="1"
                className="w-full p-2 border border-neutral-800 rounded-md bg-neutral-800 text-white focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500"
                required
              />
            </div>
            <div className="form-group w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Day
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="1"
                className="w-full p-2 border border-neutral-800 rounded-md bg-neutral-800 text-white focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Add Birthday
          </button>
          {birthdays.length > 0 && (
            <button
              type="button"
              onClick={handleSubmitAll}
              disabled={isSubmitting}
              className={`flex-1 ${
                isSubmitting ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
              } text-white py-2 px-4 rounded transition-colors`}
            >
              {isSubmitting ? 'Creating Reminders...' : 'Create Reminders'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
