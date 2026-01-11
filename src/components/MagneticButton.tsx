import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

const MagneticButton = ({ children, className = '' }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block group cursor-pointer ${className}`}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, hsla(170, 70%, 55%, 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
          scale: 1.5,
        }}
      />
      
      {/* Border glow */}
      <div 
        className="relative px-8 py-4 rounded-full border border-glow-teal/30 bg-midnight-mid/50 backdrop-blur-sm
                   group-hover:border-glow-teal/60 transition-all duration-500"
        style={{
          boxShadow: '0 0 20px hsla(170, 70%, 55%, 0.1), inset 0 0 20px hsla(170, 70%, 55%, 0.05)',
        }}
      >
        <span className="relative z-10 text-foreground/80 group-hover:text-foreground transition-colors duration-300 font-light tracking-widest text-sm uppercase whitespace-nowrap">
          {children}
        </span>
      </div>
    </motion.div>
  );
};

export default MagneticButton;
