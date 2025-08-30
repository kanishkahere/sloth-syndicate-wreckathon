import { useState, useEffect } from 'react';
import { Shuffle, Timer, Trophy } from 'lucide-react';
import { SlothButton } from '@/components/ui/sloth-button';
import { LagTheSloth } from './LagTheSloth';
import { sfxHorn } from '@/lib/sfx';

const distractionPrompts = [
  "Speedrun organizing your desktop into 'Maybe'.",
  "Make a meme about yourself that hurts.",
  "Rename 5 files to clarity.",
  "Stand, stretch, dramatic sigh.",
  "Compliment your water bottle.",
  "Write one bar of a diss track about your to‑do.",
  "Count 30 breaths. Forget at 12.",
  "Text 'doing it' then don't.",
  "Uninstall one app. Reinstall later.",
  "Face your fridge. Lose.",
  "Set a 3‑min timer. Stare at wall.",
  "Sort bookmarks by chaos.",
  "Make a new folder called 'New Folder'.",
  "Change wallpaper to 'productivity' then do nothing.",
  "Clean one square foot of reality.",
  "Draw a flowchart for postponing.",
  "Write a tweet: 'Grinding' and log off.",
  "Find three tabs to close. Fail.",
  "Clap once loudly.",
  "Journal one sentence: 'I will try later.'"
];

const roastResponses = [
  "Iconic level of avoidance.",
  "That's... actually impressive.",
  "Peak procrastination energy.",
  "You've mastered the art of not doing.",
  "Respectfully, this is chaos.",
  "Your productivity walked out.",
  "Achievement unlocked: Creative delay.",
  "This is why deadlines fear you.",
];

interface DistractionRouletteProps {
  onComplete?: (timeSpent: number) => void;
}

export const DistractionRoulette = ({ onComplete }: DistractionRouletteProps) => {
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isComplete, setIsComplete] = useState(false);
  const [roast, setRoast] = useState<string>('');

  const spinRoulette = () => {
    const randomPrompt = distractionPrompts[Math.floor(Math.random() * distractionPrompts.length)];
    setCurrentPrompt(randomPrompt);
    setIsActive(true);
    setIsComplete(false);
    setTimeLeft(60);
    sfxHorn();
  };

  const completeTask = () => {
    setIsActive(false);
    setIsComplete(true);
    const randomRoast = roastResponses[Math.floor(Math.random() * roastResponses.length)];
    setRoast(randomRoast);
    onComplete?.(60 - timeLeft);
  };

  // Timer countdown
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          setIsComplete(true);
          setRoast("Time's up! But hey, you tried.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="sloth-card space-y-6">
      <div className="flex items-center space-x-3">
        <Shuffle className="w-6 h-6 text-primary animate-chaos-bounce" />
        <h2 className="text-xl font-heading font-bold">Distraction Roulette</h2>
        <LagTheSloth mood="hype" size="sm" />
      </div>

      {!currentPrompt && (
        <div className="text-center space-y-4">
          <p className="text-muted-foreground sloth-text-roast">
            Why be productive when you can be... creative?
          </p>
          <SlothButton 
            variant="procrastinate" 
            size="lg"
            onClick={spinRoulette}
            className="w-full"
          >
            Spin Distraction Roulette
          </SlothButton>
        </div>
      )}

      {currentPrompt && !isComplete && (
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-lg border-l-4 border-primary">
            <p className="font-medium">{currentPrompt}</p>
          </div>

          {isActive && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4 text-destructive" />
                <span className="font-mono font-bold text-destructive">
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              <SlothButton 
                variant="chaos"
                onClick={completeTask}
              >
                Done! (Allegedly)
              </SlothButton>
            </div>
          )}
        </div>
      )}

      {isComplete && (
        <div className="text-center space-y-4 p-4 bg-muted rounded-lg">
          <Trophy className="w-8 h-8 text-primary mx-auto" />
          <p className="sloth-text-roast">{roast}</p>
          <SlothButton 
            variant="ghost" 
            onClick={() => {
              setCurrentPrompt('');
              setIsComplete(false);
              setRoast('');
            }}
          >
            Waste More Time
          </SlothButton>
        </div>
      )}

      {overlayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative">
            <div className="px-4 py-2 rounded bg-white text-black text-3xl md:text-5xl font-black leading-tight shadow-harsh text-center" style={{ fontFamily: 'Impact, Haettenschweiler, \"Arial Black\", sans-serif' }}>
              {(currentPrompt || 'Go Face The Fridge. You Lose.').toUpperCase()}
            </div>
            <button
              style={{ position: 'absolute', top: closePos.top, right: closePos.right }}
              className="text-white text-xl"
              onMouseEnter={() => setClosePos({ top: Math.random()*80+5, right: Math.random()*80+5 })}
              onClick={() => setOverlayOpen(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
