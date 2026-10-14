import type { MeetingDuration, MeetingTopic } from '@/types/contact';

/** Start times the team offers, in Tbilisi time (GMT+4). */
export const meetingSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'] as const;

export const meetingDurations: readonly MeetingDuration[] = ['30', '60'];

export const meetingTopics: readonly MeetingTopic[] = ['partnership', 'press', 'product', 'other'];

export const meetingTimeZone = 'Asia/Tbilisi';

/** Longest value accepted for each field; also set as `maxLength` on the inputs. */
export const fieldLimits = {
  name: 100,
  email: 254,
  message: 4000,
  timezone: 100,
  notes: 2000,
} as const;

/** Name of the hidden bot-trap field. Not a name autofill recognises (like `website`), so real visitors never fill it. */
export const honeypotField = 'hp_ref';
