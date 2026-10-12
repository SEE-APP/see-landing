import { cn } from '@/lib/cn';
import { controlClasses } from '@/lib/controls';
import type { InputProps } from '@/types/ui';

export default function Input({ invalid, className, placeholder = ' ', ...rest }: InputProps) {
  return (
    <input
      {...rest}
      // A placeholder (even a blank one) is what lets `Field` float the label with `:placeholder-shown`.
      placeholder={placeholder}
      aria-invalid={invalid || undefined}
      className={cn(controlClasses, 'h-12', className)}
    />
  );
}
