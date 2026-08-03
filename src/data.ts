// ─── Profile ─────────────────────────────────────────────────────────────────
export const profile = {
  name: 'Arya Ajayan',
  role: 'AI/ML Engineer & Full-Stack Developer',
  location: 'Chalakudy, Kerala, India',
  email: 'aryaajayan1027@gmail.com',
  phone: '+91 7593947226',
  linkedin: 'https://linkedin.com/in/aryaajayan',
  github: 'https://github.com/aryaajayan',
  bio: '2026 B.Tech CSE (Artificial Intelligence) graduate from Adi Shankara Institute of Engineering and Technology, Kalady, Kerala (CGPA 8.53). Currently AI Developer Intern at Jezt Technologies. I build full-stack, production-shaped AI systems — from RAG pipelines to MLOps platforms to computer-vision workbenches — with a focus on measurable performance (latency, accuracy, data integrity), not just working demos.',
  quote:
    'I treat a model as a product only when it carries a number next to it — latency, accuracy, integrity. Demos convince rooms; numbers survive contact with production. That belief shapes how I scope, build, and ship.',
};

// ─── About stats ─────────────────────────────────────────────────────────────
export const stats = [
  { value: '8.53', label: 'B.Tech CGPA' },
  { value: '7',    label: 'Projects shipped' },
  { value: '2',    label: 'Publications' },
  { value: '3',    label: 'Internships' },
];

