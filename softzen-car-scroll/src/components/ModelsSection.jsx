import { useMemo, useState } from 'react'
import { CAR_CATEGORIES, CARS } from '../data/cars'
import AutoImageSlider from './AutoImageSlider'

export default function ModelsSection({ onSelectTrim, onNavigate }) {
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [activeId, setActiveId] = useState(CARS[0].id)
  const [showCompare, setShowCompare] = useState(false)

  const filteredCars = useMemo(() => {
    const base =
      category === 'All'
        ? [...CARS]
        : CARS.filter((car) => car.category === category)

    if (sortBy === 'price-asc') {
      base.sort((a, b) => a.priceBdt - b.priceBdt)
    } else if (sortBy === 'price-desc') {
      base.sort((a, b) => b.priceBdt - a.priceBdt)
    } else if (sortBy === 'power-desc') {
      const hp = (c) => parseInt(c.power.replace(/[^0-9]/g, ''), 10) || 0
      base.sort((a, b) => hp(b) - hp(a))
    }
    return base
  }, [category, sortBy])

  const activeCar =
    filteredCars.find((car) => car.id === activeId) ||
    filteredCars[0] ||
    CARS[0]

  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory)
    const nextList =
      nextCategory === 'All'
        ? CARS
        : CARS.filter((car) => car.category === nextCategory)
    if (nextList.length > 0 && !nextList.some((c) => c.id === activeId)) {
      setActiveId(nextList[0].id)
    }
  }

  return (
    <section className="page-section" id="models">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">
              Curated Inventory · {CARS.length} Vehicles
            </div>
            <h2 className="section-title">Performance &amp; Executive Lineup</h2>
          </div>
          <div className="section-header-right">
            <p className="section-lead">
              Explore {CARS.length} flagship Saloons, luxury SUVs,
              high-performance AMG/M coupés, and all-electric architectures with
              transparent BDT showroom pricing and BRTA registration support.
            </p>
            <button
              type="button"
              className="btn-ghost compare-toggle"
              onClick={() => setShowCompare((prev) => !prev)}
            >
              {showCompare ? 'Hide Spec Comparison' : 'Compare Filtered Models'}
            </button>
          </div>
        </div>

        <div className="models-toolbar">
          <div
            className="category-pills"
            role="tablist"
            aria-label="Vehicle categories"
          >
            {CAR_CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? CARS.length
                  : CARS.filter((c) => c.category === cat).length
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  className={`category-pill ${category === cat ? 'category-pill--active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  <span>{cat}</span>
                  <span className="category-pill-count">{count}</span>
                </button>
              )
            })}
          </div>

          <label className="models-sort-wrap">
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="models-sort-select"
              aria-label="Sort vehicles"
            >
              <option value="featured">Showroom Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="power-desc">Output: Highest HP</option>
            </select>
          </label>
        </div>

        {/* Active Car Spotlight with Auto-Sliding Multi-Angle Imagery */}
        <div className="trim-showcase">
          <div className="trim-media">
            <AutoImageSlider
              key={activeCar.id}
              slides={activeCar.slides}
              badge={activeCar.drivetrain}
              intervalMs={3600}
            />
          </div>

          <div className="trim-details">
            <div className="beat-eyebrow">
              {activeCar.brand} · {activeCar.badge}
            </div>
            <h3 className="trim-title">{activeCar.name}</h3>
            <p className="trim-summary">{activeCar.summary}</p>

            <div className="trim-metrics">
              <div className="trim-metric">
                <span className="trim-metric-val">{activeCar.power}</span>
                <span className="trim-metric-lbl">Peak Output</span>
              </div>
              <div className="trim-metric">
                <span className="trim-metric-val">{activeCar.zeroToSixty}</span>
                <span className="trim-metric-lbl">0–100 km/h</span>
              </div>
              <div className="trim-metric">
                <span className="trim-metric-val">{activeCar.shortPrice}</span>
                <span className="trim-metric-lbl">Ex-Showroom BDT</span>
              </div>
            </div>

            <div className="trim-engine-note">
              <span>Powertrain: {activeCar.engine}</span>
              <span>Top Speed: {activeCar.topSpeed}</span>
            </div>

            <ul className="trim-highlights">
              {activeCar.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="trim-actions">
              <a
                href="/configurator"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  onSelectTrim?.(activeCar.name)
                  onNavigate?.('/configurator')
                }}
              >
                Configure This Vehicle
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

        {/* Full 14-Car Inventory Grid */}
        <div className="inventory-head">
          <div>
            <span className="beat-eyebrow">Showroom Catalog</span>
            <h3 className="inventory-heading">
              Showing {filteredCars.length}{' '}
              {filteredCars.length === 1 ? 'Vehicle' : 'Vehicles'}
            </h3>
          </div>
          <span className="inventory-hint">
            Select any vehicle below to inspect multi-angle auto-slider &amp;
            specifications
          </span>
        </div>

        <div className="car-catalog-grid">
          {filteredCars.map((car) => {
            const isSelected = car.id === activeCar.id
            const cover = car.slides[0]
            return (
              <article
                key={car.id}
                className={`car-card ${isSelected ? 'car-card--active' : ''}`}
              >
                <button
                  type="button"
                  className="car-card-media-btn"
                  onClick={() => {
                    setActiveId(car.id)
                    document
                      .getElementById('models')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  aria-label={`Inspect ${car.name}`}
                >
                  <img
                    src={cover.src}
                    alt={car.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = cover.fallback
                    }}
                  />
                  <span className="car-card-cat">{car.category}</span>
                  <span className="car-card-badge">{car.badge}</span>
                </button>

                <div className="car-card-body">
                  <div className="car-card-brand">{car.brand}</div>
                  <h4 className="car-card-title">{car.name}</h4>

                  <div className="car-card-specs">
                    <span>{car.power}</span>
                    <span>•</span>
                    <span>0–100 in {car.zeroToSixty}</span>
                    <span>•</span>
                    <span>{car.drivetrain}</span>
                  </div>

                  <div className="car-card-footer">
                    <div>
                      <span className="car-card-price-lbl">Ex-Showroom</span>
                      <strong className="car-card-price">
                        {car.shortPrice}
                      </strong>
                    </div>
                    <div className="car-card-btns">
                      <button
                        type="button"
                        className="car-card-inspect-btn"
                        onClick={() => setActiveId(car.id)}
                      >
                        {isSelected ? 'Selected' : 'Inspect'}
                      </button>
                      <a
                        href="/configurator"
                        className="car-card-config-btn"
                        onClick={(e) => {
                          e.preventDefault()
                          onSelectTrim?.(car.name)
                          onNavigate?.('/configurator')
                        }}
                      >
                        Build
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {showCompare && (
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Category</th>
                  <th>Powertrain</th>
                  <th>Output</th>
                  <th>0–100 km/h</th>
                  <th>Top Speed</th>
                  <th>Drivetrain</th>
                  <th>Price (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map((car) => (
                  <tr
                    key={car.id}
                    className={
                      car.id === activeCar.id ? 'compare-row--active' : ''
                    }
                  >
                    <td>{car.name}</td>
                    <td>{car.category}</td>
                    <td>{car.engine}</td>
                    <td>{car.power}</td>
                    <td>{car.zeroToSixty}</td>
                    <td>{car.topSpeed}</td>
                    <td>{car.drivetrain}</td>
                    <td className="compare-price">{car.priceFormatted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
