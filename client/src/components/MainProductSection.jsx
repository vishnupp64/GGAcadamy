import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const MainProductSection = () => {
  const checklist = [
    'Auto Headlock Techniques',
    'Mobile Optimisation',
    'Enhanced Game Sensitivity',
    'Best HUD Configurations',
  ];

  return (
    <section className="main-prod-section">
      <div className="container main-prod-container">
        {/* Left Column */}
        <div className="content-col">
          <span className="badge">PRO TRAINING SUITE</span>
          <h2 className="title">
            REVOLUTIONIZE YOUR <span className="text-gradient-purple">HEADSHOT & MOVEMENT</span> SPEED
          </h2>
          <p className="description">
            Stop losing 1v1 gunfights due to erratic crosshair movement. Our pro sensitivity algorithms and custom HUD configurations give you instant recoil control and tournament-ready reflexes.
          </p>

          <ul className="checklist">
            {checklist.map((item, idx) => (
              <li key={idx} className="check-item">
                <CheckCircle2 size={20} color="#00f0ff" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link to="/shop" className="btn btn-primary cta-btn">
            Shop Now <ArrowRight size={18} />
          </Link>
        </div>

        {/* Right Column: Gaming Image */}
        <div className="image-col">
          <div className="img-wrapper glass-card">
            <img
              src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80"
              alt="Free Fire Headshots & Gloo Wall Tactics"
              className="main-img"
            />
            <div className="image-overlay-card">
              <span className="overlay-badge">FREE FIRE VIP PACK</span>
              <p className="overlay-title">Tested on 500+ Mobile Devices</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .main-prod-section {
          padding: 5rem 0;
          background: var(--bg-secondary);
        }

        .main-prod-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .content-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .badge {
          color: var(--accent-cyan);
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 1px;
        }

        .title {
          font-size: 2.5rem;
          line-height: 1.2;
        }

        .description {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .checklist {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 0.5rem 0;
        }

        .check-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .cta-btn {
          width: fit-content;
        }

        .image-col {
          position: relative;
        }

        .img-wrapper {
          padding: 0.75rem;
          position: relative;
        }

        .main-img {
          border-radius: 12px;
          width: 100%;
          max-height: 440px;
          object-fit: cover;
        }

        .image-overlay-card {
          position: absolute;
          bottom: 25px;
          left: 25px;
          background: rgba(18, 21, 30, 0.9);
          border: 1px solid var(--border-glow);
          padding: 1rem 1.2rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .overlay-badge {
          color: var(--accent-gold);
          font-size: 0.75rem;
          font-weight: 800;
        }

        .overlay-title {
          font-weight: 700;
          font-size: 0.95rem;
          margin-top: 0.2rem;
        }

        @media (max-width: 992px) {
          .main-prod-container {
            grid-template-columns: 1fr;
          }
          .checklist {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
