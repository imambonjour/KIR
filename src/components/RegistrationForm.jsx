import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import BubbleButton from './ui/BubbleButton';

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
  subjects: '',
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
      return form.subjects.trim() && form.interests.length > 0;
    case 3:
      return form.motivation.trim().length >= 10;
    default:
      return true;
  }
}

export default function RegistrationForm({ onSuccess }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    if (!validateStep(step, form)) return;
    if (step < STEPS.length - 1) setStep(s => s + 1);
  };

  const goBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(3, form)) return;
    if (onSuccess) onSuccess(form);
  };

  useGSAP(() => {
    gsap.fromTo(
      contentRef.current,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out' }
    );
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
            <BubbleButton type="submit" variant="cta">
              Submit
            </BubbleButton>
          ) : (
            <BubbleButton type="button" variant="cta" onClick={goNext}>
              Lanjut
            </BubbleButton>
          )}
        </div>
      </form>
    </div>
  );
}
