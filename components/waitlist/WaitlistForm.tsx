'use client';
// client: runs the waitlist Server Action and shows its result

import { useActionState, useId, useState } from 'react';
import { ArrowRight, CircleAlert } from 'lucide-react';
import { joinWaitlist } from '@/app/actions/waitlist';
import Button from '@/components/ui/Button';
import FormSuccess from '@/components/ui/FormSuccess';
import Honeypot from '@/components/ui/Honeypot';
import Typography from '@/components/ui/Typography';
import { cn } from '@/lib/cn';
import { fieldLimits } from '@/lib/content/contact';
import type { WaitlistFormProps, WaitlistState } from '@/types/sections';

const initialState: WaitlistState = { status: 'idle' };

export default function WaitlistForm({ t }: WaitlistFormProps) {
  const id = useId();
  const emailId = `${id}-email`;
  const errorId = `${id}-error`;
  const [state, formAction, isPending] = useActionState(joinWaitlist, initialState);
  const [isEditing, setIsEditing] = useState(false);
  const error = isEditing ? undefined : state.error;
  const isSuccess = state.status === 'success';

  return (
    <>
      {/* Always mounted, so screen readers announce the confirmation when it is added. */}
      <div role="status">
        {isSuccess && <FormSuccess title={t.successTitle} body={t.successBody} />}
      </div>
      <form
        action={(formData) => {
          setIsEditing(false);
          formAction(formData);
        }}
        hidden={isSuccess}
      >
        <Honeypot />
        <label htmlFor={emailId} className="sr-only">
          {t.emailLabel}
        </label>
        <div
          className={cn(
            'flex items-center gap-2 rounded-full border bg-surface-solid p-1.5 transition-colors duration-200 focus-ring-within',
            error === 'invalid' ? 'border-danger' : 'border-input focus-within:border-accent',
          )}
        >
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={fieldLimits.email}
            defaultValue={state.email}
            onChange={() => setIsEditing(true)}
            placeholder={t.emailPlaceholder}
            aria-invalid={error === 'invalid'}
            aria-describedby={error ? errorId : undefined}
            className="h-10 min-w-0 flex-1 bg-transparent pl-5 text-16 md:pl-6 text-ink outline-none placeholder:text-ink-muted"
          />
          <Button
            type="submit"
            size="sm"
            label={t.submit}
            rightIcon={<ArrowRight size={16} />}
            isLoading={isPending}
          />
        </div>
        <div id={errorId} role="alert">
          {error && (
            <Typography as="p" size={14} weight="medium" className="mt-4 flex items-center justify-center gap-2 text-danger">
              <CircleAlert size={16} aria-hidden="true" />
              {t.errors[error]}
            </Typography>
          )}
        </div>
      </form>
    </>
  );
}
