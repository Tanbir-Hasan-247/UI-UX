import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer-root" id="newsletter">
      <div className="newsletter-banner">
        <div className="newsletter-content">
          <span className="section-eyebrow wide">PRIVATE CORRESPONDENCE</span>
          <h2 className="newsletter-heading wide">THE MAISON VELL GAZETTE</h2>
          <p className="newsletter-desc">
            Receive private showroom invitations, runway look previews, and bespoke atelier appointments before public release.
          </p>

          {subscribed ? (
            <div className="newsletter-success wide">
              ✓ THANK YOU FOR SUBSCRIBING. WELCOME TO THE MAISON VELL CIRCLE.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL FOR PRIVATE PREVIEWS..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input wide"
              />
              <button type="submit" className="newsletter-submit-btn wide">
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-links-grid">
        <div className="footer-col">
          <h4 className="footer-col-title wide">FLAGSHIP BOUTIQUES</h4>
          <ul>
            <li>
              <b>PARIS:</b> 28 Rue du Faubourg Saint-Honoré, 75008
            </li>
            <li>
              <b>MILAN:</b> Via Montenapoleone 14, 20121
            </li>
            <li>
              <b>NEW YORK:</b> 712 Madison Avenue, NY 10065
            </li>
            <li>
              <b>TOKYO:</b> 5-7-22 Minamiaoyama, Minato-ku, 107-0062
            </li>
            <li>
              <b>LONDON:</b> 42 New Bond Street, W1S 2RY
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title wide">CLIENT CONCIERGE</h4>
          <ul>
            <li><a href="#appointment">Book a Private Atelier Appointment</a></li>
            <li><a href="#care">Garment Care & Silk Restoration</a></li>
            <li><a href="#delivery">White Glove Delivery & Returns</a></li>
            <li><a href="#auth">Certificate of Authenticity Registry</a></li>
            <li><a href="#faq">Frequently Asked Questions</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title wide">THE HOUSE</h4>
          <ul>
            <li><a href="#vision">Creative Direction & Manifesto</a></li>
            <li><a href="#craft">Como & Florentine Craftsmanship</a></li>
            <li><a href="#sustainability">Sustainable Atelier Charter</a></li>
            <li><a href="#press">Editorial Press Archive</a></li>
            <li><a href="#careers">Atelier Artisans & Careers</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title wide">LEGAL & PRIVACY</h4>
          <ul>
            <li><a href="#privacy">Privacy & Confidentiality</a></li>
            <li><a href="#terms">Terms of Haute Couture Sale</a></li>
            <li><a href="#ethics">Code of Ethical Sourcing</a></li>
            <li><a href="#cookies">Cookie Preferences</a></li>
            <li><a href="#accessibility">Accessibility Statement</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span className="wide brand-mark">MAISON VELL</span>
        <span className="footer-copy">
          © 2027 MAISON VELL S.A.S. ALL RIGHTS RESERVED. SPRING SUMMER 2027 ARCHIVE.
        </span>
        <div className="footer-socials wide">
          <a href="#ig">INSTAGRAM</a>
          <a href="#vogue">VOGUE RUNWAY</a>
          <a href="#atelier">THE ATELIER</a>
        </div>
      </div>
    </footer>
  );
};
