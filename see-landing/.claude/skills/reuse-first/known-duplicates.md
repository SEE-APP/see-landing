# Known duplicates — consolidation backlog

Switch the copies your task touches to the canonical one; list the rest in the PR. Remove a row
when it's fixed.

| What | Copies | Canonical (target) |
|---|---|---|
| Framer Motion variants (now shared in `lib/motion.ts`) | About, Team, Demo | CSS keyframes in `globals.css` (motion policy) |
| Section header block (Eyebrow + h2 `size={32} md:text-40` + muted `size={18}` subtitle) | About (4×), Team, Demo | `components/ui/SectionHeading.tsx` built on `Typography` |
