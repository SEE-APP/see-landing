import type { SectionHeadingProps } from '@/types/ui';
import Eyebrow from './Eyebrow';
import Typography from './Typography';

export default function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="mb-14 text-center">
      <Eyebrow label={eyebrow} />
      <Typography as="h2" id={id} size={32} weight="semibold" tone="default" className="mb-4 md:text-40">
        {title}
      </Typography>
      <Typography as="p" size={18} tone="muted" className="mx-auto max-w-xl">
        {description}
      </Typography>
    </header>
  );
}
