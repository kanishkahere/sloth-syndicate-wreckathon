import { useEffect, useState } from 'react';
import { SlothButton } from '@/components/ui/sloth-button';
import { sfxGlitch, sfxBuzzer } from '@/lib/sfx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const DestroyPageMode = () => {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    sfxGlitch();
    const body = document.body;
    body.classList.add('destroy-mode');
    const t = setTimeout(() => { sfxBuzzer(); }, 400);
    return () => { body.classList.remove('destroy-mode'); clearTimeout(t); };
  }, [armed]);

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
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center">CONGRATS YOU GOT RICKED AND ROLLED</DialogTitle>
          </DialogHeader>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
              title="Rick Astley - Never Gonna Give You Up"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DestroyPageMode;
