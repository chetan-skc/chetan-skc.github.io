// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { AnimatePresence, motion } from 'motion/react';
import { Command, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SECTIONS, SECTION_IDS } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useTheme } from '../../hooks/useTheme';
import { openPalette } from '../../lib/events';
import { cx, iconBtn } from '../ui/classes';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useFocusTrap(menuRef, menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const onToggleTheme = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-60 h-(--nav-h) border-b transition-[background-color,border-color] duration-300',
        scrolled ? 'border-line bg-glass backdrop-blur-[14px] backdrop-saturate-140' : 'border-transparent',
      )}
    >
      <div className="site-container flex h-full items-center gap-5">
        <a href="#top" className="group inline-flex items-center gap-[0.7rem] no-underline" aria-label="Chetan Goyal, back to top">
          <span
            className="relative grid size-10 place-items-center rounded-[10px] bg-(image:--molten) pt-1 font-display text-[1.3rem] leading-none font-black text-on-molten shadow-[0_6px_20px_-8px_var(--ember-glow)] transition-transform duration-300 ease-spring group-hover:scale-[1.06] group-hover:-rotate-6"
            aria-hidden="true"
          >
            <span className="absolute top-[3px] left-1 font-mono text-[0.5rem] leading-none font-bold opacity-75">
              {profile.yearsLabel}
            </span>
            {profile.symbol}
          </span>
          <span className="font-display text-[1.35rem] font-extrabold tracking-[0.05em] uppercase max-[560px]:hidden">
            {profile.name}
          </span>
        </a>

        <nav aria-label="Primary" className="ml-auto max-[1100px]:hidden">
          <ul role="list" className="flex gap-[0.15rem]">
            {SECTIONS.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={cx(
                      'relative inline-block rounded-full px-[0.8rem] py-2 text-[0.93rem] font-[550] no-underline transition-colors hover:text-ink',
                      isActive ? 'text-ink' : 'text-ink-2',
                    )}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-ember"
                        className="absolute bottom-0.5 left-1/2 -ml-[9px] h-[3px] w-[18px] rounded-full bg-(image:--molten) shadow-[0_0_10px_1px_var(--ember-glow)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    ) : null}
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-2 flex items-center gap-2 max-[1100px]:ml-auto">
          <button
            type="button"
            className="inline-flex h-[42px] items-center gap-2 rounded-xl border border-line bg-surface/70 pr-[0.6rem] pl-[0.85rem] text-[0.88rem] text-ink-2 transition-colors hover:border-ember hover:text-ink max-[560px]:w-[42px] max-[560px]:justify-center max-[560px]:p-0"
            onClick={openPalette}
            aria-label="Open command palette"
            aria-keyshortcuts="Control+K Meta+K"
          >
            <Command size={15} aria-hidden="true" />
            <span className="max-[560px]:hidden">Search</span>
            <kbd className="max-[560px]:hidden">{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <button
            type="button"
            className={iconBtn}
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Quench the forge (light mode)' : 'Reheat the forge (dark mode)'}
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <div className="hidden max-[1100px]:block">
            <button
              type="button"
              className={iconBtn}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            className="fixed inset-0 z-70 flex flex-col overflow-y-auto bg-base/95 px-[clamp(1.25rem,6vw,3rem)] pt-[calc(var(--nav-h)+1.5rem)] pb-8 backdrop-blur-[16px]"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              className={cx(iconBtn, 'absolute top-[13px] right-[clamp(1.1rem,4vw,2.5rem)]')}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              autoFocus
            >
              <X size={22} aria-hidden="true" />
            </button>
            <ul role="list" className="grid gap-[0.2rem]">
              {SECTIONS.map((section, index) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-[clamp(2.4rem,11vw,3.6rem)] leading-none font-extrabold text-ink uppercase no-underline hover:text-ember-text"
                  >
                    <span className="font-mono text-[0.85rem] leading-none font-medium text-ember-text">0{index + 1}</span>
                    {section.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex gap-[0.6rem] pt-8">
              <a className={iconBtn} href={profile.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a className={iconBtn} href={profile.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a className={iconBtn} href={`mailto:${profile.contact.email}`} aria-label="Email">
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
