// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { useEffect, useRef } from 'react';
import { EVENTS, listen } from '../../lib/events';
import { createSparkSystem } from '../../lib/sparks';

/** Full-viewport, click-through canvas that renders every spark burst on the page. */
export function SparkLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const system = createSparkSystem(canvas, { maxParticles: 700 });
    const onResize = () => system.resize();
    window.addEventListener('resize', onResize);
    const stopListening = listen(EVENTS.burst, ({ x, y, count, power }) => system.burst(x, y, count, power));
    return () => {
      window.removeEventListener('resize', onResize);
      stopListening();
      system.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-80 size-full" aria-hidden="true" />;
}
