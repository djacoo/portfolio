type Lang = "EN" | "IT";

const VIOLET = "#7c3aed";
const DARK   = "#1a1a2e";
const MID    = "#4b5563";
const LIGHT  = "#9ca3af";
const RULE   = "#e5e7eb";

// ─── Primitive helpers ───────────────────────────────────────────────────────

function sectionTitle(text: string) {
  return [
    {
      text: text.toUpperCase(),
      style: "sectionTitle",
      margin: [0, 18, 0, 2] as [number, number, number, number],
      keepWithNext: true,
    },
    {
      canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 0.5, lineColor: RULE }],
      keepWithNext: true,
    },
    { text: "", margin: [0, 0, 0, 6] as [number, number, number, number], keepWithNext: true },
  ];
}

function entryHeader(title: string, right: string) {
  return {
    columns: [
      { text: title, style: "entryTitle", width: "*" },
      { text: right, style: "entryDate",  width: "auto" },
    ],
    columnGap: 8,
    margin: [0, 0, 0, 1] as [number, number, number, number],
  };
}

function entrySubtitle(text: string) {
  return { text, style: "entrySub", margin: [0, 0, 0, 3] as [number, number, number, number] };
}

function entryBody(text: string) {
  return { text, style: "entryBody", margin: [0, 0, 0, 8] as [number, number, number, number] };
}

function tagLine(tags: string[]) {
  return {
    text: tags.join("  ·  "),
    style: "tags",
    margin: [0, 0, 0, 8] as [number, number, number, number],
  };
}

function skillRow(label: string, items: string) {
  return {
    columns: [
      { text: label, style: "skillLabel", width: 90 },
      { text: items,  style: "entryBody",  width: "*" },
    ],
    columnGap: 8,
    margin: [0, 0, 0, 4] as [number, number, number, number],
  };
}

// ─── Composite helpers ───────────────────────────────────────────────────────

/** Wraps a CV entry (header + optional subtitle/body/tags) in an unbreakable block. */
function entry(opts: {
  title: string;
  date: string;
  subtitle?: string;
  body?: string;
  tags?: string[];
}) {
  const items: object[] = [entryHeader(opts.title, opts.date)];
  if (opts.subtitle) items.push(entrySubtitle(opts.subtitle));
  if (opts.body)     items.push(entryBody(opts.body));
  if (opts.tags)     items.push(tagLine(opts.tags));
  return { stack: items, unbreakable: true };
}

/** Wraps a short, atomic section (skills, languages, personal, notice) so it never breaks. */
function atomicSection(title: string, ...rows: object[]) {
  return { stack: [...sectionTitle(title), ...rows], unbreakable: true };
}

// ─── Builders ────────────────────────────────────────────────────────────────

