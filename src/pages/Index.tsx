import { useState, useEffect } from 'react';
import { ProcrastinationVortex } from '@/components/ProcrastinationVortex';
import { LagTheSloth } from '@/components/LagTheSloth';
import { DistractionRoulette } from '@/components/DistractionRoulette';
import { DemotivationalQuote } from '@/components/DemotivationalQuote';
import { ProcrastinationSuggestionModal } from '@/components/ProcrastinationSuggestionModal';
import { TaskCompletionGate } from '@/components/TaskCompletionGate';
import { SlothButton } from '@/components/ui/sloth-button';
import { Plus, Brain, Trophy, Zap, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SpiralIrritation } from '@/components/SpiralIrritation';
import { DestroyPageMode } from '@/components/DestroyPageMode';
import { ReelCaption } from '@/components/ReelCaption';
import { sfxVineBoom, sfxHorn } from '@/lib/sfx';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { ConfettiL } from '@/components/ConfettiL';
import { FakeAchievements } from '@/components/FakeAchievements';
import { FakeNotificationsTicker } from '@/components/FakeNotificationsTicker';
import { MascotSelfie } from '@/components/MascotSelfie';
import { AltTabCamouflage } from '@/components/AltTabCamouflage';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { ConfettiL } from '@/components/ConfettiL';

const roastLines = [
  "Ambition detected. That's new.",
  "Focus? In this economy?",
  "If procrastination was cardio, you'd be shredded.",
  "Love the consistency: consistently not doing it.",
  "Inbox zero, output zero. Balance.",
  "You have 47 tabs and no plan.",
  "Wild move to try today.",
  "Let's not and say we did.",
  "Respectfully, no.",
  "Your focus walked out."
];

