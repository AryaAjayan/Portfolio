import { publications, achievements, certifications } from '@/data';

export function Achievements() {
  return (
    <section
      id="achievements"
      style={{
        background: 'var(--cream)',
        padding: 'clamp(4rem, 8vw, 7rem) var(--gutter)',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <div
          className="ach-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)',
          }}
        >
          {/* Publications */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '1.75rem' }}>
              Publications
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {publications.map((pub, i) => (
                <div key={i}>
                  <p
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: 'var(--step-2)',
                      fontWeight: 400,
                      color: 'var(--ink)',
                      marginBottom: '0.25rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {pub.title}
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--step--1)',
                      color: 'var(--stone)',
                    }}
                  >
                    {pub.venue}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '1.75rem' }}>
              Achievements
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {achievements.map((ach, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 'var(--step-0)',
                    lineHeight: 1.6,
                    color: 'var(--ink)',
                    paddingLeft: '1.1rem',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.6em',
                      fontSize: '1.1em',
                      color: 'var(--stone)',
                      lineHeight: 1,
                    }}
                  >
                    −
                  </span>
                  {ach}
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '1.75rem' }}>
              Certifications
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.65rem 0.95rem',
                    border: '1px solid rgba(28,27,24,0.14)',
                    borderRadius: '4px',
                    background: 'rgba(247,245,241,0.6)',
                    fontSize: 'var(--step--1)',
                    color: 'var(--ink)',
                    lineHeight: 1.4,
                  }}
                >
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ach-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .ach-grid > div:last-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 560px) {
          .ach-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
