import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SuccessOverlay({ isVisible }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.out',
      }).fromTo(
        contentRef.current,
        { y: 24, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
        '<0.1'
      );
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
        <a
          href="https://chat.whatsapp.com/G9nnBt4ZAThEwV8ZT9mR5C"
          target="_blank"
          rel="noopener noreferrer"
          className="soap-bubble-btn soap-bubble-btn--cta"
          style={{
            width: 140,
            height: 54,
            borderRadius: 999,
            marginTop: 24,
            textDecoration: 'none',
            animation: 'bubbleWobble 3.5s ease-in-out infinite',
          }}
        >
          <span className="soap-bubble-shine" />
          <span className="soap-bubble-inner">Join Grup WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
