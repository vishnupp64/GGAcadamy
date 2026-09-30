import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const GoogleAuthButton = ({ onSuccessCallback, text = 'Sign in with Google' }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    try {
      const res = await googleLogin({ credential: credentialResponse.credential });
      if (res.data?.user) {
        if (onSuccessCallback) {
          onSuccessCallback(res.data.user);
        } else {
          if (res.data.user.role === 'ADMIN') {
            navigate('/admin');
          } else {
            navigate(from, { replace: true });
          }
        }
      }
    } catch (err) {
      console.error('Google Auth Failed:', err);
      setError(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Demo mock payload for quick instant testing without needing live OAuth client ID
      const res = await googleLogin({
        userInfo: {
          email: 'pro.gamer@gmail.com',
          firstName: 'Pro',
          lastName: 'Gamer',
          googleId: 'google_demo_10928374',
          avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150',
        },
      });
      if (res.data?.user) {
        if (onSuccessCallback) {
          onSuccessCallback(res.data.user);
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      setError(err.message || 'Demo Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="google-auth-wrapper">
      <div className="divider-container">
        <span className="divider-line"></span>
        <span className="divider-text">OR CONTINUE WITH</span>
        <span className="divider-line"></span>
      </div>

      {error && <div className="google-error-msg">{error}</div>}

      <div className="google-btn-box">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError('Google Sign-In popup closed or failed.')}
          useOneTap
          theme="filled_black"
          shape="pill"
          text="continue_with"
        />
      </div>

      <button
        type="button"
        onClick={handleQuickDemoGoogleLogin}
        disabled={loading}
        className="btn-demo-google"
      >
        <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>{loading ? 'Signing in with Google...' : 'One-Click Demo Google Login'}</span>
      </button>

      <style>{`
        .google-auth-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        .divider-container {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin: 0.5rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
        }

        .divider-text {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .google-error-msg {
          width: 100%;
          background: rgba(255, 0, 85, 0.15);
          border: 1px solid var(--accent-red);
          color: var(--accent-red);
          padding: 0.5rem 0.8rem;
          border-radius: 6px;
          font-size: 0.82rem;
        }

        .google-btn-box {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .btn-demo-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 0.7rem 1rem;
          border-radius: 30px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-demo-google:hover {
          background: var(--bg-card-hover);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          transform: translateY(-1px);
        }

        .google-icon {
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
