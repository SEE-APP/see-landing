import Typography from '@/components/ui/Typography';
import type { NumberedListProps } from '@/types/ui';

/** Three-column rail on `md` and up, a vertical rail on mobile. Used for steps and timelines. */
export default function NumberedList({ items, size = 'md', accentMarkers = false }: NumberedListProps) {
  const isLarge = size === 'md';

  return (
    <ol className="grid border-l border-line md:grid-cols-3 md:border-t md:border-l-0">
      {items.map(({ id, marker, title, description, isCurrent }) => (
        <li key={id} className="relative pb-10 pl-6 last:pb-0 md:pt-8 md:pr-8 md:pb-0 md:pl-0">
          {isCurrent && (
            <span
              aria-hidden="true"
              className="absolute top-0 -left-px h-full w-0.5 bg-accent md:-top-px md:left-0 md:h-0.5 md:w-full"
            />
          )}
          <Typography
            as="p"
            size={32}
            weight="semibold"
            tone={accentMarkers || isCurrent ? 'accent' : 'inherit'}
            className="tabular-nums md:text-40"
          >
            {marker}
          </Typography>
          <Typography as="h3" size={isLarge ? 20 : 16} weight="semibold" className="mt-3">
            {title}
          </Typography>
          {isLarge ? (
            <Typography as="p" variant="body" className="mt-2 max-w-[34ch]">
              {description}
            </Typography>
          ) : (
            <Typography as="p" size={14} tone={isCurrent ? 'subtle' : 'muted'} className="mt-1 max-w-[34ch]">
              {description}
            </Typography>
          )}
        </li>
      ))}
    </ol>
  );
}
