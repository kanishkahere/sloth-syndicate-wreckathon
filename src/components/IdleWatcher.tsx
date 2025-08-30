import { useEffect, useRef } from 'react';

interface IdleWatcherProps { idleMs?: number }

export const IdleWatcher = ({ idleMs = 600000 }: IdleWatcherProps) => {
  const timer = useRef<number | null>(null);

  const fire = () => {
    document.body.classList.add('idle-red');
    try { window.dispatchEvent(new CustomEvent('caption:show', { detail: 'Bro… STILL scrolling?' })); } catch {}
  };

  const reset = () => {
    document.body.classList.remove('idle-red');
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fire, idleMs);
  };

  useEffect(() => {
    reset();
    const onAny = () => reset();
    ['mousemove','keydown','scroll','click','touchstart'].forEach(ev => window.addEventListener(ev, onAny, { passive: true } as any));
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      ['mousemove','keydown','scroll','click','touchstart'].forEach(ev => window.removeEventListener(ev, onAny as any));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default IdleWatcher;
