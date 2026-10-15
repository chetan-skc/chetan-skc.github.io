// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { motion, useReducedMotion } from 'motion/react';
import { about, profile } from '../../data/profile';
import { cx, monoLabel, section } from '../ui/classes';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

const CERTIFIED_YEAR = new Date().getFullYear();

function PhaseIcon({ phase }) {
  if (phase === 0) {
    return (
      <svg viewBox="0 0 48 48" className="size-11" aria-hidden="true">
        <path
          d="M8 30 14 14l13-5 13 9 1 14-12 9-15-2Z"
          className="fill-[color-mix(in_oklab,var(--steel)_55%,var(--surface-3))] stroke-line-strong"
        />
        <circle cx="20" cy="22" r="2.2" className="fill-ember" />
        <circle cx="29" cy="30" r="1.8" className="fill-ember" />
        <circle cx="32" cy="19" r="1.4" className="fill-ember" />
      </svg>
    );
  }
  if (phase === 1) {
    return (
      <svg viewBox="0 0 48 48" className="size-11" aria-hidden="true">
        <defs>
          <linearGradient id="phase-melt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff1cf" />
            <stop offset="0.45" stopColor="#ff9a1f" />
            <stop offset="1" stopColor="#c2410c" />
          </linearGradient>
        </defs>
        <path d="M24 5c7 10 13 17 13 25a13 13 0 0 1-26 0c0-8 6-15 13-25Z" fill="url(#phase-melt)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="size-11" aria-hidden="true">
      <defs>
        <linearGradient id="phase-ingot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe2a8" />
          <stop offset="0.5" stopColor="#ff8a3d" />
          <stop offset="1" stopColor="#9a3412" />
        </linearGradient>
      </defs>
      <path d="M6 34 13 18h22l7 16Z" fill="url(#phase-ingot)" />
      <path d="M13 18h22l-3 5H16Z" fill="rgb(255 255 255 / 0.35)" />
    </svg>
  );
}

// Arrow between process steps: → on wide screens, ↓ when the steps stack.
const STEP_ARROW =
  "after:absolute after:top-1/2 after:-right-[0.95rem] after:z-1 after:-translate-y-1/2 after:font-mono after:text-base after:leading-none after:font-bold after:text-ember-text after:content-['→'] max-[640px]:after:top-auto max-[640px]:after:right-1/2 max-[640px]:after:-bottom-[1.05rem] max-[640px]:after:translate-x-1/2 max-[640px]:after:translate-y-0 max-[640px]:after:content-['↓']";

export function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className={section} aria-labelledby="about-title" tabIndex={-1}>
      <div className="site-container">
        <SectionHeader
          id="about-title"
          index="01"
          eyebrow="Origin story"
          title={
            <>
              From ore <span className="text-molten">to code</span>
            </>
          }
          lead="A metallurgist by degree and a software engineer by choice. Both crafts turn raw material into something that holds up under pressure."
        />

        <div className="grid items-start gap-[clamp(2rem,5vw,4rem)] min-[981px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <Reveal>
              <ol className="mb-9 grid gap-4 min-[641px]:grid-cols-3" role="list">
                {about.process.map((step, index) => (
                  <li
                    key={step.title}
                    className={cx(
                      'relative rounded-2xl border border-line bg-surface px-[1.1rem] pt-[1.1rem] pb-[1.2rem]',
                      index < about.process.length - 1 && STEP_ARROW,
                    )}
                  >
                    <PhaseIcon phase={index} />
                    <p className="mt-3 font-mono text-[0.72rem] leading-none font-semibold tracking-[0.08em] text-ember-text">
                      {step.when}
                    </p>
                    <h3 className="mt-[0.35rem] font-display text-2xl leading-none font-extrabold tracking-[0.04em] uppercase">
                      {step.title}
                    </h3>
                    <p className="mt-[0.4rem] text-[0.9rem] leading-normal text-ink-2">{step.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <div className="grid max-w-[64ch] gap-[1.1rem] text-[1.08rem] text-ink-2">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.05 * index}>
                  <p
                    className={cx(
                      index === 0 &&
                        'first-letter:float-left first-letter:mt-[0.06em] first-letter:mr-[0.12em] first-letter:font-display first-letter:text-[3.6em] first-letter:leading-[0.8] first-letter:font-black first-letter:text-ember-text',
                    )}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <aside
              className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface bg-[repeating-linear-gradient(0deg,transparent_0_31px,var(--lattice)_31px_32px)] px-6 pt-6 pb-20 shadow-(--shadow)"
              aria-labelledby="datasheet-title"
            >
              <header className="flex justify-between gap-4 border-b-2 border-ink pb-[0.8rem]">
                <p id="datasheet-title" className="font-display text-[1.35rem] leading-none font-extrabold tracking-[0.06em] uppercase">
                  Material test certificate
                </p>
                <p className="font-mono text-[0.72rem] leading-relaxed font-semibold whitespace-nowrap text-ink-3">No. CG-2023-07</p>
              </header>
              <p className="mt-3 font-mono text-[0.82rem] leading-snug font-medium text-ink-2">
                Specimen <strong className="text-ember-text">{profile.symbol}</strong> · {profile.elementName}
              </p>

              <dl className="mt-[0.9rem]">
                {[...about.datasheet, { key: 'Experience', value: `${profile.yearsLabel} years in production` }].map((row) => (
                  <div
                    key={row.key}
                    className="grid gap-[0.1rem] border-b border-dashed border-line-strong py-[0.55rem] text-[0.92rem] min-[641px]:grid-cols-[7.5rem_1fr] min-[641px]:gap-4"
                  >
                    <dt className="font-mono text-[0.72rem] leading-[1.9] font-semibold tracking-[0.08em] text-ink-3 uppercase">
                      {row.key}
                    </dt>
                    <dd className="text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-[1.4rem]">
                <p className={monoLabel}>Composition by focus (approx.)</p>
                <div
                  className="mt-[0.7rem] flex h-3.5 gap-[3px] overflow-hidden rounded-full"
                  role="img"
                  aria-label={about.composition.map((part) => `${part.label} ${part.value}%`).join(', ')}
                >
                  {about.composition.map((part, index) => (
                    <motion.span
                      key={part.label}
                      className="shrink grow-0 origin-left bg-(--c) shadow-[0_0_14px_-2px_var(--c)]"
                      style={{ '--c': `var(--g-${part.group})`, flexBasis: `${part.value}%` }}
                      initial={{ scaleX: reduced ? 1 : 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.15 * index, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-[0.4rem] text-[0.84rem] text-ink-2" role="list">
                  {about.composition.map((part) => (
                    <li key={part.label} className="inline-flex items-center gap-[0.4rem]" style={{ '--c': `var(--g-${part.group})` }}>
                      <i className="size-[9px] rounded-[2px] bg-(--c)" aria-hidden="true" />
                      {part.label} <span className="font-mono text-ink-3">{part.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.p
                className="pointer-events-none absolute right-[1.4rem] bottom-[1.1rem] grid justify-items-center rounded-[10px] border-[3px] border-double border-[#e2401c] px-[0.8rem] py-[0.45rem] font-display text-[1.45rem] leading-none font-black tracking-[0.12em] text-[#e2401c] uppercase"
                aria-label="Quality control passed"
                initial={{ opacity: 0, scale: reduced ? 1 : 1.8, rotate: -14 }}
                whileInView={{ opacity: 0.9, scale: 1, rotate: -14 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.5 }}
              >
                QC passed
                <span className="mt-[0.2rem] font-mono text-[0.56rem] leading-none font-bold tracking-[0.18em]">
                  Tempered · {CERTIFIED_YEAR}
                </span>
              </motion.p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
