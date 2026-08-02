# Momentum

A career management platform for tracking job applications end to end, board and table views, notes, interviews, an activity log, and analytics.

**Live app:** [momentum-ebon-ten.vercel.app](https://momentum-ebon-ten.vercel.app)

## Why this exists

Job searching generates a lot of scattered state: applications, notes, interview dates, follow-ups, with no single place to see it all or track progress over time. Momentum solves that for personal use first, and doubles as a demonstration of full product thinking, not just UI work: real auth, a Postgres schema with row-level security, optimistic UI, and analytics derived from actual activity data rather than static mockups.

## Features

- **Board and table views** of every application, switchable and synced to the URL
- **Drag-and-drop status updates** on the board, optimistic with automatic rollback on failure
- **Application detail drawer** with notes and scheduled interviews per application
- **URL-driven filters and search**, debounced, shareable, and back-button aware
- **Dashboard analytics** (response rate, weekly application volume, status breakdown) computed from a real activity log, not derived from current-state snapshots
- **Full auth**, email plus Google and GitHub OAuth, with Postgres row-level security on every table so a user can only ever read or write their own data
- **Accessible by default**, real focus traps and Escape-to-close on Modal and Drawer, audited aria-labels on every icon-only control
- **Responsive from mobile through 4K**, including a mobile-specific status-picker sheet that replaces drag-and-drop on touch devices

## Tech stack

- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Data & server state:** Supabase (Postgres, Auth, Row Level Security), TanStack Query
- **Drag and drop:** dnd-kit
- **Charts:** Recharts
- **Routing:** React Router (URL-driven filters via `useSearchParams`)

Client/UI state that doesn't need to be shared across the app uses local component state; state that does (auth) lives in React Context, following a three-file separation pattern (context object, provider, hook) to keep concerns split cleanly.



## Project structure

```
src/
  components/    # UI primitives, layout, and feature components, kept presentational
  context/       # context objects and providers, split into separate files
  hooks/         # data fetching and mutations (TanStack Query), one concern per hook
  lib/           # Supabase client, data mappers, query client config
  pages/         # routed pages
  types/         # hand-written interfaces plus generated Supabase types
```

UI, data, and logic are kept in separate layers throughout: components stay presentational, hooks own fetching and mutations, and mapper functions at the API boundary keep Postgres's `snake_case` from leaking into the rest of the app.

## Status

Core MVP is feature-complete: auth, CRUD, board and table views, filters, notes and interviews, analytics, and a full accessibility and polish pass. Global search and a command palette are scoped for later, deliberately out of scope for now.