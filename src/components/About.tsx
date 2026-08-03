import { profile, stats } from '@/data';

export function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--cream)',
        padding: 'clamp(4rem, 8vw, 7rem) var(--gutter)',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <p className="eyebrow" style={{ marginBottom: '2.5rem' }}>
          About
        </p>

        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
            gap: 'clamp(2rem, 6vw, 6rem)',
            alignItems: 'start',
          }}
        >
          {/* Left — italic editorial quote */}
          <div>
            <p
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
                lineHeight: 1.45,
                color: 'var(--ink)',
                fontWeight: 400,
                margin: 0,
              }}
            >
              {profile.quote}
            </p>
          </div>

          {/* Right — bio paragraph + stats */}
          <div>
            <p
              style={{
                fontSize: 'var(--step-0)',
                lineHeight: 1.75,
                color: 'var(--ink)',
                marginBottom: '2rem',
              }}
            >
              {profile.bio}
            </p>

            {/* Stats row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                border: '1px solid rgba(28,27,24,0.14)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              className="stats-grid"
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: '1.1rem 1rem',
                    borderLeft: i === 0 ? 'none' : '1px solid rgba(28,27,24,0.14)',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                      fontWeight: 400,
                      color: 'var(--ink)',
                      lineHeight: 1,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--stone)',
                      lineHeight: 1.35,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div:nth-child(2) {
            border-left: 1px solid rgba(28,27,24,0.14) !important;
          }
          .stats-grid > div:nth-child(3) {
            border-left: none !important;
            border-top: 1px solid rgba(28,27,24,0.14);
          }
          .stats-grid > div:nth-child(4) {
            border-top: 1px solid rgba(28,27,24,0.14);
          }
        }
      `}</style>
    </section>
  );
}
