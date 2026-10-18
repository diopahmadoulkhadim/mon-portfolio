import { CaseStudy, TechImpactItem, Testimonial } from '../types/portfolio';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'restosen',
    title: 'RestoSen',
    subtitle: 'Plateforme Vitrine & Expérience Gastronomique',
    category: 'E-Commerce & FoodTech',
    clientProblem:
      'Manque de visibilité digitale, menus au format PDF illisibles sur mobile et friction majeure pour les clients souhaitant réserver ou commander rapidement.',
    technicalSolution:
      'Conception d’une Single Page Application ultra-fluide avec navigation instantanée entre les cartes de menus, animations immersives et optimisation du flux d’appel direct pour convertir chaque visiteur en convive.',
    architectureDetails: [
      'Temps de chargement initial inférieur à 0.7s sur réseau 4G/3G mobile',
      'Architecture modulaire en composants réutilisables (carte, menu, modalités)',
      'Déploiement continu automatisé via Netlify avec audits Lighthouse optimisés',
    ],
    impactMetrics: [
      { label: 'Chargement', value: '< 0.7s' },
      { label: 'Mobile Score', value: '98/100' },
      { label: 'Conversion', value: '+45%' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Modern CSS', 'Netlify'],
    liveUrl: 'https://restosen.netlify.app/',
    repoUrl: 'https://github.com/diopahmadoulkhadim',
    imageUrl: '/image/resto.jpg',
    accentColor: '#f97316',
    showcaseConfig: {
      displayUrl: 'restosen.netlify.app',
      highlights: ['Navigation ultra-véloce < 0.7s', 'Menu gastronomique interactif', 'Réservation directe mobile'],
      speedSeconds: 14,
      badgeText: 'Live Demo · 60 FPS',
    },
  },
  {
    id: 'projetplus',
    title: 'ProjetPlus',
    subtitle: 'Conseil en Gestion de Projets & Élaboration de Business Plans',
    category: 'Consulting & Financement',
    clientProblem:
      'Difficulté majeure pour les entrepreneurs et coopératives au Sénégal de formaliser des dossiers de projets crédibles et des business plans bancables pour les bailleurs de fonds.',
    technicalSolution:
      'Conception d’un portail professionnel d’accompagnement complet mettant en avant l’expertise en montage de projets, les formations du soir et un tunnel d’inscription direct via formulaires et WhatsApp.',
    architectureDetails: [
      'Présentation ciblée des pôles : conseil, business plans et formations du soir (16h-18h)',
      'Navigation optimisée sans temps de chargement pour les porteurs de projets locaux',
      'Intégration d’un flux direct vers WhatsApp Business et de formulaires de diagnostic',
    ],
    impactMetrics: [
      { label: 'Accompagnement', value: '150+ projets' },
      { label: 'Bancabilité', value: '100% structuré' },
      { label: 'Apprenants', value: '320+ formés' },
    ],
    stack: ['Bootstrap 5', 'Responsive CSS', 'Architecture Modulaire', 'GitHub Pages'],
    liveUrl: 'https://diopahmadoulkhadim.github.io/gestion-de-projet/',
    repoUrl: 'https://github.com/diopahmadoulkhadim/gestion-de-projet',
    imageUrl: '/image/projetplus.jpg',
    accentColor: '#eab308',
    showcaseConfig: {
      displayUrl: 'diopahmadoulkhadim.github.io/gestion-de-projet',
      highlights: ['Diagnostic & Financement Projets', 'Modules Formations du Soir 16h-18h', 'Tunnel WhatsApp Direct'],
      speedSeconds: 16,
      badgeText: 'Showcase Interactif',
    },
  },
  {
    id: 'ndartech',
    title: 'SenPlatform NdarTech',
    subtitle: 'Portail Éducatif & Hub de Formation Tech',
    category: 'EdTech & Plateforme de Contenu',
    clientProblem:
      'Dispersion des programmes d’apprentissage aux technologies du web et parcours d’orientation confus pour les jeunes talents au Sénégal.',
    technicalSolution:
      'Création d’un écosystème web structuré présentant les parcours pédagogiques, modules certifiants et projets pratiques avec une lisibilité éditoriale irréprochable.',
    architectureDetails: [
      'Catalogue de formations filtrable par niveau et domaine technologique',
      'Hiérarchie visuelle stricte éliminant la surcharge cognitive des apprenants',
      'Intégration d’un parcours d’inscription simplifié en 2 clics',
    ],
    impactMetrics: [
      { label: 'Parcours', value: 'Clarté A+' },
      { label: 'Accessibilité', value: 'WCAG AA' },
      { label: 'Temps de lecture', value: '-35%' },
    ],
    stack: ['React', 'TypeScript', 'EdTech Architecture', 'Responsive UI', 'Netlify'],
    liveUrl: 'https://senplatformndartech.netlify.app/',
    repoUrl: 'https://github.com/diopahmadoulkhadim',
    imageUrl: '/image/conference.jpg',
    accentColor: '#8b5cf6',
    showcaseConfig: {
      displayUrl: 'senplatformndartech.netlify.app',
      highlights: ['Parcours certifiants web & code', 'Orientation claire sans friction', 'Design conforme WCAG AA'],
      speedSeconds: 15,
      badgeText: 'Live Demo · 60 FPS',
    },
  },
];

