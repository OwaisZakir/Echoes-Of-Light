import { useEffect, useRef, useCallback, memo } from 'react';

/**
 * Optimized fluid wave lines with reduced complexity
 */
const FluidDistortion = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
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
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = (time: number) => {
      // Throttle to ~24fps
      if (time - lastTimeRef.current < 42) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = time;
      timeRef.current += 0.005;

      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      // Reduced to 20 lines
      const lines = 20;
      for (let i = 0; i < lines; i++) {
        const progress = i / lines;
        const y = height * progress;
        
        ctx.beginPath();
        ctx.moveTo(0, y);

        // Larger step size for fewer calculations
        for (let x = 0; x <= width; x += 40) {
          let offsetY = Math.sin(x * 0.004 + timeRef.current + progress * Math.PI) * 15;
          offsetY += Math.sin(x * 0.002 - timeRef.current * 0.6) * 10;

          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 350);
          offsetY += influence * 35 * Math.sin(timeRef.current * 2.5);

          ctx.lineTo(x, y + offsetY);
        }

        const hue = 170 + progress * 80;
        ctx.strokeStyle = `hsla(${hue}, 55%, 55%, ${0.02 + progress * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

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
      className="fixed inset-0 pointer-events-none z-[3]"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
});

FluidDistortion.displayName = 'FluidDistortion';

export default FluidDistortion;
