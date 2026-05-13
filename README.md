# FlowVid Frontend

FlowVid is a React frontend for a video platform with a home page, video detail view, channel pages, login/registration, and a protected upload area.

The application is built with Vite, uses React Router for routing, and fetches dynamic content from a backend through `VITE_BACKEND_URL`. Part of the home page content currently still comes from local JSON mock data.

## Features

- Home page with a randomly ordered video selection
- Video detail page with recommendations
- Channel area with separate subpages for description, videos, and playlists
- Registration with image upload
- Login with locally stored session state
- Protected upload page for authenticated users
- Tailwind CSS 4 for styling

## Tech Stack

- React 19
- Vite 7
- React Router 7
- Tailwind CSS 4
- Formik
- ESLint 9

## Requirements

- Node.js 20 or newer
- A running backend that provides the required endpoints

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Without this variable, API-based areas such as login, registration, upload, video detail data, and channel data will not work.

## Start Development

```bash
npm run dev
```

The app will then run through the local Vite development server.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Routing

The application currently provides the following main routes:

- `/` Home page
- `/login` Login
- `/register` Registration
- `/video/:id` Video detail page
- `/upload` Protected upload area
- `/channel/:id` Channel overview
- `/channel/:id/videos` Channel videos
- `/channel/:id/playlists` Channel playlists

## Backend Integration

The frontend currently expects at least these endpoints:

- `POST /login`
- `POST /register`
- `POST /upload`
- `GET /video/:id`
- `GET /channel/:id`

Authentication is managed in the frontend via `localStorage`. After a successful login, the token and user data are stored locally and used for protected routes.

## Project Structure

```text
src/
  components/         Reusable UI components
  components/video/   Video-specific UI building blocks
  context/            Auth and user context
  pages/              Route-level pages
  pages/channel/      Channel subpages
  sample_data/        Local mock data for videos and recommendations
  Utilities.js        API and helper functions
public/
  images/             Static thumbnails and placeholder assets
```

## Current Status

- The home page uses local sample data from `src/sample_data/recs.json`.
- Video and channel details are loaded from the configured backend.
- A MirageJS setup is visible as a development idea, but it is currently not wired in.
- There is currently no test suite in the repository.

## Build

```bash
npm run build
```

The production build is generated in the `dist/` directory.
