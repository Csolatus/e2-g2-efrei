import TechBadges from './TechBadges.jsx';

function ProjectCard({ project, onSelect }) {
  return (
    <article className="card h-100">
      <img
        src={project.image}
        alt={`Aperçu du projet ${project.title}`}
        className="card-img-top"
        loading="lazy"
      />
      <div className="card-body d-flex flex-column gap-2">
        <p className="text-muted small mb-0">{project.category}</p>
        <h3 className="card-title h5 mb-0">{project.title}</h3>
        <p className="mb-0">{project.client}</p>
        <TechBadges technologies={project.technologies} />
        <button
          type="button"
          className="btn btn-dark mt-auto"
          onClick={() => onSelect(project)}
          aria-label={`Voir les détails du projet ${project.title}`}
        >
          Voir détails
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
