// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { motion, useReducedMotion } from 'motion/react';

/** Fades content up once as it enters the viewport (no movement for reduced-motion users). */
export function Reveal({ children, className, delay = 0, y = 22 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
