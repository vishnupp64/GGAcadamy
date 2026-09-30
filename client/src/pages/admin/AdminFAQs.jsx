import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { contentService } from '../../services/contentService';
import { adminService } from '../../services/adminService';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 1,
  });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await contentService.getFAQs();
      if (res.data?.faqs) setFaqs(res.data.faqs);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await adminService.createFAQ(formData);
      setShowModal(false);
      setFormData({ question: '', answer: '', order: 1 });
      fetchFaqs();
    } catch (err) {
      alert(err.message || 'Error creating FAQ');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return;
    try {
      await adminService.deleteFAQ(id);
      fetchFaqs();
    } catch (err) {
      alert(err.message || 'Error deleting FAQ');
    }
  };

  if (loading) return <LoadingSpinner text="Fetching FAQ List..." />;

  return (
    <div className="admin-faqs-page">
      <div className="page-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h3>FAQ Accordion Manager ({faqs.length})</h3>
        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
          <Plus size={18} /> Add New FAQ
        </button>
      </div>

      <div className="glass-card table-card" style={{ padding: '1.5rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((f) => (
              <tr key={f.id}>
                <td>#{f.order}</td>
                <td className="font-bold">{f.question}</td>
                <td style={{ maxWidth: '400px' }}>{f.answer}</td>
                <td>
                  <button onClick={() => handleDelete(f.id)} className="icon-btn-sm danger">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card glass-card" onClick={(e) => e.stopPropagation()}>
            <h3>Add FAQ Entry</h3>
            <form onSubmit={handleCreate} className="modal-form">
              <div className="input-group">
                <label>Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label>Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .icon-btn-sm { background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: #fff; padding: 0.35rem; border-radius: 6px; }
        .icon-btn-sm.danger { color: var(--accent-red); }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-card { width: 90%; max-width: 500px; padding: 2rem; display: flex; flex-direction: column; gap: 1.2rem; }
        .modal-form { display: flex; flex-direction: column; gap: 1rem; }
        .input-group label { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.3rem; display: block; }
        .input-field { width: 100%; background: #181c28; border: 1px solid var(--border-color); color: #fff; padding: 0.6rem 0.8rem; border-radius: 8px; }
      `}</style>
    </div>
  );
};
