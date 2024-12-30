# Lunar Birthday Reminder

A Next.js application that helps you track and manage lunar calendar birthdays by automatically converting them to Gregorian calendar dates and creating Google Calendar reminders.

## Features

- Convert lunar calendar dates to Gregorian calendar dates
- Support for lunar leap months
- Google Calendar integration
- Automatic reminder creation for multiple years (up to 2053)
- Clean, modern UI with dark mode
- Secure authentication with Google OAuth

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js
- Google Calendar API
- Jest for testing

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Google OAuth credentials:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Testing

Run the test suite:
