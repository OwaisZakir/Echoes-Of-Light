import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  hue: number;
  angle: number;
  radius: number;
  speed: number;
  opacity: number;
}

const ParticleVortex = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

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
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const count = 200;
      const hues = [170, 200, 270, 300, 340];

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 * 3;
        const radius = 50 + (i / count) * Math.min(canvas.width, canvas.height) * 0.4;
        particlesRef.current.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          baseX: centerX,
          baseY: centerY,
          size: 1 + Math.random() * 2,
          hue: hues[Math.floor(Math.random() * hues.length)],
          angle,
          radius,
          speed: 0.002 + Math.random() * 0.003,
          opacity: 0.3 + Math.random() * 0.5,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 26, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Mouse influence on center
      const mouseInfluence = 0.3;
      const attractX = centerX + (mouseRef.current.x - centerX) * mouseInfluence;
      const attractY = centerY + (mouseRef.current.y - centerY) * mouseInfluence;

      particlesRef.current.forEach((p, i) => {
        // Spiral motion
        p.angle += p.speed;
        
        // Dynamic radius based on mouse proximity
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 1 - dist / 200);
        
        const dynamicRadius = p.radius * (1 - pull * 0.3);
        
        p.x = attractX + Math.cos(p.angle) * dynamicRadius;
        p.y = attractY + Math.sin(p.angle) * dynamicRadius;

        // Breathing opacity
        const breathe = Math.sin(p.angle * 2) * 0.2 + 0.8;
        
        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${p.opacity * breathe})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 70%, 60%, ${p.opacity * breathe * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < Math.min(i + 5, particlesRef.current.length); j++) {
          const p2 = particlesRef.current[j];
          const pdx = p2.x - p.x;
          const pdy = p2.y - p.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          
          if (pdist < 50) {
            const alpha = (1 - pdist / 50) * 0.15 * breathe;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2}, 60%, 60%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ mixBlendMode: 'screen', opacity: 0.7 }}
    />
  );
};

export default ParticleVortex;
