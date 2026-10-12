import type { ComponentType } from 'react';
import { Mail } from 'lucide-react';
import PhoneIcon from '@/assets/icons/PhoneIcon';
import { contactDetails } from '@/lib/site';
import type { ContactId } from '@/types/site';
import type { IconProps } from '@/types/ui';

const contactIcons: Record<ContactId, ComponentType<IconProps>> = {
  email: Mail,
  phone: PhoneIcon,
};

/** Email and phone links with icons, for the footer. */
export default function ContactLinks() {
  return (
    <ul className="flex flex-col items-start gap-3">
      {contactDetails.map(({ id, label, href }) => {
        const Icon = contactIcons[id];
        return (
          <li key={id}>
            <a
              href={href}
              className="flex items-center gap-2.5 rounded-sm text-16 text-ink-muted transition-colors duration-200 hover:text-accent focus-ring"
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
