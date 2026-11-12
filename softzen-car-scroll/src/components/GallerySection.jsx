import { useState } from 'react'

const GALLERY_ITEMS = [
  {
    src: '/frames/frame00001.png',
    title: 'Laser-Etched Amber DRL',
    caption: 'Frame 01 · Precision optical signature at dusk',
    featured: true,
  },
  {
    src: '/frames/frame00024.png',
    title: 'Front Quarter Sculpting',
    caption: 'Frame 24 · Aggressive intake & hood contour',
  },
  {
    src: '/frames/frame00043.png',
    title: 'Harbor Side Silhouette',
    caption: 'Frame 43 · Low-slung coupe proportions',
  },
  {
    src: '/frames/frame00065.png',
    title: 'Twilight Stance',
    caption: 'Frame 65 · Matte obsidian light absorption',
  },
  {
    src: '/frames/frame00085.png',
    title: 'Skyline Command',
    caption: 'Frame 85 · Waterfront wide-angle reveal',
  },
]

export default function GallerySection() {
  const [lightboxItem, setLightboxItem] = useState(null)

  return (
    <section className="page-section page-section--alt" id="gallery">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">Visual Archive</div>
            <h2 className="section-title">TWILIGHT IN MOTION.</h2>
          </div>
          <p className="section-lead">
            Captured on location at dusk. Select any frame to inspect surface
            finishes and lighting detail in full resolution.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item) => (
            <button
              key={item.src}
              type="button"
              className={`gallery-card ${item.featured ? 'gallery-card--featured' : ''}`}
              onClick={() => setLightboxItem(item)}
            >
              <img src={item.src} alt={item.title} loading="lazy" />
              <div className="gallery-card-overlay">
                <span className="gallery-card-caption">{item.caption}</span>
                <span className="gallery-card-title">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxItem && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxItem(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <img src={lightboxItem.src} alt={lightboxItem.title} />
            <div className="lightbox-meta">
              <strong>{lightboxItem.title}</strong>
              <span>{lightboxItem.caption}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
