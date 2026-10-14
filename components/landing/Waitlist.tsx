import Typography from '@/components/ui/Typography';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import type { WaitlistProps } from '@/types/sections';
import WaitlistRings from './WaitlistRings';

export default function Waitlist({ t }: WaitlistProps) {
  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="relative isolate overflow-hidden pt-24 pb-28 md:pt-32 md:pb-40"
    >
      <WaitlistRings />
      <div className="page-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Typography as="p" size={14} weight="medium" tone="accent">
            {t.cohortNote}
          </Typography>

          <Typography as="h2" id="waitlist-title" variant="display" className="mt-6">
            {t.title}
          </Typography>

          <Typography as="p" variant="body-lg" className="mt-6 max-w-[46ch]">
            {t.description}
          </Typography>

          <div className="mt-12 w-full max-w-xl">
            <WaitlistForm
              t={{
                emailLabel: t.emailLabel,
                emailPlaceholder: t.emailPlaceholder,
                submit: t.submit,
                errors: t.errors,
                successTitle: t.successTitle,
                successBody: t.successBody,
              }}
            />
          </div>

          <Typography as="p" size={14} tone="muted" className="mt-5">
            {t.noSpam}
          </Typography>
        </div>
      </div>
    </section>
  );
}
