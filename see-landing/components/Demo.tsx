'use client';

import { useState } from 'react';
import type { DemoProps } from '@/types/sections';
import { ArrowRight, Play } from 'lucide-react';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Typography from '@/components/ui/Typography';

export default function Demo({ t, waitlistHref, videoSrc }: DemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const showVideo = Boolean(videoSrc) && isPlaying;

  return (
    <section id="demo" style={{ backgroundColor: "transparent", padding: '6rem 0', position: 'relative', userSelect: 'none' }}>
      <div className="page-container">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div>
            <Eyebrow label={t.eyebrow} />
          </div>
          <div>
            <Typography as="h2" size={32} weight="semibold" tone="default" className="mb-4 md:text-40">
              {t.title}
            </Typography>
          </div>
          <div>
            <Typography as="p" size={18} tone="muted" className="mx-auto max-w-xl">
              {t.description}
            </Typography>
          </div>
        </div>

        {/* Video frame */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          {showVideo ? (
            <iframe
              src={`${videoSrc}?autoplay=1&rel=0`}
              title={t.videoTitle}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            <>
              {/* Player chrome bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2.75rem',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1rem',
                gap: '0.375rem',
                borderBottom: '1px solid color-mix(in srgb, var(--ink) 6%, transparent)',
                zIndex: 2
              }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--ink-muted)' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--ink-muted)' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--ink-muted)' }} />
                <span style={{ margin: '0 auto', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>
                  {t.playerLabel}
                </span>
              </div>

              {/* Play button */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="transition-transform duration-200 ease-out-expo hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '5rem',
                    height: '5rem',
                    borderRadius: '50%',
                    background: 'var(--line)',
                    border: '1px solid color-mix(in srgb, var(--ink) 20%, transparent)',
                    cursor: 'pointer'
                  }}
                  aria-label={t.playLabel}
                >
                  <span
                    style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid var(--accent)' }}
                  />
                  <Play size={26} color="var(--ink)" fill="var(--ink)" style={{ marginLeft: '4px' }} />
                </button>
              </div>

              {/* Preview badge */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '10px',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--ink-subtle)',
                zIndex: 2
              }}>
                {t.previewBadge}
              </div>
            </>
          )}
        </div>

        {/* Call to Action / Caption */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <Typography as="p" size={16} weight="medium" tone="default">
            {t.ctaPrompt}
          </Typography>
          <Button
            variant="text"
            href={waitlistHref}
            label={t.ctaLabel}
            rightIcon={<ArrowRight size={16} />}
          />
        </div>
      </div>
      </div>
    </section>
  );
}