import { Link } from 'react-router-dom';
import TechBadges from './TechBadges.jsx';

function CourseCard({ course, onSelect }) {
  return (
    <article className="card h-100">
      <img
        src={course.image}
        alt={`Illustration de la formation ${course.title}`}
        className="card-img-top"
        loading="lazy"
      />
      <div className="card-body d-flex flex-column gap-2">
        <p className="text-muted small mb-0">{course.category} · {course.level}</p>
        <h3 className="card-title h5 mb-0">{course.title}</h3>
        <p className="mb-0">{course.instructor} · {course.duration}</p>
        <p className="fw-bold mb-0">{course.price.toLocaleString('fr-FR')} €</p>
        <TechBadges technologies={course.technologies} />
        <div className="d-flex gap-2 mt-auto">
          <button
            type="button"
            className="btn btn-outline-dark flex-fill"
            onClick={() => onSelect(course)}
            aria-label={`Voir les détails de la formation ${course.title}`}
          >
            Voir détails
          </button>
          {course.available ? (
            <Link to={`/inscription?formation=${course.id}`} className="btn btn-dark flex-fill">
              S'inscrire
            </Link>
          ) : (
            <button type="button" className="btn btn-secondary flex-fill" disabled>Complet</button>
          )}
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
