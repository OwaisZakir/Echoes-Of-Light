import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface InkRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const InkReveal = ({ children, className = '', delay = 0 }: InkRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>

      {/* Ink mask effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: [0, 1, 1, 0] } : {}}
        transition={{
          duration: 1.5,
          delay,
          times: [0, 0.4, 0.6, 1],
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(170, 60%, 55%), hsl(270, 50%, 55%), transparent)',
          transformOrigin: 'left',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default InkReveal;
