import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentService } from '../services/contentService';

export const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState('🔥 20% OFF ON ALL SENSI PACKS & COURSES!');
  const [link, setLink] = useState('/shop');

  useEffect(() => {
    const loadAnnouncement = async () => {
      try {
        const res = await contentService.getSettings();
        if (res.data?.announcement) {
          setAnnouncement(res.data.announcement);
        }
        if (res.data?.announcementLink) {
          setLink(res.data.announcementLink);
        }
      } catch (err) {
        // Fallback default
      }
    };
    loadAnnouncement();
  }, []);

  if (!announcement) return null;

  return (
    <div style={styles.bar}>
      <Link to={link} style={styles.content}>
        <span>{announcement}</span>
        <span style={styles.action}>SHOP NOW &rarr;</span>
      </Link>
    </div>
  );
};

const styles = {
  bar: {
    background: 'linear-gradient(90deg, #7000ff 0%, #00f0ff 100%)',
    color: '#ffffff',
    textAlign: 'center',
    padding: '0.45rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 10px rgba(112, 0, 255, 0.3)',
    position: 'relative',
    zIndex: 101,
  },
  content: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#ffffff',
  },
  action: {
    background: 'rgba(0, 0, 0, 0.25)',
    padding: '0.15rem 0.6rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
  },
};
