// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { Mail, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { profile } from '../../data/profile';
import { emitSparks } from '../../lib/sparks';
import { button, cx } from '../ui/classes';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

const ORBITS = [
  { tilt: -24, rx: 205, ry: 66, duration: 9, offset: 0 },
  { tilt: 32, rx: 196, ry: 58, duration: 12.5, offset: 4 },
  { tilt: 88, rx: 186, ry: 50, duration: 16, offset: 8 },
];

const FACE = 'element-face w-[min(300px,74vw)] aspect-[5/6] px-6 pt-[1.4rem] pb-[1.35rem]';

/** Hero "periodic element" for Chetan: tilts with the pointer, flips to a business card. */
export function ElementCard() {
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 18 };
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [12, -12]), spring);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-14, 14]), spring);
  const glareX = useTransform(pointerX, (value) => `${value * 100}%`);
  const glareY = useTransform(pointerY, (value) => `${value * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.13), transparent 45%)`;

  const onPointerMove = (event) => {
    if (reduced || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const onPointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const onCardClick = (event) => {
    if (event.target instanceof Element && event.target.closest('a, button')) return;
    emitSparks(event.clientX, event.clientY, 18, 0.8);
    setFlipped((value) => !value);
  };

  const { email, linkedin, linkedinLabel, github, githubUser } = profile.contact;
  const backLink = 'inline-flex items-center gap-2 break-all text-ink no-underline hover:text-ember-text';

  return (
    <div className="relative grid justify-items-center gap-[1.4rem] perspective-[1100px]">
      <svg
        className="pointer-events-none absolute top-1/2 left-1/2 -mt-[250px] -ml-[230px] size-[460px] max-w-none overflow-visible max-[980px]:-mt-[205px] max-[980px]:-ml-[190px] max-[980px]:size-[380px] max-[760px]:-mt-[175px] max-[760px]:-ml-[160px] max-[760px]:size-[320px]"
        viewBox="-230 -230 460 460"
        aria-hidden="true"
      >
        {ORBITS.map((orbit) => (
          <g key={orbit.tilt} transform={`rotate(${orbit.tilt})`}>
            <ellipse className="fill-none stroke-ember/30 [stroke-dasharray:3_6]" rx={orbit.rx} ry={orbit.ry} />
            {reduced ? null : (
              <circle className="fill-[#fff1cf] drop-shadow-[0_0_6px_#ff7a1a] light:fill-[#e2560c]" r={4.5}>
                <animateMotion
                  dur={`${orbit.duration}s`}
                  begin={`-${orbit.offset}s`}
                  repeatCount="indefinite"
                  path={`M ${orbit.rx} 0 A ${orbit.rx} ${orbit.ry} 0 1 1 ${-orbit.rx} 0 A ${orbit.rx} ${orbit.ry} 0 1 1 ${orbit.rx} 0`}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      <motion.div
        data-element-card
        className="relative cursor-pointer transform-3d"
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onClick={onCardClick}
      >
        <div
          className={cx(
            'relative transition-transform duration-[850ms] ease-out-expo transform-3d',
            flipped && 'rotate-y-180',
          )}
        >
          <div className={cx(FACE, 'relative grid grid-rows-[auto_1fr_auto_auto]')} inert={flipped}>
            <p className="sr-only">
              Periodic-table style card: element {profile.symbol}, {profile.elementName}. {profile.yearsLabel} years
              forged in production. Group: full-stack. Configuration: a metallurgy core with .NET, React and SQL.
            </p>
            <div className="flex items-start justify-between" aria-hidden="true">
              <span className="font-mono text-[1.6rem] leading-none font-extrabold text-ember-text">
                {profile.yearsLabel}
                <small className="mt-[0.35rem] block text-[0.6rem] font-semibold tracking-[0.14em] text-ink-3 uppercase">
                  years forged
                </small>
              </span>
              <span className="rounded-full border border-line-strong px-[0.6rem] py-[0.3rem] font-mono text-[0.66rem] leading-none font-semibold tracking-[0.14em] text-ink-2 uppercase">
                Full-Stack
              </span>
            </div>
            <div
              className="animate-molten self-center justify-self-center pt-[0.1em] font-display text-[clamp(6.5rem,15vw,8.6rem)] leading-none font-black text-molten drop-shadow-[0_10px_26px_rgb(255_90_10/0.35)]"
              aria-hidden="true"
            >
              {profile.symbol}
            </div>
            <div
              className="text-center font-display text-[1.85rem] leading-none font-extrabold tracking-[0.08em] uppercase"
              aria-hidden="true"
            >
              {profile.elementName}
            </div>
            <div className="mt-2 text-center font-mono text-[0.74rem] leading-tight font-medium text-ink-2" aria-hidden="true">
              [Metallurgy] .NET · React · SQL
            </div>
            <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} aria-hidden="true" />
          </div>

          <div
            className={cx(FACE, 'absolute inset-0 flex rotate-y-180 cursor-default flex-col items-start justify-center gap-[0.35rem]')}
            inert={!flipped}
          >
            <p className="font-mono text-[0.7rem] leading-none font-semibold tracking-[0.16em] text-ember-text uppercase">
              Business card
            </p>
            <p className="mt-[0.4rem] font-display text-[2.5rem] leading-[0.95] font-black uppercase">{profile.name}</p>
            <p className="text-[0.92rem] text-ink-2">
              {profile.role} · {profile.location}
            </p>
            <ul className="mt-4 mb-[1.2rem] grid gap-[0.45rem] text-[0.82rem]" role="list">
              <li>
                <a className={backLink} href={`mailto:${email}`}>
                  <Mail size={15} aria-hidden="true" /> {email}
                </a>
              </li>
              <li>
                <a className={backLink} href={linkedin} target="_blank" rel="noreferrer">
                  <LinkedinIcon size={15} /> {linkedinLabel}
                </a>
              </li>
              <li>
                <a className={backLink} href={github} target="_blank" rel="noreferrer">
                  <GithubIcon size={15} /> github.com/{githubUser}
                </a>
              </li>
            </ul>
            <a className={button('molten', 'sm')} href="#contact">
              Let&apos;s talk
            </a>
          </div>
        </div>
      </motion.div>

      <button
        type="button"
        className="relative inline-flex items-center gap-[0.45rem] rounded-full border border-line bg-glass px-[0.85rem] py-[0.45rem] font-mono text-[0.78rem] leading-none font-medium text-ink-2 transition-colors hover:border-ember hover:text-ink"
        onClick={() => setFlipped((value) => !value)}
        aria-pressed={flipped}
      >
        <RefreshCw size={14} aria-hidden="true" />
        {flipped ? 'Show the element' : 'Flip the card'}
      </button>
    </div>
  );
}
