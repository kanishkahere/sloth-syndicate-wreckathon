import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProcrastinationVortex } from '@/components/ProcrastinationVortex';
import { SlothButton } from '@/components/ui/sloth-button';
import { LagTheSloth } from '@/components/LagTheSloth';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lineIndex, setLineIndex] = useState(0);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [showValidator, setShowValidator] = useState(false);
  const validatorShown = useRef(false);
  const [showL, setShowL] = useState(false);
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches, []);
  const [loginDodges, setLoginDodges] = useState(0);
  const [signupDodges, setSignupDodges] = useState(0);
  const [loginOffset, setLoginOffset] = useState<{x:number,y:number}>({x:0,y:0});
  const [signupOffset, setSignupOffset] = useState<{x:number,y:number}>({x:0,y:0});

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

  const handleLoginClick = (e: React.MouseEvent) => {
    if (loginDodges < 4) {
      e.preventDefault();
      const x = (Math.random() * 120 - 60);
      const y = (Math.random() * 40 - 20);
      setLoginOffset({ x, y });
      setLoginDodges((d) => d + 1);
      toast({ description: 'Too quick. Try again.', duration: 900 });
      return;
    }
    e.preventDefault();
    if (!validatorShown.current) {
      validatorShown.current = true;
      setShowValidator(true);
      setTimeout(() => { setShowValidator(false); navigate('/login'); }, 800);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProcrastinationVortex />

      <main className="relative z-10">
        <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-3">Welcome to SLOTH</h1>
            <div className="text-lg md:text-xl text-foreground/80 h-7 mb-3" aria-live="polite">
              {heroLines[lineIndex]}
            </div>
            <p className="text-base md:text-lg text-foreground/70 mb-4">Your favorite productivity app that actively gets in the way.</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-xs font-black tracking-wide uppercase text-foreground/80 mb-6">
              PROD LEVEL: -100 💀
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/login">
                <SlothButton
                  className="min-w-[200px] animate-pulse-glow"
                  style={{ transform: `translate(${loginOffset.x}px, ${loginOffset.y}px)` }}
                  onMouseEnter={() => {
                    if (loginDodges < 4) {
                      const x = (Math.random() * 120 - 60);
                      const y = (Math.random() * 40 - 20);
                      setLoginOffset({ x, y });
                      setLoginDodges((d) => d + 1);
                    }
                  }}
                  onClick={handleLoginClick}
                >
                  Log in (eventually)
                </SlothButton>
              </Link>
              <Link to="/signup">
                <SlothButton
                  variant="ghost"
                  className="min-w-[200px]"
                  style={{ transform: `translate(${signupOffset.x}px, ${signupOffset.y}px)` }}
                  onMouseEnter={() => {
                    if (signupDodges < 3) {
                      const x = (Math.random() * 120 - 60);
                      const y = (Math.random() * 40 - 20);
                      setSignupOffset({ x, y });
                      setSignupDodges((d) => d + 1);
                    }
                  }}
                  onClick={(e) => {
                    if (signupDodges < 3) {
                      e.preventDefault();
                      const x = (Math.random() * 120 - 60);
                      const y = (Math.random() * 40 - 20);
                      setSignupOffset({ x, y });
                      setSignupDodges((d) => d + 1);
                      toast({ description: 'Nice try. Again.', duration: 900 });
                    } else {
                      e.preventDefault();
                      navigate('/signup');
                    }
                  }}
                >
                  Sign up (fake hustle)
                </SlothButton>
              </Link>
            </div>

            <div className="mt-6 rounded-2xl bg-primary/10 px-4 py-3 flex items-center justify-between">
              <div className="font-semibold">You ready?</div>
              <InlineGag />
              <Link to="/login" className="text-sm underline text-primary">Okay fine → Log in</Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative flex items-center justify-center">
              <LagTheSloth mood="smug" size="lg" onClick={() => { setShowL(true); setTimeout(() => setShowL(false), 600); }} />
              <div className="absolute -top-8 -right-6 md:-right-10 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-glow px-4 py-2 text-sm md:text-base origin-bottom-right" aria-live="polite">
                {bubbleLines[bubbleIndex]}
              </div>
            </div>
          </div>
        </section>

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

      <Validator open={showValidator} onDone={() => {}} />
      <ConfettiL show={showL} onDone={() => setShowL(false)} />
    </div>
  );
};

const InlineGag = () => {
  const [state, setState] = useState<'yes' | 'flip'>('yes');
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
      <SlothButton size="sm" variant="ghost">No</SlothButton>
    </div>
  );
};

export default Landing;
