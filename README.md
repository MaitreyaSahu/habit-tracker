# Tracker

Tracker is a production-ready offline-first Progressive Web App for habit tracking and study planning, built with React, Vite, TypeScript, Tailwind CSS, Zustand, IndexedDB, Framer Motion, and the Vite PWA plugin.

## Features

- Offline-first PWA with install prompt, manifest, and service worker caching
- Habit tracking with daily or weekly habits, inline editing, streaks, swipe actions, and calendar history
- Study planner with priority, deadline, filters, search, tags, completion states, and drag-and-drop ordering
- Dashboard with progress summaries, charts, streak highlights, and a Pomodoro timer
- Settings for theme override, export/import JSON backups, and reset-all data controls
- Responsive premium UI with glassmorphism, soft shadows, dark mode, animations, loaders, and toasts

## Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Zustand
- IndexedDB via `idb` with LocalStorage fallback
- Framer Motion
- `vite-plugin-pwa`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the local URL shown by Vite.

## Production Build

```bash
npm run build
```

The generated production assets will be in `dist/`.

## GitHub Pages Deployment

This project is preconfigured with a Vite base path of `/habit-tracker/` and uses `HashRouter` for reliable GitHub Pages routing.

1. Push the repository to GitHub.
2. If your repository name is not `habit-tracker`, update `VITE_BASE_PATH` in `vite.config.ts`.
3. Build and deploy:

```bash
npm run deploy
```

4. In GitHub repository settings, ensure GitHub Pages is serving from the `gh-pages` branch if needed.

## PWA Preview

- Use Chrome, Edge, or a modern mobile browser.
- Open the deployed app or local preview.
- Use the install button in the header or the browser install prompt.
- Switch your network offline in DevTools to confirm local persistence and cached shell behavior.

## Project Structure

```text
src/
├── app/
├── assets/
├── components/
├── features/
│   ├── habits/
│   └── tasks/
├── hooks/
├── pages/
├── store/
├── styles/
└── utils/
```
