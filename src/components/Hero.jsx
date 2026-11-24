const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

function Hero() {
  return (
    <section className="hero text-center py-5 bg-light" aria-labelledby="hero-title">
      <div className="container py-4 fade-in">
        <h1 id="hero-title">Projets clients et formations techniques</h1>
        <p className="lead mx-auto hero-subtitle">
          Découvrez les projets livrés pour nos clients et notre catalogue de formations
          techniques, du front-end au DevOps.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button type="button" className="btn btn-dark" onClick={() => scrollToSection('projets')}>
            Voir les projets
          </button>
          <button type="button" className="btn btn-outline-dark" onClick={() => scrollToSection('formations')}>
            Voir les formations
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
