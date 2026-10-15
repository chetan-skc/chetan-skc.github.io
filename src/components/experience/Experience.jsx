// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { useRef } from 'react';
import { jobs } from '../../data/experience';
import { profile } from '../../data/profile';
import { chip, chipList, cx, section } from '../ui/classes';
import { Highlight } from '../ui/Highlight';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

const NODE =
  'absolute top-6 left-[calc(var(--rail-x)_+_2px_-_var(--pad))] z-1 grid size-[46px] -translate-x-1/2 place-items-center rounded-full border-2 font-mono text-[0.85rem] leading-none font-extrabold shadow-[0_0_0_6px_var(--bg),0_0_24px_-4px_var(--ember-glow)] max-[640px]:size-[38px] max-[640px]:text-[0.75rem]';

const CARD =
  'rounded-3xl border bg-surface p-[clamp(1.25rem,2.6vw,1.9rem)] shadow-(--shadow) transition-colors duration-300';

const STAGE = 'flex flex-wrap items-center gap-x-[0.9rem] gap-y-2 font-mono text-[0.74rem] leading-tight font-semibold tracking-[0.1em] uppercase';

const HEAD = 'mt-[0.9rem] grid gap-x-6 gap-y-[0.35rem] min-[641px]:grid-cols-[minmax(0,1fr)_auto]';

const ROLE = 'font-display text-[clamp(1.7rem,3vw,2.3rem)] leading-none font-extrabold tracking-[0.02em] uppercase';

const COMPANY = 'text-[1.05rem] font-[650] min-[641px]:col-start-1';

const PERIOD =
  'self-start justify-self-start rounded-full border border-line px-3 py-[0.35rem] font-mono text-[0.8rem] leading-snug font-semibold whitespace-nowrap text-ink-2 max-[640px]:mt-[0.35rem] min-[641px]:col-start-2 min-[641px]:row-span-2 min-[641px]:row-start-1';

const NOTE = 'mt-[0.9rem] border-l-2 border-ember/60 pl-[0.9rem] text-[0.92rem] text-ink-3 italic';

export function Experience() {
  const timelineRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const { education } = profile;

  return (
    <section id="experience" className={section} aria-labelledby="experience-title" tabIndex={-1}>
      <div className="site-container">
        <SectionHeader
          id="experience-title"
          index="03"
          eyebrow="Heat-treatment log"
          title={
            <>
              Hardened <span className="text-molten">in production</span>
            </>
          }
          lead="Steel gets its strength from controlled heating and cooling. My career has followed the same recipe, one stage per role, most recent first."
        />

        <div ref={timelineRef} className="relative pl-(--pad) [--pad:clamp(52px,7vw,84px)] [--rail-x:clamp(20px,3vw,34px)]">
          <div className="absolute inset-y-0 left-(--rail-x) w-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <motion.div
              className="absolute inset-0 origin-top bg-(image:--molten-v) shadow-[0_0_18px_var(--ember-glow)]"
              style={{ scaleY: reduced ? 1 : fill }}
            />
          </div>

          <ol className="grid gap-[clamp(1.5rem,3vw,2.25rem)]" role="list">
            {jobs.map((job) => (
              <li key={job.id} className="relative">
                <div
                  className={cx(
                    NODE,
                    job.current
                      ? 'animate-node-glow border-transparent bg-(image:--molten) text-on-molten'
                      : 'border-ember bg-surface text-ember-text',
                  )}
                  aria-hidden="true"
                >
                  {job.stageNo}
                </div>
                <Reveal
                  className={cx(
                    CARD,
                    job.current
                      ? 'border-ember/55 bg-[radial-gradient(90%_120%_at_100%_0%,rgb(255_110_20/0.1),transparent_60%)]'
                      : 'border-line hover:border-ember/45',
                  )}
                >
                  <p className={STAGE}>
                    <span className="text-ember-text">
                      Stage {job.stageNo} · {job.stage}
                    </span>
                    <span className="text-ink-3">{job.stageTemp}</span>
                    {job.current ? (
                      <span className="inline-flex items-center gap-[0.4rem] rounded-full bg-[rgb(34_197_94/0.13)] px-[0.6rem] py-[0.3rem] tracking-[0.06em] text-success">
                        <i className="size-[7px] animate-pulse-dot rounded-full bg-current" aria-hidden="true" />
                        Current role
                      </span>
                    ) : null}
                  </p>
                  <div className={HEAD}>
                    <h3 className={ROLE}>{job.role}</h3>
                    <p className={COMPANY}>
                      {job.company}
                      {job.focus ? <span className="font-medium text-ink-2"> · {job.focus}</span> : null}
                    </p>
                    <p className={PERIOD}>{job.period}</p>
                  </div>
                  <p className={NOTE}>{job.stageNote}</p>
                  <ul className="mt-4 grid list-disc gap-[0.6rem] pl-[1.15rem] text-ink-2 marker:text-ember">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>
                        <Highlight text={bullet} />
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-[0.6rem]" role="list" aria-label="Impact">
                    {job.impact.map((item) => (
                      <li
                        key={item.label}
                        className="grid min-w-32 gap-1 rounded-xl border border-line bg-surface-2 px-[0.9rem] py-[0.65rem] max-[640px]:min-w-0 max-[640px]:flex-[1_1_calc(50%-0.6rem)]"
                      >
                        <strong className="font-display text-[1.6rem] leading-none font-extrabold text-ember-text">{item.value}</strong>
                        <span className="text-[0.8rem] leading-[1.3] text-ink-2">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className={cx(chipList, 'mt-[1.1rem]')} role="list" aria-label="Tech used">
                    {job.tech.map((tech) => (
                      <li key={tech} className={chip}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}

            <li className="relative">
              <div className={cx(NODE, 'border-steel bg-surface text-steel')} aria-hidden="true">
                <GraduationCap size={18} />
              </div>
              <Reveal
                className={cx(
                  CARD,
                  'border-line bg-[repeating-linear-gradient(135deg,transparent_0_12px,var(--lattice)_12px_13px)] hover:border-ember/45',
                )}
              >
                <p className={STAGE}>
                  <span className="text-ember-text">Raw ore · Education</span>
                  <span className="text-ink-3">25 °C</span>
                </p>
                <div className={HEAD}>
                  <h3 className={ROLE}>{education.degree}</h3>
                  <p className={COMPANY}>
                    {education.school}
                    <span className="font-medium text-ink-2"> · {education.place}</span>
                  </p>
                  <p className={PERIOD}>{education.period}</p>
                </div>
                <p className={NOTE}>
                  Where it all started: learning how structure, process and heat decide how strong a material becomes.
                </p>
              </Reveal>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
