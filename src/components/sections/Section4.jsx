import { useRef } from 'react';
import { useFieldStagger } from '../../hooks/useFieldStagger';
import BubbleField from '../ui/BubbleField';

export default function Section4({ form, updateField, isActive }) {
  const containerRef = useRef(null);
  useFieldStagger(containerRef, isActive);

  return (
    <div ref={containerRef}>
      <h2 className="section-title">Motivasi</h2>
      <p className="section-desc">Ceritakan alasanmu bergabung dengan KIR</p>

      <BubbleField
        id="motivation"
        label="Alasan bergabung dengan KIR"
        placeholder="Ceritakan alasanmu..."
        value={form.motivation}
        onChange={e => updateField('motivation', e.target.value)}
        multiline
        rows={5}
        required
      />
    </div>
  );
}
