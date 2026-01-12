import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import LiquidCursor from '@/components/LiquidCursor';
import LiquidBlobs from '@/components/LiquidBlobs';
import FluidDistortion from '@/components/FluidDistortion';
import ParticleVortex from '@/components/ParticleVortex';
import MorphingText from '@/components/MorphingText';
import MagneticButton from '@/components/MagneticButton';
import InkReveal from '@/components/InkReveal';
import GlitchText from '@/components/GlitchText';
import LightTrailCanvas from '@/components/LightTrailCanvas';
import AuroraParticles from '@/components/AuroraParticles';
import RippleEffect from '@/components/RippleEffect';
import WebGLDistortion from '@/components/WebGLDistortion';

// Dynamic values
const AUTHOR = 'Owais Zakir';
const CURRENT_YEAR = new Date().getFullYear();
const LAYER_COUNT = 8;

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Parallax transforms - memoized for performance
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.3], [0, -5]);

  // Mouse parallax for hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = useMemo(() => ({ damping: 30, stiffness: 100 }), []);
  const parallaxX = useSpring(useTransform(mouseX, [-500, 500], [-30, 30]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-500, 500], [-30, 30]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Dynamic stats
  const stats = useMemo(() => [
    { value: '∞', label: 'Infinite states' },
    { value: String(LAYER_COUNT), label: 'Light layers' },
    { value: '1', label: 'Unique you' },
  ], []);

  const flowCards = useMemo(() => ['Velocity', 'Direction', 'Intensity'], []);

  return (
    <>
      <Helmet>
        <title>ECHOES OF LIGHT | Interactive Experience by {AUTHOR}</title>
        <meta name="description" content={`An award-winning interactive web experience where your presence paints the digital canvas with light. Created by ${AUTHOR} in ${CURRENT_YEAR}.`} />
      </Helmet>

      <main ref={containerRef} className="relative min-h-[500vh] overflow-hidden" role="main">
        {/* === LAYER 0: Deep Background === */}
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div 
            className="absolute inset-0 bg-background"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 50% 0%, hsla(270, 40%, 15%, 0.5) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 100%, hsla(340, 50%, 15%, 0.4) 0%, transparent 50%),
                radial-gradient(ellipse 70% 50% at 10% 80%, hsla(170, 50%, 15%, 0.4) 0%, transparent 50%),
                linear-gradient(180deg, hsl(250, 40%, 4%) 0%, hsl(260, 35%, 6%) 30%, hsl(250, 30%, 5%) 70%, hsl(240, 40%, 3%) 100%)
              `,
            }}
          />
        </div>

        {/* === Interactive Layers (optimized) === */}
        <WebGLDistortion />
        <LiquidBlobs />
        <ParticleVortex />
        <FluidDistortion />
        <AuroraParticles />
        <LightTrailCanvas />
        <RippleEffect />
        <LiquidCursor />

        {/* === HERO SECTION === */}
        <motion.section 
          className="fixed inset-0 flex flex-col items-center justify-center z-20"
          style={{ 
            y: heroY, 
            opacity: heroOpacity, 
            scale: heroScale,
            rotateX: heroRotate,
          }}
          aria-label="Hero section"
        >
          {/* Floating orb behind text */}
          <motion.div
            className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
            style={{
              x: parallaxX,
              y: parallaxY,
              background: 'radial-gradient(circle, hsla(270, 60%, 40%, 0.15) 0%, hsla(170, 50%, 30%, 0.08) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          <motion.div 
            className="relative z-10 text-center px-4"
            style={{ x: useTransform(parallaxX, v => v * -0.5), y: useTransform(parallaxY, v => v * -0.5) }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="sr-only"
            >
              ECHOES OF LIGHT - Interactive Light Experience by {AUTHOR}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              aria-hidden="true"
            >
              <MorphingText 
                text="ECHOES"
                className="font-display text-[15vw] md:text-[12vw] font-light tracking-[0.15em] text-foreground leading-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              aria-hidden="true"
            >
              <MorphingText 
                text="OF LIGHT"
                className="font-display text-[8vw] md:text-[6vw] font-extralight tracking-[0.5em] text-foreground/70 -mt-2 md:-mt-4"
              />
            </motion.div>

            <motion.p
              className="mt-12 md:mt-16 text-muted-foreground/60 text-xs md:text-sm tracking-[0.4em] md:tracking-[0.5em] uppercase font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
            >
              <GlitchText text="Move · Hover · Pause · Click · Scroll" />
            </motion.p>

            <motion.div
              className="mt-10 md:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <MagneticButton>Enter the void</MagneticButton>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            aria-label="Scroll down to explore"
          >
            <motion.div
              className="w-6 h-10 rounded-full border border-glow-teal/30 flex items-start justify-center p-2"
              style={{ boxShadow: '0 0 20px hsla(170, 70%, 55%, 0.1)' }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-glow-teal"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <span className="mt-4 text-muted-foreground/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          </motion.div>
        </motion.section>

        {/* === CONTENT SECTIONS === */}
        <div className="relative z-30 pt-[100vh]">
          {/* Section 1: Presence */}
          <section className="min-h-screen flex items-center justify-center px-6 md:px-8 py-24 md:py-32" aria-labelledby="presence-heading">
            <div className="max-w-4xl">
              <InkReveal delay={0}>
                <h2 id="presence-heading" className="font-display text-4xl md:text-5xl lg:text-7xl font-light tracking-wide text-foreground mb-6 md:mb-8 leading-tight">
                  Your <span className="text-glow-teal">presence</span>
                  <br />
                  <span className="text-foreground/60">becomes art</span>
                </h2>
              </InkReveal>
              
              <InkReveal delay={0.2}>
                <p className="text-muted-foreground text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                  Every gesture leaves traces of luminescence. The canvas breathes with your movement, 
                  creating ephemeral sculptures of light that exist only in this moment.
                </p>
              </InkReveal>

              <InkReveal delay={0.4}>
                <div className="mt-10 md:mt-12 flex gap-6 md:gap-8 flex-wrap">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="text-center">
                      <div 
                        className={`text-3xl md:text-4xl font-display font-light mb-2 ${
                          i === 0 ? 'text-glow-teal' : i === 1 ? 'text-glow-rose' : 'text-glow-violet'
                        }`}
                        style={i === 2 ? { textShadow: '0 0 30px hsla(270, 60%, 60%, 0.6)' } : undefined}
                      >
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground/60 text-xs tracking-widest uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </InkReveal>
            </div>
          </section>

          {/* Section 2: Stillness */}
          <section className="min-h-screen flex items-center justify-center px-6 md:px-8 py-24 md:py-32" aria-labelledby="stillness-heading">
            <div className="max-w-4xl text-right">
              <InkReveal delay={0}>
                <h2 id="stillness-heading" className="font-display text-4xl md:text-5xl lg:text-7xl font-light tracking-wide text-foreground mb-6 md:mb-8 leading-tight">
                  <span className="text-foreground/60">In</span> <span className="text-glow-rose">stillness</span>
                  <br />
                  light awakens
                </h2>
              </InkReveal>
              
              <InkReveal delay={0.2}>
                <p className="text-muted-foreground text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl ml-auto">
                  Pause. Let the void breathe. Dormant particles emerge from darkness, 
                  drifting like bioluminescent creatures in an ocean of night.
                </p>
              </InkReveal>

              <InkReveal delay={0.4}>
                <div className="mt-10 md:mt-12 inline-block">
                  <MagneticButton>Experience stillness</MagneticButton>
                </div>
              </InkReveal>
            </div>
          </section>

          {/* Section 3: Touch */}
          <section className="min-h-screen flex items-center justify-center px-6 md:px-8 py-24 md:py-32" aria-labelledby="touch-heading">
            <div className="max-w-4xl text-center">
              <InkReveal delay={0}>
                <h2 id="touch-heading" className="font-display text-4xl md:text-5xl lg:text-7xl font-light tracking-wide text-foreground mb-6 md:mb-8 leading-tight">
                  Touch creates
                  <br />
                  <span 
                    className="inline-block"
                    style={{
                      background: 'linear-gradient(90deg, hsl(170, 60%, 55%), hsl(270, 50%, 55%), hsl(340, 80%, 70%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 30px hsla(270, 60%, 60%, 0.5))',
                    }}
                  >
                    ripples in reality
                  </span>
                </h2>
              </InkReveal>
              
              <InkReveal delay={0.2}>
                <p className="text-muted-foreground text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                  Each click sends waves expanding outward, distorting the fabric of this digital space. 
                  You are not just a viewer—you are the creator.
                </p>
              </InkReveal>
            </div>
          </section>

          {/* Section 4: Flow */}
          <section className="min-h-screen flex items-center justify-center px-6 md:px-8 py-24 md:py-32" aria-labelledby="flow-heading">
            <div className="max-w-4xl">
              <InkReveal delay={0}>
                <h2 id="flow-heading" className="font-display text-4xl md:text-5xl lg:text-7xl font-light tracking-wide text-foreground mb-6 md:mb-8 leading-tight">
                  Movement is
                  <br />
                  <span className="text-glow-violet" style={{ textShadow: '0 0 40px hsla(270, 60%, 60%, 0.6)' }}>liquid memory</span>
                </h2>
              </InkReveal>
              
              <InkReveal delay={0.2}>
                <p className="text-muted-foreground text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                  The faster you move, the more the light responds. Trails merge and flow like water, 
                  creating currents of color that echo your energy.
                </p>
              </InkReveal>

              <InkReveal delay={0.4}>
                <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {flowCards.map((label, i) => (
                    <motion.article
                      key={label}
                      className="p-5 md:p-6 rounded-2xl border border-glow-teal/10 bg-background/20 backdrop-blur-sm"
                      style={{ boxShadow: '0 0 30px hsla(170, 60%, 50%, 0.05)' }}
                      whileHover={{ 
                        scale: 1.02, 
                        borderColor: 'hsla(170, 70%, 55%, 0.3)',
                        boxShadow: '0 0 40px hsla(170, 60%, 50%, 0.15)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-glow-teal text-sm tracking-widest uppercase mb-2">0{i + 1}</div>
                      <h3 className="font-display text-xl md:text-2xl text-foreground/90">{label}</h3>
                      <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-glow-teal/50 to-transparent" 
                           style={{ width: `${60 + i * 15}%` }} />
                    </motion.article>
                  ))}
                </div>
              </InkReveal>
            </div>
          </section>

          {/* Final Section: You */}
          <section className="min-h-screen flex items-center justify-center px-6 md:px-8 py-24 md:py-32" aria-labelledby="final-heading">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            >
              <motion.h2
                id="final-heading"
                className="font-display text-[12vw] md:text-[10vw] font-light tracking-wide leading-none"
                style={{
                  background: 'linear-gradient(135deg, hsl(170, 60%, 55%) 0%, hsl(200, 70%, 60%) 25%, hsl(270, 50%, 55%) 50%, hsl(340, 80%, 70%) 75%, hsl(45, 90%, 65%) 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 60px hsla(270, 60%, 60%, 0.4))',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                You are
                <br />
                the light
              </motion.h2>

              <motion.footer
                className="mt-10 md:mt-12 text-muted-foreground/50 text-xs md:text-sm tracking-[0.4em] md:tracking-[0.5em] uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Created by {AUTHOR} · {CURRENT_YEAR}
              </motion.footer>

              <motion.div
                className="mt-12 md:mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <MagneticButton>Begin again</MagneticButton>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;
