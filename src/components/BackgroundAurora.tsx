import { motion } from 'framer-motion';

const BackgroundAurora = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Deep base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(250, 40%, 5%) 0%, hsl(270, 35%, 8%) 40%, hsl(250, 35%, 6%) 70%, hsl(240, 30%, 4%) 100%)',
        }}
      />

      {/* Large floating orbs */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full glow-orb"
        style={{
          background: 'radial-gradient(circle, hsl(170, 60%, 40%) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-[30%] -right-[20%] w-[70vw] h-[70vw] rounded-full glow-orb"
        style={{
          background: 'radial-gradient(circle, hsl(270, 50%, 35%) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full glow-orb"
        style={{
          background: 'radial-gradient(circle, hsl(340, 70%, 45%) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Subtle aurora streaks */}
      <motion.div
        className="absolute top-0 left-[10%] w-[2px] h-full"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(170, 60%, 50%) 30%, hsl(270, 50%, 50%) 60%, transparent 100%)',
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          x: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-0 right-[20%] w-[3px] h-full"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(340, 80%, 60%) 40%, hsl(45, 90%, 60%) 70%, transparent 100%)',
          filter: 'blur(25px)',
        }}
        animate={{
          opacity: [0.1, 0.25, 0.1],
          x: [0, -80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Subtle noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default BackgroundAurora;
