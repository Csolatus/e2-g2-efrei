function Loader({ label = 'Chargement…' }) {
  return (
    <div className="d-flex justify-content-center py-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{label}</span>
      </div>
    </div>
  );
}

export default Loader;
