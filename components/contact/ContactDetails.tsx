import SocialLinks from '@/components/common/SocialLinks';
import Typography from '@/components/ui/Typography';
import { contactDetails } from '@/lib/site';
import type { ContactDetailsProps } from '@/types/contact';
import ContactDetailRow from './ContactDetailRow';

export default function ContactDetails({ t, socialLabels }: ContactDetailsProps) {
  const contactLabels = { email: t.emailLabel, phone: t.phoneLabel };

  return (
    <section aria-labelledby="contact-details-title">
      <Typography as="h2" id="contact-details-title" size={14} weight="semibold">
        {t.detailsLabel}
      </Typography>

      <dl className="mt-5 border-b border-line">
        {contactDetails.map(({ id, label, href }) => (
          <ContactDetailRow key={id} label={contactLabels[id]}>
            <a
              href={href}
              className="rounded-sm text-18 text-ink transition-colors duration-200 hover:text-accent focus-ring"
            >
              {label}
            </a>
          </ContactDetailRow>
        ))}

        <ContactDetailRow label={t.locationLabel}>
          <Typography size={18}>{t.location}</Typography>
        </ContactDetailRow>

        <ContactDetailRow label={t.followLabel}>
          <div className="-ml-2.5">
            <SocialLinks labels={socialLabels} />
          </div>
        </ContactDetailRow>
      </dl>
    </section>
  );
}
