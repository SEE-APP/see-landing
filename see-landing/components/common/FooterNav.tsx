import Link from 'next/link';
import { navHref } from '@/lib/site';
import type { FooterNavProps } from '@/types/layout';

const linkClasses =
  'rounded-sm text-16 text-ink-muted transition-colors duration-200 hover:text-accent focus-ring';

export default function FooterNav({ lang, links, labels, ariaLabel }: FooterNavProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex flex-col items-start gap-3">
        {links.map((link) => (
          <li key={link.id}>
            {link.path && link.hash ? (
              // A plain anchor: `next/link` changes the hash without a `hashchange` event, which the contact tabs listen to.
              <a href={navHref(lang, link)} className={linkClasses}>
                {labels[link.id]}
              </a>
            ) : (
              <Link href={navHref(lang, link)} className={linkClasses}>
                {labels[link.id]}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
