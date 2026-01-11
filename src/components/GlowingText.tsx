import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface GlowingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const GlowingText = ({ text, className = '', delay = 0 }: GlowingTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const letters = text.split('');

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Background glow layer */}
      <motion.div
        className="absolute inset-0 blur-2xl"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 0.5 } : {}}
        transition={{ duration: 2, delay: delay + 0.5 }}
        style={{
          background: 'linear-gradient(90deg, hsl(170, 60%, 55%), hsl(270, 50%, 55%), hsl(340, 80%, 70%))',
          backgroundSize: '200% 100%',
        }}
      />
      
      {/* Text layer */}
      <span className="relative block">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={isVisible ? { 
              opacity: 1, 
              y: 0, 
              filter: 'blur(0px)',
            } : {}}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              textShadow: '0 0 40px hsl(170, 60%, 55%), 0 0 80px hsl(270, 50%, 55%)',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </span>
    </div>
  );
};

export default GlowingText;
