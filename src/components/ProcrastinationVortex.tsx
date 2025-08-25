import { useEffect, useState } from 'react';

interface ProcrastinationVortexProps {
  accelerate?: boolean;
}

export const ProcrastinationVortex = ({ accelerate = false }: ProcrastinationVortexProps) => {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (accelerate) {
      document.documentElement.style.setProperty('--vortex-speed', '15s');
      document.documentElement.style.setProperty('--vortex-opacity', '0.8');
    } else {
      document.documentElement.style.setProperty('--vortex-speed', '30s');
      document.documentElement.style.setProperty('--vortex-opacity', '0.6');
    }
  }, [accelerate]);

  if (isReduced) {
    return (
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-50" />
      </div>
    );
  }

  return (
    <div className="vortex" aria-hidden="true" />
  );
};