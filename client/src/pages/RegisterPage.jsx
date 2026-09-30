import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleAuthButton } from '../components/GoogleAuthButton';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await register(formData);
      if (res.data?.user) {
        navigate('/my-courses');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-card glass-card glow-purple">
        <div className="auth-brand">
          <Flame size={28} color="#00f0ff" />
          <span>GG <span className="text-gradient-purple">ACADEMY</span></span>
        </div>

        <h2 className="auth-title">CREATE AN ACCOUNT</h2>
        <p className="auth-sub">Join 30,000+ gamers mastering sensitivity & tournament skills</p>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        <form onSubmit={handleRegisterSubmit} className="auth-form">
          <div className="input-row">
            <div className="input-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Aman"
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Sharma"
                className="input-field"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="input-field"
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary auth-btn">
            <UserPlus size={18} /> {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <GoogleAuthButton text="Sign up with Google" />


        <p className="auth-footer-text">
          Already have an account? <Link to="/login" className="auth-link">Login Here</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
        }

        .auth-card {
          width: 100%;
          max-width: 520px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .auth-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-family-heading);
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .auth-title {
          font-size: 1.8rem;
          margin-bottom: 0.3rem;
        }

        .auth-sub {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.8rem;
        }

        .auth-error {
          width: 100%;
          background: rgba(255, 0, 85, 0.15);
          border: 1px solid var(--accent-red);
          color: var(--accent-red);
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
        }

        .auth-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          text-align: left;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-group label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .input-field {
          background: #181c28;
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
        }

        .input-field:focus {
          border-color: var(--accent-cyan);
        }

        .auth-btn {
          width: 100%;
          justify-content: center;
          padding: 0.85rem;
          margin-top: 0.5rem;
        }

        .auth-footer-text {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .auth-link {
          color: var(--accent-cyan);
          font-weight: 700;
        }

        @media (max-width: 576px) {
          .input-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
