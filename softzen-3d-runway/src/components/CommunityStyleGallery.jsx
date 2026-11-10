import React from 'react';
import { COMMUNITY_LOOKS } from '../data/runwayCatalog.js';

export const CommunityStyleGallery = ({ onSelectCategory }) => {
  return (
    <section className="ecom-community-section">
      <div className="ecom-container">
        <div className="ecom-section-header-center">
          <span className="ecom-eyebrow">Community Showcase</span>
          <h2 className="ecom-title-large">Styled By You • #NikeRunway</h2>
          <p className="ecom-desc-center">
            From the streets of Tokyo to New York and Paris, see how creators style our latest runway drops in real life.
          </p>
        </div>

        <div className="ecom-community-scroll-container">
          {COMMUNITY_LOOKS.map((item) => (
            <div className="ecom-community-card" key={item.id}>
              <div className="ecom-community-img-wrap">
                <img src={item.image} alt={item.lookTitle} loading="lazy" />
                <span className="ecom-community-loc-tag">{item.city}</span>
              </div>

              <div className="ecom-community-info">
                <div className="ecom-community-meta">
                  <strong>{item.creator}</strong>
                  <div className="ecom-community-tags">
                    {item.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>

                <h4 className="ecom-community-look-title">{item.lookTitle}</h4>

                <div className="ecom-community-items-box">
                  <span className="ecom-community-pieces-label">Pieces in this look:</span>
                  <ul className="ecom-community-items-list">
                    {item.items.map((it, idx) => (
                      <li key={idx}>• {it}</li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className="ecom-btn-secondary"
                  style={{ width: '100%', marginTop: '10px', padding: '10px 16px', fontSize: '12px' }}
                  onClick={() => {
                    const el = document.getElementById('shop-catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Shop This Aesthetic
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
