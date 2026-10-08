---
name: review-critique
description: Critically review recent changes against AGENTS.md as the quality standard
disable-model-invocation: true
---

Review all recent changes critically using AGENTS.md as the quality standard.

First, determine the scope of "recent changes":
- Run `git status` and `git diff` (plus `git diff --staged`) to see uncommitted work.
- If the working tree is clean, review the changes in the most recent commit (`git show` / `git diff HEAD~1`).
- List the changed files so the scope is explicit before reviewing.

For each changed file:
1. **Code quality** — readability, naming, structure.
2. **AGENTS.md compliance** — flag any rule violations explicitly (cite the specific rule: Server Components first / `'use client'` only on leaves, CSS-first motion policy, `next/image` and `next/font`, Metadata API, Tailwind theme tokens instead of hex, no inline `style={{}}` or JS hover handlers, reusable components, hooks discipline, no heavy dependencies, `/` stays static).
3. **Bugs & edge cases** — anything that could break in production.
4. **Anti-patterns** — anything that should be done differently.
5. **Concrete fixes** — don't just point out problems, suggest the exact solution (show the corrected code).

Be strict. The bar is production-quality code, not just working code. Do not soften findings or pad with praise — if something is fine, say nothing about it and move on.

Group findings by severity: **Blocker** (must fix), **Should fix**, **Nitpick**.

After the review, ask me which issues to fix, then implement only the approved ones and run `npm run lint && npm run build` to verify.
