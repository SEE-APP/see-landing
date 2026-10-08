<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SEE landing page

Marketing landing page for **SEE**, a mobile app for meaningful small-group experiences that hasn't
launched yet. The page is a low-touch marketing driver: explain the product, show the team and demo,
and collect **waitlist emails** (the one conversion today; store downloads after launch).

Goals, in order: very fast load, Lighthouse/SEO near 100, near-zero client JavaScript, minimal
infrastructure. Hosted on **Vercel**.

This file is the single source of project rules for every AI tool (Cursor reads it directly;
`CLAUDE.md` imports it for Claude Code). Agents, skills, path rules and hooks live in `.claude/`
(Cursor also gets thin `.cursor/rules/*.mdc` wrappers for the path rules) — see `.claude/README.md`.

## Stack

Next.js 16.2 App Router · React 19.2 · TypeScript 5 strict · Tailwind v4 (`@tailwindcss/postcss`) · lucide-react · Formspree (waitlist) · Framer Motion 12 (by exception
only) · `geist` font package · ESLint 9 (`eslint-config-next`). No test runner.

## Commands

```bash
npm run dev     # next dev on http://localhost:3000
npm run build   # next build — also the typecheck
npm run lint    # eslint
npm run start   # serve the production build
```

## Gates (run before claiming done)

```bash
npm run lint && npm run build
```
- In the build's route table `/` must stay `○ (Static)`. Note `/`'s first-load JS; any increase
  needs a reason.
- UI change: ask before starting `npm run dev`. If the user agrees, check the page at desktop and
  393px width and stop the server afterwards. Perf/SEO change: also run Lighthouse (mobile).
  Budget: Performance and SEO ≥ 95, LCP < 2.5s, CLS < 0.1.
- Say plainly what you did not check.

## Rendering and architecture

- **Static on Vercel.** SSG with React Server Components. No `output: 'export'`, no
  `images.unoptimized` (static export would only lose image optimization and Server Actions here).
  Nothing on `/` reads per-request data.
- **Server Components first (95%+ of the code).** Never `'use client'` on a page or layout.
  Client leaves only: the waitlist form, the mobile nav toggle, the demo play button, small motion
  islands. Each client file says why on its second line (`// client: …`).
- **Motion: CSS first.** Tailwind transitions/keyframes for fade, slide, hover, stagger; scroll
  reveal via `animation-timeline: view()` with a tiny IntersectionObserver fallback. Framer Motion
  only in a client leaf via `LazyMotion` + `m`, for what CSS can't do. Always honour
  `prefers-reduced-motion`. Content is visible without JS.
- **Forms: Server Action.** The waitlist posts through a `'use server'` action (endpoint in a server
  env var, server-side validation, honeypot, generic errors, no email in logs) with
  `useActionState`. Native HTML validation; no form libraries.
- **Metadata API, complete.** `metadataBase`, title template, description, canonical, Open Graph,
  Twitter card, icons; `app/sitemap.ts`, `app/robots.ts`, an OG image; JSON-LD `Organization` +
  `WebSite`.
- **Assets.** `next/image` only (dimensions or `fill` + `sizes`, `priority` on the hero only,
  WebP/AVIF). Fonts via `next/font` in `layout.tsx`.
- **No heavy dependencies.** No state libraries, form libraries, UI kits or extra animation
  libraries. Ask before adding any runtime dependency.
- **Store CTAs: after launch only.** Then: Smart App Banner via `metadata.itunes`, one
  `DownloadAppButton` client leaf (OS detection, UTM parameters, one analytics event). Until then
  the tracked CTA is the waitlist submit.

Detailed rules per area: `.claude/rules/components.md` (components), `.claude/rules/app-router.md`
(`app/`, `next.config.ts`), `.claude/rules/styles.md` (CSS, Tailwind config). Read the matching one
before editing those files.

## Structure

```
app/[lang]/         layout.tsx (root layout per locale: html lang, metadata + hreflang, Navbar + main + Footer), page.tsx (composes sections)
app/globals.css     Tailwind import, utilities, base styles
proxy.ts            redirects paths without a locale prefix to the visitor's language (Accept-Language)
i18n/dictionaries/  en.ts holds EVERY user-facing string; other languages are copies typed `Dictionary`
i18n/config.ts      locales, defaultLocale, localeNames, siteUrl (NEXT_PUBLIC_SITE_URL), hasLocale
i18n/get-dictionary.ts  loads a dictionary on the server; i18n/format.ts fills {placeholders}
assets/icons/       custom SVG icon components, one per file (lucide-react for the rest)
components/common/  Navbar, MobileNav, Footer, LanguageSwitcher (rendered in the root layout)
components/ui/      Typography, Button, Eyebrow, Dropdown (server-safe primitives; use them for all text and buttons), PopoverPanel (client leaf)
components/         section components, still flat: Hero, About, Team, Demo, Waitlist
lib/site.ts         site data: nav links, contact details, social links
lib/content/        list structure (ids, icons, years, avatars, URLs) for team.ts, about.ts; text lives in the dictionary
lib/motion.ts       shared Framer Motion variants (staggerContainer, fadeUpItem, easeOutExpo)
lib/validation.ts   isValidEmail
lib/cn.ts           className joiner (no clsx/tailwind-merge: don't pass a class that conflicts with a variant's)
types/              all shared types: content.ts, site.ts, sections.ts, layout.ts, ui.ts (component props), i18n.ts (Dictionary, Locale)
styles/variables.css  design tokens (@theme) and layout variables (gutters, header height)
public/             logo, favicon, team photos
```
Target layout (move a file when you touch it; ask before bulk moves):
`components/landing/` (Hero, About, Team, Demo), `components/common/` (Navbar, Footer, MobileNav),
`components/ui/` (Button, Input, Eyebrow, SectionHeading), `components/waitlist/` (form),
`lib/` (pure helpers, site constants), `app/actions.ts` (Server Actions).
`@/*` points at the project root (`@/components/Hero`). No barrel files.

