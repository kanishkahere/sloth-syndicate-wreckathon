import { Link } from 'react-router-dom';
import { SlothButton } from '@/components/ui/sloth-button';

const Landing = () => {
  return (
    <div className="min-h-screen overflow-hidden grid place-items-center bg-background text-foreground">
      <div className="text-center space-y-6 max-w-xl px-6">
        <div className="flex items-center justify-center gap-2 text-4xl font-heading">
          <span role="img" aria-label="sloth">🦥</span>
          <span className="font-extrabold">SLOTH</span>
        </div>
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Procrastination Machine</p>
        <p className="text-lg text-foreground/80">Your favorite productivity app that actively gets in the way.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/login"><SlothButton className="min-w-[200px]">Log in</SlothButton></Link>
          <Link to="/signup"><SlothButton variant="ghost" className="min-w-[200px]">Sign up</SlothButton></Link>
        </div>
        <p className="text-xs text-muted-foreground">“Another day, another L.”</p>
      </div>
    </div>
  );
};

export default Landing;