function buildEN() {
  return {
    pageSize: "A4",
    pageMargins: [56, 48, 56, 48] as [number, number, number, number],
    defaultStyle: { font: "Roboto", fontSize: 9.5, color: DARK, lineHeight: 1.45 },
    styles: {
      name:         { fontSize: 26, bold: true, color: DARK, characterSpacing: -0.5 },
      headline:     { fontSize: 10, color: VIOLET, characterSpacing: 0.5 },
      contact:      { fontSize: 8.5, color: MID },
      sectionTitle: { fontSize: 7.5, bold: true, color: VIOLET, characterSpacing: 1.4, margin: [0, 0, 0, 3] },
      entryTitle:   { fontSize: 10, bold: true, color: DARK },
      entryDate:    { fontSize: 8.5, color: LIGHT, italics: true },
      entrySub:     { fontSize: 9,  color: MID, italics: true },
      entryBody:    { fontSize: 9,  color: MID, lineHeight: 1.5 },
      tags:         { fontSize: 8,  color: VIOLET },
      skillLabel:   { fontSize: 9,  bold: true, color: DARK },
      notice:       { fontSize: 8,  color: LIGHT, italics: true, lineHeight: 1.5 },
    },
    content: [
      // ── Header ──────────────────────────────────────────────────────────
      { text: "Jacopo Parretti", style: "name" },
      { text: "AI Engineer & Developer", style: "headline", margin: [0, 2, 0, 6] as [number, number, number, number] },
      {
        columns: [
          { text: "jacopo.parretti2003@gmail.com", style: "contact" },
          { text: "github.com/djacoo", style: "contact", alignment: "center" },
          { text: "Verona, Italy", style: "contact", alignment: "right" },
        ],
      },
      { text: "linkedin.com/in/jacopo-parretti-3a0454221", style: "contact", margin: [0, 1, 0, 0] as [number, number, number, number] },
      { canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 1, lineColor: VIOLET }], margin: [0, 8, 0, 0] as [number, number, number, number] },

      // ── Summary ─────────────────────────────────────────────────────────
      ...sectionTitle("Summary"),
      {
        stack: [entryBody(
          "MSc Artificial Intelligence student at the University of Verona with a BSc in Bioinformatics (99/110). " +
          "I specialise in machine learning systems — from LLM fine-tuning and neural architecture design to information retrieval and reinforcement learning. " +
          "I care about rigour: understanding not just what works, but why, and writing code that survives contact with reality. " +
          "Alongside my studies I work as a data analyst, delivering dashboards and reporting pipelines for retail operations."
        )],
        unbreakable: true,
      },

      // ── Education ───────────────────────────────────────────────────────
      ...sectionTitle("Education"),
      entry({
        title: "MSc Artificial Intelligence",
        date:  "2025 – Present",
        subtitle: "Università degli Studi di Verona · Verona, Italy",
        body: "Advanced studies in machine learning, probabilistic AI, and deep learning. Research focus on large language models, neural architecture design, and efficient inference.",
        tags: ["Machine Learning", "Deep Learning", "NLP", "Probabilistic AI", "LLMs", "Neural Architectures"],
      }),
      entry({
        title: "BSc Bioinformatics",
        date:  "2021 – 2024",
        subtitle: "Università degli Studi di Verona · Verona, Italy  ·  Final grade: 99/110",
        body: "Three-year degree at the intersection of computational biology, statistics, and software engineering. Strong foundation in algorithms, genomic data analysis, and scientific computing.",
        tags: ["Algorithms", "Genomics", "Statistical Analysis", "Scientific Computing", "Python", "R"],
      }),

      // ── Experience ──────────────────────────────────────────────────────
      ...sectionTitle("Experience"),
      entry({
        title: "Sales Assistant & Data Analyst",
        date:  "2023 – Present",
        subtitle: "JD Sports & Fashion · Verona, Italy",
        body: "Dual role combining customer-facing retail operations with internal data analysis — trend reporting, KPI dashboards, and inventory insight for store management.",
      }),
      entry({
        title: "Open-Source Contributor",
        date:  "2022 – Present",
        subtitle: "GitHub · Remote",
        body: "Ongoing contributions to ML and developer tooling ecosystems — bug fixes, feature PRs, and documentation across public repositories in Python and TypeScript.",
      }),
      entry({
        title: "Sales Assistant",
        date:  "2022 – 2023",
        subtitle: "Foot Locker · Verona, Italy",
        body: "Customer service and team coordination in a high-traffic retail environment. Built strong interpersonal and communication skills.",
      }),

      // ── Projects ────────────────────────────────────────────────────────
      ...sectionTitle("Selected Projects"),
      entry({
        title: "Comparative Architectures for LLM-Based Email Triage",
        date:  "2024",
        body:  "Evaluated three routing strategies — frozen zero-shot prompting, LoRA fine-tuning, and DistilBERT classification — for automatic assignment of customer-support emails. LoRA reached 70.4% accuracy with under 1% trainable parameters; DistilBERT peaked at 76.6%.",
        tags:  ["Python", "PyTorch", "LoRA", "DistilBERT", "HuggingFace"],
      }),
      entry({
        title: "Semantic Document Retrieval on the Reuters Corpus",
        date:  "2024",
        body:  "TF-IDF vectorisation and cosine similarity pipeline for large-scale document matching across ~10,800 Reuters news articles. Accepts raw text or file input and returns ranked results with configurable percentile thresholds.",
        tags:  ["Python", "NLTK", "scikit-learn", "TF-IDF", "Cosine Similarity"],
      }),
      entry({
        title: "Multi-Class Nutritional Grade Prediction via Classical ML",
        date:  "2023",
        body:  "Five-way Nutri-Score classification (A–E) on 250,000 Open Food Facts products. Benchmarked Logistic Regression, KNN, SVM, Random Forest, and XGBoost across a full ML pipeline. SVM achieved 83.5% validation accuracy.",
        tags:  ["Python", "scikit-learn", "XGBoost", "PCA"],
      }),
      entry({
        title: "Decision Procedure for Equality, Lists, and Arrays",
        date:  "2023",
        body:  "Production-ready satisfiability solver implementing congruence closure for quantifier-free first-order theories T_E, T_cons, and T_A. Full SMT-LIB 2.0 support. 571 JUnit tests, all passing.",
        tags:  ["Java", "SMT Solving", "Congruence Closure", "Formal Verification"],
      }),

      // ── Technical Skills ─────────────────────────────────────────────────
      atomicSection("Technical Skills",
        skillRow("Languages", "Python · TypeScript · Go · Rust · Java · R"),
        skillRow("ML / AI",   "PyTorch · TensorFlow · JAX · Hugging Face · scikit-learn · Stable-Baselines3"),
        skillRow("Web",       "Next.js · React · FastAPI · Node.js · Tailwind CSS"),
        skillRow("Infra",     "Docker · Kubernetes · PostgreSQL · Redis · AWS · Git"),
      ),

      // ── Languages ───────────────────────────────────────────────────────
      atomicSection("Languages",
        skillRow("Italian", "Native"),
        skillRow("English", "Fluent (C1)"),
      ),

      // ── Personal ────────────────────────────────────────────────────────
      atomicSection("Personal",
        skillRow("Date of birth", "26 August 2003"),
        skillRow("Nationality",   "Italian"),
      ),

      // ── GDPR / Data Processing Notice ───────────────────────────────────
      atomicSection("Data Processing Notice",
        {
          text:
            "I hereby authorise the processing of personal data contained in this curriculum vitae in accordance with " +
            "EU Regulation 2016/679 (General Data Protection Regulation — GDPR) and the Italian Personal Data " +
            "Protection Code (Legislative Decree No. 196 of 30 June 2003, as amended by Legislative Decree " +
            "No. 101 of 10 August 2018).",
          style: "notice",
          margin: [0, 0, 0, 0] as [number, number, number, number],
        },
      ),
    ],
  };
}

