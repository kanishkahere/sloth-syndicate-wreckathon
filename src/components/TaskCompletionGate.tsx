import { useEffect, useMemo, useState } from 'react';
import { SlothButton } from '@/components/ui/sloth-button';
import { LagTheSloth } from '@/components/LagTheSloth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Brain, ImageUp, Type, ShieldQuestion, Gamepad2 } from 'lucide-react';

interface TaskCompletionGateProps {
  open: boolean;
  taskLabel: string;
  onCancel: () => void;
  onComplete: () => void;
  onFail?: () => void;
}

const prompts = [
  {
    id: 'alphabet',
    icon: Type,
    title: 'Recite the alphabet backwards',
    description: "Say it out loud. We can\'t hear you, but the embarrassment counts.",
    cta: 'I totally did it',
  },
  {
    id: 'spoon',
    icon: ImageUp,
    title: 'Upload a photo of a clean spoon',
    description: 'Shiny. Reflective. Symbol of discipline.',
    cta: 'Trust me bro',
  },
  {
    id: 'mitochondria',
    icon: Brain,
    title: "What\'s the mitochondria\'s favorite color?",
    description: 'Biology pop-quiz to prove productivity vibes only.',
    cta: 'It\'s… efficiency?',
  },
  {
    id: 'captcha',
    icon: ShieldQuestion,
    title: 'Human Check',
    description: 'Select all squares with “good intentions”. None of them count.',
    cta: 'Intentions selected',
  },
  {
    id: 'game',
    icon: Gamepad2,
    title: 'Micro-game',
    description: 'Blink twice and promise you will not touch reels for 5 min.',
    cta: 'Promise (lies)'
  }
];

// silly sound using WebAudio, lightweight and no assets
function playKazooSplat() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(220, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.12);
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.26);
  } catch {}
}

export const TaskCompletionGate = ({ open, taskLabel, onCancel, onComplete }: TaskCompletionGateProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const steps = useMemo(() => {
    const shuffled = [...prompts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2); // two silly hurdles
  }, [taskLabel]);

  useEffect(() => {
    if (!open) setStepIndex(0);
  }, [open]);

  const StepIcon = steps[stepIndex]?.icon || Brain;

  const nextOrBlock = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      // Final roast: block by default
      playKazooSplat();
      setStepIndex(0);
      if (typeof window !== 'undefined') {
        try { (window as any).__slothFail?.(); } catch {}
        try { window.dispatchEvent(new Event('sloth:mock')); } catch {}
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <LagTheSloth mood="judge" size="sm" />
            Prove you finished: {taskLabel}
          </DialogTitle>
          <DialogDescription>
            Complete these extremely scientific validations. Or don\'t. We\'re not your boss.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-md bg-surface border border-border">
            <StepIcon className="w-5 h-5 text-primary shrink-0" />
            <div>
              <div className="font-medium">{steps[stepIndex]?.title}</div>
              <div className="text-sm text-muted-foreground">{steps[stepIndex]?.description}</div>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <div className="text-xs text-muted-foreground italic">
            Cool story bro, task still pending. 🦥
          </div>
          <div className="flex gap-2">
            <SlothButton variant="ghost" onClick={onCancel}>Abort</SlothButton>
            <SlothButton variant="chaos" onClick={nextOrBlock}>{steps[stepIndex]?.cta || 'Ok'}</SlothButton>
            <SlothButton
              variant="roast"
              onClick={() => { playKazooSplat(); onComplete(); }}
              title="Fine, mark it done"
            >
              Gaslight Myself
            </SlothButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCompletionGate;
