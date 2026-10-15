// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUp,
  Copy,
  Download,
  Flame,
  Hammer,
  Mail,
  Moon,
  Phone,
  Search,
  Sun,
  Terminal as TerminalIcon,
} from 'lucide-react';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { SECTIONS } from '../../data/navigation';
import { profile } from '../../data/profile';
import { GROUPS, HEAT, SKILLS } from '../../data/skills';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useTheme } from '../../hooks/useTheme';
import { copyText, downloadFile, scrollToSection } from '../../lib/dom';
import { EVENTS, emit, openTerminal, triggerOverheat } from '../../lib/events';
import { toast } from '../../lib/toast';
import { cx } from '../ui/classes';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

/**
 * Command shape: { id, group, label, hint?, keywords?, icon, run, deferred? }.
 * `deferred` commands run after the palette has closed (for actions that move focus or scroll).
 */
export function CommandPalette({ open, onClose }) {
  const pending = useRef(null);

  const runAfterClose = (action) => {
    pending.current = action;
    onClose();
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        const action = pending.current;
        pending.current = null;
        action?.();
      }}
    >
      {open ? <PaletteDialog onClose={onClose} runAfterClose={runAfterClose} /> : null}
    </AnimatePresence>
  );
}

function PaletteDialog({ onClose, runAfterClose }) {
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef(null);
  const listRef = useRef(null);
  useFocusTrap(dialogRef, true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const { email, phone, phoneHref, linkedin, linkedinLabel, github, githubUser } = profile.contact;

  const commands = useMemo(
    () => [
      ...SECTIONS.map((section) => ({
        id: `go-${section.id}`,
        group: 'Navigate',
        label: `Go to ${section.label}`,
        hint: section.hint,
        keywords: section.id,
        icon: <ArrowRight size={16} />,
        run: () => scrollToSection(section.id),
        deferred: true,
      })),
      {
        id: 'go-top',
        group: 'Navigate',
        label: 'Back to top',
        keywords: 'home hero start',
        icon: <ArrowUp size={16} />,
        run: () => scrollToSection('top'),
        deferred: true,
      },
      {
        id: 'theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        hint: theme === 'dark' ? 'Quench the forge' : 'Reheat the forge',
        keywords: 'theme dark light mode',
        icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
        run: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        deferred: true,
      },
      {
        id: 'resume',
        group: 'Actions',
        label: 'Download résumé',
        hint: 'PDF',
        keywords: 'resume cv pdf',
        icon: <Download size={16} />,
        run: () => downloadFile(profile.resumeUrl, 'Chetan_Goyal_Resume.pdf'),
      },
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: email,
        keywords: 'mail contact clipboard',
        icon: <Copy size={16} />,
        run: () => {
          void copyText(email).then((ok) =>
            toast(ok ? { title: 'Email copied to clipboard', tone: 'success', icon: '📋' } : { title: email }),
          );
        },
      },
      {
        id: 'terminal',
        group: 'Actions',
        label: 'Open the terminal',
        hint: 'or press `',
        keywords: 'console shell cli command line easter egg',
        icon: <TerminalIcon size={16} />,
        run: openTerminal,
        deferred: true,
      },
      {
        id: 'anvil',
        group: 'Actions',
        label: 'Strike the anvil',
        hint: 'Forge Wall',
        keywords: 'forge sparks counter guestbook wall',
        icon: <Hammer size={16} />,
        run: () => scrollToSection('forge'),
        deferred: true,
      },
      {
        id: 'overheat',
        group: 'Actions',
        label: 'Overheat the forge',
        hint: 'secret',
        keywords: 'konami fire easter egg secret',
        icon: <Flame size={16} />,
        run: triggerOverheat,
        deferred: true,
      },
      {
        id: 'github',
        group: 'Links',
        label: 'Open GitHub',
        hint: `github.com/${githubUser}`,
        keywords: 'code repos',
        icon: <GithubIcon size={16} />,
        run: () => window.open(github, '_blank', 'noopener'),
      },
      {
        id: 'linkedin',
        group: 'Links',
        label: 'Open LinkedIn',
        hint: linkedinLabel,
        keywords: 'profile network',
        icon: <LinkedinIcon size={16} />,
        run: () => window.open(linkedin, '_blank', 'noopener'),
      },
      {
        id: 'email',
        group: 'Links',
        label: 'Send an email',
        hint: email,
        keywords: 'mail contact',
        icon: <Mail size={16} />,
        run: () => {
          window.location.href = `mailto:${email}`;
        },
      },
      {
        id: 'call',
        group: 'Links',
        label: 'Call Chetan',
        hint: phone,
        keywords: 'phone mobile',
        icon: <Phone size={16} />,
        run: () => {
          window.location.href = phoneHref;
        },
      },
    ],
    [theme, setTheme, email, phone, phoneHref, linkedin, linkedinLabel, github, githubUser],
  );

  const skillCommands = useMemo(
    () =>
      SKILLS.map((skill) => ({
        id: `skill-${skill.number}`,
        group: 'Skills',
        label: skill.name,
        hint: `${GROUPS[skill.group].label} · ${HEAT[skill.heat].label}`,
        keywords: `${skill.symbol} ${skill.group} skill`,
        icon: <span className="font-display text-[0.92rem] leading-none font-extrabold">{skill.symbol}</span>,
        run: () => {
          scrollToSection('skills');
          emit(EVENTS.selectSkill, skill.symbol);
        },
        deferred: true,
      })),
    [],
  );

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return commands;
    return [...commands, ...skillCommands].filter((command) => {
      const haystack = `${command.label} ${command.hint ?? ''} ${command.keywords ?? ''} ${command.group}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [commands, skillCommands, query]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, results]);

  const execute = (command) => {
    if (command.deferred) {
      runAfterClose(command.run);
    } else {
      command.run();
      onClose();
    }
  };

  const onInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const command = results[activeIndex];
      if (command) execute(command);
    }
  };

  const active = results[activeIndex];

  return (
    <motion.div
      className="fixed inset-0 z-100 grid items-start justify-items-center bg-[rgb(8_5_4/0.58)] p-4 pt-[12vh] backdrop-blur-[6px] max-[560px]:pt-[8vh] light:bg-[rgb(60_40_25/0.28)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        className="flex max-h-[min(560px,76vh)] w-[min(640px,100%)] flex-col overflow-hidden rounded-[18px] border border-line-strong bg-surface shadow-[0_40px_100px_-30px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_122_26/0.12)]"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, y: -14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            onClose();
          }
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-[1.1rem] py-4 text-ink-3">
          <Search size={18} aria-hidden="true" />
          <input
            className="min-w-0 flex-1 border-0 bg-transparent text-[1.05rem] text-ink outline-none placeholder:text-ink-3"
            placeholder="Search sections, skills and actions…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={active ? `palette-${active.id}` : undefined}
            aria-label="Search commands"
            autoFocus
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>

        <ul ref={listRef} id="palette-list" className="m-0 flex-1 overflow-y-auto overscroll-contain p-2" role="listbox" aria-label="Commands">
          {results.length === 0 ? (
            <li className="px-4 py-6 text-center text-ink-3" role="presentation">
              Nothing matches “{query}”. Try “skills”, “resume” or “react”.
            </li>
          ) : null}
          {results.map((command, index) => (
            <Fragment key={command.id}>
              {index === 0 || results[index - 1].group !== command.group ? (
                <li
                  className="px-[0.7rem] pt-3 pb-[0.35rem] font-mono text-[0.68rem] leading-none font-semibold tracking-[0.14em] text-ink-3 uppercase"
                  role="presentation"
                >
                  {command.group}
                </li>
              ) : null}
              <li
                id={`palette-${command.id}`}
                className={cx(
                  'flex cursor-pointer items-center gap-3 rounded-[10px] px-[0.7rem] py-[0.6rem]',
                  index === activeIndex ? 'bg-[color-mix(in_oklab,var(--ember)_14%,var(--surface-2))] text-ink' : 'text-ink-2',
                )}
                role="option"
                aria-selected={index === activeIndex}
                onMouseMove={() => setActiveIndex(index)}
                onClick={() => execute(command)}
              >
                <span className="grid size-[30px] flex-none place-items-center rounded-lg bg-surface-2 text-ember-text" aria-hidden="true">
                  {command.icon}
                </span>
                <span className="font-[550] whitespace-nowrap">{command.label}</span>
                {command.hint ? (
                  <span className="ml-auto max-w-[50%] truncate font-mono text-[0.76rem] leading-tight font-medium text-ink-3 max-[560px]:hidden">
                    {command.hint}
                  </span>
                ) : null}
              </li>
            </Fragment>
          ))}
        </ul>

        <div className="flex gap-[1.1rem] border-t border-line px-4 py-[0.7rem] text-[0.76rem] text-ink-3 max-[560px]:hidden" aria-hidden="true">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
