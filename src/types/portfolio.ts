export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  clientProblem: string;
  technicalSolution: string;
  architectureDetails: string[];
  impactMetrics: { label: string; value: string }[];
  stack: string[];
  liveUrl: string;
  repoUrl?: string;
  imageUrl: string;
  accentColor: string;
  showcaseConfig?: {
    displayUrl: string;
    highlights: string[];
    speedSeconds?: number;
    badgeText?: string;
  };
}

export interface TechImpactItem {
  domain: string;
  title: string;
  technologies: string[];
  impactStatement: string;
  kpi: string;
  icon: string;
}

export interface ContactMessage {
  nom: string;
  email: string;
  linkedin?: string;
  projectType: string;
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  quote: string;
  outcome: string;
  projectRelation: string;
  initials: string;
  avatarUrl?: string;
}
