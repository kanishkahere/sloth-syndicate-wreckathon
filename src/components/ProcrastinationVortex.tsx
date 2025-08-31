import { useEffect, useState } from 'react';

interface ProcrastinationVortexProps {
  accelerate?: boolean;
}

export const ProcrastinationVortex = ({ accelerate = false }: ProcrastinationVortexProps) => {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const baseSpeed = accelerate ? 120 : 150; // seconds per rotation
    document.documentElement.style.setProperty('--vortex-speed', baseSpeed + 's');
    document.documentElement.style.setProperty('--vortex-opacity', accelerate ? '0.10' : '0.07');
  }, [accelerate]);

  useEffect(() => {
    // +5% speed blip for 300ms on any button hover
    const onBlip = () => {
      const current = getComputedStyle(document.documentElement).getPropertyValue('--vortex-speed').trim();
      const seconds = parseFloat(current.replace('s','')) || (accelerate ? 120 : 150);
      const faster = (seconds * 0.95).toFixed(2) + 's';
      document.documentElement.style.setProperty('--vortex-speed', faster);
      const t = setTimeout(() => {
        document.documentElement.style.setProperty('--vortex-speed', (accelerate ? 120 : 150) + 's');
      }, 300);
      return () => clearTimeout(t);
    };
    window.addEventListener('vortex:blip', onBlip);
    return () => window.removeEventListener('vortex:blip', onBlip);
  }, [accelerate]);

  if (isReduced) {
    return (
      <div className="fixed inset-0 pointer-events-none z-[-1]" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-50" />
      </div>
    );
  }

  return (
    <div className="vortex" aria-hidden="true" />
  );
};
