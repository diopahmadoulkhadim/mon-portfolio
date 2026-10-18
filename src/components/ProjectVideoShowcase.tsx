import React, { useState, useEffect, useRef } from 'react';
import { CaseStudy } from '../types/portfolio';

interface ProjectVideoShowcaseProps {
  caseStudy: CaseStudy;
  expanded?: boolean;
  onOpenDetails?: () => void;
}

export const ProjectVideoShowcase: React.FC<ProjectVideoShowcaseProps> = ({
  caseStudy,
  expanded = false,
  onOpenDetails,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayUrl = caseStudy.showcaseConfig?.displayUrl || caseStudy.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const highlights = caseStudy.showcaseConfig?.highlights || [
    'Performance optimisée',
    'Responsive mobile & desktop',
    'Architecture moderne',
  ];
  const badgeText = caseStudy.showcaseConfig?.badgeText || 'Live Showcase · 60 FPS';
  const speedSeconds = caseStudy.showcaseConfig?.speedSeconds || (expanded ? 18 : 14);

  // Intersection Observer to pause animation when out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Highlights rotation timer
  useEffect(() => {
    if (!isPlaying || isInteractive) return;
    const interval = setInterval(() => {
      setActiveHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying, isInteractive, highlights.length]);

  const shouldAnimate = isPlaying && isInViewport && !isHovered && !isInteractive;

  return (
    <div
      ref={containerRef}
      className={`project-video-showcase ${expanded ? 'showcase-expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dark Browser Chrome Top Bar */}
      <div className="showcase-chrome">
        {/* macOS Traffic Dots */}
        <div className="showcase-dots" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        {/* Address Bar */}
        <div className="showcase-url-bar" title={caseStudy.liveUrl}>
          <i className="bi bi-lock-fill text-emerald me-1" style={{ fontSize: '0.75rem', color: '#10b981' }}></i>
          <span className="showcase-url-text">{displayUrl}</span>
        </div>

        {/* Status indicator & controls */}
        <div className="showcase-chrome-controls">
          <div className="showcase-live-badge" title="Flux de démo interactif">
            <span className={`pulse-dot ${shouldAnimate ? 'active' : ''}`} />
            <span className="showcase-live-text">{badgeText}</span>
          </div>

          {/* Play/Pause loop toggle */}
          {!isInteractive && (
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="showcase-icon-btn"
              title={isPlaying ? 'Mettre la boucle en pause' : 'Reprendre la boucle'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
            </button>
          )}

          {/* Interactive mode toggle */}
          <button
            type="button"
            onClick={() => setIsInteractive(!isInteractive)}
            className={`showcase-action-btn ${isInteractive ? 'active-interactive' : ''}`}
            title={isInteractive ? 'Revenir à la boucle vidéo' : 'Interagir directement avec le site'}
          >
            <i className={`bi ${isInteractive ? 'bi-camera-video' : 'bi-lightning-charge-fill'}`}></i>
            <span className="d-none d-sm-inline">
              {isInteractive ? 'Vidéo' : 'Direct'}
            </span>
          </button>
        </div>
      </div>

      {/* Showcase Viewport Container */}
      <div className="showcase-viewport">
        {isInteractive ? (
          /* Live Interactive Iframe View */
          <div className="showcase-interactive-view">
            <div className="showcase-interactive-banner">
              <span>
                <i className="bi bi-info-circle me-1"></i>
                Navigation interactive en direct dans le bac à sable
              </span>
              <button
                type="button"
                onClick={() => setIsInteractive(false)}
                className="btn btn-sm btn-outline-light py-0 px-2 font-mono"
                style={{ fontSize: '0.72rem' }}
              >
                Retour vidéo
              </button>
            </div>
            <iframe
              src={caseStudy.liveUrl}
              title={`Aperçu interactif de ${caseStudy.title}`}
              className="showcase-iframe"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="lazy"
            />
          </div>
        ) : (
          /* Automated Continuous Video / Cinematic Scrolling Showcase */
          <div className="showcase-cinematic-stage">
            {/* The scrolling simulated live page content */}
            <div
              className="showcase-scroll-track"
              style={{
                animationDuration: `${speedSeconds}s`,
                animationPlayState: shouldAnimate ? 'running' : 'paused',
              }}
            >
              {/* Screen 1: Top Hero & Brand Experience */}
              <div className="showcase-screen screen-hero">
                <div
                  className="showcase-screen-backdrop"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(6, 8, 14, 0.4) 0%, rgba(6, 8, 14, 0.85) 100%), url(${caseStudy.imageUrl})`,
                  }}
                />
                <div className="showcase-screen-content">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{
                        background: 'rgba(0,0,0,0.6)',
                        color: caseStudy.accentColor,
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {caseStudy.category}
                    </span>
                    <span className="text-white-50 font-mono text-xs">
                      v2.4 · Production
                    </span>
                  </div>

                  <h4 className="showcase-screen-title">{caseStudy.title}</h4>
                  <p className="showcase-screen-subtitle">{caseStudy.subtitle}</p>

                  <div className="d-flex align-items-center gap-2 mt-2">
                    <span className="showcase-btn-mock primary">
                      Explorer
                    </span>
                    <span className="showcase-btn-mock secondary">
                      En savoir plus
                    </span>
                  </div>
                </div>
              </div>

              {/* Screen 2: Interactive Modules / Menu / Business Features */}
              <div className="showcase-screen screen-features">
                <div className="showcase-feature-grid">
                  <div className="showcase-feature-tile">
                    <div className="feature-icon" style={{ color: caseStudy.accentColor }}>
                      <i className="bi bi-speedometer2"></i>
                    </div>
                    <div className="feature-info">
                      <span className="feature-label">Performance</span>
                      <strong className="feature-val">{caseStudy.impactMetrics[0]?.value || '< 0.8s'}</strong>
                    </div>
                  </div>

                  <div className="showcase-feature-tile">
                    <div className="feature-icon" style={{ color: '#38bdf8' }}>
                      <i className="bi bi-shield-check"></i>
                    </div>
                    <div className="feature-info">
                      <span className="feature-label">Fiabilité</span>
                      <strong className="feature-val">{caseStudy.impactMetrics[1]?.value || '100%'}</strong>
                    </div>
                  </div>

                  <div className="showcase-feature-tile">
                    <div className="feature-icon" style={{ color: '#10b981' }}>
                      <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <div className="feature-info">
                      <span className="feature-label">Impact Direct</span>
                      <strong className="feature-val">{caseStudy.impactMetrics[2]?.value || '+45%'}</strong>
                    </div>
                  </div>
                </div>

                {/* Simulated Core Application Flow */}
                <div className="showcase-app-flow mt-2 p-2 rounded-2" style={{ background: 'rgba(15,23,42,0.75)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="d-flex align-items-center justify-content-between text-xs text-muted font-mono mb-1">
                    <span>Architecture & Stack</span>
                    <span className="text-primary">{caseStudy.stack.slice(0, 3).join(' · ')}</span>
                  </div>
                  <div className="progress" style={{ height: '4px', background: 'rgba(255,255,255,0.08)' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: '88%',
                        backgroundColor: caseStudy.accentColor,
                        boxShadow: `0 0 10px ${caseStudy.accentColor}`,
                      }}
                      aria-valuenow={88}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>

              {/* Screen 3: Conversion / WhatsApp / Action CTA */}
              <div className="showcase-screen screen-cta">
                <div className="p-3 text-center rounded-2" style={{ background: 'rgba(6,8,14,0.92)', border: '1px dashed rgba(255,255,255,0.12)' }}>
                  <div className="text-white fw-bold mb-1" style={{ fontSize: '0.88rem' }}>
                    Résultat en Production
                  </div>
                  <p className="text-muted text-xs mb-2">
                    {caseStudy.clientProblem.slice(0, 90)}...
                  </p>
                  <div className="d-flex justify-content-center gap-2">
                    <a
                      href={caseStudy.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-btn-mock primary d-inline-flex align-items-center gap-1 text-decoration-none"
                      style={{ color: '#fff' }}
                    >
                      <span>Tester le site en ligne</span>
                      <i className="bi bi-box-arrow-up-right" style={{ fontSize: '0.7rem' }}></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Gradient Overlays for Cinematic Depth */}
            <div className="showcase-scrim-top" aria-hidden="true" />
            <div className="showcase-scrim-bottom" aria-hidden="true" />

            {/* Dynamic Rotating Highlight Pill Overlay */}
            <div className="showcase-highlight-pill">
              <i className="bi bi-stars text-warning me-1"></i>
              <span>{highlights[activeHighlightIndex]}</span>
            </div>

            {/* Hover Floating Controls Overlay */}
            <div className="showcase-hover-controls">
              <button
                type="button"
                onClick={() => setIsInteractive(true)}
                className="showcase-floating-btn"
                title="Tester en direct"
              >
                <i className="bi bi-lightning-charge-fill text-warning me-1"></i>
                <span>Interagir</span>
              </button>

              {onOpenDetails && (
                <button
                  type="button"
                  onClick={onOpenDetails}
                  className="showcase-floating-btn"
                  title="Voir l'étude de cas complète"
                >
                  <i className="bi bi-arrows-angle-expand me-1"></i>
                  <span>Étude de cas</span>
                </button>
              )}

              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="showcase-floating-btn"
                title="Ouvrir dans un nouvel onglet"
              >
                <i className="bi bi-box-arrow-up-right"></i>
              </a>
            </div>

            {/* Paused state watermark overlay */}
            {!isPlaying && (
              <div
                className="showcase-pause-overlay"
                onClick={() => setIsPlaying(true)}
              >
                <div className="pause-icon-circle">
                  <i className="bi bi-play-fill fs-4 text-white"></i>
                </div>
                <span className="text-xs text-white font-mono mt-1">Boucle en pause · Cliquez pour reprendre</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
