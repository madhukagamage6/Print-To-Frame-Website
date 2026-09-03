# Print To Frame — Website

Marketing website and customer fabrication portal for Print To Frame Pvt Ltd, a Sri Lankan steel-frame and digital print fabrication company.

Live site: https://www.print2frame.xyz

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** (dev server / build)
- **Tailwind CSS 4**
- **Firebase** (Google Workspace auth for the fabrication portal)
- **Motion** (animations)
- **Vitest** + **React Testing Library** (tests)
- **ESLint** + **Prettier** (linting/formatting)
- **Husky** + **lint-staged** (pre-commit checks)

## Getting Started

**Prerequisites:** Node.js 20+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template and fill in the values (see [Environment Variables](#environment-variables)):
   ```bash
   cp .env.example .env.local
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   The app runs at http://localhost:3000.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run the TypeScript compiler with no emit |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and auto-fix issues |
| `npm run format` | Format the codebase with Prettier |
| `npm run format:check` | Check formatting without writing changes |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run clean` | Remove build artifacts |

## Environment Variables

Copy `.env.example` to `.env.local` (gitignored) and fill in:

- `VITE_RECAPTCHA_SITE_KEY` — Google reCAPTCHA v3 site key, used on the contact form.
- `VITE_FIREBASE_*` — Firebase Web App config, from Firebase Console → Project Settings → General → Your apps. Used for Google sign-in on the fabrication portal (`/portal-login`).
- `GEMINI_API_KEY`, `APP_URL` — legacy variables retained from the original AI Studio scaffold; not required for local development of the marketing site.

## Project Structure

```
src/
  components/   Page-level React components (Home, Process, Capabilities, Portfolio, ContactUs, PipelineDashboard, ...)
  lib/          Firebase auth + Google Workspace API helpers (workspace.ts)
  App.tsx       Root component: routing, navigation, SEO metadata
  types.ts      Shared TypeScript types
public/         Static assets served as-is (favicons, logos, sitemap, robots.txt)
```

## Git Hooks

Husky runs `lint-staged` on every commit, which lints and formats staged `.ts`/`.tsx` files and formats staged `.css`/`.json`/`.md` files. This is installed automatically via the `prepare` script on `npm install`.

## Deployment

- **Vercel**: `vercel.json` rewrites all routes to `/index.html` for SPA routing.
- **Firebase Hosting**: `firebase.json` serves the `dist/` directory with SPA rewrites.