const Index = () => {
  const [showVortexAcceleration, setShowVortexAcceleration] = useState(false);
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [gateTaskIndex, setGateTaskIndex] = useState<number | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [slothCelebrate, setSlothCelebrate] = useState(false);
  const [showL, setShowL] = useState(false);
  const [achOpen, setAchOpen] = useState(false);
  const [selfieOpen, setSelfieOpen] = useState(false);
  const [camouflageOpen, setCamouflageOpen] = useState(false);
  const { toast } = useToast();

  // Trigger roast on idle
  useEffect(() => {
    const roastTimer = setTimeout(() => {
      const randomRoast = roastLines[Math.floor(Math.random() * roastLines.length)];
      toast({
        description: randomRoast,
        duration: 2500,
      });
    }, 5000);

    return () => clearTimeout(roastTimer);
  }, [toast]);

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    
    // Show procrastination suggestion modal instead of directly adding task
    setShowSuggestionModal(true);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    // Add the procrastination task instead
    setTasks([...tasks, `🎯 ${suggestion}`]);
    
    toast({
      description: "Perfect. Now you're thinking like a true procrastinator.",
      duration: 3000,
    });

    // Clear the original task
    setNewTaskText('');
  };

  const handleActuallyAddTask = () => {
    if (!newTaskText.trim()) return;
    
    // If they insist on adding the real task
    setTasks([...tasks, `⚡ ${newTaskText}`]);
    setNewTaskText('');

    // Spiral celebration + caption
    setShowVortexAcceleration(true);
    setCaption('SHEEEESH PRODUCTIVITY');
    sfxVineBoom();
    setShowL(true);
    setSlothCelebrate(true); setTimeout(() => setSlothCelebrate(false), 1500);
    setTimeout(() => { setShowVortexAcceleration(false); setCaption(null); setShowL(false); }, 1500);

    toast({ description: "Fine, we'll add your 'real' task. But we're judging you.", duration: 3000 });
  };

  const handleCompleteTask = (index: number) => {
    setGateTaskIndex(index);
    setGateOpen(true);
  };

  const actuallyCompleteTask = () => {
    if (gateTaskIndex === null) return;
    const completedTask = tasks[gateTaskIndex];
    setTasks(tasks.filter((_, i) => i !== gateTaskIndex));
    setGateOpen(false);
    setGateTaskIndex(null);
    toast({
      description: `"${completedTask}" - Sure, let's call it done.`,
      duration: 3000,
    });
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen relative">
      <ProcrastinationVortex accelerate={showVortexAcceleration} />
      <SpiralIrritation />
      <DestroyPageMode />
      <FakeNotificationsTicker />
      
      {/* Header */}
      <header className="relative z-10 p-6 text-center border-b border-border/50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-2 sloth-gradient-text">
            SLOTH
          </h1>
          <p className="text-lg sloth-text-roast mb-2">
            Productivity? Nah. We optimize the <em>vibe</em> of not doing it.
          </p>
          <p className="text-sm text-muted-foreground">{getCurrentDate()}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto p-6 space-y-8">
        
        {/* Add Task Section */}
        <section className="sloth-card">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-heading font-bold">What are we not doing today?</h2>
          </div>
          
          <div className="flex space-x-3">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="Add a regret... I mean, task"
              className="flex-1 px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <SlothButton
                  variant="chaos"
                  onClick={handleAddTask}
                  className="px-6"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Regret
                </SlothButton>
              </TooltipTrigger>
              <TooltipContent>Fake hustle incoming 💀</TooltipContent>
            </Tooltip>
          </div>
          
          {/* Hidden actual add button for determined users */}
          {newTaskText.trim() && (
            <div className="text-center pt-2">
              <button 
                onClick={handleActuallyAddTask}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Actually add "{newTaskText}" (you rebel)
              </button>
            </div>
          )}
        </section>

        {/* Tasks List */}
        {tasks.length > 0 && (
          <section className="sloth-card">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="w-6 h-6 text-destructive" />
              <h2 className="text-xl font-heading font-bold">Your Alleged To-Do List</h2>
            </div>
            
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="p-3 bg-surface rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div>{task}</div>
                      <div className="text-xs text-muted-foreground">(Manifestation only 💀)</div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SlothButton variant="roast" size="sm" onClick={() => handleCompleteTask(index)}>
                          "Done"
                        </SlothButton>
                      </TooltipTrigger>
                      <TooltipContent>Yeah right 🙄</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements CTA */}
        <section className="text-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <SlothButton onClick={() => setAchOpen(true)}>
                <Award className="w-4 h-4 mr-2" />
                Claim Fake Achievement
              </SlothButton>
            </TooltipTrigger>
            <TooltipContent>For screenshots only 🔥</TooltipContent>
          </Tooltip>
        </section>

        {/* Distraction Roulette */}
        <DistractionRoulette />

        {/* Demotivational Quote */}
        <DemotivationalQuote />

        {/* Stats Preview */}
        <section className="sloth-card">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-primary animate-pulse" />
            <h2 className="text-xl font-heading font-bold">Procrastination Stats</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-bold text-primary">{tasks.length}</div>
              <div className="text-sm sloth-text-roast">Tasks Avoiding</div>
            </div>
            <div className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-bold text-destructive">∞</div>
              <div className="text-sm sloth-text-roast">Minutes Wasted</div>
            </div>
            <div className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-bold text-accent">100%</div>
              <div className="text-sm sloth-text-roast">Chaos Achieved</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="text-center space-x-3">
          <SlothButton variant="link" onClick={() => setShowVortexAcceleration(true)} className="mb-2">
            Boost Spiral (why not)
          </SlothButton>
          <SlothButton variant="link" onClick={() => {
            document.body.classList.toggle('pastel-mode');
          }}>Toggle Pastel Mode</SlothButton>
        </section>

        <footer className="text-center py-8 space-x-3">
          <SlothButton variant="ghost" onClick={() => setSelfieOpen(true)}>Mascot Selfie</SlothButton>
          <SlothButton variant="ghost" onClick={() => setCamouflageOpen(true)}>Boss Key</SlothButton>
          <p className="sloth-text-roast text-sm mt-2">
            "This app isn't for doing work. It's for making avoiding work... funnier."
          </p>
        </footer>
      </main>

      {/* Floating Mascot */}
      <LagTheSloth
        mood="smug"
        floating
        celebrate={slothCelebrate}
        onClick={() => {
          const randomRoast = roastLines[Math.floor(Math.random() * roastLines.length)];
          toast({ description: randomRoast, duration: 2500 });
        }}
      />

      {caption && <ReelCaption text={caption} show={!!caption} onDone={() => setCaption(null)} />}
      {showL && <ConfettiL show={showL} onDone={() => setShowL(false)} />}

      <FakeAchievements open={achOpen} onClose={() => setAchOpen(false)} />

      {/* Procrastination Suggestion Modal */}
      <ProcrastinationSuggestionModal
        isOpen={showSuggestionModal}
        onClose={() => setShowSuggestionModal(false)}
        onSelectSuggestion={handleSelectSuggestion}
      />

      {/* Task Completion Gate */}
      <TaskCompletionGate
        open={gateOpen}
        taskLabel={gateTaskIndex !== null ? tasks[gateTaskIndex] : ''}
        onCancel={() => setGateOpen(false)}
        onComplete={actuallyCompleteTask}
        onFail={() => {
          // expose for internal callback + local effect
          (window as any).__slothFail = () => {};
          document.body.classList.add('fail-mode');
          setCaption('POV: your GPA watching you rn 💀');
          setTimeout(() => { document.body.classList.remove('fail-mode'); setCaption(null); }, 1400);
        }}
      />
    </div>
  );
};

export default Index;
