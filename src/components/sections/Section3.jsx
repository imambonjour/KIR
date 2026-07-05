import { useRef } from 'react';
import { useFieldStagger } from '../../hooks/useFieldStagger';
import BubbleField from '../ui/BubbleField';
import BubbleButton from '../ui/BubbleButton';

const INTERESTS = [
  'Olimpiade', 'Karya Tulis Ilmiah', 'Robotik',
  'Programming', 'Multimedia', 'Seni',
  'Matematika', 'Fisika', 'Biologi', 'Kimia',
];

export default function Section3({ form, updateField, isActive }) {
  const containerRef = useRef(null);
  useFieldStagger(containerRef, isActive);

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

      <BubbleField
        id="subjects"
        label="Mata Pelajaran yang Diminati"
        placeholder="Contoh: Fisika, Biologi..."
        value={form.subjects}
        onChange={e => updateField('subjects', e.target.value)}
        required
      />

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
