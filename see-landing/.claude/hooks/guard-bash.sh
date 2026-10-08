#!/usr/bin/env bash
# PreToolUse(Bash) guard. Exit 2 blocks the command and shows the reason to Claude. Needs jq or node (lib.sh).
# Best-effort pattern matching, not a sandbox: it stops the common accidental forms.
. "$(dirname "$0")/lib.sh"
CMD=$(hook_field .tool_input.command) || exit 2
[ -z "$CMD" ] && exit 0

block() { echo "Blocked: $1" >&2; exit 2; }
S='[^;&|]*'   # rest of the same simple command

# Force-push rewrites shared history: --force / -f / a +refspec (--force-with-lease is allowed).
echo "$CMD" | grep -qE "git[[:space:]]+push${S}[[:space:]](--force|-f)([[:space:]]|\$)" \
  && block "force-push. Run it manually if intentional."
echo "$CMD" | grep -qE "git[[:space:]]+push${S}[[:space:]]\+[A-Za-z0-9_/:.-]" \
  && block "force-push via a +refspec. Run it manually if intentional."

# Skipping hooks bypasses the repo's git hooks.
echo "$CMD" | grep -qE "git[[:space:]]+(commit|push|merge|rebase)${S}--no-verify" \
  && block "--no-verify skips the repo's git hooks. Fix what the hook reports instead."

# Protected branches only change through PRs (main deploys to production on Vercel).
PROTECTED='(main|master)'
echo "$CMD" | grep -qE "git[[:space:]]+push${S}([[:space:]](origin[[:space:]]+)?|:)${PROTECTED}([[:space:]]|\$)" \
  && block "direct push to main/master. Open a PR instead, or push manually if intended."

# Broad adds / commits stage env files and debug artifacts.
echo "$CMD" | grep -qE "git[[:space:]]+add${S}[[:space:]](-A|--all|-u|--update|\.|\./|\*|:/|\.env[^[:space:]]*|[^[:space:]]*\.mcp\.json)([[:space:]]|\$)" \
  && block "broad or sensitive git add. Add explicit paths (never .env or .mcp.json)."
echo "$CMD" | grep -qE "git[[:space:]]+commit${S}[[:space:]](-a|-am|-[A-Za-z]*a[A-Za-z]*|--all)([[:space:]]|\$)" \
  && block "git commit -a stages every modified file. Stage explicit paths, then commit."

# Reading env/secret files through the shell (the Read deny rules don't cover Bash).
echo "$CMD" | grep -qE "(^|[[:space:];&|(])(cat|less|more|head|tail|bat|grep|rg|awk|sed|cp|scp|base64|xxd|strings|source|\.)[[:space:]]([^;&|]*[[:space:]/])?\.env(\.[A-Za-z0-9_.-]+)?([[:space:]]|\$)" \
  && ! echo "$CMD" | grep -qE '\.env\.(example|sample|template)' \
  && block "reading an env file. Ask the user for the specific value you need."
echo "$CMD" | grep -qE "(cat|less|more|head|tail|grep|cp|base64)[[:space:]]${S}\.mcp\.json([[:space:]]|\$)" \
  && block ".mcp.json holds credentials."

# Production deploys go through git + Vercel, not the CLI.
echo "$CMD" | grep -qE "(^|[[:space:];&|])(npx[[:space:]]+)?vercel${S}[[:space:]](--prod|deploy[[:space:]]${S}--prod)" \
  && block "production deploy from the CLI. Merge to main instead, or run it manually if intended."

exit 0
