import { useState } from 'react'

const SPECS = [
  {
    tag: 'Powertrain',
    value: '3.0L I6',
    desc: 'Twin-turbocharged inline-six delivering instantaneous torque across the entire rev band.',
  },
  {
    tag: 'Output',
    value: '503 HP',
    desc: 'Peak horsepower paired with an 8-speed M Steptronic transmission and Drivelogic.',
  },
  {
    tag: 'Acceleration',
    value: '3.4 SEC',
    desc: 'Launch-controlled 0–60 mph sprint with rear-biased M xDrive traction.',
  },
  {
    tag: 'Chassis',
    value: '50:50',
    desc: 'Near-perfect weight distribution with adaptive M suspension and carbon-ceramic brakes.',
  },
]

const DRIVE_MODES = [
  {
    id: 'comfort',
    name: 'Comfort',
    subtitle: 'Effortless urban & highway refinement',
    metrics: [
      { label: 'Throttle Mapping', pct: 55 },
      { label: 'Damper Stiffness', pct: 40 },
      { label: 'Exhaust Valve Opening', pct: 35 },
      { label: 'Rear Differential Lock', pct: 45 },
    ],
  },
  {
    id: 'sport',
    name: 'Sport Plus',
    subtitle: 'Sharpened shift points & active acoustics',
    metrics: [
      { label: 'Throttle Mapping', pct: 82 },
      { label: 'Damper Stiffness', pct: 74 },
      { label: 'Exhaust Valve Opening', pct: 85 },
      { label: 'Rear Differential Lock', pct: 78 },
    ],
  },
  {
    id: 'track',
    name: 'M Track',
    subtitle: 'Unfiltered circuit telemetry & peak boost',
    metrics: [
      { label: 'Throttle Mapping', pct: 100 },
      { label: 'Damper Stiffness', pct: 96 },
      { label: 'Exhaust Valve Opening', pct: 100 },
      { label: 'Rear Differential Lock', pct: 95 },
    ],
  },
]

export default function EngineeringSection() {
  const [modeId, setModeId] = useState('sport')
  const mode = DRIVE_MODES.find((m) => m.id === modeId) || DRIVE_MODES[1]

  return (
    <section className="specs-section" id="engineering">
      <div className="specs-container">
        <div className="specs-header">
          <div>
            <div className="beat-eyebrow">Technical Specifications</div>
            <h2>ENGINEERED WITHOUT COMPROMISE.</h2>
          </div>
          <p>
            Every line, intake, and suspension geometry is tuned for driver
            feedback—balancing daily poise with relentless circuit pace.
          </p>
        </div>

        <div className="specs-grid">
          {SPECS.map((spec) => (
            <article key={spec.tag} className="spec-card">
              <div className="spec-card-tag">{spec.tag}</div>
              <div className="spec-card-value">{spec.value}</div>
              <p className="spec-card-desc">{spec.desc}</p>
            </article>
          ))}
        </div>

        <div className="telemetry-panel">
          <div className="telemetry-head">
            <div>
              <div className="beat-eyebrow">Adaptive Dynamics</div>
              <h3 className="telemetry-title">DRIVE MODE TELEMETRY</h3>
              <p className="telemetry-sub">{mode.subtitle}</p>
            </div>
            <div className="mode-pills" role="tablist" aria-label="Drive modes">
              {DRIVE_MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={m.id === modeId}
                  className={`mode-pill ${m.id === modeId ? 'mode-pill--active' : ''}`}
                  onClick={() => setModeId(m.id)}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          <div className="telemetry-bars">
            {mode.metrics.map((metric) => (
              <div key={metric.label} className="telemetry-row">
                <div className="telemetry-row-top">
                  <span>{metric.label}</span>
                  <span className="telemetry-pct">{metric.pct}%</span>
                </div>
                <div className="telemetry-track">
                  <div
                    className="telemetry-fill"
                    style={{ width: `${metric.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
