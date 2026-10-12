import Typography from '@/components/ui/Typography';
import type { ContactFormsProps } from '@/types/contact';
import ContactForm from './ContactForm';
import ContactTabs from './ContactTabs';
import MeetingForm from './MeetingForm';

export default function ContactForms({ lang, t }: ContactFormsProps) {
  const { message, meeting } = t;

  return (
    <ContactTabs
      label={t.tabsLabel}
      tabs={[
        {
          id: 'message',
          label: message.title,
          panel: (
            <>
              <Typography as="p" variant="body" className="mb-10">
                {message.description}
              </Typography>
              <ContactForm
                lang={lang}
                t={{ nameLabel: t.nameLabel, emailLabel: t.emailLabel, errors: t.errors, ...message }}
              />
            </>
          ),
        },
        {
          id: 'meeting',
          label: meeting.title,
          panel: (
            <>
              <Typography as="p" variant="body" className="mb-10">
                {meeting.description}
              </Typography>
              <MeetingForm
                lang={lang}
                t={{
                  nameLabel: t.nameLabel,
                  emailLabel: t.emailLabel,
                  optional: t.optional,
                  errors: t.errors,
                  ...meeting,
                }}
              />
            </>
          ),
        },
      ]}
    />
  );
}
