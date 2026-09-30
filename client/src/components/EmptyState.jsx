import React from 'react';
import { PackageX } from 'lucide-react';

export const EmptyState = ({ title = 'Nothing found', message = 'There are no items to display at this time.' }) => {
  return (
    <div style={styles.container} className="glass-card">
      <div style={styles.iconBox}>
        <PackageX size={42} color="#6b7280" />
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '4rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.8rem',
    maxWidth: '500px',
    margin: '2rem auto',
    borderRadius: '16px',
  },
  iconBox: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.4rem',
    color: '#ffffff',
  },
  message: {
    color: '#9ca3af',
    fontSize: '0.95rem',
  },
};
