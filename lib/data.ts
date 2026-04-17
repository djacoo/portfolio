// ─── Site ─────────────────────────────────────────────────────────────────────
export const SITE_URL = "https://jacopo-parretti-portfolio.vercel.app";

// ─── Personal ────────────────────────────────────────────────────────────────
export const personal = {
  name: "Jacopo Parretti",
  title: "AI Engineer & Developer",
  tagline: "MSc Artificial Intelligence",
  description:
    "Machine learning and software engineering, currently focused on language models. Pursuing an MSc in Artificial Intelligence at the University of Verona.",
  email: "jacopo.parretti2003@gmail.com",
  emailUni: "jacopo.parretti@studenti.univr.it",
  github: "https://github.com/djacoo",
  linkedin: "https://www.linkedin.com/in/jacopo-parretti-3a0454221/",
  instagram: "https://instagram.com/jacopoparrettii",
  location: "Verona, Italy",
};

// ─── About ───────────────────────────────────────────────────────────────────
export const about = {
  paragraphs: [
    "I came to computer science through biology. A bachelor's in Bioinformatics gave me the habits that carry over to machine learning — messy data, statistical reasoning, reproducibility — and left me more interested in the models than the organisms. I'm now doing an MSc in Artificial Intelligence, focused on language models and deep learning.",
    "My work covers information retrieval, supervised classification, LLM fine-tuning, and reinforcement learning. I care about understanding why a system works, not only that it does, and about writing code that holds up outside the notebook.",
    "Alongside the MSc I work as a data analyst, building dashboards and reporting pipelines for retail operations. I also contribute to open-source on GitHub — mostly ML and developer tooling.",
  ],
  interests: [
    "Large Language Models",
    "Bioinformatics",
    "Reinforcement Learning",
    "NLP",
    "Statistical ML",
    "Open Source",
  ],
};

