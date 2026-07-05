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
  const InputTag = multiline ? 'textarea' : 'input';

  return (
    <div className="form-field form-group">
      {label && (
        <label htmlFor={id}>{label}</label>
      )}
      <div className="bubble-field">
        <span className="bubble-field-shine" aria-hidden="true" />
        <InputTag
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
