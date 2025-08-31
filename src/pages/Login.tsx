import { Link } from 'react-router-dom';
import { ProcrastinationVortex } from '@/components/ProcrastinationVortex';
import { SlothButton } from '@/components/ui/sloth-button';

const Login = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-12">
      <ProcrastinationVortex />
      <div className="relative z-10 w-full max-w-[1000px] grid md:grid-cols-2 gap-8 bg-white/70 backdrop-blur rounded-3xl p-6 md:p-8 shadow-glow">
        <div className="rounded-2xl overflow-hidden bg-black/5 aspect-video">
          <video src="/sloth.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline aria-label="Slow sloth video" />
        </div>
        <div>
          <h1 className="font-heading text-2xl md:text-3xl mb-2">Enter the delay chamber</h1>
          <p className="text-sm text-foreground/70 mb-6">We reward failure here.</p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input id="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-cyan-400 outline-none" />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input id="password" type="password" required className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-cyan-400 outline-none" />
            </div>
            <SlothButton className="w-full">Log in</SlothButton>
          </form>
          <p className="text-sm mt-4">New here? <Link to="/signup" className="underline">Sign up (fake hustle)</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
