const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com', label: 'LinkedIn' },
  { href: 'https://github.com', label: 'GitHub' },
  { href: 'https://www.instagram.com', label: 'Instagram' },
];

function Footer() {
  return (
    <footer className="border-top py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <p className="mb-0">&copy; 2026 WebCraft Solutions</p>
        <nav aria-label="Réseaux sociaux">
          <ul className="list-inline mb-0">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <li className="list-inline-item" key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (nouvel onglet)`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
