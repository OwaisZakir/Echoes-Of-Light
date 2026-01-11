import { motion, useScroll, useTransform } from 'framer-motion';
import LightTrailCanvas from '@/components/LightTrailCanvas';
import AuroraParticles from '@/components/AuroraParticles';
import RippleEffect from '@/components/RippleEffect';
import ScrollWaves from '@/components/ScrollWaves';
import GlowingText from '@/components/GlowingText';
import BackgroundAurora from '@/components/BackgroundAurora';
import FloatingElement from '@/components/FloatingElement';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  return (
    <div className="relative min-h-[400vh]">
      {/* Background layers */}
      <BackgroundAurora />
      <ScrollWaves />
      <AuroraParticles />
      <LightTrailCanvas />
      <RippleEffect />

      {/* Hero Section */}
      <motion.section 
        className="fixed inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <FloatingElement delay={0} duration={8} range={10}>
          <GlowingText 
            text="ECHOES" 
            className="font-display text-[12vw] md:text-[10vw] font-light tracking-[0.2em] text-foreground"
            delay={0.2}
          />
        </FloatingElement>
        
        <FloatingElement delay={0.5} duration={7} range={8}>
          <GlowingText 
            text="OF LIGHT" 
            className="font-display text-[8vw] md:text-[6vw] font-extralight tracking-[0.4em] text-foreground/80 -mt-4 md:-mt-8"
            delay={0.8}
          />
        </FloatingElement>

        <motion.p
          className="mt-12 md:mt-16 text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.5, ease: 'easeOut' }}
        >
          Move · Scroll · Pause · Click
        </motion.p>

        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="text-muted-foreground/60 text-xs tracking-widest">SCROLL TO EXPLORE</span>
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-glow-teal/50 to-transparent"
            animate={{ 
              scaleY: [1, 0.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.section>

      {/* Content Sections */}
      <div className="relative z-30 pt-[100vh]">
        {/* Section 1 */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            className="max-w-3xl text-center"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <FloatingElement delay={0.2} range={8}>
              <h2 className="text-glow font-display text-4xl md:text-6xl font-light tracking-wide text-foreground mb-8">
                Your presence
                <br />
                <span className="text-glow-teal">illuminates</span>
              </h2>
            </FloatingElement>
            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed tracking-wide">
              Every movement you make leaves traces of light. The canvas responds to your essence, 
              painting ephemeral auroras that fade like memories.
            </p>
          </motion.div>
        </section>

        {/* Section 2 */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            className="max-w-3xl text-center"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <FloatingElement delay={0.4} range={10}>
              <h2 className="text-glow font-display text-4xl md:text-6xl font-light tracking-wide text-foreground mb-8">
                <span className="text-glow-rose">Stillness</span>
                <br />
                reveals more
              </h2>
            </FloatingElement>
            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed tracking-wide">
              Pause. Be still. Watch as dormant particles awaken, drifting through space like 
              fireflies in the cosmic dark, waiting for your attention.
            </p>
          </motion.div>
        </section>

        {/* Section 3 */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            className="max-w-3xl text-center"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <FloatingElement delay={0.3} range={6}>
              <h2 className="text-glow font-display text-4xl md:text-6xl font-light tracking-wide text-foreground mb-8">
                Touch creates
                <br />
                <span className="text-glow-teal">ripples</span>
              </h2>
            </FloatingElement>
            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed tracking-wide">
              A single click sends waves of energy expanding outward. Each interaction 
              is a moment of creation, a bloom of light in the void.
            </p>
          </motion.div>
        </section>

        {/* Final Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <FloatingElement duration={10} range={12}>
              <h2 
                className="font-display text-6xl md:text-8xl font-light tracking-[0.1em] mb-6"
                style={{
                  background: 'linear-gradient(135deg, hsl(170, 60%, 55%) 0%, hsl(270, 50%, 55%) 50%, hsl(340, 80%, 70%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px hsl(270, 50%, 55%))',
                }}
              >
                You are light
              </h2>
            </FloatingElement>
            <motion.p 
              className="text-muted-foreground/60 text-sm tracking-[0.4em] uppercase mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              An experiment in presence
            </motion.p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Index;
