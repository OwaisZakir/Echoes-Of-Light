import { useEffect, useRef, useCallback, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  hue: number;
  angle: number;
  radius: number;
  speed: number;
  opacity: number;
}

/**
 * Optimized particle vortex with reduced particle count
 */
const ParticleVortex = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const lastTimeRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      // Reduced to 80 particles
      const count = 80;
      const hues = [170, 270, 340];

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 * 3;
        const radius = 60 + (i / count) * Math.min(width, height) * 0.35;
        particlesRef.current.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          size: 1 + Math.random() * 1.5,
          hue: hues[Math.floor(Math.random() * hues.length)],
          angle,
          radius,
          speed: 0.003 + Math.random() * 0.002,
          opacity: 0.4 + Math.random() * 0.4,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = (time: number) => {
      // Throttle to ~30fps
      if (time - lastTimeRef.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = time;

      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Fade trail effect
      ctx.fillStyle = 'rgba(10, 10, 26, 0.08)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const mouseInfluence = 0.25;
      const attractX = centerX + (mouseRef.current.x - centerX) * mouseInfluence;
      const attractY = centerY + (mouseRef.current.y - centerY) * mouseInfluence;

      particlesRef.current.forEach((p) => {
        p.angle += p.speed;
        
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 1 - dist / 250);
        const dynamicRadius = p.radius * (1 - pull * 0.25);
        
        p.x = attractX + Math.cos(p.angle) * dynamicRadius;
        p.y = attractY + Math.sin(p.angle) * dynamicRadius;

        // Simple circle instead of gradient for performance
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ mixBlendMode: 'screen', opacity: 0.6 }}
      aria-hidden="true"
    />
  );
});

ParticleVortex.displayName = 'ParticleVortex';

export default ParticleVortex;
