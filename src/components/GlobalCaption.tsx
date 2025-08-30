import { useEffect, useState } from 'react';

export const GlobalCaption = () => {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setText(detail || '');
      const t = setTimeout(() => setText(null), 2500);
      return () => clearTimeout(t);
    };
    window.addEventListener('caption:show', handler as EventListener);
    return () => window.removeEventListener('caption:show', handler as EventListener);
  }, []);
  if (!text) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[55] flex items-center justify-center">
      <div className="px-4 py-2 rounded bg-white text-black text-3xl md:text-5xl font-black leading-tight shadow-harsh" style={{ fontFamily: 'Impact, Haettenschweiler, \"Arial Black\", sans-serif' }}>
        {text}
      </div>
    </div>
  );
};

export default GlobalCaption;
