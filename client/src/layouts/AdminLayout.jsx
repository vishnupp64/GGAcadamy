import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  BookOpen,
  ShoppingCart,
  Users,
  MessageSquareQuote,
  HelpCircle,
  Mail,
  Sliders,
  LogOut,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { label: 'Products', path: '/admin/products', icon: <Package size={18} /> },
    { label: 'Courses', path: '/admin/courses', icon: <BookOpen size={18} /> },
    { label: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={18} /> },
    { label: 'Users', path: '/admin/users', icon: <Users size={18} /> },
    { label: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquareQuote size={18} /> },
    { label: 'FAQs', path: '/admin/faqs', icon: <HelpCircle size={18} /> },
    { label: 'Messages', path: '/admin/contact-messages', icon: <Mail size={18} /> },
    { label: 'Site Settings', path: '/admin/settings', icon: <Sliders size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <Flame size={22} color="#00f0ff" />
          <span>GG <span className="text-gradient-purple">ADMIN</span></span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link view-site-link" target="_blank">
            <ExternalLink size={18} /> View Public Site
          </Link>
          <button onClick={handleLogout} className="sidebar-link logout-link">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-header">
          <h2 className="admin-page-title">
            {navItems.find((i) => i.path === location.pathname)?.label || 'Console'}
          </h2>

          <div className="admin-user-chip">
            <span className="user-role-badge">ADMIN</span>
            <span className="user-email">{user?.email}</span>
          </div>
        </header>

        <div className="admin-content container">
          <Outlet />
        </div>
      </div>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #080a0f;
          color: var(--text-primary);
        }

        .admin-sidebar {
          width: 260px;
          background: #11141d;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 90;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-family-heading);
          font-size: 1.3rem;
          font-weight: 800;
          padding: 0 0.5rem 1.5rem 0.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 1.5rem;
          flex: 1;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.7rem 0.9rem;
          border-radius: 8px;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }

        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .sidebar-link.active {
          background: rgba(112, 0, 255, 0.2);
          border: 1px solid var(--accent-primary);
          color: var(--accent-cyan);
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .view-site-link {
          color: var(--accent-cyan);
        }

        .logout-link {
          color: var(--accent-red);
        }

        .admin-main {
          margin-left: 260px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .admin-header {
          height: 70px;
          background: #11141d;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }

        .admin-page-title {
          font-size: 1.4rem;
          margin: 0;
        }

        .admin-user-chip {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .user-role-badge {
          background: rgba(255, 0, 85, 0.2);
          color: var(--accent-red);
          border: 1px solid var(--accent-red);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 800;
        }

        .user-email {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .admin-content {
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};
