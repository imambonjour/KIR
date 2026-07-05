import { useEffect } from 'react';
import gsap from 'gsap';

export function useFieldStagger(containerRef, isActive) {
  useEffect(() => {
    if (!containerRef.current) return;

    if (isActive) {
      const fields = containerRef.current.querySelectorAll('.form-field');
      if (fields.length === 0) return;

      gsap.fromTo(fields, 
        { y: 15, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power3.out',
          clearProps: 'all' // allow normal interaction after animation
        }
      );
    }
  }, [isActive, containerRef]);
}
