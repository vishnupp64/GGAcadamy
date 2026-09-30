import React from 'react';

export const PriceDisplay = ({ price, discountPrice, size = 'normal' }) => {
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const hasDiscount = discountPrice && discountPrice < price;
  const discountPercent = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;

  return (
    <div className={`price-display price-${size}`}>
      {hasDiscount ? (
        <>
          <span className="price-current">{formatINR(discountPrice)}</span>
          <span className="price-original">{formatINR(price)}</span>
          <span className="price-badge">-{discountPercent}%</span>
        </>
      ) : (
        <span className="price-current">{formatINR(price)}</span>
      )}

      <style>{`
        .price-display {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .price-current {
          font-family: var(--font-family-heading);
          font-weight: 800;
          color: var(--text-primary);
        }

        .price-normal .price-current {
          font-size: 1.2rem;
        }

        .price-large .price-current {
          font-size: 1.8rem;
          color: var(--accent-cyan);
        }

        .price-original {
          text-decoration: line-through;
          color: var(--text-muted);
          font-size: 0.9em;
        }

        .price-badge {
          background: rgba(255, 0, 85, 0.2);
          color: var(--accent-red);
          border: 1px solid var(--accent-red);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
        }
      `}</style>
    </div>
  );
};
