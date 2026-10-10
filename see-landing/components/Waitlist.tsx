'use client';

import { useState, FormEvent } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Typography from '@/components/ui/Typography';

import { waitlistEndpoint } from '@/lib/site';
import { isValidEmail } from '@/lib/validation';
import type { WaitlistProps, WaitlistStatus } from '@/types/sections';

export default function Waitlist({ t }: WaitlistProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');

    try {
      const response = await fetch(waitlistEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="waitlist" style={{ backgroundColor: "transparent", padding: '6rem 0', position: 'relative', overflow: 'hidden', userSelect: 'none' }}>
      <div className="page-container">
      <div
        style={{
          position: 'relative',
          maxWidth: '36rem',
          margin: '0 auto',
          borderRadius: '2rem',
          padding: '3.5rem 2rem',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          boxShadow: 'var(--card-shadow)',
          textAlign: 'center'
        }}
      >
        <Eyebrow label={t.eyebrow} />

        <Typography as="h2" size={28} weight="semibold" tone="default" className="mb-3 md:text-36">
          {t.title}
        </Typography>
        <Typography as="p" tone="muted" className="mx-auto mb-9 max-w-md">
          {t.description}
        </Typography>

          {status === 'success' ? (
            <div
              key="success"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0' }}
            >
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                backgroundColor: 'color-mix(in srgb, var(--accent-deep) 15%, transparent)',
                border: '1px solid var(--accent-deep)'
              }}>
                <CheckCircle2 size={26} color="var(--accent)" />
              </div>
              <Typography as="p" weight="medium" tone="default" className="mb-1">{t.successTitle}</Typography>
              <Typography as="p" size={14} tone="muted">{t.successBody}</Typography>
            </div>
          ) : (
            <form
              key="form"
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', maxWidth: '28rem', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}
              noValidate
            >
              <div
                style={{
                  flex: 1,
                  minWidth: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.875rem 1.25rem',
                  borderRadius: '9999px',
                  transition: 'all 0.3s ease',
                  backgroundColor: focused ? 'color-mix(in srgb, var(--ink) 5%, transparent)' : 'var(--surface)',
                  border: status === 'error' ? '1px solid var(--danger)' : focused ? '1px solid var(--accent-deep)' : '1px solid var(--input-border)',
                  boxShadow: focused ? '0 0 20px color-mix(in srgb, var(--accent-deep) 30%, transparent)' : 'none'
                }}
              >
                <Mail
                  size={16}
                  style={{ color: focused ? 'var(--accent)' : 'var(--ink-muted)', transition: 'color 0.3s ease', flexShrink: 0 }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder={t.emailPlaceholder}
                  style={{ flex: 1, background: 'transparent', outline: 'none', border: 'none', fontSize: '0.875rem', color: 'var(--ink)', width: '100%' }}
                  aria-label={t.emailLabel}
                />
              </div>

              <Button
                type="submit"
                label={t.submit}
                rightIcon={<ArrowRight size={15} />}
                isLoading={status === 'loading'}
              />
            </form>
          )}

        {status === 'error' && (
          <p
            style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.75rem' }}
          >
            {t.error}
          </p>
        )}

        {status !== 'success' && (
          <Typography as="p" size={12} tone="muted" className="mt-5">{t.noSpam}</Typography>
        )}
      </div>
      </div>
    </section>
  );
}