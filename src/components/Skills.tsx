import { skillGroups } from '@/data';
import { getIcon } from '@/icons';

export function Skills() {
  return (
    <section
      id="skills"
      style={{
        background: 'var(--bone)',
        padding: 'clamp(5rem, 10vw, 9rem) var(--gutter)',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>
          Skills
        </p>
        <h2
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: '20ch',
            marginBottom: '3.5rem',
            color: 'var(--ink)',
          }}
        >
          A toolkit built for production-shaped AI systems.
        </h2>

        <div style={{ display: 'grid', gap: '2.25rem' }}>
          {skillGroups.map((group) => (
            <div key={group.category}>
              {/* Category header with divider */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.6rem',
                  paddingBottom: '0.65rem',
                  borderBottom: '1px solid rgba(28, 27, 24, 0.12)',
                  marginBottom: '1rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                    fontWeight: 400,
                    color: 'var(--ink)',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {group.category}
                </h3>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--stone)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {group.items.length}
                </span>
              </div>

              {/* Skill pills */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.55rem',
                }}
              >
                {group.items.map((item) => {
                  const icon = getIcon(item.icon);
                  return (
                    <span key={item.name} className="skill-pill">
                      {icon && (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          fill={`#${icon.hex}`}
                          aria-label={item.name}
                          style={{ width: 15, height: 15, flexShrink: 0 }}
                        >
                          <path d={icon.path} />
                        </svg>
                      )}
                      {item.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
