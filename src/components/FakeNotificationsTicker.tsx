import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BellRing } from 'lucide-react';

const messages = [
  'Finish your task or I\'ll leak your 8th grade FB pics 😭',
  'Duolingo owl saw this. He\'s embarrassed.',
  'Your ex just finished 2 tasks. Imagine.',
  'Elon liked your procrastination.',
  'POV: Still scrolling? Be honest.',
];

export const FakeNotificationsTicker = () => {
  const { toast } = useToast();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const fire = () => {
      const msg = messages[Math.floor(Math.random()*messages.length)];
      toast({ description: msg, duration: 4000 });
      try { window.dispatchEvent(new CustomEvent('notif:show', { detail: msg })); } catch {}
    };
    timerRef.current = window.setInterval(fire, 25000);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [toast]);

  return null;
};

export default FakeNotificationsTicker;
