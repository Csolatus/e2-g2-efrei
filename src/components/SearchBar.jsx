function SearchBar({ value, onChange, label = 'Rechercher', placeholder = 'Rechercher…' }) {
  return (
    <div>
      <label htmlFor="search-input" className="visually-hidden">{label}</label>
      <input
        id="search-input"
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
