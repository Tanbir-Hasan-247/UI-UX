import { useState } from 'react'

const PAINTS = [
  { id: 'obsidian', name: 'Matte Obsidian', hex: '#14181f', price: 0, filter: 'none' },
  {
    id: 'gunmetal',
    name: 'Frozen Gunmetal',
    hex: '#475569',
    price: 2400,
    filter: 'brightness(1.14) contrast(0.95)',
  },
  {
    id: 'sapphire',
    name: 'Midnight Sapphire',
    hex: '#1e3a5f',
    price: 1850,
    filter: 'hue-rotate(15deg) saturate(1.25) brightness(1.04)',
  },
  {
    id: 'graphite',
    name: 'Stealth Bronze',
    hex: '#44382c',
    price: 2950,
    filter: 'sepia(0.28) contrast(1.06) brightness(0.98)',
  },
]

const WHEELS = [
  { id: 'forged-20', name: '20" Forged M-Split Black', price: 0 },
  { id: 'aero-21', name: '21" Carbon Aero Bi-Color', price: 3200 },
  { id: 'track-20', name: '20" Center-Lock Satin Gold', price: 4600 },
]

const INTERIORS = [
  { id: 'merino', name: 'Full Merino Black Leather', hex: '#171717', price: 0 },
  { id: 'cognac', name: 'Cognac Saddle Nappa', hex: '#7c3f1d', price: 1900 },
  { id: 'alcantara', name: 'Alcantara Carbon Track', hex: '#27272a', price: 2800 },
]

const BASE_MSRP = 84900

export default function ConfiguratorSection({ selectedTrim, onLockBuild }) {
  const [paintId, setPaintId] = useState('obsidian')
  const [wheelId, setWheelId] = useState('forged-20')
  const [interiorId, setInteriorId] = useState('merino')

  const paint = PAINTS.find((p) => p.id === paintId) || PAINTS[0]
  const wheel = WHEELS.find((w) => w.id === wheelId) || WHEELS[0]
  const interior = INTERIORS.find((i) => i.id === interiorId) || INTERIORS[0]

  const total = BASE_MSRP + paint.price + wheel.price + interior.price

  const handleReserveBuild = () => {
    const summary = `${selectedTrim || 'M4 Shadow Edition'} · ${paint.name} · ${wheel.name} · ${interior.name} ($${total.toLocaleString()})`
    onLockBuild?.(summary)
    const el = document.getElementById('reserve')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="page-section page-section--alt" id="configurator">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">Bespoke Studio</div>
            <h2 className="section-title">CONFIGURE YOUR SHADOW.</h2>
          </div>
          <p className="section-lead">
            Tailor exterior finish, forged wheel architecture, and cabin trim.
            Lock your build to prioritize showroom allocation.
          </p>
        </div>

        <div className="config-layout">
          <div className="config-stage">
            <div className="config-image-wrap">
              <img
                src="/frames/frame00085.png"
                alt={`ACI Motors ${paint.name}`}
                style={{ filter: paint.filter }}
              />
              <div className="config-stage-tag">
                <span
                  className="swatch-dot"
                  style={{ backgroundColor: paint.hex }}
                />
                <span>{paint.name}</span>
              </div>
            </div>

            <div className="config-summary-bar">
              <div>
                <div className="config-summary-label">Selected Configuration</div>
                <div className="config-summary-title">
                  {selectedTrim || 'M4 Shadow Edition'} — {paint.name}
                </div>
              </div>
              <div className="config-price-block">
                <span className="config-price-label">Estimated MSRP</span>
                <span className="config-price-val">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="config-controls">
            <div className="config-group">
              <div className="config-group-head">
                <span>01 / Exterior Paint</span>
                <span className="config-addon">
                  {paint.price === 0
                    ? 'Included'
                    : `+$${paint.price.toLocaleString()}`}
                </span>
              </div>
              <div className="swatch-grid">
                {PAINTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`swatch-btn ${p.id === paintId ? 'swatch-btn--active' : ''}`}
                    onClick={() => setPaintId(p.id)}
                  >
                    <span
                      className="swatch-circle"
                      style={{ backgroundColor: p.hex }}
                    />
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="config-group">
              <div className="config-group-head">
                <span>02 / Wheel Package</span>
                <span className="config-addon">
                  {wheel.price === 0
                    ? 'Included'
                    : `+$${wheel.price.toLocaleString()}`}
                </span>
              </div>
              <div className="option-stack">
                {WHEELS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    className={`option-row ${w.id === wheelId ? 'option-row--active' : ''}`}
                    onClick={() => setWheelId(w.id)}
                  >
                    <span>{w.name}</span>
                    <span className="option-row-price">
                      {w.price === 0 ? 'STD' : `+$${w.price.toLocaleString()}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="config-group">
              <div className="config-group-head">
                <span>03 / Interior Trim</span>
                <span className="config-addon">
                  {interior.price === 0
                    ? 'Included'
                    : `+$${interior.price.toLocaleString()}`}
                </span>
              </div>
              <div className="swatch-grid">
                {INTERIORS.map((i) => (
                  <button
                    key={i.id}
                    type="button"
                    className={`swatch-btn ${i.id === interiorId ? 'swatch-btn--active' : ''}`}
                    onClick={() => setInteriorId(i.id)}
                  >
                    <span
                      className="swatch-circle"
                      style={{ backgroundColor: i.hex }}
                    />
                    <span>{i.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn-primary config-submit"
              onClick={handleReserveBuild}
            >
              Lock Build &amp; Request Allocation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
