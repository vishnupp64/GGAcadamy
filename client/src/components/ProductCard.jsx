import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { PriceDisplay } from './PriceDisplay';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images.find((img) => img.isPrimary)?.url || product.images[0].url
      : 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card glass-card">
      <Link to={`/products/${product.slug}`} className="img-link">
        <img src={primaryImage} alt={product.name} className="product-img" />
        {product.category && <span className="cat-chip">{product.category.name}</span>}
      </Link>

      <div className="card-content">
        <div className="rating-row">
          <div className="stars">
            <Star size={14} fill="#ffb800" color="#ffb800" />
            <span className="rating-val">{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
          </div>
          {product.compatibility && <span className="compat-chip">{product.compatibility}</span>}
        </div>

        <Link to={`/products/${product.slug}`} className="title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>

        {product.shortDescription && (
          <p className="product-short-desc">{product.shortDescription}</p>
        )}

        <div className="card-footer">
          <PriceDisplay price={product.price} discountPrice={product.discountPrice} size="normal" />

          <button onClick={handleAddToCart} className="add-cart-btn" aria-label="Add to cart">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-6px);
          border-color: var(--accent-primary);
        }

        .img-link {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #12151e;
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover .product-img {
          transform: scale(1.06);
        }

        .cat-chip {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(10, 12, 16, 0.85);
          border: 1px solid var(--border-color);
          color: var(--accent-cyan);
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          backdrop-filter: blur(6px);
        }

        .card-content {
          padding: 1.3rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .rating-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stars {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .compat-chip {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .title-link {
          color: var(--text-primary);
        }

        .product-title {
          font-size: 1.1rem;
          line-height: 1.3;
          margin: 0;
          transition: color 0.2s ease;
        }

        .product-title:hover {
          color: var(--accent-cyan);
        }

        .product-short-desc {
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-color);
        }

        .add-cart-btn {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: var(--accent-primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .add-cart-btn:hover {
          background: var(--accent-primary-hover);
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(112, 0, 255, 0.5);
        }
      `}</style>
    </div>
  );
};
