import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="container py-5 text-center">
      <h1>Page introuvable</h1>
      <Link to="/" className="btn btn-dark mt-3">Retour à l'accueil</Link>
    </section>
  );
}

export default NotFound;
