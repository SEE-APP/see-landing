'use client';
// client: holds the email field and the submit status

import { useId, useState, type FormEvent } from 'react';
import { ArrowRight, CircleAlert } from 'lucide-react';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { cn } from '@/lib/cn';
import { isValidEmail } from '@/lib/validation';
import { joinWaitlist } from '@/lib/waitlist';
import type { WaitlistFormProps, WaitlistStatus } from '@/types/sections';
import WaitlistSuccess from './WaitlistSuccess';

export default function WaitlistForm({ t }: WaitlistFormProps) {
  const id = useId();
  const emailId = `${id}-email`;
  const errorId = `${id}-error`;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const isError = status === 'error';
  const isSuccess = status === 'success';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setStatus((await joinWaitlist(email)) ? 'success' : 'error');
  }

  return (
    <>
      {/* Always mounted, so screen readers announce the confirmation when it is added. */}
      <div role="status">
        {isSuccess && <WaitlistSuccess title={t.successTitle} body={t.successBody} />}
      </div>
      <form onSubmit={handleSubmit} noValidate hidden={isSuccess}>
        <label htmlFor={emailId} className="sr-only">
          {t.emailLabel}
        </label>
        <div
          className={cn(
            'flex items-center gap-2 rounded-full border bg-surface-solid p-1.5 transition-colors duration-200 focus-ring-within',
            isError ? 'border-danger' : 'border-input focus-within:border-accent',
          )}
        >
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (isError) setStatus('idle');
            }}
            placeholder={t.emailPlaceholder}
            aria-invalid={isError}
            aria-describedby={isError ? errorId : undefined}
            className="h-10 min-w-0 flex-1 bg-transparent pl-5 text-16 md:pl-6 text-ink outline-none placeholder:text-ink-muted"
          />
          <Button
            type="submit"
            size="sm"
            label={t.submit}
            rightIcon={<ArrowRight size={16} />}
            isLoading={status === 'loading'}
          />
        </div>
        <div id={errorId} role="alert">
          {isError && (
            <Typography as="p" size={14} weight="medium" className="mt-4 flex items-center justify-center gap-2 text-danger">
              <CircleAlert size={16} aria-hidden="true" />
              {t.error}
            </Typography>
          )}
        </div>
      </form>
    </>
  );
}
