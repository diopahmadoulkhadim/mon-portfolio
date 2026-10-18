import React, { useState, useEffect } from 'react';
import { Hero3DScene } from './components/Hero3DScene';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProjectVideoShowcase } from './components/ProjectVideoShowcase';
import { ResumeModal } from './components/ResumeModal';
import { CASE_STUDIES, TECH_IMPACT_ITEMS, TESTIMONIALS } from './data/portfolioData';
import { CaseStudy, ContactMessage } from './types/portfolio';

export default function App() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Typing animation
  const TYPED_ROLES = [
    'Architecture Frontend Moderne',
    'Expériences Web Interactives & 3D',
    'Création de Contenu Digital',
    'Solutions Business Clés en Main',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [isDeletingRole, setIsDeletingRole] = useState<boolean>(false);
  const [typedRoleText, setTypedRoleText] = useState<string>('');

  // Case study modal & filter
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('all');

  // Contact form & feedback
  const [contactData, setContactData] = useState<ContactMessage>({
    nom: '',
    email: '',
    linkedin: '',
    projectType: 'Refonte Web / Création',
    message: '',
  });
  const [formValidated, setFormValidated] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);
  const [copiedInfo, setCopiedInfo] = useState<string | null>(null);

  // Computed WhatsApp URL for instant collaboration dispatch
  const whatsAppUrl = (() => {
    const nomText = contactData.nom.trim() || 'Visiteur';
    const emailText = contactData.email.trim() ? ` (${contactData.email.trim()})` : '';
    const linkedinPart = contactData.linkedin?.trim() ? `\n🔗 LinkedIn : ${contactData.linkedin.trim()}` : '';
    const details = contactData.message.trim() ? `\n\n📝 Détails du projet :\n${contactData.message.trim()}` : '';
    const text = `Bonjour Ahmadoul, je suis ${nomText}${emailText}.\nJe vous contacte concernant un projet : *${contactData.projectType}*${linkedinPart}${details}\n\nPouvons-nous échanger directement ?`;
    return `https://wa.me/221778682048?text=${encodeURIComponent(text)}`;
  })();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'manifesto', 'projets', 'temoignages', 'stack', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing loop
  useEffect(() => {
    const word = TYPED_ROLES[currentRoleIndex];
    const speed = isDeletingRole ? 50 : 90;

    const timeout = setTimeout(() => {
      if (!isDeletingRole) {
        setTypedRoleText(word.slice(0, currentCharIndex + 1));
        if (currentCharIndex + 1 === word.length) {
          setTimeout(() => setIsDeletingRole(true), 1500);
        } else {
          setCurrentCharIndex((prev) => prev + 1);
        }
      } else {
        setTypedRoleText(word.slice(0, currentCharIndex - 1));
        if (currentCharIndex - 1 <= 0) {
          setIsDeletingRole(false);
          setCurrentRoleIndex((prev) => (prev + 1) % TYPED_ROLES.length);
          setCurrentCharIndex(0);
        } else {
          setCurrentCharIndex((prev) => prev - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentRoleIndex, isDeletingRole]);

  // Scroll reveal observer
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-up-element');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projectFilter]);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInfo(label);
    setTimeout(() => setCopiedInfo(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setFormValidated(true);
    } else {
      setFormValidated(true);
      setFormSent(true);
      setContactData({
        nom: '',
        email: '',
        projectType: 'Refonte Web / Création',
        message: '',
      });
      setTimeout(() => {
        setFormValidated(false);
      }, 6000);
    }
  };

  const filteredProjects =
    projectFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((p) => p.category.toLowerCase().includes(projectFilter));

  return (
    <div className="portfolio-app position-relative">
      {/* Cosmic Ambient Lighting Effect */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* Main Content Layer */}
      <div className="content-layer">
        {/* TOP BAR CONTRACT: Zone 1 (Wordmark) — Zone 2 (Nav links) — Zone 3 (Primary CTA) */}
        <header className={`navbar-custom ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container d-flex align-items-center justify-content-between">
            {/* Zone 1: Single Brand Wordmark */}
            <a
              href="#hero"
              className="brand-wordmark"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('hero');
              }}
            >
              <span className="brand-dot"></span>
              <span>Ahmadoul Khadim Diop</span>
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="d-none d-lg-flex align-items-center gap-3">
              <a
                href="#manifesto"
                className={`nav-link-custom ${activeSection === 'manifesto' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('manifesto');
                }}
              >
                Vision & Valeurs
              </a>
              <a
                href="#projets"
                className={`nav-link-custom ${activeSection === 'projets' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('projets');
                }}
              >
                Case Studies
              </a>
              <a
                href="#temoignages"
                className={`nav-link-custom ${activeSection === 'temoignages' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('temoignages');
                }}
              >
                Témoignages
              </a>
              <a
                href="#stack"
                className={`nav-link-custom ${activeSection === 'stack' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('stack');
                }}
              >
                Stack & Impact
              </a>
              <a
                href="#contact"
                className={`nav-link-custom ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
              >
                Contact
              </a>
              <button
                type="button"
                className="nav-link-custom border-0 bg-transparent text-start"
                onClick={() => setIsResumeOpen(true)}
              >
                Curriculum Vitæ
              </button>
            </nav>

            {/* Zone 3: Primary Action & Mobile Hamburger */}
            <div className="d-flex align-items-center gap-2">
              <a
                href="#contact"
                className="btn-magnetic-primary d-none d-sm-inline-flex text-nowrap py-2 px-3 fs-6"
                style={{ fontSize: '0.88rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
              >
                <span>Démarrer un projet</span>
                <i className="bi bi-arrow-up-right"></i>
              </a>

              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="btn btn-outline-secondary d-none d-md-inline-flex align-items-center gap-2 rounded-3 py-2 px-3 text-white border-0"
                style={{ background: 'rgba(255,255,255,0.06)', fontSize: '0.84rem' }}
                title="Consulter et Télécharger le CV Officiel"
                aria-label="Ouvrir le CV"
              >
                <i className="bi bi-file-earmark-person text-primary"></i>
                <span className="font-mono">CV Officiel</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="btn btn-dark d-lg-none p-2 rounded-3 border-0"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-5 text-white`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Collapsible Nav */}
          {isMobileMenuOpen && (
            <div className="d-lg-none px-4 pt-3 pb-4 border-top mt-2" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(6,8,14,0.98)' }}>
              <div className="d-flex flex-column gap-3">
                <a
                  href="#hero"
                  className="text-white py-1 text-decoration-none fw-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('hero');
                  }}
                >
                  Accueil
                </a>
                <a
                  href="#manifesto"
                  className="text-white py-1 text-decoration-none fw-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('manifesto');
                  }}
                >
                  Vision & Valeurs
                </a>
                <a
                  href="#projets"
                  className="text-white py-1 text-decoration-none fw-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('projets');
                  }}
                >
                  Case Studies
                </a>
                <a
                  href="#temoignages"
                  className="text-white py-1 text-decoration-none fw-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('temoignages');
                  }}
                >
                  Témoignages
                </a>
                <a
                  href="#stack"
                  className="text-white py-1 text-decoration-none fw-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('stack');
                  }}
                >
                  Stack & Impact
                </a>
                <a
                  href="#contact"
                  className="text-white py-1 text-decoration-none fw-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('contact');
                  }}
                >
                  Contact
                </a>
                <button
                  type="button"
                  className="text-white py-1 text-decoration-none fw-medium border-0 bg-transparent text-start p-0"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsResumeOpen(true);
                  }}
                >
                  <i className="bi bi-file-earmark-person text-primary me-2"></i>
                  Curriculum Vitæ (Interactif & PDF)
                </button>
                <div className="pt-2 d-flex gap-2">
                  <a
                    href="#contact"
                    className="btn-magnetic-primary w-100 justify-content-center"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('contact');
                    }}
                  >
                    Démarrer un projet
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsResumeOpen(true);
                    }}
                    className="btn btn-outline-light px-3 d-flex align-items-center"
                    title="Consulter le CV"
                  >
                    <i className="bi bi-file-earmark-text"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* SECTION 1 : HERO SECTION AVEC THREE.JS & TYPAGE DYNAMIQUE */}
        <section id="hero" className="hero-section">
          <div className="container">
            <div className="row align-items-center g-5">
              {/* Colonne Gauche : Accroche & Proposition de Valeur */}
              <div className="col-lg-7">
                <span className="hero-kicker">
                  01 · Ingénierie Web & Création de Contenu
                </span>

                <h1 className="hero-title mb-3">
                  Concevoir des interfaces d'exception.{' '}
                  <span className="hero-title-gradient">
                    Catalyser l'impact digital.
                  </span>
                </h1>

                {/* Cadre de frappe dynamique */}
                <div className="hero-typing-container">
                  <span className="hero-typing-prefix">Spécialisé en :</span>
                  <span className="hero-typed-word">{typedRoleText}</span>
                  <span className="hero-cursor">|</span>
                </div>

                <p className="hero-lead mb-4">
                  Développeur web & entrepreneur de 18 ans basé au Sénégal. J'allie la rigueur de
                  l'ingénierie frontend moderne (React, TypeScript, Three.js) à une véritable
                  culture produit pour transformer vos ambitions en expériences numériques fluides,
                  rapides et orientées conversion.
                </p>

                {/* Boutons d'Action Magnétiques */}
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <a
                    href="#projets"
                    className="btn-magnetic-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('projets');
                    }}
                  >
                    <span>Explorer les Case Studies</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsResumeOpen(true)}
                    className="btn-magnetic-secondary"
                  >
                    <i className="bi bi-file-earmark-person"></i>
                    <span>Consulter & Télécharger mon CV</span>
                  </button>
                </div>

                {/* Métadonnées de profil épurées sans pills */}
                <div className="d-flex flex-wrap align-items-center gap-3 mt-4 pt-2 text-muted font-mono" style={{ fontSize: '0.82rem' }}>
                  <span>Dakar, Sénégal</span>
                  <span aria-hidden="true">·</span>
                  <span>Fondateur @voixdesbrumes</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-primary">Disponible pour nouveaux défis</span>
                </div>
              </div>

              {/* Colonne Droite : Scène 3D Interactive & Carte de Profil */}
              <div className="col-lg-5 text-center">
                <div className="hero-3d-box position-relative">
                  {/* Scène 3D Three.js */}
                  <Hero3DScene />

                  {/* Profil Badge Superposé en Coin */}
                  <div
                    className="position-absolute top-0 start-0 m-3 p-2 rounded-3 d-flex align-items-center gap-2"
                    style={{
                      background: 'rgba(6, 8, 14, 0.85)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <img
                      src="/image/profil.jpg"
                      alt="Ahmadoul Khadim Diop"
                      className="rounded-circle object-fit-cover"
                      style={{ width: '38px', height: '38px', border: '2px solid #3b82f6' }}
                    />
                    <div className="text-start">
                      <div className="text-white fw-bold" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>
                        Ahmadoul K. Diop
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                        Lead Tech & Creator
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION METRIQUES D'IMPACT (STRIP SOUS LE HERO SPLIT) */}
        <section className="impact-strip">
          <div className="container">
            <div className="row g-4 text-center">
              <div className="col-6 col-md-3">
                <div className="metric-value text-primary tabular-nums">&lt; 0.8s</div>
                <div className="metric-label">Temps de Chargement Moyen</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="metric-value text-white tabular-nums">100%</div>
                <div className="metric-label">Code TypeScript & Responsive</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="metric-value text-primary tabular-nums">3+</div>
                <div className="metric-label">Projets Déployés en Production</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="metric-value text-white tabular-nums">Awwwards</div>
                <div className="metric-label">Exigence Design & Code</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 : MANIFESTE & VALEURS (AU-DELA DU SIMPLE CV) */}
        <section id="manifesto" className="section-wrapper">
          <div className="container">
            <div className="text-center mb-5 fade-up-element">
              <span className="section-kicker">02 · Manifeste & Vision Produit</span>
              <h2 className="section-heading">Moins de bruit. Plus de rigueur et d'impact.</h2>
              <p className="section-desc mx-auto">
                À 18 ans, je conçois le développement web non pas comme une simple compilation de
                balises, mais comme un art d'ingénierie et un accélérateur de valeur business.
              </p>
            </div>

            {/* Citation Manifeste Centrale */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-10">
                <div className="manifesto-quote-card fade-up-element text-center">
                  <div className="manifesto-quote mb-3">
                    « Le code n'est qu'un vecteur : la véritable valeur réside dans la fluidité de
                    l'expérience, la vitesse d'exécution et la clarté avec laquelle un problème
                    complexe est résolu. »
                  </div>
                  <div className="font-mono text-xs text-primary text-uppercase">
                    — Philosophie d'ingénierie · Ahmadoul Khadim Diop
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Piliers Clés */}
            <div className="row g-4">
              <div className="col-md-4">
                <div className="pillar-card fade-up-element">
                  <div className="pillar-icon-box">
                    <i className="bi bi-cpu"></i>
                  </div>
                  <h3 className="text-white fs-5 fw-bold mb-2">Rigueur & Performance</h3>
                  <p className="text-muted mb-0" style={{ fontSize: '0.94rem' }}>
                    Zéro compromis sur la réactivité, l'accessibilité WCAG AA et le temps de réponse.
                    Des architectures légères, prédictibles et scalables.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="pillar-card fade-up-element">
                  <div className="pillar-icon-box">
                    <i className="bi bi-camera-reels"></i>
                  </div>
                  <h3 className="text-white fs-5 fw-bold mb-2">Storytelling & Contenu</h3>
                  <p className="text-muted mb-0" style={{ fontSize: '0.94rem' }}>
                    Créateur de contenu reconnu avec @voixdesbrumes : je sais comment capter
                    l'attention d'une audience, bâtir une marque et raconter une histoire engageante.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="pillar-card fade-up-element">
                  <div className="pillar-icon-box">
                    <i className="bi bi-lightbulb"></i>
                  </div>
                  <h3 className="text-white fs-5 fw-bold mb-2">Esprit Entrepreneurial</h3>
                  <p className="text-muted mb-0" style={{ fontSize: '0.94rem' }}>
                    Comprendre le modèle d'affaires et la psychologie des utilisateurs finaux avant de
                    coder. Chaque ligne de code doit générer une valeur tangible.
                  </p>
                </div>
              </div>
            </div>

            {/* Banner Appel à l'action CV Officiel Impossible à ignorer */}
            <div
              className="mt-5 p-4 rounded-3 fade-up-element"
              style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(37, 99, 235, 0.15)',
              }}
            >
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
                <div>
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
                    <span className="dot dot-green" />
                    <span className="font-mono text-xs text-primary fw-bold text-uppercase">
                      Dossier Professionnel & Cursus Certifié
                    </span>
                  </div>
                  <h3 className="text-white fs-5 fw-bold mb-1">
                    Curriculum Vitæ Officiel d'Ahmadoul Khadim Diop
                  </h3>
                  <p className="text-muted mb-0" style={{ fontSize: '0.92rem' }}>
                    Formation NdarTech, BFEM 2025, réalisations web en production, compétences vérifiées et contact direct.
                  </p>
                </div>

                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <button
                    type="button"
                    onClick={() => setIsResumeOpen(true)}
                    className="btn btn-primary d-inline-flex align-items-center gap-2 font-mono text-xs px-3 py-2 rounded-2"
                  >
                    <i className="bi bi-file-earmark-person-fill"></i>
                    <span>Ouvrir le CV interactif</span>
                  </button>
                  <a
                    href="/cv.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light d-inline-flex align-items-center gap-2 font-mono text-xs px-3 py-2 rounded-2"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                  >
                    <i className="bi bi-box-arrow-up-right"></i>
                    <span>Page Imprimable (A4)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 : PROJETS IMMERSIFS (CASE STUDIES) */}
        <section id="projets" className="section-wrapper" style={{ background: 'rgba(8,12,20,0.6)' }}>
          <div className="container">
            <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-5">
              <div className="fade-up-element">
                <span className="section-kicker">03 · Projets & Case Studies</span>
                <h2 className="section-heading mb-2">Des solutions réelles en production.</h2>
                <p className="section-desc mb-0">
                  Découvrez l'analyse détaillée du problème client, de l'architecture technique et des
                  résultats mesurables obtenus.
                </p>
              </div>

              {/* Filtres interactifs sans pilules kitsch */}
              <div className="d-flex align-items-center gap-1 p-1 rounded-3 mt-3 mt-md-0" style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  onClick={() => setProjectFilter('all')}
                  className={`btn btn-sm px-3 py-1 font-mono text-xs rounded-2 ${
                    projectFilter === 'all'
                      ? 'btn-primary text-white'
                      : 'text-muted border-0 bg-transparent'
                  }`}
                >
                  Tous ({CASE_STUDIES.length})
                </button>
                <button
                  onClick={() => setProjectFilter('foodtech')}
                  className={`btn btn-sm px-3 py-1 font-mono text-xs rounded-2 ${
                    projectFilter === 'foodtech'
                      ? 'btn-primary text-white'
                      : 'text-muted border-0 bg-transparent'
                  }`}
                >
                  FoodTech
                </button>
                <button
                  onClick={() => setProjectFilter('consulting')}
                  className={`btn btn-sm px-3 py-1 font-mono text-xs rounded-2 ${
                    projectFilter === 'consulting'
                      ? 'btn-primary text-white'
                      : 'text-muted border-0 bg-transparent'
                  }`}
                >
                  Consulting & Projets
                </button>
                <button
                  onClick={() => setProjectFilter('edtech')}
                  className={`btn btn-sm px-3 py-1 font-mono text-xs rounded-2 ${
                    projectFilter === 'edtech'
                      ? 'btn-primary text-white'
                      : 'text-muted border-0 bg-transparent'
                  }`}
                >
                  EdTech
                </button>
              </div>
            </div>

            {/* Grille des Case Studies */}
            <div className="row g-4">
              {filteredProjects.map((project) => (
                <div key={project.id} className="col-lg-4 col-md-6 fade-up-element">
                  <div className="case-study-card">
                    {/* Project Video Showcase (Continuous Loop & Interactive Mode) */}
                    <ProjectVideoShowcase
                      caseStudy={project}
                      onOpenDetails={() => setSelectedCaseStudy(project)}
                    />

                    {/* Body */}
                    <div className="case-study-body">
                      <h3 className="case-study-title">{project.title}</h3>
                      <p className="text-muted" style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
                        {project.subtitle}
                      </p>

                      {/* Problem & Solution Box */}
                      <div className="case-problem-solution-box">
                        <div className="case-label">Problème client</div>
                        <div className="case-text text-truncate">{project.clientProblem}</div>
                        <div className="case-label mt-2">Solution apportée</div>
                        <div className="case-text text-truncate">{project.technicalSolution}</div>
                      </div>

                      {/* Métriques d'impact */}
                      <div className="d-flex align-items-center justify-content-between mb-3 px-2">
                        {project.impactMetrics.slice(0, 2).map((m, idx) => (
                          <div key={idx}>
                            <span className="font-mono text-xs text-muted d-block text-uppercase">
                              {m.label}
                            </span>
                            <span className="font-mono fw-bold text-white fs-6 tabular-nums">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="case-study-footer">
                        <button
                          onClick={() => setSelectedCaseStudy(project)}
                          className="btn btn-outline-light btn-sm font-mono text-xs d-inline-flex align-items-center gap-1 rounded-2"
                          style={{ borderColor: 'rgba(255,255,255,0.18)' }}
                        >
                          <i className="bi bi-info-circle"></i>
                          <span>Étude de cas</span>
                        </button>

                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm font-mono text-xs d-inline-flex align-items-center gap-1 rounded-2"
                        >
                          <span>Démo live</span>
                          <i className="bi bi-arrow-up-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 : TÉMOIGNAGES CLIENTS & PREUVE SOCIALE */}
        <section id="temoignages" className="section-wrapper">
          <div className="container">
            <div className="text-center mb-5 fade-up-element">
              <span className="section-kicker">04 · Retours d'Expérience & Preuve Sociale</span>
              <h2 className="section-heading">La confiance de fondateurs & partenaires.</h2>
              <p className="section-desc mx-auto">
                Des retours concrets de clients et directeurs de projets ayant mesuré l'impact
                direct de nos solutions sur leurs opérations et leur croissance.
              </p>
            </div>

            <div className="row g-4">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="col-lg-4 col-md-6 fade-up-element">
                  <div className="testimonial-card">
                    <div>
                      {/* Quote text */}
                      <p className="testimonial-quote">
                        « {t.quote} »
                      </p>
                    </div>

                    <div>
                      {/* Measurable outcome badge */}
                      <div className="mb-3">
                        <span className="testimonial-outcome">
                          <i className="bi bi-graph-up-arrow text-primary"></i>
                          <span>{t.outcome}</span>
                        </span>
                      </div>

                      {/* Author profile & organization */}
                      <div className="d-flex align-items-center gap-3 pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                        {t.avatarUrl ? (
                          <img
                            src={t.avatarUrl}
                            alt={t.name}
                            className="testimonial-avatar object-fit-cover"
                          />
                        ) : (
                          <div className="testimonial-avatar">
                            {t.initials}
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <div className="text-white fw-bold text-truncate" style={{ fontSize: '0.94rem' }}>
                            {t.name}
                          </div>
                          <div className="text-muted text-xs text-truncate">
                            {t.role} · {t.organization}
                          </div>
                          <div className="font-mono text-dim" style={{ fontSize: '0.74rem' }}>
                            {t.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 : CARTOGRAPHIE STACK & IMPACT (PAS DE POURCENTAGES GÉNÉRIQUES) */}
        <section id="stack" className="section-wrapper" style={{ background: 'rgba(8,12,20,0.5)' }}>
          <div className="container">
            <div className="text-center mb-5 fade-up-element">
              <span className="section-kicker">05 · Compétences Contextuelles</span>
              <h2 className="section-heading">Cartographie Technique & Impact Mesurable.</h2>
              <p className="section-desc mx-auto">
                Les barres de pourcentages abstraites n'ont pas de sens en ingénierie. Voici comment
                chaque brique technique se traduit concrètement en rapidité, fiabilité et conversion.
              </p>
            </div>

            <div className="row g-4">
              {TECH_IMPACT_ITEMS.map((item, index) => (
                <div key={index} className="col-lg-4 col-md-6 fade-up-element">
                  <div className="tech-impact-card">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="pillar-icon-box mb-0" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>
                        <i className={`bi ${item.icon}`}></i>
                      </div>
                      <span className="font-mono text-xs text-primary fw-bold text-uppercase">
                        {item.domain}
                      </span>
                    </div>

                    <h3 className="text-white fs-6 fw-bold mb-2">{item.title}</h3>

                    <div className="tech-tag-line">
                      {item.technologies.join(' · ')}
                    </div>

                    <p className="text-muted mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.55' }}>
                      {item.impactStatement}
                    </p>

                    <div className="p-2 rounded-2 mt-auto d-flex align-items-center justify-content-between" style={{ background: 'rgba(6,8,14,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-muted text-xs text-uppercase font-mono">Bénéfice :</span>
                      <span className="font-mono text-xs text-white fw-bold tabular-nums">
                        {item.kpi}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 : CONTACT INTERACTIF ORIENTÉ CONVERSION */}
        <section id="contact" className="section-wrapper" style={{ background: 'rgba(8,12,20,0.7)' }}>
          <div className="container">
            <div className="text-center mb-5 fade-up-element">
              <span className="section-kicker">06 · Initialiser une Collaboration</span>
              <h2 className="section-heading">Donnons vie à votre vision digitale.</h2>
              <p className="section-desc mx-auto">
                Vous avez un projet de site vitrine, d'application web, ou de création de contenu ?
                Échangeons directement sur vos objectifs et votre calendrier.
              </p>
            </div>

            <div className="row g-4">
              {/* Coordonnées & Accès Rapide */}
              <div className="col-lg-5 fade-up-element">
                <div className="contact-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h3 className="text-white fs-5 fw-bold mb-4">Coordonnées Directes</h3>

                    {/* Email */}
                    <div className="contact-coord-item">
                      <div className="contact-coord-icon">
                        <i className="bi bi-envelope"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="font-mono text-xs text-muted text-uppercase">Email Professionnel</div>
                        <a
                          href="mailto:diopahmadoulkhadim221@gmail.com"
                          className="text-white text-decoration-none fw-medium d-block text-break"
                          style={{ fontSize: '0.95rem' }}
                        >
                          diopahmadoulkhadim221@gmail.com
                        </a>
                      </div>
                      <button
                        onClick={() => handleCopy('diopahmadoulkhadim221@gmail.com', 'email')}
                        className="btn btn-sm btn-dark text-muted rounded-2 border-0"
                        title="Copier l'email"
                        aria-label="Copier l'email"
                      >
                        <i className={`bi ${copiedInfo === 'email' ? 'bi-check-lg text-success' : 'bi-copy'}`}></i>
                      </button>
                    </div>

                    {/* Téléphone */}
                    <div className="contact-coord-item">
                      <div className="contact-coord-icon">
                        <i className="bi bi-telephone"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="font-mono text-xs text-muted text-uppercase">Téléphone (Sénégal)</div>
                        <div className="d-flex align-items-center gap-2">
                          <a href="tel:+221778682048" className="text-white text-decoration-none fw-medium">
                            +221 77 868 20 48
                          </a>
                          <span className="text-muted">/</span>
                          <a href="tel:+221775940137" className="text-white text-decoration-none fw-medium">
                            77 594 01 37
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy('+221778682048', 'phone')}
                        className="btn btn-sm btn-dark text-muted rounded-2 border-0"
                        title="Copier le numéro"
                        aria-label="Copier le numéro"
                      >
                        <i className={`bi ${copiedInfo === 'phone' ? 'bi-check-lg text-success' : 'bi-copy'}`}></i>
                      </button>
                    </div>

                    {/* WhatsApp */}
                    <div className="contact-coord-item">
                      <div className="contact-coord-icon" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                        <i className="bi bi-whatsapp"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="font-mono text-xs text-muted text-uppercase">WhatsApp Direct</div>
                        <a
                          href="https://wa.me/221778682048"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-decoration-none fw-medium d-block"
                          style={{ fontSize: '0.95rem' }}
                        >
                          +221 77 868 20 48
                        </a>
                      </div>
                      <a
                        href="https://wa.me/221778682048?text=Bonjour%20Ahmadoul%2C%20je%20souhaite%20%C3%A9changer%20avec%20vous%20concernant%20un%20projet."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-dark text-success rounded-2 border-0"
                        title="Discuter sur WhatsApp"
                        aria-label="Discuter sur WhatsApp"
                      >
                        <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    </div>

                    {/* LinkedIn */}
                    <div className="contact-coord-item">
                      <div className="contact-coord-icon" style={{ background: 'rgba(10, 102, 194, 0.15)', color: '#0a66c2' }}>
                        <i className="bi bi-linkedin"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="font-mono text-xs text-muted text-uppercase">Profil LinkedIn</div>
                        <a
                          href="https://www.linkedin.com/in/ahmadoul-khadim-diop"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-decoration-none fw-medium d-block text-break"
                          style={{ fontSize: '0.95rem' }}
                        >
                          linkedin.com/in/ahmadoul-khadim-diop
                        </a>
                      </div>
                      <a
                        href="https://www.linkedin.com/in/ahmadoul-khadim-diop"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-dark text-muted rounded-2 border-0"
                        title="Voir le profil LinkedIn"
                        aria-label="Voir le profil LinkedIn"
                      >
                        <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    </div>

                    {/* Localisation */}
                    <div className="contact-coord-item">
                      <div className="contact-coord-icon">
                        <i className="bi bi-geo-alt"></i>
                      </div>
                      <div>
                        <div className="font-mono text-xs text-muted text-uppercase">Localisation</div>
                        <div className="text-white fw-medium">Dakar & Saint-Louis, Sénégal (GMT)</div>
                      </div>
                    </div>

                    {/* Instagram Créateur */}
                    <div className="contact-coord-item">
                      <div className="contact-coord-icon">
                        <i className="bi bi-instagram"></i>
                      </div>
                      <div>
                        <div className="font-mono text-xs text-muted text-uppercase">Création de Contenu</div>
                        <a
                          href="https://www.instagram.com/voixdesbrumes/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-decoration-none fw-medium"
                        >
                          @voixdesbrumes
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Toast Feedback */}
                  {copiedInfo && (
                    <div className="alert alert-info py-2 px-3 font-mono text-xs rounded-2 mb-0 mt-3 d-flex align-items-center gap-2" role="status">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>{copiedInfo === 'email' ? 'Adresse email copiée dans le presse-papier !' : 'Numéro de téléphone copié !'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Formulaire de Contact Haute Précision */}
              <div className="col-lg-7 fade-up-element">
                <div className="contact-card">
                  {formSent && (
                    <div className="alert alert-success d-flex align-items-center gap-3 mb-4 rounded-3 p-3" role="alert">
                      <i className="bi bi-check-circle-fill fs-4 text-success"></i>
                      <div>
                        <strong className="text-white d-block">Message transmis avec succès !</strong>
                        <span className="text-muted" style={{ fontSize: '0.88rem' }}>
                          Merci pour votre message, Ahmadoul Khadim Diop vous répondra sous 24 heures.
                        </span>
                      </div>
                    </div>
                  )}

                  <form
                    className={`needs-validation ${formValidated ? 'was-validated' : ''}`}
                    noValidate
                    onSubmit={handleFormSubmit}
                  >
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label htmlFor="form-nom" className="form-label-dark">
                          Votre Nom ou Entreprise *
                        </label>
                        <input
                          type="text"
                          id="form-nom"
                          className="form-control form-control-dark"
                          required
                          placeholder="Ex: Babacar Ndiaye"
                          value={contactData.nom}
                          onChange={(e) => setContactData({ ...contactData, nom: e.target.value })}
                        />
                        <div className="invalid-feedback font-mono text-xs">
                          Veuillez indiquer votre nom.
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="form-email" className="form-label-dark">
                          Votre Email Professionnel *
                        </label>
                        <input
                          type="email"
                          id="form-email"
                          className="form-control form-control-dark"
                          required
                          placeholder="nom@entreprise.com"
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        />
                        <div className="invalid-feedback font-mono text-xs">
                          Veuillez saisir une adresse email valide.
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="form-type" className="form-label-dark">
                        Type de Projet Souhaité
                      </label>
                      <select
                        id="form-type"
                        className="form-select form-control-dark"
                        value={contactData.projectType}
                        onChange={(e) => setContactData({ ...contactData, projectType: e.target.value })}
                      >
                        <option value="Refonte Web / Création">Refonte Web ou Création de Site Vitrine</option>
                        <option value="Application SaaS / Dashboard">Application Web / Dashboard / E-Commerce</option>
                        <option value="Création de Contenu / Vidéo">Création de Contenu & Partenariat Vidéo</option>
                        <option value="Autre Collaboration">Autre Opportunité / Mission Freelance</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="form-linkedin" className="form-label-dark d-flex align-items-center justify-content-between">
                        <span>Votre Profil LinkedIn (Optionnel)</span>
                        <span className="font-mono text-xs text-muted">Réseau pro</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ background: 'rgba(10, 102, 194, 0.2)', color: '#60a5fa' }}>
                          <i className="bi bi-linkedin"></i>
                        </span>
                        <input
                          type="text"
                          id="form-linkedin"
                          className="form-control form-control-dark"
                          placeholder="https://linkedin.com/in/votre-nom"
                          value={contactData.linkedin || ''}
                          onChange={(e) => setContactData({ ...contactData, linkedin: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="form-message" className="form-label-dark">
                        Détails du Projet ou Message *
                      </label>
                      <textarea
                        id="form-message"
                        className="form-control form-control-dark"
                        rows={5}
                        required
                        placeholder="Présentez brièvement vos besoins, objectifs et délais envisagés..."
                        value={contactData.message}
                        onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      ></textarea>
                      <div className="invalid-feedback font-mono text-xs">
                        Veuillez renseigner votre message.
                      </div>
                    </div>

                    {/* Dual Action: Finalize on WhatsApp or Classic Email Submit */}
                    <div className="d-flex flex-column gap-3">
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp-action w-100 py-3 text-center fs-6"
                        onClick={() => {
                          setFormSent(true);
                          setTimeout(() => setFormSent(false), 8000);
                        }}
                      >
                        <i className="bi bi-whatsapp fs-5"></i>
                        <span>Finaliser la demande direct sur WhatsApp (77 868 20 48)</span>
                        <i className="bi bi-arrow-right ms-auto"></i>
                      </a>

                      <div className="d-flex align-items-center justify-content-between pt-1">
                        <span className="text-muted font-mono text-xs">
                          Ou préférez l'envoi par courriel classique :
                        </span>
                        <button
                          type="submit"
                          className="btn btn-outline-light btn-sm font-mono text-xs py-2 px-3 rounded-2"
                          style={{ borderColor: 'rgba(255,255,255,0.18)' }}
                        >
                          <i className="bi bi-send me-1"></i>
                          <span>Envoyer par formulaire</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER ÉPURÉ AVEC 3-ZONE CONTRACT */}
        <footer className="footer-custom">
          <div className="container">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
              {/* Wordmark */}
              <div>
                <a
                  href="#hero"
                  className="brand-wordmark"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('hero');
                  }}
                >
                  <span className="brand-dot"></span>
                  <span>Ahmadoul Khadim Diop</span>
                </a>
                <div className="text-muted mt-1" style={{ fontSize: '0.85rem' }}>
                  Développeur Web · Créateur de Contenu · Entrepreneur
                </div>
              </div>

              {/* Réseaux Sociaux */}
              <div className="d-flex align-items-center gap-2">
                <a
                  href="https://www.instagram.com/voixdesbrumes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-link"
                  aria-label="Instagram @voixdesbrumes"
                  title="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-link"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-link"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>

              {/* Copyright */}
              <div className="font-mono text-muted text-xs">
                © {new Date().getFullYear()} Ahmadoul Khadim Diop · Tous droits réservés.
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Bouton WhatsApp Flottant Direct */}
      <a
        href="https://wa.me/221778682048?text=Bonjour%20Ahmadoul%2C%20je%20souhaite%20%C3%A9changer%20avec%20vous%20concernant%20un%20projet."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Discuter directement sur WhatsApp (+221 77 868 20 48)"
        title="Discuter sur WhatsApp (77 868 20 48)"
      >
        <i className="bi bi-whatsapp whatsapp-float-icon"></i>
        <span className="whatsapp-float-label">WhatsApp (77 868 20 48)</span>
      </a>

      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Official Interactive & Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
