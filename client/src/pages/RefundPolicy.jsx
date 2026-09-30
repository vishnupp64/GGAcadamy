import React from 'react';

export const RefundPolicy = () => {
  return (
    <div className="policy-page container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 className="policy-title">REFUND POLICY</h1>
      <p className="effective-date">Effective Date: January 1, 2026</p>

      <div className="policy-content glass-card" style={{ padding: '2rem', marginTop: '1.5rem' }}>
        <h3>1. Digital Products</h3>
        <p>Because GG Academy sensitivity presets, HUD files, and training videos are digital products with immediate download access, all completed purchases are non-refundable once unlocked.</p>

        <h3>2. Technical Assistance</h3>
        <p>If you experience any difficulties setting up your HUD or applying sensitivity codes, our 24/7 support desk will guide you through device calibration step-by-step.</p>
      </div>

      <style>{`
        .policy-title { font-size: 2.2rem; margin-bottom: 0.5rem; }
        .effective-date { color: var(--text-muted); font-size: 0.9rem; }
        .policy-content h3 { font-size: 1.1rem; color: var(--accent-cyan); margin-top: 1.2rem; margin-bottom: 0.4rem; }
        .policy-content p { color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem; }
      `}</style>
    </div>
  );
};
