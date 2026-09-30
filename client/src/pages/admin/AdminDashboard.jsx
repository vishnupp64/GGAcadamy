import React, { useState, useEffect } from 'react';
import { Users, Package, ShoppingCart, DollarSign, BookOpen, Award, Mail, ArrowUpRight } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res.data) {
          setStats(res.data.stats);
          setRecentOrders(res.data.recentOrders || []);
        }
      } catch (err) {
        console.error('Error fetching admin dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Fetching Realtime Admin Analytics..." />;
  }

  const statCards = [
    { label: 'Total Revenue', value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: <DollarSign size={24} color="#00f0ff" />, color: 'var(--accent-cyan)' },
    { label: 'Total Orders', value: stats?.totalOrders || 0, icon: <ShoppingCart size={24} color="#7000ff" />, color: 'var(--accent-primary)' },
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: <Users size={24} color="#ffb800" />, color: 'var(--accent-gold)' },
    { label: 'Total Products', value: stats?.totalProducts || 0, icon: <Package size={24} color="#ff0055" />, color: 'var(--accent-red)' },
    { label: 'Total Courses', value: stats?.totalCourses || 0, icon: <BookOpen size={24} color="#00f0ff" />, color: 'var(--accent-cyan)' },
    { label: 'Enrollments', value: stats?.totalEnrollments || 0, icon: <Award size={24} color="#7000ff" />, color: 'var(--accent-primary)' },
    { label: 'Unread Messages', value: stats?.unreadMessages || 0, icon: <Mail size={24} color="#ff0055" />, color: 'var(--accent-red)' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Metric Cards Grid */}
      <div className="stats-cards-grid">
        {statCards.map((card, idx) => (
          <div key={idx} className="glass-card metric-card">
            <div className="metric-header">
              <span className="metric-label">{card.label}</span>
              <div className="metric-icon">{card.icon}</div>
            </div>
            <div className="metric-value" style={{ color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="glass-card table-section" style={{ marginTop: '2.5rem', padding: '1.5rem' }}>
        <h3 className="section-heading">Recent Platform Orders</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer Email</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No recent orders available.
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-bold">{order.orderNumber}</td>
                  <td>{order.user?.email || 'Guest'}</td>
                  <td>₹{order.amount.toLocaleString()}</td>
                  <td>
                    <span className={`status-pill ${order.paymentStatus === 'PAID' ? 'pill-paid' : 'pill-pending'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>{order.orderStatus}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .stats-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .metric-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .metric-label {
          font-size: 0.88rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .metric-value {
          font-family: var(--font-family-heading);
          font-size: 2rem;
          font-weight: 800;
        }

        .section-heading {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }

        .admin-table th {
          padding: 0.8rem 1rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-weight: 700;
        }

        .admin-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .font-bold {
          font-weight: 700;
        }

        .status-pill {
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .pill-paid {
          background: rgba(0, 240, 255, 0.15);
          color: var(--accent-cyan);
        }

        .pill-pending {
          background: rgba(255, 184, 0, 0.15);
          color: var(--accent-gold);
        }
      `}</style>
    </div>
  );
};
