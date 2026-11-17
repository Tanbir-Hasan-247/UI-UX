import { useCallback, useEffect, useState } from 'react'

const GALLERY_ITEMS = [
  // ==========================================
  // SALOON & SEDAN
  // ==========================================
  {
    src: 'https://images.unsplash.com/photo-1616591938133-8d6fac01df84?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    category: 'Saloon & Sedan',
    title: 'Mercedes-Benz S 450 4MATIC',
    caption: 'Saloon & Sedan · Obsidian Black flagship stance',
    featured: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00043.png',
    category: 'Saloon & Sedan',
    title: 'Digital Light Optics & Louver Grille',
    caption: 'Saloon & Sedan · 1.3M micro-mirror precision beam',
  },
  {
    src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    category: 'Saloon & Sedan',
    title: 'BMW 735i Pure Excellence',
    caption: 'Saloon & Sedan · Executive lounge long-wheelbase stance',
  },
  {
    src: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00043.png',
    category: 'Saloon & Sedan',
    title: 'Audi A8 L 55 TFSI quattro',
    caption: 'Saloon & Sedan · Mythos Black singleframe architecture',
  },

  // ==========================================
  // SUV & OFF-ROADER
  // ==========================================
  {
    src: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    category: 'SUV & Off-Roader',
    title: 'Mercedes-AMG G 63 G-Wagon',
    caption: 'SUV & Off-Roader · Night Black Magno twin side pipes',
    featured: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1549632891-a0bea6d0355b?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    category: 'SUV & Off-Roader',
    title: 'Range Rover Autobiography LWB',
    caption: 'SUV & Off-Roader · Floating roof & all-terrain air ride',
  },
  {
    src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00043.png',
    category: 'SUV & Off-Roader',
    title: 'BMW X7 xDrive40i M Sport',
    caption: 'SUV & Off-Roader · 7-seater executive panoramic lounge',
  },
  {
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    category: 'SUV & Off-Roader',
    title: 'Porsche Cayenne GTS',
    caption: 'SUV & Off-Roader · Carmine Red Sport Chrono poise',
  },

  // ==========================================
  // COUPÉ & SPORTS
  // ==========================================
  {
    src: 'https://images.unsplash.com/photo-1666195782998-5189c6a40793?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    category: 'Coupé & Sports',
    title: 'Mercedes-AMG GT 63 4MATIC+ Coupé',
    caption: 'Coupé & Sports · Panamericana aero active rear wing',
    featured: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    category: 'Coupé & Sports',
    title: 'BMW M4 Competition Coupé',
    caption: 'Coupé & Sports · Isle of Man Green carbon-roof profile',
  },
  {
    src: 'https://images.unsplash.com/photo-1602200059552-39ed78989991?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    category: 'Coupé & Sports',
    title: 'Porsche 911 Carrera GTS Coupé',
    caption: 'Coupé & Sports · Twin-turbo flat-six rear-engine balance',
  },
  {
    src: 'https://images.unsplash.com/photo-1792683472009-3b3339c22bd4?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00043.png',
    category: 'Coupé & Sports',
    title: 'Audi RS 7 Sportback performance',
    caption: 'Coupé & Sports · Nardo Grey widebody quattro stance',
  },

  // ==========================================
  // ALL-ELECTRIC
  // ==========================================
  {
    src: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00085.png',
    category: 'All-Electric',
    title: 'Mercedes-Benz EQS 450+ Saloon',
    caption: 'All-Electric · 0.20 Cd One-Bow aero architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00043.png',
    category: 'All-Electric',
    title: 'Porsche Taycan 4S',
    caption: 'All-Electric · 800V dual-motor high-voltage performance',
  },

  // ==========================================
  // COCKPIT & CRAFT
  // ==========================================
  {
    src: 'https://images.unsplash.com/photo-1662316203444-9edaa9b76eb4?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00065.png',
    category: 'Cockpit & Craft',
    title: 'Executive Nappa Leather Lounge',
    caption: 'Cockpit & Craft · Ambient active light & MBUX OLED console',
  },
  {
    src: 'https://images.unsplash.com/photo-1735879254701-e26b19bbf694?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00065.png',
    category: 'Cockpit & Craft',
    title: 'Driver-Centric M Cockpit',
    caption: 'Cockpit & Craft · Curved digital telemetry & carbon console',
  },
  {
    src: 'https://images.unsplash.com/photo-1631828919462-3a4054d88eac?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00001.png',
    category: 'Cockpit & Craft',
    title: 'Handcrafted AMG 4.0L V8 Biturbo',
    caption: 'Cockpit & Craft · Affalterbach "One Man, One Engine" plaque',
  },
  {
    src: 'https://images.unsplash.com/photo-1632993950443-b33c4cccddbf?auto=format&fit=crop&w=1400&q=85',
    fallback: '/frames/frame00024.png',
    category: 'Cockpit & Craft',
    title: '21" Forged Monoblock & Ceramic Rotors',
    caption: 'Cockpit & Craft · 6-piston fixed caliper braking assembly',
  },
]

const CATEGORIES = [
  'All',
  'Saloon & Sedan',
  'SUV & Off-Roader',
  'Coupé & Sports',
  'All-Electric',
  'Cockpit & Craft',
]

export default function GallerySection() {
  const [category, setCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredItems =
    category === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === category)

  const activeItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  const handlePrev = useCallback(() => {
    setLightboxIndex((idx) =>
      idx === null ? null : idx === 0 ? filteredItems.length - 1 : idx - 1,
    )
  }, [filteredItems.length])

  const handleNext = useCallback(() => {
    setLightboxIndex((idx) =>
      idx === null ? null : idx === filteredItems.length - 1 ? 0 : idx + 1,
    )
  }, [filteredItems.length])

  useEffect(() => {
    if (lightboxIndex === null) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIndex, handlePrev, handleNext])

  return (
    <section className="page-section page-section--alt" id="gallery">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">
              Visual Archive · {GALLERY_ITEMS.length} Frames
            </div>
            <h2 className="section-title">Flagship Fleet &amp; Atelier Gallery</h2>
          </div>
          <div className="section-header-right">
            <p className="section-lead">
              Explore {GALLERY_ITEMS.length} high-resolution frames across
              executive saloons, luxury off-roaders, precision coupés,
              all-electric architecture, and bespoke cockpit craftsmanship.
            </p>
            <div
              className="gallery-filters"
              role="tablist"
              aria-label="Gallery filter"
            >
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

        <div className="gallery-grid gallery-grid--expanded">
          {filteredItems.map((item, idx) => (
            <button
              key={`${item.src}-${idx}`}
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
              <div>
                <strong>{activeItem.title}</strong>
                <span className="lightbox-caption"> — {activeItem.caption}</span>
              </div>
              <span className="lightbox-counter">
                {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(filteredItems.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
