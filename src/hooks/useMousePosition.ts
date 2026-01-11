import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  isMoving: boolean;
}

export const useMousePosition = () => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0, isMoving: false });
  const [lastMoveTime, setLastMoveTime] = useState(Date.now());

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY, isMoving: true });
    setLastMoveTime(Date.now());
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    const idleCheck = setInterval(() => {
      if (Date.now() - lastMoveTime > 100) {
        setPosition(prev => ({ ...prev, isMoving: false }));
      }
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(idleCheck);
    };
  }, [handleMouseMove, lastMoveTime]);

  return position;
};
