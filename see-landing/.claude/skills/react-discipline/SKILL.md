---
name: react-discipline
description: House React + Next.js App Router rules for the SEE landing page — Server Components by default and where the 'use client' boundary goes, when memoization is justified and when it is harmful, effects vs derived state, stable keys, forms with Server Actions, and import hygiene. Use when writing or reviewing any component, hook or form, and before adding 'use client', useMemo/useCallback/React.memo or a useEffect.
---

# React discipline (Next.js App Router)

AGENTS.md and `.claude/rules/` add the project specifics. Where `vercel-react-best-practices`
disagrees with this file, this file wins.

## 1. Server Components by default

- Every component is a Server Component unless it **needs** the browser: state, effects, event
  handlers, refs to DOM nodes, browser APIs, or a motion library.
- Never put `'use client'` on `app/**/page.tsx` or `app/**/layout.tsx`.
- Push the boundary to the smallest leaf. A section with one interactive button is a Server
  Component that renders a tiny client `<Button>`; it is not a client section.
- A client file starts with a one-line comment saying why it needs the client
  (`// client: form state + submit`). If you can't write that line, it shouldn't be a client file.
- Static data (copy, lists, links) lives in Server Components or plain `.ts` modules, never in a
  client component's module scope, where it ships as JS.
- Props crossing the server→client boundary must be serializable (no functions, no class instances).

## 2. Memoization is not free

`useCallback`, `useMemo` and `React.memo` cost dependency checks, memory and stale-closure risk.
Add one only when **all three** hold:

1. There is a real re-render or recomputation cost (heavy work, a large list, or a child wrapped
   in `React.memo`).
2. Its dependencies are stable most of the time (otherwise the cache misses every render).
3. It doesn't introduce a fragile dependency array.

Anti-patterns:
- `useCallback` passed to a non-memoized child: does nothing, only adds cost.
- `useMemo` over a cheap `.map`/`.filter` on a small array (under ~50 items).
- `React.memo` on a component whose props change every render, or on a trivial 1–2 element component.

When in doubt, leave the simpler code.

## 3. Effects

- Derive values during render; don't mirror props/state into state with an effect.
- Put work caused by a user action in the event handler, not in an effect that watches state.
- Every effect that subscribes, times, observes (IntersectionObserver, resize) or animates cleans up.
- Hover, focus and scroll-reveal styling is CSS (`hover:`, `focus-visible:`, `animation-timeline`),
  not `onMouseOver`/`onMouseOut` handlers writing `style`.

## 4. Lists and keys

Stable, unique keys from data (`id`, `slug`, `href`), never the array index for lists that reorder,
insert or delete.

## 5. Forms

- Native validation first (`type="email"`, `required`, `pattern`), then a `useActionState` +
  Server Action (target) or a small `useState` submit handler.
- No form libraries (react-hook-form, formik, zod) for a one- or two-field form.
- Guard double submit (disable while pending), show success and error states, keep the input's
  value on error.

## 6. Imports and dependencies

- Import icons one by one from `lucide-react` (`import { Mail } from 'lucide-react'`), never the
  whole set.
- Framer Motion only in a client leaf, through `LazyMotion` + `m` (see `.claude/rules/components.md`).
- No state libraries (Redux, Zustand, Jotai): a landing page doesn't need global client state.
- Don't create barrel files (`index.ts` re-exporting a folder): they defeat tree-shaking.
- Ask before adding any runtime dependency.
