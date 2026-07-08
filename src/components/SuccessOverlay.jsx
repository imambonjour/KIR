import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SuccessOverlay({ isVisible }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      // Create confetti particles
      const createConfetti = () => {
        const colors = ['#c9b8f0', '#8fd8f5', '#c3f0b0', '#f5c2e0', '#ffd700', '#ffffff'];
        const container = overlayRef.current;
        if (!container) return;

        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.className = 'confetti-particle';
          
          const angle = (Math.PI * 2 * i) / 50 + Math.random() * 0.5;
          const distance = 100 + Math.random() * 150;
          const size = 6 + Math.random() * 8;
          
          particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: 50%;
            top: 50%;
            pointer-events: none;
            z-index: 10;
          `;
          
          container.appendChild(particle);
          
          gsap.to(particle, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance + 100,
            rotation: Math.random() * 720 - 360,
            opacity: 0,
            scale: 0,
            duration: 1.2 + Math.random() * 0.5,
            ease: 'power2.out',
            onComplete: () => particle.remove()
          });
        }
      };

      const tl = gsap.timeline();
      
      // Fade in backdrop
      tl.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      // Scale and rotate icon with bounce
      .fromTo(contentRef.current.querySelector('h3'),
        { y: 40, opacity: 0, scale: 0.5, rotation: -15 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 0.7, 
          ease: 'back.out(1.7)' 
        },
        '<0.1'
      )
      // Stagger text reveal
      .fromTo(contentRef.current.querySelectorAll('p'),
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.12, 
          duration: 0.4, 
          ease: 'power2.out' 
        },
        '<0.2'
      );

      // Trigger confetti burst
      setTimeout(createConfetti, 200);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="modal-backdrop opacity-0 invisible"
    >
      <div ref={contentRef} className="modal-card">
        <h3>🎉 Pendaftaran Sukses!</h3>
        <p style={{ marginTop: 12 }}>
          Pendaftaranmu telah kami terima. Kami akan segera menghubungimu melalui WhatsApp.
        </p>
        <p style={{ marginTop: 8, fontSize: '0.85rem', fontStyle: 'italic' }}>
          Selamat datang di dunia sains!
        </p>
      </div>
    </div>
  );
}
