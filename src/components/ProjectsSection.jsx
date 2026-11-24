import CatalogSection from './CatalogSection.jsx';
import ProjectCard from './ProjectCard.jsx';
import ProjectDetails from './ProjectDetails.jsx';
import { PROJECTS_CATALOG } from '../config/catalog.js';

function ProjectsSection() {
  return (
    <CatalogSection
      catalog={PROJECTS_CATALOG}
      renderCard={(project, onSelect) => <ProjectCard project={project} onSelect={onSelect} />}
      renderDetails={(project) => <ProjectDetails project={project} />}
    />
  );
}

export default ProjectsSection;
