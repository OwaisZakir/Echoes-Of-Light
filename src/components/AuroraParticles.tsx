import { useEffect, useRef } from 'react';
import { useIdle } from '@/hooks/useIdle';

interface FloatingParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  hue: number;
  speed: number;
  angle: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const AuroraParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FloatingParticle[]>([]);
  const animationRef = useRef<number>();
  const isIdle = useIdle(2000);
  const opacityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      const hues = [340, 170, 270, 45]; // rose, teal, violet, gold

      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: 1 + Math.random() * 3,
          hue: hues[Math.floor(Math.random() * hues.length)],
          speed: 0.2 + Math.random() * 0.5,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.3 + Math.random() * 0.5,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fade in/out based on idle state
      const targetOpacity = isIdle ? 1 : 0;
      opacityRef.current += (targetOpacity - opacityRef.current) * 0.02;

      if (opacityRef.current > 0.01) {
        particlesRef.current.forEach(p => {
          p.angle += p.speed * 0.01;
          const drift = Math.sin(time * 0.0005 + p.pulseOffset) * 30;
          p.x = p.baseX + Math.cos(p.angle) * 50 + drift;
          p.y = p.baseY + Math.sin(p.angle * 0.5) * 30;

          const pulse = (Math.sin(time * p.pulseSpeed + p.pulseOffset) + 1) * 0.5;
          const currentOpacity = p.opacity * opacityRef.current * (0.5 + pulse * 0.5);
          const currentSize = p.size * (0.8 + pulse * 0.4);

          // Outer glow
          const gradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, currentSize * 8
          );
          gradient.addColorStop(0, `hsla(${p.hue}, 70%, 60%, ${currentOpacity})`);
          gradient.addColorStop(0.3, `hsla(${p.hue}, 60%, 50%, ${currentOpacity * 0.5})`);
          gradient.addColorStop(1, `hsla(${p.hue}, 50%, 40%, 0)`);

          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize * 8, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${currentOpacity})`;
          ctx.fill();
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isIdle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default AuroraParticles;
