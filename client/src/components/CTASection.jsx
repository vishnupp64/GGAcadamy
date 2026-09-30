import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="final-cta-section">
      <div className="container">
        <div className="cta-box glass-card glow-purple">
          <div className="cta-content">
            <h2 className="cta-title">HAVE MORE QUESTIONS?</h2>
            <p className="cta-desc">Our expert gaming coaches and support team are available 24/7 to help you choose the right preset or course.</p>
          </div>
          <Link to="/contact" className="btn btn-primary cta-btn">
            <MessageSquare size={18} /> GET IN TOUCH <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style>{`
        .final-cta-section {
          padding: 4rem 0 6rem 0;
          background: var(--bg-primary);
        }

        .cta-box {
          padding: 3.5rem 3rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          background: linear-gradient(135deg, rgba(112, 0, 255, 0.15) 0%, rgba(18, 21, 30, 0.9) 100%);
        }

        .cta-content {
          max-width: 600px;
        }

        .cta-title {
          font-size: 2.3rem;
          margin-bottom: 0.5rem;
        }

        .cta-desc {
          color: var(--text-secondary);
          font-size: 1.05rem;
          margin: 0;
        }

        .cta-btn {
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
};
