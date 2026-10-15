// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { motion } from 'motion/react';
import { Hammer } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { readStorage, writeStorage } from '../../lib/dom';
import { LIMITS } from '../../lib/liveStore';
import { emitSparks } from '../../lib/sparks';
import { formatNumber } from '../../lib/time';
import { toast } from '../../lib/toast';
import { cx } from '../ui/classes';

const MILESTONES = [
  { at: 10, title: 'Apprentice smith', icon: '🔨' },
  { at: 50, title: 'Journeyman smith', icon: '⚒️' },
  { at: 100, title: 'Master blacksmith', icon: '🏆' },
  { at: 250, title: 'Legend of the forge', icon: '🔥' },
];

const FLUSH_MS = 1200;
const MY_STRIKES_KEY = 'forge:my-strikes';
// Impact point on the anvil face, in SVG viewBox units (0 0 320 220).
const IMPACT = { x: 176, y: 70 };

export function Anvil({ store }) {
  const [remote, setRemote] = useState(0);
  const [pending, setPending] = useState(0);
  const [mine, setMine] = useState(() => Number(readStorage(MY_STRIKES_KEY)) || 0);
  const [striking, setStriking] = useState(false);
  const [heat, setHeat] = useState(0);
  const [failed, setFailed] = useState(false);

  const svgRef = useRef(null);
  const storeRef = useRef(store);
  const pendingRef = useRef(0);
  const mineRef = useRef(mine);
  const flushTimer = useRef(0);
  const holdTimer = useRef(0);
  const repeatTimer = useRef(0);
  const strikeTimer = useRef(0);

  useEffect(() => {
    storeRef.current = store;
    if (!store) return;
    return store.subscribeSparks(setRemote, () => setFailed(true));
  }, [store]);

  // Batches strikes into small writes (max LIMITS.sparksPerWrite each, enforced by firestore.rules).
  const flush = useCallback(function flushPending() {
    window.clearTimeout(flushTimer.current);
    flushTimer.current = 0;
    const current = storeRef.current;
    if (!current) return;
    const amount = Math.min(pendingRef.current, LIMITS.sparksPerWrite);
    if (amount === 0) return;
    pendingRef.current -= amount;
    setPending(pendingRef.current);
    current.addSparks(amount).catch(() => setFailed(true));
    if (pendingRef.current > 0) flushTimer.current = window.setTimeout(flushPending, FLUSH_MS);
  }, []);

  // Strikes made before the store finished loading are flushed as soon as it is ready.
  useEffect(() => {
    if (store && pendingRef.current > 0) flush();
  }, [store, flush]);

  useEffect(
    () => () => {
      window.clearTimeout(flushTimer.current);
      window.clearTimeout(holdTimer.current);
      window.clearInterval(repeatTimer.current);
      window.clearTimeout(strikeTimer.current);
    },
    [],
  );

  // The anvil face cools down between strikes.
  useEffect(() => {
    if (heat <= 0) return;
    const timer = window.setTimeout(() => setHeat((value) => Math.max(0, value - 0.06)), 120);
    return () => window.clearTimeout(timer);
  }, [heat]);

  const strike = useCallback(() => {
    setStriking(true);
    window.clearTimeout(strikeTimer.current);
    strikeTimer.current = window.setTimeout(() => setStriking(false), 130);
    setHeat((value) => Math.min(1, value + 0.14));

    window.setTimeout(() => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      emitSparks(rect.left + (IMPACT.x / 320) * rect.width, rect.top + (IMPACT.y / 220) * rect.height, 30, 1.1);
    }, 80);

    pendingRef.current += 1;
    setPending(pendingRef.current);

    mineRef.current += 1;
    setMine(mineRef.current);
    writeStorage(MY_STRIKES_KEY, String(mineRef.current));
    const milestone = MILESTONES.find((item) => item.at === mineRef.current);
    if (milestone) {
      toast({
        title: `${milestone.title} unlocked!`,
        description: `You have struck the anvil ${milestone.at} times.`,
        tone: 'achievement',
        icon: milestone.icon,
      });
    }

    if (pendingRef.current >= LIMITS.sparksPerWrite) flush();
    else if (!flushTimer.current) flushTimer.current = window.setTimeout(flush, FLUSH_MS);
  }, [flush]);

  const stopHolding = () => {
    window.clearTimeout(holdTimer.current);
    window.clearInterval(repeatTimer.current);
  };

  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    strike();
    stopHolding();
    holdTimer.current = window.setTimeout(() => {
      repeatTimer.current = window.setInterval(strike, 160);
    }, 380);
  };

  // Pointer strikes happen on pointerdown; keyboard activation (Enter/Space) arrives as a click with detail 0.
  const onClick = (event) => {
    if (event.detail === 0) strike();
  };

  const total = remote + pending;
  const next = MILESTONES.find((item) => item.at > mine);

  return (
    <div className="mt-3 grid gap-4">
      <button
        type="button"
        className="group relative grid w-full cursor-pointer touch-manipulation justify-items-center rounded-2xl pt-2 pb-1 select-none [-webkit-tap-highlight-color:transparent]"
        onPointerDown={onPointerDown}
        onPointerUp={stopHolding}
        onPointerLeave={stopHolding}
        onPointerCancel={stopHolding}
        onClick={onClick}
        onContextMenu={(event) => event.preventDefault()}
        aria-label="Strike the anvil"
        aria-describedby="anvil-hint"
      >
        <svg ref={svgRef} viewBox="0 0 320 220" className="h-auto w-[min(100%,380px)] overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="anvil-steel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: 'var(--anvil-top)' }} />
              <stop offset="1" style={{ stopColor: 'var(--anvil-bottom)' }} />
            </linearGradient>
            <linearGradient id="hammer-head" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c9d1db" />
              <stop offset="1" stopColor="#5b6573" />
            </linearGradient>
            <linearGradient id="hammer-handle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c08552" />
              <stop offset="1" stopColor="#7a4a26" />
            </linearGradient>
            <radialGradient id="anvil-hot">
              <stop offset="0" stopColor="#fff4d6" />
              <stop offset="0.35" stopColor="#ffb347" />
              <stop offset="0.7" stopColor="#ff5a0a" stopOpacity="0.6" />
              <stop offset="1" stopColor="#ff3d00" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="160" cy="204" rx="122" ry="9" className="fill-black/35 light:fill-[rgb(60_30_10/0.18)]" />
          <path
            className={cx('stroke-white/8', striking && 'animate-thud')}
            d="M78 70 L262 70 L268 74 L268 94 Q268 100 260 100 L222 100 Q204 104 200 124 L200 146 Q202 160 224 166 L246 172 Q256 176 256 186 L256 196 L64 196 L64 186 Q64 176 74 172 L96 166 Q118 160 120 146 L120 124 Q116 106 98 102 Q50 98 18 76 Q12 72 18 70 Q50 68 78 70 Z"
            fill="url(#anvil-steel)"
          />
          <rect x="80" y="70" width="186" height="4" className="fill-white/16" />
          <rect x="236" y="76" width="9" height="9" rx="1" className="fill-black/45" />
          <circle cx="220" cy="80" r="3" className="fill-black/45" />
          <ellipse
            cx={IMPACT.x}
            cy={IMPACT.y + 3}
            rx="46"
            ry="9"
            fill="url(#anvil-hot)"
            className="transition-opacity duration-200"
            style={{ opacity: heat }}
          />
          <circle
            cx={IMPACT.x}
            cy={IMPACT.y}
            r="30"
            fill="url(#anvil-hot)"
            className={cx('origin-[176px_70px] opacity-0 [transform-box:view-box]', striking && 'animate-flash')}
          />

          <g
            className={cx(
              'origin-[296px_51px] transition-transform [transform-box:view-box]',
              striking ? 'rotate-0 duration-75 ease-in' : 'rotate-32 duration-[380ms] ease-out-expo group-hover:rotate-26',
            )}
          >
            <rect x="196" y="46" width="106" height="11" rx="5" fill="url(#hammer-handle)" />
            <rect x="152" y="35" width="48" height="34" rx="4" fill="url(#hammer-head)" />
            <rect x="152" y="35" width="48" height="5" rx="2" fill="rgb(255 255 255 / 0.35)" />
          </g>
        </svg>
        <span className="mt-[0.4rem] inline-flex items-center gap-[0.45rem] rounded-full bg-(image:--molten) px-[1.1rem] py-[0.55rem] text-[0.92rem] font-bold text-on-molten shadow-[0_10px_26px_-12px_rgb(255_90_10/0.8)] transition-transform duration-150 group-active:scale-95">
          <Hammer size={16} aria-hidden="true" /> Strike!
        </span>
      </button>

      <div className="text-center">
        <p className="font-display text-[clamp(3rem,7vw,4.4rem)] leading-none font-black text-molten tabular-nums">
          <motion.span
            key={total}
            className="inline-block"
            initial={{ y: -6, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.18 }}
          >
            {formatNumber(total)}
          </motion.span>
        </p>
        <p className="mt-[0.3rem] text-[0.92rem] text-ink-2">
          {store?.mode === 'firebase' ? 'sparks struck by visitors worldwide' : 'sparks struck on this device'}
        </p>
        <p id="anvil-hint" className="mt-[0.6rem] text-[0.85rem] text-ink-3">
          Your strikes: <strong className="text-ink">{formatNumber(mine)}</strong>
          {next ? ` · ${next.at - mine} more to become a ${next.title.toLowerCase()}` : ' · legendary status reached'}
          <span className="[@media(hover:none)]:hidden"> · Tip: hold to keep hammering</span>
        </p>
        {failed ? (
          <p className="mt-2 text-[0.85rem] text-danger">The live counter is cooling down. Your strikes still count here.</p>
        ) : null}
      </div>
    </div>
  );
}
