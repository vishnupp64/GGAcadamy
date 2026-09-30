import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductGrid } from '../components/ProductGrid';

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productService.getCategories();
        if (res.data?.categories) setCategories(res.data.categories);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          page,
          limit: 12,
          sortBy,
          ...(selectedCategory && { category: selectedCategory }),
          ...(search && { search }),
          ...(minPrice && { minPrice }),
          ...(maxPrice && { maxPrice }),
        };
        const res = await productService.getProducts(params);
        if (res.data?.products) {
          setProducts(res.data.products);
          setTotalPages(res.data.pagination?.totalPages || 1);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, search, sortBy, minPrice, maxPrice, page]);

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <h1 className="shop-title">GG <span className="text-gradient-purple">STORE & CATALOG</span></h1>
          <p className="shop-sub">Calibrated Sensi presets, HUD configs, and tournament mastery packages</p>
        </div>
      </div>

      <div className="container shop-body">
        {/* Filter Controls Header */}
        <div className="filter-bar glass-card">
          <div className="search-wrap">
            <Search size={18} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search products or configs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="sort-wrap">
            <SlidersHorizontal size={18} color="#00f0ff" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="newest">Sort by: Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="shop-layout">
          {/* Left Category Sidebar */}
          <aside className="sidebar-filters glass-card">
            <h3 className="filter-title"><Filter size={18} /> Categories</h3>
            <ul className="category-list">
              <li
                className={`cat-item ${selectedCategory === '' ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(''); setPage(1); }}
              >
                All Products
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className={`cat-item ${selectedCategory === cat.slug ? 'active' : ''}`}
                  onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
                >
                  {cat.name}
                </li>
              ))}
            </ul>

            <h3 className="filter-title" style={{ marginTop: '2rem' }}>Price Range</h3>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="price-input"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="price-input"
              />
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="grid-main">
            <ProductGrid products={products} loading={loading} />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="page-btn"
                >
                  &larr; Prev
                </button>
                <span className="page-info">Page {page} of {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="page-btn"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        .shop-page {
          padding-bottom: 5rem;
        }

        .shop-header {
          background: radial-gradient(circle at 50% 0%, rgba(112, 0, 255, 0.2) 0%, rgba(10, 12, 16, 1) 100%);
          padding: 4rem 0 3rem 0;
          text-align: center;
          border-bottom: 1px solid var(--border-color);
        }

        .shop-title {
          font-size: 2.8rem;
          margin-bottom: 0.5rem;
        }

        .shop-sub {
          color: var(--text-secondary);
          font-size: 1.05rem;
        }

        .shop-body {
          margin-top: 2rem;
        }

        .filter-bar {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          background: none;
          border: none;
          color: #fff;
          outline: none;
          font-size: 0.95rem;
          width: 100%;
        }

        .sort-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .sort-select {
          background: #181c28;
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.55rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }

        .shop-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 2rem;
        }

        .sidebar-filters {
          padding: 1.5rem;
          height: fit-content;
        }

        .filter-title {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-cyan);
        }

        .category-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .cat-item {
          padding: 0.6rem 0.8rem;
          border-radius: 6px;
          color: var(--text-secondary);
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cat-item:hover, .cat-item.active {
          background: rgba(112, 0, 255, 0.2);
          color: #fff;
        }

        .cat-item.active {
          border-left: 3px solid var(--accent-cyan);
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-input {
          background: #181c28;
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.45rem 0.6rem;
          border-radius: 6px;
          width: 100%;
          font-size: 0.85rem;
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .page-btn {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .page-btn:hover:not(:disabled) {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .page-info {
          color: var(--text-secondary);
          font-weight: 600;
        }

        @media (max-width: 992px) {
          .shop-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
