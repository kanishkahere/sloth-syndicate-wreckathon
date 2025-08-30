import { useEffect, useRef, useState } from 'react';
import { sfxGoat, sfxGlitch } from '@/lib/sfx';
import slothImg from '@/assets/lag-the-sloth.png';

interface SlothJumpScareProps {
  minDelayMs?: number; // minimum time between scares
  maxDelayMs?: number; // maximum time between scares
  enabled?: boolean;
}

export const SlothJumpScare = ({ minDelayMs = 30000, maxDelayMs = 60000, enabled = true }: SlothJumpScareProps) => {
  const [show, setShow] = useState(false);
  const timer = useRef<number | null>(null);

  const schedule = () => {
    if (!enabled) return;
    const next = Math.floor(Math.random() * (maxDelayMs - minDelayMs)) + minDelayMs;
    timer.current = window.setTimeout(() => {
      setShow(true);
      try { sfxGoat(); sfxGlitch(); } catch {}
      window.setTimeout(() => setShow(false), 1200);
      schedule();
    }, next);
  };

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || !enabled) return;
    schedule();
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70" onClick={() => setShow(false)}>
      <div className="relative animate-[screen-shake_0.6s_linear_infinite]">
        <img src={slothImg} alt="Sloth jump scare" className="w-[280px] h-[280px] object-contain drop-shadow-2xl" />
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-black font-black px-3 py-1 rounded shadow-harsh" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Black", sans-serif' }}>
          PROCRASTINATOR!!
        </div>
      </div>
    </div>
  );
};

export default SlothJumpScare;
