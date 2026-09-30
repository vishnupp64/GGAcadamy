import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, ShieldAlert, BookOpen, Flame, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('gg_theme') || 'dark');

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gg_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`header ${isSticky ? 'header-sticky' : ''}`}>
      <div className="container header-container">
        {/* Left: Mobile Hamburger */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="logo-badge">
            <Flame size={20} color="#00f0ff" />
          </div>
          <span className="logo-text">
            GG <span className="logo-accent">ACADEMY</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>
            Shop Now
          </Link>
          <Link to="/collection" className={`nav-link ${location.pathname === '/collection' ? 'active' : ''}`}>
            Collection
          </Link>
          <Link to="/my-courses" className={`nav-link ${location.pathname === '/my-courses' ? 'active' : ''}`}>
            My Courses
          </Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            Contact
          </Link>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="icon-btn theme-toggle-btn"
            aria-label="Toggle Dark / Light Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Tech Mode`}
          >
            {theme === 'dark' ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} color="#6366f1" />}
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="icon-btn cart-btn" aria-label="Shopping Cart">
            <ShoppingCart size={22} />
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </Link>

          {/* User Auth/Account Dropdown */}
          {isAuthenticated ? (
            <div className="user-menu-wrapper">
              <button
                className="user-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="avatar-chip">
                  {user?.firstName ? user.firstName[0].toUpperCase() : 'U'}
                </div>
                <span className="user-name-text">{user?.firstName}</span>
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <p className="dropdown-user-name">{user?.firstName} {user?.lastName}</p>
                    <p className="dropdown-user-email">{user?.email}</p>
                    {isAdmin && <span className="admin-chip">ADMIN</span>}
                  </div>
                  <hr className="dropdown-divider" />
                  <Link to="/account" className="dropdown-item">
                    <User size={16} /> My Account
                  </Link>
                  <Link to="/my-courses" className="dropdown-item">
                    <BookOpen size={16} /> My Courses
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="dropdown-item admin-item">
                      <ShieldAlert size={16} /> Admin Console
                    </Link>
                  )}
                  <hr className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Slide-out Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <Link to="/" className="brand-logo">
                <span className="logo-text">GG <span className="logo-accent">ACADEMY</span></span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="close-btn">
                <X size={24} />
              </button>
            </div>

            <nav className="mobile-nav">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop Now</Link>
              <Link to="/collection">Collection</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/contact">Contact</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/account">My Account</Link>
                  {isAdmin && <Link to="/admin" className="admin-link">Admin Console</Link>}
                  <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
                </>
              ) : (
                <Link to="/login" className="mobile-login-btn">Login / Register</Link>
              )}
            </nav>
          </div>
        </div>
      )}

      <style>{`
        .header {
          background-color: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--border-color);
          position: relative;
          z-index: 100;
          transition: all 0.3s ease;
        }

        .header-sticky {
          position: sticky;
          top: 0;
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-family-heading);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--text-primary);
        }

        .logo-text {
          color: var(--text-primary);
        }

        .logo-badge {
          width: 34px;
          height: 34px;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-accent {
          color: var(--accent-cyan);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
          position: relative;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-cyan));
          border-radius: 2px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .icon-btn {
          position: relative;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 8px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
        }

        .icon-btn:hover {
          border-color: var(--accent-primary);
          color: var(--accent-cyan);
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--accent-red);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 8px rgba(255, 0, 85, 0.6);
        }

        .login-btn {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #9333ea 100%);
          color: #fff;
          padding: 0.55rem 1.4rem;
          border-radius: var(--btn-radius);
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(112, 0, 255, 0.3);
          transition: all var(--transition-fast);
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(112, 0, 255, 0.5);
        }

        .user-menu-wrapper {
          position: relative;
        }

        .user-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 0.35rem 0.8rem 0.35rem 0.35rem;
          border-radius: 30px;
          color: var(--text-primary);
        }

        .avatar-chip {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-cyan));
          color: #fff;
          font-weight: 800;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-name-text {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 230px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.8rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.8);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .dropdown-header {
          padding: 0.3rem 0.5rem;
        }

        .dropdown-user-name {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .dropdown-user-email {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .admin-chip {
          display: inline-block;
          margin-top: 0.3rem;
          background: rgba(255, 0, 85, 0.2);
          color: var(--accent-red);
          border: 1px solid var(--accent-red);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 800;
        }

        .dropdown-divider {
          border: none;
          border-top: 1px solid var(--border-color);
          margin: 0.2rem 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.6rem;
          border-radius: 6px;
          font-size: 0.88rem;
          color: var(--text-secondary);
          transition: background 0.2s ease;
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .admin-item {
          color: var(--accent-cyan);
        }

        .logout-item {
          color: var(--accent-red);
          width: 100%;
          text-align: left;
        }

        .mobile-toggle {
          display: none;
          color: var(--text-primary);
        }

        /* Mobile Drawer */
        .mobile-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          z-index: 999;
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .close-btn {
          color: var(--text-secondary);
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .mobile-logout-btn, .mobile-login-btn {
          margin-top: 1rem;
          padding: 0.7rem;
          border-radius: 8px;
          font-weight: 700;
          text-align: center;
        }

        .mobile-logout-btn {
          background: rgba(255, 0, 85, 0.15);
          color: var(--accent-red);
          border: 1px solid var(--accent-red);
        }

        .mobile-login-btn {
          background: var(--accent-primary);
          color: #fff;
        }

        @media (max-width: 992px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
          .user-name-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
