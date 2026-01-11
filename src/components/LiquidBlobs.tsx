import { useEffect, useRef } from 'react';

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

const LiquidBlobs = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<Blob[]>([]);
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
      initBlobs();
    };

    const initBlobs = () => {
      blobsRef.current = [];
      const hues = [170, 270, 340, 200, 300];
      
      for (let i = 0; i < 6; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        blobsRef.current.push({
          x,
          y,
          targetX: x,
          targetY: y,
          radius: 150 + Math.random() * 200,
          baseRadius: 150 + Math.random() * 200,
          hue: hues[i % hues.length],
          speed: 0.5 + Math.random() * 0.5,
          angle: Math.random() * Math.PI * 2,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      blobsRef.current.forEach((blob, i) => {
        // Organic movement
        blob.angle += 0.002 * blob.speed;
        blob.targetX = (canvas.width / 2) + Math.cos(blob.angle + i) * (canvas.width * 0.3);
        blob.targetY = (canvas.height / 2) + Math.sin(blob.angle * 0.7 + i) * (canvas.height * 0.3);

        // Mouse influence - blobs are attracted/repelled by cursor
        const dx = mouseRef.current.x - blob.x;
        const dy = mouseRef.current.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 400);
        
        blob.targetX += dx * influence * 0.3;
        blob.targetY += dy * influence * 0.3;

        // Smooth movement
        blob.x += (blob.targetX - blob.x) * 0.02;
        blob.y += (blob.targetY - blob.y) * 0.02;

        // Pulsing radius
        blob.pulsePhase += 0.01;
        blob.radius = blob.baseRadius + Math.sin(blob.pulsePhase) * 30;

        // Draw blob with gradient
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, `hsla(${blob.hue}, 70%, 50%, 0.15)`);
        gradient.addColorStop(0.5, `hsla(${blob.hue}, 60%, 40%, 0.08)`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Metaball effect - draw connections between close blobs
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < blobsRef.current.length; i++) {
        for (let j = i + 1; j < blobsRef.current.length; j++) {
          const b1 = blobsRef.current[i];
          const b2 = blobsRef.current[j];
          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = b1.radius + b2.radius;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.1;
            const midX = (b1.x + b2.x) / 2;
            const midY = (b1.y + b2.y) / 2;
            const gradient = ctx.createRadialGradient(
              midX, midY, 0,
              midX, midY, dist / 2
            );
            gradient.addColorStop(0, `hsla(${(b1.hue + b2.hue) / 2}, 70%, 60%, ${alpha})`);
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.arc(midX, midY, dist / 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over';

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
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ filter: 'blur(60px)' }}
    />
  );
};

export default LiquidBlobs;
