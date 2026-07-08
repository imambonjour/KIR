import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useFieldStagger } from '../../hooks/useFieldStagger';
import BubbleButton from '../ui/BubbleButton';

const SUBJECTS = [
  'Matematika', 'Fisika', 'Biologi', 'Kimia',
  'Sosiologi', 'Sejarah', 'Geografi', 'Ekonomi',
  'PAI', 'Akidah Akhlak', 'Fikih', 'Al-Quran Hadis', 'SKI'
];

const INTERESTS = [
  'Olimpiade', 'Karya Tulis Ilmiah', 'Robotik',
  'Programming', 'Multimedia', 'Seni'
];

export default function Section3({ form, updateField, isActive }) {
  const containerRef = useRef(null);
  const tagsContainerRef = useRef(null);
  useFieldStagger(containerRef, isActive);

  // Tag selection animation with stagger on initial render
  useEffect(() => {
    if (!tagsContainerRef.current || !isActive) return;

    const buttons = tagsContainerRef.current.querySelectorAll('.soap-bubble-btn--tag');
    
    gsap.fromTo(buttons,
      { scale: 0, autoAlpha: 0 },
      {
        scale: 1,
        autoAlpha: 1,
        stagger: 0.03,
        duration: 0.35,
        ease: 'back.out(1.4)',
        clearProps: 'scale'
      }
    );
  }, [isActive]);

  const toggleSubject = (subject) => {
    const next = form.subjects.includes(subject)
      ? form.subjects.filter(s => s !== subject)
      : [...form.subjects, subject];
    updateField('subjects', next);
  };

  const toggleInterest = (interest) => {
    const next = form.interests.includes(interest)
      ? form.interests.filter(i => i !== interest)
      : [...form.interests, interest];
    updateField('interests', next);
  };

  // Animate selected state change
  useEffect(() => {
    if (!tagsContainerRef.current) return;

    const buttons = tagsContainerRef.current.querySelectorAll('.soap-bubble-btn--tag');
    buttons.forEach(btn => {
      const isSelected = btn.classList.contains('selected');
      
      if (isSelected) {
        gsap.to(btn, {
          scale: 1.08,
          backgroundColor: 'radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.9) 0%, rgba(195, 240, 176, 0.35) 40%, rgba(143, 216, 245, 0.25) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.75)',
          boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.7), inset 0 -4px 12px rgba(90, 169, 106, 0.15), 0 8px 24px rgba(0, 60, 120, 0.3)',
          duration: 0.25,
          ease: 'back.out(1.7)'
        });
      } else {
        gsap.to(btn, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    });
  }, [form.subjects, form.interests]);

  return (
    <div ref={containerRef}>
      <h2 className="section-title">Minat</h2>
      <p className="section-desc">Pilih bidang yang kamu sukai</p>

      <div className="form-field form-group">
        <label>Mata Pelajaran yang Diminati</label>
        <div ref={tagsContainerRef} className="tags-wrap">
          {SUBJECTS.map(subject => (
            <BubbleButton
              key={subject}
              type="button"
              variant="tag"
              selected={form.subjects.includes(subject)}
              onClick={() => toggleSubject(subject)}
            >
              {subject}
            </BubbleButton>
          ))}
        </div>
      </div>

      <div className="form-field form-group">
        <label>Bidang yang Diminati</label>
        <div className="tags-wrap">
          {INTERESTS.map(interest => (
            <BubbleButton
              key={interest}
              type="button"
              variant="tag"
              selected={form.interests.includes(interest)}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </BubbleButton>
          ))}
        </div>
      </div>
    </div>
  );
}
