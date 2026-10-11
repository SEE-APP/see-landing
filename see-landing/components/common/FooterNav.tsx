import Link from 'next/link';
import { footerLinks, homeHref } from '@/lib/site';
import type { FooterNavProps } from '@/types/layout';

export default function FooterNav({ lang, labels, ariaLabel }: FooterNavProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex flex-col items-start gap-3">
        {footerLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={homeHref(lang, link.hash)}
              className="rounded-sm text-16 text-ink-muted transition-colors duration-200 hover:text-accent focus-ring"
            >
              {labels[link.id]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
