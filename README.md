# Print To Frame — Website

Marketing website for Print To Frame Pvt Ltd, a Sri Lankan steel-frame and digital print fabrication company. The staff/customer Fabrication Portal is a separate application hosted at `portal.print2frame.xyz`; this site only links out to it.

Live site: https://www.print2frame.xyz

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** (dev server / build)
- **Tailwind CSS 4**
- **Firebase** (Cloud Functions + Firestore backend for the Contact Us lead-capture form)
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

- `VITE_RECAPTCHA_SITE_KEY` — Google reCAPTCHA v2 site key, used on the contact form.
- `VITE_FIREBASE_*` — Firebase Web App config, from Firebase Console → Project Settings → General → Your apps. Used to call the `submitLead` Cloud Function (see `functions/`) that stores Contact Us submissions in Firestore and emails `info@print2frame.xyz`.
- `GEMINI_API_KEY`, `APP_URL` — legacy variables retained from the original AI Studio scaffold; not required for local development of the marketing site.

## Project Structure

```
src/
  components/   Page-level React components (Home, Process, Capabilities, Portfolio, ContactUs, ...)
  lib/          firebase.ts (shared app instance), leads.ts (calls the submitLead function)
  App.tsx       Root component: routing, navigation, SEO metadata
  types.ts      Shared TypeScript types
public/         Static assets served as-is (favicons, logos, sitemap, robots.txt)
functions/      Cloud Functions backend for the Contact Us form (Firestore write + email via Gmail SMTP)
```

## Git Hooks

Husky runs `lint-staged` on every commit, which lints and formats staged `.ts`/`.tsx` files and formats staged `.css`/`.json`/`.md` files. This is installed automatically via the `prepare` script on `npm install`.

## Deployment

- **Vercel**: `vercel.json` rewrites all routes to `/index.html` for SPA routing. This is the live production host for `www.print2frame.xyz`, connected via Vercel's GitHub integration.
- **Firebase Hosting**: `firebase.json` serves the `dist/` directory with SPA rewrites. Currently unused/inactive — Firebase in this project is for the Cloud Functions + Firestore lead-capture backend, not hosting.

### Deployment Workflow

Vercel's GitHub integration builds a **Preview** deployment automatically for every push to any branch other than `main`, and a **Production** deployment for every push to `main` — no GitHub Actions or extra config needed.

1. Push work to a `staging` branch (or open a PR from it into `main`).
2. Review the Preview URL — found on the Vercel dashboard's Deployments tab, on the GitHub commit's status checks, or auto-commented on the PR if one is open.
3. Once happy with the preview, merge `staging` into `main` (via the PR, or `git merge staging && git push origin main`).
4. Vercel automatically deploys `main` to the live production site.

Note: the Contact Us form's backend (the `submitLead` Cloud Function, Firestore, and the `info@print2frame.xyz` notification email) is shared infrastructure with no separate staging environment — submitting the form from a Preview deployment creates a real lead and sends a real email, same as production.
