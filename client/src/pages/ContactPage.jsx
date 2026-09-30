import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { contentService } from '../services/contentService';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await contentService.submitContact(formData);
      if (res.data?.contactMessage || res.success) {
        setSuccessMsg('Thank you! Your message has been submitted. Our support team will get back to you shortly.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed sending contact message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div className="section-header text-center">
        <h1 className="section-title">GET IN <span className="text-gradient-purple">TOUCH</span></h1>
        <p className="section-sub">Have a question about our sensitivity presets, HUD configs, or courses?</p>
      </div>

      <div className="contact-grid">
        {/* Contact Info Sidebar */}
        <div className="info-col glass-card">
          <h3 className="card-title">Contact Information</h3>
          <p className="card-desc">Reach out directly to our esports coaches and VIP customer desk.</p>

          <div className="contact-items">
            <div className="contact-item">
              <Mail size={22} color="#00f0ff" />
              <div>
                <strong>Email Support</strong>
                <p>support@ggacademy.in</p>
              </div>
            </div>

            <div className="contact-item">
              <Phone size={22} color="#7000ff" />
              <div>
                <strong>Phone & WhatsApp</strong>
                <p>+91 9876543210</p>
              </div>
            </div>

            <div className="contact-item">
              <MapPin size={22} color="#ffb800" />
              <div>
                <strong>Headquarters</strong>
                <p>New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="form-col glass-card">
          {successMsg && (
            <div className="alert alert-success">
              <CheckCircle2 size={20} />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="input-row">
              <div className="input-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Sensi Preset Assistance"
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label>Message *</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your inquiry..."
                className="input-field"
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary submit-btn">
              <Send size={18} /> {loading ? 'Sending Message...' : 'Submit Contact Message'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 2.5rem;
          margin-top: 2.5rem;
        }

        .info-col {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          height: fit-content;
        }

        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .contact-item strong {
          color: #fff;
          font-size: 0.95rem;
        }

        .contact-item p {
          color: var(--text-secondary);
          font-size: 0.88rem;
          margin: 0;
        }

        .form-col {
          padding: 2.5rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-group label {
          font-size: 0.88rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .input-field {
          background: #181c28;
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
        }

        .input-field:focus {
          border-color: var(--accent-cyan);
        }

        textarea.input-field {
          resize: vertical;
        }

        .alert {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-weight: 600;
        }

        .alert-success {
          background: rgba(0, 240, 255, 0.15);
          border: 1px solid var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .alert-error {
          background: rgba(255, 0, 85, 0.15);
          border: 1px solid var(--accent-red);
          color: var(--accent-red);
        }

        .submit-btn {
          width: fit-content;
          align-self: flex-start;
          padding: 0.8rem 1.8rem;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .input-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
