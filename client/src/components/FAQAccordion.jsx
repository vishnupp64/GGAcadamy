import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { contentService } from '../services/contentService';

export const FAQAccordion = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await contentService.getFAQs();
        if (res.data?.faqs) {
          setFaqs(res.data.faqs);
        }
      } catch (err) {
        console.error('Failed fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (loading || faqs.length === 0) return null;

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">FREQUENTLY ASKED <span className="text-gradient-purple">QUESTIONS</span></h2>
          <p className="section-sub">Everything you need to know before joining GG Academy</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.id || idx} className={`faq-item glass-card ${isOpen ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFAQ(idx)}>
                  <div className="q-title-wrap">
                    <HelpCircle size={20} color="#00f0ff" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown size={20} className={`chevron ${isOpen ? 'rotate' : ''}`} />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: 5rem 0;
          background: var(--bg-primary);
        }

        .faq-list {
          max-width: 840px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          border-radius: var(--card-radius);
          transition: all 0.2s ease;
        }

        .faq-item.active {
          border-color: var(--border-glow);
          background: rgba(24, 28, 40, 0.9);
        }

        .faq-question {
          width: 100%;
          padding: 1.4rem 1.8rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.05rem;
          text-align: left;
        }

        .q-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .chevron {
          transition: transform 0.3s ease;
          color: var(--text-muted);
        }

        .chevron.rotate {
          transform: rotate(180deg);
          color: var(--accent-cyan);
        }

        .faq-answer {
          padding: 0 1.8rem 1.4rem 3.4rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.98rem;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          margin-top: 0.2rem;
          padding-top: 1rem;
        }
      `}</style>
    </section>
  );
};