function buildIT() {
  return {
    pageSize: "A4",
    pageMargins: [56, 48, 56, 48] as [number, number, number, number],
    defaultStyle: { font: "Roboto", fontSize: 9.5, color: DARK, lineHeight: 1.45 },
    styles: {
      name:         { fontSize: 26, bold: true, color: DARK, characterSpacing: -0.5 },
      headline:     { fontSize: 10, color: VIOLET, characterSpacing: 0.5 },
      contact:      { fontSize: 8.5, color: MID },
      sectionTitle: { fontSize: 7.5, bold: true, color: VIOLET, characterSpacing: 1.4, margin: [0, 0, 0, 3] },
      entryTitle:   { fontSize: 10, bold: true, color: DARK },
      entryDate:    { fontSize: 8.5, color: LIGHT, italics: true },
      entrySub:     { fontSize: 9,  color: MID, italics: true },
      entryBody:    { fontSize: 9,  color: MID, lineHeight: 1.5 },
      tags:         { fontSize: 8,  color: VIOLET },
      skillLabel:   { fontSize: 9,  bold: true, color: DARK },
      notice:       { fontSize: 8,  color: LIGHT, italics: true, lineHeight: 1.5 },
    },
    content: [
      // ── Intestazione ────────────────────────────────────────────────────
      { text: "Jacopo Parretti", style: "name" },
      { text: "Ingegnere AI e Sviluppatore", style: "headline", margin: [0, 2, 0, 6] as [number, number, number, number] },
      {
        columns: [
          { text: "jacopo.parretti2003@gmail.com", style: "contact" },
          { text: "github.com/djacoo", style: "contact", alignment: "center" },
          { text: "Verona, Italia", style: "contact", alignment: "right" },
        ],
      },
      { text: "linkedin.com/in/jacopo-parretti-3a0454221", style: "contact", margin: [0, 1, 0, 0] as [number, number, number, number] },
      { canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 1, lineColor: VIOLET }], margin: [0, 8, 0, 0] as [number, number, number, number] },

      // ── Profilo ─────────────────────────────────────────────────────────
      ...sectionTitle("Profilo"),
      {
        stack: [entryBody(
          "Studente di Laurea Magistrale in Intelligenza Artificiale presso l'Università di Verona, con Laurea Triennale in Bioinformatica (99/110). " +
          "Mi specializzo in sistemi di machine learning — dal fine-tuning di LLM e progettazione di architetture neurali " +
          "all'information retrieval e al reinforcement learning. " +
          "Accanto agli studi lavoro come data analyst, sviluppando dashboard e pipeline di reporting per operazioni retail."
        )],
        unbreakable: true,
      },

      // ── Formazione ──────────────────────────────────────────────────────
      ...sectionTitle("Formazione"),
      entry({
        title: "Laurea Magistrale in Intelligenza Artificiale",
        date:  "2025 – in corso",
        subtitle: "Università degli Studi di Verona · Verona, Italia",
        body: "Studi avanzati in machine learning, AI probabilistica e deep learning. Ricerca focalizzata su modelli linguistici di grandi dimensioni, progettazione di architetture neurali e inferenza efficiente.",
        tags: ["Machine Learning", "Deep Learning", "NLP", "AI Probabilistica", "LLM", "Architetture Neurali"],
      }),
      entry({
        title: "Laurea Triennale in Bioinformatica",
        date:  "2021 – 2024",
        subtitle: "Università degli Studi di Verona · Verona, Italia  ·  Voto finale: 99/110",
        body: "Corso triennale all'intersezione tra biologia computazionale, statistica e ingegneria del software. Solide basi in algoritmi, analisi di dati genomici e calcolo scientifico.",
        tags: ["Algoritmi", "Genomica", "Analisi Statistica", "Calcolo Scientifico", "Python", "R"],
      }),

      // ── Esperienza ──────────────────────────────────────────────────────
      ...sectionTitle("Esperienza"),
      entry({
        title: "Assistente alle Vendite & Analista Dati",
        date:  "2023 – in corso",
        subtitle: "JD Sports & Fashion · Verona, Italia",
        body: "Doppio ruolo che combina attività di vendita al pubblico con analisi dati interna — report su trend, dashboard KPI e analisi dell'inventario per la direzione del punto vendita.",
      }),
      entry({
        title: "Contributore Open-Source",
        date:  "2022 – in corso",
        subtitle: "GitHub · Remoto",
        body: "Contributi continuativi a ecosistemi ML e strumenti per sviluppatori — bug fix, PR di nuove funzionalità e documentazione in repository pubblici Python e TypeScript.",
      }),
      entry({
        title: "Assistente alle Vendite",
        date:  "2022 – 2023",
        subtitle: "Foot Locker · Verona, Italia",
        body: "Servizio clienti e coordinamento del team in un ambiente retail ad alto traffico. Sviluppo di solide competenze relazionali e comunicative.",
      }),

      // ── Progetti ────────────────────────────────────────────────────────
      ...sectionTitle("Progetti Selezionati"),
      entry({
        title: "Architetture Comparative per Triage Email con LLM",
        date:  "2024",
        body:  "Valutazione di tre strategie di routing — prompting zero-shot, fine-tuning LoRA e classificazione DistilBERT — per l'assegnazione automatica di email di supporto clienti. LoRA ha raggiunto il 70,4% di accuratezza con meno dell'1% di parametri addestrabili; DistilBERT al 76,6%.",
        tags:  ["Python", "PyTorch", "LoRA", "DistilBERT", "HuggingFace"],
      }),
      entry({
        title: "Recupero Semantico di Documenti sul Corpus Reuters",
        date:  "2024",
        body:  "Pipeline TF-IDF e cosine similarity per il matching di documenti su ~10.800 articoli Reuters. Accetta testo libero o file in input e restituisce risultati classificati con soglie percentili configurabili.",
        tags:  ["Python", "NLTK", "scikit-learn", "TF-IDF", "Cosine Similarity"],
      }),
      entry({
        title: "Predizione Multi-Classe del Grado Nutrizionale con ML Classico",
        date:  "2023",
        body:  "Classificazione Nutri-Score (A–E) su 250.000 prodotti Open Food Facts. Benchmark di Regressione Logistica, KNN, SVM, Random Forest e XGBoost. SVM ha raggiunto l'83,5% di accuratezza in validazione.",
        tags:  ["Python", "scikit-learn", "XGBoost", "PCA"],
      }),
      entry({
        title: "Procedura di Decisione per Uguaglianza, Liste e Array",
        date:  "2023",
        body:  "Solver di soddisfacibilità per teorie del primo ordine quantifier-free T_E, T_cons e T_A. Supporto completo SMT-LIB 2.0. 571 test JUnit, tutti superati.",
        tags:  ["Java", "SMT Solving", "Congruence Closure", "Verifica Formale"],
      }),

      // ── Competenze Tecniche ──────────────────────────────────────────────
      atomicSection("Competenze Tecniche",
        skillRow("Linguaggi", "Python · TypeScript · Go · Rust · Java · R"),
        skillRow("ML / AI",   "PyTorch · TensorFlow · JAX · Hugging Face · scikit-learn · Stable-Baselines3"),
        skillRow("Web",       "Next.js · React · FastAPI · Node.js · Tailwind CSS"),
        skillRow("Infra",     "Docker · Kubernetes · PostgreSQL · Redis · AWS · Git"),
      ),

      // ── Lingue ──────────────────────────────────────────────────────────
      atomicSection("Lingue",
        skillRow("Italiano", "Madrelingua"),
        skillRow("Inglese",  "Fluente (C1)"),
      ),

      // ── Dati Personali ──────────────────────────────────────────────────
      atomicSection("Dati Personali",
        skillRow("Data di nascita", "26 agosto 2003"),
        skillRow("Nazionalità",     "Italiana"),
      ),

      // ── Autorizzazione al trattamento dei dati personali ────────────────
      atomicSection("Autorizzazione al Trattamento dei Dati Personali",
        {
          text:
            "Autorizzo il trattamento dei miei dati personali presenti nel curriculum vitae ai sensi del " +
            "D.Lgs. 196 del 30 giugno 2003 (Codice in materia di protezione dei dati personali), " +
            "come modificato dal D.Lgs. 101 del 10 agosto 2018, e del Regolamento UE n. 2016/679 " +
            "(General Data Protection Regulation — GDPR).",
          style: "notice",
          margin: [0, 0, 0, 0] as [number, number, number, number],
        },
      ),
    ],
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function downloadCV(lang: Lang) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfMakeModule = (await import("pdfmake/build/pdfmake")) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfFontsModule = (await import("pdfmake/build/vfs_fonts")) as any;

  // pdfmake UMD module may land on .default in webpack/ESM contexts
  const pdfMake = pdfMakeModule.default ?? pdfMakeModule;
  // vfs_fonts exports the font map directly as its module object
  const vfs = pdfFontsModule.default ?? pdfFontsModule;
  pdfMake.vfs = vfs;

  const docDef = lang === "EN" ? buildEN() : buildIT();
  const filename = lang === "EN" ? "Jacopo_Parretti_CV_EN.pdf" : "Jacopo_Parretti_CV_IT.pdf";

  pdfMake.createPdf(docDef).download(filename);
}
