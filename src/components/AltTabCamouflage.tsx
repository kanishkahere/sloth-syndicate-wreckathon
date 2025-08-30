import { useEffect } from 'react';
import { SlothButton } from '@/components/ui/sloth-button';

interface AltTabCamouflageProps {
  open: boolean;
  onClose: () => void;
}

export const AltTabCamouflage = ({ open, onClose }: AltTabCamouflageProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-white text-black">
      {/* Fake Word title bar */}
      <div className="h-10 bg-blue-600 text-white flex items-center justify-between px-4 text-sm">
        <div>Document1 - Word</div>
        <div className="space-x-2"><span>—</span><span>□</span><span>×</span></div>
      </div>
      {/* Ribbon */}
      <div className="h-12 border-b flex items-center gap-6 px-4 text-sm">
        {['File','Home','Insert','Layout','Review','View','Help'].map(t => (
          <div key={t} className="font-semibold">{t}</div>
        ))}
      </div>
      {/* Page */}
      <div className="p-8 flex justify-center">
        <div className="w-[816px] min-h-[1056px] bg-white shadow-xl border p-12 leading-8">
          <h1 className="text-3xl font-serif mb-6">Definitely Working 🙏</h1>
          <p className="text-gray-700">This totally serious document proves intense productivity. Any resemblance to procrastination is purely coincidental.</p>
          <p className="mt-6 text-gray-500">Press Esc to return.</p>
          <div className="mt-8">
            <SlothButton variant="ghost" onClick={onClose}>Close</SlothButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltTabCamouflage;
