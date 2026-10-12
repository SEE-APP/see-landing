import { Check } from 'lucide-react';
import AccentRule from '@/components/ui/AccentRule';
import Typography from '@/components/ui/Typography';
import { cn } from '@/lib/cn';
import type { IntentionOptionProps } from '@/types/sections';

export default function IntentionOption({ title, desc, isSelected }: IntentionOptionProps) {
  return (
    <>
      <AccentRule isActive={isSelected} />
      <span className="flex flex-col">
        <Typography
          size={20}
          weight="semibold"
          tone={isSelected ? 'accent' : 'inherit'}
          className="transition-colors duration-200 group-hover:text-accent"
        >
          {title}
        </Typography>
        <Typography variant="body" className="mt-2 max-w-[42ch]">
          {desc}
        </Typography>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
          isSelected ? 'border-accent bg-accent text-on-accent' : 'border-line-strong text-transparent group-hover:border-accent',
        )}
      >
        <Check size={14} strokeWidth={3} />
      </span>
    </>
  );
}
