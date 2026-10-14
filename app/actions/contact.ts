'use server';

import { hasLocale } from '@/i18n/config';
import { meetingTimeZone } from '@/lib/content/contact';
import { isBot, logActionError, read } from '@/lib/server/form-data';
import { oneLine, sendTeamMail } from '@/lib/server/mail';
import { takeRateLimit } from '@/lib/server/rate-limit';
import { validateContactMessage, validateMeetingRequest } from '@/lib/validation';
import type {
  ContactMessageState,
  ContactMessageValues,
  MeetingState,
  MeetingValues,
} from '@/types/contact';

/** The page language the form was sent from; anything else is reported as `unknown`. */
function formLanguage(formData: FormData): string {
  const lang = read(formData, 'lang');
  return hasLocale(lang) ? lang : 'unknown';
}

/** Today's date in the team's time zone as `YYYY-MM-DD`. */
function todayInTbilisi(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: meetingTimeZone }).format(new Date());
}

export async function sendContactMessage(
  _previous: ContactMessageState,
  formData: FormData,
): Promise<ContactMessageState> {
  if (isBot(formData)) return { status: 'success' };

  const values: ContactMessageValues = {
    name: read(formData, 'name'),
    email: read(formData, 'email'),
    message: read(formData, 'message'),
  };
  const fieldErrors = validateContactMessage(values);
  if (Object.keys(fieldErrors).length > 0) return { status: 'error', fieldErrors, values };

  try {
    if (!(await takeRateLimit('contact'))) return { status: 'error', formError: 'rateLimited', values };

    const sent = await sendTeamMail({
      subject: `[SEE contact] Message from ${oneLine(values.name)}`,
      replyTo: values.email,
      text: [`Name: ${values.name}`, `Email: ${values.email}`, `Language: ${formLanguage(formData)}`, '', values.message].join('\n'),
    });
    return sent ? { status: 'success' } : { status: 'error', formError: 'unavailable', values };
  } catch (error) {
    logActionError('contact', error);
    return { status: 'error', formError: 'unavailable', values };
  }
}

export async function requestMeeting(_previous: MeetingState, formData: FormData): Promise<MeetingState> {
  if (isBot(formData)) return { status: 'success' };

  const values: MeetingValues = {
    name: read(formData, 'name'),
    email: read(formData, 'email'),
    date: read(formData, 'date'),
    time: read(formData, 'time'),
    timezone: read(formData, 'timezone'),
    duration: read(formData, 'duration'),
    topic: read(formData, 'topic'),
    notes: read(formData, 'notes'),
  };
  const fieldErrors = validateMeetingRequest(values, todayInTbilisi());
  if (Object.keys(fieldErrors).length > 0) return { status: 'error', fieldErrors, values };

  try {
    if (!(await takeRateLimit('meeting'))) return { status: 'error', formError: 'rateLimited', values };

    const sent = await sendTeamMail({
      subject: `[SEE meeting] Request from ${oneLine(values.name)}`,
      replyTo: values.email,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Language: ${formLanguage(formData)}`,
        `Topic: ${values.topic}`,
        `Preferred date: ${values.date}`,
        `Preferred time: ${values.time} (Tbilisi, GMT+4)`,
        `Duration: ${values.duration} minutes`,
        `Visitor time zone: ${values.timezone || 'not given'}`,
        '',
        values.notes || '(no notes)',
      ].join('\n'),
    });
    return sent ? { status: 'success' } : { status: 'error', formError: 'unavailable', values };
  } catch (error) {
    logActionError('meeting', error);
    return { status: 'error', formError: 'unavailable', values };
  }
}
