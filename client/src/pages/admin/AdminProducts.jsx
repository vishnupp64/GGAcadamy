import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { productService } from '../../services/productService';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discountPrice: '',
    categoryId: '',
    compatibility: 'Android & iOS',
    shortDescription: '',
    description: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        productService.getProducts({ limit: 100 }),
        productService.getCategories(),
      ]);
      if (prodRes.data?.products) setProducts(prodRes.data.products);
      if (catRes.data?.categories) setCategories(catRes.data.categories);
    } catch (err) {
      console.error('Error loading admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      price: '',
      discountPrice: '',
      categoryId: categories[0]?.id || '',
      compatibility: 'Android & iOS',
      shortDescription: '',
      description: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingId(prod.id);
    setFormData({
      name: prod.name,
      price: prod.price,
      discountPrice: prod.discountPrice || '',
      categoryId: prod.categoryId,
      compatibility: prod.compatibility || 'Android & iOS',
      shortDescription: prod.shortDescription || '',
      description: prod.description || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.deleteProduct(id);
      fetchData();
    } catch (err) {
      alert(err.message || 'Error deleting product');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await productService.updateProduct(editingId, formData);
      } else {
        await productService.createProduct(formData);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed saving product');
    }
  };

  if (loading) return <LoadingSpinner text="Loading Product Records..." />;

  return (
    <div className="admin-products-page">
      <div className="page-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h3>Product Catalog ({products.length})</h3>
        <button onClick={handleOpenCreate} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="glass-card table-card" style={{ padding: '1.5rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount Price</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td className="font-bold">{prod.name}</td>
                <td>{prod.category?.name || 'General'}</td>
                <td>₹{prod.price}</td>
                <td>{prod.discountPrice ? `₹${prod.discountPrice}` : '-'}</td>
                <td>
                  {prod.isPublished ? (
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: '800' }}>Active</span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>Draft</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenEdit(prod)} className="icon-btn-sm">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(prod.id)} className="icon-btn-sm danger">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card glass-card" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? 'Edit Product' : 'Create New Product'}</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="input-group">
                <label>Product Name *</label>
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
                  <label>Original Price (₹) *</label>
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

              <div className="input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Compatibility</label>
                  <input
                    type="text"
                    value={formData.compatibility}
                    onChange={(e) => setFormData({ ...formData, compatibility: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label>Full Description</label>
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
                  {editingId ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .icon-btn-sm {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.35rem;
          border-radius: 6px;
        }
        .icon-btn-sm.danger { color: var(--accent-red); }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-card {
          width: 90%;
          max-width: 550px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.3rem;
          display: block;
        }

        .input-field {
          width: 100%;
          background: #181c28;
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};
