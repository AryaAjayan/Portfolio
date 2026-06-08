# Arya Ajayan — AI/ML Engineering Portfolio

Personal portfolio website for Arya Ajayan, an AI/ML Systems Engineer specializing in production-grade intelligent systems, LLM-powered applications, and end-to-end MLOps pipelines.

Live site: https://animated-ai-ml-portf-zn24.bolt.host

---

## Overview

This is a single-page React application that serves as a professional portfolio. It showcases AI/ML projects, technical skills, internship experience, research publications, and certifications. The portfolio is designed with a dark-mode-first aesthetic featuring an interactive aurora-constellation canvas background, glassmorphic card components, typewriter animation, scroll-reveal transitions, and a fully functional contact form powered by Web3Forms.

---

## Tech Stack

### Frontend Framework

| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI component library and state management |
| Vite | 8.x | Build tool, dev server, and HMR |
| JavaScript (ES Modules) | ES2022+ | Application logic |

### Styling

| Technology | Purpose |
|---|---|
| Vanilla CSS (Custom Properties) | Design system, theming, and all component styles |
| CSS Grid and Flexbox | Responsive layout |
| CSS Custom Properties | Dual-theme (dark/light) token system |
| CSS Animations and Keyframes | Micro-animations, scroll reveals, and glow effects |
| Backdrop Filter (Glassmorphism) | Glass card effect across all major UI components |

### Icons and Fonts

| Resource | Provider | Purpose |
|---|---|---|
| Font Awesome 6 | CDN (cdnjs) | All iconography across the site |
| Inter | Google Fonts | Body text |
| Outfit | Google Fonts | Headings and display text |
| Fira Code | Google Fonts | Monospace elements (section tags, code editor) |

### Tooling and Infrastructure

| Tool | Purpose |
|---|---|
| ESLint | Code linting with react-hooks and react-refresh plugins |
| Vite Plugin React | Fast Refresh and JSX transform via Babel/Oxc |
| Web3Forms API | Contact form backend — no server required |
| Vercel | Deployment and hosting |

---

## Project Structure

```
portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.jsx          # Root component containing all sections and logic
│   ├── App.css          # Component-scoped styles
│   ├── index.css        # Global design system, tokens, and all component styles
│   └── main.jsx         # React entry point
├── index.html           # HTML shell with CDN links for fonts and icons
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
├── eslint.config.js     # ESLint configuration
└── .gitignore
```

---

## Features

### Interactive Background
An HTML5 Canvas renders a dynamic aurora-constellation background. Two soft aurora blobs drift across the canvas using radial gradients. 75 constellation particles are drawn and connected when within proximity. Moving the mouse attracts nearby particles with a gravitational pull effect that smoothly resets when the cursor leaves.

### Dual Theme Support
A dark/light theme toggle persists the user's preference via `localStorage`. All colors, shadows, and backgrounds are defined as CSS custom properties and switch atomically when the `light-theme` class is toggled on the body element.

### Typewriter Animation
The hero section cycles through the titles "AI/ML Engineer", "Backend Engineer", "MLOps Engineer", and "System Builder" using a character-by-character typing and deletion loop implemented with `setTimeout`.

### Scroll Reveal Animations
An `IntersectionObserver` watches all elements with the `scroll-reveal` class and adds an `active` class when they enter the viewport, triggering CSS transitions for opacity and vertical translate.

### Case Study Modals
Each project card opens a detailed case study modal containing the problem statement, engineered solution, system architecture (SVG diagrams), and key performance metrics.

### Contact Form
The contact form posts to the Web3Forms API. Successful submissions clear the form and show a success toast. Network failures fall back to a visual success state to maintain a clean user experience.

---

## Sections

| Section | ID | Description |
|---|---|---|
| Hero | #hero | Name, typewriter role, CTA buttons, social links, and 4 key stat cards |
| About | #about | PROFILE.json code editor card, biography, and core philosophy highlights |
| Skills | #skills | Engineering pillars, what-I-build checklist, and 9 categorized skill badge grids |
| Projects | #projects | 6 production system cards with metrics, tags, live demo links, and case study modals |
| Experience | #experience | Internship timeline and education block |
| Research and Recognition | #achievements | Research publication, awards, and hackathon participation |
| Certifications | #certifications | 5 professional certification badges |
| Contact | #contact | Contact details and a functional email form |

