import React from 'react';
import { ProductCard } from './ProductCard';
import { EmptyState } from './EmptyState';
import { LoadingSpinner } from './LoadingSpinner';

export const ProductGrid = ({ products, loading, emptyMessage = 'No products found' }) => {
  if (loading) {
    return <LoadingSpinner text="Loading Products..." />;
  }

  if (!products || products.length === 0) {
    return <EmptyState title={emptyMessage} message="Try clearing search filters or check back soon." />;
  }

  return (
    <div className="product-grid">
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}

      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.8rem;
        }
      `}</style>
    </div>
  );
};
