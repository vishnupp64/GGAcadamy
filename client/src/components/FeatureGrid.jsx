import React from 'react';
import { Target, Gauge, Sparkles, Smartphone } from 'lucide-react';

export const FeatureGrid = () => {
  const features = [
    {
      icon: <Target size={32} color="#00f0ff" />,
      title: 'ENHANCED ACCURACY',
      description: 'Calculated sensitivity coefficients designed to snap crosshairs directly to enemy heads.',
    },
    {
      icon: <Gauge size={32} color="#7000ff" />,
      title: 'STREAMLINED GAMEPLAY',
      description: 'Ergonomic HUD controls that eliminate movement latency and finger overlap.',
    },
    {
      icon: <Sparkles size={32} color="#ffb800" />,
      title: 'USER-FRIENDLY TECHNIQUES',
      description: 'Easy-to-follow step-by-step video drills designed for rapid muscle memory adoption.',
    },
    {
      icon: <Smartphone size={32} color="#ff0055" />,
      title: 'MOBILE OPTIMIZATION',
      description: 'Fine-tuned configurations for high FPS and smooth performance on low to flagship devices.',
    },
  ];

  return (
    <section className="feature-grid-section" id="main-features">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">WHY CHOOSE <span className="text-gradient-purple">GG ACADEMY</span></h2>
          <p className="section-sub">Engineered by pro esports analysts for instantaneous rank improvements</p>
        </div>

        <div className="grid">
          {features.map((feat, idx) => (
            <div key={idx} className="glass-card feature-card">
              <div className="icon-wrapper">{feat.icon}</div>
              <h3 className="card-title">{feat.title}</h3>
              <p className="card-desc">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .feature-grid-section {
          padding: 5rem 0;
          background: var(--bg-primary);
        }

        .section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .section-title {
          font-size: 2.4rem;
          margin-bottom: 0.5rem;
        }

        .section-sub {
          color: var(--text-secondary);
          font-size: 1.05rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.8rem;
        }

        .feature-card {
          padding: 2.2rem 1.8rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-radius: var(--card-radius);
          position: relative;
          overflow: hidden;
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-title {
          font-size: 1.2rem;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .card-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};
