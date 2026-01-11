import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
  hue: number;
}

const RippleEffect = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = useCallback((e: MouseEvent) => {
    const hues = [340, 170, 270];
    const newRipple: Ripple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      hue: hues[Math.floor(Math.random() * hues.length)],
    };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1500);
  }, []);

  useEffect(() => {
    window.addEventListener('click', createRipple);
    return () => window.removeEventListener('click', createRipple);
  }, [createRipple]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 100,
              height: 100,
              marginLeft: -50,
              marginTop: -50,
              background: `radial-gradient(circle, hsla(${ripple.hue}, 80%, 70%, 0.4) 0%, hsla(${ripple.hue}, 60%, 50%, 0.2) 40%, transparent 70%)`,
              boxShadow: `0 0 60px hsla(${ripple.hue}, 80%, 60%, 0.5)`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RippleEffect;
