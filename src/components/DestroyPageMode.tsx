import { useEffect, useState } from 'react';
import { SlothButton } from '@/components/ui/sloth-button';
import { sfxGlitch, sfxBuzzer } from '@/lib/sfx';

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
          <SlothButton variant="destructive" onClick={() => setArmed(true)}>I QUIT</SlothButton>
        ) : (
          <SlothButton variant="roast" onClick={() => setArmed(false)}>Undo Chaos</SlothButton>
        )}
      </div>

      {armed && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 text-white text-center p-6">
          <div>
            <div className="text-2xl md:text-4xl font-extrabold mb-2">Congratulations, you have achieved NOTHING 👏👏👏</div>
            <div className="opacity-70">Reel outro plays in your head.</div>
          </div>
        </div>
      )}
    </>
  );
};

export default DestroyPageMode;
