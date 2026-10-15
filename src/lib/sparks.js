// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { prefersReducedMotion } from './dom';
import { EVENTS, emit } from './events';

/** Fire a spark burst at viewport coordinates; rendered by the global SparkLayer canvas. */
export function emitSparks(x, y, count = 26, power = 1) {
  if (prefersReducedMotion()) return;
  emit(EVENTS.burst, { x, y, count, power });
}

const rand = (min, max) => min + Math.random() * (max - min);

/**
 * Lightweight canvas particle engine. "Embers" float up from the bottom edge (ambient furnace glow);
 * "sparks" are fast streaks with gravity (anvil strikes, clicks). Velocities are in px per millisecond.
 */
export function createSparkSystem(canvas, options = {}) {
  const ctx = canvas.getContext('2d');
  const particles = [];
  const max = options.maxParticles ?? 500;
  const ambientRate = options.ambientRate ?? 0.03;
  let ambient = options.ambient ?? false;
  let intensity = 1;
  let width = 0;
  let height = 0;
  let raf = 0;
  let last = 0;
  let running = false;
  let spawnBudget = 0;
  let light = document.documentElement.dataset.theme === 'light';

  const add = (particle) => {
    if (particles.length >= max) particles.shift();
    particles.push(particle);
  };

  const spawnEmber = () => {
    add({
      x: rand(0, width),
      y: height + 8,
      vx: rand(-0.015, 0.015),
      vy: rand(-0.12, -0.035),
      age: 0,
      ttl: rand(3500, 7500),
      size: rand(0.7, 2.1),
      kind: 'ember',
      seed: rand(0, 1000),
    });
  };

  // t = remaining life: 1 is fresh (white-hot), 0 is cooled (deep red).
  const heat = (t, alpha) => {
    if (light) {
      return `rgba(${Math.round(196 + 50 * t)},${Math.round(52 + 98 * t)},${Math.round(8 + 34 * t)},${alpha})`;
    }
    const green = Math.round(70 + 185 * Math.pow(t, 0.75));
    const blue = Math.round(20 + 205 * Math.max(0, (t - 0.55) / 0.45));
    return `rgba(255,${green},${blue},${alpha})`;
  };

  const frame = (now) => {
    if (!ctx) return;
    const dt = last ? Math.min(40, now - last) : 16;
    last = now;

    if (ambient) {
      spawnBudget += dt * ambientRate * intensity * Math.max(0.35, width / 1280);
      while (spawnBudget >= 1) {
        spawnEmber();
        spawnBudget -= 1;
      }
    }

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = light ? 'source-over' : 'lighter';
    ctx.lineCap = 'round';

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.age += dt;
      const outOfBounds = p.y < -30 || p.x < -60 || p.x > width + 60 || (p.kind === 'spark' && p.y > height + 30);
      if (p.age >= p.ttl || outOfBounds) {
        particles[i] = particles[particles.length - 1];
        particles.pop();
        continue;
      }

      if (p.kind === 'ember') {
        p.vx += Math.sin((now + p.seed * 13) * 0.002) * 0.0008;
        p.vx *= 0.996;
        p.vy -= 0.000012 * dt;
      } else {
        p.vy += 0.0011 * dt;
        p.vx *= 0.987;
        p.vy *= 0.987;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      const t = 1 - p.age / p.ttl;
      const alpha = Math.min(1, t * 1.8);
      if (p.kind === 'ember') {
        const flicker = 0.7 + 0.3 * Math.sin((now + p.seed * 7) * 0.012);
        ctx.fillStyle = heat(t, alpha * 0.16 * flicker);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = heat(t, alpha * 0.9 * flicker);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = heat(t, alpha);
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(p.x - p.vx * 22, p.y - p.vy * 22);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    }

    if (ambient || particles.length > 0) {
      raf = requestAnimationFrame(frame);
    } else {
      running = false;
      last = 0;
      ctx.clearRect(0, 0, width, height);
    }
  };

  const start = () => {
    if (running || !ctx || document.hidden) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    cancelAnimationFrame(raf);
    running = false;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const onVisibility = () => {
    if (document.hidden) stop();
    else if (ambient || particles.length > 0) start();
  };

  const onTheme = (event) => {
    light = event.detail === 'light';
  };

  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener(EVENTS.theme, onTheme);
  resize();
  if (ambient) start();

  return {
    burst(x, y, count = 26, power = 1) {
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + rand(-1.3, 1.3);
        const speed = rand(0.18, 0.78) * power;
        add({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          age: 0,
          ttl: rand(450, 1150),
          size: rand(1, 2.4),
          kind: 'spark',
          seed: rand(0, 1000),
        });
      }
      start();
    },
    trail(x, y) {
      add({
        x,
        y,
        vx: rand(-0.08, 0.08),
        vy: rand(-0.16, -0.03),
        age: 0,
        ttl: rand(450, 900),
        size: rand(0.8, 1.6),
        kind: 'spark',
        seed: rand(0, 1000),
      });
      start();
    },
    setAmbient(on) {
      ambient = on;
      if (on) start();
    },
    setIntensity(value) {
      intensity = value;
    },
    resize,
    destroy() {
      stop();
      particles.length = 0;
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener(EVENTS.theme, onTheme);
    },
  };
}
