import type { ReactNode } from 'react';
import type { FormErrorCode } from './forms';
import type { Dictionary, Locale } from './i18n';

/** Reason a field was rejected; the form turns it into text with `contact.errors[code]`. */
export type ContactFieldError = 'required' | 'email' | 'tooLong' | 'date' | 'time' | 'option';

export type ContactMessageField = 'name' | 'email' | 'message';
export type MeetingField = 'name' | 'email' | 'date' | 'time' | 'timezone' | 'duration' | 'topic' | 'notes';

export type ContactFieldErrors<Field extends string> = Partial<Record<Field, ContactFieldError>>;

/** What a contact Server Action returns. `values` refills the form after an error. */
export interface ContactFormState<Field extends string> {
  status: 'idle' | 'success' | 'error';
  /** Set on `error` when the input was rejected. */
  fieldErrors?: ContactFieldErrors<Field>;
  /** Set on `error` when the input was fine but the submission could not go through. */
  formError?: FormErrorCode;
  values?: Partial<Record<Field, string>>;
}

export type ContactMessageState = ContactFormState<ContactMessageField>;
export type MeetingState = ContactFormState<MeetingField>;

export type ContactMessageValues = Record<ContactMessageField, string>;
export type MeetingValues = Record<MeetingField, string>;

export type MeetingDuration = '30' | '60';
export type MeetingTopic = 'partnership' | 'press' | 'product' | 'other';

export interface ContactProps {
  lang: Locale;
  t: Dictionary['contact'];
  socialLabels: Dictionary['footer']['social'];
}

export interface ContactHeroProps {
  title: string;
  description: string;
}

export interface ContactDetailsProps {
  t: Dictionary['contact'];
  socialLabels: Dictionary['footer']['social'];
}

export interface ContactDetailRowProps {
  label: string;
  children: ReactNode;
}

export interface ContactFormsProps {
  lang: Locale;
  t: Dictionary['contact'];
}

/** The strings the message form uses; the rest of `contact` stays on the server. */
export type ContactFormCopy = Pick<Dictionary['contact'], 'nameLabel' | 'emailLabel' | 'errors'> &
  Dictionary['contact']['message'];

export interface ContactFormProps {
  lang: Locale;
  t: ContactFormCopy;
}

/** The strings the meeting form uses. */
export type MeetingFormCopy = Pick<Dictionary['contact'], 'nameLabel' | 'emailLabel' | 'optional' | 'errors'> &
  Dictionary['contact']['meeting'];

export interface MeetingFormProps {
  lang: Locale;
  t: MeetingFormCopy;
}

export type ContactTabId = 'message' | 'meeting';

export interface ContactTab {
  id: ContactTabId;
  label: string;
  panel: ReactNode;
}

export interface ContactTabsProps {
  /** Accessible name of the tab list. */
  label: string;
  tabs: readonly ContactTab[];
}
