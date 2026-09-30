import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { contentService } from '../../services/contentService';
import { adminService } from '../../services/adminService';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    comment: '',
    avatar: '',
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await contentService.getTestimonials();
      if (res.data?.testimonials) setTestimonials(res.data.testimonials);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await adminService.createTestimonial(formData);
      setShowModal(false);
      setFormData({ name: '', location: '', rating: 5, comment: '', avatar: '' });
      fetchTestimonials();
    } catch (err) {
      alert(err.message || 'Error creating testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await adminService.deleteTestimonial(id);
      fetchTestimonials();
    } catch (err) {
      alert(err.message || 'Error deleting review');
    }
  };

  if (loading) return <LoadingSpinner text="Fetching Testimonials..." />;

  return (
    <div className="admin-testimonials-page">
      <div className="page-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h3>Customer Testimonials ({testimonials.length})</h3>
        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      <div className="glass-card table-card" style={{ padding: '1.5rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td className="font-bold">{t.name}</td>
                <td>{t.location || '-'}</td>
                <td>⭐ {t.rating}/5</td>
                <td style={{ maxWidth: '350px' }}>{t.comment}</td>
                <td>
                  <button onClick={() => handleDelete(t.id)} className="icon-btn-sm danger">
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
            <h3>Add Customer Testimonial</h3>
            <form onSubmit={handleCreate} className="modal-form">
              <div className="input-group">
                <label>Customer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Delhi"
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label>Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Testimonial Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Testimonial</button>
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
