function TechBadges({ technologies }) {
  return (
    <ul className="list-unstyled d-flex flex-wrap gap-1 mb-0" aria-label="Technologies">
      {technologies.map((tech) => (
        <li key={tech} className="badge text-bg-secondary">{tech}</li>
      ))}
    </ul>
  );
}

export default TechBadges;
