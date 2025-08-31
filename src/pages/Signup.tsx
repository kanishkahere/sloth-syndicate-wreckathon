import { Link, useNavigate } from 'react-router-dom';
import { ProcrastinationVortex } from '@/components/ProcrastinationVortex';
import { SlothButton } from '@/components/ui/sloth-button';

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-12">
      <ProcrastinationVortex />
      <div className="relative z-10 w-full max-w-[600px] bg-white/80 dark:bg-zinc-900/70 backdrop-blur rounded-3xl p-6 md:p-8 shadow-glow">
        <h1 className="font-heading text-2xl md:text-3xl mb-2">Adopt a sloth (you)</h1>
        <p className="text-sm text-foreground/70 mb-6">Fake hustle starts here.</p>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input id="name" required className="w-full px-4 py-3 rounded-lg border border-border bg-white dark:bg-zinc-900 text-foreground focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-border bg-white dark:bg-zinc-900 text-foreground focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input id="password" type="password" required className="w-full px-4 py-3 rounded-lg border border-border bg-white dark:bg-zinc-900 text-foreground focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          <SlothButton className="w-full">Create account</SlothButton>
        </form>
        <p className="text-sm mt-4">Already wasting time? <Link to="/login" className="underline">Log in</Link></p>
      </div>
    </div>
  );
};

export default Signup;
