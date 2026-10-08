---
paths:
  - "app/**/*.css"
  - "tailwind.config.ts"
  - "postcss.config.mjs"
---

# Styles: Tailwind + tokens

- Tokens live in the Tailwind theme: today `tailwind.config.ts` (`dark-500` `#0f172a`, `primary-200`
  … `primary-600`, `primary-500` = `#22988E`). After the v4 migration they move to `@theme` in
  `app/globals.css`. Components use theme classes, never hex/rgb.
- **Tailwind v4 is the target.** `@tailwindcss/postcss` v4 is installed, but `tailwindcss` is v3 and
  `postcss.config.mjs` registers no plugins. Migration = `@import "tailwindcss"` + `@theme` tokens in
  `globals.css`, `"@tailwindcss/postcss": {}` in `postcss.config.mjs`, remove `tailwind.config.ts`
  and the v3 dependency. Do it as its own task, verify the page visually before and after.
- `globals.css` holds only: the Tailwind import, theme tokens, base element styles, and shared
  keyframes. No component styles by tag (`nav { … }`) and no `!important` — both exist today and
  are debt.
- Keyframes animate `transform`/`opacity` only and sit behind
  `@media (prefers-reduced-motion: no-preference)` (or are disabled under `reduce`).
- Scroll-driven reveals: `animation-timeline: view()` inside `@supports (animation-timeline: view())`,
  with content visible by default outside that block.
- Contrast on `dark-500`: body text ≥ 4.5:1 (`slate-300`/`slate-400` and lighter), large text ≥ 3:1.
- Keep `backdrop-filter` blur to a few elements; it is expensive on mobile GPUs.
