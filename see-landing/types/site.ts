export interface NavLink {
  label: string;
  href: string;
}

export type ContactId = 'email' | 'phone';

export interface ContactDetail {
  id: ContactId;
  label: string;
  href: string;
}

export type SocialId = 'instagram' | 'linkedin' | 'tiktok';

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
}
