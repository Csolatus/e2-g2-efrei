/**
 * Champ de formulaire générique : label, contrôle (input, select ou textarea),
 * texte d'aide et message d'erreur, avec les liaisons d'accessibilité.
 * @param {'input'|'select'|'textarea'} as - Type de contrôle à afficher.
 * @param {{value: string, label: string, disabled?: boolean}[]} options - Options du `select`.
 */
function FormField({
  as = 'input',
  id,
  label,
  error,
  hint,
  required = false,
  options = [],
  placeholderOption,
  ...controlProps
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ');
  const sharedProps = {
    id,
    className: `${as === 'select' ? 'form-select' : 'form-control'} ${error ? 'is-invalid' : ''}`,
    'aria-required': required,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy || undefined,
    ...controlProps,
  };

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {as === 'select' && (
        <select {...sharedProps}>
          <option value="">{placeholderOption}</option>
          {options.map(({ value, label: optionLabel, disabled }) => (
            <option key={value} value={value} disabled={disabled}>{optionLabel}</option>
          ))}
        </select>
      )}
      {as === 'textarea' && <textarea rows={5} {...sharedProps} />}
      {as === 'input' && <input {...sharedProps} />}
      {hint && <div className="form-text" id={`${id}-hint`}>{hint}</div>}
      {error && <div className="invalid-feedback" id={`${id}-error`}>{error}</div>}
    </div>
  );
}

export default FormField;
