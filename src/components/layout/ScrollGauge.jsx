// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useState } from 'react';

const ROOM_TEMP = 20;
const IRON_MELTS = 1538;

/** Molten progress bar plus a decorative thermometer: scrolling heats the forge up to iron's melting point. */
export function ScrollGauge() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  const [temperature, setTemperature] = useState(ROOM_TEMP);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setTemperature(Math.round(ROOM_TEMP + value * (IRON_MELTS - ROOM_TEMP)));
  });

  const melted = temperature >= IRON_MELTS - 8;

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-65 h-[3px] origin-left bg-(image:--molten) shadow-[0_0_12px_var(--ember-glow)]"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed bottom-6 left-5 z-50 hidden justify-items-center gap-[0.4rem] min-[1400px]:grid"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.72rem] leading-none font-bold text-ember-text tabular-nums">
          {temperature.toLocaleString('en-US')}°C
        </span>
        <div className="relative h-[120px] w-2.5 overflow-hidden rounded-[10px] border border-line-strong bg-surface">
          <motion.div
            className="absolute inset-0 origin-bottom bg-[linear-gradient(0deg,#a3290b,#ff5a0a_35%,#ff9a1f_65%,#fff1cf)]"
            style={{ scaleY: progress }}
          />
        </div>
        <div className="-mt-2.5 size-5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ffd9a8,#ff5a0a_55%,#a3290b)] shadow-[0_0_16px_var(--ember-glow)]" />
        <span className="font-mono text-[0.58rem] leading-none font-semibold tracking-[0.12em] text-ink-3 uppercase">
          {melted ? 'Fe melts!' : 'Forge temp'}
        </span>
      </div>
    </>
  );
}
