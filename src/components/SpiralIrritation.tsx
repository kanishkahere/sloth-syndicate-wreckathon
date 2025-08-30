import { useEffect, useState } from 'react';
import { LagTheSloth } from '@/components/LagTheSloth';

const lines = [
  'Stop staring at the spiral. Start staring at your regrets.',
  'Reminder: scrolling is a hobby now.',
  'Your focus just rage quit.',
  'Achievement: Looked productive for 12 seconds.',
  'Plot twist: The spiral is judging you.'
];

export const SpiralIrritation = () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState(lines[0]);

  useEffect(() => {
    const show = () => {
      setText(lines[Math.floor(Math.random() * lines.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 2500);
    };
    const id = setInterval(show, 12000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center transition-all ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white shadow-harsh">
        <LagTheSloth mood="judge" size="sm" />
        <span className="text-xs font-extrabold uppercase tracking-wide">{text}</span>
      </div>
    </div>
  );
};

export default SpiralIrritation;
