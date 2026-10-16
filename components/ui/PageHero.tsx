import BackLink from '@/components/ui/BackLink';
import Typography from '@/components/ui/Typography';
import type { PageHeroProps } from '@/types/ui';

export default function PageHero({ title, description, back }: PageHeroProps) {
  return (
    <div className="page-container">
      <div className="mx-auto grid max-w-content gap-8 pt-12 pb-16 md:grid-cols-12 md:gap-10 md:pt-20 md:pb-24">
        {back && <BackLink href={back.href} label={back.label} className="justify-self-start md:col-span-12" />}
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
