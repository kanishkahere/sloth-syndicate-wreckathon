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
    <div className="fixed left-4 bottom-20 z-40">
      {!armed ? (
        <SlothButton variant="destructive" onClick={() => setArmed(true)}>I QUIT</SlothButton>
      ) : (
        <SlothButton variant="roast" onClick={() => setArmed(false)}>Undo Chaos</SlothButton>
      )}
    </div>
  );
};

export default DestroyPageMode;
