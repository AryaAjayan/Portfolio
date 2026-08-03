import { profile } from '@/data';
import { Linkedin, Github, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: 'var(--charcoal)',
        color: 'var(--bone)',
        padding: 'clamp(6rem, 14vw, 10rem) var(--gutter)',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <p
          className="eyebrow"
          style={{ color: 'var(--greige)', marginBottom: '2rem' }}
        >
          Contact
        </p>

        <h2
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'var(--bone)',
            marginBottom: '3rem',
            maxWidth: '12ch',
          }}
        >
          Let's build something.
        </h2>

        {/* Email */}
        <a
          href={`mailto:${profile.email}`}
          style={{
            display: 'inline-block',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            fontWeight: 400,
            color: 'var(--bone)',
            borderBottom: '1px solid var(--greige)',
            paddingBottom: '0.4rem',
            transition: 'border-color 0.4s, color 0.4s',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-soft)';
            e.currentTarget.style.color = 'var(--accent-soft)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--greige)';
            e.currentTarget.style.color = 'var(--bone)';
          }}
        >
          {profile.email}
        </a>

        {/* Social row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2.25rem',
            marginTop: '2.5rem',
            alignItems: 'center',
          }}
        >
          <SocialLink
            href={profile.linkedin}
            icon={<Linkedin size={16} />}
            label="LinkedIn"
          />
          <SocialLink
            href={profile.github}
            icon={<Github size={16} />}
            label="GitHub"
          />
          <SocialLink
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            icon={<Phone size={16} />}
            label={profile.phone}
          />
        </div>

        {/* Footer bar */}
        <div
          style={{
            marginTop: '5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(247,245,241,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: 'var(--greige)' }}>
            {profile.location}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--greige)' }}>
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        color: 'var(--greige)',
        fontSize: 'var(--step--1)',
        transition: 'color 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--greige)')}
    >
      {icon}
      {label}
    </a>
  );
}
