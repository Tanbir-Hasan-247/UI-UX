import { useState } from 'react'

export function HomeEditorialBand({ onNavigate }) {
  return (
    <>
      <section className="page-section page-section--alt">
        <div className="section-container">
          <div className="editorial-split">
            <div className="editorial-media">
              <img
                src="https://images.unsplash.com/photo-1736482582949-da714b927791?auto=format&fit=crop&w=1200&q=85"
                alt="Hand-finished M4 Shadow Edition cockpit"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/frames/frame00043.png'
                }}
              />
            </div>
            <div className="editorial-copy">
              <div className="beat-eyebrow">Craftsmanship &amp; Ergonomics</div>
              <h2 className="section-title">BUILT AROUND THE DRIVER.</h2>
              <p className="editorial-text">
                Every touchpoint inside the Shadow Edition cabin is angled
                toward the pilot—from sculpted carbon paddle shifters to
                hand-stitched Merino leather bolsters designed to hold you
                through high-G corners without sacrificing grand-touring poise.
              </p>
              <div className="editorial-pillars">
                <div>
                  <strong>14.9"</strong>
                  <span>Curved Telemetry Display</span>
                </div>
                <div>
                  <strong>-21 lbs</strong>
                  <span>M Carbon Bucket Seats</span>
                </div>
                <div>
                  <strong>16-Spk</strong>
                  <span>Harman Kardon Surround</span>
                </div>
              </div>
              <a
                href="/engineering"
                className="btn-ghost"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate?.('/engineering')
                }}
              >
                Explore Engineering
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-container">
          <div className="press-strip">
            <div className="press-quote">
              <span className="press-source">AUTOCAR BENCHMARK</span>
              <p>
                &ldquo;A rare balance of twilight subtlety and razor-sharp
                front-axle bite—the Shadow Edition feels alive at every speed.&rdquo;
              </p>
            </div>
            <div className="press-stats">
              <div>
                <strong>1:31.4</strong>
                <span>Track Lap Benchmark</span>
              </div>
              <div>
                <strong>5-Year</strong>
                <span>ACI Care Warranty</span>
              </div>
              <div>
                <strong>3 Lounges</strong>
                <span>Dhaka · Ctg · Sylhet</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function ModelsAssuranceBand() {
  const packages = [
    {
      tag: 'Exterior & Aero',
      title: 'Shadow Carbon Package',
      items: [
        'CFRP Carbon-Fiber Roof Panel',
        'Laserlight Amber Daytime Running Lamps',
        'High-Gloss Shadowline Aerodynamic Diffuser',
        'Active Air Flap Kidney Grille Control',
      ],
    },
    {
      tag: 'Cabin & Tech',
      title: 'Executive Cockpit Suite',
      items: [
        'BMW/M Live Cockpit Curved Display',
        'Full Merino Leather with Contrast Stitching',
        'Wireless Charging & Apple CarPlay / Android Auto',
        'Head-Up Display with Shift-Light Projection',
      ],
    },
    {
      tag: 'Safety & Care',
      title: 'ACI Ownership Shield',
      items: [
        '5-Year / 100,000 km Scheduled Maintenance',
        '24/7 Priority Flatbed Roadside Assistance',
        'Driving Assistant Pro & 360° Surround View',
        'Complimentary Annual Track Calibration Check',
      ],
    },
  ]

  return (
    <section className="page-section page-section--alt">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">Standard Equipment</div>
            <h2 className="section-title">INCLUDED IN EVERY BUILD.</h2>
          </div>
          <p className="section-lead">
            No hidden essentials—every ACI Motors Shadow vehicle arrives with
            complete carbon aero, connected telemetry, and 5-year concierge care.
          </p>
        </div>

        <div className="assurance-grid">
          {packages.map((pkg) => (
            <article key={pkg.title} className="assurance-card">
              <span className="spec-card-tag">{pkg.tag}</span>
              <h3>{pkg.title}</h3>
              <ul>
                {pkg.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ConfiguratorTimelineBand() {
  const steps = [
    {
      num: '01',
      title: 'Lock Specification',
      desc: 'Finalize exterior finish, forged wheels, and cabin trim in the studio.',
    },
    {
      num: '02',
      title: 'Factory Allocation',
      desc: 'Receive your dedicated VIN build slot and live production milestone updates.',
    },
    {
      num: '03',
      title: 'Port & Inspection',
      desc: '140-point ACI Motors motorsport pre-delivery inspection and ceramic prep.',
    },
    {
      num: '04',
      title: 'Lounge Handover',
      desc: 'Private unveiling at our Gulshan, Chattogram, or Sylhet flagship lounge.',
    },
  ]

  return (
    <section className="page-section">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">Allocation Process</div>
            <h2 className="section-title">FROM STUDIO TO GARAGE.</h2>
          </div>
          <p className="section-lead">
            Transparent four-stage delivery pipeline managed by your dedicated
            ACI Motors product specialist.
          </p>
        </div>

        <div className="timeline-grid">
          {steps.map((step) => (
            <div key={step.num} className="timeline-card">
              <span className="timeline-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EngineeringDeepDiveBand() {
  return (
    <section className="page-section page-section--alt">
      <div className="section-container">
        <div className="editorial-split">
          <div className="editorial-copy">
            <div className="beat-eyebrow">Powertrain Architecture</div>
            <h2 className="section-title">FORGED FOR SUSTAINED BOOST.</h2>
            <p className="editorial-text">
              The 3.0-liter TwinPower Turbo inline-six utilizes a closed-deck
              crankcase, forged steel crankshaft, and twin mono-scroll
              turbochargers—delivering relentless 479 lb-ft torque from 2,750
              rpm all the way to the 7,200 rpm redline.
            </p>
            <div className="editorial-pillars">
              <div>
                <strong>7,200</strong>
                <span>Max Engine RPM</span>
              </div>
              <div>
                <strong>479 lb-ft</strong>
                <span>Peak Torque</span>
              </div>
              <div>
                <strong>350 bar</strong>
                <span>High-Precision Injection</span>
              </div>
            </div>
          </div>
          <div className="editorial-media">
            <img
              src="https://images.unsplash.com/photo-1728415969478-f9b4d700478e?auto=format&fit=crop&w=1200&q=85"
              alt="Aerodynamic track stance"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/frames/frame00085.png'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  {
    q: 'What documents are required for ACI Financial Services pre-approval?',
    a: 'Valid NID/Passport, last 6 months of bank statements, and trade license or corporate employment verification. Pre-approval typically completes within 48 hours.',
  },
  {
    q: 'Can I trade in my existing luxury vehicle toward the M4 Shadow Edition?',
    a: 'Yes. ACI Motors offers certified valuation at our Gulshan and Chattogram lounges, applying your trade-in equity directly toward your down payment.',
  },
  {
    q: 'Is the 5-year maintenance package transferable?',
    a: 'Yes, the ACI Care 5-Year / 100,000 km scheduled service plan remains attached to the VIN and transfers seamlessly to subsequent owners.',
  },
]

export function FinanceFaqBand() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section className="page-section page-section--alt">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">Financing Clarity</div>
            <h2 className="section-title">FREQUENTLY ASKED QUESTIONS.</h2>
          </div>
          <p className="section-lead">
            Clear answers on corporate leasing, trade-in equity, and fast-track
            bank approvals.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={item.q}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p className="faq-answer">{item.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ShowroomsDirectoryBand() {
  const lounges = [
    {
      city: 'ACI Centre (Head Office)',
      address: '245 Tejgaon Industrial Area, Dhaka-1208',
      hours: 'Sat – Thu · 9:00 AM – 8:00 PM',
      phone: 'Hotline: 16533 · info@acimotors-bd.com',
    },
    {
      city: 'Chattogram Lounge',
      address: 'CDA Avenue, Nasirabad, Chattogram-4000',
      hours: 'Sat – Thu · 9:00 AM – 8:00 PM',
      phone: 'Hotline: 16533 · support@acimotors-bd.com',
    },
    {
      city: 'Sylhet Studio',
      address: 'East Zindabazar, Sylhet-3100',
      hours: 'Sat – Thu · 9:00 AM – 8:00 PM',
      phone: 'Hotline: 16533 · acimotors-bd.com',
    },
  ]

  return (
    <section className="page-section page-section--alt">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">Visit Us</div>
            <h2 className="section-title">ACI MOTORS LOUNGES.</h2>
          </div>
          <p className="section-lead">
            Private viewing suites equipped with physical paint samples, Merino
            leather swatches, and accompanied demo vehicles.
          </p>
        </div>

        <div className="assurance-grid">
          {lounges.map((l) => (
            <article key={l.city} className="assurance-card">
              <span className="spec-card-tag">Authorized Lounge</span>
              <h3>{l.city}</h3>
              <p className="lounge-meta">{l.address}</p>
              <p className="lounge-meta">{l.hours}</p>
              <p className="lounge-phone">{l.phone}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
