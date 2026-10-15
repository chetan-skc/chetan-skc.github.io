// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useTheme } from '../../hooks/useTheme';
import { cx } from '../ui/classes';
import { COMMANDS, WELCOME, runCommand } from './commands';

const PROMPT = 'visitor@forge:~$';

// The terminal stays dark in both themes, like a real one.
const TONES = {
  plain: '',
  input: '',
  muted: 'text-[#9d8f84]',
  accent: 'text-[#ffa25c]',
  error: 'text-[#ff7b72]',
  success: 'text-[#7ee787]',
};

let entryId = 0;

const toEntries = (lines, kind = 'output') =>
  lines.map((line) => {
    entryId += 1;
    return { ...line, kind, id: entryId };
  });

export function Terminal({ open, onClose }) {
  const pending = useRef(null);

  return (
    <AnimatePresence
      onExitComplete={() => {
        const effect = pending.current;
        pending.current = null;
        effect?.();
      }}
    >
      {open ? (
        <TerminalWindow
          onClose={(effect) => {
            pending.current = effect ?? null;
            onClose();
          }}
        />
      ) : null}
    </AnimatePresence>
  );
}

function TerminalWindow({ onClose }) {
  const { theme, setTheme } = useTheme();
  const [entries, setEntries] = useState(() => toEntries(WELCOME));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(null);
  const windowRef = useRef(null);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  useFocusTrap(windowRef, true);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [entries]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const value = input;
    const trimmed = value.trim();
    const nextHistory = trimmed ? [...history, trimmed] : history;
    const result = runCommand(value, { theme, setTheme, history: nextHistory });
    setHistory(nextHistory);
    setCursor(null);
    setInput('');
    if (result.clear) {
      setEntries([]);
    } else {
      setEntries((list) => [...list, ...toEntries([{ text: value }], 'input'), ...toEntries(result.lines ?? [])]);
    }
    if (result.close) onClose(result.effect);
    else result.effect?.();
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      if (history.length === 0) return;
      event.preventDefault();
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (event.key === 'ArrowDown') {
      if (cursor === null) return;
      event.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(null);
        setInput('');
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const partial = input.trimStart().toLowerCase();
      if (!partial || partial.includes(' ')) return;
      const matches = COMMANDS.filter((name) => name.startsWith(partial));
      if (matches.length === 1) {
        setInput(`${matches[0]} `);
      } else if (matches.length > 1) {
        setEntries((list) => [
          ...list,
          ...toEntries([{ text: input }], 'input'),
          ...toEntries([{ text: matches.join('   '), tone: 'muted' }]),
        ]);
      }
    } else if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
      event.preventDefault();
      setEntries([]);
    }
  };

  const focusInput = () => {
    if (!window.getSelection()?.toString()) inputRef.current?.focus();
  };

  return (
    <motion.div
      className="fixed inset-0 z-100 grid place-items-center bg-[rgb(8_5_4/0.58)] p-4 backdrop-blur-[6px] light:bg-[rgb(60_40_25/0.28)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={windowRef}
        className="flex h-[min(540px,80vh)] w-[min(780px,100%)] flex-col overflow-hidden rounded-[14px] border border-[rgb(255_160_90/0.25)] bg-[#0b0908] font-mono text-[0.88rem] leading-[1.6] text-[#f2e9e1] shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9),0_0_60px_-20px_rgb(255_90_10/0.4)] selection:bg-[rgb(255_122_26/0.4)] max-[560px]:h-[86vh] max-[560px]:text-[0.8rem]"
        role="dialog"
        aria-modal="true"
        aria-label="Interactive terminal"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            onClose();
          }
        }}
      >
        <div className="flex items-center gap-[0.45rem] border-b border-white/6 bg-[#17120f] px-[0.9rem] py-[0.7rem]">
          <button
            type="button"
            className="size-3 rounded-full bg-[#ff5f57] hover:shadow-[0_0_0_3px_rgb(255_95_87/0.3)]"
            onClick={() => onClose()}
            aria-label="Close terminal"
          />
          <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <p className="mx-auto pr-12 text-[0.76rem] text-[#a8998d]">visitor@forge: ~ · zsh-ish</p>
        </div>

        <div ref={bodyRef} className="flex-1 cursor-text overflow-y-auto overscroll-contain px-[1.1rem] pt-4 pb-5" onMouseUp={focusInput}>
          <div role="log" aria-live="polite" aria-relevant="additions">
            {entries.map((entry) => (
              <p
                key={entry.id}
                className={cx('whitespace-pre-wrap wrap-anywhere', TONES[entry.kind === 'input' ? 'input' : (entry.tone ?? 'plain')])}
              >
                {entry.kind === 'input' ? (
                  <>
                    <span className="whitespace-nowrap text-[#7ee787]">{PROMPT}</span> {entry.text}
                  </>
                ) : entry.href ? (
                  <a
                    className="text-inherit decoration-[rgb(255_162_92/0.5)] hover:text-[#ffa25c]"
                    href={entry.href}
                    target={entry.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    {entry.text}
                  </a>
                ) : (
                  entry.text
                )}
              </p>
            ))}
          </div>

          <form className="flex items-center gap-[1ch]" onSubmit={submit}>
            <span className="whitespace-nowrap text-[#7ee787]" aria-hidden="true">
              {PROMPT}
            </span>
            <input
              ref={inputRef}
              className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[#f2e9e1] caret-[#ff7a1a] outline-none"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
            />
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
