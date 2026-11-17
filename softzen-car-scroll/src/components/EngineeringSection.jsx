import { useState } from 'react'
import AutoImageSlider from './AutoImageSlider'

const SPECS = [
  {
    tag: 'Powertrain',
    value: '3.0L I6 / 4.4L V8',
    desc: 'Twin-turbocharged engines delivering instantaneous torque across the entire rev band.',
  },
  {
    tag: 'Output',
    value: '503 – 1,020 HP',
    desc: 'Calibrated powertrains paired with 8-speed M Steptronic, PDK, or tri-motor inverters.',
  },
  {
    tag: 'Acceleration',
    value: '1.99 – 3.4s',
    desc: 'Launch-controlled sprint performance with rear-biased active torque vectoring.',
  },
  {
    tag: 'Chassis',
    value: '50 : 50',
    desc: 'Balanced axle weight distribution with adaptive dampers and carbon-ceramic brakes.',
  },
]

const ENGINEERING_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1631828919462-3a4054d88eac?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00001.png',
    label: '01 / Forged Closed-Deck Powertrain',
    detail:
      'Twin mono-scroll turbochargers, 350-bar high-precision direct injection, and forged internals engineered for sustained track boost.',
    metric: '7,200 RPM',
    type: 'exterior',
  },
  {
    src: 'https://images.unsplash.com/photo-1632993950443-b33c4cccddbf?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00043.png',
    label: '02 / Carbon-Ceramic Braking Hardware',
    detail:
      '400mm cross-drilled carbon-ceramic discs with 6-piston fixed calipers reduce unsprung mass by 14 kg and eliminate thermal fade.',
    metric: '-14 kg Unsprung',
    type: 'exterior',
  },
  {
    src: 'https://images.unsplash.com/photo-1728415969478-f9b4d700478e?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00024.png',
    label: '03 / Wind-Tunnel CFRP Aerodynamics',
    detail:
      'Carbon-fiber roof panels, active kidney air-flaps, and rear underbody diffusers generate balanced high-speed downforce.',
    metric: '0.28 Cd',
    type: 'exterior',
  },
  {
    src: 'https://images.unsplash.com/photo-1619022975927-b37c4982cc49?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00065.png',
    label: '04 / Staggered Forged Wheel Geometry',
    detail:
      '19"/20" and 20"/21" staggered forged aluminum assemblies maximize lateral cornering grip while sharpening turn-in feedback.',
    metric: '1.35 G Lateral',
    type: 'exterior',
  },
  {
    src: 'https://images.unsplash.com/photo-1735879254701-e26b19bbf694?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    label: '05 / Curved Live Telemetry Cockpit',
    detail:
      'Real-time tire temperature, G-force vectoring, boost pressure, and 10-stage traction presets projected directly in the driver sightline.',
    metric: '10-Stage M TC',
    type: 'interior',
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
  const [activeSlide, setActiveSlide] = useState(ENGINEERING_SLIDES[0])
  const mode = DRIVE_MODES.find((m) => m.id === modeId) || DRIVE_MODES[1]

  return (
    <section className="specs-section" id="engineering">
      <div className="specs-container">
        <div className="specs-header">
          <div>
            <div className="beat-eyebrow">Technical Specifications</div>
            <h2>Engineered Without Compromise</h2>
          </div>
          <p>
            Every intake, chassis brace, and suspension geometry is tuned for
            driver feedback—balancing daily poise with relentless circuit pace.
          </p>
        </div>

        {/* Auto-Sliding Engineering Hardware Showcase */}
        <div className="eng-slider-card">
          <div className="eng-slider-media">
            <AutoImageSlider
              slides={ENGINEERING_SLIDES}
              badge="Motorsport Architecture"
              intervalMs={4200}
              onSlideChange={(slide) => setActiveSlide(slide)}
            />
          </div>
          <div className="eng-slider-info">
            <div className="beat-eyebrow">Live Architecture Focus</div>
            <h3 className="eng-slider-title">{activeSlide.label}</h3>
            <p className="eng-slider-desc">{activeSlide.detail}</p>
            <div className="eng-slider-stat">
              <span>Key Benchmark</span>
              <strong>{activeSlide.metric}</strong>
            </div>
          </div>
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
              <h3 className="telemetry-title">Drive Mode Telemetry</h3>
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
