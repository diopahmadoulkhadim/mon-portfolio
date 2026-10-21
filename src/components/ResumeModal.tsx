import React, { useEffect, useState } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-dark-backdrop resume-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div
        className="modal-dark-container resume-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Non-printable) */}
        <div className="resume-control-bar no-print">
          <div className="d-flex align-items-center gap-2">
            <span className="font-mono text-xs text-primary fw-bold text-uppercase d-flex align-items-center gap-2">
              <span className="dot dot-green" />
              Curriculum Vitæ Officiel · Ahmadoul Khadim Diop
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={handlePrint}
              className="btn btn-sm btn-primary d-inline-flex align-items-center gap-2 px-3 py-1 font-mono rounded-2"
              title="Imprimer ou enregistrer en PDF (A4)"
            >
              <i className="bi bi-printer-fill"></i>
              <span>Imprimer / Sauvegarder en PDF</span>
            </button>

            <a
              href="https://wa.me/221778682048?text=Bonjour%20Ahmadoul%2C%20j%27ai%20consult%C3%A9%20votre%20CV%20sur%20votre%20portfolio%20et%20je%20souhaite%20%C3%A9changer%20avec%20vous."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-success d-none d-sm-inline-flex align-items-center gap-2 px-3 py-1 font-mono rounded-2"
              style={{ background: '#25D366', borderColor: '#25D366', color: '#fff' }}
              title="Discuter directement sur WhatsApp"
            >
              <i className="bi bi-whatsapp"></i>
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={onClose}
              className="btn btn-dark btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
              style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.08)' }}
              aria-label="Fermer le CV"
            >
              <i className="bi bi-x-lg text-white"></i>
            </button>
          </div>
        </div>

        {/* Printable & Interactive CV Document (A4 sheet styling) */}
        <div className="resume-paper-document printable-content">
          {/* Header Section */}
          <header className="resume-header">
            <div className="row align-items-center g-4">
              <div className="col-md-8">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <h1 id="resume-title" className="resume-name mb-0">
                    Ahmadoul Khadim Diop
                  </h1>
                </div>

                <div className="resume-headline mb-3">
                  Développeur Web Front-End & Créateur Tech
                </div>

                {/* Badges statut & disponibilité */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="resume-pill pill-accent">
                    <i className="bi bi-check-circle-fill me-1"></i>
                    Disponible pour Recrutement & Missions
                  </span>
                  <span className="resume-pill">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    Kébémer & Dakar, Sénégal (Mobile & Remote)
                  </span>
                  <span className="resume-pill">
                    <i className="bi bi-lightning-charge-fill me-1"></i>
                    18 ans · Autonomie & Rigueur d'exécution
                  </span>
                </div>

                {/* Coordonnées & Liens Réseaux */}
                <div className="resume-contacts-grid">
                  <div className="resume-contact-item">
                    <i className="bi bi-envelope-fill text-primary"></i>
                    <a href="mailto:diopahmadoulkhadim@gmail.com" className="resume-link">
                      diopahmadoulkhadim@gmail.com
                    </a>
                    <button
                      onClick={() => copyToClipboard('diopahmadoulkhadim@gmail.com', 'email')}
                      className="btn-copy-inline no-print"
                      title="Copier l'email"
                    >
                      <i className={`bi ${copiedField === 'email' ? 'bi-check-lg text-success' : 'bi-copy'}`}></i>
                    </button>
                  </div>

                  <div className="resume-contact-item">
                    <i className="bi bi-telephone-fill text-primary"></i>
                    <a href="tel:+221778682048" className="resume-link">
                      +221 77 868 20 48
                    </a>
                    <span className="text-muted no-print">/</span>
                    <a href="tel:+221775940137" className="resume-link no-print">
                      77 594 01 37
                    </a>
                  </div>

                  <div className="resume-contact-item">
                    <i className="bi bi-linkedin text-primary"></i>
                    <a
                      href="https://linkedin.com/in/ahmadoul-khadim-diop-9a46b9444"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-link"
                    >
                      linkedin.com/in/ahmadoul-khadim-diop-9a46b9444
                    </a>
                  </div>

                  <div className="resume-contact-item">
                    <i className="bi bi-github text-primary"></i>
                    <a
                      href="https://github.com/diopahmadoulkhadim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-link"
                    >
                      github.com/diopahmadoulkhadim
                    </a>
                  </div>
                </div>
              </div>

              {/* Photo & Signature visuelle */}
              <div className="col-md-4 text-center text-md-end">
                <div className="position-relative d-inline-block">
                  <img
                    src={`${import.meta.env.BASE_URL}image/profil.jpg`}
                    alt="Ahmadoul Khadim Diop"
                    className="resume-photo"
                  />
                  <div className="resume-photo-badge" title="Profil vérifié">
                    <i className="bi bi-patch-check-fill text-primary fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <hr className="resume-divider" />

          {/* Profil Professionnel / Manifeste */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <i className="bi bi-person-badge text-primary me-2"></i>
              Profil Professionnel & Vision
            </h2>
            <div className="resume-summary-card">
              <p className="resume-summary-text mb-0">
                <strong>Développeur front-end rigoureux, autonome et passionné par l'excellence des interfaces modernes.</strong> Formé
                aux bases solides du web et continuellement en montée de compétences avancée (HTML5 sémantique, CSS3 moderne & responsive,
                JavaScript interactif ES6+, React, Git et déploiement continu). Ayant déjà conçu et mis en ligne plusieurs plateformes
                réelles en production (conseil en projets, gastronomie, portail éducatif), j'accompagne les entreprises et entrepreneurs
                dans la création d'expériences web utiles, rapides, élégantes et orientées conversion. Également créateur et fondateur
                de la chaîne <em>@voixdesbrumes</em>, j'apporte une double compétence rare alliant rigueur d'ingénierie et force de storytelling.
              </p>
            </div>
          </section>

          {/* Projets Web Réalisés (En Production) */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <i className="bi bi-kanban text-primary me-2"></i>
              Projets Web Réalisés & Déployés en Production
            </h2>

            <div className="resume-projects-list">
              {/* Projet 1: ProjetPlus */}
              <div className="resume-project-item">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-1">
                  <h3 className="resume-item-title mb-0">
                    ProjetPlus · Portail Conseil en Gestion de Projets & Business Plans
                  </h3>
                  <a
                    href="https://diopahmadoulkhadim.github.io/gestion-de-projet/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-project-url"
                  >
                    <span>diopahmadoulkhadim.github.io/gestion-de-projet</span>
                    <i className="bi bi-arrow-up-right ms-1"></i>
                  </a>
                </div>
                <div className="resume-item-subtitle mb-2">
                  Client : Cabinet ProjetPlus (El Hadji Baka Dieng) · Stack : Bootstrap 5, CSS3 Responsive, GitHub Pages, WhatsApp API
                </div>
                <p className="resume-item-desc mb-2">
                  Conception intégrale et mise en ligne d'une plateforme d'accompagnement pour entrepreneurs et coopératives.
                  Présentation des pôles de conseil, structuration de dossiers bancables, catalogue des formations du soir (16h-18h)
                  et tunnel de conversion direct vers WhatsApp Business (150+ projets accompagnés).
                </p>
                <div className="resume-item-tags">
                  <span className="tag-pill">Conseil & Business Plans</span>
                  <span className="tag-pill">Intégration WhatsApp Business</span>
                  <span className="tag-pill">100% Responsive Mobile</span>
                </div>
              </div>

              {/* Projet 2: RestoSen */}
              <div className="resume-project-item">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-1">
                  <h3 className="resume-item-title mb-0">
                    RestoSen · Plateforme Vitrine Gastronomique & Commande
                  </h3>
                  <a
                    href="https://restosen.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-project-url"
                  >
                    <span>restosen.netlify.app</span>
                    <i className="bi bi-arrow-up-right ms-1"></i>
                  </a>
                </div>
                <div className="resume-item-subtitle mb-2">
                  Stack : React, TypeScript, Single Page Application, CSS Modulaire, Netlify CI/CD
                </div>
                <p className="resume-item-desc mb-2">
                  Single Page Application haute performance résolvant les frictions de menus PDF illisibles sur smartphone.
                  Chargement initial &lt; 0.7s, score mobile Lighthouse 98/100, menus interactifs et tunnel d'appel direct pour réserver une table (+45% de réservations).
                </p>
                <div className="resume-item-tags">
                  <span className="tag-pill">Temps de chargement &lt; 0.7s</span>
                  <span className="tag-pill">Score Mobile 98/100</span>
                  <span className="tag-pill">Expérience Gastronomique</span>
                </div>
              </div>

              {/* Projet 3: Platform de Programme NdarTech */}
              <div className="resume-project-item">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-1">
                  <h3 className="resume-item-title mb-0">
                    Platform de Programme NdarTech · Hub Éducatif & Orientation Tech
                  </h3>
                  <a
                    href="https://senplatformndartech.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-project-url"
                  >
                    <span>senplatformndartech.netlify.app</span>
                    <i className="bi bi-arrow-up-right ms-1"></i>
                  </a>
                </div>
                <div className="resume-item-subtitle mb-2">
                  Stack : Architecture Web Modulaire, Accessibilité WCAG AA, GitHub Pages / Netlify
                </div>
                <p className="resume-item-desc mb-2">
                  Plateforme éducative centralisant les programmes d'apprentissage au développement web et aux métiers numériques.
                  Hiérarchie visuelle irréprochable éliminant la surcharge cognitive des apprenants et simplifiant l'inscription en 2 clics.
                </p>
                <div className="resume-item-tags">
                  <span className="tag-pill">EdTech & Pédagogie</span>
                  <span className="tag-pill">Accessibilité WCAG AA</span>
                  <span className="tag-pill">Parcours Certifiants</span>
                </div>
              </div>

              {/* Projets 4 & 5: SenAgriFood & Sen-Marché */}
              <div className="row g-3 mt-1">
                <div className="col-md-6">
                  <div className="p-3 rounded-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <h4 className="fs-6 fw-bold text-white mb-1">SenAgriFood</h4>
                    <p className="text-muted text-xs mb-1">
                      Projet web consacré au secteur agroalimentaire au Sénégal : valorisation des producteurs locaux et circuits de distribution.
                    </p>
                    <span className="font-mono text-xs text-primary">Agroalimentaire & Vitrine</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <h4 className="fs-6 fw-bold text-white mb-1">Sen-Marché</h4>
                    <p className="text-muted text-xs mb-1">
                      Projet web orienté vers la digitalisation du commerce et des transactions locales au Sénégal avec navigation fluide.
                    </p>
                    <span className="font-mono text-xs text-primary">Commerce Local & Vente</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Compétences Techniques & Qualités Professionnelles */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <i className="bi bi-cpu text-primary me-2"></i>
              Compétences Techniques & Méthodologie
            </h2>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="resume-skill-block">
                  <div className="resume-skill-header">
                    <span className="fw-bold text-white">HTML5 Sémantique</span>
                    <span className="resume-skill-badge">Maîtrise Complète</span>
                  </div>
                  <p className="text-muted text-xs mb-0">
                    Structuration saine de pages web, respect des standards W3C, optimisation du référencement naturel (SEO) et accessibilité (ARIA).
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="resume-skill-block">
                  <div className="resume-skill-header">
                    <span className="fw-bold text-white">CSS3 & Responsive Design</span>
                    <span className="resume-skill-badge">Avancé</span>
                  </div>
                  <p className="text-muted text-xs mb-0">
                    Mise en forme moderne, Flexbox, CSS Grid, Media Queries, Dark Mode / Glassmorphism, animations fluides et Bootstrap 5 custom.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="resume-skill-block">
                  <div className="resume-skill-header">
                    <span className="fw-bold text-white">JavaScript (ES6+)</span>
                    <span className="resume-skill-badge">Interactif & Dynamique</span>
                  </div>
                  <p className="text-muted text-xs mb-0">
                    Menus interactifs, formulaires de contact validés, calculs dynamiques, gestion des événements asynchrones et intégrations WhatsApp.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="resume-skill-block">
                  <div className="resume-skill-header">
                    <span className="fw-bold text-white">Git, GitHub & Déploiement</span>
                    <span className="resume-skill-badge">Production Ready</span>
                  </div>
                  <p className="text-muted text-xs mb-0">
                    Gestion de versions, suivi rigoureux de projets, publication et mise en ligne automatisée via GitHub Pages et Netlify.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="resume-skill-block">
                  <div className="resume-skill-header">
                    <span className="fw-bold text-white">Écosystème Moderne (React & Vite)</span>
                    <span className="resume-skill-badge">Architecture</span>
                  </div>
                  <p className="text-muted text-xs mb-0">
                    Composants réutilisables, hooks réactifs (useState, useEffect), typage TypeScript et scènes 3D interactives (Three.js).
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="resume-skill-block">
                  <div className="resume-skill-header">
                    <span className="fw-bold text-white">Création de Contenu & Storytelling</span>
                    <span className="resume-skill-badge">Voix des Brumes</span>
                  </div>
                  <p className="text-muted text-xs mb-0">
                    Capacité à vulgariser les concepts techniques, création de vidéos engageantes et construction d'une marque digitale percutante.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Formations & Langues */}
          <section className="resume-section">
            <div className="row g-4">
              <div className="col-md-7">
                <h2 className="resume-section-title">
                  <i className="bi bi-mortarboard text-primary me-2"></i>
                  Formation & Cursus Académique
                </h2>

                <div className="resume-timeline">
                  <div className="resume-timeline-item">
                    <div className="resume-timeline-marker" />
                    <div className="d-flex justify-content-between align-items-baseline mb-1">
                      <h4 className="resume-item-title mb-0">
                        Formation Accélérée en Développement Web
                      </h4>
                      <span className="font-mono text-xs text-primary">Saint-Louis, Sénégal</span>
                    </div>
                    <div className="text-muted text-xs mb-1">
                      Organisme : NdarTech
                    </div>
                    <p className="resume-item-desc mb-0">
                      Acquisition approfondie des bases pratiques du génie logiciel web : HTML, CSS, JavaScript, Git & GitHub,
                      publication en production et architecture modulaire.
                    </p>
                  </div>

                  <div className="resume-timeline-item">
                    <div className="resume-timeline-marker" />
                    <div className="d-flex justify-content-between align-items-baseline mb-1">
                      <h4 className="resume-item-title mb-0">
                        BFEM (Brevet de Fin d'Études Moyennes)
                      </h4>
                      <span className="font-mono text-xs text-primary">Session 2025</span>
                    </div>
                    <p className="resume-item-desc mb-0">
                      Cursus scolaire validé avec succès · Bases solides en mathématiques, logique et expression française.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <h2 className="resume-section-title">
                  <i className="bi bi-translate text-primary me-2"></i>
                  Langues & Atouts Personnels
                </h2>

                {/* Langues */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-white fw-bold text-sm">Français</span>
                    <span className="font-mono text-xs text-success">Bon niveau · Courant</span>
                  </div>
                  <p className="text-muted text-xs mb-3">
                    Excellente communication orale et écrite, rédaction de documentation technique et relation client claire.
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-white fw-bold text-sm">Anglais</span>
                    <span className="font-mono text-xs text-primary">Débutant proactif</span>
                  </div>
                  <p className="text-muted text-xs mb-0">
                    Compréhension de la documentation technique informatique, apprentissage et progression quotidienne.
                  </p>
                </div>

                {/* Qualités Professionnelles */}
                <div>
                  <h4 className="text-white fs-6 fw-bold mb-2">Qualités Clés</h4>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="tag-pill"><i className="bi bi-check me-1"></i>Autonomie</span>
                    <span className="tag-pill"><i className="bi bi-check me-1"></i>Rigueur</span>
                    <span className="tag-pill"><i className="bi bi-check me-1"></i>Sens de l'organisation</span>
                    <span className="tag-pill"><i className="bi bi-check me-1"></i>Esprit d'initiative</span>
                    <span className="tag-pill"><i className="bi bi-check me-1"></i>Capacité d'apprentissage rapide</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Objectif Professionnel (Clôture) */}
          <footer className="resume-footer mt-4 pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="p-3 rounded-2 text-center" style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <div className="font-mono text-xs text-primary fw-bold text-uppercase mb-1">
                Objectif Professionnel
              </div>
              <p className="text-white mb-0" style={{ fontSize: '0.94rem' }}>
                « Accompagner avec rigueur et créativité les entreprises, startups et entrepreneurs dans la conception
                et le déploiement d'une présence en ligne d'excellence, tout en continuant à repousser les limites de mon expertise technique. »
              </p>
            </div>
          </footer>
        </div>

        {/* Bottom Action Footer (Non-printable) */}
        <div className="resume-bottom-bar no-print">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 w-100">
            <div className="text-muted font-mono text-xs">
              Disponible pour entretien immédiat à Dakar, Kébémer ou en visio.
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                onClick={handlePrint}
                className="btn btn-outline-light btn-sm font-mono d-inline-flex align-items-center gap-2 px-3 py-2 rounded-2"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <i className="bi bi-printer"></i>
                <span>Imprimer (A4)</span>
              </button>

              <a
                href="https://wa.me/221778682048?text=Bonjour%20Ahmadoul%2C%20je%20souhaite%20vous%20recruter%20%2F%20collaborer%20avec%20vous."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-sm font-mono d-inline-flex align-items-center gap-2 px-3 py-2 rounded-2"
                style={{ background: '#25D366', borderColor: '#25D366' }}
              >
                <i className="bi bi-whatsapp"></i>
                <span>Engager sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
