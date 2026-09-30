import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div style={styles.container}>
      <Loader2 size={36} color="#00f0ff" className="spinner-icon" />
      <p style={styles.text}>{text}</p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spinner-icon {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    padding: '4rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    width: '100%',
  },
  text: {
    color: '#9ca3af',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
};
