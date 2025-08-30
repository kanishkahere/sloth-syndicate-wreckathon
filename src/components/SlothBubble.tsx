import { useEffect, useRef, useState } from 'react';
import { LagTheSloth } from '@/components/LagTheSloth';

const IDLE_LINES = [
  'PROD LEVEL: -100 💀🔥😭',
  'THIS TASK? GHOSTED LIKE UR CRUSH.',
  'BRO… STILL SCROLLING?',
];

export type SlothMode = 'idle' | 'mock' | 'celebrate';

export const SlothBubble = () => {
  const [mode, setMode] = useState<SlothMode>('idle');
  const [line, setLine] = useState<string>('PROD LEVEL: -100 💀🔥😭');
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const idleTimer = useRef<number | null>(null);

  const show = (text: string, newMode: SlothMode, ms = 1800) => {
    setMode(newMode);
    setLine(text.toUpperCase());
    setVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setVisible(false), ms);
  };

  // idle cycle
  useEffect(() => {
    const cycle = () => {
      show(IDLE_LINES[Math.floor(Math.random()*IDLE_LINES.length)], 'idle', 1600);
      idleTimer.current = window.setTimeout(cycle, 14000);
    };
    idleTimer.current = window.setTimeout(cycle, 9000);
    return () => { if (idleTimer.current) window.clearTimeout(idleTimer.current); };
  }, []);

  // event listeners
  useEffect(() => {
    const onCelebrate = () => show('SHEEEESH PRODUCTIVITY', 'celebrate', 1500);
    const onMock = () => show('BRO 💀', 'mock', 1500);
    window.addEventListener('sloth:celebrate', onCelebrate as EventListener);
    window.addEventListener('sloth:mock', onMock as EventListener);
    return () => {
      window.removeEventListener('sloth:celebrate', onCelebrate as EventListener);
      window.removeEventListener('sloth:mock', onMock as EventListener);
    };
  }, []);

  return (
    <div className="fixed right-6 bottom-24 z-40 select-none" style={{ pointerEvents: 'none' }}>
      <div className="relative" style={{ pointerEvents: 'auto' }}>
        <LagTheSloth mood={mode === 'mock' ? 'judge' : mode === 'celebrate' ? 'hype' : 'smug'} size="md" />
        <div className={`absolute -top-10 right-16 transition-all ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
          <div className="bg-black text-white rounded-2xl px-3 py-1 font-black whitespace-nowrap shadow-harsh" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Black", sans-serif' }}>
            {line}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlothBubble;
