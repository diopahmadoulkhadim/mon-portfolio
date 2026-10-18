import React, { useState, useEffect } from 'react';

interface ContactFormData {
  nom: string;
  email: string;
  message: string;
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('accueil');
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  // Typing animation state
  const words = ['Développeur Web', 'Créateur de contenu', 'Entrepreneur', 'Passionné du numérique'];
  const [typedText, setTypedText] = useState<string>('');
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Contact form state
  const [formData, setFormData] = useState<ContactFormData>({ nom: '', email: '', message: '' });
  const [formValidated, setFormValidated] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Sync dark mode class on body and localStorage
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Navbar scroll & section spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['accueil', 'apropos', 'competences', 'projets', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing loop effect
  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 65 : 110;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentWord.slice(0, charIndex + 1));
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        } else {
          setCharIndex(prev => prev + 1);
        }
      } else {
        setTypedText(currentWord.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
          setCharIndex(0);
        } else {
          setCharIndex(prev => prev - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  // Intersection observer for cards reveal
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach(card => {
      card.classList.add('reveal-card');
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsNavOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setFormValidated(true);
    } else {
      setFormValidated(true);
      setFormSubmitted(true);
      setFormData({ nom: '', email: '', message: '' });
      setTimeout(() => {
        setFormValidated(false);
      }, 5000);
    }
  };

  return (
    <div className="portfolio-app">
      {/* NAVBAR */}
      <nav className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a
            className="navbar-brand fw-bold"
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('accueil');
            }}
          >
            Ahmadoul
          </a>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="menu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'accueil' ? 'active' : ''}`}
                  href="#accueil"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('accueil');
                  }}
                >
                  Accueil
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'apropos' ? 'active' : ''}`}
                  href="#apropos"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('apropos');
                  }}
                >
                  À propos
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'competences' ? 'active' : ''}`}
                  href="#competences"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('competences');
                  }}
                >
                  Compétences
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'projets' ? 'active' : ''}`}
                  href="#projets"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('projets');
                  }}
                >
                  Projets
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                >
                  Contact
                </a>
              </li>

              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button
                  id="themeButton"
                  className="btn btn-outline-light btn-sm"
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label="Basculer le thème clair/sombre"
                  title="Changer de thème"
                >
                  <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* SECTION HÉROS */}
      <section id="accueil" className="hero">
        <div className="container">
          <div className="row align-items-center">
            {/* TEXTE - Colonne de gauche */}
            <div className="col-lg-7 order-2 order-lg-1">
              <span className="badge bg-primary mb-3">Portfolio personnel</span>

              <h1 className="display-4 fw-bold">
                Bonjour, je suis{' '}
                <span className="text-primary">Ahmadoul Khadim Diop</span>
              </h1>

              <div className="hero-typing-box mt-3">
                <span className="hero-prefix">Je suis</span>
                <span id="typedText" className="hero-typed-text">
                  {typedText}
                </span>
                <span className="hero-cursor">|</span>
              </div>

              <p className="lead mt-3">
                Je suis un développeur web débutant de <strong>18 ans</strong>, passionné par le numérique, la création de contenu et l'entrepreneuriat.
              </p>

              <p>
                Je possède les bases nécessaires en HTML, CSS, Bootstrap et JavaScript pour créer des sites web modernes et responsifs.
              </p>

              <div className="mt-4">
                <a
                  href="/ficher pdf/Ahmadoul Khadim Diop – CV (4).pdf"
                  className="btn btn-primary btn-lg me-2"
                  download="Ahmadoul_Khadim_Diop_CV.pdf"
                >
                  <i className="bi bi-download me-1"></i>
                  Télécharger mon CV
                </a>

                <a
                  href="#projets"
                  className="btn btn-outline-primary btn-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('projets');
                  }}
                >
                  Mes projets
                </a>
              </div>
            </div>

            {/* PHOTO - Colonne de droite */}
            <div className="col-lg-5 text-center order-1 order-lg-2 mb-4 mb-lg-0">
              <img
                src="/image/profil.jpg"
                alt="Photo de Ahmadoul Khadim Diop"
                className="img-fluid profile-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION À PROPOS */}
      <section id="apropos" className="py-5">
        <div className="container">
          <div className="text-center mb-5 section-title">
            <span>01 — À PROPOS</span>
            <h2>Qui suis-je ?</h2>
          </div>

          <div className="row g-4">
            {/* COLONNE 1 : Biographie */}
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 h-100 p-4">
                <h3>Ahmadoul Khadim Diop</h3>
                <p>
                  J'ai 18 ans et je suis actuellement en formation dans le domaine du développement web.
                </p>
                <p>
                  Je m'intéresse particulièrement à la création de sites web et aux nouvelles technologies.
                </p>
                <p>
                  En parallèle du développement web, je développe également mes compétences dans la création de contenu et l'entrepreneuriat.
                </p>
                <p className="mb-0">
                  Mon objectif est de continuer à apprendre, réaliser des projets concrets et devenir progressivement un développeur web professionnel.
                </p>
              </div>
            </div>

            {/* COLONNE 2 : Domaines d'expertise */}
            <div className="col-lg-4">
              <div className="card shadow-sm border-0 h-100 p-4">
                <h4 className="mb-4">Mes domaines</h4>
                <p>
                  <i className="bi bi-code-slash text-primary me-2"></i>
                  Développement Web
                </p>
                <p>
                  <i className="bi bi-camera-video text-primary me-2"></i>
                  Création de contenu
                </p>
                <p>
                  <i className="bi bi-lightbulb text-primary me-2"></i>
                  Entrepreneuriat
                </p>
                <p>
                  <i className="bi bi-phone text-primary me-2"></i>
                  Responsive Design
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION COMPÉTENCES */}
      <section id="competences" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5 section-title">
            <span>02 — COMPÉTENCES</span>
            <h2>Mes compétences</h2>
            <p>Mon niveau actuel correspond à celui d'un développeur web débutant.</p>
          </div>

          <div className="row g-4">
            {/* COLONNE 1 : Langages et frameworks fondamentaux */}
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 p-4">
                <h5>
                  HTML5
                  <span>75%</span>
                </h5>
                <div className="progress mb-4">
                  <div className="progress-bar" style={{ width: '75%' }}></div>
                </div>

                <h5>
                  CSS3
                  <span>70%</span>
                </h5>
                <div className="progress mb-4">
                  <div className="progress-bar" style={{ width: '70%' }}></div>
                </div>

                <h5>
                  Bootstrap 5
                  <span>75%</span>
                </h5>
                <div className="progress mb-4">
                  <div className="progress-bar" style={{ width: '75%' }}></div>
                </div>

                <h5>
                  JavaScript
                  <span>55%</span>
                </h5>
                <div className="progress">
                  <div className="progress-bar" style={{ width: '55%' }}></div>
                </div>
              </div>
            </div>

            {/* COLONNE 2 : Outils et compétences transversales */}
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 p-4">
                <h5>
                  Git / GitHub
                  <span>50%</span>
                </h5>
                <div className="progress mb-4">
                  <div className="progress-bar" style={{ width: '50%' }}></div>
                </div>

                <h5>
                  Responsive Design
                  <span>70%</span>
                </h5>
                <div className="progress mb-4">
                  <div className="progress-bar" style={{ width: '70%' }}></div>
                </div>

                <h5>
                  Création de contenu
                  <span>80%</span>
                </h5>
                <div className="progress mb-4">
                  <div className="progress-bar" style={{ width: '80%' }}></div>
                </div>

                <h5>
                  Entrepreneuriat
                  <span>60%</span>
                </h5>
                <div className="progress">
                  <div className="progress-bar" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PROJETS */}
      <section id="projets" className="py-5">
        <div className="container">
          <div className="text-center mb-5 section-title">
            <span>03 — PROJETS</span>
            <h2>Mes projets réalisés</h2>
            <p>Voici quelques projets réalisés pendant ma formation.</p>
          </div>

          <div className="row g-4">
            {/* PROJET 1 : Site Restaurant */}
            <div className="col-md-6 col-lg-4">
              <div className="card project-card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h4>Restaurant</h4>
                  <div className="project-image project-restaurant">
                    <img src="/image/resto.jpg" alt="Site vitrine restaurant" className="project-img" />
                    <div className="project-overlay"></div>
                  </div>
                  <p>
                    Site vitrine pour présenter un restaurant, son menu et ses services.
                  </p>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <a
                    href="https://restosen.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Voir le projet
                    <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* PROJET 2 : Tableau de bord Gym */}
            <div className="col-md-6 col-lg-4">
              <div className="card project-card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h4>Tableau de Bord Fitness</h4>
                  <div className="project-image project-fitness">
                    <img src="/image/fitness.jpg" alt="Tableau de bord fitness" className="project-img" />
                    <div className="project-overlay"></div>
                  </div>
                  <p>
                    Plateforme complète de gestion pour salles de sport permettant le suivi des adhésions, la gestion des horaires de cours collectifs et l'analyse des performances des membres.
                  </p>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <a
                    href="https://gymsen.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Voir le projet
                    <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* PROJET 3 : Plateforme de formation */}
            <div className="col-md-6 col-lg-4">
              <div className="card project-card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h4>Plateforme de formation</h4>
                  <div className="project-image project-learning">
                    <img src="/image/conference.jpg" alt="Plateforme de formation" className="project-img" />
                    <div className="project-overlay"></div>
                  </div>
                  <p>
                    Interface web pour présenter une plateforme de formation informatique.
                  </p>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <a
                    href="https://senplatformndartech.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Voir le projet
                    <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CONTACT */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5 section-title">
            <span>04 — CONTACT</span>
            <h2>Me contacter</h2>
          </div>

          <div className="row g-4">
            {/* COLONNE 1 : Coordonnées de contact */}
            <div className="col-lg-5">
              <div className="card shadow-sm border-0 p-4 h-100">
                <h3 className="mb-4">Mes coordonnées</h3>

                <div className="contact-item">
                  <i className="bi bi-person"></i>
                  <span>Ahmadoul Khadim Diop</span>
                </div>

                <div className="contact-item">
                  <i className="bi bi-calendar"></i>
                  <span>18 ans</span>
                </div>

                <div className="contact-item">
                  <i className="bi bi-geo-alt"></i>
                  <span>Sénégal</span>
                </div>

                <div className="contact-item">
                  <i className="bi bi-instagram"></i>
                  <a href="https://www.instagram.com/voixdesbrumes/" target="_blank" rel="noopener noreferrer">
                    @voixdesbrumes
                  </a>
                </div>

                <div className="contact-item">
                  <i className="bi bi-envelope"></i>
                  <a href="mailto:diopahmadoulkhadim221@gmail.com">
                    diopahmadoulkhadim221@gmail.com
                  </a>
                </div>

                <div className="contact-item">
                  <i className="bi bi-telephone"></i>
                  <span>
                    <a href="tel:+221778682048">77 868 20 48</a>
                    <span className="mx-2 text-muted">|</span>
                    <a href="tel:+221775940137">77 594 01 37</a>
                  </span>
                </div>
              </div>
            </div>

            {/* COLONNE 2 : Formulaire de contact */}
            <div className="col-lg-7">
              <form
                className={`card shadow-sm border-0 p-4 needs-validation ${formValidated ? 'was-validated' : ''}`}
                noValidate
                onSubmit={handleFormSubmit}
              >
                {formSubmitted && (
                  <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                    <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                    <div>
                      <strong>Merci !</strong> Votre message a bien été validé et envoyé.
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    className="form-control"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  />
                  <div className="invalid-feedback">
                    Veuillez entrer votre nom.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <div className="invalid-feedback">
                    Veuillez entrer une adresse email valide.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="form-control"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  <div className="invalid-feedback">
                    Veuillez écrire votre message.
                  </div>
                </div>

                <button type="submit" className="btn btn-primary d-inline-flex align-items-center gap-2">
                  <i className="bi bi-send"></i>
                  <span>Envoyer le message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <h5>Ahmadoul Khadim Diop</h5>
          <p className="text-secondary">Développeur Web · Créateur de contenu · Entrepreneur</p>

          <div className="mb-3">
            <a
              href="https://www.instagram.com/voixdesbrumes/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram"></i>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <i className="bi bi-github"></i>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </div>

          <p className="mb-0 text-secondary" style={{ fontSize: '0.9rem' }}>
            © 2026 Ahmadoul Khadim Diop - Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
