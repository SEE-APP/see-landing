'use client';
// client: toggles data-theme on <html> and persists the choice

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import type { Theme, ThemeSwitcherProps } from '@/types/layout';

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function getServerTheme(): Theme | null {
  return null;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.dataset.theme = 'dark';
  else delete root.dataset.theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this page only.
  }
}

const options = [
  { value: 'light', Icon: Sun },
  { value: 'dark', Icon: Moon },
] as const;

export default function ThemeSwitcher({ t }: ThemeSwitcherProps) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  return (
    <div role="group" aria-label={t.label} className="flex items-center gap-0.5 rounded-full border border-line bg-surface p-1">
      {options.map(({ value, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={t[value]}
          aria-pressed={theme === null ? undefined : theme === value}
          onClick={() => applyTheme(value)}
          className="flex size-9 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:text-accent aria-pressed:bg-accent-strong aria-pressed:text-on-accent focus-ring"
        >
          <Icon size={16} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
