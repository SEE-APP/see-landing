'use client';
// client: runs the meeting-request Server Action and shows its result

import { useActionState, useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { requestMeeting } from '@/app/actions/contact';
import Button from '@/components/ui/Button';
import Field from '@/components/ui/Field';
import FormSuccess from '@/components/ui/FormSuccess';
import Honeypot from '@/components/ui/Honeypot';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { fieldLimits, meetingDurations, meetingSlots, meetingTopics } from '@/lib/content/contact';
import { describedBy } from '@/lib/controls';
import type { MeetingFormProps, MeetingState } from '@/types/contact';

const initialState: MeetingState = { status: 'idle' };

export default function MeetingForm({ lang, t }: MeetingFormProps) {
  const id = useId();
  const [state, formAction, isPending] = useActionState(requestMeeting, initialState);
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};
  const ids = {
    name: `${id}-name`,
    email: `${id}-email`,
    date: `${id}-date`,
    time: `${id}-time`,
    timezone: `${id}-timezone`,
    duration: `${id}-duration`,
    topic: `${id}-topic`,
    notes: `${id}-notes`,
  };

  if (state.status === 'success') return <FormSuccess title={t.successTitle} body={t.successBody} />;

  return (
    <form action={formAction} className="grid gap-y-8 sm:grid-cols-2 sm:gap-x-10">
      <input type="hidden" name="lang" value={lang} />
      <Honeypot />

      <Field id={ids.name} label={t.nameLabel} error={errors.name && t.errors[errors.name]}>
        <Input
          id={ids.name}
          name="name"
          autoComplete="name"
          required
          maxLength={fieldLimits.name}
          defaultValue={values.name}
          invalid={Boolean(errors.name)}
          aria-describedby={describedBy(ids.name, false, Boolean(errors.name))}
        />
      </Field>

      <Field id={ids.email} label={t.emailLabel} error={errors.email && t.errors[errors.email]}>
        <Input
          id={ids.email}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={fieldLimits.email}
          defaultValue={values.email}
          invalid={Boolean(errors.email)}
          aria-describedby={describedBy(ids.email, false, Boolean(errors.email))}
        />
      </Field>

      <Field id={ids.date} label={t.dateLabel} error={errors.date && t.errors[errors.date]}>
        <Input
          id={ids.date}
          name="date"
          type="date"
          required
          defaultValue={values.date}
          invalid={Boolean(errors.date)}
          aria-describedby={describedBy(ids.date, false, Boolean(errors.date))}
        />
      </Field>

      <Field id={ids.time} label={t.timeLabel} hint={t.timeHint} error={errors.time && t.errors[errors.time]}>
        <Select
          id={ids.time}
          name="time"
          required
          defaultValue={values.time ?? ''}
          invalid={Boolean(errors.time)}
          aria-describedby={describedBy(ids.time, true, Boolean(errors.time))}
        >
          <option value="" disabled>
            {t.timePlaceholder}
          </option>
          {meetingSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </Select>
      </Field>

      <Field id={ids.duration} label={t.durationLabel} error={errors.duration && t.errors[errors.duration]}>
        <Select
          id={ids.duration}
          name="duration"
          required
          defaultValue={values.duration ?? meetingDurations[0]}
          invalid={Boolean(errors.duration)}
          aria-describedby={describedBy(ids.duration, false, Boolean(errors.duration))}
        >
          {meetingDurations.map((duration) => (
            <option key={duration} value={duration}>
              {t.durations[duration]}
            </option>
          ))}
        </Select>
      </Field>

      <Field id={ids.topic} label={t.topicLabel} error={errors.topic && t.errors[errors.topic]}>
        <Select
          id={ids.topic}
          name="topic"
          required
          defaultValue={values.topic ?? ''}
          invalid={Boolean(errors.topic)}
          aria-describedby={describedBy(ids.topic, false, Boolean(errors.topic))}
        >
          <option value="" disabled>
            {t.topicPlaceholder}
          </option>
          {meetingTopics.map((topic) => (
            <option key={topic} value={topic}>
              {t.topics[topic]}
            </option>
          ))}
        </Select>
      </Field>

      <div className="sm:col-span-2">
        <Field
          id={ids.timezone}
          label={t.timezoneLabel}
          optionalLabel={t.optional}
          error={errors.timezone && t.errors[errors.timezone]}
        >
          <Input
            id={ids.timezone}
            name="timezone"
            maxLength={fieldLimits.timezone}
            placeholder={t.timezonePlaceholder}
            defaultValue={values.timezone}
            invalid={Boolean(errors.timezone)}
            aria-describedby={describedBy(ids.timezone, false, Boolean(errors.timezone))}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field
          id={ids.notes}
          label={t.notesLabel}
          optionalLabel={t.optional}
          error={errors.notes && t.errors[errors.notes]}
        >
          <Textarea
            id={ids.notes}
            name="notes"
            maxLength={fieldLimits.notes}
            placeholder={t.notesPlaceholder}
            defaultValue={values.notes}
            invalid={Boolean(errors.notes)}
            aria-describedby={describedBy(ids.notes, false, Boolean(errors.notes))}
          />
        </Field>
      </div>

      {state.status === 'error' && !state.fieldErrors && (
        <p role="alert" className="text-14 font-medium text-danger sm:col-span-2">
          {t.errors.generic}
        </p>
      )}

      <div className="mt-2 sm:col-span-2">
        <Button
          type="submit"
          label={t.submit}
          rightIcon={<ArrowRight size={16} />}
          isLoading={isPending}
        />
      </div>
    </form>
  );
}
