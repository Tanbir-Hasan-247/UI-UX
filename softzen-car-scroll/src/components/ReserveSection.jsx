import { useState } from 'react'

const SHOWROOMS = [
  'ACI Motors Flagship — Gulshan Avenue, Dhaka',
  'ACI Motors Lounge — Nasirabad, Chattogram',
  'ACI Motors Studio — Zindabazar, Sylhet',
]

export default function ReserveSection({ buildSummary }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [showroom, setShowroom] = useState(SHOWROOMS[0])
  const [date, setDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    setSubmitted(true)
  }

  return (
    <section className="page-section" id="reserve">
      <div className="section-container">
        <div className="reserve-grid">
          <div className="reserve-info">
            <div className="beat-eyebrow">Private Concierge</div>
            <h2 className="section-title">BOOK A PRIVATE DRIVE.</h2>
            <p className="reserve-lead">
              Experience the ACI Motors M4 Shadow Edition in person. Our product
              specialists will prepare your preferred specification for an
              accompanied twilight or circuit test drive.
            </p>

            <div className="reserve-perks">
              <div className="reserve-perk">
                <span className="reserve-perk-num">01</span>
                <div>
                  <strong>Dedicated Specialist</strong>
                  <p>One-on-one walkaround and dynamic telemetry briefing.</p>
                </div>
              </div>
              <div className="reserve-perk">
                <span className="reserve-perk-num">02</span>
                <div>
                  <strong>Priority Allocation</strong>
                  <p>Direct factory build slots with transparent delivery timelines.</p>
                </div>
              </div>
              <div className="reserve-perk">
                <span className="reserve-perk-num">03</span>
                <div>
                  <strong>5-Year Care Package</strong>
                  <p>Complimentary scheduled maintenance and 24/7 roadside support.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reserve-card">
            {submitted ? (
              <div className="reserve-success">
                <div className="reserve-success-badge">Request Confirmed</div>
                <h3>Thank you, {name}.</h3>
                <p>
                  Your private test drive request at{' '}
                  <strong>{showroom}</strong> has been logged. Our concierge
                  will contact you at <strong>{phone}</strong> shortly.
                </p>
                {buildSummary && (
                  <div className="reserve-build-box">
                    <span>Saved Configuration</span>
                    <strong>{buildSummary}</strong>
                  </div>
                )}
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setSubmitted(false)}
                >
                  Modify Request
                </button>
              </div>
            ) : (
              <form className="reserve-form" onSubmit={handleSubmit}>
                <div className="reserve-form-title">Reservation Details</div>

                {buildSummary && (
                  <div className="reserve-build-box">
                    <span>Selected Build</span>
                    <strong>{buildSummary}</strong>
                  </div>
                )}

                <label className="form-field">
                  <span>Full Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Rahman"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <div className="form-row">
                  <label className="form-field">
                    <span>Phone Number *</span>
                    <input
                      type="tel"
                      required
                      placeholder="+880 17XX-XXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                  <label className="form-field">
                    <span>Email Address</span>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>

                <label className="form-field">
                  <span>Preferred Showroom</span>
                  <select
                    value={showroom}
                    onChange={(e) => setShowroom(e.target.value)}
                  >
                    {SHOWROOMS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-field">
                  <span>Preferred Date</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>

                <button type="submit" className="btn-primary reserve-submit">
                  Confirm Private Drive
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
