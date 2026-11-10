// Web Audio API Synthesizer for Fashion Runway Ambience and UI Feedback
let audioCtx = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// UI Sound Effects
export const playSound = (type, isMuted) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'swipe') {
      // Soft whoosh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.15);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'add') {
      // Melodic double chime
      [587.33, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      });
    } else if (type === 'success') {
      // Celebratory chord
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.06;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.6);
      });
    }
  } catch (_) {}
};

// Ambient Runway Pulse Synthesizer
let ambientInterval = null;
let isAmbientPlaying = false;

export const startAmbientRunway = () => {
  const ctx = getAudioContext();
  if (!ctx || isAmbientPlaying) return;
  isAmbientPlaying = true;

  let step = 0;
  const bassNotes = [55, 55, 65.4, 73.4]; // A1, A1, C2, D2

  ambientInterval = setInterval(() => {
    if (!isAmbientPlaying) return;
    try {
      const now = ctx.currentTime;
      const note = bassNotes[step % bassNotes.length];

      // Deep bass kick/pulse
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(note, now);
      bassOsc.frequency.exponentialRampToValueAtTime(35, now + 0.18);
      bassGain.gain.setValueAtTime(0.14, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 0.2);

      // Hi-hat tick
      if (step % 2 === 1) {
        const hatOsc = ctx.createOscillator();
        const hatGain = ctx.createGain();
        hatOsc.type = 'square';
        hatOsc.frequency.setValueAtTime(6000, now);
        hatGain.gain.setValueAtTime(0.02, now);
        hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        hatOsc.connect(hatGain);
        hatGain.connect(ctx.destination);
        hatOsc.start(now);
        hatOsc.stop(now + 0.03);
      }

      step++;
    } catch (_) {}
  }, 500); // 120 BPM fashion runway groove
};

export const stopAmbientRunway = () => {
  isAmbientPlaying = false;
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
};
