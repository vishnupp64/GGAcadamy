import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, ShoppingBag, BookOpen, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const AccountPage = () => {
  const { user, updateProfile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Edit profile state
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getUserOrders();
        if (res.data?.orders) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error('Failed loading orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ firstName, lastName, phone });
      setSaveMsg('Profile details updated successfully!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (err) {
      setSaveMsg(err.message || 'Error updating profile');
    }
  };

  return (
    <div className="account-page container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div className="section-header">
        <h1 className="section-title">MY <span className="text-gradient-purple">ACCOUNT</span></h1>
        <p className="section-sub">Manage your personal profile and view purchase history</p>
      </div>

      <div className="account-grid">
        {/* Profile Details Card */}
        <div className="glass-card profile-card">
          <h3 className="card-heading">Personal Details</h3>

          {saveMsg && <div className="save-toast">{saveMsg}</div>}

          <form onSubmit={handleProfileSave} className="profile-form">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input type="email" value={user?.email || ''} disabled className="input-field disabled" />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Order History */}
        <div className="orders-col">
          <h3 className="card-heading" style={{ marginBottom: '1rem' }}>Order History</h3>

          {loadingOrders ? (
            <LoadingSpinner text="Loading Purchase History..." />
          ) : orders.length === 0 ? (
            <div className="glass-card text-center" style={{ padding: '2.5rem 1.5rem', color: 'var(--text-secondary)' }}>
              No orders placed yet.
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="glass-card order-item-card">
                  <div className="order-header">
                    <div>
                      <span className="order-num">{order.orderNumber}</span>
                      <span className="order-date">
                        <Clock size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="order-status-badge">{order.paymentStatus}</span>
                  </div>

                  <div className="order-items-preview">
                    {order.items?.map((item) => (
                      <div key={item.id} className="item-line">
                        <span>{item.product?.name} (x{item.quantity})</span>
                        <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <span>Total Amount</span>
                    <span className="total-amount">₹{order.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .account-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 2.5rem;
          margin-top: 2rem;
        }

        .profile-card {
          padding: 2rem;
          height: fit-content;
        }

        .card-heading {
          font-size: 1.3rem;
          margin-bottom: 1.2rem;
        }

        .save-toast {
          background: rgba(0, 240, 255, 0.15);
          border: 1px solid var(--accent-cyan);
          color: var(--accent-cyan);
          padding: 0.6rem 1rem;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-group label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .input-field {
          background: #181c28;
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.65rem 0.8rem;
          border-radius: 8px;
          font-size: 0.92rem;
        }

        .input-field.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .order-item-card {
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .order-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .order-num {
          font-weight: 800;
          font-size: 1rem;
          color: var(--text-primary);
          margin-right: 0.8rem;
        }

        .order-date {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .order-status-badge {
          background: rgba(0, 240, 255, 0.2);
          color: var(--accent-cyan);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .order-items-preview {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 0.6rem 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .item-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .order-footer {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
        }

        .total-amount {
          color: var(--accent-cyan);
          font-family: var(--font-family-heading);
          font-size: 1.15rem;
        }

        @media (max-width: 992px) {
          .account-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
