import { useEffect, useRef } from 'react';

interface FailWatcherProps { threshold?: number; windowMs?: number }

export const FailWatcher = ({ threshold = 3, windowMs = 60000 }: FailWatcherProps) => {
  const events = useRef<number[]>([]);
  useEffect(() => {
    const onMock = () => {
      const now = Date.now();
      events.current = [...events.current.filter(t => now - t < windowMs), now];
      if (events.current.length >= threshold) {
        document.body.classList.add('skill-issue');
        try { window.dispatchEvent(new CustomEvent('caption:show', { detail: 'Skill issue 🤡.' })); } catch {}
        setTimeout(() => document.body.classList.remove('skill-issue'), 1500);
        events.current = [];
      }
    };
    window.addEventListener('sloth:mock', onMock as EventListener);
    return () => window.removeEventListener('sloth:mock', onMock as EventListener);
  }, [threshold, windowMs]);
  return null;
};

export default FailWatcher;
