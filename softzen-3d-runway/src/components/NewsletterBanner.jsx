import React, { useState } from 'react';
import { useRunway } from '../context/RunwayContext.jsx';

export const NewsletterBanner = () => {
  const { showToast } = useRunway();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    showToast('🎉 Welcome to Nike Runway Club! Use code RUNWAY15 for 15% off.');
  };

  return (
    <section className="ecom-newsletter-section">
      <div className="ecom-container">
        <div className="ecom-newsletter-card">
          <span className="ecom-eyebrow" style={{ color: '#aaa' }}>VIP Access & First Drops</span>
          <h2 className="ecom-newsletter-title">Join The Nike Runway Club</h2>
          <p className="ecom-newsletter-desc">
            Sign up for insider drop alerts, private editorial releases, and enjoy <strong>15% off</strong> your first order.
          </p>

          {submitted ? (
            <div className="ecom-newsletter-success">
              <span style={{ fontSize: '24px' }}>🎉</span>
              <div>
                <strong>You're in the club!</strong>
                <p>Use promo code <span className="ecom-code-badge">RUNWAY15</span> at checkout for 15% off your order.</p>
              </div>
            </div>
          ) : (
            <form className="ecom-newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="ecom-btn-primary" style={{ width: 'auto', padding: '14px 28px' }}>
                Join & Claim 15% Off
              </button>
            </form>
          )}

          <span className="ecom-newsletter-legal">
            By joining, you agree to Nike's Privacy Policy and Terms of Service. Unsubscribe anytime.
          </span>
        </div>
      </div>
    </section>
  );
};
