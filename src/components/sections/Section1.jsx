import { useRef } from 'react';
import { useFieldStagger } from '../../hooks/useFieldStagger';
import BubbleField from '../ui/BubbleField';

export default function Section1({ form, updateField, isActive }) {
  const containerRef = useRef(null);
  useFieldStagger(containerRef, isActive);

  return (
    <div ref={containerRef}>
      <h2 className="section-title">Identitas Diri</h2>
      <p className="section-desc">Ceritakan sedikit tentang dirimu</p>

      <BubbleField
        id="fullName"
        label="Nama Lengkap"
        placeholder="Masukkan nama lengkap..."
        value={form.fullName}
        onChange={e => updateField('fullName', e.target.value)}
        required
      />

      <BubbleField
        id="school"
        label="Asal Sekolah"
        placeholder="Nama sekolahmu..."
        value={form.school}
        onChange={e => updateField('school', e.target.value)}
        required
      />

      <BubbleField
        id="birthDate"
        label="Tanggal Lahir"
        type="date"
        value={form.birthDate}
        onChange={e => updateField('birthDate', e.target.value)}
        required
      />
    </div>
  );
}
