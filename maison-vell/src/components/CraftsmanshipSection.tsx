import React from 'react';

export const CraftsmanshipSection: React.FC = () => {
  const crafts = [
    {
      title: 'COMO SILK & MICRO-PLEATING',
      desc: 'Our fabrics are woven exclusively in Como, Italy. The sunray accordion pleats undergo an ancient heat-setting process requiring over 80 hours per garment to guarantee perpetual fluid resilience.',
      image: '/editorial/editorial-atelier.jpg',
      tag: 'HERITAGE ATELIER',
    },
    {
      title: 'PRECISION TAILORING & BACKSTAGE RIGOR',
      desc: 'Each double-faced cashmere and organza blazer is constructed using floating horsehair canvases, unlined interior bound seams, and blind hand-stitching to ensure second-skin draping.',
      image: '/editorial/editorial-backstage.jpg',
      tag: 'SARTORIAL DISCIPLINE',
    },
    {
      title: 'MOLTEN 24K GILDED HARDWARE',
      desc: 'Buckles, ear cuffs, and waist belts are individually hand-hammered by third-generation goldsmiths in Arezzo, creating organic tactile surfaces that age with timeless character.',
      image: '/products/belt-gold.jpg',
      tag: 'METALLURGIC ARTISTRY',
    },
  ];

  return (
    <section className="craft-section" id="craft">
      <div className="craft-container">
        <div className="craft-header">
          <span className="section-eyebrow wide">SAVOIR-FAIRE</span>
          <h2 className="craft-heading wide">THE ATELIER CRAFTSMANSHIP</h2>
          <p className="craft-subhead">
            Behind the effortless illusion of the runway lies uncompromising artisan discipline.
          </p>
        </div>

        <div className="craft-grid">
          {crafts.map((craft, i) => (
            <div key={i} className="craft-card">
              <div className="craft-img-wrap">
                <img src={craft.image} alt={craft.title} />
                <span className="craft-tag wide">{craft.tag}</span>
              </div>
              <div className="craft-body">
                <h3 className="craft-title wide">{craft.title}</h3>
                <p className="craft-desc">{craft.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
