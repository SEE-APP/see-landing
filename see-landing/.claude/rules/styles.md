---
paths:
  - "app/**/*.css"
  - "styles/**/*.css"
  - "postcss.config.mjs"
---

# Styles: Tailwind v4 + tokens

- Tailwind v4 through `@tailwindcss/postcss`; there is no `tailwind.config.ts`.
- `styles/variables.css` holds every variable: `@theme` tokens (`dark-500` `#0f172a`, `dark-700`,
  `primary-200` … `primary-600`, `primary-500` = `#22988E`, `--container-page` 1440px) and the
  layout variables in `:root` (`--gutter-x`, `--gutter-y`, `--header-height`). Components use theme
  classes, never hex/rgb.
- `app/globals.css` holds only: the Tailwind import, the `styles/variables.css` import, `@utility`
  classes (`page-container`, `page-section`), base element styles, and shared keyframes. No
  component styles by tag (`nav { … }`) and no `!important`.
- Keyframes animate `transform`/`opacity` only and sit behind
  `@media (prefers-reduced-motion: no-preference)` (or are disabled under `reduce`).
- Scroll-driven reveals: `animation-timeline: view()` inside `@supports (animation-timeline: view())`,
  with content visible by default outside that block.
- Contrast on `dark-500`: body text ≥ 4.5:1 (`slate-300`/`slate-400` and lighter), large text ≥ 3:1.
- Keep `backdrop-filter` blur to a few elements; it is expensive on mobile GPUs.
