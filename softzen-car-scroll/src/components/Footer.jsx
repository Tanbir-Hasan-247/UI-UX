const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer-rich">
      <div className="section-container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <a href="#overview" className="nav-brand">
              <span className="nav-brand-dot" />
              <span>ACI MOTORS</span>
            </a>
            <p className="footer-tagline">
              Precision performance engineering, bespoke allocation, and flagship
              ownership experiences across Bangladesh.
            </p>
          </div>

          <div className="footer-col">
            <h4>Vehicles</h4>
            <a href="#models">M4 Shadow Edition</a>
            <a href="#models">M4 Competition Track</a>
            <a href="#models">M4 Grand Tourer</a>
            <a href="#configurator">Bespoke Studio</a>
          </div>

          <div className="footer-col">
            <h4>Experience</h4>
            <a href="#engineering">Engineering &amp; Telemetry</a>
            <a href="#gallery">Twilight Gallery</a>
            <a href="#reserve">Book a Test Drive</a>
            <a href="#reserve">Showroom Locator</a>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <span>Gulshan Avenue, Dhaka 1212</span>
            <span>concierge@acimotors.demo</span>
            <span>+880 9612-000000</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {CURRENT_YEAR} ACI MOTORS. ALL RIGHTS RESERVED.</span>
          <span>SHADOW EDITION DEMO · REACT + VITE</span>
        </div>
      </div>
    </footer>
  )
}
