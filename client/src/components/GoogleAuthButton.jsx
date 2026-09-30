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
