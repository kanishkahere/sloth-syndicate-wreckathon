import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProcrastinationVortex } from '@/components/ProcrastinationVortex';
import { LagTheSloth } from '@/components/LagTheSloth';
import { SlothButton } from '@/components/ui/sloth-button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, CheckCircle2, Clock, Gauge, ShieldQuestion, Sparkles, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ConfettiL } from '@/components/ConfettiL';

const heroLines = [
  "Where ‘later’ is a lifestyle.",
  "We motivate you to not.",
  "Fake hustle. Real comedy.",
  "You ready? (be honest)",
  "Another day, another L.",
];

const bubbleLines = [
  "Bro, you came back?",
  "You ready? (you’re not)",
  "We reward failure here.",
];

const Validator = ({ open, onDone }: { open: boolean; onDone: () => void }) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!open) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => Math.min(2, s + 1)), 260);
    const t = setTimeout(onDone, 800);
    return () => { clearInterval(id); clearTimeout(t); };
  }, [open, onDone]);
  const lines = [
    "Verifying that you actually opened the tab…",
    "Confirming your skill issue…",
    "Almost there… not really. Kidding. Proceed.",
  ];
  return (
    <Dialog open={open}>
      <DialogContent aria-live="polite" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Validator</DialogTitle>
          <DialogDescription>Micro-delay engaged.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {lines.map((l, i) => (
            <div key={l} className={`text-sm ${i <= step ? 'opacity-100' : 'opacity-30'}`}>{l}</div>
          ))}
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${(step + 1) / 3 * 100}%` }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lineIndex, setLineIndex] = useState(0);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [showValidator, setShowValidator] = useState(false);
  const validatorShown = useRef(false);
  const [nudgeOnce, setNudgeOnce] = useState(false);
  const [showChaos, setShowChaos] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showL, setShowL] = useState(false);
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches, []);

  useEffect(() => {
    const interval = setInterval(() => setLineIndex((i) => (i + 1) % heroLines.length), 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setBubbleIndex((i) => (i + 1) % bubbleLines.length), isMobile ? 3000 : 2000);
    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b') {
        toast({ description: 'Bonus nap unlocked (not really).', duration: 1800 });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toast]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProcrastinationVortex />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-heading text-xl md:text-2xl">
            <span role="img" aria-label="sloth">🦥</span>
            <span>SLOTH</span>
          </Link>
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/signup">
                  <SlothButton variant="ghost" size="sm" aria-label="Sign up">
                    Sign up
                  </SlothButton>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Adopt a sloth (you).</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <SlothButton
                    size="sm"
                    aria-label="Log in"
                    onMouseEnter={() => { if (!nudgeOnce) setNudgeOnce(true); }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!validatorShown.current) {
                        validatorShown.current = true;
                        setShowValidator(true);
                        setTimeout(() => { setShowValidator(false); navigate('/login'); }, 800);
                      } else {
                        navigate('/login');
                      }
                    }}
                    style={nudgeOnce ? { transform: 'translateX(10px)' } : undefined}
                    title="Chase your dreams."
                  >
                    Log in
                  </SlothButton>
                </div>
              </TooltipTrigger>
              <TooltipContent>Enter the delay chamber.</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="mx-auto max-w-[1200px] px-6 pt-12 pb-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-4">Welcome to SLOTH</h1>
            <div className="text-lg md:text-xl text-foreground/80 h-7 mb-3 transition-opacity" aria-live="polite">
              {heroLines[lineIndex]}
            </div>
            <p className="text-base md:text-lg text-foreground/70 mb-4">Your favorite productivity app that actively gets in the way.</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-xs font-black tracking-wide uppercase text-foreground/80 mb-6" aria-label="Prod level">
              PROD LEVEL: -100 💀
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/login">
                <SlothButton className="min-w-[200px]">Log in (eventually)</SlothButton>
              </Link>
              <Link to="/signup">
                <SlothButton variant="ghost" className="min-w-[200px]">Sign up (fake hustle)</SlothButton>
              </Link>
            </div>

            {/* Inline micro-friction banner */}
            <div className="mt-6 rounded-2xl bg-primary/10 px-4 py-3 flex items-center justify-between">
              <div className="font-semibold">You ready?</div>
              <InlineGag />
              <Link to="/login" className="text-sm underline text-primary">Okay fine → Log in</Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative flex items-center justify-center">
              <LagTheSloth mood="smug" size="lg" onClick={() => { setShowL(true); setTimeout(() => setShowL(false), 600); }} />
              <div className="absolute -top-8 -right-6 md:-right-10 bg-white text-black rounded-2xl shadow-glow px-4 py-2 text-sm md:text-base origin-bottom-right scale-100 transition-all" aria-live="polite">
                {bubbleLines[bubbleIndex]}
              </div>
            </div>
          </div>
        </section>

        {/* Why SLOTH */}
        <section className="mx-auto max-w-[1200px] px-6 py-8">
          <h2 className="text-2xl md:text-3xl font-heading mb-6">Why SLOTH? (we’ll wait)</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <ValueCard icon={<Gauge className="w-5 h-5" />} title="Delay Engine" desc="The more you try, the slower we get. Fair." roast="You clicked. Nothing happens. Art." />
            <ValueCard icon={<ShieldQuestion className="w-5 h-5" />} title="Mascot Roasts" desc="Duolingo owl but clingier." roast="Gaslight, gatekeep, go nap." />
            <ValueCard icon={<Sparkles className="w-5 h-5" />} title="Pretty Charts" desc="99% procrastination. 1% vibes." roast="Data that doesn’t help." />
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-[1200px] px-6 py-8">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Step label="Add task" sub="Manifest fake hustle." />
            <ArrowRight className="opacity-50" />
            <Step label="Get roasted" sub="Positive bullying." />
            <ArrowRight className="opacity-50" />
            <Step label="Almost do it" sub="Almost counts (here)." />
            <ArrowRight className="opacity-50" />
            <Step label="Repeat" sub="We believe in loops." />
          </div>
          <p className="text-xs uppercase tracking-wide mt-3 text-foreground/60">We’re minimal. But every pixel bullies you.</p>
        </section>

        {/* Feature teases */}
        <section className="mx-auto max-w-[1200px] px-6 pb-12 grid md:grid-cols-2 gap-6">
          <div className="sloth-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">Distraction Roulette</h3>
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-foreground/70 mb-4">Spin to avoid responsibility.</p>
            <SlothButton variant="link" onClick={() => setShowChaos(true)}>See chaos</SlothButton>
          </div>
          <div className="sloth-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">Panic Button</h3>
              <TrendingDown className="w-4 h-4 text-destructive" />
            </div>
            <p className="text-sm text-foreground/70 mb-4">Press to regret.</p>
            <SlothButton variant="link" onClick={() => { setShowGlitch(true); setTimeout(() => setShowGlitch(false), 1000); }}>Boom.</SlothButton>
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto max-w-[1200px] px-6 py-10 flex items-center justify-between text-sm text-foreground/70">
          <div>© SLOTH. Time is fake.</div>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/privacy" className="underline">Privacy (lol)</Link>
              </TooltipTrigger>
              <TooltipContent>We know you did nothing.</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/terms" className="underline">Terms (read never)</Link>
              </TooltipTrigger>
              <TooltipContent>By continuing, you agree to continue.</TooltipContent>
            </Tooltip>
          </div>
        </footer>
      </main>

      {/* Modals */}
      <Validator open={showValidator} onDone={() => {}} />

      <Dialog open={showChaos} onOpenChange={setShowChaos}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Distraction Roulette (demo)</DialogTitle>
            <DialogDescription>Spin to avoid responsibility.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle2 className="text-primary" />
            Chaotic preview. The real one lives inside.
          </div>
        </DialogContent>
      </Dialog>

      {showGlitch && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 text-white">
          <div className="text-2xl font-black">SYSTEM DESTROYED (jk)</div>
        </div>
      )}

      <ConfettiL show={showL} onDone={() => setShowL(false)} />
    </div>
  );
};

const Step = ({ label, sub }: { label: string; sub: string }) => (
  <div className="px-4 py-3 rounded-2xl bg-white text-black shadow-glow">
    <div className="font-semibold">{label}</div>
    <div className="text-xs text-black/60">{sub}</div>
  </div>
);

const ValueCard = ({ icon, title, desc, roast }: { icon: React.ReactNode; title: string; desc: string; roast: string }) => (
  <Tooltip>
    <div className="sloth-card">
      <div className="flex items-center gap-2 mb-2 text-primary">{icon}<span className="font-semibold">{title}</span></div>
      <div className="text-sm text-foreground/70">{desc}</div>
    </div>
    <TooltipContent>{roast}</TooltipContent>
  </Tooltip>
);

const InlineGag = () => {
  const [state, setState] = useState<'yes' | 'flip' | 'reset'>('yes');
  useEffect(() => {
    if (state === 'flip') {
      const t = setTimeout(() => setState('yes'), 1000);
      return () => clearTimeout(t);
    }
  }, [state]);
  return (
    <div className="flex items-center gap-2">
      <SlothButton size="sm" variant="ghost" onClick={() => setState('flip')}>
        {state === 'yes' ? 'Yes' : 'No you’re not.'}
      </SlothButton>
      <SlothButton size="sm" variant="ghost" onClick={() => setState('yes')}>No</SlothButton>
    </div>
  );
};

export default Index;
