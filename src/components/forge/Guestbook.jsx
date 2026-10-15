// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { AnimatePresence, motion } from 'motion/react';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { readStorage, writeStorage } from '../../lib/dom';
import { LIMITS, METALS, metalStyle } from '../../lib/liveStore';
import { emitSparks } from '../../lib/sparks';
import { timeAgo } from '../../lib/time';
import { toast } from '../../lib/toast';
import { button, cx, field, fieldError, fieldInput, fieldLabel, honeypot } from '../ui/classes';

const COOLDOWN_MS = 60_000;
const LAST_POST_KEY = 'forge:last-post';
const INITIAL_VISIBLE = 9;

export function Guestbook({ store }) {
  const [entries, setEntries] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [metal, setMetal] = useState('copper');
  const [website, setWebsite] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const submitRef = useRef(null);

  useEffect(() => {
    if (!store) return;
    return store.subscribeWall(setEntries, () => setError('The wall is cooling down right now. Please try again later.'));
  }, [store]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (website) return; // Honeypot: real visitors never see this field.
    if (!name.trim() || !message.trim()) {
      setError('Add your name and a short note first.');
      return;
    }
    const wait = COOLDOWN_MS - (Date.now() - (Number(readStorage(LAST_POST_KEY)) || 0));
    if (wait > 0) {
      setError(`The metal is still hot. You can stamp another note in ${Math.ceil(wait / 1000)}s.`);
      return;
    }
    if (!store) return;

    setSending(true);
    setError(null);
    try {
      await store.addEntry({ name, message, metal });
      writeStorage(LAST_POST_KEY, String(Date.now()));
      setMessage('');
      const rect = submitRef.current?.getBoundingClientRect();
      if (rect) emitSparks(rect.left + rect.width / 2, rect.top, 34, 1.1);
      toast({ title: 'Stamped onto the wall!', description: 'Thanks for leaving your mark.', tone: 'success', icon: '🔨' });
    } catch {
      setError('Your note could not be stamped. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const visible = entries ? (showAll ? entries : entries.slice(0, INITIAL_VISIBLE)) : [];

  return (
    <div className="mt-4">
      <form className="grid gap-4" onSubmit={onSubmit} noValidate>
        <div className="grid gap-[0.9rem] min-[561px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <label className={field}>
            <span className={fieldLabel}>Your name</span>
            <input
              className={fieldInput}
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={LIMITS.name}
              autoComplete="name"
              placeholder="Ada Lovelace"
              required
            />
          </label>
          <label className={field}>
            <span className={fieldLabel}>Your note</span>
            <textarea
              className={fieldInput}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={LIMITS.message}
              rows={2}
              placeholder="Loved the periodic table!"
              required
            />
            <span className="flex justify-between gap-4 text-[0.82rem] text-ink-3">
              <span>Keep it friendly. Notes are public.</span>
              <span>
                {message.length}/{LIMITS.message}
              </span>
            </span>
          </label>
        </div>

        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className={fieldLabel}>Stamp it in</legend>
          <div className="mt-2 flex flex-wrap gap-[0.45rem]">
            {METALS.map((option) => {
              const checked = metal === option.id;
              return (
                <label
                  key={option.id}
                  className={cx(
                    'relative inline-flex cursor-pointer items-center gap-[0.45rem] rounded-full border py-[0.4rem] pr-[0.8rem] pl-[0.45rem] text-[0.86rem] transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ember',
                    checked
                      ? 'border-(--m2) bg-[color-mix(in_oklab,var(--m2)_14%,var(--bg))] text-ink light:border-(--m1)'
                      : 'border-line bg-base text-ink-2 hover:text-ink',
                  )}
                  style={metalStyle(option.id)}
                >
                  <input
                    type="radio"
                    name="metal"
                    value={option.id}
                    checked={checked}
                    onChange={() => setMetal(option.id)}
                    className="pointer-events-none absolute opacity-0"
                  />
                  <span
                    className="size-[18px] rounded-full bg-[linear-gradient(135deg,var(--m2),var(--m1))] shadow-[inset_0_1px_1px_rgb(255_255_255/0.5)]"
                    aria-hidden="true"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className={honeypot} aria-hidden="true">
          Website
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </label>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-[0.6rem]">
          <button ref={submitRef} type="submit" className={button('molten')} disabled={sending || !store}>
            <Send size={16} aria-hidden="true" />
            {sending ? 'Stamping…' : 'Stamp it on the wall'}
          </button>
          {error ? (
            <p className={fieldError} role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </form>

      <ul
        className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 border-t border-dashed border-line-strong pt-6"
        role="list"
        aria-label="Notes on the wall"
        aria-busy={entries === null}
      >
        <AnimatePresence initial={false}>
          {visible.map((entry) => (
            <motion.li
              key={entry.id}
              layout
              className="relative flex flex-col justify-between gap-[0.6rem] rounded-xl border border-[color-mix(in_oklab,var(--m1)_60%,var(--border))] bg-[linear-gradient(145deg,color-mix(in_oklab,var(--m2)_16%,var(--surface)),var(--surface)_75%)] px-4 py-[0.9rem] shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"
              style={metalStyle(entry.metal)}
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              <p className="text-[0.93rem] leading-normal wrap-anywhere">“{entry.message}”</p>
              <p className="flex justify-between gap-[0.6rem] font-mono text-[0.72rem] leading-[1.3] font-medium text-ink-3">
                <span className="font-bold tracking-[0.08em] text-(--m2) uppercase wrap-anywhere light:text-(--m1)">{entry.name}</span>
                <span>{timeAgo(entry.createdAt)}</span>
              </p>
            </motion.li>
          ))}
        </AnimatePresence>
        {entries !== null && entries.length === 0 ? (
          <li className="col-span-full text-[0.92rem] text-ink-3">The wall is empty. Be the first to leave your mark!</li>
        ) : null}
        {entries === null ? <li className="col-span-full text-[0.92rem] text-ink-3">Heating up the wall…</li> : null}
      </ul>

      {entries && entries.length > INITIAL_VISIBLE ? (
        <button type="button" className={cx(button('ghost', 'sm'), 'mt-4')} onClick={() => setShowAll((value) => !value)}>
          {showAll ? 'Show fewer notes' : `Show all ${entries.length} notes`}
        </button>
      ) : null}
    </div>
  );
}
