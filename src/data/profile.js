// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { CAREER_START, yearsSince } from '../lib/time';

const years = yearsSince(CAREER_START);

export const profile = {
  name: 'Chetan Goyal',
  symbol: 'Cg',
  elementName: 'Chetanium',
  role: 'Full Stack Developer',
  stack: ['.NET', 'React', 'PostgreSQL'],
  years,
  yearsLabel: `${years}+`,
  intro: `${years}+ years turning raw requirements into production-ready software, from .NET 8 background services and secure REST APIs to polished React front-ends.`,
  typewriter: [
    'scalable web apps.',
    'secure REST APIs.',
    'real-time features.',
    'AI-powered workflows.',
    'system integrations.',
  ],
  current: { title: 'Full Stack Developer', company: 'QuickFlora' },
  location: 'India',
  contact: {
    email: 'goyalchetan118@gmail.com',
    phone: '+91 63770 25905',
    phoneHref: 'tel:+916377025905',
    linkedin: 'https://www.linkedin.com/in/chetan-goyal-skc/',
    linkedinLabel: 'in/chetan-goyal-skc',
    github: 'https://github.com/chetan-skc',
    githubUser: 'chetan-skc',
  },
  resumeUrl: `${import.meta.env.BASE_URL}Chetan_Goyal_Resume.pdf`,
  education: {
    degree: 'B.Tech, Metallurgical & Materials Engineering',
    school: 'Malaviya National Institute of Technology',
    short: 'MNIT Jaipur',
    place: 'Jaipur, Rajasthan',
    period: '2019 – 2023',
  },
  stats: [
    { value: years, decimals: years % 1 ? 1 : 0, suffix: '+', label: 'Years shipping production code' },
    { value: 40, suffix: '+', label: 'Secure REST APIs designed' },
    { value: 2000, suffix: '+', label: 'Users on an IMS I led' },
    { value: 40, suffix: '%', label: 'Less manual reconciliation' },
  ],
};

export const about = {
  paragraphs: [
    'Before I wrote software, I studied how materials are made stronger. At MNIT Jaipur I earned a B.Tech in Metallurgical & Materials Engineering: phase diagrams, heat treatment and the idea that structure decides performance.',
    'Along the way I fell for a different kind of engineering. I practised data structures and algorithms in C++ and built side projects with Node.js, Express and React.',
    `Since July 2023 I have shipped production software end to end: secure .NET APIs, React front-ends, background services that keep orders in sync, and real-time and AI-powered features with SignalR and Microsoft Semantic Kernel.`,
    'Metallurgy still shapes how I build: understand the structure, control the process, and test until it holds under load.',
  ],
  process: [
    { when: '2019', title: 'Ore', text: 'Joined MNIT Jaipur for Metallurgical & Materials Engineering.' },
    { when: '2019 – 23', title: 'Smelting', text: 'Discovered code: DSA in C++, side projects in Node.js and React.' },
    { when: '2023 →', title: 'Alloy', text: 'Full-stack engineer shipping .NET + React in production.' },
  ],
  datasheet: [
    { key: 'Grade', value: 'Full-Stack · .NET / React' },
    { key: 'Heat no.', value: 'JUL-2023 (career start)' },
    { key: 'Education', value: 'B.Tech, Metallurgical & Materials Engg. · MNIT Jaipur' },
    { key: 'Current', value: 'Full Stack Developer @ QuickFlora' },
    { key: 'Core alloy', value: '.NET 8 · C# · React · Node.js · PostgreSQL' },
    { key: 'Specialties', value: 'REST APIs · Integrations · Real-time · AI' },
    { key: 'Based in', value: 'India' },
  ],
  composition: [
    { label: 'Backend', value: 45, group: 'backend' },
    { label: 'Frontend', value: 30, group: 'frontend' },
    { label: 'Data', value: 15, group: 'database' },
    { label: 'Cloud & DevOps', value: 10, group: 'cloud' },
  ],
};
