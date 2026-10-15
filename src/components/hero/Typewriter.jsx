// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Typewriter({ words }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const word = words[index];
    let delay = deleting ? 32 : 62;
    let step;

    if (!deleting && text === word) {
      delay = 1700;
      step = () => setDeleting(true);
    } else if (deleting && text === '') {
      delay = 320;
      step = () => {
        setDeleting(false);
        setIndex((current) => (current + 1) % words.length);
      };
    } else {
      step = () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }

    const timer = window.setTimeout(step, delay);
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, words, reduced]);

  return (
    <span>
      <span className="sr-only">{words.join(' ')}</span>
      <span aria-hidden="true">
        <span className="font-semibold text-ink">{reduced ? words[0] : text}</span>
        <span className="ml-0.5 inline-block h-[1.1em] w-[0.55ch] animate-caret bg-ember align-[-0.18em]" />
      </span>
    </span>
  );
}
