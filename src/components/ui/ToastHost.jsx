// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { EVENTS, listen } from '../../lib/events';
import { cx } from './classes';

const TONES = {
  info: 'border-line-strong shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)]',
  success: 'border-success/55 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)]',
  error: 'border-danger/60 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)]',
  achievement: 'border-ember shadow-[0_0_0_1px_var(--ember),0_18px_50px_-16px_var(--ember-glow)]',
};

let nextId = 0;

export function ToastHost() {
  const [items, setItems] = useState([]);

  useEffect(
    () =>
      listen(EVENTS.toast, (input) => {
        nextId += 1;
        const id = nextId;
        setItems((list) => [...list.slice(-2), { ...input, id }]);
        window.setTimeout(() => setItems((list) => list.filter((item) => item.id !== id)), input.duration ?? 4200);
      }),
    [],
  );

  return (
    <div
      className="pointer-events-none fixed right-[clamp(1rem,3vw,1.5rem)] bottom-[clamp(1rem,3vw,1.5rem)] z-120 grid w-[min(370px,calc(100vw-2rem))] gap-[0.6rem]"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            className={cx(
              'pointer-events-auto flex items-start gap-3 rounded-[14px] border bg-glass px-4 py-[0.9rem] backdrop-blur-[14px] backdrop-saturate-130',
              TONES[item.tone ?? 'info'],
            )}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            {item.icon ? (
              <span className="text-[1.3rem] leading-[1.2]" aria-hidden="true">
                {item.icon}
              </span>
            ) : null}
            <div>
              <p className="text-[0.95rem] leading-[1.35] font-[650]">{item.title}</p>
              {item.description ? (
                <p className="mt-[0.15rem] text-[0.87rem] leading-[1.45] text-ink-2">{item.description}</p>
              ) : null}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
