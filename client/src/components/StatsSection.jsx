import React, { useState, useEffect } from 'react';
import { Users, Award, ShieldCheck, Headphones } from 'lucide-react';
import { contentService } from '../services/contentService';

export const StatsSection = () => {
  const [studentCount, setStudentCount] = useState('30,000+');
  const [winRate, setWinRate] = useState('99.4%');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await contentService.getSettings();
        if (res.data?.settings?.student_count) {
          setStudentCount(res.data.settings.student_count);
        }
        if (res.data?.settings?.win_rate) {
          setWinRate(res.data.settings.win_rate);
        }
      } catch (err) {
        // Fallback default
      }
    };
    loadStats();
  }, []);

  const stats = [
    { icon: <Users size={32} color="#00f0ff" />, value: studentCount, label: 'Enrolled Students' },
    { icon: <Award size={32} color="#ffb800" />, value: winRate, label: 'Gameplay Success Rate' },
    { icon: <ShieldCheck size={32} color="#7000ff" />, value: '100% Safe', label: 'Anti-Ban Verified' },
    { icon: <Headphones size={32} color="#ff0055" />, value: '24/7', label: 'VIP Discord Support' },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-box glass-card glow-purple">
          <h2 className="stats-heading">GUARANTEED BY <span className="text-gradient-purple">{studentCount} STUDENTS</span></h2>
          <p className="stats-sub">Join India's fastest growing community of ranked champions</p>

          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-val">{stat.value}</div>
                <div className="stat-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .stats-section {
          padding: 4rem 0;
          background: var(--bg-secondary);
        }

        .stats-box {
          padding: 3.5rem 2rem;
          text-align: center;
          border-radius: 20px;
        }

        .stats-heading {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .stats-sub {
          color: var(--text-secondary);
          font-size: 1.05rem;
          margin-bottom: 3rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-val {
          font-family: var(--font-family-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-lbl {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
      `}</style>
    </section>
  );
};
