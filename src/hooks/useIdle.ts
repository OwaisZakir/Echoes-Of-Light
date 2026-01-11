import { useState, useEffect, useCallback } from 'react';

export const useIdle = (timeout: number = 3000) => {
  const [isIdle, setIsIdle] = useState(false);

  const resetTimer = useCallback(() => {
    setIsIdle(false);
  }, []);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const handleActivity = () => {
      resetTimer();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), timeout);
    };

    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, handleActivity));

    // Start the timer
    idleTimer = setTimeout(() => setIsIdle(true), timeout);

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      clearTimeout(idleTimer);
    };
  }, [timeout, resetTimer]);

  return isIdle;
};
