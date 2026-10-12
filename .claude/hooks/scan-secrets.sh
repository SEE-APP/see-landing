#!/usr/bin/env bash
# PostToolUse(Write|Edit) secret scan.
# Exit 2 is required for Claude to see the warning (PostToolUse stderr on exit 0 is not shown to it).
# The write already happened; Claude is told to remove the secret before anything is committed.
# Markdown is scanned too; only *.example/.sample/.template are skipped.
. "$(dirname "$0")/lib.sh"
FILE=$(hook_field .tool_input.file_path) || exit 2
FILE="${FILE//\\//}"
[ -z "$FILE" ] || [ ! -f "$FILE" ] && exit 0
case "$FILE" in *.example|*.sample|*.template) exit 0 ;; esac

PATTERNS='AKIA[0-9A-Z]{16}'                                        # AWS
PATTERNS+='|(sk|rk)_live_[A-Za-z0-9]{16,}|whsec_[A-Za-z0-9]{16,}'  # Stripe
PATTERNS+='|AIza[0-9A-Za-z_-]{35}'                                 # Google API key
PATTERNS+='|re_[A-Za-z0-9]{8,}_[A-Za-z0-9]{16,}'                   # Resend
PATTERNS+='|sk-(ant-)?[A-Za-z0-9_-]{32,}'                          # OpenAI / Anthropic
PATTERNS+='|gh[pousr]_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{40,}' # GitHub
PATTERNS+='|xox[abprs]-[A-Za-z0-9-]{10,}'                          # Slack
PATTERNS+='|-----BEGIN [A-Z ]*PRIVATE KEY'                         # PEM keys
PATTERNS+='|"private_key"[[:space:]]*:'                            # GCP service account JSON

if grep -qE "$PATTERNS" "$FILE" 2>/dev/null; then
  echo "SECRET WARNING: $FILE now contains what looks like a live credential. Move it to an env var or a git-ignored file before anything is committed, and tell the user." >&2
  exit 2
fi
exit 0
