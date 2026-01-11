import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 text-glow-rose"
        style={{ clipPath: 'inset(0 0 50% 0)' }}
        animate={isGlitching ? {
          x: [0, -3, 3, -1, 0],
          opacity: [0, 1, 1, 1, 0],
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute inset-0 text-glow-teal"
        style={{ clipPath: 'inset(50% 0 0 0)' }}
        animate={isGlitching ? {
          x: [0, 3, -3, 1, 0],
          opacity: [0, 1, 1, 1, 0],
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.span>
    </span>
  );
};

export default GlitchText;
