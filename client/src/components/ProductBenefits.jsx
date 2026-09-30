import React from 'react';
import { Crosshair, Video, Sliders, Smartphone } from 'lucide-react';

export const ProductBenefits = () => {
  const benefits = [
    {
      icon: <Crosshair size={36} color="#00f0ff" />,
      title: 'AUTO AIMING TECHNIQUES',
      desc: 'Learn high-drag aiming methods that lock automatically onto head hitboxes.',
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <Video size={36} color="#7000ff" />,
      title: 'EXPERT TUTORIALS',
      desc: 'Frame-by-frame 4K video breakdowns explaining pro claw movement.',
      img: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <Sliders size={36} color="#ffb800" />,
      title: 'CUSTOMIZABLE HUDS',
      desc: 'Tailored 2, 3, & 4-finger claw setups for instant Gloo Wall drop.',
      img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <Smartphone size={36} color="#ff0055" />,
      title: 'MOBILE OPTIMIZATION',
      desc: 'Optimized touch sensitivity & DPI presets for 60-120 FPS gaming.',
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="benefits-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">UNMATCHED <span className="text-gradient-purple">GAMING ADVANTAGE</span></h2>
          <p className="section-sub">Comprehensive tools and guides designed for instant squad carrying</p>
        </div>

        <div className="grid">
          {benefits.map((b, idx) => (
            <div key={idx} className="glass-card benefit-card">
              <div className="card-img-wrap">
                <img src={b.img} alt={b.title} className="card-img" />
                <div className="icon-badge">{b.icon}</div>
              </div>
              <div className="card-body">
                <h3 className="card-title">{b.title}</h3>
                <p className="card-desc">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .benefits-section {
          padding: 5rem 0;
          background: var(--bg-secondary);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.8rem;
        }

        .benefit-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .card-img-wrap {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .benefit-card:hover .card-img {
          transform: scale(1.08);
        }

        .icon-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(18, 21, 30, 0.85);
          padding: 0.6rem;
          border-radius: 12px;
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-glow);
        }

        .card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .card-title {
          font-size: 1.15rem;
          margin: 0;
        }

        .card-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};
