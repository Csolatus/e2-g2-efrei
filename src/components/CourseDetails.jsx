import { Link } from 'react-router-dom';
import TechBadges from './TechBadges.jsx';

function CourseDetails({ course }) {
  return (
    <>
      <img src={course.image} alt={`Illustration de la formation ${course.title}`} className="img-fluid rounded mb-3" />
      <p className="text-muted">
        {course.category} · {course.level} · {course.duration} · {course.instructor}
      </p>
      <p>{course.description}</p>
      <p>
        {course.rating} / 5 · {course.students} étudiants · {course.price.toLocaleString('fr-FR')} €
      </p>
      <h3 className="h6">Programme</h3>
      <ul>
        {course.modules.map((module) => (
          <li key={module}>{module}</li>
        ))}
      </ul>
      <TechBadges technologies={course.technologies} />
      {course.available ? (
        <Link to={`/inscription?formation=${course.id}`} className="btn btn-dark mt-3">
          S'inscrire maintenant
        </Link>
      ) : (
        <button type="button" className="btn btn-secondary mt-3" disabled>Complet</button>
      )}
    </>
  );
}

export default CourseDetails;
