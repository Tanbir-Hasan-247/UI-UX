import { CARS } from '../data/cars'

const QUICK_LINKS = [
  {
    num: '01',
    title: 'Showroom Fleet',
    sub: 'Browse all 20 curated models',
    route: '/models',
  },
  {
    num: '02',
    title: 'Bespoke Studio',
    sub: 'Configure finish & trim',
    route: '/configurator',
  },
  {
    num: '03',
    title: 'BDT Finance',
    sub: 'Calculate monthly EMI',
    route: '/finance',
  },
  {
    num: '04',
    title: 'Private Lounge',
    sub: 'Dhaka · Ctg · Sylhet',
    route: '/reserve',
  },
]

const RECOMMENDED_IDS = [
  'mercedes-s-class',
  'mercedes-amg-g63',
  'bmw-m4-competition',
  'porsche-911-carrera-gts',
]

const SHOWCASE_CARDS = [
  {
    route: '/models',
    tag: '01 / 20-Vehicle Inventory',
    title: 'Executive & Performance Fleet',
    desc: 'Compare flagship Saloons, luxury SUVs, high-performance AMG/M coupés, and all-electric models with transparent BDT pricing.',
    image:
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1000&q=85',
    fallback: '/frames/frame00085.png',
    cta: 'Explore 20 Models',
  },
  {
    route: '/configurator',
    tag: '02 / Bespoke Studio',
    title: 'Tailored to Your Specification',
    desc: 'Select exterior finishes, forged wheel packages, and Merino or Alcantara cabin trims with real-time BDT calculation.',
    image:
      'https://images.unsplash.com/photo-1570274419210-bcbb11aa8f73?auto=format&fit=crop&w=1000&q=85',
    fallback: '/frames/frame00043.png',
    cta: 'Open Configurator',
  },
  {
    route: '/gallery',
    tag: '03 / Atelier Gallery',
    title: 'Fleet & Cockpit Archive',
    desc: 'Inspect hand-stitched Nappa interiors, Affalterbach twin-turbo V8s, and twilight silhouettes in full-screen resolution.',
    image:
      'https://images.unsplash.com/photo-1735879254701-e26b19bbf694?auto=format&fit=crop&w=1000&q=85',
    fallback: '/frames/frame00001.png',
    cta: 'View Gallery',
  },
]

export default function HomeHighlights({ onNavigate, onSelectTrim }) {
  const recommendedCars = RECOMMENDED_IDS.map((id) =>
    CARS.find((c) => c.id === id),
  ).filter(Boolean)

  return (
    <section className="page-section home-highlights">
      <div className="section-container">
        {/* Mercedes-Benz Style 4-Column Quick Utility Strip */}
        <div className="quick-action-bar" aria-label="Showroom shortcuts">
          {QUICK_LINKS.map((item) => (
            <a
              key={item.route}
              href={item.route}
              className="quick-action-tile"
              onClick={(e) => {
                e.preventDefault()
                onNavigate?.(item.route)
              }}
            >
              <span className="quick-action-num">{item.num}</span>
              <div>
                <strong className="quick-action-title">{item.title}</strong>
                <span className="quick-action-sub">{item.sub}</span>
              </div>
              <span className="quick-action-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>

        {/* Mercedes-Benz Style "Our Recommendations" Flagship Fleet */}
        <div className="section-header home-rec-header">
          <div>
            <div className="beat-eyebrow">Our Recommendations</div>
            <h2 className="section-title">Signature Showroom Arrivals</h2>
          </div>
          <a
            href="/models"
            className="btn-ghost"
            onClick={(e) => {
              e.preventDefault()
              onNavigate?.('/models')
            }}
          >
            View All {CARS.length} Vehicles
          </a>
        </div>

        <div className="rec-grid">
          {recommendedCars.map((car) => {
            const cover = car.slides[0]
            return (
              <article key={car.id} className="rec-card">
                <div className="rec-card-media">
                  <img
                    src={cover.src}
                    alt={car.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = cover.fallback
                    }}
                  />
                  <span className="rec-card-badge">{car.badge}</span>
                </div>
                <div className="rec-card-body">
                  <div className="rec-card-kicker">
                    {car.brand} · {car.category}
                  </div>
                  <h3>{car.name}</h3>
                  <div className="rec-card-specs">
                    <span>{car.power}</span>
                    <span>{car.zeroToSixty}</span>
                    <span>{car.shortPrice}</span>
                  </div>
                  <div className="rec-card-actions">
                    <a
                      href="/configurator"
                      className="rec-link-primary"
                      onClick={(e) => {
                        e.preventDefault()
                        onSelectTrim?.(car.name)
                        onNavigate?.('/configurator')
                      }}
                    >
                      Configure
                    </a>
                    <a
                      href="/models"
                      className="rec-link-secondary"
                      onClick={(e) => {
                        e.preventDefault()
                        onNavigate?.('/models')
                      }}
                    >
                      Discover →
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Editorial Studios Row */}
        <div className="section-header home-studios-header">
          <div>
            <div className="beat-eyebrow">ACI Motors Flagship</div>
            <h2 className="section-title">Digital Showroom Experience</h2>
          </div>
          <p className="section-lead">
            Navigate dedicated studios for trim comparisons, bespoke
            configuration, BDT EMI planning, and private showroom appointments.
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
          <div className="home-cta-banner-media" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1549632891-a0bea6d0355b?auto=format&fit=crop&w=1600&q=85"
              alt=""
              className="home-cta-banner-img"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/frames/frame00085.png'
              }}
            />
            <div className="home-cta-banner-scrim" />
          </div>
          <div className="home-cta-banner-content">
            <div className="beat-eyebrow">Ownership &amp; Allocation</div>
            <h3>Schedule a Private Showroom Viewing</h3>
            <p>
              Calculate your monthly BDT EMI plan or reserve an accompanied
              twilight test drive at our Dhaka, Chattogram, or Sylhet lounges.
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
