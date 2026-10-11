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

          <Typography
            as="h2"
            id="waitlist-title"
            size={40}
            weight="semibold"
            tone="default"
            className="mt-6 text-balance tracking-[-0.02em] md:text-64"
          >
            {t.title}
          </Typography>

          <Typography as="p" size={18} tone="muted" className="mt-6 max-w-[46ch] text-pretty leading-[1.7]">
            {t.description}
          </Typography>

          <div className="mt-12 w-full max-w-xl">
            <WaitlistForm t={t} />
          </div>

          <Typography as="p" size={14} tone="muted" className="mt-5">
            {t.noSpam}
          </Typography>
        </div>
      </div>
    </section>
  );
}
