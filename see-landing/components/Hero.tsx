'use client';

import { Fragment, useEffect, useRef } from 'react';
import Typography from '@/components/ui/Typography';
import type { HeroProps } from '@/types/sections';

export default function Hero({ t }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 1000);
        this.y = Math.random() * (canvas?.height || 1000);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (canvas && (this.x < 0 || this.x > canvas.width)) this.vx = -this.vx;
        if (canvas && (this.y < 0 || this.y > canvas.height)) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(71, 189, 178, 0.45)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 16000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            const opacity = 1 - distance / 130;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(71, 189, 178, ${opacity * 0.22})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        padding: 0,
        overflow: 'hidden',
        textAlign: 'center',
        userSelect: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <style>{`
        /* კონტენტის wrapper მობილურისა და დესკტოპის ბალანსისთვის */
        .content-wrapper {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          margin-top: -12vh;
        }

        .see-connect-box {
          position: relative;
          background-color: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 24px;
          cursor: default;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          overflow: hidden; 
        }
        
        .see-connect-box:hover {
          transform: translateY(-3px);
          border-color: rgba(71, 189, 178, 0.45);
          box-shadow: 0 0 30px rgba(71, 189, 178, 0.18);
        }

        .box-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }

        .svg-wrapper {
          margin-bottom: 1.25rem;
        }

        .logo-frame {
          position: relative;
          width: 108px;
          aspect-ratio: 1508 / 2328;
        }

        .logo-frame img {
          width: 100%;
          height: 100%;
          display: block;
          position: relative;
          z-index: 1;
          -webkit-user-drag: none;
          filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.4));
        }

        .logo-frame svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }
        
        .text-wrapper {
          text-align: center;
        }

        .rc-text {
          display: block;
        }

        @media (min-width: 768px) {
          .content-wrapper {
            margin-top: -8vh;
          }
          .box-inner {
            flex-direction: row;
            justify-content: center; /* დესკტოპზე ცენტრში აყენებს ლოგოს და ტექსტს */
            align-items: center;
            padding: 1.5rem 2rem; /* სიმეტრიული დაშორება */
            width: 100%;
          }
          .svg-wrapper {
            margin-bottom: 0;
            margin-right: 2.5rem; /* ტექსტსა და ლოგოს შორის დაშორება */
          }
          .logo-frame {
            width: 128px;
          }
          .text-wrapper {
            text-align: left;
            white-space: nowrap;
          }
          .rc-text {
            display: inline;
          }
        }

        @keyframes seeBgPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes seeLineDraw {
          0%   { stroke-dashoffset: 3200; opacity: 0; }
          10%  { opacity: 1; }
          22%  { stroke-dashoffset: 0; opacity: 1; }
          78%  { stroke-dashoffset: 0; opacity: 1; }
          92%  { opacity: 0; }
          100% { stroke-dashoffset: 3200; opacity: 0; }
        }

        @keyframes seeNodePulse {
          0%, 15%  { opacity: 0.7; transform: scale(0.95); }
          25%, 75% { opacity: 1; transform: scale(1.05); }
          90%, 100%{ opacity: 0.7; transform: scale(0.95); }
        }

        .see-connect-box:hover .see-line {
          animation-play-state: paused;
          stroke-dashoffset: 0 !important;
          opacity: 1 !important;
        }
        .see-connect-box:hover .see-node {
          animation-play-state: paused;
          opacity: 1 !important;
          transform: scale(1) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .see-line, .see-node, .see-glow {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      <div className="page-container relative z-1">
      <div className="content-wrapper">
        
        <Typography as="h1" size={36} weight="extrabold" tone="default" className="mb-4 md:text-48 lg:text-64">
          {t.titleLines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </Typography>

        <Typography as="p" size={16} tone="muted" className="mx-auto mb-10 max-w-[680px] md:text-18">
          {t.description}
        </Typography>

        <div className="see-connect-box">
          <div
            className="see-glow"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '120%',
              height: '120%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(ellipse at center, rgba(71,189,178,0.15) 0%, transparent 60%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div className="box-inner">
            <div className="svg-wrapper">
              <div className="logo-frame">
                <img src="/see-logo.png" alt={t.logoAlt} />

                <svg viewBox="0 0 1508 2328" xmlns="http://www.w3.org/2000/svg">
                  <line className="see-line" x1="1389" y1="95"   x2="1357" y2="482"  stroke="#ffffff" strokeWidth="16" strokeLinecap="round" strokeDasharray="3200" style={{ animation: 'seeLineDraw 6s ease-in-out infinite', animationDelay: '0s' }} />
                  <line className="see-line" x1="1357" y1="482"  x2="73"   y2="1207" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" strokeDasharray="3200" style={{ animation: 'seeLineDraw 6s ease-in-out infinite', animationDelay: '0.2s' }} />
                  <line className="see-line" x1="73"   y1="1207" x2="123"  y2="726"  stroke="#ffffff" strokeWidth="16" strokeLinecap="round" strokeDasharray="3200" style={{ animation: 'seeLineDraw 6s ease-in-out infinite', animationDelay: '0.4s' }} />
                  <line className="see-line" x1="123"  y1="726"  x2="1389" y2="95"   stroke="#ffffff" strokeWidth="16" strokeLinecap="round" strokeDasharray="3200" style={{ animation: 'seeLineDraw 6s ease-in-out infinite', animationDelay: '0.6s' }} />

                  <line className="see-line" x1="1432" y1="1033" x2="1382" y2="1570" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" strokeDasharray="3200" style={{ animation: 'seeLineDraw 6s ease-in-out infinite', animationDelay: '0.8s' }} />
                  <line className="see-line" x1="1382" y1="1570" x2="82"   y2="2236" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" strokeDasharray="3200" style={{ animation: 'seeLineDraw 6s ease-in-out infinite', animationDelay: '1.0s' }} />
                  <line className="see-line" x1="82"   y1="2236" x2="263"  y2="1311" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" strokeDasharray="3200" style={{ animation: 'seeLineDraw 6s ease-in-out infinite', animationDelay: '1.2s' }} />
                  <line className="see-line" x1="263"  y1="1311" x2="1432" y2="1033" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" strokeDasharray="3200" style={{ animation: 'seeLineDraw 6s ease-in-out infinite', animationDelay: '1.4s' }} />

                  <line className="see-line" x1="1389" y1="95"   x2="73"   y2="1207" stroke="rgba(255,255,255,0.6)" strokeWidth="12" strokeLinecap="round" strokeDasharray="3200" style={{ animation: 'seeLineDraw 6s ease-in-out infinite', animationDelay: '1.6s' }} />
                  <line className="see-line" x1="1432" y1="1033" x2="82"   y2="2236" stroke="rgba(255,255,255,0.6)" strokeWidth="12" strokeLinecap="round" strokeDasharray="3200" style={{ animation: 'seeLineDraw 6s ease-in-out infinite', animationDelay: '1.8s' }} />

                  <circle className="see-node" cx="1389" cy="95"   r="50" fill="#ffffff" stroke="#47bdb2" strokeWidth="18" style={{ animation: 'seeNodePulse 6s ease-in-out infinite', animationDelay: '0s',   transformOrigin: '1389px 95px' }} />
                  <circle className="see-node" cx="1357" cy="482"  r="50" fill="#ffffff" stroke="#47bdb2" strokeWidth="18" style={{ animation: 'seeNodePulse 6s ease-in-out infinite', animationDelay: '0.2s', transformOrigin: '1357px 482px' }} />
                  <circle className="see-node" cx="123"  cy="726"  r="50" fill="#ffffff" stroke="#47bdb2" strokeWidth="18" style={{ animation: 'seeNodePulse 6s ease-in-out infinite', animationDelay: '0.4s', transformOrigin: '123px 726px' }} />
                  
                  <circle className="see-node" cx="73"   cy="1207" r="50" fill="#ffffff" stroke="#47bdb2" strokeWidth="18" style={{ animation: 'seeNodePulse 6s ease-in-out infinite', animationDelay: '0.5s', transformOrigin: '73px 1207px' }} />

                  <circle className="see-node" cx="1432" cy="1033" r="50" fill="#ffffff" stroke="#47bdb2" strokeWidth="18" style={{ animation: 'seeNodePulse 6s ease-in-out infinite', animationDelay: '0.6s', transformOrigin: '1432px 1033px' }} />
                  <circle className="see-node" cx="1382" cy="1570" r="50" fill="#ffffff" stroke="#47bdb2" strokeWidth="18" style={{ animation: 'seeNodePulse 6s ease-in-out infinite', animationDelay: '0.8s', transformOrigin: '1382px 1570px' }} />
                  <circle className="see-node" cx="82"   cy="2236" r="50" fill="#ffffff" stroke="#47bdb2" strokeWidth="18" style={{ animation: 'seeNodePulse 6s ease-in-out infinite', animationDelay: '1.0s', transformOrigin: '82px 2236px' }} />
                  <circle className="see-node" cx="263"  cy="1311" r="50" fill="#ffffff" stroke="#47bdb2" strokeWidth="18" style={{ animation: 'seeNodePulse 6s ease-in-out infinite', animationDelay: '1.2s', transformOrigin: '263px 1311px' }} />
                </svg>
              </div>
            </div>

            <div className="text-wrapper" style={{ position: 'relative', zIndex: 1, fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
              <span className="rc-text" style={{ color: '#47bdb2' }}>{t.taglineAccent} </span>
              <span className="rc-text" style={{ color: '#e2e8f0' }}>{t.taglineRest}</span>
            </div>
          </div>
        </div>

      </div>
      </div>
    </section>
  );
}