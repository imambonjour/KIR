import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function BubbleField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  multiline = false,
  rows,
}) {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const input = inputRef.current;
    if (!container || !input) return;

    // Focus animation - scale + glow
    const handleFocus = () => {
      gsap.to(container, {
        scale: 1.02,
        borderColor: 'rgba(255, 255, 255, 0.75)',
        backgroundColor: 'rgba(255, 255, 255, 0.28)',
        boxShadow: 'inset 0 2px 6px rgba(255, 255, 255, 0.5), 0 0 0 4px rgba(255, 255, 255, 0.15), 0 6px 20px rgba(0, 60, 120, 0.25)',
        duration: 0.25,
        ease: 'power2.out'
      });
      
      // Label float animation
      const labelEl = container.querySelector('label');
      if (labelEl) {
        gsap.to(labelEl, {
          y: -3,
          color: '#fff',
          textShadow: '0 2px 8px rgba(0, 60, 120, 0.5)',
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    };

    const handleBlur = () => {
      gsap.to(container, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.45)',
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        boxShadow: 'inset 0 2px 6px rgba(255, 255, 255, 0.35), inset 0 -2px 6px rgba(0, 80, 160, 0.08), 0 4px 16px rgba(0, 60, 120, 0.15)',
        duration: 0.25,
        ease: 'power2.out'
      });
      
      // Label reset
      const labelEl = container.querySelector('label');
      if (labelEl) {
        gsap.to(labelEl, {
          y: 0,
          color: 'rgba(255, 255, 255, 0.92)',
          textShadow: '0 1px 4px rgba(0, 60, 120, 0.4)',
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    };

    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);

    return () => {
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
    };
  }, []);

  const InputTag = multiline ? 'textarea' : 'input';

  return (
    <div ref={containerRef} className="form-field form-group">
      {label && (
        <label htmlFor={id}>{label}</label>
      )}
      <div className="bubble-field">
        <span className="bubble-field-shine" aria-hidden="true" />
        <InputTag
          ref={inputRef}
          id={id}
          type={multiline ? undefined : type}
          className={`bubble-field-input${multiline ? ' bubble-field-textarea' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
        />
      </div>
    </div>
  );
}
