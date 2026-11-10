import React from 'react';
import { CUSTOMER_REVIEWS } from '../data/runwayCatalog.js';

export const ReviewsSection = () => {
  return (
    <section className="ecom-reviews-section">
      <div className="ecom-container">
        <div className="ecom-section-header-center">
          <span className="ecom-eyebrow">Real Buyer Feedback</span>
          <h2 className="ecom-title-large">Verified Community Reviews</h2>
          <div className="ecom-reviews-overall-score">
            <div className="ecom-stars-row">★★★★★</div>
            <strong>4.9 Out of 5 Stars</strong>
            <span>• Based on 1,480+ verified purchases worldwide</span>
          </div>
        </div>

        <div className="ecom-reviews-grid">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div className="ecom-review-card" key={rev.id}>
              <div className="ecom-review-card-header">
                <div>
                  <div className="ecom-review-author-row">
                    <strong>{rev.name}</strong>
                    {rev.verified && <span className="ecom-verified-pill">✓ Verified Buyer</span>}
                  </div>
                  <span className="ecom-review-loc">{rev.location} • {rev.date}</span>
                </div>
                <div className="ecom-review-stars">
                  {'★'.repeat(rev.rating)}
                </div>
              </div>

              <div className="ecom-review-product-tag">
                <span>Item: <strong>{rev.productName}</strong></span>
                <span className="ecom-fit-tag">Fit: {rev.fit}</span>
              </div>

              <h4 className="ecom-review-title">"{rev.title}"</h4>
              <p className="ecom-review-text">{rev.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
