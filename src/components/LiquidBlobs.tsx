import { useEffect, useRef, useCallback, memo } from 'react';

interface Blob {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  baseRadius: number;
  hue: number;
  speed: number;
  angle: number;
  pulsePhase: number;
}

/**
 * Optimized liquid blobs with reduced particle count and throttled updates
 */
const LiquidBlobs = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<Blob[]>([]);
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
      initBlobs();
    };

    const initBlobs = () => {
      blobsRef.current = [];
      const hues = [170, 270, 340];
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Reduced to 3 blobs for better performance
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        blobsRef.current.push({
          x,
          y,
          targetX: x,
          targetY: y,
          radius: 200 + Math.random() * 150,
          baseRadius: 200 + Math.random() * 150,
          hue: hues[i],
          speed: 0.3 + Math.random() * 0.3,
          angle: Math.random() * Math.PI * 2,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
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

      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      blobsRef.current.forEach((blob, i) => {
        blob.angle += 0.002 * blob.speed;
        blob.targetX = (width / 2) + Math.cos(blob.angle + i) * (width * 0.25);
        blob.targetY = (height / 2) + Math.sin(blob.angle * 0.7 + i) * (height * 0.25);

        const dx = mouseRef.current.x - blob.x;
        const dy = mouseRef.current.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 500);
        
        blob.targetX += dx * influence * 0.2;
        blob.targetY += dy * influence * 0.2;

        blob.x += (blob.targetX - blob.x) * 0.015;
        blob.y += (blob.targetY - blob.y) * 0.015;

        blob.pulsePhase += 0.008;
        blob.radius = blob.baseRadius + Math.sin(blob.pulsePhase) * 25;

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, `hsla(${blob.hue}, 70%, 50%, 0.12)`);
        gradient.addColorStop(0.5, `hsla(${blob.hue}, 60%, 40%, 0.06)`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
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
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ filter: 'blur(80px)' }}
      aria-hidden="true"
    />
  );
});

LiquidBlobs.displayName = 'LiquidBlobs';

export default LiquidBlobs;
