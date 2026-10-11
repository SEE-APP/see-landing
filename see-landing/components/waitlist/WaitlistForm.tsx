'use client';
// client: holds the email field and the submit status

import { useState, type FormEvent } from 'react';
import { ArrowRight, CircleAlert } from 'lucide-react';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { cn } from '@/lib/cn';
import { isValidEmail } from '@/lib/validation';
import { joinWaitlist } from '@/lib/waitlist';
import type { WaitlistFormProps, WaitlistStatus } from '@/types/sections';
import WaitlistSuccess from './WaitlistSuccess';

const EMAIL_ID = 'waitlist-email';
const ERROR_ID = 'waitlist-error';

export default function WaitlistForm({ t }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const isError = status === 'error';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setStatus((await joinWaitlist(email)) ? 'success' : 'error');
  }

  if (status === 'success') {
    return <WaitlistSuccess title={t.successTitle} body={t.successBody} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor={EMAIL_ID} className="sr-only">
        {t.emailLabel}
      </label>
      <div
        className={cn(
          'flex flex-col gap-2 rounded-[1.75rem] border bg-surface-solid p-2 transition-colors duration-200 sm:flex-row sm:items-center sm:rounded-full',
          isError ? 'border-danger' : 'border-line-strong focus-within:border-accent',
        )}
      >
        <input
          id={EMAIL_ID}
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
          aria-describedby={isError ? ERROR_ID : undefined}
          className="h-12 min-w-0 flex-1 bg-transparent px-5 text-16 text-ink outline-none placeholder:text-ink-muted sm:text-18"
        />
        <Button
          type="submit"
          label={t.submit}
          rightIcon={<ArrowRight size={16} />}
          isLoading={status === 'loading'}
          className="w-full sm:w-auto"
        />
      </div>
      <div id={ERROR_ID} role="alert">
        {isError && (
          <Typography as="p" size={14} weight="medium" className="mt-4 flex items-center justify-center gap-2 text-danger">
            <CircleAlert size={16} aria-hidden="true" />
            {t.error}
          </Typography>
        )}
      </div>
    </form>
  );
}
