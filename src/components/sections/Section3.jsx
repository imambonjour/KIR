import { useRef } from 'react';
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
  useFieldStagger(containerRef, isActive);

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

  return (
    <div ref={containerRef}>
      <h2 className="section-title">Minat</h2>
      <p className="section-desc">Pilih bidang yang kamu sukai</p>

      <div className="form-field form-group">
        <label>Mata Pelajaran yang Diminati</label>
        <div className="tags-wrap">
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
