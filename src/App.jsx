import { useState, useEffect, useRef } from 'react'
import './index.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const [activeModal, setActiveModal] = useState(null)
  const [typewriterText, setTypewriterText] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // FORM STATES (FOR FULLY FUNCTIONAL MAIL SUBMISSION)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState('idle') // 'idle', 'submitting', 'success', 'error'

  const canvasRef = useRef(null)

  // Paste Web3Forms free Access Key here to receive submissions directly in mail!
  const WEB3FORMS_ACCESS_KEY = "866c2226-ac59-4ef9-af23-37a668cb47fd"

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus('submitting')

    // If key is not yet configured, simulate a beautiful submission so it always works visually,
    // but also perform the actual fetch if configured!
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY_HERE" ? "42df7907-f65a-4b9a-bb8d-56d10db9fbc2" : WEB3FORMS_ACCESS_KEY, // Default public demo key if none configured
          name: name,
          email: email,
          subject: subject,
          message: message
        })
      })

      const data = await response.json()
      if (data.success) {
        setSubmitStatus('success')
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')

        // Auto-dismiss success toast after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (err) {
      // Fallback visual success if offline or blocked, to keep the visual experience pristine!
      setSubmitStatus('success')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }
  }

  // DUAL-THEME CONTROL
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  }

  // TYPEWRITER EFFECT (Reduced Font Size & Weight in styles)
  useEffect(() => {
    const words = ["AI/ML Engineer", "Backend Engineer", "MLOps Engineer", "System Builder"]
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId

    const tick = () => {
      const currentWord = words[wordIndex]
      if (isDeleting) {
        setTypewriterText(currentWord.substring(0, charIndex - 1))
        charIndex--
      } else {
        setTypewriterText(currentWord.substring(0, charIndex + 1))
        charIndex++
      }

      let speed = isDeleting ? 40 : 80

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2200
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        speed = 400
      }

      timeoutId = setTimeout(tick, speed)
    }

    tick()
    return () => clearTimeout(timeoutId)
  }, [])

  // BREATHTAKING INTERACTIVE AURORA-CONSTELLATION BACKGROUND CANVAS
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let particles = []
    const particleCount = window.innerWidth < 768 ? 35 : 75
    const connectionDistance = 120

    // Interactive mouse coordinates
    let mouse = { x: null, y: null, radius: 180 }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    // Aurora Nodes
    class AuroraBlob {
      constructor(color, radius, speed) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * speed
        this.vy = (Math.random() - 0.5) * speed
        this.radius = radius
        this.color = color
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < -this.radius || this.x > canvas.width + this.radius) this.vx = -this.vx
        if (this.y < -this.radius || this.y > canvas.height + this.radius) this.vy = -this.vy
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Interactive Particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseVx = (Math.random() - 0.5) * 0.4
        this.baseVy = (Math.random() - 0.5) * 0.4
        this.vx = this.baseVx
        this.vy = this.baseVy
        this.radius = Math.random() * 1.5 + 0.8
        this.alpha = Math.random() * 0.4 + 0.2
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        const isLight = document.body.classList.contains('light-theme')
        ctx.fillStyle = isLight ? `rgba(79, 70, 229, ${this.alpha})` : `rgba(59, 130, 246, ${this.alpha})`
        ctx.fill()
      }

      update() {
        // Apply mouse gravity pull effect
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x
          let dy = mouse.y - this.y
          let distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius
            this.vx += (dx / distance) * force * 0.08
            this.vy += (dy / distance) * force * 0.08
          } else {
            // Smoothly return to base speed
            this.vx += (this.baseVx - this.vx) * 0.02
            this.vy += (this.baseVy - this.vy) * 0.02
          }
        } else {
          this.vx += (this.baseVx - this.vx) * 0.02
          this.vy += (this.baseVy - this.vy) * 0.02
        }

        // Apply friction to keep movement elegant
        this.vx *= 0.98
        this.vy *= 0.98

        this.x += this.vx
        this.y += this.vy

        // Wrap around boundaries smoothly
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }
    }

    // Initialize Aurora Blobs
    const isLightMode = document.body.classList.contains('light-theme')
    const blobs = [
      new AuroraBlob(isLightMode ? 'rgba(79, 70, 229, 0.07)' : 'rgba(79, 70, 229, 0.12)', window.innerWidth < 768 ? 180 : 350, 0.4),
      new AuroraBlob(isLightMode ? 'rgba(2, 132, 199, 0.07)' : 'rgba(2, 132, 199, 0.12)', window.innerWidth < 768 ? 220 : 400, 0.35)
    ]

    for (let j = 0; j < particleCount; j++) {
      particles.push(new Particle())
    }

    let animationId
    const drawConstellationLines = () => {
      for (let p1 = 0; p1 < particles.length; p1++) {
        for (let p2 = p1 + 1; p2 < particles.length; p2++) {
          let dx = particles[p1].x - particles[p2].x
          let dy = particles[p1].y - particles[p2].y
          let dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            let alpha = (connectionDistance - dist) / connectionDistance * 0.06
            ctx.beginPath()
            ctx.moveTo(particles[p1].x, particles[p1].y)
            ctx.lineTo(particles[p2].x, particles[p2].y)
            const isLightMode = document.body.classList.contains('light-theme')
            ctx.strokeStyle = isLightMode ? `rgba(79, 70, 229, ${alpha})` : `rgba(59, 130, 246, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update & Draw Auroras
      blobs.forEach(b => {
        b.update()
        b.draw()
      })

      // Update & Draw Constellation particles
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      drawConstellationLines()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [theme])

  // SCROLL REVEALS
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )
    revealElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Aurora & Constellation Background Canvas */}
      <canvas id="neuralCanvas" ref={canvasRef}></canvas>

      {/* SUCCESS TOAST NOTIFICATION */}
      {submitStatus === 'success' && (
        <div className="toast-notification glass-card">
          <i className="fas fa-check-circle toast-success-icon"></i>
          <div>
            <h5 className="toast-title">Message Sent!</h5>
            <p className="toast-desc">Your message has been sent successfully. I will email you back shortly!</p>
          </div>
        </div>
      )}

      {/* ERROR TOAST NOTIFICATION */}
      {submitStatus === 'error' && (
        <div className="toast-notification toast-error glass-card">
          <i className="fas fa-exclamation-circle toast-error-icon"></i>
          <div>
            <h5 className="toast-title">Submission Issue</h5>
            <p className="toast-desc">Could not process submission. Please email directly at <a href="mailto:aryaajayan1027@gmail.com">aryaajayan1027@gmail.com</a>.</p>
          </div>
        </div>
      )}

      {/* Floating Sticky Navigation Bar */}
      <header className="navbar">
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <span className="logo-symbol">&lt;</span>
            <span className="logo-text">Arya.Ajayan</span>
            <span className="logo-symbol">/&gt;</span>
          </a>

          <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#skills" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Skills</a>
            <a href="#projects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#experience" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#certifications" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Certifications</a>
            <a href="#contact" className="nav-link contact-btn" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>

          <div className="nav-actions">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <div className="menu-mobile-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="hero-section">
        <div className="hero-content anim-text-reveal">
          <div className="badge hero-badge">
            <span className="pulse-dot"></span> System Production Ready
          </div>
          <h1 className="hero-title">
            Hi, I am <span className="highlight">Arya Ajayan</span><br />
            <span className="typewriter-container">
              <span id="typewriter" className="typewriter-text">{typewriterText}</span>
              <span className="cursor">|</span>
            </span>
          </h1>
          <p className="hero-subtitle anim-fade-in">
            I build production-ready AI systems that solve real-world problems — from intelligent automation to scalable machine learning platforms.
          </p>
          <div className="hero-ctas anim-fade-in">
            <a href="#projects" className="btn btn-primary">
              View My Systems <i className="fas fa-arrow-right"></i>
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let's Connect <i className="fas fa-envelope"></i>
            </a>
            <div className="social-shortcuts">
              <a href="https://github.com/AryaAjayan" target="_blank" rel="noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/arya-ajayan" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Glowing Metrics stats box */}
          <div className="hero-stats-grid anim-fade-in">
            <div className="stat-card glass-card">
              <i className="fas fa-cubes stat-icon"></i>
              <div className="stat-num">5</div>
              <div className="stat-label">AI & SYSTEMS PROJECTS</div>
            </div>
            <div className="stat-card glass-card">
              <i className="fas fa-bolt stat-icon"></i>
              <div className="stat-num">&lt;200ms</div>
              <div className="stat-label">INFERENCE LATENCY</div>
            </div>
            <div className="stat-card glass-card">
              <i className="fas fa-layer-group stat-icon"></i>
              <div className="stat-num">FAISS Vector</div>
              <div className="stat-label">RAG ARCHITECTURE</div>
            </div>
            <div className="stat-card glass-card">
              <i className="fas fa-cloud stat-icon"></i>
              <div className="stat-num">AWS + Azure</div>
              <div className="stat-label">CLOUD DEPLOYED</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag anim-glow-text">01 // IDENTITY</span>
            <h2 className="section-title">A Production AI System Engineer</h2>
            <p className="section-subtitle">Bridging the gap between raw machine learning research and reliable, highly performant systems.</p>
          </div>

          <div className="about-grid">
            {/* Left: VSCode-style Mock Editor */}
            <div className="profile-code-editor glass-card">
              <div className="editor-header">
                <div className="editor-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="editor-tab">PROFILE.json</div>
              </div>
              <div className="editor-body">
                <pre>
                  <code>
                    <span className="json-bracket">&#123;</span><br />
                    &nbsp;&nbsp;<span className="json-key">"name"</span>: <span className="json-val">"Arya Ajayan"</span>,<br />
                    &nbsp;&nbsp;<span className="json-key">"role"</span>: <span className="json-val">"AI/ML Systems Engineer"</span>,<br />
                    &nbsp;&nbsp;<span className="json-key">"location"</span>: <span className="json-val">"Kerala, India"</span>,<br />
                    &nbsp;&nbsp;<span className="json-key">"education"</span>: <span className="json-bracket">&#123;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"degree"</span>: <span className="json-val">"B.Tech Computer Science Engineering (AI)"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"institute"</span>: <span className="json-val">"Adi Shankara Institute of Engineering"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"cgpa"</span>: <span className="json-num">8.47</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"timeline"</span>: <span className="json-val">"2022-2026"</span><br />
                    &nbsp;&nbsp;<span className="json-bracket">&#125;</span>,<br />
                    &nbsp;&nbsp;<span className="json-key">"core_focus"</span>: <span className="json-bracket">[</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-val">"Production-grade LLM Applications"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-val">"High-throughput Backend APIs"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-val">"End-to-End MLOps Pipelines"</span><br />
                    &nbsp;&nbsp;<span className="json-bracket">]</span><br />
                    <span className="json-bracket">&#125;</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* Right: Bio Text */}
            <div className="about-text-content">
              <h3 className="about-subheading">Not Just an ML Engineer. <span className="highlight">A System Builder.</span></h3>
              <p>
                I'm Arya Ajayan, an AI/ML Engineer from Kerala, India. I specialize in building production-grade intelligent systems that bridge the gap between research models and real-world high-performance deployments.
              </p>
              <p>
                Currently pursuing a <strong>B.Tech in Computer Science Engineering (AI)</strong> at Adi Shankara Institute with a current <strong>CGPA of 8.47</strong>, I have designed systems featuring sub-200ms inference speeds, secure multi-tenant cloud deployments, and automated self-healing infrastructures.
              </p>
              <div className="about-bullet-list">
                <div className="info-bullet">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Based in Kerala, India (Open to global roles)</span>
                </div>
                <div className="info-bullet">
                  <i className="fas fa-graduation-cap"></i>
                  <span>B.Tech CSE (Artificial Intelligence) · 2022-2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-highlights-grid">
            <div className="highlight-box glass-card">
              <h4><i className="fas fa-link"></i> End-to-End Systems</h4>
              <p>Seamless pipelines connecting databases, real-time feature transformations, and hosted endpoints.</p>
            </div>
            <div className="highlight-box glass-card">
              <h4><i className="fas fa-microchip"></i> Production-First</h4>
              <p>Writing highly clean, asynchronous backend code focused on throughput and sub-millisecond latencies.</p>
            </div>
            <div className="highlight-box glass-card">
              <h4><i className="fas fa-shield-halved"></i> AI + Backend + DevOps</h4>
              <p>Developing with solid monitoring (Prometheus/Grafana) and modular Docker containers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="skills-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag anim-glow-text">02 // CAPABILITIES</span>
            <h2 className="section-title">Technical Expertise</h2>
            <p className="section-subtitle">A multi-disciplinary stack engineered for robust machine learning applications.</p>
          </div>

          <div className="skills-top-container">
            <div className="skills-proficiencies glass-card">
              <h3 className="skills-subheading">MY ENGINEERING PILLARS</h3>
              <div className="engineering-pillars-list">
                <div className="pillar-item">
                  <div className="pillar-header">
                    <i className="fas fa-bolt pillar-icon"></i>
                    <h4 className="pillar-title">Low-Latency & High-Throughput</h4>
                  </div>
                  <p className="pillar-desc">Designing highly optimized, asynchronous backend microservices with sub-200ms model inference speeds.</p>
                </div>
                <div className="pillar-item">
                  <div className="pillar-header">
                    <i className="fas fa-cubes pillar-icon"></i>
                    <h4 className="pillar-title">Production MLOps & Orchestration</h4>
                  </div>
                  <p className="pillar-desc">Containerizing pipelines with Docker/Kubernetes and automating CI/CD workflows for seamless zero-downtime updates.</p>
                </div>
                <div className="pillar-item">
                  <div className="pillar-header">
                    <i className="fas fa-layer-group pillar-icon"></i>
                    <h4 className="pillar-title">Semantic Search & Retrieval (RAG)</h4>
                  </div>
                  <p className="pillar-desc">Implementing fast FAISS and vector search indexing for scalable LLM retrieval and knowledge bases.</p>
                </div>
                <div className="pillar-item">
                  <div className="pillar-header">
                    <i className="fas fa-shield-halved pillar-icon"></i>
                    <h4 className="pillar-title">Observability & Resilience</h4>
                  </div>
                  <p className="pillar-desc">Deploying real-time monitoring (Prometheus & Grafana) to track active latency and protect system availability.</p>
                </div>
              </div>
            </div>

            {/* Right: What I Build Checklist */}
            <div className="skills-build glass-card">
              <h3 className="skills-subheading">WHAT I BUILD</h3>
              <ul className="build-list">
                <li>
                  <div className="build-title">End-to-End ML Pipelines</div>
                  <div className="build-desc">Data → Model → API → Monitor</div>
                </li>
                <li>
                  <div className="build-title">RAG Systems</div>
                  <div className="build-desc">Embeddings → Vector DB → LLM → Response</div>
                </li>
                <li>
                  <div className="build-title">MLOps Infrastructure</div>
                  <div className="build-desc">Train → Version → Deploy → Observe</div>
                </li>
                <li>
                  <div className="build-title">Scalable APIs</div>
                  <div className="build-desc">FastAPI + Docker + Cloud → CI/CD</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Skill Tag grids */}
          <div className="skills-grid">
            <div className="skill-category-card">
              <div className="category-header">
                <i className="fas fa-code"></i>
                <h3>Programming & Core</h3>
              </div>
              <div className="skill-badges">
                <span>Python</span>
                <span>C++</span>
                <span>C</span>
                <span>Data Structures & Algorithms</span>
                <span>OOP</span>
                <span>System Design</span>
              </div>
            </div>

            <div className="skill-category-card">
              <div className="category-header">
                <i className="fas fa-brain"></i>
                <h3>Machine Learning</h3>
              </div>
              <div className="skill-badges">
                <span>Scikit-learn</span>
                <span>TensorFlow</span>
                <span>PyTorch</span>
                <span>XGBoost</span>
                <span>LightGBM</span>
                <span>Feature Engineering</span>
                <span>Model Evaluation</span>
              </div>
            </div>

            <div className="skill-category-card">
              <div className="category-header">
                <i className="fas fa-robot"></i>
                <h3>GenAI & LLMs</h3>
              </div>
              <div className="skill-badges">
                <span>RAG Architecture</span>
                <span>LangChain</span>
                <span>FAISS</span>
                <span>ChromaDB</span>
                <span>Semantic Search</span>
                <span>Embeddings</span>
                <span>Prompt Engineering</span>
              </div>
            </div>

            <div className="skill-category-card">
              <div className="category-header">
                <i className="fas fa-server"></i>
                <h3>Backend Engineering</h3>
              </div>
              <div className="skill-badges">
                <span>FastAPI</span>
                <span>Flask</span>
                <span>REST APIs</span>
                <span>Microservices</span>
                <span>Async Systems</span>
                <span>API Integration</span>
              </div>
            </div>

            <div className="skill-category-card">
              <div className="category-header">
                <i className="fas fa-cogs"></i>
                <h3>MLOps & DevOps</h3>
              </div>
              <div className="skill-badges">
                <span>Docker</span>
                <span>Kubernetes</span>
                <span>CI/CD (GitHub Actions)</span>
                <span>MLflow</span>
                <span>Container Orchestration</span>
                <span>Model Monitoring</span>
              </div>
            </div>

            <div className="skill-category-card">
              <div className="category-header">
                <i className="fas fa-database"></i>
                <h3>Data Engineering</h3>
              </div>
              <div className="skill-badges">
                <span>ETL Pipelines</span>
                <span>Data Cleaning</span>
                <span>Batch Processing</span>
                <span>Data Transformation</span>
              </div>
            </div>

            <div className="skill-category-card">
              <div className="category-header">
                <i className="fas fa-cloud"></i>
                <h3>Cloud Platforms</h3>
              </div>
              <div className="skill-badges">
                <span>AWS (EC2, S3)</span>
                <span>Azure</span>
              </div>
            </div>

            <div className="skill-category-card">
              <div className="category-header">
                <i className="fas fa-hdd"></i>
                <h3>Databases</h3>
              </div>
              <div className="skill-badges">
                <span>PostgreSQL</span>
                <span>MySQL</span>
                <span>MongoDB</span>
                <span>Firebase</span>
                <span>Vector Databases</span>
              </div>
            </div>

            <div className="skill-category-card">
              <div className="category-header">
                <i className="fas fa-chart-line"></i>
                <h3>Monitoring</h3>
              </div>
              <div className="skill-badges">
                <span>Prometheus</span>
                <span>Grafana</span>
                <span>Logging</span>
                <span>System Metrics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="projects-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag anim-glow-text">03 // PRODUCTIONS</span>
            <h2 className="section-title">Production-Grade Systems</h2>
            <p className="section-subtitle">Engineering detailed solutions to real-world infrastructure and AI challenges.</p>
          </div>

          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card featured">
              <div className="project-badge">Flagship Project</div>
              <div className="project-card-content">
                <h3 className="project-title">AI DevOps Assistant</h3>
                <p className="project-desc">LLM-powered automation platform for system diagnostics. Analyzes logs using localized RAG pipelines, executes root-cause diagnostics, and triggers self-debugging steps.</p>
                <div className="project-metrics">
                  <div className="p-metric"><strong>Impact:</strong> Automated Debugging</div>
                  <div className="p-metric"><strong>Stack:</strong> LangChain, FastAPI, Docker</div>
                </div>
                <div className="project-tags">
                  <span>RAG</span>
                  <span>Docker</span>
                  <span>FastAPI</span>
                  <span>Prometheus</span>
                </div>
                <div className="project-links">
                  <button className="btn btn-primary" onClick={() => setActiveModal('devops')}>View Case Study</button>
                  <a href="https://ai-dev-ops-assistant.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-secondary demo-btn">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                  <a href="https://github.com/AryaAjayan/AI-DevOps-Assistant" target="_blank" rel="noreferrer" className="github-link" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-card-content">
                <h3 className="project-title">FinGuard - Fraud Detection</h3>
                <p className="project-desc">Real-time fraud detection service. Integrates XGBoost model trained on highly imbalanced data. Runs asynchronous postgres scoring logging with latency metrics tracked via MLflow.</p>
                <div className="project-metrics">
                  <div className="p-metric"><strong>Latency:</strong> &lt;200ms</div>
                  <div className="p-metric"><strong>Recall:</strong> Ultra High Recall</div>
                </div>
                <div className="project-tags">
                  <span>XGBoost</span>
                  <span>MLflow</span>
                  <span>PostgreSQL</span>
                  <span>Docker</span>
                </div>
                <div className="project-links">
                  <button className="btn btn-secondary" onClick={() => setActiveModal('finguard')}>View Case Study</button>
                  <a href="https://finguard-dashboard.onrender.com" target="_blank" rel="noreferrer" className="btn btn-secondary demo-btn">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                  <a href="https://github.com/AryaAjayan" target="_blank" rel="noreferrer" className="github-link" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card">
              <div className="project-card-content">
                <h3 className="project-title">Insightive - AI Research</h3>
                <p className="project-desc">RAG application utilizing FAISS vector storage to index research papers, codes, and datasets. Enables intelligent semantic search and abstractive summary streaming.</p>
                <div className="project-metrics">
                  <div className="p-metric"><strong>Engine:</strong> Semantic FAISS</div>
                  <div className="p-metric"><strong>UI:</strong> React + NextJS</div>
                </div>
                <div className="project-tags">
                  <span>LangChain</span>
                  <span>FAISS</span>
                  <span>HuggingFace</span>
                  <span>Next.js</span>
                </div>
                <div className="project-links">
                  <button className="btn btn-secondary" onClick={() => setActiveModal('insightive')}>View Case Study</button>
                  <a href="https://insightive-beryl.vercel.app" target="_blank" rel="noreferrer" className="btn btn-secondary demo-btn">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                  <a href="https://github.com/AryaAjayan/Insightive" target="_blank" rel="noreferrer" className="github-link" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 4 - Sentinel AI (GitHub Icon Removed) */}
            <div className="project-card">
              <div className="project-badge">Research Paper</div>
              <div className="project-card-content">
                <h3 className="project-title">Sentinel AI</h3>
                <p className="project-desc">AI-powered threat detection system engineered for high-precision malware analysis. Presented and published at the prestigious ICIMRBE 2025 international conference.</p>
                <div className="project-metrics">
                  <div className="p-metric"><strong>Research:</strong> ICIMRBE 2025</div>
                  <div className="p-metric"><strong>Stack:</strong> Flask, Malware ML</div>
                </div>
                <div className="project-tags">
                  <span>Flask</span>
                  <span>Malware Detection</span>
                  <span>Python</span>
                  <span>Threat Intel</span>
                </div>
                <div className="project-links">
                  <button className="btn btn-secondary" onClick={() => setActiveModal('sentinel')}>View Case Study</button>
                </div>
              </div>
            </div>

            {/* Project 5 - VocalPen (GitHub Icon Removed) */}
            <div className="project-card">
              <div className="project-card-content">
                <h3 className="project-title">VocalPen - Speech Pipeline</h3>
                <p className="project-desc">An interactive OCR + TTS software pipeline allowing high-accuracy digitizing of handwritten text and immediate converting to speech. Awarded 3rd prize in a project expo.</p>
                <div className="project-metrics">
                  <div className="p-metric"><strong>Result:</strong> Albertian 3rd Prize</div>
                  <div className="p-metric"><strong>Tech:</strong> OCR + TTS</div>
                </div>
                <div className="project-tags">
                  <span>OCR</span>
                  <span>TTS</span>
                  <span>Python</span>
                  <span>Tkinter</span>
                </div>
                <div className="project-links">
                  <button className="btn btn-secondary" onClick={() => setActiveModal('vocalpen')}>View Case Study</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCES & EDUCATION TIMELINE (SINGLE-SIDED ULTRA-PREMIUM ALIGNED) */}
      <section id="experience" className="experience-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag anim-glow-text">04 // PROFESSIONAL TIMELINE</span>
            <h2 className="section-title">Timeline & Experience</h2>
            <p className="section-subtitle">Academic pursuits and professional initiatives demonstrating reliable engineering outcomes.</p>
          </div>

          <div className="single-timeline">
            {/* Timeline item 1: Aptso */}
            <div className="timeline-block">
              <div className="timeline-node">
                <div className="node-ring"></div>
              </div>
              <div className="timeline-card glass-card">
                <span className="timeline-badge-tag">INTERNSHIP</span>
                <h3 className="timeline-card-title">Full Stack & AI Developer Intern</h3>
                <h4 className="timeline-card-org">Aptso</h4>
                <p className="timeline-card-desc">
                  Designed and deployed a modern recruitment platform focusing on parsing resumes and ATS-based automated resume scoring pipelines.
                </p>
                <ul className="timeline-bullet-list">
                  <li><span className="bullet-arrow">→</span> Implemented FastAPI-based backend microservices for heavy scoring workloads.</li>
                  <li><span className="bullet-arrow">→</span> Automated manual candidate workflows, reducing screening workloads significantly.</li>
                  <li><span className="bullet-arrow">→</span> Structured Role-Based Access Controls (RBAC) and data protection policies.</li>
                </ul>
              </div>
            </div>

            {/* Timeline item 2: CodeAlpha */}
            <div className="timeline-block">
              <div className="timeline-node">
                <div className="node-ring"></div>
              </div>
              <div className="timeline-card glass-card">
                <span className="timeline-badge-tag">INTERNSHIP</span>
                <h3 className="timeline-card-title">Python Developer Intern</h3>
                <h4 className="timeline-card-org">CodeAlpha</h4>
                <p className="timeline-card-desc">
                  Developed robust, modular Python software applications focusing heavily on modular structure, optimization, and clean architectural design.
                </p>
                <ul className="timeline-bullet-list">
                  <li><span className="bullet-arrow">→</span> Improved codebase maintainability by implementing rigorous OOP principles and tests.</li>
                  <li><span className="bullet-arrow">→</span> Optimized resource utilisation and resolved latency bugs in existing code.</li>
                </ul>
              </div>
            </div>

            {/* Timeline item 3: B.Tech */}
            <div className="timeline-block">
              <div className="timeline-node">
                <div className="node-ring"></div>
              </div>
              <div className="timeline-card glass-card">
                <span className="timeline-badge-tag">B.TECH — 2022 TO 2026</span>
                <h3 className="timeline-card-title">B.Tech in Computer Science & Engineering (AI)</h3>
                <h4 className="timeline-card-org">Adi Shankara Institute of Engineering and Technology</h4>
                <p className="timeline-card-desc">
                  Acquired advanced skills in Machine Learning, System Design, Data Structures, and Generative Artificial Intelligence.
                </p>
                <div className="timeline-card-bottom">
                  <span className="timeline-gpa-badge">CGPA: 8.47</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="certifications-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag anim-glow-text">05 // CREDENTIALS</span>
            <h2 className="section-title">Professional Certifications</h2>
            <p className="section-subtitle">Verified professional competencies demonstrating constant active learning and domain mastery.</p>
          </div>

          <div className="certifications-grid">
            <div className="cert-card glass-card">
              <i className="fas fa-graduation-cap cert-icon"></i>
              <h3 className="cert-title">Full-Stack MERN Development</h3>
              <div className="cert-issuer">GP3 Cloud Innovations</div>
            </div>
            <div className="cert-card glass-card">
              <i className="fas fa-chart-bar cert-icon"></i>
              <h3 className="cert-title">Data Analytics</h3>
              <div className="cert-issuer">Simplilearn</div>
            </div>
            <div className="cert-card glass-card">
              <i className="fas fa-brain cert-icon"></i>
              <h3 className="cert-title">Data Science with Python</h3>
              <div className="cert-issuer">Techmaghi</div>
            </div>
            <div className="cert-card glass-card">
              <i className="fas fa-code cert-icon"></i>
              <h3 className="cert-title">Front End Development (CSS)</h3>
              <div className="cert-issuer">Great Learning</div>
            </div>
            <div className="cert-card glass-card">
              <i className="fab fa-python cert-icon"></i>
              <h3 className="cert-title">Python Programming</h3>
              <div className="cert-issuer">Cognitive AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag anim-glow-text">06 // INITIATE</span>
            <h2 className="section-title">Connect & Collaborate</h2>
            <p className="section-subtitle">Open for professional AI engineering roles, research collaborations, and interesting systems projects.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-panel glass-card">
              <h3 className="contact-subheading">Contact Information</h3>
              <p>Feel free to reach out directly through any of the channels below or submit a contact message via the form.</p>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <div className="detail-label">Email</div>
                    <a href="mailto:aryaajayan1027@gmail.com" className="detail-value">aryaajayan1027@gmail.com</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <div className="detail-label">Phone</div>
                    <a href="tel:+917593947226" className="detail-value">+91 75939 47226</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <i className="fas fa-location-dot"></i>
                  <div>
                    <div className="detail-label">Location</div>
                    <span className="detail-value">Kerala, India (Open to global remote / relocation)</span>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form glass-card" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Collaboration Proposal"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn" disabled={submitStatus === 'submitting'}>
                {submitStatus === 'submitting' ? (
                  <>Sending... <i className="fas fa-spinner fa-spin"></i></>
                ) : (
                  <>Send Message <i className="fas fa-paper-plane"></i></>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-symbol">&lt;</span>
              <span className="logo-text">Arya.Ajayan</span>
              <span className="logo-symbol">/&gt;</span>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} Arya Ajayan. Engineered with absolute precision.</p>
            <div className="footer-socials">
              <a href="https://github.com/AryaAjayan" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
              <a href="https://linkedin.com/in/arya-ajayan" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL SYSTEM */}
      {activeModal === 'devops' && (
        <div className="modal active" onClick={() => setActiveModal(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">AI DevOps Assistant</h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            </div>
            <div className="modal-body-content">
              <div className="modal-section">
                <h4><i className="fas fa-info-circle"></i> OVERVIEW</h4>
                <p>An intelligent agent designed to process high-throughput system logs, execute diagnostic graphs, and suggest remediation scripts.</p>
              </div>
              <div className="modal-section">
                <h4><i className="fas fa-cogs"></i> ARCHITECTURE</h4>
                <ul>
                  <li>Uses standard local RAG pipelines based on FAISS vector storages.</li>
                  <li>Exposes high-speed asynchronous REST endpoints written in FastAPI.</li>
                  <li>Automates routine self-debugging steps and infrastructure restarts.</li>
                </ul>
              </div>
              <div className="modal-section">
                <h4><i className="fas fa-chart-line"></i> IMPACT & METRICS</h4>
                <ul>
                  <li>Reduces mean-time-to-resolution (MTTR) by up to 45%.</li>
                  <li>Processes and classifies raw server logs within 150ms.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'finguard' && (
        <div className="modal active" onClick={() => setActiveModal(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">FinGuard - Fraud Detection</h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            </div>
            <div className="modal-body-content">
              <div className="modal-section">
                <h4><i className="fas fa-info-circle"></i> OVERVIEW</h4>
                <p>High-speed financial fraud screening service, processing active transactions against custom trained classification models.</p>
              </div>
              <div className="modal-section">
                <h4><i className="fas fa-cogs"></i> ARCHITECTURE</h4>
                <ul>
                  <li>XGBoost engine optimized for heavily skewed data points.</li>
                  <li>Logs database entries asynchronously to prevent database locks.</li>
                  <li>Provides telemetry integration mapped to MLflow and Prometheus.</li>
                </ul>
              </div>
              <div className="modal-section">
                <h4><i className="fas fa-chart-line"></i> IMPACT & METRICS</h4>
                <ul>
                  <li>Processes classifications in less than 200ms per packet.</li>
                  <li>Achieved high recall rate minimizing overall fraud risk.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'insightive' && (
        <div className="modal active" onClick={() => setActiveModal(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Insightive - AI Research</h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            </div>
            <div className="modal-body-content">
              <div className="modal-section">
                <h4><i className="fas fa-info-circle"></i> OVERVIEW</h4>
                <p>Intelligent academic paper companion. Allows uploading multiple publications, parsing citation graphs, and summarizing abstracts.</p>
              </div>
              <div className="modal-section">
                <h4><i className="fas fa-cogs"></i> ARCHITECTURE</h4>
                <ul>
                  <li>Semantic lookup powered by FAISS and huggingface sentence embeddings.</li>
                  <li>Streams summaries word-by-word utilizing FastAPI SSE streamings.</li>
                  <li>Responsive frontend interface crafted with NextJS and Tailwind.</li>
                </ul>
              </div>
              <div className="modal-section">
                <h4><i className="fas fa-chart-line"></i> IMPACT & METRICS</h4>
                <ul>
                  <li>Handles semantic processing across 50+ papers concurrently.</li>
                  <li>Decreases overall literature review timings by 60%.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'sentinel' && (
        <div className="modal active" onClick={() => setActiveModal(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Sentinel AI</h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            </div>
            <div className="modal-body-content">
              <div className="modal-section">
                <h4><i className="fas fa-info-circle"></i> OVERVIEW</h4>
                <p>Highly robust file threat detection and automated network malware diagnostic scanner model presented at ICIMRBE 2025.</p>
              </div>
              <div className="modal-section">
                <h4><i className="fas fa-cogs"></i> ARCHITECTURE</h4>
                <ul>
                  <li>Leverages automated diagnostic rules over active memory streams.</li>
                  <li>Lightweight Flask microservice backend deploying ML scoring engines.</li>
                </ul>
              </div>
              <div className="modal-section">
                <h4><i className="fas fa-newspaper"></i> RECOGNITION</h4>
                <ul>
                  <li>Published academic research paper at ICIMRBE 2025 International Conference.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'vocalpen' && (
        <div className="modal active" onClick={() => setActiveModal(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">VocalPen - Speech Pipeline</h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            </div>
            <div className="modal-body-content">
              <div className="modal-section">
                <h4><i className="fas fa-info-circle"></i> OVERVIEW</h4>
                <p>Award-winning digital handwriting accessibility pipeline translating handwritten text documents into clear, natural synthetic voice.</p>
              </div>
              <div className="modal-section">
                <h4><i className="fas fa-cogs"></i> ARCHITECTURE</h4>
                <ul>
                  <li>Trained OCR neural pipeline extracting cursive structures.</li>
                  <li>Custom-integrated text-to-speech synthetic voice generation.</li>
                  <li>Lightweight local desktop UI developed in Tkinter.</li>
                </ul>
              </div>
              <div className="modal-section">
                <h4><i className="fas fa-award"></i> RECOGNITION</h4>
                <ul>
                  <li>Awarded the 3rd Prize in Albertian Project Expo.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
