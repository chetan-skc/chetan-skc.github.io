// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DEFAULT_SKILL, GROUPS, GROUP_ORDER, HEAT, SKILLS } from '../../data/skills';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { EVENTS, listen } from '../../lib/events';
import { chip, chipList, cx, section, sectionTint } from '../ui/classes';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

const groupStyle = (group) => ({ '--c': `var(--g-${group})` });

const COUNTS = Object.fromEntries(GROUP_ORDER.map((group) => [group, SKILLS.filter((skill) => skill.group === group).length]));

const HEAT_DOT = {
  white: 'bg-heat-white shadow-[0_0_8px_2px_color-mix(in_oklab,var(--heat-white)_65%,transparent)]',
  red: 'bg-heat-red shadow-[0_0_6px_var(--heat-red)]',
  warm: 'bg-heat-warm',
};

const TILE_LIFT = 'z-2 -translate-y-1 scale-105 border-(--c) shadow-[0_0_0_1px_var(--c),0_14px_30px_-12px_var(--c)]';

function HeatDot({ heat, className = 'size-2' }) {
  return <i className={cx('inline-block flex-none rounded-full', HEAT_DOT[heat], className)} aria-hidden="true" />;
}

/**
 * One element tile. `previewOnHover` is only used by the desktop table, where the detail panel
 * never moves; in the grouped layout tiles react to clicks/taps only.
 */
function Tile({ skill, active, dimmed, onSelect, placed, previewOnHover }) {
  return (
    <button
      type="button"
      className={cx(
        'relative flex aspect-[1/1.08] min-w-0 flex-col justify-between rounded-[10px] border bg-[linear-gradient(160deg,color-mix(in_oklab,var(--c)_18%,var(--surface))_0%,var(--surface)_72%)] px-[7px] pt-[7px] pb-2 text-left text-ink transition-[translate,scale,box-shadow,border-color,opacity,filter] duration-[250ms] ease-spring',
        active
          ? TILE_LIFT
          : cx(
              'border-(--c)/40 hover:z-2 hover:-translate-y-1 hover:scale-105 hover:border-(--c) hover:shadow-[0_0_0_1px_var(--c),0_14px_30px_-12px_var(--c)]',
              skill.heat === 'white' && 'shadow-[0_0_24px_-12px_var(--c)]',
            ),
        dimmed && (active ? 'opacity-65 grayscale-85' : 'opacity-22 grayscale-85 hover:opacity-65'),
      )}
      style={{ ...groupStyle(skill.group), ...(placed ? { gridRow: skill.row, gridColumn: skill.col } : null) }}
      aria-pressed={active}
      aria-label={`${skill.name}: ${GROUPS[skill.group].label}, ${HEAT[skill.heat].label}`}
      onMouseEnter={previewOnHover ? () => onSelect(skill) : undefined}
      onFocus={previewOnHover ? () => onSelect(skill) : undefined}
      onClick={() => onSelect(skill)}
    >
      <span className="font-mono text-[0.64rem] leading-none font-semibold text-ink-3" aria-hidden="true">
        {skill.number}
      </span>
      <HeatDot heat={skill.heat} className="absolute top-2 right-2 size-[7px]" />
      <span className="font-display text-[clamp(1.4rem,2vw,1.8rem)] leading-none font-extrabold text-(--c)" aria-hidden="true">
        {skill.symbol}
      </span>
      <span
        className={cx(
          'leading-[1.15] font-[550] text-ink-2 hyphens-auto wrap-anywhere',
          placed ? 'text-[0.68rem]' : 'text-[0.72rem]',
        )}
        aria-hidden="true"
      >
        {skill.name}
      </span>
    </button>
  );
}

