import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PriceDisplay } from '../components/PriceDisplay';
import { EmptyState } from '../components/EmptyState';

export const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, totalCount, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem' }}>
        <EmptyState
          title="Your Cart is Empty"
          message="Browse our pro sensitivity packs and mastery courses to level up your gameplay."
        />
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/shop" className="btn btn-primary">
            Explore Store <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="section-header text-center">
        <h1 className="section-title">YOUR <span className="text-gradient-purple">SHOPPING CART</span></h1>
        <p className="section-sub">{totalCount} item(s) selected for checkout</p>
      </div>

      <div className="cart-grid">
        {/* Left Column: Cart Items List */}
        <div className="items-col">
          <div className="cart-list glass-card">
            {cartItems.map((item) => {
              const prod = item.product;
              const imgUrl =
                prod.images?.[0]?.url ||
                'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';
              const price = prod.discountPrice || prod.price;

              return (
                <div key={prod.id} className="cart-item-row">
                  <img src={imgUrl} alt={prod.name} className="item-img" />

                  <div className="item-info">
                    <Link to={`/products/${prod.slug}`} className="item-title">
                      {prod.name}
                    </Link>
                    <span className="item-compat">{prod.compatibility || 'All Mobile Devices'}</span>
                    <div className="item-price">
                      <PriceDisplay price={prod.price} discountPrice={prod.discountPrice} size="normal" />
                    </div>
                  </div>

                  <div className="qty-picker">
                    <button
                      onClick={() => updateQuantity(prod.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(prod.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    ₹{(price * item.quantity).toLocaleString()}
                  </div>

                  <button
                    onClick={() => removeFromCart(prod.id)}
                    className="remove-btn"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>

          <button onClick={clearCart} className="clear-cart-link">
            Clear Entire Cart
          </button>
        </div>

        {/* Right Column: Order Summary */}
        <div className="summary-col">
          <div className="summary-card glass-card">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal ({totalCount} items)</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Instant Digital Delivery</span>
              <span style={{ color: 'var(--accent-cyan)' }}>FREE</span>
            </div>

            <hr className="summary-hr" />

            <div className="summary-row total-row">
              <span>Total Amount</span>
              <span className="total-val">₹{subtotal.toLocaleString()}</span>
            </div>

            <button onClick={() => navigate('/checkout')} className="btn btn-primary checkout-btn">
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div className="secure-notice">
              <ShieldCheck size={18} color="#00f0ff" />
              <span>Instant Download Access After Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cart-page {
          padding-top: 3rem;
          padding-bottom: 5rem;
        }

        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2.5rem;
          margin-top: 2.5rem;
        }

        .cart-list {
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .cart-item-row {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding: 1.2rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .cart-item-row:last-child {
          border-bottom: none;
        }

        .item-img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          object-fit: cover;
        }

        .item-info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex: 1;
        }

        .item-title {
          font-weight: 700;
          font-size: 1.05rem;
          color: #fff;
        }

        .item-compat {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .qty-picker {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 6px;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          color: #fff;
          font-weight: 700;
        }

        .qty-num {
          padding: 0 0.6rem;
          font-weight: 800;
          font-size: 0.9rem;
        }

        .item-total {
          font-family: var(--font-family-heading);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-primary);
          min-width: 80px;
          text-align: right;
        }

        .remove-btn {
          color: var(--text-muted);
          padding: 0.4rem;
          transition: color 0.2s ease;
        }

        .remove-btn:hover {
          color: var(--accent-red);
        }

        .clear-cart-link {
          margin-top: 1rem;
          color: var(--text-muted);
          font-size: 0.85rem;
          text-decoration: underline;
        }

        .summary-card {
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          position: sticky;
          top: 100px;
        }

        .summary-title {
          font-size: 1.2rem;
          margin: 0;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .total-row {
          color: #fff;
          font-weight: 800;
          font-size: 1.15rem;
        }

        .total-val {
          color: var(--accent-cyan);
          font-family: var(--font-family-heading);
          font-size: 1.4rem;
        }

        .summary-hr {
          border: none;
          border-top: 1px solid var(--border-color);
        }

        .checkout-btn {
          width: 100%;
          justify-content: center;
          padding: 0.85rem;
        }

        .secure-notice {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          justify-content: center;
        }

        @media (max-width: 992px) {
          .cart-grid {
            grid-template-columns: 1fr;
          }
          .cart-item-row {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};
