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
      </div>
    </div>
  );
}
