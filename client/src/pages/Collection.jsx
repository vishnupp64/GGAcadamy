import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sliders, Layout, ShieldCheck, Zap } from 'lucide-react';
import { productService } from '../services/productService';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Collection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productService.getCategories();
        if (res.data?.categories) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const icons = [<Sliders size={32} color="#00f0ff" />, <Layout size={32} color="#7000ff" />, <ShieldCheck size={32} color="#ffb800" />, <Zap size={32} color="#ff0055" />];

  return (
    <div className="collection-page container" style={{ padding: '4rem 1.5rem' }}>
      <div className="section-header text-center">
        <h1 className="section-title">GG ACADEMY <span className="text-gradient-purple">COLLECTIONS</span></h1>
        <p className="section-sub">Browse specialized configurations and training bundles by category</p>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading Collections..." />
      ) : (
        <div className="grid">
          {categories.map((cat, idx) => (
            <div key={cat.id} className="glass-card collection-card">
              <div className="card-icon">{icons[idx % icons.length]}</div>
              <h3 className="card-name">{cat.name}</h3>
              <p className="card-desc">{cat.description || 'Pro calibrated configurations and tools.'}</p>
              <div className="prod-count">{cat._count?.products || 0} Products</div>
              <Link to={`/shop?category=${cat.slug}`} className="explore-link">
                Explore Collection <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .collection-card {
          padding: 2.2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
        }

        .card-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-name {
          font-size: 1.3rem;
          margin: 0;
        }

        .card-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.6;
        }

        .prod-count {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }

        .explore-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 0.95rem;
          margin-top: auto;
          transition: gap 0.2s ease;
        }

        .explore-link:hover {
          gap: 0.8rem;
          color: var(--accent-cyan);
        }
      `}</style>
    </div>
  );
};
