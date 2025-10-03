# AlgoVisuals

Transform mathematical concepts into elegant animated visualizations. AlgoVisuals provides professional Manim-style animations for research, education, and content creation, built as a modern React + Vite web app with Supabase backend services.

> Live site: [https://www.algovisuals.org/](https://www.algovisuals.org/)


## Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Getting Started
  - Prerequisites
  - Environment Variables
  - Install & Run (Dev)
  - Build & Preview
- Supabase Integration
- Available Scripts
- Deployment (Vercel)
- SEO & Social Sharing
- Troubleshooting
- Contributing
- Security


## Overview

AlgoVisuals helps researchers, educators, and content creators turn formulas, algorithms, and mathematical concepts into compelling animations. The site includes an estimate calculator, request workflow, and an admin area for internal operations.


## Features

- Quick estimate calculator with region-aware pricing (USD / INR)
- Project request flow with budgets and descriptions
- Anonymous quick-estimate logging (Supabase table: `public.quick_estimates`)
- Authenticated project submission (Supabase table: `public.projects`)
- Admin dashboard pages (team, payments, requests, etc.)
- Responsive UI using shadcn/ui and Tailwind CSS
- 3D/math demos with three.js and @react-three/fiber


## Tech Stack

- Frontend: React 18, TypeScript, Vite
- UI: Tailwind CSS, shadcn/ui (Radix UI primitives)
- Data: Supabase (Auth, PostgREST, RLS, SQL migrations)
- 3D / Visualization: three.js, @react-three/fiber, @react-three/drei
- Utilities: Zod, React Hook Form, TanStack Query


## Project Structure

```text
.
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── EstimateCalculator.tsx
│   │   ├── Navigation.tsx
│   │   ├── sections/
│   │   └── ui/  (shadcn/ui components)
│   ├── hooks/
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── pages/
│   │   ├── Index.tsx           (home)
│   │   ├── EstimatePage.tsx    (/estimate)
│   │   ├── RequestPage.tsx     (/request)
│   │   ├── Auth.tsx
│   │   └── admin/              (admin pages)
│   ├── pricing/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── config.toml
│   └── migrations/             (SQL migrations)
├── index.html                   (SEO tags, structured data, favicon)
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```


## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ (or pnpm/yarn if preferred)
- A Supabase project (for hosted Postgres + auth)


### Environment Variables

Create a `.env` file at the repo root and define:

```env
VITE_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_ANON_KEY"
```

Notes:

- Only include your Supabase “anon/publishable” key here for the frontend.
- Do not commit service-role keys or secrets.
- The app reads these at build time via Vite.


### Install & Run (Dev)

```sh
npm install
npm run dev
```

The dev server defaults to port 8080 (see `vite.config.ts`).


### Build & Preview

```sh
npm run build
npm run preview
```

This produces a production build in `dist/` and serves it locally for inspection.


## Supabase Integration

- Supabase client is initialized in `src/integrations/supabase/client.ts`.
- Strongly typed DB types are generated in `src/integrations/supabase/types.ts`.
- The database schema and policies are maintained in `supabase/migrations/*.sql`.
  - Tables include `public.projects`, `public.project_files`, and `public.quick_estimates`.
  - Row-Level Security (RLS) policies allow anonymous insert for `quick_estimates` while protecting user data elsewhere.

If you manage your own Supabase project, apply the migrations with Supabase SQL Editor or the Supabase CLI. Keep your project’s schema aligned with the migrations in this repo.


## Available Scripts

- `npm run dev` — Start local dev server (Vite)
- `npm run build` — Production build
- `npm run preview` — Preview the production build locally
- `npm run lint` — Lint with ESLint


## Deployment (Vercel)

This project is configured for single-page app routing on Vercel via `vercel.json` (rewrite all routes to `index.html`).

1. Create a new Vercel project and import this repository.
2. Configure environment variables in Vercel Project Settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Deploy. Static assets (e.g., `/favicon.ico`, `/robots.txt`) will be served automatically.


## SEO & Social Sharing

- `index.html` contains:
  - Descriptive `<title>` and `<meta name="description">`
  - Open Graph and Twitter Card tags for social previews
  - Canonical URL set to `https://www.algovisuals.org/`
  - JSON-LD Structured Data for `Organization` and `WebSite`
  - Favicon declaration to help Google display the site icon in mobile results

Recommended:

- Replace `public/placeholder.svg` with your branded Open Graph image (`1200×630`).
- Ensure `/favicon.ico` is square and at least 48×48.


## Troubleshooting

- “Could not save estimate” after calculating:
  - Ensure your Supabase table `public.quick_estimates` matches the migration (no `currency` column unless you added it). The payload should not include a `currency` field unless the column exists.

- Favicon not showing in Google search:
  - Verify `<link rel="icon" href="/favicon.ico">` is present, `/favicon.ico` returns 200, and it’s a square icon at least 48×48.
  - Request indexing from Google Search Console for your homepage.


## Contributing

Issues and PRs are welcome. Please keep PRs focused and include a brief description of the change and any screenshots for UI updates.


## Security

- Never commit secrets or service-role keys.
- Frontend uses only the Supabase anon/publishable key.
- Report security issues privately to the maintainers.


