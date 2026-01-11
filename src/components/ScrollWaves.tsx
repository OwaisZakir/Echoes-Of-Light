import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollWaves = () => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  const wave1Y = useTransform(scrollY, [0, 1000], [0, 100]);
  const wave2Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const wave3Y = useTransform(scrollY, [0, 1000], [0, 80]);

  useEffect(() => {
    let rafId: number;
    
    const updateVelocity = () => {
      const currentY = window.scrollY;
      const velocity = Math.abs(currentY - lastScrollY.current);
      setScrollVelocity(Math.min(velocity * 2, 100));
      lastScrollY.current = currentY;
      
      // Decay velocity
      if (scrollVelocity > 0) {
        setScrollVelocity(prev => prev * 0.95);
      }
      
      rafId = requestAnimationFrame(updateVelocity);
    };

    rafId = requestAnimationFrame(updateVelocity);
    return () => cancelAnimationFrame(rafId);
  }, [scrollVelocity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Wave 1 - Teal */}
      <motion.div
        style={{ y: wave1Y }}
        className="absolute left-0 right-0 h-[200px]"
        animate={{
          opacity: 0.15 + scrollVelocity * 0.005,
          filter: `blur(${80 - scrollVelocity * 0.3}px)`,
        }}
        transition={{ duration: 0.1 }}
      >
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(170, 60%, 55%) 50%, transparent 100%)',
            transform: 'translateY(30vh)',
          }}
        />
      </motion.div>

      {/* Wave 2 - Violet */}
      <motion.div
        style={{ y: wave2Y }}
        className="absolute left-0 right-0 h-[300px]"
        animate={{
          opacity: 0.1 + scrollVelocity * 0.004,
          filter: `blur(${100 - scrollVelocity * 0.4}px)`,
        }}
        transition={{ duration: 0.1 }}
      >
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(270, 50%, 55%) 50%, transparent 100%)',
            transform: 'translateY(50vh)',
          }}
        />
      </motion.div>

      {/* Wave 3 - Rose */}
      <motion.div
        style={{ y: wave3Y }}
        className="absolute left-0 right-0 h-[250px]"
        animate={{
          opacity: 0.12 + scrollVelocity * 0.003,
          filter: `blur(${90 - scrollVelocity * 0.35}px)`,
        }}
        transition={{ duration: 0.1 }}
      >
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(340, 80%, 70%) 50%, transparent 100%)',
            transform: 'translateY(70vh)',
          }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollWaves;
