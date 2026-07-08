import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import BubbleButton from './ui/BubbleButton';
import { supabase } from '../lib/supabaseClient';

gsap.registerPlugin(useGSAP);

const STEPS = [
  { title: 'Identitas', component: Section1 },
  { title: 'Kontak', component: Section2 },
  { title: 'Minat', component: Section3 },
  { title: 'Motivasi', component: Section4 },
];

const INITIAL_FORM = {
  fullName: '',
  school: '',
  birthDate: '',
  whatsapp: '',
  subjects: [],
  interests: [],
  motivation: '',
};

function validateStep(step, form) {
  switch (step) {
    case 0:
      return form.fullName.trim() && form.school.trim() && form.birthDate;
    case 1:
      return form.whatsapp.trim().length >= 10;
    case 2:
      return form.subjects.length > 0 && form.interests.length > 0;
    case 3:
      return form.motivation.trim().length >= 10;
    default:
      return true;
  }
}

export default function RegistrationForm({ onSuccess }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [direction, setDirection] = useState(0);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const progressDotsRef = useRef([]);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    if (!validateStep(step, form)) return;
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep(s => s + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3, form)) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    const { error } = await supabase
      .from('registrations')
      .insert([
        {
          full_name: form.fullName,
          school: form.school,
          birth_date: form.birthDate,
          whatsapp: form.whatsapp,
          subjects: form.subjects,
          interests: form.interests,
          motivation: form.motivation,
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      setSubmitError('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
      console.error(error);
    } else {
      if (onSuccess) onSuccess(form);
    }
  };

  // Animate progress dots on step change
  useGSAP(() => {
    progressDotsRef.current.forEach((dot, i) => {
      if (i < step) {
        gsap.to(dot, { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', duration: 0.3 });
      } else if (i === step) {
        gsap.to(dot, { 
          width: 28, 
          borderRadius: '999px', 
          backgroundColor: 'rgba(255, 255, 255, 0.55)',
          boxShadow: '0 2px 10px rgba(255, 255, 255, 0.4)',
          duration: 0.4, 
          ease: 'back.out(1.7)' 
        });
      } else {
        gsap.to(dot, { 
          width: 10, 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          boxShadow: 'none',
          duration: 0.3 
        });
      }
    });
  }, { scope: containerRef, dependencies: [step] });

  // Enhanced step transition animation with slide effect
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const content = contentRef.current;
      if (!content) return;

      const slideDirection = direction;
      const fromX = slideDirection > 0 ? 60 : -60;
      const toX = slideDirection > 0 ? -60 : 60;

      // Slide out old content
      gsap.to(content, {
        x: toX,
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          // Slide in new content
          gsap.fromTo(content,
            { x: fromX, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' }
          );
        }
      });
    }, { scope: containerRef });

    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [step] });

  const CurrentSection = STEPS[step].component;
  const isLast = step === STEPS.length - 1;

  return (
    <div ref={containerRef} className="app-container">
      <h1 className="page-title">Pendaftaran KIR</h1>
      <p className="page-sub">Kelompok Ilmiah Remaja — {STEPS[step].title}</p>

      <div className="step-dots">
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            ref={el => progressDotsRef.current[i] = el}
            className={`step-dot${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div ref={contentRef}>
          <CurrentSection
            form={form}
            updateField={updateField}
            isActive
          />
        </div>

        <div className="form-nav">
          <BubbleButton
            type="button"
            variant="nav"
            onClick={goBack}
            disabled={step === 0}
          >
            Kembali
          </BubbleButton>

          {isLast ? (
            <BubbleButton type="submit" variant="cta" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'Submit'}
            </BubbleButton>
          ) : (
            <BubbleButton type="button" variant="cta" onClick={goNext}>
              Lanjut
            </BubbleButton>
          )}
        </div>
        {submitError && (
          <p className="text-red-400 text-sm text-center mt-4">{submitError}</p>
        )}
      </form>
    </div>
  );
}