## Code standards

- Reuse before writing: `reuse-first` skill, `.claude/skills/reuse-first/catalog.md` and
  `known-duplicates.md`. The second copy is the trigger to promote to `components/ui/`; don't
  pre-abstract for a single use.
- No hard-coded copy in components or `lib/`: every visible string, `aria-label`, `alt` and metadata
  text goes in `i18n/dictionaries/en.ts` and reaches components as a `t` prop (server components get it
  from the page/layout; client sections get only their own slice). Internal links use `homeHref(lang, hash)`.
  Adding a language: copy `en.ts` to `<code>.ts` typed `Dictionary`, add the code to `locales` and
  `localeNames`, and register it in `get-dictionary.ts`.
- Component files hold rendering only: data goes in `lib/content/` or `lib/site.ts`, types
  and prop interfaces in `types/`, helpers in `lib/`. Icons in data are component references
  (`icon: Users`), not JSX.
- KISS. Three similar lines beat a premature helper. Split components past ~200 lines.
- Hooks discipline (`react-discipline` skill): no memoization without a measured reason; derive
  instead of syncing state in effects; clean up every listener/observer.
- Stable keys from data, never the index for dynamic lists.
- Tailwind classes with theme tokens; no hex/rgb in components (including `bg-[#…]`), no static
  `style={{}}`, no JS hover handlers, no `!important`.
- Accessibility floor: semantic elements, visible `focus-visible`, labelled inputs, one `<h1>`,
  alt text, contrast ≥ 4.5:1 on the dark surface.
- Delete dead code instead of commenting it out. No `console.log` left behind.

## Design tokens

Dark surface `dark-500` `#0f172a`; accent is the teal `primary` scale — `primary-200` `#7DD6CD`,
`300` `#47BDB2`, `400` `#2FA399`, `500` `#22988E` (main), `600` `#177B72`. Secondary text
`slate-400`, footer surface `dark-700`. Defined in `@theme` in `styles/variables.css`.
One accent family; add missing tokens to the theme, not to JSX.

Safe grid: wrap content in `page-container` (max 1440px content, side gutter `--gutter-x`: 20px
mobile, 40px from 768px, never less than the device safe area) and use `page-section` /
`--gutter-y` (20px / 40px) for vertical rhythm.

Type scale: `--text-10` … `--text-64` in `@theme` (classes `text-14`, `text-40`, …, each with its
line height). Use `Typography` (`size`, `weight`, `tone`, `as`); responsive steps go in
`className` (`size={32} className="md:text-40"`). Buttons: `Button` (`filled` = teal pill with
dark text for contrast, `outline`, `text`, `icon`; `href` renders a `next/link`). Design references for structure
only: `.claude/design-references/`.

## Known debt (fix opportunistically, don't let it spread)

- All 5 section components are `'use client'` (70–630 lines); Framer Motion in `About`, `Team`,
  `Demo`, `Waitlist`.
- Many static `style={{}}` and hex colours in the sections.
- Raw `<img>` in `components/Hero.tsx` and `components/Team.tsx`; team photos are JPG.
- `geist` installed but unused; body uses a system font stack.
- Waitlist `fetch`es Formspree from the client with the form id hardcoded
  (`components/Waitlist.tsx`) → Server Action + env var.
- Metadata is title/description/icons only: no `metadataBase`, OG, Twitter, canonical, sitemap,
  robots or OG image.
- Duplicates: see `known-duplicates.md`.
- No tests.

## Agents, skills and workflow

| When | Use |
|---|---|
| New UI, visual polish | `frontend-designer` agent; taste: `taste-skill`, `minimalist-skill`, `redesign-skill`, `emil-design-eng` |
| Animation | `animate`, `improve-animations`, `review-animations`, `find-animation-opportunities` (CSS-first policy above wins) |
| Metadata, SEO, OG, sitemap | `seo` agent |
| Forms, headers, env vars, external scripts | `frontend-security` agent before merge |
| Components, hooks, effects | `react-discipline`; perf depth: `vercel-react-best-practices`, `vercel-composition-patterns` |
| About to write a component/helper | `reuse-first` |
| Bug (non-trivial) | systematic-debugging skill → fix → verify |
| Deploy questions | `deploy-to-vercel` |
| Task finished (author) or reviewing a branch | `review-web` skill (`/review-web [base] [full]`) — 4 reviewers, one report, derived verdict |
| PR description | `/pr-from-branch` or `/pr-from-session` |
| Quick strict review | `/review-critique` (recent changes) or `/review-fe-branch [branch] [base]` |

Agents: `.claude/agents/`. Skills (including the `/` workflows above): `.claude/skills/`.

## Collaboration

- When a decision is the user's (scope, copy, a trade-off without a clear default), ask with the
  structured question tool (`AskQuestion` in Cursor, `AskUserQuestion` in Claude Code); don't guess
  and continue.
- Plans are agreed in the conversation. Don't create docs, specs or guides unless asked.
- Fact-check copy: no invented numbers, dates or user counts on the page.

## Git

- One long-lived branch: `main` (production on Vercel; previews per branch/PR). Work on a branch,
  merge by PR. Never push to `main` directly.
- Show the commit message to the user before committing. Never commit or push without being asked.
- Stage explicit paths (no `git add .`/`-A`); never commit `.env*`.
- No AI attribution in commits or PRs (no `Co-Authored-By` trailers, no "Generated with" lines).
