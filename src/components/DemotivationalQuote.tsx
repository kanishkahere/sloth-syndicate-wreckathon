import { useState, useEffect } from 'react';
import { RefreshCw, Quote } from 'lucide-react';
import { SlothButton } from '@/components/ui/sloth-button';

const demotivationalQuotes = [
  {
    quote: "Hard work pays off later.",
    subtext: "Laziness pays off now."
  },
  {
    quote: "The early bird might get the worm,",
    subtext: "but the second mouse gets the cheese."
  },
  {
    quote: "Rome wasn't built in a day.",
    subtext: "Neither was your procrastination habit."
  },
  {
    quote: "Every journey begins with a single step.",
    subtext: "Yours begins with opening Netflix."
  },
  {
    quote: "Believe in yourself!",
    subtext: "Your ability to avoid responsibility is unmatched."
  },
  {
    quote: "Time is money.",
    subtext: "You're broke."
  },
  {
    quote: "Dream big!",
    subtext: "Then take a nap."
  },
  {
    quote: "Success is 1% inspiration, 99% perspiration.",
    subtext: "You're allergic to both."
  },
  {
    quote: "The only impossible journey",
    subtext: "is the one you never start... so don't."
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    subtext: "That's why you don't take any."
  }
];

export const DemotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(demotivationalQuotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * demotivationalQuotes.length);
      setCurrentQuote(demotivationalQuotes[randomIndex]);
      setIsAnimating(false);
    }, 200);
  };

  // Auto-rotate quotes every 10 seconds
  useEffect(() => {
    const interval = setInterval(getRandomQuote, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sloth-card relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Quote className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-heading font-bold">Daily Demotivation</h2>
        </div>
        
        <SlothButton 
          variant="ghost" 
          size="icon"
          onClick={getRandomQuote}
          className={isAnimating ? 'animate-spin' : ''}
        >
          <RefreshCw className="w-4 h-4" />
        </SlothButton>
      </div>

      <div className={`transition-all duration-200 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        <blockquote className="text-center space-y-3">
          <p className="text-lg font-medium text-foreground">
            "{currentQuote.quote}"
          </p>
          <footer className="sloth-text-roast text-sm">
            {currentQuote.subtext}
          </footer>
        </blockquote>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/10 animate-pulse-glow" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-destructive/10 animate-chaos-bounce" />
    </div>
  );
};