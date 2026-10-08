'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Typography from '@/components/ui/Typography';

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
      const response = await fetch('https://formspree.io/f/xnjewqre', {
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
    <section id="waitlist" style={{ backgroundColor: '#0f172a', padding: '6rem 0', position: 'relative', overflow: 'hidden', userSelect: 'none' }}>
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
        backgroundColor: 'rgba(34, 152, 142, 0.15)'
      }} />

      <div className="page-container">
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
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
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
                backgroundColor: 'rgba(34, 152, 142, 0.15)',
                border: '1px solid #22988e'
              }}>
                <CheckCircle2 size={26} color="#47bdb2" />
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
                  backgroundColor: focused ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                  border: status === 'error' ? '1px solid #fb7185' : focused ? '1px solid #22988e' : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: focused ? '0 0 20px rgba(34, 152, 142, 0.3)' : 'none'
                }}
              >
                <Mail
                  size={16}
                  style={{ color: focused ? '#47bdb2' : '#64748b', transition: 'color 0.3s ease', flexShrink: 0 }}
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
                  style={{ flex: 1, background: 'transparent', outline: 'none', border: 'none', fontSize: '0.875rem', color: '#ffffff', width: '100%' }}
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
            style={{ color: '#fb7185', fontSize: '0.75rem', marginTop: '0.75rem' }}
          >
            {t.error}
          </motion.p>
        )}

        {status !== 'success' && (
          <Typography as="p" size={12} tone="muted" className="mt-5">{t.noSpam}</Typography>
        )}
      </motion.div>
      </div>
    </section>
  );
}