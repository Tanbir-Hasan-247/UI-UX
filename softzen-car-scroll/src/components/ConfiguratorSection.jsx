import { useEffect, useState } from 'react'

const PAINTS = [
  { id: 'obsidian', name: 'Matte Obsidian', hex: '#14181f', price: 0, filter: 'none' },
  {
    id: 'gunmetal',
    name: 'Frozen Gunmetal',
    hex: '#475569',
    price: 285000,
    filter: 'brightness(1.14) contrast(0.95)',
  },
  {
    id: 'sapphire',
    name: 'Midnight Sapphire',
    hex: '#1e3a5f',
    price: 220000,
    filter: 'hue-rotate(15deg) saturate(1.25) brightness(1.04)',
  },
  {
    id: 'graphite',
    name: 'Stealth Bronze',
    hex: '#44382c',
    price: 350000,
    filter: 'sepia(0.28) contrast(1.06) brightness(0.98)',
  },
]

const WHEELS = [
  { id: 'forged-20', name: '20" Forged M-Split Black', price: 0 },
  { id: 'aero-21', name: '21" Carbon Aero Bi-Color', price: 380000 },
  { id: 'track-20', name: '20" Center-Lock Satin Gold', price: 550000 },
]

const INTERIORS = [
  { id: 'merino', name: 'Full Merino Black Leather', hex: '#171717', price: 0 },
  { id: 'cognac', name: 'Cognac Saddle Nappa', hex: '#7c3f1d', price: 225000 },
  { id: 'alcantara', name: 'Alcantara Carbon Track', hex: '#27272a', price: 335000 },
]

const EXTERIOR_IMG =
  'https://images.unsplash.com/photo-1570274419210-bcbb11aa8f73?auto=format&fit=crop&w=1400&q=85'
const INTERIOR_IMG =
  'https://images.unsplash.com/photo-1735879254701-e26b19bbf694?auto=format&fit=crop&w=1400&q=85'

const BASE_BDT = 10200000

function formatBdt(amount) {
  return `৳${amount.toLocaleString('en-IN')}`
}

export default function ConfiguratorSection({
  selectedTrim,
  onLockBuild,
  onPriceChange,
  onNavigate,
}) {
  const [paintId, setPaintId] = useState('obsidian')
  const [wheelId, setWheelId] = useState('forged-20')
  const [interiorId, setInteriorId] = useState('merino')
  const [viewMode, setViewMode] = useState('exterior')

  const paint = PAINTS.find((p) => p.id === paintId) || PAINTS[0]
  const wheel = WHEELS.find((w) => w.id === wheelId) || WHEELS[0]
  const interior = INTERIORS.find((i) => i.id === interiorId) || INTERIORS[0]

  const totalBdt = BASE_BDT + paint.price + wheel.price + interior.price

  useEffect(() => {
    onPriceChange?.(totalBdt)
  }, [totalBdt, onPriceChange])

  const handleReserveBuild = () => {
    const summary = `${selectedTrim || 'M4 Shadow Edition'} · ${paint.name} · ${wheel.name} · ${interior.name} (${formatBdt(totalBdt)})`
    onLockBuild?.(summary)
    onNavigate?.('/reserve')
  }

  return (
    <section className="page-section page-section--alt" id="configurator">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">Bespoke Studio · Bangladesh</div>
            <h2 className="section-title">CONFIGURE YOUR SHADOW.</h2>
          </div>
          <p className="section-lead">
            Tailor exterior finish, forged wheel architecture, and cabin trim in
            BDT. Switch between exterior and cockpit views below.
          </p>
        </div>

        <div className="config-layout">
          <div className="config-stage">
            <div className="config-image-wrap">
              <img
                src={viewMode === 'exterior' ? EXTERIOR_IMG : INTERIOR_IMG}
                alt={`ACI Motors ${viewMode === 'exterior' ? paint.name : interior.name}`}
                style={{
                  filter: viewMode === 'exterior' ? paint.filter : 'none',
                }}
                onError={(e) => {
                  e.currentTarget.src = '/frames/frame00085.png'
                }}
              />
              <div className="config-stage-tag">
                <span
                  className="swatch-dot"
                  style={{
                    backgroundColor:
                      viewMode === 'exterior' ? paint.hex : interior.hex,
                  }}
                />
                <span>
                  {viewMode === 'exterior' ? paint.name : interior.name}
                </span>
              </div>

              <div className="config-view-switch">
                <button
                  type="button"
                  className={`view-switch-btn ${viewMode === 'exterior' ? 'view-switch-btn--active' : ''}`}
                  onClick={() => setViewMode('exterior')}
                >
                  Exterior
                </button>
                <button
                  type="button"
                  className={`view-switch-btn ${viewMode === 'interior' ? 'view-switch-btn--active' : ''}`}
                  onClick={() => setViewMode('interior')}
                >
                  Cockpit
                </button>
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
                <span className="config-price-label">Ex-Showroom Dhaka</span>
                <span className="config-price-val">{formatBdt(totalBdt)}</span>
              </div>
            </div>
          </div>

          <div className="config-controls">
            <div className="config-group">
              <div className="config-group-head">
                <span>01 / Exterior Paint</span>
                <span className="config-addon">
                  {paint.price === 0 ? 'Included' : `+${formatBdt(paint.price)}`}
                </span>
              </div>
              <div className="swatch-grid">
                {PAINTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`swatch-btn ${p.id === paintId ? 'swatch-btn--active' : ''}`}
                    onClick={() => {
                      setPaintId(p.id)
                      setViewMode('exterior')
                    }}
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
                  {wheel.price === 0 ? 'Included' : `+${formatBdt(wheel.price)}`}
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
                      {w.price === 0 ? 'STD' : `+${formatBdt(w.price)}`}
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
                    : `+${formatBdt(interior.price)}`}
                </span>
              </div>
              <div className="swatch-grid">
                {INTERIORS.map((i) => (
                  <button
                    key={i.id}
                    type="button"
                    className={`swatch-btn ${i.id === interiorId ? 'swatch-btn--active' : ''}`}
                    onClick={() => {
                      setInteriorId(i.id)
                      setViewMode('interior')
                    }}
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
