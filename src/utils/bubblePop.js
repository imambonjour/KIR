let audioCtx = null;

export function playPopSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    /* audio blocked */
  }
}

const BURST_COLORS = ['#c9b8f0', '#8fd8f5', '#c3f0b0', '#f5c2e0', '#ffffff'];

export function popBubble(el) {
  if (!el) return;

  playPopSound();

  el.classList.remove('popped');
  void el.offsetWidth;
  el.classList.add('popped');

  const rect = el.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  const ring = document.createElement('div');
  ring.className = 'bubble-ring';
  ring.style.left = `${cx}px`;
  ring.style.top = `${cy}px`;
  el.appendChild(ring);
  setTimeout(() => ring.remove(), 550);

  const count = 12;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'bubble-burst';
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 35 + Math.random() * 35;
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    p.style.left = `${cx}px`;
    p.style.top = `${cy}px`;
    p.style.background = BURST_COLORS[i % BURST_COLORS.length];
    const size = 4 + Math.random() * 5;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    el.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }
}
