import type { ComponentType } from 'react';
import InstagramIcon from '@/assets/icons/InstagramIcon';
import LinkedInIcon from '@/assets/icons/LinkedInIcon';
import TikTokIcon from '@/assets/icons/TikTokIcon';
import { socialLinks } from '@/lib/site';
import type { SocialLinksProps } from '@/types/layout';
import type { SocialId } from '@/types/site';
import type { IconProps } from '@/types/ui';

const socialIcons: Record<SocialId, ComponentType<IconProps>> = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
};

export default function SocialLinks({ labels }: SocialLinksProps) {
  return (
    <ul className="flex items-center gap-1">
      {socialLinks.map(({ id, href }) => {
        const Icon = socialIcons[id];
        return (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels[id]}
              className="flex size-10 items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:text-accent focus-ring"
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
