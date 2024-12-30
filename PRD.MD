Project Name: Lunar-to-Gregorian Birthday Reminder Web App

1. Overview

Purpose:
This web application is a simple, personal tool to manage family birthdays based on the Chinese lunar calendar. It allows you to input multiple family members’ names and birthdays, converts them to corresponding Gregorian dates for the current year and the next 3 years using the Lunar Calendar API by hnthap, and adds these events directly to your Google Calendar. The app uses a single Gmail account (yours) as both the event creator and recipient.

Target Audience:
	•	You, as the sole user of this tool.

2. Goals and Objectives

Goals
	1.	Allow manual input of multiple names and Chinese lunar calendar birthdays.
	2.	Convert lunar calendar birthdays to Gregorian dates for the current year and the next 3 years.
	3.	Add events directly to your Google Calendar using a single authenticated Gmail account.

3. Features

Core Features
	1.	Add Multiple Birthdays
	•	Input fields for each person:
	•	Name (e.g., Mom, Dad).
	•	Lunar calendar birthday (Year, Month, Day, including leap month handling).
	•	Allow adding multiple entries in a single session.
	2.	Lunar-to-Gregorian Conversion
	•	Use built-in lunar calendar conversion logic to convert the input lunar calendar birthdays into corresponding Gregorian dates for the current year and the next 3 years.
	3.	Google Calendar Event Creation
	•	Authenticate with a single Gmail account (yours).
	•	Add all birthdays as events directly to your Google Calendar:
	•	Event name: “[Name]’s Birthday.”
	•	Event date: One day before the Gregorian calendar birthday.
	4.	Confirmation and Feedback
	•	Display a success message showing the events created and their dates.

4. Technical Requirements

Frontend
	•	Framework: Next.js with React.
	•	Minimal UI with:
	•	Input form to add multiple birthdays in one session.
	•	Feedback to confirm events have been added.

Backend
	•	Lunar Calendar Conversion:
	•	Use built-in lunar calendar conversion logic with lookup table for Chinese New Year dates.
	•	Support for years 2000-2050.
	•	Google Calendar API Integration:
	•	Authenticate with your Gmail account via OAuth.
	•	Use your Gmail account to create calendar events directly.

Authentication
	•	Use Google OAuth 2.0 to securely authenticate with your Gmail account.

5. User Workflow
	1.	Input Birthday Details
	•	Open the web app.
	•	Enter details for each person:
	•	Name (e.g., Mom).
	•	Lunar calendar birthday (e.g., 1968年3月初十).
	•	Add as many birthdays as needed.
	2.	Event Creation and Confirmation
	•	Click “Create Reminders.”
	•	The app uses the Lunar Calendar API by hnthap to convert lunar birthdays to Gregorian dates for the current and next 3 years.
	•	Adds events to Google Calendar using your Gmail account.
	•	Displays a confirmation message listing the added events.
	3.	View Reminders
	•	Open Google Calendar to see all added events:
	•	Event name: “[Name]’s Birthday.”
	•	Event date: One day before the Gregorian calendar birthday.

6. Success Metrics
	1.	Events successfully added to Google Calendar for all specified years.
	2.	Lunar-to-Gregorian conversion is accurate using the Lunar Calendar API by hnthap.
	3.	Multiple birthdays can be handled seamlessly in a single session.

7. Milestones and Timeline

Phase 1: Core Functionality (1 Week)
	•	Build the UI for adding multiple birthdays.
	•	Integrate the Lunar Calendar API by hnthap for conversion.

Phase 2: Google Calendar Integration (1 Week)
	•	Authenticate with Google OAuth.
	•	Implement event creation for multiple birthdays.

Phase 3: Testing and Deployment (1 Week)
	•	Verify lunar-to-Gregorian conversion accuracy.
	•	Test event creation in Google Calendar.
	•	Deploy using Vercel.

8. Future Enhancements
	•	Extend functionality to include more years or recurring events.
	•	Add optional email reminders.
