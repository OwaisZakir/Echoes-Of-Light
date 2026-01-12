import { useEffect, useRef, useCallback } from 'react';

/**
 * Lightweight liquid distortion effect using CSS and minimal canvas
 * Optimized for performance - no heavy WebGL shaders
 */
const WebGLDistortion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const lastTimeRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.targetX = e.clientX;
    mouseRef.current.targetY = e.clientY;
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
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = (time: number) => {
      // Throttle to ~30fps for performance
      if (time - lastTimeRef.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = time;

      const width = window.innerWidth;
      const height = window.innerHeight;
      
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw subtle glow at mouse position
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      gradient.addColorStop(0, 'hsla(170, 70%, 55%, 0.08)');
      gradient.addColorStop(0.3, 'hsla(270, 60%, 55%, 0.04)');
      gradient.addColorStop(0.6, 'hsla(340, 70%, 60%, 0.02)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add flowing wave effect
      const t = time * 0.0005;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.5);

      for (let x = 0; x <= width; x += 50) {
        const distFromMouse = Math.abs(x - mx) / width;
        const mouseInfluence = Math.max(0, 1 - distFromMouse * 2) * 30;
        const y = height * 0.5 + Math.sin(x * 0.003 + t) * 20 + Math.sin(x * 0.007 - t * 1.5) * 15 + mouseInfluence * Math.sin(t * 3);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const waveGradient = ctx.createLinearGradient(0, height * 0.3, 0, height);
      waveGradient.addColorStop(0, 'hsla(270, 50%, 20%, 0.03)');
      waveGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = waveGradient;
      ctx.fill();

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
      className="fixed inset-0 pointer-events-none z-[5]"
      aria-hidden="true"
    />
  );
};

export default WebGLDistortion;
