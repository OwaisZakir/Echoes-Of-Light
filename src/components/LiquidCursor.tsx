import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const LiquidCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailConfig = { damping: 35, stiffness: 100, mass: 1 };
  const trailXSpring = useSpring(cursorX, trailConfig);
  const trailYSpring = useSpring(cursorY, trailConfig);

  const trail2Config = { damping: 45, stiffness: 60, mass: 1.5 };
  const trail2XSpring = useSpring(cursorX, trail2Config);
  const trail2YSpring = useSpring(cursorY, trail2Config);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`* { cursor: none !important; }`}</style>
      
      {/* Outer liquid trail 2 */}
      <motion.div
        className="fixed pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: trail2XSpring,
          y: trail2YSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(270, 60%, 60%, 0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>

      {/* Outer liquid trail */}
      <motion.div
        className="fixed pointer-events-none z-[101] mix-blend-screen"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="w-20 h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(170, 70%, 55%, 0.25) 0%, hsla(340, 80%, 65%, 0.1) 50%, transparent 70%)',
            filter: 'blur(12px)',
          }}
        />
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[102]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(0, 0%, 100%, 0.9) 0%, hsla(170, 70%, 70%, 0.6) 60%, transparent 100%)',
            boxShadow: '0 0 20px hsla(170, 70%, 60%, 0.8), 0 0 40px hsla(270, 60%, 60%, 0.4)',
          }}
        />
      </motion.div>
    </>
  );
};

export default LiquidCursor;
