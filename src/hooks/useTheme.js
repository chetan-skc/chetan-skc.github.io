// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { useCallback, useEffect, useState } from 'react';
import { writeStorage } from '../lib/dom';
import { EVENTS, emit, listen } from '../lib/events';

const THEME_COLOR = { dark: '#0e0b0a', light: '#f6f1ea' };

const currentTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  writeStorage('forge:theme', theme);
  emit(EVENTS.theme, theme);
}

/** Theme state shared across components through a window event, so any toggle stays in sync. */
export function useTheme() {
  const [theme, setThemeState] = useState(currentTheme);

  useEffect(() => listen(EVENTS.theme, setThemeState), []);

  const setTheme = useCallback((next, origin) => {
    if (next === currentTheme()) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof document.startViewTransition !== 'function' || reduced) {
      applyTheme(next);
      return;
    }

    // Circular "quench / reheat" reveal expanding from the toggle button.
    const x = origin?.x ?? window.innerWidth - 40;
    const y = origin?.y ?? 32;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const root = document.documentElement;
    root.classList.add('theme-transition');
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      })
      .catch(() => undefined);
    transition.finished.finally(() => root.classList.remove('theme-transition'));
  }, []);

  const toggleTheme = useCallback(
    (origin) => setTheme(currentTheme() === 'dark' ? 'light' : 'dark', origin),
    [setTheme],
  );

  return { theme, setTheme, toggleTheme };
}
