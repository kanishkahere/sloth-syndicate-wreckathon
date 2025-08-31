import { useEffect, useState } from 'react';
import { LagTheSloth } from '@/components/LagTheSloth';

const lines = [
  'Certified Procrastinator ★',
  'Focus? Rare NFT.',
  'Agenda: Vibes only.',
  'Achievement: Looked busy 12s.',
  'Hydration > Hustle.'
];

export const SpiralIrritation = () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState(lines[0]);

  useEffect(() => {
    const show = () => {
      setText(lines[Math.floor(Math.random() * lines.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 2000);
    };
    const id = setInterval(show, 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center transition-all ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/90 border border-border shadow-glow">
        <LagTheSloth mood="smug" size="sm" />
        <span className="text-xs font-extrabold uppercase tracking-wide">{text}</span>
      </div>
    </div>
  );
};

export default SpiralIrritation;
