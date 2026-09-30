import React from 'react';

export const ShippingPolicy = () => {
  return (
    <div className="policy-page container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 className="policy-title">SHIPPING & DIGITAL DELIVERY POLICY</h1>
      <p className="effective-date">Effective Date: January 1, 2026</p>

      <div className="policy-content glass-card" style={{ padding: '2rem', marginTop: '1.5rem' }}>
        <h3>1. Instant Digital Delivery</h3>
        <p>GG Academy products consist of digital sensitivity presets, HUD configuration codes, and streaming video courses. No physical goods are shipped.</p>

        <h3>2. Access Timeframe</h3>
        <p>Access is activated immediately upon successful checkout verification. Download links and video player modules remain accessible in your account dashboard 24/7.</p>
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
