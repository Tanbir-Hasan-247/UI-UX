const CURRENT_YEAR = new Date().getFullYear()

export default function Footer({ onNavigate }) {
  const go = (e, route) => {
    e.preventDefault()
    onNavigate?.(route)
  }

  return (
    <footer className="footer-rich">
      <div className="section-container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <a
              href="/"
              className="nav-brand"
              aria-label="ACI Motors Limited"
              onClick={(e) => go(e, '/')}
            >
              <img
                src="/acimotors-logo.svg"
                alt="ACI Motors"
                className="footer-brand-logo"
              />
            </a>
            <p className="footer-tagline">
              A subsidiary of ACI Limited. Powering Bangladesh mobility,
              agriculture, infrastructure &amp; automotive excellence since 2007.
            </p>
          </div>

          <div className="footer-col">
            <h4>Showroom &amp; Studio</h4>
            <a href="/models" onClick={(e) => go(e, '/models')}>
              M4 Shadow Edition
            </a>
            <a href="/configurator" onClick={(e) => go(e, '/configurator')}>
              BDT Bespoke Configurator
            </a>
            <a href="/engineering" onClick={(e) => go(e, '/engineering')}>
              Engineering &amp; Telemetry
            </a>
            <a href="/finance" onClick={(e) => go(e, '/finance')}>
              BDT EMI Calculator
            </a>
          </div>

          <div className="footer-col">
            <h4>ACI Motors Divisions</h4>
            <span>Yamaha Motorcycles &amp; Apparel</span>
            <span>Foton Commercial Vehicles</span>
            <span>Sonalika &amp; Yanmar Agri-Tech</span>
            <span>Kobelco · CEAT · Liqui Moly · EcoFlow</span>
          </div>

          <div className="footer-col">
            <h4>Head Office &amp; Care</h4>
            <span>ACI Centre, 245 Tejgaon I/A, Dhaka-1208</span>
            <span>Hotline: 16533 (Sat–Thu, 9 AM – 8 PM)</span>
            <span>info@acimotors-bd.com</span>
            <span>support@acimotors-bd.com</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {CURRENT_YEAR} ACI MOTORS LIMITED (acimotors-bd.com). ALL RIGHTS
            RESERVED.
          </span>
          <span>SHADOW EDITION BANGLADESH · BDT SHOWROOM</span>
        </div>
      </div>
    </footer>
  )
}
