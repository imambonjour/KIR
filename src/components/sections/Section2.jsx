import { useRef } from 'react';
import { useFieldStagger } from '../../hooks/useFieldStagger';
import BubbleField from '../ui/BubbleField';

export default function Section2({ form, updateField, isActive }) {
  const containerRef = useRef(null);
  useFieldStagger(containerRef, isActive);

  return (
    <div ref={containerRef}>
      <h2 className="section-title">Kontak</h2>
      <p className="section-desc">Bagaimana kami bisa menghubungimu?</p>

      <BubbleField
        id="whatsapp"
        label="Nomor WhatsApp"
        type="tel"
        placeholder="08xxxxxxxxxx"
        value={form.whatsapp}
        onChange={e => updateField('whatsapp', e.target.value)}
        required
      />
    </div>
  );
}
