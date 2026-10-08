---
name: review-fe-branch
description: Strict frontend code review of a feature branch against its base branch, using our Next.js/Tailwind conventions
argument-hint: "[feature-branch] [base-branch]"
disable-model-invocation: true
---

Arguments passed: $ARGUMENTS

Parse `$ARGUMENTS` as `<feature-branch> <base-branch>` (space-separated). If either is missing: for the feature branch, use the current branch (`git branch --show-current`); for the base branch, use `git merge-base` against `origin/main` (the only long-lived branch) — if ambiguous, ask me to confirm rather than guessing. Use the resolved names as `{FEATURE_BRANCH}` and `{BASE_BRANCH}` below.

<context>
Reviewing all frontend changes on `{FEATURE_BRANCH}` compared to `{BASE_BRANCH}`.
Next.js 16 App Router landing page (Vercel, Tailwind) with established conventions (see AGENTS.md
and `.claude/rules/`):
- Server Components by default; `'use client'` only on interactive leaves, never on a page/layout
- Motion is CSS/Tailwind first; Framer Motion only in a client leaf via `LazyMotion` + `m`;
  everything honours `prefers-reduced-motion`
- Tailwind theme tokens instead of hardcoded hex/rgb values (including `bg-[#…]`)
- No inline `style={{}}` for static values, no `onMouseOver`-style JS hover handlers, no `!important`
- `next/image` (dimensions, `priority` only on the hero) and `next/font`; no raw `<img>`
- Metadata through the Metadata API; `/` stays statically rendered
- Shared components (`components/ui/`) instead of near-copies; see
  `.claude/skills/reuse-first/catalog.md` and `known-duplicates.md`
- Consistent aria attributes across sibling components
- A defined folder structure: `components/{landing,common,ui,waitlist}`, `lib/`, `app/`
</context>

<task>
Perform a full strict review of every change introduced on `{FEATURE_BRANCH}`
relative to `{BASE_BRANCH}`. Do not limit the review to diff hunks — open each
touched file in full, since the diff view alone hides things like a duplicate
that already exists elsewhere in the same file.

For every changed file, check:

1. **Correctness** — logic errors, edge cases, broken states, anything that
   will misbehave at runtime.
2. **File/folder placement & component size** — is new code located where the
   existing structure says it should be (feature-scoped vs shared, correct
   directory)? Are components staying properly scoped, or has anything grown
   into an oversized "god component" that should be split?
3. **Component reuse** — does the change use existing shared components
   with the correct variants, instead of raw elements, inline styles, or a
   reinvented equivalent?
4. **Design tokens** — any hardcoded hex/rgb colours that should be Tailwind
   theme tokens?
5. **Server/client boundary & performance** — new `'use client'` that could sit
   on a smaller leaf, Framer Motion where CSS would do, raw `<img>`, anything
   that makes `/` dynamic or grows first-load JS.
6. **Accessibility** — missing or inconsistent aria attributes versus sibling
   components?
7. **Duplication** — logic, markup, or types repeated instead of reused or
   extracted — compare against what already exists on `{BASE_BRANCH}`, not
   just within the diff.
8. **Dead/unused code** — unused imports, props, variables, unreachable
   branches, leftover debug code (console.log, commented-out blocks).
</task>

<approach>
- Diff against `{BASE_BRANCH}` first to scope the changed files, then open
  each changed file in full for real context.
- Before flagging something as duplicated or as a missing shared component,
  search the existing codebase to confirm what the "correct" reusable version
  actually is — don't guess.
- This is a review only. Do not modify any code or propose a fix commit;
  report findings only. Remediation happens in a separate, approval-gated
  pass.
</approach>

<format>
Group findings by severity (Critical / High / Medium / Low), then by file.
For each finding, give:
- File and line reference
- What's wrong and why it matters
- Suggested direction for the fix (one line, not a diff)

End with a one-line count per severity level.
</format>
