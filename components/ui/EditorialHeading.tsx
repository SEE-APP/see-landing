import type { EditorialHeadingProps } from '@/types/ui';
import Typography from './Typography';

export default function EditorialHeading({ id, title, paragraphs = [] }: EditorialHeadingProps) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
      <Typography as="h2" id={id} variant="display" className="md:col-span-5">
        {title}
      </Typography>

      {paragraphs.length > 0 && (
        <div className="flex flex-col gap-6 md:col-span-7 md:pt-3">
          {paragraphs.map((paragraph) => (
            <Typography key={paragraph} as="p" variant="body-lg" className="max-w-[62ch]">
              {paragraph}
            </Typography>
          ))}
        </div>
      )}
    </div>
  );
}
