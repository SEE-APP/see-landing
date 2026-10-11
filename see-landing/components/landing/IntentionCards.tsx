'use client';
// client: remembers which intentions the visitor picked

import { useState } from 'react';
import { intentions } from '@/lib/content/about';
import type { IntentionId } from '@/types/content';
import type { IntentionCardsProps } from '@/types/sections';
import IntentionOption from './IntentionOption';

export default function IntentionCards({ items }: IntentionCardsProps) {
  const [selected, setSelected] = useState<IntentionId[]>([]);

  const toggle = (id: IntentionId) =>
    setSelected((curr) => (curr.includes(id) ? curr.filter((s) => s !== id) : [...curr, id]));

  return (
    <ul className="mt-16 grid gap-x-10 md:mt-24 md:grid-cols-2">
      {intentions.map(({ id }) => {
        const isSelected = selected.includes(id);
        return (
          <li key={id}>
            <button
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(id)}
              className="group relative flex w-full cursor-pointer items-start justify-between gap-6 border-t border-line py-8 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <IntentionOption title={items[id].title} desc={items[id].desc} isSelected={isSelected} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
