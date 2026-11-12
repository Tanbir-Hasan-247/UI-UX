import React from 'react';
import { useRunway } from '../context/RunwayContext.jsx';

export const Footer = () => {
  const { currency, setCurrency } = useRunway();

  return (
    <footer className="ecom-footer">
      <div className="ecom-container">
        {/* Top 4-Column Grid */}
        <div className="ecom-footer-grid">
          {/* Col 1 */}
          <div className="ecom-footer-col">
            <h4>Featured Products</h4>
            <ul>
              <li><a href="#shop-catalog">Air Jordan 1 Retro</a></li>
              <li><a href="#shop-catalog">Nike Dunk Low Essentials</a></li>
              <li><a href="#shop-catalog">Heavyweight Fleece Collection</a></li>
              <li><a href="#shop-catalog">Tech Utility Cargos & Denim</a></li>
              <li><a href="#shop-catalog">Member Early Access</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="ecom-footer-col">
            <h4>Customer Support</h4>
            <ul>
              <li><a href="#shop-catalog">Order Status & Tracking</a></li>
              <li><a href="#shop-catalog">Shipping & Delivery Policies</a></li>
              <li><a href="#shop-catalog">Returns & 30-Day Exchanges</a></li>
              <li><a href="#shop-catalog">Size Guide & Fit Assistance</a></li>
              <li><a href="#shop-catalog">Contact Concierge</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="ecom-footer-col">
            <h4>About NOXVELYN Runway</h4>
            <ul>
              <li><a href="#shop-catalog">Try the Look Experience</a></li>
              <li><a href="#shop-catalog">Move to Zero Sustainability</a></li>
              <li><a href="#shop-catalog">News & Editorial Releases</a></li>
              <li><a href="#shop-catalog">Careers & Design Lab</a></li>
              <li><a href="#shop-catalog">Global Community</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="ecom-footer-col">
            <h4>Preferences & Region</h4>
            <div className="ecom-currency-picker-box">
              <label htmlFor="currency-select">Display Currency:</label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD ($) - US Dollar</option>
                <option value="BDT">BDT (৳) - Bangladeshi Taka</option>
                <option value="EUR">EUR (€) - Euro</option>
              </select>
            </div>

            <div className="ecom-social-links-row">
              <a href="https://instagram.com/nike" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com/nike" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="https://youtube.com/nike" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="ecom-footer-bottom">
          <div className="ecom-footer-copy">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <img
                src="/images/noxvelyn-logo-white.png"
                alt="NOXVELYN"
                style={{ height: '20px', width: 'auto', opacity: 0.85 }}
              />
            </div>
            <span>© 2026 NOXVELYN, Inc. All Rights Reserved.</span>
            <span style={{ marginLeft: '12px' }}>Try the Look — Runway Edition</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div className="ecom-footer-legal-links">
              <a href="#shop-catalog">Privacy Policy</a>
              <a href="#shop-catalog">Terms of Sale</a>
              <a href="#shop-catalog">Terms of Use</a>
            </div>

            {/* Right Bottom Corner: Powered by SoftZen IT */}
            <a
              href="https://softzenit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ecom-footer-powered"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: '#ffffff',
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              title="Powered by SoftZen IT"
            >
              <span style={{ fontSize: '11px', color: '#333333', fontWeight: 600 }}>Powered by</span>
              <img
                src="/images/softzen-it-logo-transparent.png"
                alt="SoftZen IT"
                style={{ height: '20px', width: 'auto', display: 'block' }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
