// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { useInView } from 'motion/react';
import { Radio } from 'lucide-react';
import { useRef } from 'react';
import { useLiveStore } from '../../hooks/useLiveStore';
import { isLiveConfigured } from '../../lib/liveStore';
import { card, cx, displayTitle, section } from '../ui/classes';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Anvil } from './Anvil';
import { Guestbook } from './Guestbook';

const PANEL = cx(card, 'p-[clamp(1.25rem,3vw,1.9rem)]');
const PANEL_TITLE = cx(displayTitle, 'text-2xl tracking-[0.04em]');

export function ForgeWall() {
  const sectionRef = useRef(null);
  const near = useInView(sectionRef, { once: true, margin: '600px 0px' });
  const store = useLiveStore(near);
  const live = store?.mode === 'firebase';

  const modeNote = live
    ? 'Live: the counter and the wall update in real time for every visitor.'
    : import.meta.env.DEV
      ? 'Demo mode: data is saved in this browser only. Add Firebase keys to .env.local to make it global (see README).'
      : 'Your sparks and notes are saved on this device.';

  return (
    <section ref={sectionRef} id="forge" className={section} aria-labelledby="forge-title" tabIndex={-1}>
      <div className="site-container">
        <SectionHeader
          id="forge-title"
          index="05"
          eyebrow="The Forge Wall"
          title={
            <>
              Strike the anvil, <span className="text-molten">leave your mark</span>
            </>
          }
          lead={
            isLiveConfigured
              ? 'A small live corner of the site. Every strike adds a spark to a counter shared by every visitor, and the wall keeps notes from people passing through.'
              : 'A small playful corner of the site. Strike the anvil to throw sparks, then stamp a note onto the wall.'
          }
        />

        <div className="grid items-start gap-5 min-[981px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal className={cx(PANEL, 'bg-[radial-gradient(80%_70%_at_50%_100%,rgb(255_90_10/0.16),transparent_70%)]')}>
            <h3 className={PANEL_TITLE}>The anvil</h3>
            <Anvil store={store} />
          </Reveal>
          <Reveal className={PANEL} delay={0.1}>
            <h3 className={PANEL_TITLE}>The wall</h3>
            <Guestbook store={store} />
          </Reveal>
        </div>

        <p
          className={cx(
            'mt-[1.1rem] flex items-center gap-2 font-mono text-[0.78rem] leading-snug font-medium',
            live ? 'text-success' : 'text-ink-3',
          )}
        >
          <Radio size={14} aria-hidden="true" /> {modeNote}
        </p>
      </div>
    </section>
  );
}
