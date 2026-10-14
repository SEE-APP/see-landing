import type { MeetingDuration, MeetingTopic } from '@/types/contact';

/** Start times the team offers, in Tbilisi time (GMT+4). */
export const meetingSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'] as const;

export const meetingDurations: readonly MeetingDuration[] = ['30', '60'];

export const meetingTopics: readonly MeetingTopic[] = ['partnership', 'press', 'product', 'other'];

export const meetingTimeZone = 'Asia/Tbilisi';
