lunar-birthday-reminder/
├── .env.local                    # Environment variables (Google OAuth, API keys)
├── .gitignore
├── package.json
├── README.md
├── next.config.js
├── tsconfig.json
├── src/
│   ├── app/                      # Next.js 13+ app directory
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx             # Home page with birthday input form
│   │   ├── loading.tsx          # Loading UI
│   │   └── error.tsx            # Error handling
│   ├── components/              # React components
│   │   ├── forms/
│   │   │   ├── BirthdayForm.tsx    # Main form component
│   │   │   └── InputField.tsx      # Reusable input component
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Reusable button component
│   │   │   └── Feedback.tsx        # Success/error messages
│   │   └── layout/
│   │       └── Header.tsx          # App header
│   ├── lib/                     # Utility functions and API clients
│   │   ├── types.ts             # TypeScript types/interfaces
│   │   ├── lunar-api.ts         # Lunar Calendar API client
│   │   ├── google-calendar.ts   # Google Calendar API integration
│   │   └── utils.ts             # Helper functions
│   ├── hooks/                   # Custom React hooks
│   │   └── useGoogleAuth.ts     # Google OAuth hook
│   ├── styles/                  # Global styles
│   │   └── globals.css
│   └── config/                  # Configuration files
│       └── constants.ts         # App constants
├── public/                      # Static files
│   ├── favicon.ico
│   └── images/
└── tests/                       # Test files
    ├── components/
    └── lib/
