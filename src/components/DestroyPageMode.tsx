import { useEffect, useRef, useState } from 'react';
import { SlothButton } from '@/components/ui/sloth-button';
import { sfxGlitch, sfxBuzzer } from '@/lib/sfx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const DestroyPageMode = () => {
  const [armed, setArmed] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!armed) return;
    sfxGlitch();
    const body = document.body;
    body.classList.add('destroy-mode');
    const t = setTimeout(() => { sfxBuzzer(); }, 400);
    return () => { body.classList.remove('destroy-mode'); clearTimeout(t); };
  }, [armed]);

  const onCloseHover = () => {
    if (!btnRef.current) return;
    if (dodgeCount >= 3) return; // hard but not impossible
    const x = Math.random() * 60 - 30;
    const y = Math.random() * 40 - 20;
    btnRef.current.style.transform = `translate(${x}px, ${y}px)`;
    setDodgeCount((c) => c + 1);
  };

  return (
    <>
      <div className="fixed left-4 bottom-20 z-40">
        {!armed ? (
          <SlothButton variant="destructive" onClick={() => setArmed(true)}>Take a Break</SlothButton>
        ) : (
          <SlothButton variant="roast" onClick={() => setArmed(false)}>Undo Chaos</SlothButton>
        )}
      </div>

      <Dialog open={armed} onOpenChange={setArmed}>
        <DialogContent className="w-[92vw] max-w-[960px] max-h-[90vh] overflow-y-auto p-0 sm:p-3">
          <DialogHeader>
            <DialogTitle className="text-center">CONGRATS YOU GOT RICKED AND ROLLED</DialogTitle>
          </DialogHeader>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&playsinline=1&controls=0&modestbranding=1&rel=0"
              title="Rick Astley - Never Gonna Give You Up"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <button
              ref={btnRef}
              onMouseEnter={onCloseHover}
              onClick={() => setArmed(false)}
              className="absolute top-2 right-2 text-xs px-3 py-1 rounded-full bg-black/70 text-white border border-white/20"
              aria-label="Close"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DestroyPageMode;
