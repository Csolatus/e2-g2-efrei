/**
 * Rangée de listes déroulantes pilotée par configuration : le composant ne
 * connaît ni les projets ni les formations, il boucle sur `filters`.
 * @param {{name: string, label: string, options: string[]}[]} filters
 * @param {Object<string, string>} values - Valeur sélectionnée par filtre ('' = tous).
 * @param {(name: string, value: string) => void} onChange
 */
function FilterBar({ filters, values, onChange }) {
  return (
    <div className="row g-2">
      {filters.map(({ name, label, options }) => (
        <div className="col-12 col-md" key={name}>
          <label htmlFor={`filter-${name}`} className="form-label small mb-1">{label}</label>
          <select
            id={`filter-${name}`}
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