---

## Projects Showcased

**AI DevOps Assistant** — Flagship project. LLM-powered platform using RAG (LangChain + FAISS) to analyze Docker container logs, identify root causes, and automate debugging steps. Stack: FastAPI, LangChain, Docker, Prometheus, Grafana.

**FinGuard** — Real-time fraud detection system. XGBoost classifier trained on imbalanced transaction data using SMOTE. Async PostgreSQL logging, MLflow experiment tracking, sub-200ms inference latency. Stack: XGBoost, MLflow, FastAPI, PostgreSQL, Docker.

**Insightive** — AI research assistant. Semantic search over research papers and datasets using FAISS vector indexing, HuggingFace embeddings, and LangChain. React and Next.js frontend with abstractive summary streaming.

**VocalPen** — Award-winning handwriting-to-speech accessibility system. Camera feed processed through TensorFlow OCR models, converted to audio via TTS pipeline. Awarded 3rd prize at Albertian Expo.

**Sentinel AI** — AI-powered threat detection and file scanning system. Flask API extracts byte-level and entropy features from uploaded scripts and classifies them using anomaly detection models. Research paper presented at ICIMRBE 2025.

**OmniReader** — Multi-format OCR and translation tool. Supports images, PDFs, and handwritten text using EasyOCR. Integrates Google Translate API for multilingual output. Stack: EasyOCR, Google Translate API, Flask, Python.

---

## Skills Covered

**Programming:** Python, C++, C, Data Structures and Algorithms, OOP, System Design

**Machine Learning:** Scikit-learn, TensorFlow, PyTorch, XGBoost, LightGBM, CatBoost, Optuna, SHAP, LIME, Feature Engineering, Model Evaluation

**Generative AI and LLMs:** RAG Pipelines, LangChain, FAISS, ChromaDB, Pinecone, Weaviate, Semantic Search, Embeddings, Prompt Engineering

**Backend and APIs:** FastAPI, Flask, REST APIs, Microservices, Async Systems, API Integration

**MLOps and DevOps:** Docker, Kubernetes, CI/CD with GitHub Actions, MLflow, Container Orchestration, Model Monitoring

**Data Engineering:** ETL Pipelines, Data Cleaning, Batch Processing, Data Transformation

**Cloud:** AWS (EC2, S3), Azure

**Databases:** PostgreSQL, MySQL, MongoDB, Firebase, Vector Databases

**Monitoring:** Prometheus, Grafana, Logging, System Metrics

---

## Experience

**Full Stack and AI Developer Intern — Aptso**
Designed and deployed a recruitment platform with resume parsing, ATS-based automated scoring, FastAPI backend microservices, and role-based access controls.

**Python Developer Intern — CodeAlpha**
Developed modular Python applications with a focus on OOP principles, code maintainability, and performance optimization.

---

## Education

B.Tech in Computer Science and Engineering (Artificial Intelligence)
Adi Shankara Institute of Engineering and Technology
2022 to 2026 — CGPA: 8.47

---

## Research and Recognition

- Research paper "Sentinel AI: AI-Based Threat Detection" presented at ICIMRBE 2025
- 3rd Prize at Albertian Expo for the VocalPen project
- Participant in TINK-HER-HACK 3.0 National Hackathon

---

## Certifications

- Full-Stack MERN Development — GP3 Cloud Innovations
- Data Analytics — Simplilearn
- Data Science with Python — Techmaghi
- Front End Development (CSS) — Great Learning
- Python Programming — Cognitive AI

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
git clone https://github.com/AryaAjayan/Portfolio.git
cd Portfolio
npm install
```

### Development

```bash
npm run dev
```

The dev server starts at `http://localhost:5173` with hot module replacement enabled.

### Build

```bash
npm run build
```

Outputs a production build to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Deployment

The portfolio is deployed to Vercel. Any push to the main branch triggers an automatic deployment via the Vercel GitHub integration.

To deploy manually:

```bash
npm run build
vercel --prod
```

---

## Contact

- Email: aryaajayan1027@gmail.com
- GitHub: https://github.com/AryaAjayan
- LinkedIn: https://linkedin.com/in/arya-ajayan
- Location: Kerala, India
