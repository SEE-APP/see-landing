import Image from 'next/image';
import Link from 'next/link';
import Typography from '@/components/ui/Typography';
import { homeHref } from '@/lib/site';
import type { BrandLinkProps } from '@/types/layout';

export default function BrandLink({ lang, brand, label }: BrandLinkProps) {
  return (
    <Link
      href={homeHref(lang)}
      aria-label={label}
      className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <Image src="/logo.png" alt="" width={32} height={32} priority className="size-8 shrink-0 object-contain" />
      <Typography size={18} weight="semibold" tone="default" className="tracking-tight">
        {brand}
      </Typography>
    </Link>
  );
}
