function SearchBar({ id, value, onChange, label = 'Rechercher', placeholder = 'Rechercher…' }) {
  return (
    <div>
      <label htmlFor={id} className="visually-hidden">{label}</label>
      <input
        id={id}
        type="search"
        className="form-control"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
