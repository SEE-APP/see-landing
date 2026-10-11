import type { EditorialHeadingProps } from '@/types/ui';
import Typography from './Typography';

export default function EditorialHeading({ id, title, paragraphs }: EditorialHeadingProps) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
      <Typography
        as="h2"
        id={id}
        size={40}
        weight="semibold"
        tone="default"
        className="text-balance tracking-[-0.02em] md:col-span-5 md:text-64"
      >
        {title}
      </Typography>

      <div className="flex flex-col gap-6 md:col-span-7 md:pt-3">
        {paragraphs.map((paragraph) => (
          <Typography
            key={paragraph}
            as="p"
            size={18}
            tone="muted"
            className="max-w-[62ch] text-pretty leading-[1.7]"
          >
            {paragraph}
          </Typography>
        ))}
      </div>
    </div>
  );
}
