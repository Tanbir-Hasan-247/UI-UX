import { useEffect, useState } from 'react'
import { CARS } from '../data/cars'
import AutoImageSlider from './AutoImageSlider'

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

function formatBdt(amount) {
  return `৳${amount.toLocaleString('en-IN')}`
}

const FEATURED_CONFIG_IDS = [
  'mercedes-s-class',
  'mercedes-amg-g63',
  'bmw-m4-competition',
  'porsche-911-carrera-gts',
  'range-rover-autobiography',
  'mercedes-eqs-saloon',
]

export default function ConfiguratorSection({
  selectedTrim,
  onSelectTrim,
  onLockBuild,
  onPriceChange,
  onNavigate,
}) {
  const [paintId, setPaintId] = useState('obsidian')
  const [wheelId, setWheelId] = useState('forged-20')
  const [interiorId, setInteriorId] = useState('merino')
  const [viewMode, setViewMode] = useState('exterior')

  const activeCar =
    CARS.find((c) => c.name === selectedTrim) || CARS[0]
  const paint = PAINTS.find((p) => p.id === paintId) || PAINTS[0]
  const wheel = WHEELS.find((w) => w.id === wheelId) || WHEELS[0]
  const interior = INTERIORS.find((i) => i.id === interiorId) || INTERIORS[0]

  const totalBdt =
    activeCar.priceBdt + paint.price + wheel.price + interior.price

  useEffect(() => {
    onPriceChange?.(totalBdt)
  }, [totalBdt, onPriceChange])

  const handleCarChange = (nextId) => {
    const found = CARS.find((c) => c.id === nextId)
    if (found) onSelectTrim?.(found.name)
  }

  const handleReserveBuild = () => {
    const summary = `${activeCar.name} · ${paint.name} · ${wheel.name} · ${interior.name} (${formatBdt(totalBdt)})`
    onLockBuild?.(summary)
    onNavigate?.('/reserve')
  }

  return (
    <section className="page-section page-section--alt" id="configurator">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">Bespoke Studio · Bangladesh</div>
            <h2 className="section-title">Tailor Your Specification</h2>
          </div>
          <p className="section-lead">
            Choose any vehicle from our {CARS.length}-car inventory, inspect
            auto-sliding studio angles, and customize finish, wheels, and cabin
            trim in real time.
          </p>
        </div>

        {/* Model Selector Strip */}
        <div className="config-model-bar">
          <label className="config-model-select-wrap">
            <span className="config-model-label">Active Vehicle Model</span>
            <select
              value={activeCar.id}
              onChange={(e) => handleCarChange(e.target.value)}
              className="config-model-select"
              aria-label="Select vehicle to configure"
            >
              {CARS.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.name} — {car.shortPrice} ({car.power})
                </option>
              ))}
            </select>
          </label>
          <div className="config-model-pills">
            {FEATURED_CONFIG_IDS.map((id) => {
              const car = CARS.find((c) => c.id === id)
              if (!car) return null
              const shortLabel = car.name
                .replace('Mercedes-Benz ', '')
                .replace('Mercedes-AMG ', 'AMG ')
                .replace('4MATIC+', '')
                .replace('4MATIC', '')
                .trim()
              return (
                <button
                  key={car.id}
                  type="button"
                  className={`config-model-pill ${car.id === activeCar.id ? 'config-model-pill--active' : ''}`}
                  onClick={() => handleCarChange(car.id)}
                >
                  {shortLabel}
                </button>
              )
            })}
          </div>
        </div>

        <div className="config-layout">
          <div className="config-stage">
            <div className="config-image-wrap">
              <AutoImageSlider
                key={activeCar.id}
                slides={activeCar.slides}
                preferredType={viewMode}
                imageFilter={paint.filter}
                intervalMs={4000}
                badge={
                  <span className="config-swatch-inline">
                    <span
                      className="swatch-dot"
                      style={{
                        backgroundColor:
                          viewMode === 'exterior' ? paint.hex : interior.hex,
                      }}
                    />
                    {viewMode === 'exterior' ? paint.name : interior.name}
                  </span>
                }
                topRightSlot={
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
                }
              />
            </div>

            <div className="config-summary-bar">
              <div>
                <div className="config-summary-label">Selected Build</div>
                <div className="config-summary-title">
                  {activeCar.name} — {paint.name}
                </div>
                <div className="config-summary-sub">
                  {activeCar.power} · {activeCar.zeroToSixty} (0–100) ·{' '}
                  {activeCar.drivetrain}
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
                <span>01 / Exterior Finish</span>
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
                <span>02 / Forged Wheel Architecture</span>
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
                <span>03 / Cabin Upholstery</span>
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
