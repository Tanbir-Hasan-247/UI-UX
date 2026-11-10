import React from 'react';

export const InnovationStory = () => {
  return (
    <section className="ecom-innovation-section">
      <div className="ecom-container">
        <div className="ecom-innovation-grid">
          {/* Left Text Column */}
          <div className="ecom-innovation-col-text">
            <span className="ecom-eyebrow">Material & Innovation</span>
            <h2 className="ecom-title-large">Engineered For The Runway. Built For The Street.</h2>
            <p className="ecom-innovation-body">
              Every seam, drop shoulder, and sole profile is meticulously prototyped to balance luxury runway architecture with athletic-grade durability.
            </p>

            <div className="ecom-innovation-features-list">
              <div className="ecom-innovation-item">
                <div className="ecom-innovation-icon-box">⚡</div>
                <div>
                  <h4>Zoom Air & Air-Sole Units</h4>
                  <p>Encapsulated pressurized air pockets absorb impact and spring back for all-day urban comfort.</p>
                </div>
              </div>

              <div className="ecom-innovation-item">
                <div className="ecom-innovation-icon-box">🌿</div>
                <div>
                  <h4>Move To Zero Sustainable Cotton</h4>
                  <p>At least 75% recycled organic cotton fibers, reducing virgin plastic waste and carbon emissions.</p>
                </div>
              </div>

              <div className="ecom-innovation-item">
                <div className="ecom-innovation-icon-box">🧵</div>
                <div>
                  <h4>450 GSM Heavyweight French Terry</h4>
                  <p>Dense, structured knit with double-needle flatlock stitching that resists sagging and maintains shape.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Stats Column */}
          <div className="ecom-innovation-stats-box">
            <div className="ecom-stat-card">
              <span className="ecom-stat-num">450<small>GSM</small></span>
              <span className="ecom-stat-label">Ultra-Heavyweight Fleece Density</span>
            </div>
            <div className="ecom-stat-card">
              <span className="ecom-stat-num">100%</span>
              <span className="ecom-stat-label">Authentic Nike Heritage Craftsmanship</span>
            </div>
            <div className="ecom-stat-card">
              <span className="ecom-stat-num">30<small>DAYS</small></span>
              <span className="ecom-stat-label">Hassle-Free Return Guarantee</span>
            </div>
            <div className="ecom-stat-card">
              <span className="ecom-stat-num">3.5k+</span>
              <span className="ecom-stat-label">Verified 5-Star Community Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
