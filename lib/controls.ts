/** Shared look of Input, Textarea and Select: a single hairline underline, no box. Focus is drawn by `Field`. */
export const controlClasses =
  'block w-full rounded-none border-0 border-b border-input bg-transparent px-0 text-18 text-ink outline-none transition-colors duration-200 ' +
  'placeholder:text-transparent focus:placeholder:text-ink-muted hover:border-ink-muted aria-invalid:border-danger';

/** Ids of the hint and error lines a control points at with `aria-describedby`. */
export function describedBy(id: string, hasHint: boolean, hasError: boolean): string | undefined {
  const ids = [hasHint && `${id}-hint`, hasError && `${id}-error`].filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
}
