# SEE landing page

Marketing landing page for **SEE**, a mobile app for meaningful small-group experiences that has not launched yet. The page explains the product, introduces the team and collects **waitlist emails** (the single conversion today; store downloads come after launch). It also has a contact page with a message form and a meeting-request form.

Goals, in order: very fast load, Lighthouse/SEO near 100, near-zero client JavaScript, minimal infrastructure. Hosted on **Vercel**.

## Contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [Internationalization](#internationalization)
- [Design system](#design-system)
- [Quality gates](#quality-gates)
- [Deployment](#deployment)
- [Git workflow](#git-workflow)
- [AI tooling](#ai-tooling)
- [Known debt](#known-debt)

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16.2, App Router, React Server Components |
| UI | React 19.2, TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss`, design tokens in `styles/variables.css` |
| Icons | `lucide-react`, plus custom SVG components in `assets/icons/` |
| Waitlist and contact emails | Resend, called from Server Actions |
| Linting | ESLint 9 with `eslint-config-next` |
| Tests | None yet |

This is a recent Next.js version with breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before changing framework-level code.

## Getting started

Requirements: Node.js 20 or newer (developed on Node 24) and npm. The repo has a `package-lock.json`, so use npm.

```bash
git clone <repo-url>
cd see-landing
npm install
cp .env.example .env.local   # then fill in the values, see below
npm run dev
```

Open <http://localhost:3000>. The root redirects to your browser language (`/en` or `/ka`).

The site renders without any environment variables. Without the contact variables, the contact forms cannot send email.

## Environment variables

Set these in `.env.local` for development and in the Vercel project settings for production. `.env*` files are git-ignored except `.env.example`. Never commit real values.

| Variable | Scope | Purpose |
|---|---|---|
| `RESEND_API_KEY` | server only | Resend API key with **Full access** (a sending-only key cannot add waitlist contacts) |
| `RESEND_SEGMENT_ID` | server only | Id of the Resend segment that waitlist signups join |
| `CONTACT_TO_EMAIL` | server only | Inbox that receives the contact and meeting-request emails |
| `CONTACT_FROM_EMAIL` | server only | Sender on a domain verified in Resend, e.g. `SEE <hello@seevrce.ge>` |
| `NEXT_PUBLIC_SITE_URL` | public, optional | Canonical site origin. Defaults to `https://see.ge` |

Never put secrets in a `NEXT_PUBLIC_*` variable; those are shipped to the browser.

If a variable is missing, the form shows its generic error and, in development, the terminal prints a warning with the variable's name.

### Setting up Resend

1. Create an account at [resend.com](https://resend.com).
2. **Domains → Add Domain**: add `seevrce.ge` and copy the DNS records it shows (MX and TXT, on a `send` subdomain and `resend._domainkey`) to the domain's DNS provider. Don't change existing records. Wait until the domain shows **Verified**.
3. **API Keys → Create API Key** with **Full access**. Copy it right away; it is shown once.
4. **Contacts → Segments**: create a `Waitlist` segment and copy its id.
5. Copy `.env.example` to `.env.local` and fill in the four values. Before the domain is verified you can test with `CONTACT_FROM_EMAIL=onboarding@resend.dev`, which only delivers to your Resend account email.
6. In Vercel, **Settings → Environment Variables**: add the same four variables for Production and Preview, then redeploy.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on <http://localhost:3000> |
| `npm run build` | Production build. This is also the type check |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint |

## Project structure

```
app/[lang]/            Root layout per locale (html lang, metadata, Navbar, Footer) and pages
  page.tsx             Landing page, composes the sections
  contact/page.tsx     Contact page
app/actions/           Server Actions: contact.ts (message, meeting), waitlist.ts
app/globals.css        Tailwind import, utilities, base styles
proxy.ts               Redirects paths without a locale prefix using Accept-Language
i18n/                  config.ts (locales, siteUrl), get-dictionary.ts, format.ts
i18n/dictionaries/     en.ts holds every user-facing string; ka.ts is the Georgian copy
components/common/     Navbar, MobileNav, Footer, ThemeSwitcher, LanguageSwitcher and friends
components/ui/         Shared primitives: Typography, Button, Field, Input, Dropdown, ...
components/landing/    One file per landing section (Hero, Story, Team, Waitlist, ...)
components/waitlist/   WaitlistForm (client leaf)
components/contact/    Contact page parts and forms
lib/                   site.ts (nav, contact, social data), validation.ts, cn.ts
lib/server/            Server-only Resend integration: env.ts, resend.ts, mail.ts, waitlist.ts, form-data.ts
lib/content/           List structure for team and about content; text lives in the dictionary
assets/icons/          Custom SVG icon components, one per file
styles/                variables.css (design tokens), popover.css (dropdown and mobile menu panels)
types/                 All shared types and component prop interfaces
public/                Logo, favicon, hero image, team photos
.claude/, .cursor/     AI agent rules, skills and hooks (see AI tooling)
```

`@/*` resolves to the project root (for example `@/components/landing/Hero`). There are no barrel files.

## Architecture

- **Static on Vercel.** The landing page is statically generated (SSG) with React Server Components. The build's route table must keep `/[lang]` as static. No `output: 'export'`, so image optimization and Server Actions keep working.
- **Server Components first.** Never add `'use client'` to a page or layout. Client code is limited to small leaves: the waitlist form, the mobile nav toggle, the intention picker and small motion islands. Each client file states why on its second line (`// client: ...`).
- **Motion is CSS first.** Tailwind transitions and keyframes, scroll reveal through `animation-timeline: view()` with a small IntersectionObserver fallback. `prefers-reduced-motion` is always honoured and content is visible without JavaScript.
- **Forms use Server Actions.** Server-side validation, a honeypot field, generic error messages and no email addresses in logs. Client state uses `useActionState` and native HTML validation.
- **Assets.** `next/image` only, with `priority` on the hero image only. Fonts through `next/font` in the root layout.
- **No heavy dependencies.** No state libraries, form libraries, UI kits or extra animation libraries. Ask before adding any runtime dependency.
- **Store buttons come after launch.** Until then the tracked call to action is the waitlist submit.

## Internationalization

Supported languages: English (`en`, default) and Georgian (`ka`). All routes live under `app/[lang]/`.

- `i18n/dictionaries/en.ts` contains **every** visible string, `aria-label`, `alt` text and metadata text. Components receive their strings as a `t` prop. Do not hard-code copy in components or `lib/`.
- Internal links use `homeHref(lang, hash)` so the locale prefix is kept.
- To add a language: copy `en.ts` to `<code>.ts` typed `Dictionary`, add the code to `locales` and `localeNames` in `i18n/config.ts`, and register it in `i18n/get-dictionary.ts`.

## Design system

- Light theme by default. `data-theme="dark"` swaps the semantic tokens (`canvas`, `surface`, `ink`, `ink-muted`, `line`, `accent`, ...).
- Teal-tinted neutrals in both themes. One accent family, the teal `primary` scale. Add missing tokens to `styles/variables.css`, not to JSX.
- Use Tailwind classes with theme tokens. No hex or rgb values in components, no static `style={{}}`, no JS hover handlers, no `!important`.
- Layout: wrap content in `page-container` (max 1440px, side gutter 20px on mobile and 40px from 768px, never below the device safe area) and use `page-section` for vertical rhythm.
- Type scale: `text-10` to `text-64`. Use the `Typography` component for text and `Button` (`filled`, `outline`, `text`, `icon`) for buttons.
- Accessibility floor: semantic elements, visible `focus-visible`, labelled inputs, a single `<h1>`, alt text, contrast of at least 4.5:1.

## Quality gates

Run before opening a PR:

```bash
npm run lint && npm run build
```

- `/[lang]` must stay statically generated in the build's route table. Note the first-load JS; any increase needs a reason.
- For UI changes, check the page at desktop width and at 393px.
- For performance or SEO changes, also run Lighthouse in mobile mode. Budget: Performance and SEO at 95 or above, LCP under 2.5s, CLS under 0.1.

## Deployment

Hosted on Vercel, deployed from `main`. Every branch and pull request gets a preview deployment.

- Framework preset: Next.js. Root Directory: the repo root (default).
- Add the environment variables from [Environment variables](#environment-variables) for Production and Preview.
- Never push to `main` directly. Merge through a pull request.

## Git workflow

- One long-lived branch, `main`. Work on a branch and merge by pull request.
- Stage explicit paths. Never commit `.env*`.
- Agree the commit message before committing.
- No AI attribution lines in commits or pull requests.

## AI tooling

`AGENTS.md` is the single source of project rules for every AI tool. `CLAUDE.md` imports it for Claude Code, and Cursor reads it directly.

- `.claude/agents/` has specialised agents for UI, SEO, security and review.
- `.claude/skills/` has the workflows (reuse checks, React discipline, review commands, PR descriptions).
- `.claude/rules/` has per-area rules for components, `app/` and styles.
- `.claude/hooks/` guards risky shell commands and writes, and scans for secrets.
- `.cursor/rules/` has thin wrappers around the path rules for Cursor.

See `.claude/README.md` for details.

## Known debt

- Some sections still use static `style={{}}` and hex colours.
- Team photos are JPG sources (served as WebP/AVIF); `public/team/sophie.jpg` is a 1.4 MB original.
- The body uses a system font stack (no `next/font` yet).
- Metadata is incomplete: no OG image, sitemap or robots yet. Check the root layout before assuming what exists.
- No tests.
