import { useState } from 'react'

const GALLERY_ITEMS = [
  {
    src: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    category: 'Exterior',
    title: 'Shadow Edition Stance',
    caption: 'Exterior · Matte obsidian three-quarter profile',
    featured: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1735879254701-e26b19bbf694?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00043.png',
    category: 'Cockpit',
    title: 'Driver-Focused Cockpit',
    caption: 'Cockpit · Digital cluster & sculpted console',
  },
  {
    src: 'https://images.unsplash.com/photo-1736482582949-da714b927791?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00065.png',
    category: 'Cockpit',
    title: 'M-Spec Steering & Paddles',
    caption: 'Cockpit · Carbon-trimmed tactile controls',
  },
  {
    src: 'https://images.unsplash.com/photo-1728415969478-f9b4d700478e?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00024.png',
    category: 'Exterior',
    title: 'Twilight Aero Silhouette',
    caption: 'Exterior · Track-calibrated stance',
  },
  {
    src: '/frames/frame00001.png',
    fallback: '/frames/frame00001.png',
    category: 'Details',
    title: 'Laser-Etched Amber DRL',
    caption: 'Details · Precision optical signature at dusk',
  },
]

const CATEGORIES = ['All', 'Exterior', 'Cockpit', 'Details']

export default function GallerySection() {
  const [category, setCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredItems =
    category === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === category)

  const activeItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  const handlePrev = () => {
    setLightboxIndex((idx) =>
      idx === 0 ? filteredItems.length - 1 : idx - 1,
    )
  }

  const handleNext = () => {
    setLightboxIndex((idx) =>
      idx === filteredItems.length - 1 ? 0 : idx + 1,
    )
  }

  return (
    <section className="page-section page-section--alt" id="gallery">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">Visual Archive</div>
            <h2 className="section-title">TWILIGHT IN MOTION.</h2>
          </div>
          <div className="section-header-right">
            <p className="section-lead">
              Explore exterior lines, driver cockpit craftsmanship, and optical
              details in full resolution.
            </p>
            <div className="gallery-filters" role="tablist" aria-label="Gallery filter">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  className={`gallery-filter-btn ${category === cat ? 'gallery-filter-btn--active' : ''}`}
                  onClick={() => {
                    setCategory(cat)
                    setLightboxIndex(null)
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="gallery-grid">
          {filteredItems.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              className={`gallery-card ${item.featured && category === 'All' ? 'gallery-card--featured' : ''}`}
              onClick={() => setLightboxIndex(idx)}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = item.fallback
                }}
              />
              <div className="gallery-card-overlay">
                <span className="gallery-card-caption">{item.caption}</span>
                <span className="gallery-card-title">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeItem && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-nav--prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-nav--next"
              onClick={handleNext}
              aria-label="Next image"
            >
              ›
            </button>
            <img
              src={activeItem.src}
              alt={activeItem.title}
              onError={(e) => {
                e.currentTarget.src = activeItem.fallback
              }}
            />
            <div className="lightbox-meta">
              <strong>{activeItem.title}</strong>
              <span>{activeItem.caption}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
