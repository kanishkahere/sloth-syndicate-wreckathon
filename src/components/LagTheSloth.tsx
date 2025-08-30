import { useState, useEffect } from 'react';
import { Eye, Zap, Coffee, Brain } from 'lucide-react';
import lagSlothImage from '@/assets/lag-the-sloth.png';

interface LagTheSlothProps {
  mood?: 'smug' | 'judge' | 'hype' | 'sleepy';
  size?: 'sm' | 'md' | 'lg';
  floating?: boolean;
  useImage?: boolean;
  celebrate?: boolean;
  onClick?: () => void;
}

export const LagTheSloth = ({
  mood = 'smug',
  size = 'md',
  floating = false,
  useImage = true,
  celebrate = false,
  onClick
}: LagTheSlothProps) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Blink animation every 3-5 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, Math.random() * 2000 + 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const getMoodExpression = () => {
    switch (mood) {
      case 'judge':
        return { eyes: '😑', mouth: '\\', color: 'text-destructive' };
      case 'hype': 
        return { eyes: '✨', mouth: 'o', color: 'text-primary' };
      case 'sleepy':
        return { eyes: '😴', mouth: '~', color: 'text-muted-foreground' };
      default: // smug
        return { eyes: '😏', mouth: '‾', color: 'text-accent' };
    }
  };

  const expression = getMoodExpression();

  if (useImage) {
    return (
      <div 
        className={`
          relative ${sizeClasses[size]} 
          ${floating ? 'fixed bottom-6 right-6 z-50 animate-chaos-bounce' : ''}
          ${celebrate ? 'animate-bounce' : ''}
          ${onClick ? 'cursor-pointer hover:scale-110 transition-transform duration-200' : ''}
          ${expression.color}
        `}
        onClick={onClick}
      >
        <img 
          src={lagSlothImage} 
          alt="Lag the Sloth" 
          className="w-full h-full object-contain rounded-full shadow-glow"
        />
        
        {/* Mood indicator icon */}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-surface border border-current flex items-center justify-center">
          {mood === 'judge' && <Eye className="w-2 h-2" />}
          {mood === 'hype' && <Zap className="w-2 h-2" />}
          {mood === 'sleepy' && <Coffee className="w-2 h-2" />}
          {mood === 'smug' && <Brain className="w-2 h-2" />}
        </div>

        {/* Floating tooltip */}
        {floating && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap animate-pulse-glow">
            Tap for chaos
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`
        relative ${sizeClasses[size]} 
        ${floating ? 'fixed bottom-6 right-6 z-50 animate-chaos-bounce' : ''}
        ${celebrate ? 'animate-bounce' : ''}
        ${onClick ? 'cursor-pointer hover:scale-110 transition-transform duration-200' : ''}
        ${expression.color}
      `}
      onClick={onClick}
    >
      {/* Sloth Body */}
      <div className="relative w-full h-full">
        {/* Main body circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-muted to-muted/70 border-2 border-current shadow-harsh" />
        
        {/* Eyes */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {isBlinking ? (
            <div className="text-xs">━━</div>
          ) : (
            <div className="text-xs">{expression.eyes}</div>
          )}
        </div>

        {/* Mouth */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-xs font-bold">
          {expression.mouth}
        </div>

        {/* Tiny arms */}
        <div className="absolute top-1/3 -left-1 w-2 h-1 rounded-full bg-current opacity-70" />
        <div className="absolute top-1/3 -right-1 w-2 h-1 rounded-full bg-current opacity-70" />

        {/* Mood indicator icon */}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-surface border border-current flex items-center justify-center">
          {mood === 'judge' && <Eye className="w-2 h-2" />}
          {mood === 'hype' && <Zap className="w-2 h-2" />}
          {mood === 'sleepy' && <Coffee className="w-2 h-2" />}
          {mood === 'smug' && <Brain className="w-2 h-2" />}
        </div>
      </div>

      {/* Floating tooltip */}
      {floating && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap animate-pulse-glow">
          Tap for chaos
        </div>
      )}
    </div>
  );
};
