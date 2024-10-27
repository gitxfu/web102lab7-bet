# Bet 1.0 - Challenge Tracking App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses Supabase for the backend database.

## Setup Instructions

### 1. Supabase Setup

1. Go to [Supabase](https://supabase.com/) and create an account
2. Create a new project:
   - Click "New Project"
   - Name your project (e.g., "bet")
   - Set a database password
   - Click "Create new project"

3. Create the Posts table:
   - Go to Database → Tables
   - Click "New Table"
   - Name: Posts
   - Columns:
     - id (default)
     - created_at (default)
     - title (type: text)
     - author (type: text)
     - description (type: text)
     - betCount (type: numeric, default: 0)
   - Uncheck "Enable Row Level Security"
   - Check "Enable Realtime"
   - Click "Save"

4. Get your API credentials:
   - Go to Project Settings → API
   - Copy your Project URL and anon/public API key
   - Create a file `src/client.js` with:

```javascript
import { createClient } from '@supabase/supabase-js'

const URL = 'your-project-url';
const API_KEY = 'your-anon-key';

export const supabase = createClient(URL, API_KEY);
```

### 2. Project Setup

1. Clone the repository
2. Install dependencies:
```bash
cd client
npm install
```

3. Install Supabase client:
```bash
npm install @supabase/supabase-js
```

4. Start the development server:
```bash
npm start
```

## Available Scripts

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Features

- Create new challenges with title, author, and description
- View all challenges on the homepage
- Edit existing challenges
- Delete challenges
- Track bet counts for each challenge

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Supabase documentation](https://supabase.com/docs)
