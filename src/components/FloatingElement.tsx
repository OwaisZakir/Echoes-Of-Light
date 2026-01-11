import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  range?: number;
  className?: string;
}

const FloatingElement = ({ 
  children, 
  delay = 0, 
  duration = 6, 
  range = 15,
  className = '' 
}: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -range, 0, range * 0.5, 0],
        rotate: [-1, 1, -0.5, 1, -1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
