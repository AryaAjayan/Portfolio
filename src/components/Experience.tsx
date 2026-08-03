import { experience, education } from '@/data';

export function Experience() {
  return (
    <section
      id="experience"
      style={{
        background: 'var(--bone)',
        padding: 'clamp(5rem, 10vw, 9rem) var(--gutter)',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>
          Experience &amp; Education
        </p>
        <h2
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '4rem',
            maxWidth: '20ch',
            color: 'var(--ink)',
          }}
        >
          Three internships, one degree&nbsp;— all shipping.
        </h2>

        <div
          className="exp-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
            gap: 'clamp(2rem, 5vw, 5rem)',
          }}
        >
          {/* ── Dates column ── */}
          <div>
            {experience.map((item, i) => (
              <div
                key={i}
                style={{
                  paddingBottom: '3rem',
                  marginBottom: '3rem',
                  borderBottom: '1px solid rgba(28,27,24,0.1)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 'var(--step-1)',
                    color: 'var(--accent-ink)',
                    fontStyle: 'italic',
                  }}
                >
                  {item.period}
                </span>
              </div>
            ))}
            {/* Education date */}
            <div>
              <span
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 'var(--step-1)',
                  color: 'var(--accent-ink)',
                  fontStyle: 'italic',
                }}
              >
                {education.year}
              </span>
            </div>
          </div>

          {/* ── Content column ── */}
          <div>
            {experience.map((item, i) => (
              <div
                key={i}
                style={{
                  paddingBottom: '3rem',
                  marginBottom: '3rem',
                  borderBottom: '1px solid rgba(28,27,24,0.1)',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 'var(--step-2)',
                    fontWeight: 400,
                    color: 'var(--ink)',
                    marginBottom: '0.3rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.role}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--step--1)',
                    color: item.orgColor ?? 'var(--accent)',
                    marginBottom: '1.25rem',
                    fontWeight: 400,
                  }}
                >
                  {item.org}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {item.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 'var(--step-0)',
                        lineHeight: 1.7,
                        color: 'var(--ink)',
                        opacity: 0.88,
                        marginBottom: '0.85rem',
                        paddingLeft: '1.4rem',
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
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Education */}
            <div>
              <h3
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 'var(--step-2)',
                  fontWeight: 400,
                  color: 'var(--ink)',
                  marginBottom: '0.3rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {education.degree}
              </h3>
              <p
                style={{
                  fontSize: 'var(--step--1)',
                  color: '#5b8fa8',
                  marginBottom: '0.6rem',
                }}
              >
                {education.school}
              </p>
              <p
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 'var(--step-1)',
                  color: 'var(--ink)',
                }}
              >
                CGPA {education.cgpa}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .exp-grid {
            grid-template-columns: 1fr !important;
          }
          .exp-grid > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
