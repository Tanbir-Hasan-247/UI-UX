import React from 'react';
import { EDITORIAL_COLLECTIONS } from '../data/runwayCatalog.js';

export const EditorialSpotlights = ({ onSelectCategory }) => {
  return (
    <section className="ecom-editorial-section">
      <div className="ecom-container">
        <div className="ecom-section-header-center">
          <span className="ecom-eyebrow">Curated Directions</span>
          <h2 className="ecom-title-large">Editorial Series & Drops</h2>
          <p className="ecom-desc-center">
            Explore thematic silhouettes tailored for individual expression, street culture, and high-performance lifestyle.
          </p>
        </div>

        <div className="ecom-editorial-grid">
          {EDITORIAL_COLLECTIONS.map((col) => (
            <div className="ecom-editorial-card" key={col.id}>
              <div className="ecom-editorial-img-box">
                <img src={col.image} alt={col.title} loading="lazy" />
                <div className="ecom-editorial-overlay"></div>
              </div>

              <div className="ecom-editorial-content">
                <span className="ecom-editorial-sub">{col.subtitle}</span>
                <h3 className="ecom-editorial-title">{col.title}</h3>
                <p className="ecom-editorial-desc">{col.description}</p>
                <button
                  type="button"
                  className="ecom-editorial-cta"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory(col.category);
                    const el = document.getElementById('shop-catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>{col.ctaText}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
