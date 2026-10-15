// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { cx, eyebrow as eyebrowClass } from './classes';
import { Reveal } from './Reveal';

/** Section eyebrow, display title and lead. `id` labels the section via aria-labelledby. */
export function SectionHeader({ id, index, eyebrow, title, lead, center }) {
  return (
    <Reveal
      className={cx(
        'mb-[clamp(2.25rem,5vw,3.75rem)] grid max-w-[780px] gap-[0.9rem]',
        center && 'mx-auto justify-items-center text-center',
      )}
    >
      <p className={eyebrowClass}>
        <span aria-hidden="true">{index}</span> {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-[clamp(2.7rem,7vw,5rem)] leading-[0.92] font-extrabold tracking-[0.005em] text-balance uppercase"
      >
        {title}
      </h2>
      {lead ? <p className="max-w-[62ch] text-[clamp(1.03rem,1.5vw,1.18rem)] text-pretty text-ink-2">{lead}</p> : null}
    </Reveal>
  );
}
