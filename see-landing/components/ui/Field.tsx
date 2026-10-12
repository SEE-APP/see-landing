import { CircleAlert } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { FieldProps } from '@/types/ui';

/**
 * The label rests inside an empty, unfocused text control like a placeholder and floats above it
 * otherwise. Selects and date inputs never match `:placeholder-shown`, so their label stays up.
 */
const labelClasses =
  'pointer-events-none absolute top-0 left-0 max-w-full origin-top-left truncate text-18 text-ink-muted scale-78 ' +
  'transition duration-300 ease-out-expo motion-reduce:transition-none group-focus-within:text-ink ' +
  'group-[:has(:placeholder-shown):not(:focus-within)]:translate-y-8.5 group-[:has(:placeholder-shown):not(:focus-within)]:scale-100';

const focusLineClasses =
  'pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 ease-out-expo ' +
  'group-focus-within:scale-x-100 motion-reduce:transition-none';

export default function Field({ id, label, optionalLabel, hint, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="group relative pt-6">
        <label htmlFor={id} className={labelClasses}>
          {label}
          {optionalLabel && <span className="ml-2">{optionalLabel}</span>}
        </label>
        {children}
        <span aria-hidden="true" className={cn(focusLineClasses, error ? 'bg-danger' : 'bg-ink')} />
      </div>
      {hint && (
        <p id={`${id}-hint`} className="text-14 text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-2 text-14 font-medium text-danger">
          <CircleAlert size={16} aria-hidden="true" className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