// ─── Education ───────────────────────────────────────────────────────────────
export const education = [
  {
    degree: "MSc Artificial Intelligence",
    institution: "Università degli Studi di Verona",
    location: "Verona, Italy",
    period: "2025 – Present",
    description:
      "Advanced studies in machine learning, probabilistic AI, and deep learning. Research oriented toward large language models, neural architecture design, and efficient inference.",
    highlights: ["Machine Learning", "Deep Learning", "NLP", "Probabilistic AI", "LLMs", "Neural Architectures"],
    status: "In Progress" as const,
  },
  {
    degree: "BSc Bioinformatics",
    institution: "Università degli Studi di Verona",
    location: "Verona, Italy",
    period: "2021 – 2024",
    description:
      "Three-year degree combining computational biology, statistics, and software engineering. Strong foundation in algorithms, genomic data analysis, and scientific computing.",
    highlights: ["Algorithms", "Genomics", "Statistical Analysis", "Scientific Computing", "Python", "R"],
    status: "Completed" as const,
    grade: "99 / 110",
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────
export const projects = [
  {
    index: "01",
    title: "Comparative Architectures for LLM-Based Email Triage",
    description:
      "Evaluates three routing strategies — frozen zero-shot prompting, LoRA fine-tuning, and DistilBERT classification — for automatic assignment of customer-support emails across five departments. LoRA reaches 70.4% accuracy with under 1% trainable parameters; DistilBERT peaks at 76.6%.",
    tags: ["Python", "PyTorch", "LoRA", "DistilBERT", "HuggingFace", "Jupyter"],
    github: "https://github.com/djacoo/nlp-llm-project",
    accent: "rgba(167,139,250,0.9)",
  },
  {
    index: "02",
    title: "Semantic Document Retrieval on the Reuters Corpus",
    description:
      "TF-IDF vectorisation and cosine similarity pipeline for large-scale document matching across ~10,800 Reuters news articles. Accepts raw text or file input and returns ranked results with configurable percentile thresholds — no stopword removal, operating on raw token distributions.",
    tags: ["Python", "NLTK", "scikit-learn", "TF-IDF", "Cosine Similarity"],
    github: "https://github.com/djacoo/nlp-project",
    accent: "rgba(0,210,230,0.9)",
  },
  {
    index: "03",
    title: "Multi-Class Nutritional Grade Prediction via Classical ML",
    description:
      "Five-way Nutri-Score classification (A–E) trained on 250,000 Open Food Facts products. Benchmarks Logistic Regression, KNN, SVM, Random Forest, and XGBoost across a full ML pipeline — imputation, outlier removal, PCA, stratified splits. SVM tops validation at 83.5% accuracy.",
    tags: ["Python", "scikit-learn", "XGBoost", "PCA", "Open Food Facts"],
    github: "https://github.com/djacoo/ml-nutriscore-prediction",
    accent: "rgba(52,211,153,0.9)",
  },
  {
    index: "04",
    title: "A Decision Procedure for Equality, Lists, and Arrays",
    description:
      "Satisfiability solver implementing congruence closure for the quantifier-free first-order theories T_E, T_cons, and T_A. Follows Bradley & Manna (2007), uses the largest-ccpar heuristic, and supports SMT-LIB 2.0. 571 JUnit tests, all passing.",
    tags: ["Java", "SMT Solving", "Congruence Closure", "Formal Verification", "JUnit"],
    github: "https://github.com/djacoo/equality-lists-arrays-solver",
    accent: "rgba(96,165,250,0.9)",
  },
  {
    index: "05",
    title: "Demand Response Optimisation via Deep Reinforcement Learning",
    description:
      "RL agents trained in the CityLearn environment for smart building energy management and real-time grid demand response. Explores actor-critic and Q-learning policies for multi-zone HVAC scheduling under dynamic electricity pricing.",
    tags: ["Python", "CityLearn", "Stable-Baselines3", "Gymnasium", "Jupyter"],
    github: "https://github.com/djacoo/CityLearnRL",
    accent: "rgba(251,146,60,0.9)",
  },
  {
    index: "06",
    title: "Computational Methods in Genomic Sequence Analysis",
    description:
      "Collection of bioinformatics algorithms covering pairwise sequence alignment, phylogenetic tree construction, and genomic data processing pipelines. Developed as coursework for the BSc Bioinformatics programme at the University of Verona.",
    tags: ["Python", "BioPython", "Sequence Alignment", "Phylogenetics", "R"],
    github: "https://github.com/djacoo/Bioinformatica",
    accent: "rgba(45,212,191,0.9)",
  },
];

// ─── Tech Stack ───────────────────────────────────────────────────────────────
export const techStack = [
  // Languages
  { name: "Python", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "Go", category: "language" },
  { name: "Rust", category: "language" },
  // ML / AI
  { name: "PyTorch", category: "ml" },
  { name: "TensorFlow", category: "ml" },
  { name: "JAX", category: "ml" },
  { name: "Hugging Face", category: "ml" },
  { name: "scikit-learn", category: "ml" },
  // Web
  { name: "Next.js", category: "web" },
  { name: "React", category: "web" },
  { name: "Tailwind CSS", category: "web" },
  { name: "FastAPI", category: "web" },
  { name: "Node.js", category: "web" },
  // Infra / Tools
  { name: "Docker", category: "infra" },
  { name: "Kubernetes", category: "infra" },
  { name: "PostgreSQL", category: "infra" },
  { name: "Redis", category: "infra" },
  { name: "Git", category: "infra" },
  { name: "AWS", category: "infra" },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────
export const timeline = [
  {
    period: "2025 – Present",
    role: "MSc Artificial Intelligence",
    organization: "Università degli Studi di Verona",
    type: "education" as const,
    description:
      "Advanced studies in machine learning, probabilistic AI, and deep learning. Research focus on large language models and neural architectures.",
  },
  {
    period: "2023 – Present",
    role: "Sales Assistant & Data Analyst",
    organization: "JD Sports & Fashion",
    type: "work" as const,
    description:
      "Retail floor work alongside internal analytics — trend reporting, KPI dashboards, and inventory insight.",
  },
  {
    period: "2022 – Present",
    role: "Open-Source Contributor",
    organization: "GitHub",
    type: "personal" as const,
    description:
      "Contributions across ML and developer tooling repositories — bug fixes, feature PRs, and documentation.",
  },
  {
    period: "2022 – 2023",
    role: "Sales Assistant",
    organization: "Foot Locker",
    type: "work" as const,
    description:
      "First job. High-traffic retail floor — customer service, shift coordination, and learning how to work under pressure.",
  },
  {
    period: "2021 – 2024",
    role: "BSc Bioinformatics",
    organization: "Università degli Studi di Verona",
    type: "education" as const,
    description:
      "Three-year degree spanning biology, computer science, and statistics. Strong foundation in algorithms, data analysis, and scientific computing.",
  },
];

// ─── Degrees ──────────────────────────────────────────────────────────────────
export const degrees = [
  {
    title: "Master of Science",
    field: "Artificial Intelligence",
    institution: "Università degli Studi di Verona",
    location: "Verona, Italy",
    period: "2025 – Present",
    status: "In Progress" as const,
  },
  {
    title: "Bachelor of Science",
    field: "Bioinformatics",
    institution: "Università degli Studi di Verona",
    location: "Verona, Italy",
    period: "2021 – 2024",
    status: "Completed" as const,
    grade: "99 / 110",
  },
];