// ─── Skills ──────────────────────────────────────────────────────────────────
export const skillGroups = [
  {
    category: 'Languages',
    items: [
      { name: 'Python',     icon: 'python' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'SQL',        icon: 'postgresql' },
      { name: 'C',          icon: 'c' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React',        icon: 'react' },
      { name: 'Next.js',      icon: 'nextdotjs' },
      { name: 'React Native', icon: 'react' },
      { name: 'HTML5',        icon: 'html5' },
      { name: 'CSS3',         icon: 'css3' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Flask',   icon: 'flask' },
      { name: 'Django',  icon: 'django' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Fastify', icon: 'fastify' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB',    icon: 'mongodb' },
      { name: 'MySQL',      icon: 'mysql' },
      { name: 'Redis',      icon: 'redis' },
      { name: 'SQLite',     icon: 'sqlite' },
    ],
  },
  {
    category: 'AI/ML Frameworks',
    items: [
      { name: 'LangChain',   icon: 'langchain' },
      { name: 'LangGraph',   icon: 'langchain' },
      { name: 'LlamaIndex',  icon: 'llamaindex' },
      { name: 'FAISS',       icon: 'meta' },
      { name: 'ChromaDB',    icon: 'chromadb' },
      { name: 'Pinecone',    icon: 'pinecone' },
      { name: 'HuggingFace', icon: 'huggingface' },
      { name: 'Ollama',      icon: 'ollama' },
    ],
  },
  {
    category: 'ML / Computer Vision',
    items: [
      { name: 'PyTorch',      icon: 'pytorch' },
      { name: 'TensorFlow',   icon: 'tensorflow' },
      { name: 'Scikit-learn', icon: 'scikitlearn' },
      { name: 'XGBoost',      icon: 'xgboost' },
      { name: 'MLflow',       icon: 'mlflow' },
      { name: 'ResNet-50',    icon: 'pytorch' },
      { name: 'Grad-CAM',     icon: 'pytorch' },
      { name: 'YOLO',         icon: 'pytorch' },
      { name: 'OpenCV',       icon: 'opencv' },
    ],
  },
  {
    category: 'DevOps & Infra',
    items: [
      { name: 'Docker',         icon: 'docker' },
      { name: 'Docker Compose', icon: 'docker' },
      { name: 'Kubernetes',     icon: 'kubernetes' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Prometheus',     icon: 'prometheus' },
      { name: 'Grafana',        icon: 'grafana' },
    ],
  },
  {
    category: 'Auth / Architecture',
    items: [
      { name: 'JWT',           icon: 'jsonwebtokens' },
      { name: 'RBAC',          icon: 'auth0' },
      { name: 'Microservices', icon: 'nestjs' },
      { name: 'REST APIs',     icon: 'openapi' },
    ],
  },
  {
    category: 'AI Coding Tools',
    items: [
      { name: 'Claude Code',    icon: 'anthropic' },
      { name: 'GitHub Copilot', icon: 'githubcopilot' },
      { name: 'Cursor',         icon: 'cursor' },
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export type Project = {
  id: string;
  index: number;
  title: string;
  tagline: string;
  summary: string;
  architecture: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  recognition?: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: 'p1',
    index: 1,
    title: 'Insightive',
    tagline: 'Agentic AI for academic research discovery',
    summary:
      'A full-stack agentic AI platform that automates academic research discovery. It simultaneously queries 15+ academic APIs (IEEE, arXiv, Springer, Semantic Scholar) and processes uploaded PDFs through a RAG pipeline using a local LLM via Ollama to extract structured insights.',
    architecture:
      'FastAPI backend orchestrates parallel multi-source API fan-out, feeds results and parsed PDFs into a LangChain RAG chain backed by FAISS and HuggingFace embeddings, and serves structured insights from a local Ollama LLM. Next.js/TypeScript frontend presents ranked, sourced findings.',
    stack: ['FastAPI', 'Next.js', 'TypeScript', 'LangChain', 'FAISS', 'HuggingFace', 'Ollama'],
    metrics: [
      { value: '+46.7%', label: 'precision over keyword baseline (P@5: 0.44 vs 0.30)' },
      { value: '22.6ms', label: 'retrieval latency' },
    ],
    recognition: 'Published & presented at IIT Palakkad RECCAP 2026',
    github: 'https://github.com/AryaAjayan/Insightive',
    demo: 'https://insightive-beryl.vercel.app',
  },
  {
    id: 'p2',
    index: 2,
    title: 'FinGuard',
    tagline: 'AI-powered personal finance & fraud detection dashboard.',
    summary:
      'Full-stack financial intelligence platform that monitors transactions in real time, flags anomalies using ML-based fraud detection, and provides spending analytics with natural-language insights.',
    architecture:
      'FastAPI ingest → feature engineering pipeline → XGBoost fraud classifier → PostgreSQL → React dashboard with live WebSocket updates.',
    stack: ['Python', 'FastAPI', 'XGBoost', 'PostgreSQL', 'React', 'WebSocket'],
    metrics: [
      { value: '96.4%', label: 'fraud detection precision on test set' },
      { value: '<120ms', label: 'end-to-end transaction scoring latency' },
    ],
    github: 'https://github.com/AryaAjayan/FinGuard',
    demo: 'https://finguard-dashboard.onrender.com',
  },
  {
    id: 'p3',
    index: 3,
    title: 'AI DevOps Assistant',
    tagline: 'LLM-powered infrastructure copilot for engineers.',
    summary:
      'Conversational DevOps assistant that understands natural language commands to query logs, explain errors, generate Dockerfiles, write CI/CD pipelines, and suggest fixes — all within a chat interface.',
    architecture:
      'LangChain agent with tool-calling → Docker/K8s/GitHub Actions APIs → GPT-4 reasoning → FastAPI backend → Next.js chat UI.',
    stack: ['Python', 'LangChain', 'OpenAI', 'Docker', 'Kubernetes', 'FastAPI', 'Next.js'],
    metrics: [
      { value: '78%', label: 'first-attempt success rate on infra tasks' },
      { value: '3×', label: 'faster pipeline setup vs manual approach' },
    ],
    github: 'https://github.com/AryaAjayan/AI-DevOps-Assistant',
    demo: 'https://ai-dev-ops-assistant.vercel.app',
  },
  {
    id: 'p4',
    index: 4,
    title: 'MediScan',
    tagline: 'Explainable AI for medical image diagnosis.',
    summary:
      'Computer-vision workbench for medical image analysis. Classifies chest X-rays and skin lesions using fine-tuned CNNs, and overlays Grad-CAM heatmaps to make model decisions interpretable for clinicians.',
    architecture:
      'PyTorch ResNet-50 fine-tuning → Grad-CAM explainability layer → FastAPI inference server → React viewer with heatmap overlay.',
    stack: ['Python', 'PyTorch', 'ResNet-50', 'Grad-CAM', 'FastAPI', 'React'],
    metrics: [
      { value: '94.1%', label: 'accuracy on chest X-ray classification' },
      { value: '0.91', label: 'AUC-ROC on skin lesion dataset' },
    ],
    github: 'https://github.com/AryaAjayan/MediScan',
    demo: 'https://mediscan-xai.vercel.app',
  },
  {
    id: 'p5',
    index: 5,
    title: 'Eventual AI',
    tagline: 'Multi-agent event planning assistant.',
    summary:
      'Agentic platform that coordinates multiple specialist AI agents — venue scout, budget planner, schedule optimizer — to fully automate event planning from a single natural-language brief.',
    architecture:
      'LangGraph state machine → specialist agents with tool-calling → shared memory store → FastAPI + React UI.',
    stack: ['Python', 'LangGraph', 'LangChain', 'OpenAI', 'FastAPI', 'React'],
    metrics: [
      { value: '4.5×', label: 'faster event planning vs solo-agent baseline' },
      { value: '89%', label: 'user satisfaction rating in beta' },
    ],
    github: 'https://github.com/AryaAjayan/Eventual-AI',
  },
  {
    id: 'p6',
    index: 6,
    title: 'EchoDNA',
    tagline: 'Music DNA analysis & recommendation engine.',
    summary:
      'Audio intelligence platform that extracts acoustic features from songs (tempo, key, timbre, mood), builds a musical "DNA" fingerprint, and recommends similar tracks using vector similarity search.',
    architecture:
      'Librosa audio feature extraction → embedding model → Pinecone vector store → FastAPI recommendation API → React music player UI.',
    stack: ['Python', 'Librosa', 'PyTorch', 'Pinecone', 'FastAPI', 'React'],
    metrics: [
      { value: '91%', label: 'listener satisfaction with recommendations' },
      { value: '<50ms', label: 'nearest-neighbour search latency' },
    ],
    github: 'https://github.com/AryaAjayan/EchoDNA',
  },
  {
    id: 'p7',
    index: 7,
    title: 'VocalPen',
    tagline: 'Voice-to-document AI writer.',
    summary:
      'Speech-to-structured-document platform. Records voice, transcribes via Whisper, then uses an LLM to format into polished reports, emails, or blog posts with one click.',
    architecture:
      'Whisper transcription → GPT-4 document formatter → Next.js editor → Supabase storage → PDF/DOCX export.',
    stack: ['Python', 'Whisper', 'OpenAI', 'Next.js', 'Supabase'],
    metrics: [
      { value: '3rd Prize', label: 'Albertian Expo hackathon' },
      { value: '94%', label: 'transcription accuracy improvement over baseline' },
    ],
    github: 'https://github.com/AryaAjayan/VocalPen',
  },
];


// ─── Experience ───────────────────────────────────────────────────────────────
export const experience = [
  {
    period: 'Jul 2026 — Present',
    role: 'AI Developer Intern',
    org: 'Jezt Technologies',
    orgColor: '#5b6b4a',
    bullets: [
      'Worked with AI/ML models and Large Language Models (LLMs) to support AI-powered product features.',
      'Performed data annotation and preprocessing for YOLO-based object detection models, contributing to training dataset quality and model readiness for computer vision use cases.',
    ],
  },
  {
    period: 'Mar 2025 — May 2025',
    role: 'Full Stack & AI Developer Intern',
    org: 'Aptso Consultancy Services',
    orgColor: '#c4713a',
    bullets: [
      'Developed AI-powered recruitment platform features including ATS-based resume scoring and candidate evaluation workflows. Built scalable FastAPI backend services, REST APIs, RBAC modules, and automated workflows using PostgreSQL to improve system efficiency and reliability.',
      'Reduced candidate screening time by 35%; zero production incidents over the 8-week internship.',
    ],
  },
  {
    period: 'Jul 2025',
    role: 'Python Developer Intern',
    org: 'CodeAlpha',
    orgColor: '#5b6b4a',
    bullets: [
      'Developed multiple Python-based applications involving automation, data processing, user interaction, and logical problem-solving, applying object-oriented programming principles and modular design practices.',
      'Implemented core functionalities, optimized program performance, and enhanced code maintainability through debugging, testing, and structured development methodologies.',
    ],
  },
];

export const education = {
  year: '2022–2026',
  degree: 'B.Tech, Computer Science & Engineering (Artificial Intelligence)',
  school: 'Adi Shankara Institute of Engineering and Technology, Kalady, Kerala',
  cgpa: '8.53',
};

// ─── Publications ────────────────────────────────────────────────────────────
export const publications = [
  { title: 'Insightive',   venue: 'IIT Palakkad RECCAP 2026' },
  { title: 'Sentinel AI',  venue: 'ICIMRBE 2025' },
];

// ─── Achievements ─────────────────────────────────────────────────────────────
export const achievements = [
  '3rd Prize, Albertian Expo — VocalPen',
  'Participant, TINK-HER-HACK 3.0 National-Level Hackathon (TinkerHub)',
  'Participant, AI Robo Innovation Expo',
];

// ─── Certifications ───────────────────────────────────────────────────────────
export const certifications = [
  'Data Science with Python — Techmaghi',
  'Data Analytics — Simplilearn',
  'Full-Stack MERN Development — GP3 Cloud',
  'Front End Development – CSS — Great Learning',
];
