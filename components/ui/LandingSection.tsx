import type { LandingSectionProps } from '@/types/ui';
import EditorialHeading from './EditorialHeading';

export default function LandingSection({ id, titleId, title, paragraphs, children }: LandingSectionProps) {
  return (
    <section id={id} aria-labelledby={titleId} className="pt-24 pb-28 md:pt-32 md:pb-36">
      <div className="page-container">
        <div className="mx-auto max-w-content">
          <EditorialHeading id={titleId} title={title} paragraphs={paragraphs} />
          <div className="mt-16 md:mt-24">{children}</div>
        </div>
      </div>
    </section>
  );
}
