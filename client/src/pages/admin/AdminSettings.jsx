import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle2 } from 'lucide-react';
import { contentService } from '../../services/contentService';
import { adminService } from '../../services/adminService';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminSettings = () => {
  const [announcementText, setAnnouncementText] = useState('🔥 20% OFF ON ALL SENSI PACKS & COURSES!');
  const [studentCount, setStudentCount] = useState('30,000+');
  const [heroHeading, setHeroHeading] = useState('DOMINATE THE BATTLEFIELD WITH PRO SENSI & TACTICS');
  const [contactEmail, setContactEmail] = useState('support@ggacademy.in');

  const [loading, setLoading] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await contentService.getSettings();
        if (res.data) {
          if (res.data.announcement) setAnnouncementText(res.data.announcement);
          if (res.data.settings?.student_count) setStudentCount(res.data.settings.student_count);
          if (res.data.settings?.hero_heading) setHeroHeading(res.data.settings.hero_heading);
          if (res.data.settings?.contact_email) setContactEmail(res.data.settings.contact_email);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await adminService.updateSettings({
        announcementText,
        settings: {
          student_count: studentCount,
          hero_heading: heroHeading,
          contact_email: contactEmail,
        },
      });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (err) {
      alert(err.message || 'Error updating settings');
    }
  };

  if (loading) return <LoadingSpinner text="Loading Site Settings..." />;

  return (
    <div className="admin-settings-page" style={{ maxWidth: '700px' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Global Site Settings & Config</h3>

      {savedToast && (
        <div className="alert alert-success" style={{ padding: '0.8rem 1rem', background: 'rgba(0, 240, 255, 0.15)', border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700' }}>
          <CheckCircle2 size={18} /> Site settings & promotional announcement bar updated!
        </div>
      )}

      <form onSubmit={handleSave} className="glass-card settings-form" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div className="input-group">
          <label style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>Promotional Announcement Bar Text *</label>
          <input
            type="text"
            required
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            className="input-field"
          />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>This banner is dynamically displayed at the very top of all public pages.</span>
        </div>

        <div className="input-group">
          <label>Hero Heading</label>
          <input
            type="text"
            value={heroHeading}
            onChange={(e) => setHeroHeading(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label>Student Count Stat</label>
            <input
              type="text"
              value={studentCount}
              onChange={(e) => setStudentCount(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>Contact Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: 'fit-content' }}>
          <Save size={18} /> Save Settings
        </button>
      </form>

      <style>{`
        .input-group label { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.3rem; display: block; }
        .input-field { width: 100%; background: #181c28; border: 1px solid var(--border-color); color: #fff; padding: 0.75rem 1rem; border-radius: 8px; }
      `}</style>
    </div>
  );
};
