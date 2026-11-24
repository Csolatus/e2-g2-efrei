/**
 * Rangée de listes déroulantes pilotée par configuration : le composant ne
 * connaît ni les projets ni les formations, il boucle sur `filters`.
 * @param {string} idPrefix - Préfixe des id, unique par barre (plusieurs barres peuvent coexister sur une page).
 * @param {{name: string, label: string, options: string[]}[]} filters
 * @param {Object<string, string>} values - Valeur sélectionnée par filtre ('' = tous).
 * @param {(name: string, value: string) => void} onChange
 */
function FilterBar({ idPrefix, filters, values, onChange }) {
  return (
    <div className="row g-2">
      {filters.map(({ name, label, options }) => (
        <div className="col-12 col-md" key={name}>
          <label htmlFor={`${idPrefix}-${name}`} className="form-label small mb-1">{label}</label>
          <select
            id={`${idPrefix}-${name}`}
            className="form-select"
            value={values[name] ?? ''}
            onChange={(event) => onChange(name, event.target.value)}
          >
            <option value="">Tous</option>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default FilterBar;
