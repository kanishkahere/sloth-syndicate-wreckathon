import { useEffect, useRef, useState } from 'react';
import slothImg from '@/assets/lag-the-sloth.png';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { SlothButton } from '@/components/ui/sloth-button';
import { Camera, Download, RefreshCw } from 'lucide-react';

const captions = [
  'BRO THIS YOUR WORK ETHIC???',
  'MAIN CHARACTER OF PROCRASTINATION ARC',
  'L + RATIO + NO TASKS DONE',
  'CERTIFIED DELAYER ENERGY',
];

interface MascotSelfieProps { open: boolean; onClose: () => void; tasksCount?: number; }

export const MascotSelfie = ({ open, onClose, tasksCount = 0 }: MascotSelfieProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [caption, setCaption] = useState(captions[0]);

  const draw = () => {
    const c = canvasRef.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return;
    const W = c.width = 900, H = c.height = 1200;
    // bg
    const g = ctx.createLinearGradient(0,0,W,H); g.addColorStop(0,'#FAF3E0'); g.addColorStop(1,'#FF6EC7');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    // sloth
    const img = new Image(); img.src = slothImg; img.onload = () => {
      ctx.drawImage(img, W/2 - 220, 140, 440, 440);
      // caption
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.font = 'bold 64px Impact, Arial Black'; ctx.fillText(caption, W/2, 680);
      ctx.font = 'bold 28px Poppins, Arial'; ctx.fillText(`Tasks avoiding: ${tasksCount}`, W/2, 730);
      ctx.font = '20px Poppins, Arial'; ctx.fillText(new Date().toLocaleString(), W/2, 770);
    };
  };

  useEffect(() => { if (open) draw(); }, [open, caption, tasksCount]);

  const download = () => {
    const c = canvasRef.current; if (!c) return; const url = c.toDataURL('image/png');
    const a = document.createElement('a'); a.href = url; a.download = 'sloth-selfie.png'; a.click();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Camera className="w-5 h-5"/>Sloth Selfie</DialogTitle>
          <DialogDescription>Shareable sticker — built for screenshots.</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="p-2 rounded border bg-surface">Caption: {caption}</div>
            <div className="flex gap-2 flex-wrap">
              {captions.map(c => (
                <SlothButton key={c} size="sm" variant={c===caption? 'chaos':'ghost'} onClick={() => setCaption(c)}>{c}</SlothButton>
              ))}
            </div>
            <SlothButton variant="ghost" onClick={() => setCaption(captions[Math.floor(Math.random()*captions.length)])}>
              <RefreshCw className="w-4 h-4 mr-2"/>Random
            </SlothButton>
          </div>
          <div className="bg-card rounded border p-2">
            <canvas ref={canvasRef} className="w-full h-auto rounded" width={900} height={1200} />
          </div>
        </div>

        <DialogFooter>
          <SlothButton onClick={download}><Download className="w-4 h-4 mr-2"/>Download PNG</SlothButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MascotSelfie;
