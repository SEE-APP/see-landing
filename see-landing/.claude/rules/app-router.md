---
paths:
  - "app/**/*.tsx"
  - "app/**/*.ts"
  - "next.config.ts"
---

# App Router (`app/`) and Next config

Next 16 may differ from your training data: read the relevant guide in
`node_modules/next/dist/docs/` before using an API (see `AGENTS.md`).

## Rendering

- Hosted on **Vercel**: default static prerender (SSG) with Server Components. `/` must stay static
  (`○ (Static)` in the `next build` route table).
- **No static export**: don't add `output: 'export'` or `images.unoptimized` — on Vercel they only
  lose image optimization and Server Actions.
- Nothing on `/` reads per-request data: no `cookies()`, `headers()`, `searchParams`, `no-store`
  fetches or `dynamic = 'force-dynamic'`.
- Never `'use client'` in `page.tsx` or `layout.tsx`. Add `loading.tsx`/`error.tsx`/`not-found.tsx`
  only when a route needs them (a custom `not-found.tsx` with a link home is welcome).

## Metadata (root `layout.tsx`, overridden per route)

Use the Metadata API, never hand-written `<meta>` in JSX:
- `metadataBase` (production URL), `title: { default, template: '%s | SEE' }`, `description`
  (≤ 160 chars), `alternates.canonical`.
- `openGraph` (`type`, `siteName`, `title`, `description`, `url`, `images`) and `twitter`
  (`card: 'summary_large_image'`).
- `icons`, `appleWebApp.title`; `viewport`/`themeColor` via `export const viewport`.
- Files: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.(tsx|png)`.
- JSON-LD (`Organization`, `WebSite`) rendered from a Server Component with `<` escaped.
- Store metadata (`itunes.appId` Smart App Banner, app links) is **inactive until launch** — no
  placeholder ids.

## Layout

- Fonts via `next/font` (`geist/font` is installed) applied as a class/CSS variable on `<html>`.
- No inline `style` on `<html>`/`<body>`: background and text colour come from theme classes or
  `globals.css`.
- `lang="en"` on `<html>`.

## Forms and data

- Form submissions use a **Server Action** (`'use server'`, e.g. `app/actions.ts`) with
  `useActionState` in the client form. The action validates on the server, reads endpoints/keys from
  server env (no `NEXT_PUBLIC_`), adds a honeypot, returns generic errors, never logs the email.
- `app/api/**` route handlers only for something a Server Action can't serve (a webhook, a public
  GET).
- No form libraries for one or two fields; native validation first.

## next.config.ts

- Keep `export default` (TypeScript config, not `module.exports`).
- Security headers live in `headers()` — see the `frontend-security` agent for the baseline. A new
  third-party origin needs a CSP entry.
- `images.remotePatterns` only for hosts actually used.
