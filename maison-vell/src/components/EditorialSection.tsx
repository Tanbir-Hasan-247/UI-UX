import React from 'react';

export const EditorialSection: React.FC = () => {
  return (
    <section className="editorial-section" id="vision">
      <div className="editorial-container">
        <div className="editorial-grid">
          <div className="editorial-text-col">
            <span className="section-eyebrow wide">THE MAISON PHILOSOPHY</span>
            <h2 className="editorial-title wide">
              ARCHITECTURAL PRECISION.
              <br />
              TACTILE SENSUALITY.
            </h2>
            <div className="editorial-quote-box">
              <p className="editorial-quote">
                &ldquo;We do not merely dress the silhouette; we create space around it.
                Every seam is calculated to honor organic human movement while preserving
                the pristine geometry of modern couture.&rdquo;
              </p>
              <span className="editorial-signoff wide">
                HÉLÈNE VELL — CREATIVE DIRECTOR, PARIS
              </span>
            </div>

            <p className="editorial-body">
              The Spring Summer 2027 collection challenges traditional couture paradigms.
              By pairing translucent Italian silk organza with heavyweight double-faced
              cashmere and hand-hammered 24k gold hardware, the Maison establishes a new
              lexicon of quiet, uncompromising power.
            </p>

            <div className="editorial-metrics">
              <div className="metric-box">
                <span className="metric-num wide">06</span>
                <span className="metric-label wide">FLAGSHIP LOOKS</span>
              </div>
              <div className="metric-box">
                <span className="metric-num wide">100%</span>
                <span className="metric-label wide">HANDCRAFTED IN ITALY</span>
              </div>
              <div className="metric-box">
                <span className="metric-num wide">480h</span>
                <span className="metric-label wide">ATELIER PLEATING PER PIECE</span>
              </div>
            </div>
          </div>

          <div className="editorial-image-col">
            <div className="editorial-image-wrapper">
              <img
                src="/editorial/editorial-campaign-1.jpg"
                alt="Maison Vell SS27 Campaign"
                className="editorial-main-img"
              />
              <div className="editorial-caption-pill">
                <span className="wide">CAMPAIGN N° 07</span>
                <p>Sculpted Silk in Motion — Photographed at Palais de Tokyo, Paris</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
