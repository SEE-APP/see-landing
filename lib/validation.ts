import { meetingDurations, meetingSlots, meetingTopics } from '@/lib/content/contact';
import { fieldLimits } from '@/lib/content/forms';
import type {
  ContactFieldError,
  ContactFieldErrors,
  ContactMessageField,
  ContactMessageValues,
  MeetingField,
  MeetingValues,
} from '@/types/contact';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

function isRealDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function checkText(value: string, max: number, isRequired: boolean): ContactFieldError | undefined {
  if (value === '') return isRequired ? 'required' : undefined;
  return value.length > max ? 'tooLong' : undefined;
}

export function checkEmail(value: string): ContactFieldError | undefined {
  if (value === '') return 'required';
  if (value.length > fieldLimits.email) return 'tooLong';
  return isValidEmail(value) ? undefined : 'email';
}

function withoutUndefined<Field extends string>(errors: ContactFieldErrors<Field>): ContactFieldErrors<Field> {
  return Object.fromEntries(
    Object.entries(errors).filter(([, code]) => code !== undefined),
  ) as ContactFieldErrors<Field>;
}

export function validateContactMessage(values: ContactMessageValues): ContactFieldErrors<ContactMessageField> {
  return withoutUndefined<ContactMessageField>({
    name: checkText(values.name, fieldLimits.name, true),
    email: checkEmail(values.email),
    message: checkText(values.message, fieldLimits.message, true),
  });
}

/** `today` is `YYYY-MM-DD` in the team's time zone: a meeting can be requested from tomorrow on. */
export function validateMeetingRequest(values: MeetingValues, today: string): ContactFieldErrors<MeetingField> {
  return withoutUndefined<MeetingField>({
    name: checkText(values.name, fieldLimits.name, true),
    email: checkEmail(values.email),
    date: isRealDate(values.date) && values.date > today ? undefined : 'date',
    time: (meetingSlots as readonly string[]).includes(values.time) ? undefined : 'time',
    timezone: checkText(values.timezone, fieldLimits.timezone, false),
    duration: (meetingDurations as readonly string[]).includes(values.duration) ? undefined : 'option',
    topic: (meetingTopics as readonly string[]).includes(values.topic) ? undefined : 'option',
    notes: checkText(values.notes, fieldLimits.notes, false),
  });
}
