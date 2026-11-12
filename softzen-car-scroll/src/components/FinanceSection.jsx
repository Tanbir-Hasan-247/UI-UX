import { useState } from 'react'

const TENURES = [12, 24, 36, 48, 60]

function formatBdt(amount) {
  return `৳${amount.toLocaleString('en-IN')}`
}

export default function FinanceSection({
  vehiclePriceBdt = 10200000,
  onNavigate,
}) {
  const [downPct, setDownPct] = useState(30)
  const [months, setMonths] = useState(48)
  const [apr, setApr] = useState(9.5)

  const downPayment = Math.round((vehiclePriceBdt * downPct) / 100)
  const principal = Math.max(vehiclePriceBdt - downPayment, 0)
  const monthlyRate = apr / 100 / 12

  const monthlyPayment =
    monthlyRate === 0
      ? Math.round(principal / months)
      : Math.round(
          (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1),
        )

  const totalInterest = Math.max(monthlyPayment * months - principal, 0)

  return (
    <section className="page-section" id="finance">
      <div className="section-container">
        <div className="section-header">
          <div>
            <div className="beat-eyebrow">ACI Financial Services</div>
            <h2 className="section-title">BDT AUTO EMI ESTIMATOR.</h2>
          </div>
          <p className="section-lead">
            Tailor your down payment, tenure, and bank financing rate in BDT—with
            priority processing through BRAC Bank, City Bank &amp; EBL Auto Loans.
          </p>
        </div>

        <div className="finance-grid">
          <div className="finance-controls">
            <div className="finance-slider-group">
              <div className="finance-slider-head">
                <span>Down Payment ({downPct}%)</span>
                <strong>{formatBdt(downPayment)}</strong>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="5"
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                className="finance-range"
              />
              <div className="finance-scale">
                <span>15%</span>
                <span>35%</span>
                <span>60%</span>
              </div>
            </div>

            <div className="finance-slider-group">
              <div className="finance-slider-head">
                <span>Financing Tenure</span>
                <strong>{months} Months</strong>
              </div>
              <div className="tenure-pills">
                {TENURES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`tenure-pill ${t === months ? 'tenure-pill--active' : ''}`}
                    onClick={() => setMonths(t)}
                  >
                    {t} mo
                  </button>
                ))}
              </div>
            </div>

            <div className="finance-slider-group">
              <div className="finance-slider-head">
                <span>Bank Interest Rate (APR)</span>
                <strong>{apr.toFixed(1)}%</strong>
              </div>
              <input
                type="range"
                min="7.5"
                max="14.5"
                step="0.5"
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
                className="finance-range"
              />
              <div className="finance-scale">
                <span>7.5%</span>
                <span>11.0%</span>
                <span>14.5%</span>
              </div>
            </div>
          </div>

          <div className="finance-summary-card">
            <div className="finance-summary-eyebrow">Estimated Monthly EMI</div>
            <div className="finance-monthly-val">
              {formatBdt(monthlyPayment)}
              <span>/mo</span>
            </div>
            <p className="finance-summary-note">
              Includes 5-year ACI Care scheduled maintenance &amp; 16533 roadside concierge.
            </p>

            <div className="finance-breakdown">
              <div className="finance-breakdown-row">
                <span>Configured Price (BDT)</span>
                <strong>{formatBdt(vehiclePriceBdt)}</strong>
              </div>
              <div className="finance-breakdown-row">
                <span>Down Payment ({downPct}%)</span>
                <strong>-{formatBdt(downPayment)}</strong>
              </div>
              <div className="finance-breakdown-row">
                <span>Loan Principal</span>
                <strong>{formatBdt(principal)}</strong>
              </div>
              <div className="finance-breakdown-row">
                <span>Est. Total Interest ({months} mo)</span>
                <strong>{formatBdt(totalInterest)}</strong>
              </div>
            </div>

            <a
              href="/reserve"
              className="btn-primary finance-cta"
              onClick={(e) => {
                e.preventDefault()
                onNavigate?.('/reserve')
              }}
            >
              Apply With ACI Concierge
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
