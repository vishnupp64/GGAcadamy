import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderService.getAllOrders();
      if (res.data?.orders) setOrders(res.data.orders);
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { orderStatus: newStatus });
      fetchOrders();
    } catch (err) {
      alert(err.message || 'Failed updating order status');
    }
  };

  if (loading) return <LoadingSpinner text="Fetching Order History..." />;

  return (
    <div className="admin-orders-page">
      <h3 style={{ marginBottom: '1.5rem' }}>All Platform Orders ({orders.length})</h3>

      <div className="glass-card table-card" style={{ padding: '1.5rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const customerName = order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest Customer';
              return (
                <tr key={order.id}>
                  <td className="font-bold">{order.orderNumber}</td>
                  <td>
                    <div>{customerName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.user?.email}</div>
                  </td>
                  <td>₹{order.amount.toLocaleString()}</td>
                  <td>
                    <span className="status-pill pill-paid">{order.paymentStatus}</span>
                  </td>
                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        .status-pill { padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 800; background: rgba(0, 240, 255, 0.15); color: var(--accent-cyan); }
        .status-select { background: #181c28; border: 1px solid var(--border-color); color: #fff; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.85rem; }
      `}</style>
    </div>
  );
};
