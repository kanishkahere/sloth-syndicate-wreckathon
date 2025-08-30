import { useEffect, useState } from 'react';

interface ReelCaptionProps {
  text: string;
  show: boolean;
  onDone?: () => void;
  duration?: number;
}

export const ReelCaption = ({ text, show, onDone, duration = 2000 }: ReelCaptionProps) => {
  const [visible, setVisible] = useState(show);
  useEffect(() => {
    setVisible(show);
    if (show) {
      const t = setTimeout(() => { setVisible(false); onDone?.(); }, duration);
      return () => clearTimeout(t);
    }
  }, [show, duration, onDone]);

  return (
    <div className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center transition-all ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="px-4 py-2 rounded bg-white text-black text-3xl md:text-5xl font-black leading-tight shadow-harsh" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Black", sans-serif' }}>
        {text}
      </div>
    </div>
  );
};

export default ReelCaption;
