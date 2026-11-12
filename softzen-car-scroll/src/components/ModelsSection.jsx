import { useState } from 'react'

const TRIMS = [
  {
    id: 'shadow',
    name: 'M4 Shadow Edition',
    badge: 'Flagship',
    price: '$84,900',
    power: '503 HP',
    zeroToSixty: '3.4s',
    drivetrain: 'M xDrive AWD',
    image: '/frames/frame00085.png',
    summary:
      'Matte obsidian bodywork, laser-etched amber DRLs, and carbon-reinforced aerodynamics tuned for twilight grand touring.',
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
    price: '$96,400',
    power: '523 HP',
    zeroToSixty: '3.1s',
    drivetrain: 'RWD / M Traction',
    image: '/frames/frame00043.png',
    summary:
      'Stripped-back weight, carbon-ceramic braking hardware, and 10-stage M Traction Control built for apex precision.',
    highlights: [
      'M Carbon Bucket Seats (-21 lbs)',
      'M Carbon Ceramic Brake System',
      'Titanium Exhaust with Quad Matte Tips',
    ],
  },
  {
    id: 'gt',
    name: 'M4 Grand Tourer',
    badge: 'Executive',
    price: '$79,500',
    power: '473 HP',
    zeroToSixty: '3.8s',
    drivetrain: 'Rear-Wheel Drive',
    image: '/frames/frame00001.png',
    summary:
      'Effortless long-distance poise paired with bespoke Merino leather, acoustic glass, and Harman Kardon surround sound.',
    highlights: [
      'Full Merino Leather Acoustic Cabin',
      'Head-Up Display & Driving Assistant Pro',
      '8-Speed M Steptronic with Drivelogic',
    ],
  },
]

export default function ModelsSection({ onSelectTrim }) {
  const [activeId, setActiveId] = useState('shadow')
  const activeTrim = TRIMS.find((t) => t.id === activeId) || TRIMS[0]

  return (
    <section className="page-section" id="models">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">The Lineup</div>
            <h2 className="section-title">CHOOSE YOUR SPECIFICATION.</h2>
          </div>
          <p className="section-lead">
            Three distinct expressions of the ACI Motors Shadow platform—from
            grand touring refinement to uncompromised circuit telemetry.
          </p>
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
              <span className="trim-tab-price">From {trim.price}</span>
            </button>
          ))}
        </div>

        <div className="trim-showcase">
          <div className="trim-media">
            <img src={activeTrim.image} alt={activeTrim.name} loading="lazy" />
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
                <span className="trim-metric-lbl">0–60 MPH</span>
              </div>
              <div className="trim-metric">
                <span className="trim-metric-val">{activeTrim.price}</span>
                <span className="trim-metric-lbl">Starting MSRP</span>
              </div>
            </div>

            <ul className="trim-highlights">
              {activeTrim.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="trim-actions">
              <a
                href="#configurator"
                className="btn-primary"
                onClick={() => onSelectTrim?.(activeTrim.name)}
              >
                Configure This Trim
              </a>
              <a href="#reserve" className="btn-ghost">
                Schedule Viewing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
