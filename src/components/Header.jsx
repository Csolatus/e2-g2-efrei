import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/projets', label: 'Projets' },
  { to: '/formations', label: 'Formations' },
  { to: '/inscription', label: 'Inscription' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu géré par l'état React : le JS de Bootstrap manipule le DOM et entre en conflit avec le rendu React.
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky-top bg-white border-bottom">
      <nav className="navbar navbar-expand-md" aria-label="Navigation principale">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
            WebCraft Solutions
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            aria-controls="main-menu"
            aria-expanded={isMenuOpen}
            aria-label="Ouvrir le menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="main-menu">
            <ul className="navbar-nav ms-auto">
              {NAV_LINKS.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink className="nav-link" to={to} end onClick={closeMenu}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
