// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { ArrowUp, Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { openPalette, openTerminal } from '../../lib/events';
import { iconBtn } from '../ui/classes';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-[clamp(4rem,9vw,6.5rem)] pb-8">
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-[40%] h-4/5 bg-[radial-gradient(60%_60%_at_50%_100%,rgb(255_90_10/0.22),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="site-container relative grid gap-12">
        <div>
          <p className="font-display text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] font-extrabold text-balance uppercase">
            Thanks for visiting <span className="text-molten">the forge.</span>
          </p>
          <p className="mt-[1.1rem] text-[0.95rem] leading-loose text-ink-2">
            Psst… try{' '}
            <button type="button" className="group rounded-lg" onClick={openPalette}>
              <kbd className="group-hover:border-ember">Ctrl</kbd>&nbsp;<kbd className="group-hover:border-ember">K</kbd>
            </button>
            , the{' '}
            <button
              type="button"
              className="group rounded-lg"
              onClick={openTerminal}
              aria-label="Open the terminal (backtick key)"
            >
              <kbd className="group-hover:border-ember">`</kbd>
            </button>{' '}
            key, or <kbd>↑ ↑ ↓ ↓ ← → ← → B A</kbd>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-[0.88rem] text-ink-3">
            © {YEAR} {profile.name} · Built with React, Tailwind CSS &amp; Motion
          </p>
          <ul className="flex gap-2" role="list">
            <li>
              <a className={iconBtn} href={profile.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
            </li>
            <li>
              <a className={iconBtn} href={profile.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
            </li>
            <li>
              <a className={iconBtn} href={`mailto:${profile.contact.email}`} aria-label="Email">
                <Mail size={18} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a className={iconBtn} href="#top" aria-label="Back to top">
                <ArrowUp size={18} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
