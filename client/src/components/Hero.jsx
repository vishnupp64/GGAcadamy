import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Trophy, Play } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={16} color="#00f0ff" />
            <span>#1 GAMING MASTERY PLATFORM IN INDIA</span>
          </div>

          <h1 className="hero-title">
            DOMINATE THE BATTLEFIELD WITH <span className="text-gradient-purple">PRO SENSI</span> & TACTICS
          </h1>

          <p className="hero-description">
            Unlock 90%+ Headshot accuracy, 0.1s Elevator Gloo Wall response time, and expert HUD configurations engineered for competitive victory.
          </p>

          <div className="hero-ctas">
            <Link to="/shop" className="btn btn-primary">
              <Zap size={18} /> Shop Now
            </Link>
            <a href="#main-features" className="btn btn-secondary">
              <Play size={18} /> Try It Now
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <ShieldCheck size={18} color="#00f0ff" /> 100% Anti-Ban Safe
            </div>
            <div className="trust-item">
              <Trophy size={18} color="#ffb800" /> Tournament Tested
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow-backdrop"></div>
          <div className="visual-card glass-card">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
              alt="GG Academy Gaming Setup"
              className="hero-img"
            />
            <div className="floating-stat-badge stat-badge-left">
              <span className="stat-num">99.4%</span>
              <span className="stat-label">Win Accuracy</span>
            </div>
            <div className="floating-stat-badge stat-badge-right">
              <span className="stat-num">30,000+</span>
              <span className="stat-label">Pro Students</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding: 5rem 0;
          overflow: hidden;
          background: radial-gradient(circle at 70% 30%, rgba(112, 0, 255, 0.15) 0%, rgba(10, 12, 16, 1) 70%);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.3);
          padding: 0.4rem 0.9rem;
          border-radius: 30px;
          color: var(--accent-cyan);
          font-size: 0.8rem;
          font-weight: 800;
          width: fit-content;
        }

        .hero-title {
          font-size: 3.2rem;
          line-height: 1.15;
          margin: 0;
        }

        .hero-description {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 540px;
          margin: 0;
        }

        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.8rem;
          border-radius: var(--btn-radius);
          font-weight: 800;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all var(--transition-fast);
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #9333ea 100%);
          color: #fff;
          box-shadow: 0 4px 20px rgba(112, 0, 255, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(112, 0, 255, 0.6);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .hero-trust {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-top: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .visual-glow-backdrop {
          position: absolute;
          width: 300px;
          height: 300px;
          background: var(--accent-primary);
          filter: blur(100px);
          opacity: 0.4;
          border-radius: 50%;
          top: 10%;
        }

        .visual-card {
          position: relative;
          padding: 0.75rem;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        }

        .hero-img {
          border-radius: 14px;
          width: 100%;
          max-height: 420px;
          object-fit: cover;
        }

        .floating-stat-badge {
          position: absolute;
          background: rgba(18, 21, 30, 0.9);
          border: 1px solid var(--border-glow);
          padding: 0.7rem 1rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
        }

        .stat-badge-left {
          top: 20px;
          left: -20px;
        }

        .stat-badge-right {
          bottom: 20px;
          right: -20px;
        }

        .stat-num {
          font-family: var(--font-family-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--accent-cyan);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-content {
            align-items: center;
          }
          .hero-title {
            font-size: 2.4rem;
          }
          .stat-badge-left, .stat-badge-right {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            bottom: auto;
            margin-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
};
