import { cn } from '@/lib/cn';
import { controlClasses } from '@/lib/controls';
import type { TextareaProps } from '@/types/ui';

export default function Textarea({ invalid, className, placeholder = ' ', ...rest }: TextareaProps) {
  return (
    <textarea
      {...rest}
      // A placeholder (even a blank one) is what lets `Field` float the label with `:placeholder-shown`.
      placeholder={placeholder}
      aria-invalid={invalid || undefined}
      className={cn(controlClasses, 'min-h-32 resize-y py-3', className)}
    />
  );
}
