// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown, Download, Mail, Phone } from 'lucide-react';
import { profile } from '../../data/profile';
import { button, cx, iconBtn } from '../ui/classes';
import { CountUp } from '../ui/CountUp';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { ElementCard } from './ElementCard';
import { HeroSparks } from './HeroSparks';
import { Typewriter } from './Typewriter';

const EASE = [0.22, 1, 0.36, 1];

// Stats strip dividers: 4 columns on desktop, a 2 x 2 grid on phones.
const STAT_BORDERS = [
  '',
  'border-l',
  'max-[760px]:border-t min-[761px]:border-l',
  'border-l max-[760px]:border-t',
];

export function Hero() {
  const reduced = useReducedMotion();
  const rise = (delay) => ({
    initial: { opacity: 0, y: reduced ? 0 : 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden pt-[calc(var(--nav-h)+clamp(1rem,3vh,2rem))] pb-5"
      aria-labelledby="hero-title"
      tabIndex={-1}
    >
      <div
        className="absolute inset-0 -z-2 bg-(image:--hero-glow) after:absolute after:inset-0 after:bg-[radial-gradient(var(--lattice)_1.2px,transparent_1.4px)] after:bg-size-[28px_28px] after:mask-[radial-gradient(80%_70%_at_50%_40%,#000_30%,transparent_85%)]"
        aria-hidden="true"
      />
      <HeroSparks />

      <div className="site-container grid items-center gap-[clamp(2rem,5vw,4rem)] min-[981px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
        <div>
          <motion.p
            className="inline-flex items-center gap-[0.6rem] rounded-full border border-line-strong bg-glass py-[0.45rem] pr-[0.95rem] pl-3 text-[0.88rem] text-ink-2 backdrop-blur-[8px]"
            {...rise(0.05)}
          >
            <span className="size-[9px] animate-pulse-dot rounded-full bg-[#22c55e]" aria-hidden="true" />
            Currently forging at <strong className="font-[650] text-ink">{profile.current.company}</strong>
          </motion.p>

          <h1
            id="hero-title"
            className="mt-[1.2rem] flex flex-wrap gap-x-[0.18em] font-display text-[clamp(4.2rem,11vw,8.6rem)] leading-[0.84] font-black tracking-[-0.005em] uppercase"
          >
            <motion.span className="inline-block" {...rise(0.12)}>
              Chetan
            </motion.span>{' '}
            <motion.span
              className="inline-block animate-molten pr-[0.04em] text-molten drop-shadow-[0_8px_30px_rgb(255_90_10/0.35)]"
              {...rise(0.2)}
            >
              Goyal
            </motion.span>
          </h1>

          <motion.p className="mt-6 text-[clamp(1.1rem,2vw,1.35rem)] font-[650]" {...rise(0.3)}>
            {profile.role}
            <span className="mx-[0.6rem] text-ember-text" aria-hidden="true">
              /
            </span>
            <span className="font-[550] text-ink-2">{profile.stack.join(' · ')}</span>
          </motion.p>

          <motion.p
            className="mt-2 font-display text-[clamp(1.45rem,2.8vw,2rem)] leading-[1.1] font-bold tracking-[0.03em] text-ink-2 uppercase"
            {...rise(0.38)}
          >
            Forged in metallurgy. <em className="text-ember-text not-italic">Tempered in code.</em>
          </motion.p>

          <motion.p
            className="mt-5 min-h-[1.7em] font-mono text-[clamp(0.92rem,1.5vw,1.05rem)] text-ink-2"
            {...rise(0.46)}
          >
            <span className="text-ember-text" aria-hidden="true">
              &gt;
            </span>{' '}
            I build <Typewriter words={profile.typewriter} />
          </motion.p>

          <motion.p className="mt-[0.9rem] max-w-[56ch] text-ink-2" {...rise(0.52)}>
            {profile.intro}
          </motion.p>

          <motion.div className="mt-[1.7rem] flex flex-wrap items-center gap-[0.8rem]" {...rise(0.6)}>
            <a className={button('molten')} href="#projects">
              See my work <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className={button('ghost')} href={profile.resumeUrl} download>
              Download résumé <Download size={17} aria-hidden="true" />
            </a>
            <ul className="ml-[0.4rem] flex gap-2" role="list" aria-label="Profiles and contact">
              <li>
                <a className={iconBtn} href={profile.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  <GithubIcon size={18} />
                </a>
              </li>
              <li>
                <a className={iconBtn} href={profile.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                  <LinkedinIcon size={18} />
                </a>
              </li>
              <li>
                <a className={iconBtn} href={`mailto:${profile.contact.email}`} aria-label={`Email ${profile.contact.email}`}>
                  <Mail size={18} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a className={iconBtn} href={profile.contact.phoneHref} aria-label={`Call ${profile.contact.phone}`}>
                  <Phone size={18} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="grid place-items-center max-[980px]:mt-4"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          <ElementCard />
        </motion.div>
      </div>

      <div className="site-container">
        <motion.dl
          className="mt-[clamp(1.75rem,4.5vh,3.25rem)] grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-glass backdrop-blur-[10px] min-[761px]:grid-cols-4"
          {...rise(0.8)}
        >
          {profile.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cx('flex flex-col-reverse justify-end gap-[0.35rem] border-line px-[1.4rem] py-[1.15rem]', STAT_BORDERS[index])}
            >
              <dt className="text-[0.86rem] leading-[1.35] text-ink-2">{stat.label}</dt>
              <dd className="font-display text-[clamp(2.2rem,4vw,3rem)] leading-none font-extrabold tabular-nums">
                <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <a
        href="#about"
        className="mt-7 inline-flex flex-col items-center gap-[0.3rem] self-center font-mono text-[0.7rem] leading-none font-medium tracking-[0.16em] text-ink-3 uppercase no-underline hover:text-ember-text"
      >
        Scroll to stoke the forge
        <ChevronDown size={18} className="animate-bob" aria-hidden="true" />
      </a>
    </section>
  );
}
