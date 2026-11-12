export default function PageHeader({ eyebrow, title, subtitle, breadcrumb, onNavigate }) {
  return (
    <section className="page-hero-banner">
      <div className="section-container">
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
        <div className="beat-eyebrow">{eyebrow}</div>
        <h1 className="page-hero-title">{title}</h1>
        <p className="page-hero-sub">{subtitle}</p>
      </div>
    </section>
  )
}
