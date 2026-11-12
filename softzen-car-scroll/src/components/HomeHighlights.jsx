const SHOWCASE_CARDS = [
  {
    route: '/models',
    tag: '01 / Lineup',
    title: 'Three Distinct Specifications',
    desc: 'Compare Shadow Edition, Competition Track, and Grand Tourer trims with full performance telemetry.',
    image:
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1000&q=85',
    fallback: '/frames/frame00085.png',
    cta: 'Explore Models',
  },
  {
    route: '/configurator',
    tag: '02 / Bespoke Studio',
    title: 'Tailor Your Shadow',
    desc: 'Select exterior finishes, forged wheel packages, and Merino or Alcantara cockpit trims in USD or BDT.',
    image:
      'https://images.unsplash.com/photo-1570274419210-bcbb11aa8f73?auto=format&fit=crop&w=1000&q=85',
    fallback: '/frames/frame00043.png',
    cta: 'Open Configurator',
  },
  {
    route: '/gallery',
    tag: '03 / Visual Archive',
    title: 'Cockpit & Twilight Details',
    desc: 'Inspect carbon-trimmed interiors, forged hardware, and laser-etched amber optics in high resolution.',
    image:
      'https://images.unsplash.com/photo-1735879254701-e26b19bbf694?auto=format&fit=crop&w=1000&q=85',
    fallback: '/frames/frame00001.png',
    cta: 'View Gallery',
  },
]

export default function HomeHighlights({ onNavigate }) {
  return (
    <section className="page-section home-highlights">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">ACI Motors Flagship</div>
            <h2 className="section-title">CURATED PERFORMANCE EXPERIENCE.</h2>
          </div>
          <p className="section-lead">
            Navigate dedicated studios for trim comparisons, bespoke
            configuration, EMI planning, and private showroom bookings.
          </p>
        </div>

        <div className="home-cards-grid">
          {SHOWCASE_CARDS.map((card) => (
            <article key={card.route} className="home-card">
              <div className="home-card-media">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = card.fallback
                  }}
                />
                <span className="home-card-tag">{card.tag}</span>
              </div>
              <div className="home-card-body">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <a
                  href={card.route}
                  className="home-card-link"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigate?.(card.route)
                  }}
                >
                  {card.cta} <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="home-cta-banner">
          <div>
            <div className="beat-eyebrow">Ownership &amp; Allocation</div>
            <h3>Ready to experience the M4 Shadow Edition in person?</h3>
            <p>
              Calculate your monthly EMI plan or schedule an accompanied private
              test drive at our Dhaka, Chattogram, or Sylhet lounges.
            </p>
          </div>
          <div className="home-cta-actions">
            <a
              href="/finance"
              className="btn-ghost"
              onClick={(e) => {
                e.preventDefault()
                onNavigate?.('/finance')
              }}
            >
              EMI Estimator
            </a>
            <a
              href="/reserve"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault()
                onNavigate?.('/reserve')
              }}
            >
              Book Private Drive
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
