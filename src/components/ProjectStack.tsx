import { useState, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { projects, type Project } from '@/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const cardVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, rotate: dir > 0 ? 8 : -8 }),
  center: { x: 0, opacity: 1, rotate: 0 },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
    rotate: dir > 0 ? -8 : 8,
    transition: { duration: 0.35 },
  }),
};

export function ProjectStack() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduced = useReducedMotion();

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + projects.length) % projects.length);
  }, []);

  const project = projects[index];

  return (
    <section
      id="projects"
      style={{
        background: 'var(--charcoal)',
        color: 'var(--bone)',
        padding: 'clamp(5rem, 10vw, 9rem) var(--gutter)',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <p className="eyebrow" style={{ color: 'var(--greige)', marginBottom: '1rem' }}>
          Selected Work
        </p>
        <h2
          style={{
            fontSize: 'var(--step-4)',
            color: 'var(--bone)',
            marginBottom: '1rem',
            maxWidth: '20ch',
          }}
        >
          Seven projects. Each carries a number next to it.
        </h2>
        <p
          style={{
            color: 'var(--greige)',
            maxWidth: '48ch',
            marginBottom: '3rem',
            fontSize: 'var(--step-0)',
          }}
        >
          Swipe the card left or right to move to the next project. Use the arrows if you prefer.
        </p>

        {/* Swipeable card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              height: '560px',
            }}
            className="card-deck-wrap"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.id}
                custom={direction}
                drag={reduced ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -100 || info.velocity.x < -500) {
                    paginate(1);
                  } else if (info.offset.x > 100 || info.velocity.x > 500) {
                    paginate(-1);
                  }
                }}
                variants={cardVariants}
                initial={reduced ? false : 'enter'}
                animate="center"
                exit={reduced ? { opacity: 0 } : 'exit'}
                transition={{ type: 'spring', stiffness: 240, damping: 28 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  cursor: reduced ? 'default' : 'grab',
                }}
              >
                <ProjectCard project={project} total={projects.length} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '2.5rem',
            }}
          >
            <NavButton onClick={() => paginate(-1)} label="Previous project">
              <ChevronLeft size={18} />
            </NavButton>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'var(--step-1)',
                color: 'var(--greige)',
                minWidth: '60px',
                textAlign: 'center',
              }}
            >
              {String(index + 1).padStart(2, '0')}
              <span style={{ color: 'rgba(247,245,241,0.3)' }}>
                {' '}/ {String(projects.length).padStart(2, '0')}
              </span>
            </span>
            <NavButton onClick={() => paginate(1)} label="Next project">
              <ChevronRight size={18} />
            </NavButton>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .card-deck-wrap {
            height: 620px !important;
          }
        }
      `}</style>
    </section>
  );
}

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        background: 'transparent',
        border: '1px solid rgba(247,245,241,0.2)',
        color: 'var(--bone)',
        borderRadius: '999px',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color 0.3s, color 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-soft)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(247,245,241,0.2)')}
    >
      {children}
    </button>
  );
}

function ProjectCard({ project, total }: { project: Project; total: number }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--cream)',
        color: 'var(--ink)',
        borderRadius: '12px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 24px 60px -12px rgba(0,0,0,0.5), 0 8px 20px -8px rgba(0,0,0,0.3)',
        border: '1px solid rgba(28,27,24,0.08)',
        overflowY: 'auto',
      }}
      className="project-card-scroll"
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '1.25rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(28,27,24,0.1)',
        }}
      >
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '0.85rem',
            color: 'var(--stone)',
            letterSpacing: '0.05em',
          }}
        >
          {String(project.index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span
          style={{
            fontSize: '0.68rem',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Case Study
        </span>
      </div>

      {/* Title + tagline */}
      <h3
        style={{
          fontSize: 'var(--step-3)',
          color: 'var(--ink)',
          marginBottom: '0.4rem',
        }}
      >
        {project.title}
      </h3>
      <p
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic',
          fontSize: 'var(--step-0)',
          color: 'var(--stone)',
          marginBottom: '1.25rem',
        }}
      >
        {project.tagline}
      </p>

      {/* Summary */}
      <p
        style={{
          fontSize: '0.88rem',
          lineHeight: 1.65,
          color: 'var(--ink)',
          opacity: 0.85,
          marginBottom: '1.25rem',
        }}
      >
        {project.summary}
      </p>

      {/* Architecture */}
      <p
        style={{
          fontSize: '0.85rem',
          lineHeight: 1.65,
          color: 'var(--ink)',
          opacity: 0.75,
          marginBottom: '1.25rem',
        }}
      >
        {project.architecture}
      </p>

      {/* Stack */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginBottom: '1.25rem',
        }}
      >
        {project.stack.map((s) => (
          <span
            key={s}
            style={{
              fontSize: '0.72rem',
              color: 'var(--ink)',
              padding: '0.25rem 0.65rem',
              border: '1px solid rgba(28,27,24,0.15)',
              borderRadius: '999px',
              background: 'var(--bone)',
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Metrics */}
      {project.metrics.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: project.recognition ? '1.25rem' : '0',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(28,27,24,0.1)',
          }}
        >
          {project.metrics.map((m, i) => (
            <div key={i} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '0.85rem' }}>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'var(--step-2)',
                  color: 'var(--accent-ink)',
                  lineHeight: 1,
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--stone)',
                  marginTop: '0.35rem',
                  lineHeight: 1.4,
                  maxWidth: '180px',
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recognition */}
      {project.recognition && (
        <div
          style={{
            padding: '0.85rem 1.1rem',
            background: 'var(--bone)',
            borderRadius: '6px',
            borderLeft: '3px solid var(--accent)',
            marginBottom: '1.25rem',
          }}
        >
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: '0.88rem',
              color: 'var(--ink)',
            }}
          >
            {project.recognition}
          </p>
        </div>
      )}

      {/* Links */}
      {(project.github || project.demo) && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginTop: 'auto',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(28,27,24,0.1)',
          }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--ink)',
                padding: '0.5rem 0.95rem',
                border: '1px solid rgba(28,27,24,0.2)',
                borderRadius: '999px',
                background: 'var(--bone)',
                transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(28,27,24,0.2)';
                e.currentTarget.style.color = 'var(--ink)';
              }}
            >
              <Github size={15} />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--bone)',
                padding: '0.5rem 0.95rem',
                border: '1px solid var(--accent)',
                borderRadius: '999px',
                background: 'var(--accent)',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-ink)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
              }}
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
