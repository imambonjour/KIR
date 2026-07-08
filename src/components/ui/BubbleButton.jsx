import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { popBubble } from '../../utils/bubblePop';

export default function BubbleButton({
  children,
  onClick,
  className = '',
  variant = 'default',
  disabled = false,
  type = 'button',
  selected = false,
  ...props
}) {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || disabled) return;

    // Hover animation - bubble wobble + scale
    const handleMouseEnter = () => {
      gsap.to(btn, {
        scale: 1.08,
        y: -4,
        duration: 0.3,
        ease: 'back.out(1.5)',
        boxShadow: 'inset 0 3px 10px rgba(255, 255, 255, 0.65), inset 0 -4px 12px rgba(0, 80, 160, 0.12), 0 12px 32px rgba(0, 60, 120, 0.35)'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        scale: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
        boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.55), inset 0 -4px 12px rgba(0, 80, 160, 0.1), 0 6px 20px rgba(0, 60, 120, 0.25)'
      });
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled]);

  // Disable state fade-out animation
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    if (disabled) {
      gsap.to(btn, {
        opacity: 0.35,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.out'
      });
    } else {
      gsap.to(btn, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  }, [disabled]);

  const handleClick = (e) => {
    if (disabled) return;
    
    // Enhanced pop animation with GSAP
    const tl = gsap.timeline({
      onComplete: () => {
        popBubble(btnRef.current);
      }
    });
    
    tl.to(btnRef.current, {
      scale: 0.92,
      duration: 0.08,
      ease: 'power2.in'
    }).to(btnRef.current, {
      scale: 1.05,
      duration: 0.12,
      ease: 'back.out(2)'
    });
    
    onClick?.(e);
  };

  const classes = [
    'soap-bubble-btn',
    variant !== 'default' && `soap-bubble-btn--${variant}`,
    selected && 'selected',
    disabled && 'disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={btnRef}
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <span className="soap-bubble-shine" aria-hidden="true" />
      <span className="soap-bubble-inner">{children}</span>
    </button>
  );
}
