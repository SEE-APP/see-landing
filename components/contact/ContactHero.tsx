import Typography from '@/components/ui/Typography';
import type { ContactHeroProps } from '@/types/contact';

export default function ContactHero({ title, description }: ContactHeroProps) {
  return (
    <div className="page-container">
      <div className="mx-auto grid max-w-content gap-8 pt-16 pb-16 md:grid-cols-12 md:gap-10 md:pt-28 md:pb-24">
        <Typography as="h1" variant="display" className="md:col-span-6">
          {title}
        </Typography>
        <Typography as="p" variant="body-lg" className="md:col-span-6 md:pt-3">
          {description}
        </Typography>
      </div>
    </div>
  );
}
