---
name: review-branch-full
description: Full strict review of a feature branch against its base (every touched file read in full, lint/typecheck, dead-code and class-conflict checks), reported by severity, followed by a phased refactor plan to approve. Read-only until the user approves the phases.
argument-hint: "[feature-branch] [base-branch]"
disable-model-invocation: true
---

Arguments passed: $ARGUMENTS

Parse `$ARGUMENTS` as `<feature-branch> <base-branch>`. If the feature branch is missing, use
`git branch --show-current`. If the base is missing, use `main` (the only long-lived branch); ask
if it is ambiguous. Use them as `{FEATURE_BRANCH}` and `{BASE_BRANCH}`.

Read-only: do not edit code, stage or commit during the review. The only file you may write is the
plan file when plan mode is on.

## 1. Scope

```bash
git diff --stat {BASE_BRANCH}...{FEATURE_BRANCH}
git diff --name-status {BASE_BRANCH}...{FEATURE_BRANCH}
git log --oneline {BASE_BRANCH}..{FEATURE_BRANCH}
```

Read `AGENTS.md` and the matching `.claude/rules/*.md` (components, styles, app-router) first. They
are the standard. This repo has no `localize()` or em rule: strings go through the dictionary `t`
prop, styling through Tailwind theme tokens.

## 2. Read everything

Open every changed file in full, not only the diff hunks (also compare with the same file on
`{BASE_BRANCH}` and with what already exists in `components/ui/`, `lib/`, `types/`). For large
branches split the reading across Explore agents by folder, but verify their claims yourself.

For every file check:
1. **Correctness**: logic errors, edge cases, broken states, runtime misbehaviour.
2. **Placement and size**: right folder (landing / common / ui / waitlist), one component one job, over ~150 lines, client leaves that could be server.
3. **Reuse**: shared components with the right variant/tokens instead of raw elements or near-copies.
4. **Tokens**: hex/rgb, arbitrary values, static `style={{}}`, `!important`, hardcoded sizes that already have a CSS variable.
5. **Localization**: any visible string, `aria-label`, `alt` not coming from the dictionary.
6. **Accessibility**: names, focus and keyboard, live regions, modal behaviour, contrast of non-text UI (3:1) and text (4.5:1) in both themes, sibling consistency.
7. **Duplication**: markup, classes, logic and types repeated.
8. **Dead code**: unused imports, props, variants, CSS variables, utilities, files, assets, dependencies, stale docs.

## 3. Evidence, not guesses

Run these and quote the result in findings:
- `npx tsc --noEmit --incremental false` and `npm run lint`
- Dead tokens/props: grep every CSS variable, `Typography`/`Button` option and asset name for usages outside its definition
- Class conflicts: `cn()` does not merge. If a component's own classes and a caller's classes set the same property, check the built CSS order (`.next/static/chunks/*.css`, compare offsets) to see which wins
- Unreferenced files and dependencies in `public/`, `components/`, `package.json`
- Docs that still describe removed or moved code (`AGENTS.md`, `.claude/`)

Do not run `npm run build` or `npm run dev` unless the user agrees (plan mode blocks them). Say what
you did not check (build route table, first-load JS, Lighthouse, visual 393px, screen reader).

## 4. Report

Group by severity (Critical / High / Medium / Low), then by file. Each finding: file and line,
what is wrong and why it matters, one-line fix direction. Mark confirmed vs suspected. End with a
count per severity and a short list of what was not checked and which items need a product decision
(copy facts, behaviour changes).

Ask the user which areas are out of scope for this pass (for example API/Server Actions, SEO/metadata)
and drop them from the plan, but keep them in the report as deferred.

## 5. Phased plan

Turn the findings into phases, in this order unless the user says otherwise:
1. Tokens and CSS (contrast, focus utility, variables, dead variables)
2. Structure (moves, merges, shared components)
3. Typography / design-system API
4. Forms and prop slices
5. Accessibility and CSS organisation
6. Dead code, dependencies, renames, doc updates

Each item: finding id, files, the change, and any visual impact (the design must not change unless
stated). End with a verification section (`npm run lint && npm run build`, `/[lang]` still SSG,
bundle size before/after, ask before starting dev for desktop + 393px visual and keyboard checks).

In plan mode write the plan file and call ExitPlanMode. Otherwise present it and wait. Never start
the refactor, commit or push until the user approves the phases.
