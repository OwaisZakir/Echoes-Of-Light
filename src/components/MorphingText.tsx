import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface MorphingTextProps {
  text: string;
  className?: string;
}

const MorphingText = ({ text, className = '' }: MorphingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const letters = text.split('');

  return (
    <motion.div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {letters.map((letter, i) => (
        <MorphingLetter
          key={i}
          letter={letter}
          index={i}
          total={letters.length}
          mouseX={mouseX}
          mouseY={mouseY}
          isHovered={isHovered}
        />
      ))}
    </motion.div>
  );
};

interface MorphingLetterProps {
  letter: string;
  index: number;
  total: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  isHovered: boolean;
}

const MorphingLetter = ({ letter, index, total, mouseX, mouseY, isHovered }: MorphingLetterProps) => {
  const springConfig = { damping: 20, stiffness: 150 };
  
  const x = useSpring(useTransform(mouseX, (v) => {
    const offset = (index - total / 2) / total;
    return isHovered ? v * 0.05 * (1 - Math.abs(offset)) : 0;
  }), springConfig);
  
  const y = useSpring(useTransform(mouseY, (v) => {
    const wave = Math.sin((index / total) * Math.PI);
    return isHovered ? v * 0.08 * wave : 0;
  }), springConfig);

  const rotate = useSpring(useTransform(mouseX, (v) => {
    return isHovered ? v * 0.02 * (index % 2 === 0 ? 1 : -1) : 0;
  }), springConfig);

  const scale = useSpring(isHovered ? 1.05 : 1, springConfig);

  return (
    <motion.span
      className="inline-block transition-colors duration-300"
      style={{
        x,
        y,
        rotate,
        scale,
        textShadow: isHovered 
          ? '0 0 40px hsla(170, 70%, 60%, 0.8), 0 0 80px hsla(270, 60%, 60%, 0.5)'
          : '0 0 20px hsla(170, 70%, 60%, 0.4)',
      }}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  );
};

export default MorphingText;
