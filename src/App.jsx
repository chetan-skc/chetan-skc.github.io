// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { useCallback, useEffect, useRef, useState } from 'react';
import { About } from './components/about/About';
import { Contact } from './components/contact/Contact';
import { Experience } from './components/experience/Experience';
import { ForgeWall } from './components/forge/ForgeWall';
import { Hero } from './components/hero/Hero';
import { Footer } from './components/layout/Footer';
import { Nav } from './components/layout/Nav';
import { ScrollGauge } from './components/layout/ScrollGauge';
import { CommandPalette } from './components/palette/CommandPalette';
import { Projects } from './components/projects/Projects';
import { Skills } from './components/skills/Skills';
import { Terminal } from './components/terminal/Terminal';
import { SparkLayer } from './components/ui/SparkLayer';
import { ToastHost } from './components/ui/ToastHost';
import { useKonami } from './hooks/useKonami';
import { isTypingTarget } from './lib/dom';
import { EVENTS, listen, triggerOverheat } from './lib/events';
import { emitSparks } from './lib/sparks';
import { toast } from './lib/toast';

const OVERHEAT_MS = 6000;

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [overheating, setOverheating] = useState(false);
  const overheatTimer = useRef(0);

  useKonami(triggerOverheat);

  useEffect(() => {
    const stopPalette = listen(EVENTS.palette, () => {
      setTerminalOpen(false);
      setPaletteOpen(true);
    });
    const stopTerminal = listen(EVENTS.terminal, () => {
      setPaletteOpen(false);
      setTerminalOpen(true);
    });
    return () => {
      stopPalette();
      stopTerminal();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setTerminalOpen(false);
        setPaletteOpen((open) => !open);
        return;
      }
      if (event.key === '`' && !event.ctrlKey && !event.metaKey && !event.altKey && !isTypingTarget(event.target)) {
        event.preventDefault();
        setPaletteOpen(false);
        setTerminalOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Konami easter egg: the whole page overheats for a few seconds.
  useEffect(() => {
    const stop = listen(EVENTS.overheat, () => {
      const root = document.documentElement;
      if (root.classList.contains('is-overheating')) return;
      root.classList.add('is-overheating');
      setOverheating(true);
      toast({
        title: 'OVERHEAT! The forge hit 1538 °C',
        description: 'Achievement unlocked: you found the secret forge.',
        tone: 'achievement',
        icon: '🔥',
        duration: OVERHEAT_MS,
      });
      const { innerWidth: width, innerHeight: height } = window;
      for (let i = 0; i < 9; i++) {
        window.setTimeout(() => emitSparks(Math.random() * width, height * (0.25 + Math.random() * 0.6), 40, 1.4), i * 220);
      }
      window.clearTimeout(overheatTimer.current);
      overheatTimer.current = window.setTimeout(() => {
        root.classList.remove('is-overheating');
        setOverheating(false);
      }, OVERHEAT_MS);
    });
    return () => {
      stop();
      window.clearTimeout(overheatTimer.current);
      document.documentElement.classList.remove('is-overheating');
    };
  }, []);

  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  return (
    <>
      <a
        className="fixed -top-24 left-4 z-200 rounded-xl bg-ember px-[1.1rem] py-3 font-bold text-on-molten no-underline transition-[top] duration-200 focus:top-4"
        href="#main"
      >
        Skip to content
      </a>
      <ScrollGauge />
      <Nav />
      <main id="main" tabIndex={-1} className={overheating ? 'animate-shake' : undefined}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ForgeWall />
        <Contact />
      </main>
      <Footer />
      <SparkLayer />
      <ToastHost />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
      <Terminal open={terminalOpen} onClose={closeTerminal} />
      {overheating ? (
        <div
          className="pointer-events-none fixed inset-0 z-85 animate-overheat bg-[radial-gradient(120%_80%_at_50%_110%,rgb(255_110_20/0.55),rgb(255_60_0/0.16)_45%,transparent_70%),radial-gradient(60%_40%_at_50%_-10%,rgb(255_160_60/0.25),transparent_70%)]"
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
