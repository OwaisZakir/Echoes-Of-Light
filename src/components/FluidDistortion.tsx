import { useEffect, useRef } from 'react';

const FluidDistortion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const ripples: Array<{ x: number; y: number; radius: number; strength: number; life: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      velocityRef.current.x = mouseRef.current.x - mouseRef.current.prevX;
      velocityRef.current.y = mouseRef.current.y - mouseRef.current.prevY;

      // Create ripples based on velocity
      const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
      if (speed > 5 && ripples.length < 20) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          strength: Math.min(speed * 0.5, 30),
          life: 1,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flowing lines
      const lines = 40;
      for (let i = 0; i < lines; i++) {
        const progress = i / lines;
        const y = canvas.height * progress;
        
        ctx.beginPath();
        ctx.moveTo(0, y);

        for (let x = 0; x <= canvas.width; x += 20) {
          // Base wave
          let offsetY = Math.sin(x * 0.005 + time + progress * Math.PI) * 20;
          offsetY += Math.sin(x * 0.003 - time * 0.7) * 15;

          // Mouse influence
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 300);
          offsetY += influence * 50 * Math.sin(time * 3);

          // Ripple influence
          ripples.forEach(ripple => {
            const rdx = x - ripple.x;
            const rdy = y - ripple.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            if (rdist < ripple.radius + 50 && rdist > ripple.radius - 50) {
              const rippleInfluence = (1 - Math.abs(rdist - ripple.radius) / 50) * ripple.life;
              offsetY += Math.sin(rdist * 0.1) * ripple.strength * rippleInfluence;
            }
          });

          ctx.lineTo(x, y + offsetY);
        }

        // Gradient stroke
        const hue = 170 + progress * 100;
        ctx.strokeStyle = `hsla(${hue}, 60%, 55%, ${0.03 + progress * 0.02})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].radius += 8;
        ripples[i].life -= 0.015;
        if (ripples[i].life <= 0) {
          ripples.splice(i, 1);
        }
      }

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
      className="fixed inset-0 pointer-events-none z-[3]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default FluidDistortion;
