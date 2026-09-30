import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Video } from 'lucide-react';
import { courseService } from '../../services/courseService';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    discountPrice: '',
    shortDescription: '',
    description: '',
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await courseService.getCourses();
      if (res.data?.courses) setCourses(res.data.courses);
    } catch (err) {
      console.error('Error loading admin courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await courseService.createCourse(formData);
      setShowModal(false);
      setFormData({ title: '', price: '', discountPrice: '', shortDescription: '', description: '' });
      fetchCourses();
    } catch (err) {
      alert(err.message || 'Error creating course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await courseService.deleteCourse(id);
      fetchCourses();
    } catch (err) {
      alert(err.message || 'Error deleting course');
    }
  };

  if (loading) return <LoadingSpinner text="Loading Courses Management..." />;

  return (
    <div className="admin-courses-page">
      <div className="page-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h3>Mastery Video Courses ({courses.length})</h3>
        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
          <Plus size={18} /> Create New Course
        </button>
      </div>

      <div className="glass-card table-card" style={{ padding: '1.5rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Price</th>
              <th>Modules Count</th>
              <th>Enrolled Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="font-bold">{course.title}</td>
                <td>₹{course.discountPrice || course.price}</td>
                <td>{course.modules?.length || 0} Modules</td>
                <td>{course._count?.enrollments || 0} Students</td>
                <td>
                  <button onClick={() => handleDeleteCourse(course.id)} className="icon-btn-sm danger">
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
            <h3>Create New Course</h3>
            <form onSubmit={handleCreateCourse} className="modal-form">
              <div className="input-group">
                <label>Course Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label>Discount Price (₹)</label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Course
                </button>
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
