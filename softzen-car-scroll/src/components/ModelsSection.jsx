import { useState } from 'react'

const TRIMS = [
  {
    id: 'shadow',
    name: 'M4 Shadow Edition',
    badge: 'Flagship',
    price: '৳1,02,00,000',
    shortPrice: '৳1.02 Cr',
    power: '503 HP',
    zeroToSixty: '3.4s',
    topSpeed: '290 km/h',
    weight: '1,737 kg',
    drivetrain: 'M xDrive AWD',
    image:
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: '/frames/frame00085.png',
    summary:
      'Matte obsidian bodywork, laser-etched amber DRLs, and carbon-reinforced aerodynamics tuned for Bangladesh highways and twilight grand touring.',
    highlights: [
      'Laserlight Amber Daytime Running Lamps',
      'Carbon-Fiber Roof & Rear Diffuser',
      'Adaptive M Suspension with Active Differential',
    ],
  },
  {
    id: 'track',
    name: 'M4 Competition Track',
    badge: 'Circuit Spec',
    price: '৳1,16,00,000',
    shortPrice: '৳1.16 Cr',
    power: '523 HP',
    zeroToSixty: '3.1s',
    topSpeed: '300 km/h',
    weight: '1,680 kg',
    drivetrain: 'RWD / M Traction',
    image:
      'https://images.unsplash.com/photo-1570274419210-bcbb11aa8f73?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: '/frames/frame00043.png',
    summary:
      'Stripped-back weight, carbon-ceramic braking hardware, and 10-stage M Traction Control built for apex precision.',
    highlights: [
      'M Carbon Bucket Seats (-9.5 kg)',
      'M Carbon Ceramic Brake System',
      'Titanium Exhaust with Quad Matte Tips',
    ],
  },
  {
    id: 'gt',
    name: 'M4 Grand Tourer',
    badge: 'Executive',
    price: '৳95,50,000',
    shortPrice: '৳95.50 Lac',
    power: '473 HP',
    zeroToSixty: '3.8s',
    topSpeed: '280 km/h',
    weight: '1,764 kg',
    drivetrain: 'Rear-Wheel Drive',
    image:
      'https://images.unsplash.com/photo-1742964937391-8839f7f59814?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: '/frames/frame00001.png',
    summary:
      'Effortless long-distance poise paired with bespoke Merino leather, acoustic glass, and Harman Kardon surround sound.',
    highlights: [
      'Full Merino Leather Acoustic Cabin',
      'Head-Up Display & Driving Assistant Pro',
      '8-Speed M Steptronic with Drivelogic',
    ],
  },
]

export default function ModelsSection({ onSelectTrim, onNavigate }) {
  const [activeId, setActiveId] = useState('shadow')
  const [showCompare, setShowCompare] = useState(false)
  const activeTrim = TRIMS.find((t) => t.id === activeId) || TRIMS[0]

  return (
    <section className="page-section" id="models">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">The Lineup</div>
            <h2 className="section-title">CHOOSE YOUR SPECIFICATION.</h2>
          </div>
          <div className="section-header-right">
            <p className="section-lead">
              Three distinct expressions of the ACI Motors Shadow platform—with
              transparent BDT pricing, BRTA registration support, and nationwide care.
            </p>
            <button
              type="button"
              className="btn-ghost compare-toggle"
              onClick={() => setShowCompare((prev) => !prev)}
            >
              {showCompare ? 'Hide Spec Comparison' : 'Compare All Trims'}
            </button>
          </div>
        </div>

        <div className="trim-tabs" role="tablist" aria-label="Vehicle trims">
          {TRIMS.map((trim) => (
            <button
              key={trim.id}
              type="button"
              role="tab"
              aria-selected={trim.id === activeId}
              className={`trim-tab ${trim.id === activeId ? 'trim-tab--active' : ''}`}
              onClick={() => setActiveId(trim.id)}
            >
              <span className="trim-tab-badge">{trim.badge}</span>
              <span className="trim-tab-name">{trim.name}</span>
              <span className="trim-tab-price">
                From {trim.price} ({trim.shortPrice})
              </span>
            </button>
          ))}
        </div>

        <div className="trim-showcase">
          <div className="trim-media">
            <img
              src={activeTrim.image}
              alt={activeTrim.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = activeTrim.fallbackImage
              }}
            />
            <div className="trim-media-badge">{activeTrim.drivetrain}</div>
          </div>

          <div className="trim-details">
            <div className="beat-eyebrow">{activeTrim.badge}</div>
            <h3 className="trim-title">{activeTrim.name}</h3>
            <p className="trim-summary">{activeTrim.summary}</p>

            <div className="trim-metrics">
              <div className="trim-metric">
                <span className="trim-metric-val">{activeTrim.power}</span>
                <span className="trim-metric-lbl">Peak Output</span>
              </div>
              <div className="trim-metric">
                <span className="trim-metric-val">{activeTrim.zeroToSixty}</span>
                <span className="trim-metric-lbl">0–100 km/h</span>
              </div>
              <div className="trim-metric">
                <span className="trim-metric-val">{activeTrim.shortPrice}</span>
                <span className="trim-metric-lbl">Ex-Showroom BDT</span>
              </div>
            </div>

            <ul className="trim-highlights">
              {activeTrim.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="trim-actions">
              <a
                href="/configurator"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  onSelectTrim?.(activeTrim.name)
                  onNavigate?.('/configurator')
                }}
              >
                Configure This Trim
              </a>
              <a
                href="/reserve"
                className="btn-ghost"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate?.('/reserve')
                }}
              >
                Schedule Viewing
              </a>
            </div>
          </div>
        </div>

        {showCompare && (
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Specification</th>
                  {TRIMS.map((t) => (
                    <th key={t.id}>{t.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Horsepower</td>
                  {TRIMS.map((t) => (
                    <td key={t.id}>{t.power}</td>
                  ))}
                </tr>
                <tr>
                  <td>0–100 km/h</td>
                  {TRIMS.map((t) => (
                    <td key={t.id}>{t.zeroToSixty}</td>
                  ))}
                </tr>
                <tr>
                  <td>Top Track Speed</td>
                  {TRIMS.map((t) => (
                    <td key={t.id}>{t.topSpeed}</td>
                  ))}
                </tr>
                <tr>
                  <td>Drivetrain</td>
                  {TRIMS.map((t) => (
                    <td key={t.id}>{t.drivetrain}</td>
                  ))}
                </tr>
                <tr>
                  <td>Curb Weight</td>
                  {TRIMS.map((t) => (
                    <td key={t.id}>{t.weight}</td>
                  ))}
                </tr>
                <tr>
                  <td>Ex-Showroom Price</td>
                  {TRIMS.map((t) => (
                    <td key={t.id} className="compare-price">
                      {t.price}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
