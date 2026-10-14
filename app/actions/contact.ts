'use server';

import { meetingTimeZone } from '@/lib/content/contact';
import { isBot, read } from '@/lib/server/form-data';
import { oneLine, sendTeamMail } from '@/lib/server/mail';
import { validateContactMessage, validateMeetingRequest } from '@/lib/validation';
import type {
  ContactMessageState,
  ContactMessageValues,
  MeetingState,
  MeetingValues,
} from '@/types/contact';

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

  const sent = await sendTeamMail({
    subject: `[SEE contact] Message from ${oneLine(values.name)}`,
    replyTo: values.email,
    text: [`Name: ${values.name}`, `Email: ${values.email}`, `Language: ${read(formData, 'lang')}`, '', values.message].join('\n'),
  });

  return sent ? { status: 'success' } : { status: 'error', values };
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

  const sent = await sendTeamMail({
    subject: `[SEE meeting] Request from ${oneLine(values.name)}`,
    replyTo: values.email,
    text: [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Language: ${read(formData, 'lang')}`,
      `Topic: ${values.topic}`,
      `Preferred date: ${values.date}`,
      `Preferred time: ${values.time} (Tbilisi, GMT+4)`,
      `Duration: ${values.duration} minutes`,
      `Visitor time zone: ${values.timezone || 'not given'}`,
      '',
      values.notes || '(no notes)',
    ].join('\n'),
  });

  return sent ? { status: 'success' } : { status: 'error', values };
}
