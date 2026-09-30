import React from 'react';

export const PrivacyPolicy = () => {
  return (
    <div className="policy-page container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 className="policy-title">PRIVACY POLICY</h1>
      <p className="effective-date">Effective Date: January 1, 2026</p>

      <div className="policy-content glass-card" style={{ padding: '2rem', marginTop: '1.5rem' }}>
        <h3>1. Information We Collect</h3>
        <p>At GG Academy, we collect your name, email address, phone number, and transaction history to provide instant digital delivery of sensitivity configurations and video course materials.</p>

        <h3>2. How We Use Information</h3>
        <p>We use your data solely to manage user accounts, deliver digital digital downloads, process secure payments, and send product update notifications.</p>

        <h3>3. Data Protection</h3>
        <p>We do not store plain-text passwords or financial credit card details. All data is stored in encrypted PostgreSQL databases and protected via standard industry authentication tokens.</p>
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
