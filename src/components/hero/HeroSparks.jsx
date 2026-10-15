// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { EVENTS, listen } from '../../lib/events';
import { createSparkSystem } from '../../lib/sparks';

/** Ambient embers rising from the "furnace" at the bottom of the hero; the cursor sheds sparks. */
export function HeroSparks() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section || reduced) return;

    const system = createSparkSystem(canvas, { ambient: true, maxParticles: 420 });
    let lastTrail = 0;
    let overheatTimer = 0;

    const toLocal = (event) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onMove = (event) => {
      if (event.pointerType === 'touch') return;
      const now = performance.now();
      if (now - lastTrail < 28) return;
      lastTrail = now;
      const { x, y } = toLocal(event);
      system.trail(x, y);
    };

    const onDown = (event) => {
      if (event.target instanceof Element && event.target.closest('a, button, [data-element-card]')) return;
      const { x, y } = toLocal(event);
      system.burst(x, y, 24, 0.9);
    };

    const visibility = new IntersectionObserver(([entry]) => system.setAmbient(entry.isIntersecting));
    visibility.observe(section);
    const resize = new ResizeObserver(() => system.resize());
    resize.observe(canvas);
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerdown', onDown);
    const stopOverheat = listen(EVENTS.overheat, () => {
      system.setIntensity(5);
      window.clearTimeout(overheatTimer);
      overheatTimer = window.setTimeout(() => system.setIntensity(1), 6000);
    });

    return () => {
      visibility.disconnect();
      resize.disconnect();
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerdown', onDown);
      stopOverheat();
      window.clearTimeout(overheatTimer);
      system.destroy();
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-1 size-full" aria-hidden="true" />;
}
