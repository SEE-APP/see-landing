'use client';
// client: remembers which intention the visitor picked

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Typography from '@/components/ui/Typography';
import { cn } from '@/lib/cn';
import { intentions } from '@/lib/content/about';
import type { IntentionId } from '@/types/content';
import type { IntentionCardsProps } from '@/types/sections';

export default function IntentionCards({ items }: IntentionCardsProps) {
  const [selected, setSelected] = useState<IntentionId | null>(null);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
      {intentions.map((it) => {
        const isSelected = selected === it.id;
        return (
          <button
            key={it.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => setSelected(it.id)}
            className={cn(
              'relative cursor-pointer rounded-3xl border p-8 text-left shadow-(--card-shadow) transition-[background-color,border-color,transform] duration-300 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:hover:-translate-y-1.5',
              isSelected ? 'border-accent/50 bg-accent/6' : 'border-line bg-surface',
            )}
          >
            {isSelected && (
              <CheckCircle2 aria-hidden="true" size={22} className="absolute top-6 right-6 text-accent" />
            )}
            <span
              aria-hidden="true"
              className={cn(
                'mb-5 flex size-13 items-center justify-center rounded-[0.875rem] border border-(--accent-deep)/20 text-accent',
                isSelected ? 'bg-accent/18' : 'bg-(--accent-deep)/10',
              )}
            >
              <it.icon size={24} />
            </span>
            <Typography size={20} weight="semibold" tone="default" className="mb-2 block">
              {items[it.id].title}
            </Typography>
            <Typography size={16} tone="muted" className="block">
              {items[it.id].desc}
            </Typography>
          </button>
        );
      })}
    </div>
  );
}
