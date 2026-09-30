import React from 'react';
import { Check, X, ShieldAlert } from 'lucide-react';

export const ComparisonTable = () => {
  const rows = [
    { feature: 'Auto Aim Techniques', gg: true, others: false, detail: '99% Headshot Lock Formula' },
    { feature: 'Elevator Gloo Tutorial', gg: true, others: false, detail: '0.1s Fast Cover Placement' },
    { feature: 'Optimized Mobile FPS', gg: true, others: false, detail: 'Device-specific DPI Engine' },
    { feature: 'Advanced Drag Methods', gg: true, others: false, detail: 'Rotation & J-Drag Drills' },
    { feature: 'Best HUD Configurations', gg: true, others: false, detail: 'Claw layout custom codes' },
  ];

  return (
    <section className="comparison-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">THE DIFFERENCE: <span className="text-gradient-purple">GG ACADEMY vs OTHERS</span></h2>
          <p className="section-sub">Why 30,000+ gamers trust GG Academy over generic random tips</p>
        </div>

        <div className="table-wrapper glass-card">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-col">Feature / Capability</th>
                <th className="brand-col gg-col">
                  <span className="brand-badge">GG ACADEMY</span>
                </th>
                <th className="brand-col others-col">Other Creators</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="feature-cell">
                    <span className="feature-name">{row.feature}</span>
                    <span className="feature-detail">{row.detail}</span>
                  </td>
                  <td className="status-cell gg-cell">
                    <div className="status-badge gg-pass">
                      <Check size={18} color="#00f0ff" />
                      <span>PRO INCLUDED</span>
                    </div>
                  </td>
                  <td className="status-cell others-cell">
                    <div className="status-badge others-fail">
                      <X size={18} color="#ff0055" />
                      <span>UNAVAILABLE</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .comparison-section {
          padding: 5rem 0;
          background: var(--bg-primary);
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: var(--card-radius);
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .comparison-table th {
          padding: 1.5rem;
          background: rgba(18, 21, 30, 0.9);
          border-bottom: 1px solid var(--border-color);
        }

        .brand-badge {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-cyan));
          color: #fff;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-family: var(--font-family-heading);
          font-size: 1.1rem;
          font-weight: 800;
        }

        .others-col {
          color: var(--text-muted);
          font-family: var(--font-family-heading);
          font-size: 1.1rem;
        }

        .comparison-table td {
          padding: 1.2rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .feature-cell {
          display: flex;
          flex-direction: column;
        }

        .feature-name {
          font-weight: 700;
          font-size: 1rem;
        }

        .feature-detail {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .status-cell {
          text-align: center;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 800;
        }

        .gg-pass {
          background: rgba(0, 240, 255, 0.1);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 240, 255, 0.3);
        }

        .others-fail {
          background: rgba(255, 0, 85, 0.1);
          color: var(--accent-red);
          border: 1px solid rgba(255, 0, 85, 0.3);
        }

        .gg-cell {
          background: rgba(112, 0, 255, 0.05);
        }
      `}</style>
    </section>
  );
};
