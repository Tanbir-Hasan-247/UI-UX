export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  bgImage,
  bgFallback = '/frames/frame00085.png',
  badge,
  onNavigate,
}) {
  return (
    <section
      className={`page-hero-banner ${bgImage ? 'page-hero-banner--has-bg' : ''}`}
    >
      {bgImage && (
        <div className="page-hero-banner-media" aria-hidden="true">
          <img
            src={bgImage}
            alt=""
            className="page-hero-banner-img"
            loading="eager"
            onError={(e) => {
              if (bgFallback && e.currentTarget.src !== bgFallback) {
                e.currentTarget.src = bgFallback
              }
            }}
          />
          <div className="page-hero-banner-scrim" />
        </div>
      )}

      <div className="section-container page-hero-banner-content">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              onNavigate?.('/')
            }}
          >
            Home
          </a>
          <span aria-hidden="true">/</span>
          <span>{breadcrumb}</span>
        </nav>

        <div className="page-hero-eyebrow-row">
          <div className="beat-eyebrow">{eyebrow}</div>
          {badge && <span className="page-hero-badge">{badge}</span>}
        </div>

        <h1 className="page-hero-title">{title}</h1>
        <p className="page-hero-sub">{subtitle}</p>
      </div>
    </section>
  )
}
