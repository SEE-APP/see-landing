'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      {/* Ambient glow behind the card */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '600px',
        height: '600px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        backgroundColor: 'color-mix(in srgb, var(--accent-deep) 15%, transparent)'
      }} />

      <div className="page-container">
      <div className="hatch-frame relative mx-auto max-w-[37rem]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          maxWidth: '36rem',
          margin: '0 auto',
          borderRadius: '2rem',
          padding: '3.5rem 2rem',
          background: 'var(--surface)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--line)',
          boxShadow: '0 20px 40px var(--shadow-tint)',
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

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
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
            </motion.form>
          )}
        </AnimatePresence>

        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.75rem' }}
          >
            {t.error}
          </motion.p>
        )}

        {status !== 'success' && (
          <Typography as="p" size={12} tone="muted" className="mt-5">{t.noSpam}</Typography>
        )}
      </motion.div>
      </div>
      </div>
    </section>
  );
}