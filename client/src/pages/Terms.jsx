import React from 'react';

export const Terms = () => {
  return (
    <div className="policy-page container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 className="policy-title">TERMS & CONDITIONS</h1>
      <p className="effective-date">Effective Date: January 1, 2026</p>

      <div className="policy-content glass-card" style={{ padding: '2rem', marginTop: '1.5rem' }}>
        <h3>1. Acceptance of Terms</h3>
        <p>By creating an account or purchasing any products on GG Academy, you agree to comply with our platform terms and community guidelines.</p>

        <h3>2. License & Fair Use</h3>
        <p>Purchased sensitivity configurations and video course materials are licensed solely for your personal non-commercial account use. Redistribution or reselling of GG Academy assets is strictly prohibited.</p>
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
