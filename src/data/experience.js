// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]

/**
 * @typedef {object} Job
 * @property {string} id
 * @property {string} stage Heat-treatment stage name shown on the card.
 * @property {string} stageNo
 * @property {string} stageTemp
 * @property {string} stageNote
 * @property {string} role
 * @property {string} company
 * @property {string} [focus]
 * @property {string} period
 * @property {boolean} [current]
 * @property {string[]} bullets Wrap text in `**double asterisks**` to highlight a metric or keyword.
 * @property {{ value: string, label: string }[]} impact
 * @property {string[]} tech
 */

/** @type {Job[]} */
export const jobs = [
  {
    id: 'quickflora',
    stage: 'Tempering',
    stageNo: 'III',
    stageTemp: '≈ 400 °C',
    stageNote:
      'Reheat hardened steel to trade brittleness for toughness: resilient systems that hold up in production.',
    role: 'Full Stack Developer',
    company: 'QuickFlora',
    focus: 'POS & E-commerce Integrations',
    period: 'Sep 2025 – Present',
    current: true,
    bullets: [
      'Built a **BigCommerce → QuickFlora POS** integration on **.NET 8 Background Services**: an idempotent order-sync engine with configurable polling that cut manual reconciliation by **40%**.',
      'Developed scalable backend services with **C#, LINQ, EF Core and PostgreSQL**, adding **Serilog** structured logging and automated log retention for better observability and stability.',
    ],
    impact: [
      { value: '−40%', label: 'manual reconciliation' },
      { value: 'Idempotent', label: 'order-sync engine' },
    ],
    tech: ['.NET 8', 'C#', 'EF Core', 'LINQ', 'PostgreSQL', 'Serilog', 'BigCommerce'],
  },
  {
    id: 'sew',
    stage: 'Quenching',
    stageNo: 'II',
    stageTemp: '850 → 25 °C',
    stageNote: 'Rapid cooling locks in hardness: a short, intense stint shipping for real clients.',
    role: 'Product Engineer',
    company: 'Smart Energy Water',
    period: 'Jul 2025 – Sep 2025',
    bullets: [
      'Enhanced the base product with reusable components and APIs using **React.js** and **.NET Core** across **PostgreSQL, SQL Server and MongoDB**.',
      'Delivered end-to-end solutions for **2 client projects**: frontend, backend and task schedulers for automated API integrations.',
    ],
    impact: [
      { value: '2', label: 'client projects delivered' },
      { value: '3', label: 'databases in production' },
    ],
    tech: ['React', '.NET Core', 'PostgreSQL', 'SQL Server', 'MongoDB'],
  },
  {
    id: 'qburst',
    stage: 'Annealing',
    stageNo: 'I',
    stageTemp: '≈ 800 °C',
    stageNote:
      'Heat, then cool slowly to relieve stress and build ductility: two formative years leading end-to-end builds.',
    role: 'Software Engineer',
    company: 'QBurst',
    period: 'Jul 2023 – Jun 2025',
    bullets: [
      'Led end-to-end development of a scalable **Inventory Management System** with React.js, .NET Core and PostgreSQL, reducing manual workflows by **35%** and supporting **2,000+ users**.',
      'Designed and optimized **40+ secure REST APIs** in C# and LINQ with **JWT auth, Google Sign-In and role-based access control**, improving data-processing efficiency by **30%**.',
      'Delivered real-time and AI features: **SignalR chat**, **FCM push notifications** and **LLM-powered feedback summarization** with Microsoft Semantic Kernel, deployed via **Docker on Azure**.',
    ],
    impact: [
      { value: '2,000+', label: 'users supported' },
      { value: '40+', label: 'secure REST APIs' },
      { value: '−35%', label: 'manual workflows' },
      { value: '+30%', label: 'processing efficiency' },
    ],
    tech: ['React', '.NET Core', 'C#', 'PostgreSQL', 'SignalR', 'Semantic Kernel', 'FCM', 'Docker', 'Azure'],
  },
];
