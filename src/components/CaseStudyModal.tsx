import React, { useEffect } from 'react';
import { CaseStudy } from '../types/portfolio';
import { ProjectVideoShowcase } from './ProjectVideoShowcase';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <div
      className="modal-dark-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-case-title"
    >
      <div
        className="modal-dark-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Media & Navigation */}
        <div className="position-relative w-100 p-3 pb-0 d-flex justify-content-between align-items-center">
          <div>
            <span className="font-mono text-xs text-primary fw-semibold mb-1 d-block text-uppercase">
              {caseStudy.category}
            </span>
            <h2 id="modal-case-title" className="text-white fw-bold mb-0 fs-3">
              {caseStudy.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px', zIndex: 10, background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
            aria-label="Fermer la modal"
          >
            <i className="bi bi-x-lg text-white"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3 p-md-4">
          {/* Expanded Project Video Showcase */}
          <ProjectVideoShowcase caseStudy={caseStudy} expanded={true} />

          <p className="text-muted fs-6 mb-4">{caseStudy.subtitle}</p>

          <div className="row g-4 mb-4">
            {/* Le Problème Client */}
            <div className="col-md-6">
              <div className="p-3 rounded-3" style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                  <span className="font-mono text-xs text-danger fw-bold text-uppercase">
                    Problème Client
                  </span>
                </div>
                <p className="text-light-dim text-sm mb-0" style={{ fontSize: '0.92rem', color: '#cbd5e1' }}>
                  {caseStudy.clientProblem}
                </p>
              </div>
            </div>

            {/* La Solution Technique */}
            <div className="col-md-6">
              <div className="p-3 rounded-3" style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-check-circle-fill text-primary"></i>
                  <span className="font-mono text-xs text-primary fw-bold text-uppercase">
                    Solution Technique
                  </span>
                </div>
                <p className="text-light-dim text-sm mb-0" style={{ fontSize: '0.92rem', color: '#cbd5e1' }}>
                  {caseStudy.technicalSolution}
                </p>
              </div>
            </div>
          </div>

          {/* Architecture & Décisions */}
          <div className="mb-4">
            <h4 className="text-white fs-6 fw-bold mb-3 font-mono text-uppercase text-primary">
              Points Clés d'Ingénierie
            </h4>
            <ul className="list-unstyled mb-0">
              {caseStudy.architectureDetails.map((detail, idx) => (
                <li key={idx} className="d-flex align-items-start gap-3 mb-2 text-muted" style={{ fontSize: '0.92rem' }}>
                  <i className="bi bi-arrow-right-short text-primary fs-5 mt-n1"></i>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Métriques d'Impact */}
          <div className="row g-3 mb-4 p-3 rounded-3" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {caseStudy.impactMetrics.map((metric, idx) => (
              <div key={idx} className="col-4 text-center">
                <div className="font-mono fw-bold fs-4 text-white tabular-nums">{metric.value}</div>
                <div className="text-muted text-xs text-uppercase mt-1" style={{ fontSize: '0.75rem' }}>{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Stack Utilisée */}
          <div className="mb-4">
            <span className="font-mono text-xs text-muted text-uppercase d-block mb-2">
              Technologies & Outils Associés :
            </span>
            <div className="d-flex flex-wrap gap-2">
              {caseStudy.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-2 py-1 rounded"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#93c5fd', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="d-flex flex-wrap gap-3 pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary d-inline-flex align-items-center gap-2 fw-semibold px-4 py-2 rounded-3"
            >
              <span>Accéder à la démo live</span>
              <i className="bi bi-box-arrow-up-right"></i>
            </a>

            {caseStudy.repoUrl && (
              <a
                href={caseStudy.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light d-inline-flex align-items-center gap-2 px-4 py-2 rounded-3"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <i className="bi bi-github"></i>
                <span>Dépôt GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
