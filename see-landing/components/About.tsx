'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Eyebrow from '@/components/ui/Eyebrow';
import Typography from '@/components/ui/Typography';
import { CheckCircle2 } from 'lucide-react';
import { features, intentions, steps, timeline } from '@/lib/content/about';
import { easeOutExpo, fadeUpItem, staggerContainer } from '@/lib/motion';
import type { AboutProps } from '@/types/sections';

/* ---------------------------------------------------------------- */
/*  Section 1 — Our Story / Timeline                                  */
/* ---------------------------------------------------------------- */

function StorySection({ t }: { t: AboutProps['story'] }) {
  return (
    <section id="about" style={{ backgroundColor: "transparent", padding: '6rem 0', position: 'relative', overflow: 'hidden', userSelect: 'none' }}>
      {/* ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-14rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '640px',
          height: '640px',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 10%, transparent) 0%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <style>{`
        @keyframes timelineGlow {
          0%, 8%    { opacity: 0.45; box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 15%, transparent); transform: scale(1); }
          16%, 25%  { opacity: 1; box-shadow: 0 0 16px 5px color-mix(in srgb, var(--accent) 55%, transparent), 0 0 0 4px color-mix(in srgb, var(--accent) 30%, transparent); transform: scale(1.2); }
          33%, 100% { opacity: 0.45; box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 15%, transparent); transform: scale(1); }
        }

        @keyframes timelineBoxGlow {
          0%, 8%    { border-color: var(--line); box-shadow: var(--card-shadow); }
          16%, 25%  { border-color: color-mix(in srgb, var(--accent) 50%, transparent); box-shadow: 0 0 28px color-mix(in srgb, var(--accent) 16%, transparent); }
          33%, 100% { border-color: var(--line); box-shadow: var(--card-shadow); }
        }

        .timeline-list:hover .timeline-dot {
          animation-play-state: paused !important;
          opacity: 0.45 !important;
          transform: scale(1) !important;
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 15%, transparent) !important;
        }

        .timeline-list:hover .timeline-box {
          animation-play-state: paused !important;
          border-color: var(--line) !important;
          box-shadow: var(--card-shadow) !important;
        }

        .timeline-row:hover .timeline-dot {
          opacity: 1 !important;
          transform: scale(1.2) !important;
          box-shadow: 0 0 16px 5px color-mix(in srgb, var(--accent) 55%, transparent), 0 0 0 4px color-mix(in srgb, var(--accent) 30%, transparent) !important;
        }

        .timeline-row:hover .timeline-box {
          border-color: color-mix(in srgb, var(--accent) 50%, transparent) !important;
          box-shadow: 0 0 28px color-mix(in srgb, var(--accent) 16%, transparent) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .timeline-dot, .timeline-box {
            animation: none !important;
          }
        }
      `}</style>

      <div className="page-container">
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
          <motion.div variants={fadeUpItem}>

            <Eyebrow label={t.eyebrow} />

          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: narrative */}
          <div>
            <motion.div variants={fadeUpItem}>
              <Typography as="h2" size={32} weight="semibold" tone="default" className="mb-6 md:text-40">
                {t.title}
              </Typography>
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <Typography as="p" size={16} tone="muted" className="leading-[1.8] md:text-18">
              {t.body}
              </Typography>
            </motion.div>
          </div>

          {/* Right: timeline */}
          <div className="timeline-list">
            {timeline.map((event, i) => (
              <motion.div key={event.id} variants={fadeUpItem} className="timeline-row" style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10px', flexShrink: 0 }}>
                  <div
                    className="timeline-dot"
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      boxShadow: '0 0 0 4px color-mix(in srgb, var(--accent) 15%, transparent)',
                      marginTop: '1.6rem',
                      flexShrink: 0,
                      animation: 'timelineGlow 6s ease-in-out infinite',
                      animationDelay: `${i * 2}s`,
                    }}
                  />
                  {i < timeline.length - 1 && (
                    <div
                      style={{
                        width: '1px',
                        flex: 1,
                        background: 'linear-gradient(to bottom, color-mix(in srgb, var(--accent) 40%, transparent), color-mix(in srgb, var(--accent) 5%, transparent))',
                        marginTop: '0.5rem',
                      }}
                    />
                  )}
                </div>

                <div
                  className="timeline-box"
                  style={{
                    background: 'var(--surface)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: 'var(--card-shadow)',
                    border: '1px solid var(--line)',
                    borderRadius: '1.5rem',
                    padding: '1.5rem',
                    marginBottom: i < timeline.length - 1 ? '1.5rem' : 0,
                    flex: 1,
                    animation: 'timelineBoxGlow 6s ease-in-out infinite',
                    animationDelay: `${i * 2}s`,
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
              </motion.div>
            ))}
          </div>
        </motion.div>
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
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <motion.div variants={fadeUpItem}>

            <Eyebrow label={t.eyebrow} />

          </motion.div>
          <motion.div variants={fadeUpItem}>
            <Typography as="h2" size={32} weight="semibold" tone="default" className="mb-4 md:text-40">
              {t.title}
            </Typography>
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <Typography as="p" size={18} tone="muted" className="mx-auto max-w-lg">
              {t.description}
            </Typography>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {intentions.map((it, i) => {
            const isSelected = selected === i;
            return (
              <motion.div
                key={it.id}
                variants={fadeUpItem}
                onClick={() => setSelected(i)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  background: isSelected ? 'color-mix(in srgb, var(--accent) 6%, transparent)' : 'var(--surface)',
                  backdropFilter: 'blur(20px)',
                  border: isSelected ? '1px solid color-mix(in srgb, var(--accent) 50%, transparent)' : '1px solid var(--line)',
                  boxShadow: isSelected ? '0 0 32px color-mix(in srgb, var(--accent) 15%, transparent)' : 'var(--card-shadow)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  transition: 'background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--accent)' }}
                  >
                    <CheckCircle2 size={22} />
                  </motion.div>
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
              </motion.div>
            );
          })}
        </motion.div>
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
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <motion.div variants={fadeUpItem}>

            <Eyebrow label={t.eyebrow} />

          </motion.div>
          <motion.div variants={fadeUpItem}>
            <Typography as="h2" size={32} weight="semibold" tone="default" className="mb-4 md:text-40">
              {t.title}
            </Typography>
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <Typography as="p" size={18} tone="muted" className="mx-auto max-w-xl">
              {t.description}
            </Typography>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {steps.map((s) => (
            <motion.div
              key={s.id}
              variants={fadeUpItem}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--surface)',
                backdropFilter: 'blur(20px)',
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
            </motion.div>
          ))}
        </motion.div>
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
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <motion.div variants={fadeUpItem}>

            <Eyebrow label={t.eyebrow} />

          </motion.div>
          <motion.div variants={fadeUpItem}>
            <Typography as="h2" size={32} weight="semibold" tone="default" className="mb-4 md:text-40">
              {t.title}
            </Typography>
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <Typography as="p" size={18} tone="muted" className="mx-auto max-w-xl">
              {t.description}
            </Typography>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
            gap: '1.5rem',
            margin: '0 auto',
          }}
        >
          {features.map((f) => (
            <motion.div
              key={f.id}
              variants={fadeUpItem}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              style={{
                background: 'var(--surface)',
                backdropFilter: 'blur(20px)',
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
            </motion.div>
          ))}
        </motion.div>
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