---
paths:
  - "components/**/*.tsx"
  - "components/**/*.ts"
---

# Components

## Server vs client

- Server Component by default. `'use client'` only on a leaf that needs state, effects, event
  handlers, DOM refs or browser APIs. Expected client leaves: the waitlist form, the mobile nav
  toggle, the demo video's play button, and small motion islands. Everything else is server.
- A client file's first line after `'use client'` is `// client: <why>`.
- Never make a whole section client to animate or wire one element: extract that element.
- Static copy, lists, links and icons live in Server Components or `lib/*.ts`, not in a client
  file's module scope.

## Motion policy

1. **CSS/Tailwind first**: fade-in, slide-up, hover, stagger (`animation-delay`) via Tailwind
   transitions or keyframes in `app/globals.css`. Animate `transform` and `opacity` only.
2. **Scroll reveal**: CSS `animation-timeline: view()` inside `@supports`; fallback is one small
   client leaf using IntersectionObserver that toggles a class. Content must be visible without JS
   (no SSR'd `opacity: 0` above the fold — it delays LCP and hides content from crawlers).
3. **Framer Motion by exception**: only in a client leaf, through `LazyMotion` + `m` (`domAnimation`
   features), for what CSS can't do (layout animation, `AnimatePresence` exit). Variants defined at
   module scope, not in render.
4. **Reduced motion always**: `motion-safe:` / `motion-reduce:` variants, a
   `prefers-reduced-motion` block, or `useReducedMotion()`.

## Markup and styling

- Tailwind classes with theme tokens (`bg-dark-500`, `text-primary-300`). No hex/rgb literals,
  including arbitrary values like `bg-[#0f172a]`; add a missing token to the theme.
- No static `style={{}}`; no `onMouseOver`/`onMouseOut`/`onFocus` handlers that write styles — use
  `hover:`, `focus-visible:`, `group-hover:`.
- Images: `next/image` only, with `width`/`height` (or `fill` + `sizes`), meaningful `alt` (`alt=""`
  if decorative), `priority` only on the hero image, `.webp`/`.avif` sources.
- Every interactive element is a `<button>` or `<a>` with a visible `focus-visible:` style; icon-only
  controls have `aria-label`; decorative SVGs have `aria-hidden`.
- One `<h1>` (in the hero), no skipped heading levels; sections use `aria-labelledby`.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Icons imported individually from `lucide-react`.

## Structure

- Target folders: `components/landing/` (sections), `components/common/` (Navbar, Footer,
  MobileNav), `components/ui/` (Button, Input, Eyebrow, SectionHeading), `components/waitlist/`.
  Move a file there when you touch it; ask before a bulk move.
- Split a component past ~200 lines into subcomponents in the same folder.
- Before adding a pill, heading, icon or button, run the `reuse-first` skill (see
  `.claude/skills/reuse-first/known-duplicates.md`).
- Stable keys from data (`id`, `href`, `name`), never the index for dynamic lists.
- Hooks discipline: `.claude/skills/react-discipline/SKILL.md`.

## Conversion CTA

- One waitlist CTA component, reused wherever the page asks for signup; its submit is the tracked
  conversion (when analytics is added: one event, no email in the payload).
- Store CTAs are **inactive until the app launches**: then one `DownloadAppButton` client leaf
  detects iOS/Android on click, links to the right store with UTM parameters, and fires one
  analytics event. Don't build it before then unless asked.
