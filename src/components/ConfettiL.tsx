import { useEffect, useMemo, useState } from 'react';

interface ConfettiLProps { show: boolean; onDone?: () => void; }

export const ConfettiL = ({ show, onDone }: ConfettiLProps) => {
  const [visible, setVisible] = useState(show);
  useEffect(() => {
    setVisible(show);
    if (show) {
      const t = setTimeout(() => { setVisible(false); onDone?.(); }, 900);
      return () => clearTimeout(t);
    }
  }, [show, onDone]);

  const pieces = useMemo(() => Array.from({ length: 24 }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.3,
    rotate: (Math.random() * 40 - 20),
    size: Math.random() * 14 + 10,
  })), [show]);

  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p, i) => (
        <div key={i} className="absolute text-black font-extrabold" style={{ left: `${p.left}%`, top: '-10px', animation: `l-fall 0.9s ease-in ${p.delay}s forwards`, transform: `rotate(${p.rotate}deg)`, fontSize: p.size }}>
          L
        </div>
      ))}
      <style>{`@keyframes l-fall { to { transform: translateY(110vh); opacity: 0.8; } }`}</style>
    </div>
  );
};

export default ConfettiL;
