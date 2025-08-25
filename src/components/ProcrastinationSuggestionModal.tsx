import { useState, useEffect } from 'react';
import { Shuffle, X, Coffee } from 'lucide-react';
import { SlothButton } from '@/components/ui/sloth-button';
import { LagTheSloth } from './LagTheSloth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const procrastinationSuggestions = [
  "Start a folder called 'Important' and never open it.",
  "Alphabetize your apps by regret.",
  "Audit your meme stash like it's income tax.",
  "Recreate your school timetable in Excel for no reason.",
  "Teach your plant boundaries (good luck).",
  "Build a castle in Google Slides.",
  "Rank every snack by crunch decibels.",
  "Invent a new color. Name it after your crisis.",
  "Rewrite your bio to 'Recovering productivity enthusiast.'",
  "Clean your inbox by marking all as read: growth.",
  "Make a vision board but only of naps.",
  "Speedrun doing nothing.",
  "Sort screenshots into 'why?' and 'what?'.",
  "Create a Kanban board for procrastinating.",
  "Rename your notes to 'final_final_FINAL'.",
  "Calculate your snack ROI.",
  "Update your resume to 'Professional Delayer'.",
  "Draft an apology to Future You.",
  "Make a playlist called 'Focus (I lied)'.",
  "Change all passwords to 'later123' (don't)."
];

interface ProcrastinationSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSuggestion: (suggestion: string) => void;
}

export const ProcrastinationSuggestionModal = ({ 
  isOpen, 
  onClose, 
  onSelectSuggestion 
}: ProcrastinationSuggestionModalProps) => {
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);

  const generateSuggestions = () => {
    const shuffled = [...procrastinationSuggestions].sort(() => 0.5 - Math.random());
    setCurrentSuggestions(shuffled.slice(0, 3));
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSelectSuggestion(suggestion);
    onClose();
  };

  // Generate suggestions when modal opens
  useEffect(() => {
    if (isOpen && currentSuggestions.length === 0) {
      generateSuggestions();
    }
  }, [isOpen, currentSuggestions.length]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Coffee className="w-6 h-6 text-primary animate-chaos-bounce" />
            <span className="font-heading">Hold up, productivity detected!</span>
            <LagTheSloth mood="judge" size="sm" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="sloth-text-roast text-center">
            Before you do actual work, how about some creative avoidance instead?
          </p>

          <div className="space-y-3">
            {currentSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 bg-surface rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer group"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <p className="group-hover:text-primary transition-colors">
                  {suggestion}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <SlothButton 
              variant="ghost" 
              onClick={generateSuggestions}
              className="flex items-center space-x-2"
            >
              <Shuffle className="w-4 h-4" />
              <span>More Chaos</span>
            </SlothButton>

            <div className="flex space-x-3">
              <SlothButton 
                variant="destructive" 
                onClick={() => handleSuggestionClick(currentSuggestions[0] || "Stare at ceiling")}
              >
                Commit to Chaos
              </SlothButton>
              
              <button 
                onClick={onClose}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                No thanks, I guess...
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};