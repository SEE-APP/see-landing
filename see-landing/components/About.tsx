'use client';

import { useState } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import Typography from '@/components/ui/Typography';
import { CheckCircle2 } from 'lucide-react';
import { features, intentions, steps, timeline } from '@/lib/content/about';
import type { AboutProps } from '@/types/sections';

/* ---------------------------------------------------------------- */
/*  Section 1 — Our Story / Timeline                                  */
/* ---------------------------------------------------------------- */

function StorySection({ t }: { t: AboutProps['story'] }) {
  return (
    <section id="about" style={{ backgroundColor: "transparent", padding: '6rem 0', position: 'relative', overflow: 'hidden', userSelect: 'none' }}>
      <div className="page-container">
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <div>
          <div>

            <Eyebrow label={t.eyebrow} />

          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: narrative */}
          <div>
            <div>
              <Typography as="h2" size={32} weight="semibold" tone="default" className="mb-6 md:text-40">
                {t.title}
              </Typography>
            </div>
            <div>
              <Typography as="p" size={16} tone="muted" className="leading-[1.8] md:text-18">
              {t.body}
              </Typography>
            </div>
          </div>

          {/* Right: timeline */}
          <div>
            {timeline.map((event, i) => (
              <div key={event.id} style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10px', flexShrink: 0 }}>
                  <div
                   
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      marginTop: '1.6rem',
                      flexShrink: 0,
                    }}
                  />
                  {i < timeline.length - 1 && (
                    <div
                      style={{
                        width: '1px',
                        flex: 1,
                        background: 'var(--line)',
                        marginTop: '0.5rem',
                      }}
                    />
                  )}
                </div>

                <div
                 
                  style={{
                    background: 'var(--surface)',
                    boxShadow: 'var(--card-shadow)',
                    border: '1px solid var(--line)',
                    borderRadius: '1.5rem',
                    padding: '1.5rem',
                    marginBottom: i < timeline.length - 1 ? '1.5rem' : 0,
                    flex: 1,
                  }}
                >
                  <Typography size={13} tone="accent" className="font-mono tracking-[0.05em]">
                    {event.year}
                  </Typography>
                  <Typography as="h3" size={18} weight="semibold" tone="default" className="my-1.5">
                    {t.timeline[event.id].title}
                  </Typography>
                  <Typography as="p" size={14} tone="muted">{t.timeline[event.id].desc}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 2 — The Intention                                        */
/* ---------------------------------------------------------------- */

function IntentionSection({ t }: { t: AboutProps['intention'] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      id="intention"
      style={{
        backgroundColor: "transparent",
        padding: '6rem 0',
        position: 'relative',
        borderTop: "1px solid var(--section-rule)",
        userSelect: 'none',
      }}
    >
      <div className="page-container">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
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
            <Typography as="p" size={18} tone="muted" className="mx-auto max-w-lg">
              {t.description}
            </Typography>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {intentions.map((it, i) => {
            const isSelected = selected === i;
            return (
              <div
                key={it.id}
                onClick={() => setSelected(i)}
                className="transition-transform duration-300 ease-out-expo motion-safe:hover:-translate-y-1.5"
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  background: isSelected ? 'color-mix(in srgb, var(--accent) 6%, transparent)' : 'var(--surface)',
                  border: isSelected ? '1px solid color-mix(in srgb, var(--accent) 50%, transparent)' : '1px solid var(--line)',
                  boxShadow: 'var(--card-shadow)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  transition: 'background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, transform 0.3s var(--ease-out-expo)',
                }}
              >
                {isSelected && (
                  <div
                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--accent)' }}
                  >
                    <CheckCircle2 size={22} />
                  </div>
                )}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    backgroundColor: isSelected ? 'color-mix(in srgb, var(--accent) 18%, transparent)' : 'color-mix(in srgb, var(--accent-deep) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--accent-deep) 20%, transparent)',
                    color: 'var(--accent)',
                  }}
                >
                  <it.icon size={24} />
                </div>
                <Typography as="h3" size={20} weight="semibold" tone="default" className="mb-2">
                  {t.items[it.id].title}
                </Typography>
                <Typography as="p" size={16} tone="muted">{t.items[it.id].desc}</Typography>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 3 — How SEE Works                                        */
/* ---------------------------------------------------------------- */

function HowItWorksSection({ t }: { t: AboutProps['howItWorks'] }) {
  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: "transparent",
        padding: '6rem 0',
        position: 'relative',
        borderTop: "1px solid var(--section-rule)",
        userSelect: 'none',
      }}
    >
      <div className="page-container">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {steps.map((s) => (
            <div
              key={s.id}
              className="transition-transform duration-300 ease-out-expo motion-safe:hover:-translate-y-1.5"
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--surface)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--line)',
                borderRadius: '1.5rem',
                padding: '2rem',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '1.25rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: '3.25rem',
                  lineHeight: 1,
                  color: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                }}
              >
                {s.number}
              </span>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  backgroundColor: 'color-mix(in srgb, var(--accent-deep) 10%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--accent-deep) 20%, transparent)',
                  color: 'var(--accent)',
                  position: 'relative',
                }}
              >
                <s.icon size={22} />
              </div>
              <Typography as="h3" size={18} weight="semibold" tone="default" className="relative mb-2">
                {t.steps[s.id].title}
              </Typography>
              <Typography as="p" size={14} tone="muted" className="relative">{t.steps[s.id].desc}</Typography>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 4 — Why Us (feature grid)                                  */
/* ---------------------------------------------------------------- */

function WhyUsSection({ t }: { t: AboutProps['whyUs'] }) {
  return (
    <section
      id="why-us"
      style={{
        backgroundColor: "transparent",
        padding: '6rem 0',
        position: 'relative',
        borderTop: "1px solid var(--section-rule)",
        userSelect: 'none',
      }}
    >
      <div className="page-container">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
            gap: '1.5rem',
            margin: '0 auto',
          }}
        >
          {features.map((f) => (
            <div
              key={f.id}
              className="transition-transform duration-300 ease-out-expo motion-safe:hover:-translate-y-1.5"
              style={{
                background: 'var(--surface)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--line)',
                borderRadius: '1.5rem',
                padding: '2rem',
                cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  backgroundColor: 'color-mix(in srgb, var(--accent-deep) 10%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--accent-deep) 20%, transparent)',
                  color: 'var(--accent)',
                }}
              >
                <f.icon size={22} />
              </div>
              <Typography as="h3" size={18} weight="semibold" tone="default" className="mb-2">{t.items[f.id].title}</Typography>
              <Typography as="p" size={14} tone="muted">{t.items[f.id].desc}</Typography>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Export                                                          */
/* ---------------------------------------------------------------- */

export default function About({ story, intention, howItWorks, whyUs }: AboutProps) {
  return (
    <>
      <StorySection t={story} />
      <IntentionSection t={intention} />
      <HowItWorksSection t={howItWorks} />
      <WhyUsSection t={whyUs} />
    </>
  );
}