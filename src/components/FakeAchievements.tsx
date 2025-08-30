import { useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { SlothButton } from '@/components/ui/sloth-button';
import { Shuffle, Download, Award } from 'lucide-react';
import slothImg from '@/assets/lag-the-sloth.png';

const ACHIEVEMENTS = [
  'Procrastinator of the Month',
  'Certified Sleep Master',
  'Level 69: Avoiding Work',
  '5 Hours of Pure Scrolling',
  'National Tab Hoarder',
  'Master of Excuses',
];

interface FakeAchievementsProps { open: boolean; onClose: () => void; username?: string; }

export const FakeAchievements = ({ open, onClose, username = 'You' }: FakeAchievementsProps) => {
  const [title, setTitle] = useState(ACHIEVEMENTS[0]);
  const [subtitle, setSubtitle] = useState('Reason: Pure skill issue.');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const colors = useMemo(() => [
    ['#FF6EC7', '#39FF14'],
    ['#FAF3E0', '#00FFFF'],
    ['#C5F90A', '#111827'],
  ][Math.floor(Math.random()*3)], []);

  const draw = () => {
    const c = canvasRef.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return;
    const W = c.width = 800, H = c.height = 800;
    const g = ctx.createLinearGradient(0,0,W,H); g.addColorStop(0, colors[0]); g.addColorStop(1, colors[1]);
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

    // badge circle
    ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.beginPath(); ctx.arc(W/2, H/2 - 120, 120, 0, Math.PI*2); ctx.fill();

    // sloth image
    const img = new Image(); img.src = slothImg; img.onload = () => {
      ctx.save(); ctx.beginPath(); ctx.arc(W/2, H/2 - 120, 110, 0, Math.PI*2); ctx.closePath(); ctx.clip();
      ctx.drawImage(img, W/2 - 110, H/2 - 230, 220, 220); ctx.restore();

      // text
      ctx.fillStyle = '#000'; ctx.globalAlpha = 0.9; ctx.font = 'bold 42px Poppins, Arial, sans-serif';
      ctx.textAlign = 'center'; ctx.fillText('Certificate of Uselessness', W/2, H/2 + 20);
      ctx.font = 'bold 54px Poppins, Arial, sans-serif'; ctx.fillText(title, W/2, H/2 + 100);
      ctx.font = '24px Poppins, Arial, sans-serif'; ctx.globalAlpha = 0.85; ctx.fillText(`${username}`, W/2, H/2 + 150);
      ctx.font = '22px Poppins, Arial, sans-serif'; ctx.fillText(subtitle, W/2, H/2 + 190);

      // footer
      ctx.globalAlpha = 1; ctx.font = 'bold 18px Impact, Arial Black';
      ctx.fillText('SL0TH SYNDICATE — USELESS SINCE FOREVER', W/2, H - 40);
    };
  };

  useEffect(() => { if (open) draw(); }, [open, title, subtitle]);

  const download = () => {
    const c = canvasRef.current; if (!c) return; const url = c.toDataURL('image/png');
    const a = document.createElement('a'); a.download = `achievement-${title.replace(/\s+/g,'-')}.png`; a.href = url; a.click();
  };

  const randomize = () => {
    setTitle(ACHIEVEMENTS[Math.floor(Math.random()*ACHIEVEMENTS.length)]);
    setSubtitle(['Reason: Pure skill issue.', 'Evidence: 47 open tabs.', 'Witnessed by: Slothji.', 'Method: Manifestation only.'][Math.floor(Math.random()*4)]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-primary"/>Fake Achievement Generator</DialogTitle>
          <DialogDescription>Make a share-ready certificate. Totally legit. Absolutely useless.</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-sm">Title</label>
            <div className="p-3 rounded-md bg-surface border">{title}</div>
            <label className="text-sm">Subtitle</label>
            <div className="p-3 rounded-md bg-surface border">{subtitle}</div>
            <div className="flex gap-2">
              <SlothButton onClick={randomize} className="flex-1"><Shuffle className="w-4 h-4 mr-2"/>Randomize</SlothButton>
              <SlothButton variant="ghost" onClick={draw}>Refresh</SlothButton>
            </div>
          </div>
          <div className="bg-card rounded-md border p-2">
            <canvas ref={canvasRef} className="w-full h-auto rounded" width={800} height={800} />
          </div>
        </div>

        <DialogFooter>
          <SlothButton variant="chaos" onClick={download}><Download className="w-4 h-4 mr-2"/>Download PNG</SlothButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FakeAchievements;
