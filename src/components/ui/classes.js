// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]

/** Joins truthy class names. */
export const cx = (...names) => names.filter(Boolean).join(' ');

export const section = 'relative py-[clamp(5rem,11vw,8.5rem)]';
export const sectionTint =
  'bg-[linear-gradient(180deg,transparent,var(--bg-2)_10%,var(--bg-2)_90%,transparent)]';

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-full border font-semibold leading-tight whitespace-nowrap no-underline transition-[translate,scale,box-shadow,background-position,border-color,color] duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60';

const btnSizes = {
  md: 'px-[1.35rem] py-[0.85rem] text-[0.98rem]',
  sm: 'px-[0.95rem] py-[0.55rem] text-[0.88rem]',
};

const btnVariants = {
  molten:
    'border-transparent bg-(image:--molten) bg-size-[180%_100%] text-on-molten shadow-[0_10px_30px_-12px_rgb(255_90_10/0.75)] hover:bg-right hover:shadow-[0_16px_40px_-12px_rgb(255_90_10/0.95)]',
  ghost: 'border-line-strong bg-surface/65 text-ink hover:border-ember',
};

/** Pill button classes: button('molten' | 'ghost', 'md' | 'sm'). */
export const button = (variant = 'molten', size = 'md') => cx(btnBase, btnSizes[size], btnVariants[variant]);

export const iconBtn =
  'inline-grid size-[42px] place-items-center rounded-xl border border-line bg-surface/70 text-ink no-underline transition-[border-color,color,translate] duration-200 hover:-translate-y-px hover:border-ember hover:text-ember-text';

export const chip =
  'inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-[0.7rem] py-[0.28rem] font-mono text-[0.78rem] leading-snug font-medium whitespace-nowrap text-ink-2';

export const chipList = 'flex flex-wrap gap-[0.45rem]';

export const card = 'rounded-3xl border border-line bg-surface shadow-(--shadow)';

export const eyebrow =
  'inline-flex items-center gap-2.5 font-mono text-[0.78rem] leading-tight font-semibold tracking-[0.16em] text-ember-text uppercase before:h-0.5 before:w-[30px] before:rounded-full before:bg-(image:--molten)';

export const monoLabel = 'font-mono text-[0.72rem] leading-none font-semibold tracking-[0.1em] text-ink-3 uppercase';

export const displayTitle = 'font-display leading-none font-extrabold uppercase';

export const field = 'grid content-start gap-[0.45rem]';

export const fieldLabel = 'font-mono text-[0.76rem] leading-tight font-semibold tracking-[0.1em] text-ink-2 uppercase';

export const fieldInput =
  'w-full resize-y rounded-xl border border-line-strong bg-base px-4 py-[0.85rem] leading-normal text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-ink-3 focus:border-ember focus:shadow-[0_0_0_4px_rgb(255_122_26/0.18)] focus:outline-none aria-[invalid=true]:border-danger';

export const fieldError = 'text-[0.85rem] text-danger';

export const honeypot = 'absolute -left-[10000px] size-px overflow-hidden';
