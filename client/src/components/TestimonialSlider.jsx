import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { contentService } from '../services/contentService';

export const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await contentService.getTestimonials();
        if (res.data?.testimonials && res.data.testimonials.length > 0) {
          setTestimonials(res.data.testimonials);
        }
      } catch (err) {
        console.error('Failed fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (loading || testimonials.length === 0) return null;

  const active = testimonials[currentIndex];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">PRO GAMER <span className="text-gradient-purple">TESTIMONIALS</span></h2>
          <p className="section-sub">Hear what our 30,000+ gaming students have to say</p>
        </div>

        <div className="slider-wrapper glass-card">
          <Quote size={48} className="quote-icon" color="#7000ff" />

          <p className="comment-text">"{active.comment}"</p>

          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={i < active.rating ? '#ffb800' : 'none'}
                color={i < active.rating ? '#ffb800' : '#4b5563'}
              />
            ))}
          </div>

          <div className="author-info">
            <img
              src={active.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={active.name}
              className="author-avatar"
            />
            <div>
              <h4 className="author-name">{active.name}</h4>
              <p className="author-location">{active.location || 'Verified Student'}</p>
            </div>
          </div>

          <div className="slider-controls">
            <button onClick={handlePrev} className="control-btn" aria-label="Previous Testimonial">
              <ChevronLeft size={24} />
            </button>
            <span className="slide-counter">{currentIndex + 1} / {testimonials.length}</span>
            <button onClick={handleNext} className="control-btn" aria-label="Next Testimonial">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-section {
          padding: 5rem 0;
          background: var(--bg-primary);
        }

        .slider-wrapper {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          position: relative;
        }

        .quote-icon {
          opacity: 0.4;
        }

        .comment-text {
          font-size: 1.25rem;
          line-height: 1.7;
          font-style: italic;
          color: var(--text-primary);
        }

        .rating-stars {
          display: flex;
          gap: 0.3rem;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .author-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 2px solid var(--accent-primary);
          object-fit: cover;
        }

        .author-name {
          font-size: 1.1rem;
          margin: 0;
          text-align: left;
        }

        .author-location {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-align: left;
        }

        .slider-controls {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .control-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .control-btn:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .slide-counter {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
};
