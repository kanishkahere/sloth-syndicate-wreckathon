export function playTone(startFreq: number, endFreq: number, duration = 0.25, type: OscillatorType = 'square', gainStart = 0.15) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(startFreq, ctx.currentTime);
    o.frequency.linearRampToValueAtTime(endFreq, ctx.currentTime + duration);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(gainStart, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
    o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + duration + 0.02);
  } catch {}
}

export function sfxKazoo() { playTone(220, 110, 0.22, 'sawtooth', 0.2); }
export function sfxGoat() { playTone(440, 220, 0.35, 'triangle', 0.25); }
export function sfxBuzzer() { playTone(120, 60, 0.5, 'square', 0.2); }
export function sfxGlitch() { playTone(800, 1200, 0.2, 'sawtooth', 0.12); }
