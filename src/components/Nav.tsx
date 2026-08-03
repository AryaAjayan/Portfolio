import { useEffect, useState } from 'react';
import { profile } from '@/data';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(247, 245, 241, 0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(28, 27, 24, 0.08)' : '1px solid transparent',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: 'var(--maxw)',
          margin: '0 auto',
          padding: '1rem var(--gutter)',
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '1.15rem',
            fontWeight: 500,
            letterSpacing: '-0.01em',
          }}
        >
          {profile.name}
        </a>
        <div className="flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link hidden sm:inline-block">
              {l.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="nav-link"
            style={{ color: 'var(--accent)', fontWeight: 500 }}
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}
