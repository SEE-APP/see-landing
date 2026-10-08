'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { easeOutExpo, fadeUpItem, staggerContainer } from '@/lib/motion';
import type { DemoProps } from '@/types/sections';
import { ArrowRight, Play } from 'lucide-react';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Typography from '@/components/ui/Typography';

export default function Demo({ videoSrc = 'https://www.youtube.com/embed/n0v4iKcuBoQ' }: DemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const showVideo = Boolean(videoSrc) && isPlaying;

  return (
    <section id="demo" style={{ backgroundColor: '#0f172a', padding: '6rem 0', position: 'relative', userSelect: 'none' }}>
      <div className="page-container">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <motion.div variants={fadeUpItem}>
            <Eyebrow label="The Product" />
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <Typography as="h2" size={32} weight="semibold" tone="default" className="mb-4 md:text-40">
              See it in action.
            </Typography>
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <Typography as="p" size={18} tone="muted" className="mx-auto max-w-xl">
              See how an online introduction becomes a real-world connection.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Video frame */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          whileHover={{ scale: 1.01 }}
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
          }}
        >
          {showVideo ? (
            <iframe
              src={`${videoSrc}?autoplay=1&rel=0`}
              title="SEE demo video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            <>
              {/* Abstract drifting gradient blobs */}
              <motion.div
                style={{ position: 'absolute', width: '18rem', height: '18rem', borderRadius: '50%', filter: 'blur(60px)', backgroundColor: 'rgba(34, 152, 142, 0.3)', top: '-15%', left: '-10%' }}
                animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                style={{ position: 'absolute', width: '20rem', height: '20rem', borderRadius: '50%', filter: 'blur(60px)', backgroundColor: 'rgba(71, 189, 178, 0.2)', bottom: '-20%', right: '-10%' }}
                animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              />

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
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                zIndex: 2
              }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#475569' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#475569' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#475569' }} />
                <span style={{ margin: '0 auto', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b' }}>
                  Prototype Walkthrough
                </span>
              </div>

              {/* Play button */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <motion.button
                  onClick={() => setIsPlaying(true)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '5rem',
                    height: '5rem',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer'
                  }}
                  aria-label="Play demo video"
                >
                  <motion.span
                    style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #47bdb2' }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <Play size={26} color="#ffffff" fill="#ffffff" style={{ marginLeft: '4px' }} />
                </motion.button>
              </div>

              {/* Preview badge */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '10px',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#cbd5e1',
                zIndex: 2
              }}>
                Preview
              </div>
            </>
          )}
        </motion.div>

        {/* Call to Action / Caption */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <Typography as="p" size={16} weight="medium" tone="default">
            Ready to find your space?
          </Typography>
          <Button
            variant="text"
            href="/#waitlist"
            label="Get early access"
            rightIcon={<ArrowRight size={16} />}
          />
        </div>
      </div>
      </div>
    </section>
  );
}