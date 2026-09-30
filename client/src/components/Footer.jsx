import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Flame, Mail, Phone, MapPin, Youtube, Instagram, Disc as Discord, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.grid}>
          {/* Column 1: Brand Info */}
          <div style={styles.col}>
            <Link to="/" style={styles.logo}>
              <Flame size={24} color="#00f0ff" />
              <span>GG <span style={{ color: '#7000ff' }}>ACADEMY</span></span>
            </Link>
            <p style={styles.desc}>
              India's premier gaming & esports training academy. Master sensitivity presets, 0.1s Gloo Wall routines, and tournament mechanics.
            </p>
            <div style={styles.socials}>
              <a href="#" aria-label="YouTube" style={styles.socialIcon}><Youtube size={18} /></a>
              <a href="#" aria-label="Instagram" style={styles.socialIcon}><Instagram size={18} /></a>
              <a href="#" aria-label="Discord" style={styles.socialIcon}><Discord size={18} /></a>
              <a href="#" aria-label="Twitter" style={styles.socialIcon}><Twitter size={18} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Quick Links</h4>
            <ul style={styles.list}>
              <li><Link to="/" style={styles.link}>Home</Link></li>
              <li><Link to="/shop" style={styles.link}>Shop Now</Link></li>
              <li><Link to="/collection" style={styles.link}>Collection</Link></li>
              <li><Link to="/my-courses" style={styles.link}>My Courses</Link></li>
              <li><Link to="/contact" style={styles.link}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Policies */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Policies</h4>
            <ul style={styles.list}>
              <li><Link to="/privacy-policy" style={styles.link}>Privacy Policy</Link></li>
              <li><Link to="/refund-policy" style={styles.link}>Refund Policy</Link></li>
              <li><Link to="/terms" style={styles.link}>Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" style={styles.link}>Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Stay Updated</h4>
            <p style={styles.desc}>Get exclusive Sensi presets & discount alerts straight to your inbox.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to GG Academy newsletter!'); }} style={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                style={styles.input}
              />
              <button type="submit" style={styles.subscribeBtn}>Join</button>
            </form>
          </div>
        </div>

        <hr style={styles.hr} />

        <div style={styles.bottom}>
          <p>© {new Date().getFullYear()} GG Academy. All rights reserved.</p>
          <div style={styles.secureBadge}>
            <Shield size={16} color="#00f0ff" /> 100% Encrypted & Secure Checkout
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#07080b',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '4rem 0 2rem 0',
    color: '#9ca3af',
    fontSize: '0.9rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2.5rem',
    marginBottom: '3rem',
  },
  col: {
    display: 'flex',
    flexdirection: 'column',
    flexDirection: 'column',
    gap: '1rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#ffffff',
  },
  desc: {
    lineHeight: '1.6',
    color: '#9ca3af',
  },
  socials: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  socialIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: '#181c28',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    transition: 'all 0.2s ease',
  },
  colTitle: {
    color: '#ffffff',
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  link: {
    color: '#9ca3af',
    transition: 'color 0.2s ease',
  },
  newsletterForm: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    background: '#181c28',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '0.6rem 0.8rem',
    color: '#ffffff',
    fontSize: '0.85rem',
    width: '100%',
  },
  subscribeBtn: {
    background: '#7000ff',
    color: '#ffffff',
    fontWeight: '700',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    textTransform: 'uppercase',
  },
  hr: {
    borderColor: 'rgba(255, 255, 255, 0.08)',
    margin: '2rem 0',
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  secureBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#00f0ff',
    fontSize: '0.85rem',
  },
};
