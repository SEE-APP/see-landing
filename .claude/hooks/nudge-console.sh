#!/usr/bin/env bash
# PostToolUse(Write|Edit) nudge: console.log/debug/trace left in app/, components/ or lib/.
# Exit 2 is required for Claude to see the message. Needs jq or node (lib.sh).
. "$(dirname "$0")/lib.sh"
FILE=$(hook_field .tool_input.file_path) || exit 0
FILE="${FILE//\\//}"
[ -z "$FILE" ] || [ ! -f "$FILE" ] && exit 0
case "$FILE" in
  */.claude/*|*/node_modules/*) exit 0 ;;
  */app/*.ts|*/app/*.tsx|*/components/*.ts|*/components/*.tsx|*/lib/*.ts|*/lib/*.tsx) ;;
  *) exit 0 ;;
esac
HITS=$(grep -nE '(^|[^.[:alnum:]_])console\.(log|debug|trace)\(' "$FILE" | head -5)
[ -z "$HITS" ] && exit 0
{
  echo "console.log/debug/trace in $FILE (remove debug output before finishing):"
  echo "$HITS"
} >&2
exit 2
