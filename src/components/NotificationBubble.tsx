import { useEffect, useState } from 'react';
import slothImg from '@/assets/lag-the-sloth.png';

export const NotificationBubble = () => {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const onShow = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setMsg(detail || '');
      const t = setTimeout(() => setMsg(null), 4000);
      return () => clearTimeout(t);
    };
    window.addEventListener('notif:show', onShow as EventListener);
    return () => window.removeEventListener('notif:show', onShow as EventListener);
  }, []);

  if (!msg) return null;
  return (
    <div className="fixed left-4 bottom-24 z-[70] select-none">
      <div className="flex items-start gap-2 p-2 rounded-2xl bg-white text-black shadow-xl border border-black/10">
        <img src={slothImg} alt="Slothji" className="w-8 h-8 rounded-full object-cover" />
        <div>
          <div className="text-[10px] text-gray-500">Slothji • WhatsApp</div>
          <div className="text-sm font-medium leading-snug max-w-[240px]">{msg}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBubble;
