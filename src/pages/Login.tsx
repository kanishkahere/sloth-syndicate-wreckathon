import { Link, useNavigate } from 'react-router-dom';
import { ProcrastinationVortex } from '@/components/ProcrastinationVortex';
import { SlothButton } from '@/components/ui/sloth-button';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-12">
      <ProcrastinationVortex />
      <div className="relative z-10 w-full max-w-[520px] bg-card/80 backdrop-blur rounded-3xl p-6 md:p-8 shadow-glow border border-border">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl mb-1">Enter the delay chamber</h1>
          <p className="text-sm text-muted-foreground mb-6">We reward failure here. Bring your worst.</p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-semibold tracking-wide uppercase">Email</label>
              <input id="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/50 focus-visible:outline-2 focus-visible:outline-[#00FFFF]" placeholder="you@later.com" />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-xs font-semibold tracking-wide uppercase">Password</label>
              <input id="password" type="password" required className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/50 focus-visible:outline-2 focus-visible:outline-[#00FFFF]" placeholder="••••••••" />
            </div>
            <SlothButton className="w-full">Log in</SlothButton>
          </form>
          <p className="text-[11px] mt-3 text-muted-foreground uppercase tracking-wide">PROD LEVEL: -100 💀</p>
          <p className="text-sm mt-4">New here? <Link to="/signup" className="underline">Sign up (fake hustle)</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
