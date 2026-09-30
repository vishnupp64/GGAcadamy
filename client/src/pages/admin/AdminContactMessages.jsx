import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContactMessages();
      if (res.data?.messages) setMessages(res.data.messages);
    } catch (err) {
      console.error('Error fetching contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await adminService.markMessageAsRead(id);
      fetchMessages();
    } catch (err) {
      alert(err.message || 'Error marking message as read');
    }
  };

  if (loading) return <LoadingSpinner text="Loading Contact Messages..." />;

  return (
    <div className="admin-messages-page">
      <h3 style={{ marginBottom: '1.5rem' }}>Incoming Contact Inquiries ({messages.length})</h3>

      <div className="glass-card table-card" style={{ padding: '1.5rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Contact Details</th>
              <th>Subject</th>
              <th>Message Body</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id} style={{ background: m.isRead ? 'transparent' : 'rgba(0, 240, 255, 0.03)' }}>
                <td className="font-bold">{m.firstName} {m.lastName}</td>
                <td>
                  <div>{m.email}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.phone || 'No phone'}</div>
                </td>
                <td className="font-bold" style={{ color: 'var(--accent-cyan)' }}>{m.subject}</td>
                <td style={{ maxWidth: '350px' }}>{m.message}</td>
                <td>
                  {m.isRead ? (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Read</span>
                  ) : (
                    <span style={{ color: 'var(--accent-red)', fontWeight: '800', fontSize: '0.8rem' }}>UNREAD</span>
                  )}
                </td>
                <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                <td>
                  {!m.isRead && (
                    <button onClick={() => handleMarkRead(m.id)} className="mark-btn">
                      Mark Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .mark-btn { background: rgba(0,240,255,0.15); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; }
      `}</style>
    </div>
  );
};