export const TECH_IMPACT_ITEMS: TechImpactItem[] = [
  {
    domain: 'Frontend & Performance',
    title: 'Ingénierie Réactive & Bundles Épurés',
    technologies: ['React 18', 'TypeScript', 'Vite', 'Tree-shaking'],
    impactStatement:
      'Architectures frontend modernes compilées pour des temps de premier affichage < 0.8s et zéro fuite de mémoire.',
    kpi: '< 0.8s First Paint',
    icon: 'bi-lightning-charge',
  },
  {
    domain: 'Design Systems & UI',
    title: 'Dark Glassmorphism & Interfaces Haute Précision',
    technologies: ['Modern CSS3', 'Bootstrap 5 Custom', 'Fluid Typography', 'Micro-interactions'],
    impactStatement:
      'Conception au pixel près respectant les règles d’accessibilité, ratios de contraste et typographie architecturale.',
    kpi: '100% Mobile & Desktop Native',
    icon: 'bi-palette',
  },
  {
    domain: '3D & Creative Coding',
    title: 'Expériences 3D Temps Réel & Kinématiques',
    technologies: ['Three.js', 'WebGL', 'PBR Shaders', 'Damped Physics'],
    impactStatement:
      'Intégration de scènes 3D immersives légères à 60 images par seconde sans dépendance externe fragile.',
    kpi: '60 FPS Lossless Loop',
    icon: 'bi-box',
  },
  {
    domain: 'Storytelling & Contenu',
    title: 'Création de Contenu & Marque Digitale',
    technologies: ['Voix des Brumes', 'Stratégie Vidéo', 'Audience Growth', 'Product Copy'],
    impactStatement:
      'Créateur et fondateur de la chaîne @voixdesbrumes : transformer des idées complexes en récits percutants qui captivent.',
    kpi: 'Impact Communauté & Réseaux',
    icon: 'bi-camera-reels',
  },
  {
    domain: 'DevOps & Déploiement',
    title: 'Pipelines CI/CD & Production Scalable',
    technologies: ['Git / GitHub', 'Netlify', 'Cloud Run', 'Continuous Delivery'],
    impactStatement:
      'Flux de travail rigoureux avec contrôle de version, prévisualisations par branches et livraisons instantanées.',
    kpi: 'Zero Downtime Deploys',
    icon: 'bi-git',
  },
  {
    domain: 'Vision Produit & Stratégie',
    title: 'Pragmatisme Entrepreneurial & Business',
    technologies: ['Prototypage Rapide', 'Validation Marché', 'Orientation Client', 'Agilité'],
    impactStatement:
      'Comprendre les enjeux économiques et opérationnels du client avant de coder pour maximiser le retour sur investissement.',
    kpi: 'Focus ROI & Croissance',
    icon: 'bi-rocket-takeoff',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'projetplus-dieng',
    name: 'El Hadji Baka Dieng',
    role: 'Planificateur & Consultant (MBA Gestion de Projets)',
    organization: 'Cabinet ProjetPlus',
    location: 'Kébémer, Sénégal',
    quote:
      'Ahmadoul a su matérialiser l’essence de ProjetPlus avec une plateforme claire, professionnelle et taillée pour nos porteurs de projets. La mise en valeur de nos modules de conseil et de business plan a immédiatement renforcé notre crédibilité auprès des partenaires et bailleurs.',
    outcome: '150+ projets accompagnés · Dossiers financés',
    projectRelation: 'Plateforme Web ProjetPlus',
    initials: 'ED',
    avatarUrl: '/image/el-hadji-baka-dieng.jpg',
  },
  {
    id: 'restosen-fall',
    name: 'Moussa Fall',
    role: 'Gérant & Propriétaire',
    organization: 'RestoSen Gourmet',
    location: 'Dakar, Sénégal',
    quote:
      'Grâce à l’intervention d’Ahmadoul, nos clients consultent instantanément la carte sans aucun ralentissement sur mobile. Les réservations directes ont augmenté de 45% dès le premier mois de déploiement.',
    outcome: '+45% de réservations de table',
    projectRelation: 'Plateforme Web RestoSen',
    initials: 'MF',
  },
  {
    id: 'ndartech-diallo',
    name: 'Dr. Cheikh T. Diallo',
    role: 'Responsable des Filières Numériques',
    organization: 'SenPlatform NdarTech',
    location: 'Sénégal',
    quote:
      'Faire preuve d’une telle rigueur d’ingénierie et d’un tel sens du design à 18 ans est remarquable. La plateforme offre une lisibilité parfaite de nos cursus et a doublé nos candidatures en ligne.',
    outcome: 'Parcours certifié WCAG AA · Inscriptions x2',
    projectRelation: 'Portail Éducatif NdarTech',
    initials: 'CD',
  },
];
