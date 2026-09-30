import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Zap, Star, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { productService } from '../services/productService';
import { PriceDisplay } from '../components/PriceDisplay';
import { ProductGrid } from '../components/ProductGrid';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await productService.getProductBySlug(slug);
        if (res.data?.product) {
          setProduct(res.data.product);
          setRelatedProducts(res.data.relatedProducts || []);

          const primaryUrl =
            res.data.product.images?.find((i) => i.isPrimary)?.url ||
            res.data.product.images?.[0]?.url ||
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';
          setSelectedImg(primaryUrl);
        }
      } catch (err) {
        console.error('Failed fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return <LoadingSpinner text="Loading Product Specs..." />;
  }

  if (!product) {
    return (
      <div className="container text-center" style={{ padding: '5rem 0' }}>
        <h2>Product Not Found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Store
        </Link>
      </div>
    );
  }

  let parsedFeatures = [];
  try {
    parsedFeatures = product.features ? JSON.parse(product.features) : [];
  } catch (e) {
    parsedFeatures = product.features ? [product.features] : [];
  }

  return (
    <div className="product-details-page container">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={18} /> Back to Store
      </Link>

      {addedToast && (
        <div className="toast-notification">
          <CheckCircle2 size={20} color="#00f0ff" />
          <span>Added <strong>{product.name}</strong> to your cart!</span>
        </div>
      )}

      <div className="details-grid">
        {/* Left Column: Gallery */}
        <div className="gallery-col">
          <div className="main-img-card glass-card">
            <img src={selectedImg} alt={product.name} className="gallery-main-img" />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="thumbnail-list">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImg(img.url)}
                  className={`thumb-btn ${selectedImg === img.url ? 'active' : ''}`}
                >
                  <img src={img.url} alt="Thumbnail" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Actions */}
        <div className="info-col">
          {product.category && <span className="category-chip">{product.category.name}</span>}

          <h1 className="product-name">{product.name}</h1>

          <div className="rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating || 5) ? '#ffb800' : 'none'}
                  color={i < Math.floor(product.rating || 5) ? '#ffb800' : '#4b5563'}
                />
              ))}
              <span className="rating-num">{product.rating ? product.rating.toFixed(1) : '5.0'} / 5.0</span>
            </div>
            <span className="compat-badge">
              <ShieldCheck size={16} color="#00f0ff" /> {product.compatibility || 'All Devices Supported'}
            </span>
          </div>

          <div className="price-box">
            <PriceDisplay price={product.price} discountPrice={product.discountPrice} size="large" />
          </div>

          <p className="description">{product.description}</p>

          {/* Features Checklist */}
          {parsedFeatures.length > 0 && (
            <div className="features-block">
              <h3 className="block-title">Key Highlights</h3>
              <ul className="features-list">
                {parsedFeatures.map((feat, idx) => (
                  <li key={idx} className="feat-item">
                    <CheckCircle2 size={18} color="#00f0ff" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions: Quantity + Add / Buy */}
          <div className="action-row">
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-btn">-</button>
              <span className="qty-val">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="qty-btn">+</button>
            </div>

            <button onClick={handleAddToCart} className="btn btn-secondary add-btn">
              <ShoppingCart size={18} /> Add To Cart
            </button>

            <button onClick={handleBuyNow} className="btn btn-primary buy-btn">
              <Zap size={18} /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h2 className="section-title">RELATED <span className="text-gradient-purple">CONFIGURATIONS</span></h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}

      <style>{`
        .product-details-page {
          padding-top: 2rem;
          padding-bottom: 5rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-weight: 600;
          margin-bottom: 2rem;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: var(--accent-cyan);
        }

        .toast-notification {
          position: fixed;
          bottom: 25px;
          right: 25px;
          background: rgba(18, 21, 30, 0.95);
          border: 1px solid var(--accent-cyan);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
          z-index: 1000;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3.5rem;
        }

        .gallery-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .main-img-card {
          padding: 0.75rem;
          border-radius: 16px;
        }

        .gallery-main-img {
          width: 100%;
          max-height: 460px;
          object-fit: cover;
          border-radius: 12px;
        }

        .thumbnail-list {
          display: flex;
          gap: 0.8rem;
        }

        .thumb-btn {
          width: 70px;
          height: 70px;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid var(--border-color);
          background: #181c28;
          padding: 0;
        }

        .thumb-btn.active {
          border-color: var(--accent-cyan);
        }

        .thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .info-col {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .category-chip {
          color: var(--accent-cyan);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .product-name {
          font-size: 2.2rem;
          line-height: 1.2;
          margin: 0;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .stars {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .rating-num {
          font-weight: 700;
          font-size: 0.9rem;
          margin-left: 0.3rem;
        }

        .compat-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .price-box {
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .description {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1.05rem;

        }

        .features-block {
          background: var(--bg-card);
          padding: 1.2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        .block-title {
          font-size: 1rem;
          margin-bottom: 0.8rem;
          color: var(--text-primary);
        }

        .features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .feat-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.92rem;
          font-weight: 600;
        }

        .action-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
        }

        .qty-btn {
          width: 38px;
          height: 42px;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .qty-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .qty-val {
          padding: 0 1rem;
          font-weight: 800;
          font-size: 1rem;
        }

        .add-btn, .buy-btn {
          padding: 0.75rem 1.4rem;
        }

        .related-section {
          margin-top: 5rem;
        }

        @media (max-width: 992px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
