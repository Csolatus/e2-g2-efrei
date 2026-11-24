import TechBadges from './TechBadges.jsx';

function ProjectDetails({ project }) {
  return (
    <>
      <img src={project.image} alt={`Aperçu du projet ${project.title}`} className="img-fluid rounded mb-3" />
      <p className="text-muted">
        {project.category} · {project.client} · {project.year} · {project.duration}
      </p>
      <p>{project.description}</p>
      <h3 className="h6">Fonctionnalités</h3>
      <ul>
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <TechBadges technologies={project.technologies} />
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-3">
        Voir le projet (nouvel onglet)
      </a>
    </>
  );
}

export default ProjectDetails;
