import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Flame, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleAuthButton } from '../components/GoogleAuthButton';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await login(email, password);
      if (res.data?.user) {
        if (res.data.user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password credentials.');
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

        <h2 className="auth-title">ACCOUNT LOGIN</h2>
        <p className="auth-sub">Access your purchased sensitivity presets & video courses</p>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        <form onSubmit={handleLoginSubmit} className="auth-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@ggacademy.in"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary auth-btn">
            {loading ? 'Authenticating...' : 'Sign In To Account'} <ArrowRight size={18} />
          </button>
        </form>

        <GoogleAuthButton />


        <div className="demo-credentials-box">
          <p className="demo-title">Demo Credentials for Quick Testing:</p>
          <div className="cred-line"><strong>Admin:</strong> admin@ggacademy.in / Admin@123</div>
          <div className="cred-line"><strong>Student:</strong> student@ggacademy.in / Student@123</div>
        </div>

        <p className="auth-footer-text">
          Don't have an account yet? <Link to="/register" className="auth-link">Register Here</Link>
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
          max-width: 440px;
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

        .demo-credentials-box {
          width: 100%;
          background: rgba(0, 240, 255, 0.05);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 8px;
          padding: 0.8rem;
          margin-top: 1.5rem;
          font-size: 0.8rem;
          text-align: left;
        }

        .demo-title {
          font-weight: 700;
          color: var(--accent-cyan);
          margin-bottom: 0.3rem;
        }

        .cred-line {
          color: var(--text-secondary);
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
      `}</style>
    </div>
  );
};
