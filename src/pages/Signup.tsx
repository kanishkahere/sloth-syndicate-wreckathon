import { Link, useNavigate } from 'react-router-dom';
import { ProcrastinationVortex } from '@/components/ProcrastinationVortex';
import { SlothButton } from '@/components/ui/sloth-button';

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ProcrastinationVortex />
      <video
        className="pointer-events-none fixed inset-0 w-full h-full object-cover opacity-60"
        src="https://cdn.builder.io/o/assets%2F21067886da9840e3b067c9931e5f0aac%2F97aed06f20184a238cd0e3fb3458bc9b?alt=media&token=bb314a3f-2485-420a-8001-609d2bc11047&apiKey=21067886da9840e3b067c9931e5f0aac"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="relative z-10 min-h-screen flex items-center justify-end px-6 py-12">
        <div className="w-full max-w-[520px] bg-white/10 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-glow border border-white/20 text-white md:-translate-x-6">
          <h1 className="font-heading text-2xl md:text-3xl mb-1">Adopt a sloth (you)</h1>
          <p className="text-sm text-white/80 mb-6">Fake hustle starts here. Commitment optional.</p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
            <div className="space-y-1">
              <label htmlFor="name" className="text-[11px] font-semibold tracking-wide uppercase">Name</label>
              <input id="name" required className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder:text-white/60 focus-visible:outline-2 focus-visible:outline-[#00FFFF]" placeholder="Sloth Enthusiast" />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-[11px] font-semibold tracking-wide uppercase">Email</label>
              <input id="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder:text-white/60 focus-visible:outline-2 focus-visible:outline-[#00FFFF]" placeholder="you@later.com" />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-[11px] font-semibold tracking-wide uppercase">Password</label>
              <input id="password" type="password" required className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder:text-white/60 focus-visible:outline-2 focus-visible:outline-[#00FFFF]" placeholder="••••••••" />
            </div>
            <SlothButton className="w-full">Create account</SlothButton>
          </form>
          <p className="text-sm mt-4">Already wasting time? <Link to="/login" className="underline">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
