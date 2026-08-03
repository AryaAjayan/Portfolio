import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '@/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);



export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const reduced = useReducedMotion();

  const nameWords = profile.name.split(' ');

  // Scroll-driven hero→about transition
  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    const content = contentRef.current;
    const portrait = portraitRef.current;
    if (!root || !content || !portrait) return;

    const ctx = gsap.context(() => {
      gsap.to(content, {
        scale: 0.85,
        opacity: 0.25,
        filter: 'blur(6px)',
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  // Title reveal on load
  useEffect(() => {
    if (reduced) return;
    const spans = rootRef.current?.querySelectorAll('.reveal-mask > span');
    if (!spans) return;
    gsap.to(spans, {
      y: '0%',
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.06,
      delay: 0.15,
    });
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="top"
      className="grain relative flex flex-col"
      style={{ height: '100vh', minHeight: '640px', background: 'var(--bone)' }}
    >
      <div
        ref={contentRef}
        className="relative z-10 flex-1 flex flex-col justify-center"
        style={{
          maxWidth: 'var(--maxw)',
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--gutter)',
          paddingTop: '5rem',
        }}
      >
        <p
          className="eyebrow"
          style={{ marginBottom: '1.5rem', opacity: 0 }}
          ref={(el) => {
            if (el && !reduced) gsap.to(el, { opacity: 1, duration: 0.6, delay: 0.05 });
            else if (el) el.style.opacity = '1';
          }}
        >
          {profile.location}
        </p>

        <h1
          style={{
            fontSize: 'var(--step-6)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            maxWidth: '14ch',
          }}
        >
          {nameWords.map((word, i) => (
            <span key={i} className="reveal-mask" style={{ marginRight: '0.25em' }}>
              <span>{word}</span>
            </span>
          ))}
        </h1>

        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'var(--step-2)',
            fontStyle: 'italic',
            color: 'var(--stone)',
            marginTop: '1.5rem',
            maxWidth: '32ch',
            opacity: 0,
          }}
          ref={(el) => {
            if (el && !reduced) gsap.to(el, { opacity: 1, duration: 0.8, delay: 0.7 });
            else if (el) el.style.opacity = '1';
          }}
        >
          {profile.role}
        </p>
      </div>



      {/* Scroll cue */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ bottom: '2rem' }}
      >
        <span
          className="eyebrow"
          style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}
        >
          Scroll
        </span>
        <span
          style={{
            display: 'block',
            width: '1px',
            height: '36px',
            background: 'var(--stone)',
            transformOrigin: 'top',
            animation: reduced ? 'none' : 'scrollLine 2.2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          45% { transform: scaleY(1); transform-origin: top; }
          55% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
