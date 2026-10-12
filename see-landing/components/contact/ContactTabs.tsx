'use client';
// client: holds which form (message or meeting) is showing

import { useId, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import AccentRule from '@/components/ui/AccentRule';
import Typography from '@/components/ui/Typography';
import type { ContactTabId, ContactTabsProps } from '@/types/contact';

const FORMS_ANCHOR_ID = 'contact-forms';

/** Re-renders when the URL hash changes (footer links to `#message` and `#meeting`) and brings the forms into view. */
function subscribeToHash(onChange: () => void) {
  function handleHashChange() {
    onChange();
    document.getElementById(FORMS_ANCHOR_ID)?.scrollIntoView();
  }
  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}

const getHash = () => window.location.hash;
const getServerHash = () => '';

export default function ContactTabs({ label, tabs }: ContactTabsProps) {
  const baseId = useId();
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  /** A tab the visitor clicked; it wins until the hash changes again. */
  const [picked, setPicked] = useState<{ id: ContactTabId; hash: string } | null>(null);
  const hashTab = tabs.find((tab) => `#${tab.id}` === hash)?.id;
  const activeId = picked?.hash === hash ? picked.id : (hashTab ?? tabs[0].id);
  const setActiveId = (id: ContactTabId) => setPicked({ id, hash });
  const tabId = (id: ContactTabId) => `${baseId}-tab-${id}`;
  const panelId = (id: ContactTabId) => `${baseId}-panel-${id}`;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === activeId);
    const target =
      event.key === 'ArrowRight' ? (index + 1) % tabs.length
      : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length
      : event.key === 'Home' ? 0
      : event.key === 'End' ? tabs.length - 1
      : -1;
    if (target < 0) return;
    event.preventDefault();
    setActiveId(tabs[target].id);
    document.getElementById(tabId(tabs[target].id))?.focus();
  }

  return (
    <div id={FORMS_ANCHOR_ID} className="scroll-mt-24">
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={handleKeyDown}
        className="grid grid-cols-2 gap-x-6 md:gap-x-10"
      >
        {tabs.map(({ id, label: tabLabel }) => {
          const isActive = id === activeId;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={tabId(id)}
              aria-selected={isActive}
              aria-controls={panelId(id)}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(id)}
              className="group relative cursor-pointer border-b border-line pb-4 text-left focus-ring"
            >
              <AccentRule isActive={isActive} edge="bottom" />
              <Typography
                size={18}
                weight="semibold"
                tone={isActive ? 'accent' : 'inherit'}
                className="transition-colors duration-200 group-hover:text-accent"
              >
                {tabLabel}
              </Typography>
            </button>
          );
        })}
      </div>

      {/* Both panels stay mounted, so a half-written form survives a switch. */}
      {tabs.map(({ id, panel }) => (
        <div key={id} role="tabpanel" id={panelId(id)} aria-labelledby={tabId(id)} hidden={id !== activeId} className="pt-10">
          {panel}
        </div>
      ))}
    </div>
  );
}
