// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { useEffect, useRef } from 'react';
import { isTypingTarget } from '../lib/dom';

const SEQUENCE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

export function useKonami(onUnlock) {
  const callback = useRef(onUnlock);

  useEffect(() => {
    callback.current = onUnlock;
  });

  useEffect(() => {
    let index = 0;
    const onKeyDown = (event) => {
      if (isTypingTarget(event.target)) return;
      const key = event.key.toLowerCase();
      if (key === SEQUENCE[index]) {
        index += 1;
        if (index === SEQUENCE.length) {
          index = 0;
          callback.current();
        }
      } else {
        index = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
