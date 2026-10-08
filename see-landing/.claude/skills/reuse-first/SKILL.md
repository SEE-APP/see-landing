---
name: reuse-first
description: Use before writing any new component, helper, hook, type or constant in the SEE landing page — finds existing code that already does the job and, when it lives privately in one file or is duplicated, promotes it to a shared home instead of writing another copy. Use when about to add a component/icon/helper, or when a reviewer flags ARCH-REUSE-*.
---

# Reuse first — never write the second copy

Rule: **before adding a component, helper, hook, type or constant, prove it does not already
exist. If it exists privately or twice, make it shared — then use it.**

The repo-specific parts live next to this skill: [catalog.md](catalog.md) (where each kind of shared
code lives, and what exists) and [known-duplicates.md](known-duplicates.md) (logic that already has
several copies).

## 1. Search (always; takes a minute)

```bash
git grep -nE "function <Name>|const <Name> =" -- app components lib
git grep -niE "<keyword>|<synonym>" -- app components lib
```

Search by *what it does*, with 2–4 synonyms (`eyebrow label pill badge`, `linkedin social icon`,
`section heading title`). Then check `catalog.md` and `known-duplicates.md`.

## 2. Decide

| What you found | Do this |
|---|---|
| Shared component/helper that does the job | Import it. Don't wrap it, don't copy it. |
| Shared one that almost does it | Extend it backwards-compatibly (optional prop, new variant). Every existing caller keeps working unchanged. |
| Private one (defined inside one section file) | **Promote** it (§3), then use it from both places. |
| Two or more copies (see known-duplicates) | Pick the canonical one, switch the copies **your task touches** to it; list the rest in the PR. |
| Nothing | Write it in the right home (catalog.md), named for what it does. |

Don't pre-abstract: something used once stays next to its caller. The **second** caller is the
trigger to promote.

## 3. Promote — behaviour-preserving, as its own step

1. Move it unchanged to its shared home (catalog.md). Keep it a Server Component unless it truly
   needs the client.
2. Export it; replace the private copy/copies with an import. No visual change in this step —
   if the copies differ, pick the correct one and state the difference in the PR.
3. `git grep` the old name: no private copy remains.
4. `npm run lint && npm run build`.
5. Update `catalog.md` (and `known-duplicates.md` if you removed an entry).
6. Only then build the feature on top of it.
