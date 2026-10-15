// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { jobs } from '../../data/experience';
import { SECTIONS } from '../../data/navigation';
import { about, profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { GROUPS, GROUP_ORDER, SKILLS } from '../../data/skills';
import { mailtoHref } from '../../lib/contact';
import { downloadFile, scrollToSection } from '../../lib/dom';
import { triggerOverheat } from '../../lib/events';
import { emitSparks } from '../../lib/sparks';

export const COMMANDS = [
  'help',
  'whoami',
  'about',
  'skills',
  'experience',
  'projects',
  'contact',
  'resume',
  'goto',
  'theme',
  'sparks',
  'forgefetch',
  'ls',
  'cat',
  'echo',
  'date',
  'history',
  'sudo',
  'clear',
  'exit',
];

const HELP = [
  ['help', 'List available commands'],
  ['whoami', 'Who is Chetan?'],
  ['about', 'The short story'],
  ['skills [family]', 'Skills, e.g. "skills backend"'],
  ['experience', 'Heat-treatment log (work history)'],
  ['projects', 'Workshop specimens with links'],
  ['contact', 'Ways to reach me'],
  ['resume', 'Download my résumé (PDF)'],
  ['goto <section>', 'about | skills | experience | projects | forge | contact'],
  ['theme [dark|light]', 'Switch the theme'],
  ['sparks', 'Throw some sparks'],
  ['forgefetch', 'System info, forge edition'],
  ['clear', 'Clear the screen (or Ctrl+L)'],
  ['exit', 'Close the terminal (or Esc)'],
];

export const WELCOME = [
  { text: 'forge-shell 1.0 · React + Tailwind edition 🔥', tone: 'accent' },
  { text: 'Type "help" to list commands. Psst: try "sudo hire-chetan".', tone: 'muted' },
];

const ANVIL_ART = [
  '   ____________________ ',
  '  <______    __________|',
  '         |  |           ',
  '         |  |           ',
  '      ___|__|___        ',
  '     |__________|       ',
];

function forgefetch(theme) {
  const info = [
    ['', 'visitor@chetan.forge'],
    ['', '--------------------'],
    ['Name', profile.name],
    ['Role', profile.role],
    ['Uptime', `${profile.yearsLabel} years in production`],
    ['Core', '.NET 8 · C# · React · Node.js · PostgreSQL'],
    ['Shell', 'React 19 + Tailwind CSS'],
    ['Origin', `B.Tech Metallurgy, ${profile.education.short}`],
    ['Location', profile.location],
    ['Theme', `forge-${theme}`],
  ];
  return info.map(([key, value], index) => ({
    text: `${(ANVIL_ART[index] ?? '').padEnd(25)}  ${key ? `${key.padEnd(9)} ${value}` : value}`,
    tone: index < 2 ? 'accent' : 'plain',
  }));
}

function burstAcrossScreen() {
  const { innerWidth: width, innerHeight: height } = window;
  for (let i = 0; i < 5; i++) {
    window.setTimeout(
      () => emitSparks(width * (0.15 + Math.random() * 0.7), height * (0.3 + Math.random() * 0.5), 34, 1.2),
      i * 140,
    );
  }
}

const skillsBy = (family) => {
  const query = family?.toLowerCase();
  const groups = GROUP_ORDER.filter(
    (group) => !query || group.startsWith(query) || GROUPS[group].label.toLowerCase().startsWith(query),
  );
  if (groups.length === 0) {
    return [{ text: `Unknown family "${family}". Try: ${GROUP_ORDER.join(', ')}`, tone: 'error' }];
  }
  return groups.flatMap((group) => [
    { text: GROUPS[group].label, tone: 'accent' },
    {
      text: `  ${SKILLS.filter((skill) => skill.group === group)
        .map((skill) => skill.name)
        .join(' · ')}`,
    },
  ]);
};

const experienceLines = () =>
  jobs.flatMap((job) => [
    { text: `${job.period.padEnd(20)} ${job.role} @ ${job.company}`, tone: 'accent' },
    ...job.impact.map((impact) => ({ text: `  ▸ ${impact.value} ${impact.label}`, tone: 'muted' })),
  ]);

/**
 * Runs a terminal command.
 * @returns {{ lines?: { text: string, tone?: string, href?: string }[], clear?: boolean, close?: boolean, effect?: () => void }}
 *   `effect` is a side effect; when `close` is set it runs after the terminal has closed.
 */
export function runCommand(input, context) {
  const [raw = '', ...args] = input.trim().split(/\s+/);
  const command = raw.toLowerCase();
  const { email, phone, phoneHref, linkedin, github } = profile.contact;

  switch (command) {
    case '':
      return {};
    case 'help':
      return {
        lines: [
          { text: 'Available commands:', tone: 'accent' },
          ...HELP.map(([name, description]) => ({ text: `  ${name.padEnd(20)} ${description}` })),
          { text: 'Tip: ↑/↓ browse history, Tab autocompletes.', tone: 'muted' },
        ],
      };
    case 'whoami':
      return {
        lines: [
          { text: `${profile.name} · ${profile.role}`, tone: 'accent' },
          { text: `${profile.yearsLabel} years shipping ${profile.stack.join(', ')} in production.` },
          { text: `Currently ${profile.current.title} @ ${profile.current.company}.` },
        ],
      };
    case 'about':
      return { lines: about.paragraphs.map((text) => ({ text })) };
    case 'skills':
      return { lines: skillsBy(args[0]) };
    case 'experience':
    case 'exp':
    case 'work':
      return { lines: experienceLines() };
    case 'projects':
      return {
        lines: projects.flatMap((project) => [
          { text: `${project.specimen}  ${project.name}: ${project.tagline}`, tone: 'accent' },
          { text: `        ${project.repo}`, tone: 'muted', href: project.repo },
        ]),
      };
    case 'contact':
    case 'social':
      return {
        lines: [
          { text: `email     ${email}`, href: `mailto:${email}` },
          { text: `phone     ${phone}`, href: phoneHref },
          { text: `linkedin  ${linkedin}`, href: linkedin },
          { text: `github    ${github}`, href: github },
        ],
      };
    case 'resume':
    case 'cv':
      return {
        lines: [{ text: 'Downloading Chetan_Goyal_Resume.pdf… 📄', tone: 'success' }],
        effect: () => downloadFile(profile.resumeUrl, 'Chetan_Goyal_Resume.pdf'),
      };
    case 'goto':
    case 'cd': {
      const target = (args[0] ?? '').toLowerCase();
      if (!target || target === '~' || target === 'top' || target === '/') {
        return {
          lines: [{ text: 'Back to the top…', tone: 'success' }],
          close: true,
          effect: () => scrollToSection('top'),
        };
      }
      const section = SECTIONS.find((item) => item.id === target || item.label.toLowerCase().startsWith(target));
      if (!section) {
        return {
          lines: [
            { text: `No such section: ${target}. Try: ${SECTIONS.map((item) => item.id).join(', ')}`, tone: 'error' },
          ],
        };
      }
      return {
        lines: [{ text: `Heading to ${section.label}…`, tone: 'success' }],
        close: true,
        effect: () => scrollToSection(section.id),
      };
    }
    case 'theme': {
      const requested = (args[0] ?? '').toLowerCase();
      const next =
        requested === 'light' || requested === 'dark' ? requested : context.theme === 'dark' ? 'light' : 'dark';
      return {
        lines: [
          {
            text:
              next === 'light'
                ? 'Theme: light. The forge has been quenched. ❄'
                : 'Theme: dark. The forge is roaring again. 🔥',
            tone: 'success',
          },
        ],
        effect: () => context.setTheme(next),
      };
    }
    case 'sparks':
      return { lines: [{ text: '*CLANG* ✨', tone: 'accent' }], effect: burstAcrossScreen };
    case 'forgefetch':
    case 'neofetch':
      return { lines: forgefetch(context.theme) };
    case 'ls':
      return { lines: [{ text: 'about.txt  skills.json  experience.log  projects/  resume.pdf  secret.txt' }] };
    case 'cat': {
      const file = (args[0] ?? '').toLowerCase();
      if (file === 'about.txt') return { lines: about.paragraphs.map((text) => ({ text })) };
      if (file === 'skills.json') return { lines: skillsBy() };
      if (file === 'experience.log') return { lines: experienceLines() };
      if (file === 'secret.txt') {
        return { lines: [{ text: '↑ ↑ ↓ ↓ ← → ← → B A  (press it anywhere on the page) 🔥', tone: 'accent' }] };
      }
      if (file === 'resume.pdf')
        return { lines: [{ text: 'That is a binary file. Try "resume" instead.', tone: 'muted' }] };
      if (file.startsWith('projects'))
        return { lines: [{ text: 'cat: projects/: Is a directory. Try "projects".', tone: 'error' }] };
      return { lines: [{ text: `cat: ${args[0] ?? ''}: No such file. Try "ls".`, tone: 'error' }] };
    }
    case 'echo':
      return { lines: [{ text: args.join(' ') }] };
    case 'date':
      return { lines: [{ text: new Date().toString() }] };
    case 'history':
      return {
        lines: context.history.map((entry, index) => ({
          text: `${String(index + 1).padStart(4)}  ${entry}`,
          tone: 'muted',
        })),
      };
    case 'sudo': {
      const request = args.join(' ').toLowerCase();
      if (request === 'hire-chetan' || request === 'hire chetan') {
        return {
          lines: [
            { text: '[sudo] password for visitor: ********', tone: 'muted' },
            { text: '✔ Permission granted. Excellent decision.', tone: 'success' },
            { text: 'Drafting an email to Chetan…' },
          ],
          effect: () => {
            window.location.href = mailtoHref("Let's work together");
          },
        };
      }
      return {
        lines: [
          {
            text: 'visitor is not in the sudoers file. This incident will be reported to the blacksmith. 🔨',
            tone: 'error',
          },
          { text: 'Hint: sudo hire-chetan', tone: 'muted' },
        ],
      };
    }
    case 'rm':
      return { lines: [{ text: 'Nice try. The forge is fireproof. 🔥', tone: 'error' }] };
    case 'coffee':
      return { lines: [{ text: '☕ Brewing the catalyst… done. Productivity +40%.', tone: 'success' }] };
    case 'konami':
    case 'overheat':
      return { lines: [{ text: 'Overheating the forge…', tone: 'accent' }], close: true, effect: triggerOverheat };
    case 'clear':
    case 'cls':
      return { clear: true };
    case 'exit':
    case 'quit':
    case 'q':
      return { close: true };
    default:
      return { lines: [{ text: `command not found: ${raw}. Type "help" for the list.`, tone: 'error' }] };
  }
}