function Detail({ skill, compact, className }) {
  const group = GROUPS[skill.group];
  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-2xl border border-(--c)/40 bg-surface bg-[radial-gradient(120%_120%_at_0%_0%,color-mix(in_oklab,var(--c)_14%,transparent),transparent_60%)] p-[clamp(0.9rem,1.4vw,1.25rem)]',
        className,
      )}
      style={groupStyle(skill.group)}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={skill.symbol}
          className={cx(
            'grid h-full items-center gap-[clamp(0.9rem,1.6vw,1.4rem)]',
            compact ? 'grid-cols-1' : 'grid-cols-[auto_minmax(0,1fr)]',
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {compact ? null : (
            <div
              className="flex aspect-[1/1.1] w-[clamp(112px,11vw,150px)] flex-col justify-between rounded-[14px] border-[1.5px] border-(--c) bg-[linear-gradient(160deg,color-mix(in_oklab,var(--c)_28%,var(--surface)),var(--surface)_80%)] px-3 py-2.5 shadow-[0_0_40px_-12px_var(--c)]"
              aria-hidden="true"
            >
              <span className="font-mono text-[0.85rem] leading-none font-semibold text-ink-2">{skill.number}</span>
              <span className="font-display text-[clamp(3rem,4.4vw,4.2rem)] leading-none font-black text-(--c)">{skill.symbol}</span>
              <span className="text-[0.76rem] leading-tight font-semibold text-ink-2">{skill.name}</span>
            </div>
          )}
          <div>
            <p className="font-mono text-[0.7rem] leading-snug font-semibold tracking-[0.1em] text-(--c) uppercase">
              {group.label} <span className="tracking-[0.02em] text-ink-3 normal-case">· {group.family}</span>
            </p>
            <h3 className="mt-[0.3rem] font-display text-[clamp(1.6rem,2.3vw,2.2rem)] leading-none font-extrabold tracking-[0.02em] uppercase">
              {skill.name}
            </h3>
            <p className="mt-2 flex items-center gap-[0.45rem] text-[0.84rem] text-ink-2">
              <HeatDot heat={skill.heat} />
              {HEAT[skill.heat].label}: {HEAT[skill.heat].meaning.toLowerCase()}
            </p>
            <p className="mt-[0.45rem] text-[0.95rem] leading-normal">{skill.note}</p>
            <div className="mt-[0.7rem] flex flex-wrap items-center gap-[0.4rem]">
              <span className="mr-[0.15rem] font-mono text-[0.68rem] leading-none font-semibold tracking-[0.1em] text-ink-3 uppercase">
                Forged at
              </span>
              <ul className={chipList} role="list">
                {skill.forgedAt.map((place) => (
                  <li key={place} className={chip}>
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Skills() {
  const wide = useMediaQuery('(min-width: 1180px)');
  const [active, setActive] = useState(DEFAULT_SKILL);
  const [filter, setFilter] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // The command palette can jump straight to a skill.
  useEffect(
    () =>
      listen(EVENTS.selectSkill, (symbol) => {
        const skill = SKILLS.find((item) => item.symbol === symbol);
        if (!skill) return;
        setActive(skill);
        setFilter(null);
        setSheetOpen(true);
      }),
    [],
  );

  useEffect(() => {
    if (!sheetOpen || wide) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSheetOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sheetOpen, wide]);

  const openSheet = (skill) => {
    const sameSkill = skill.symbol === active.symbol;
    setActive(skill);
    setSheetOpen((open) => !(open && sameSkill));
  };

  const isDimmed = (skill) => filter !== null && skill.group !== filter;

  const legendChip = (on) =>
    cx(
      'inline-flex items-center gap-2 rounded-full border px-[0.85rem] py-[0.45rem] text-[0.86rem] font-[550] transition-colors',
      on
        ? 'border-(--c) bg-[color-mix(in_oklab,var(--c)_15%,var(--surface))] text-ink'
        : 'border-line bg-surface text-ink-2 hover:border-(--c) hover:text-ink',
    );

  return (
    <section id="skills" className={cx(section, sectionTint)} aria-labelledby="skills-title" tabIndex={-1}>
      <div className="site-container [--wrap:1280px]">
        <SectionHeader
          id="skills-title"
          index="02"
          eyebrow="Periodic table of skills"
          title={
            <>
              Elements I <span className="text-molten">build with</span>
            </>
          }
          lead="Every tool in my stack as an element. Hover or tap a tile to inspect it, or filter by family. The glow shows the heat: white-hot is my daily core stack."
        />

        <Reveal>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter skills by family">
              <button
                type="button"
                className={legendChip(filter === null)}
                style={{ '--c': 'var(--ember)' }}
                aria-pressed={filter === null}
                onClick={() => setFilter(null)}
              >
                All <span className="font-mono text-[0.72rem] leading-none font-semibold text-ink-3">{SKILLS.length}</span>
              </button>
              {GROUP_ORDER.map((group) => (
                <button
                  key={group}
                  type="button"
                  className={legendChip(filter === group)}
                  style={groupStyle(group)}
                  aria-pressed={filter === group}
                  onClick={() => setFilter(filter === group ? null : group)}
                >
                  <i className="size-2.5 rounded-[3px] bg-(--c) shadow-[0_0_8px_var(--c)]" aria-hidden="true" />
                  {GROUPS[group].label}{' '}
                  <span className="font-mono text-[0.72rem] leading-none font-semibold text-ink-3">{COUNTS[group]}</span>
                </button>
              ))}
            </div>
            <p className="flex flex-wrap gap-x-[1.1rem] gap-y-[0.4rem] font-mono text-[0.76rem] leading-none font-medium text-ink-3">
              {Object.keys(HEAT).map((heat) => (
                <span key={heat} className="inline-flex items-center gap-[0.45rem]">
                  <HeatDot heat={heat} />
                  {HEAT[heat].label}
                </span>
              ))}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {wide ? (
            <div className="grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[repeat(5,auto)_18px_auto] gap-2">
              {/* Detail panel sits in the gap above the "d-block", like ptable.com; contain:size keeps rows sized by tiles. */}
              <Detail skill={active} className="col-start-3 col-end-9 row-start-1 row-end-4 contain-size" />
              {SKILLS.map((skill) => (
                <Tile
                  key={skill.symbol}
                  skill={skill}
                  placed
                  previewOnHover
                  active={skill.symbol === active.symbol}
                  dimmed={isDimmed(skill)}
                  onSelect={setActive}
                />
              ))}
              <p
                className="col-span-2 col-start-1 row-start-7 self-center justify-self-end pr-2 font-mono text-[0.75rem] leading-tight font-semibold tracking-[0.08em] text-(--g-concept) uppercase"
                aria-hidden="true"
              >
                ✱ Foundations
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {GROUP_ORDER.map((group) => (
                <div
                  key={group}
                  className={cx('transition-opacity duration-300', filter && filter !== group && 'opacity-40')}
                  style={groupStyle(group)}
                >
                  <h3 className="mb-[0.8rem] flex flex-wrap items-baseline gap-x-[0.6rem] gap-y-[0.35rem] font-display text-2xl leading-none font-extrabold tracking-[0.03em] uppercase">
                    <i className="size-3 self-center rounded-[3px] bg-(--c) shadow-[0_0_10px_var(--c)]" aria-hidden="true" />
                    {GROUPS[group].label}
                    <span className="font-sans text-[0.82rem] leading-snug font-normal tracking-normal text-ink-3 normal-case">
                      {GROUPS[group].family}
                    </span>
                  </h3>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(86px,1fr))] gap-2">
                    {SKILLS.filter((skill) => skill.group === group).map((skill) => (
                      <Tile
                        key={skill.symbol}
                        skill={skill}
                        active={sheetOpen && skill.symbol === active.symbol}
                        dimmed={isDimmed(skill)}
                        onSelect={openSheet}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>

      {/* Tablet/mobile: details open in a fixed sheet so the page never shifts under the user's finger. */}
      <AnimatePresence>
        {!wide && sheetOpen ? (
          <motion.div
            key="sheet"
            className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-90 mx-auto max-w-[560px]"
            role="dialog"
            aria-label={`${active.name} details`}
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            exit={{ y: '115%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          >
            <button
              type="button"
              className="absolute top-[0.7rem] right-[0.7rem] z-1 grid size-9 place-items-center rounded-xl border border-line bg-surface text-ink transition-colors hover:border-ember hover:text-ember-text"
              onClick={() => setSheetOpen(false)}
              aria-label="Close skill details"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <Detail
              skill={active}
              compact
              className="pr-[3.4rem] shadow-[0_0_0_1px_color-mix(in_oklab,var(--c)_45%,transparent),0_-12px_60px_-12px_rgb(0_0_0/0.75)]"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
