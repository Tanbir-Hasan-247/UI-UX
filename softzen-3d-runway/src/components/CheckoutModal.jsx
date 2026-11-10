import React, { useState } from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { findProductVariant, formatMoney } from '../data/runwayCatalog.js';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsBagOpen,
    bagEntries,
    bagTotal,
    promoDiscount,
    promoAppliedCode,
    applyPromo,
    removePromo,
    placeOrder,
  } = useRunway();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: 'Dhaka',
    state: 'Dhaka Division',
    postalCode: '1212',
    country: 'Bangladesh',
    shippingMethod: 'standard', // 'standard' | 'express'
    paymentMethod: 'cod', // 'cod' | 'card' | 'bkash'
    notes: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    mobileWalletNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoFeedback(res);
  };

  // Format Card Number input with spaces
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.replace(/(.{4})/g, '$1 ').trim();
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  // Format Expiry MM/YY
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = `${val.substring(0, 2)}/${val.substring(2, 4)}`;
    }
    setFormData((prev) => ({ ...prev, cardExpiry: val }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 15) {
        newErrors.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.cardExpiry || formData.cardExpiry.length < 5) {
        newErrors.cardExpiry = 'Valid MM/YY required';
      }
      if (!formData.cardCvv || formData.cardCvv.length < 3) {
        newErrors.cardCvv = 'CVV required';
      }
    }

    if (formData.paymentMethod === 'bkash') {
      if (!formData.mobileWalletNumber || formData.mobileWalletNumber.length < 11) {
        newErrors.mobileWalletNumber = 'Valid mobile wallet number required (e.g. 017...)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // scroll to top error
      const el = document.querySelector('.ecom-checkout-form-col');
      if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic network checkout delay (1.2s)
    setTimeout(() => {
      setIsSubmitting(false);
      placeOrder(formData);
    }, 1200);
  };

  // Calculations
  const discountAmount = promoDiscount > 0.001 ? Math.round(bagTotal * promoDiscount) : 0;
  const isFreeShip = promoAppliedCode === 'FREESHIP' || (formData.shippingMethod === 'standard' && bagTotal >= 200);
  const shippingCost = isFreeShip ? 0 : formData.shippingMethod === 'express' ? 25 : 12;
  const finalTotal = Math.max(0, bagTotal - discountAmount + shippingCost);

  return (
    <div
      className="ecom-dialog-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) setIsCheckoutOpen(false);
      }}
    >
      <div className="ecom-checkout-modal" role="dialog" aria-modal="true" aria-label="Checkout">
        {/* Header */}
        <div className="ecom-checkout-header">
          <div className="ecom-checkout-brand">
            <img
              src="/images/damlook-logo.png"
              alt="Damlook"
              style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
            />
            <span className="ecom-secure-tag">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Secure Checkout
            </span>
          </div>

          <button
            type="button"
            className="ecom-close-btn"
            aria-label="Back to bag"
            onClick={() => {
              setIsCheckoutOpen(false);
              setIsBagOpen(true);
            }}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        {/* Checkout Grid */}
        <div className="ecom-checkout-grid">
          {/* Left Column: Form Fields */}
          <form className="ecom-checkout-form-col" onSubmit={handleSubmit}>
            {/* Section 1: Customer Info */}
            <div className="ecom-form-group">
              <h3 className="ecom-section-title">
                <span className="ecom-section-num">1</span>
                Contact Information
              </h3>
              <div className="ecom-fields-grid">
                <div className={`ecom-field ${errors.email ? 'ecom-has-error' : ''}`}>
                  <label htmlFor="chk-email">Email Address *</label>
                  <input
                    id="chk-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="ecom-error-hint">{errors.email}</span>}
                </div>

                <div className={`ecom-field ${errors.phone ? 'ecom-has-error' : ''}`}>
                  <label htmlFor="chk-phone">Phone Number *</label>
                  <input
                    id="chk-phone"
                    type="tel"
                    name="phone"
                    placeholder="+880 1712-345678"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="ecom-error-hint">{errors.phone}</span>}
                </div>

                <div className={`ecom-field ${errors.firstName ? 'ecom-has-error' : ''}`}>
                  <label htmlFor="chk-fname">First Name *</label>
                  <input
                    id="chk-fname"
                    type="text"
                    name="firstName"
                    placeholder="Tanbir"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <span className="ecom-error-hint">{errors.firstName}</span>}
                </div>

                <div className={`ecom-field ${errors.lastName ? 'ecom-has-error' : ''}`}>
                  <label htmlFor="chk-lname">Last Name *</label>
                  <input
                    id="chk-lname"
                    type="text"
                    name="lastName"
                    placeholder="Hasan"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <span className="ecom-error-hint">{errors.lastName}</span>}
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Address */}
            <div className="ecom-form-group">
              <h3 className="ecom-section-title">
                <span className="ecom-section-num">2</span>
                Shipping Address
              </h3>
              <div className="ecom-fields-grid">
                <div className={`ecom-field ecom-fields-full ${errors.address ? 'ecom-has-error' : ''}`}>
                  <label htmlFor="chk-address">Street Address / House / Road *</label>
                  <input
                    id="chk-address"
                    type="text"
                    name="address"
                    placeholder="House 14, Road 7, Sector 3, Uttara"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && <span className="ecom-error-hint">{errors.address}</span>}
                </div>

                <div className="ecom-field ecom-fields-full">
                  <label htmlFor="chk-apt">Apartment, Suite, Unit (Optional)</label>
                  <input
                    id="chk-apt"
                    type="text"
                    name="apartment"
                    placeholder="Apt 4B"
                    value={formData.apartment}
                    onChange={handleChange}
                  />
                </div>

                <div className={`ecom-field ${errors.city ? 'ecom-has-error' : ''}`}>
                  <label htmlFor="chk-city">City *</label>
                  <input
                    id="chk-city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <span className="ecom-error-hint">{errors.city}</span>}
                </div>

                <div className="ecom-field">
                  <label htmlFor="chk-state">State / Division</label>
                  <input
                    id="chk-state"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="ecom-field">
                  <label htmlFor="chk-zip">Postal / ZIP Code</label>
                  <input
                    id="chk-zip"
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="ecom-field">
                  <label htmlFor="chk-country">Country</label>
                  <select
                    id="chk-country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>

                <div className="ecom-field ecom-fields-full">
                  <label htmlFor="chk-notes">Delivery Instructions / Notes (Optional)</label>
                  <textarea
                    id="chk-notes"
                    name="notes"
                    rows="2"
                    placeholder="Leave with concierge or gate guard if unavailable..."
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Section 3: Delivery Method */}
            <div className="ecom-form-group">
              <h3 className="ecom-section-title">
                <span className="ecom-section-num">3</span>
                Delivery Method
              </h3>
              <div className="ecom-choice-cards">
                <div
                  className={`ecom-choice-card ${formData.shippingMethod === 'standard' ? 'is-selected' : ''}`}
                  onClick={() => setFormData((p) => ({ ...p, shippingMethod: 'standard' }))}
                >
                  <div className="ecom-radio-indicator"></div>
                  <div className="ecom-choice-info">
                    <div className="ecom-choice-header">
                      <span>Standard Delivery</span>
                      <span className="ecom-choice-price">
                        {isFreeShip ? 'FREE' : formatMoney(12)}
                      </span>
                    </div>
                    <p className="ecom-choice-desc">Delivered safely within 3–5 business days.</p>
                  </div>
                </div>

                <div
                  className={`ecom-choice-card ${formData.shippingMethod === 'express' ? 'is-selected' : ''}`}
                  onClick={() => setFormData((p) => ({ ...p, shippingMethod: 'express' }))}
                >
                  <div className="ecom-radio-indicator"></div>
                  <div className="ecom-choice-info">
                    <div className="ecom-choice-header">
                      <span>🚀 Express Priority Courier</span>
                      <span className="ecom-choice-price">{formatMoney(25)}</span>
                    </div>
                    <p className="ecom-choice-desc">Direct rush shipping in 1–2 business days with live SMS tracking.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Payment Method */}
            <div className="ecom-form-group">
              <h3 className="ecom-section-title">
                <span className="ecom-section-num">4</span>
                Payment Method
              </h3>
              <div className="ecom-choice-cards">
                {/* Cash on Delivery */}
                <div
                  className={`ecom-choice-card ${formData.paymentMethod === 'cod' ? 'is-selected' : ''}`}
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
                >
                  <div className="ecom-radio-indicator"></div>
                  <div className="ecom-choice-info">
                    <div className="ecom-choice-header">
                      <span>💵 Cash on Delivery (COD)</span>
                      <span className="ecom-pay-badge">POPULAR</span>
                    </div>
                    <p className="ecom-choice-desc">Pay in cash or mobile pay directly upon delivery at your doorstep.</p>
                  </div>
                </div>

                {/* Credit / Debit Card */}
                <div
                  className={`ecom-choice-card ${formData.paymentMethod === 'card' ? 'is-selected' : ''}`}
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                >
                  <div className="ecom-radio-indicator"></div>
                  <div className="ecom-choice-info">
                    <div className="ecom-choice-header">
                      <span>💳 Credit / Debit Card</span>
                      <div className="ecom-pay-logos">
                        <span className="ecom-pay-badge">VISA</span>
                        <span className="ecom-pay-badge">MC</span>
                        <span className="ecom-pay-badge">AMEX</span>
                      </div>
                    </div>
                    <p className="ecom-choice-desc">Safe and encrypted online transaction with 256-bit SSL protection.</p>

                    {formData.paymentMethod === 'card' && (
                      <div className="ecom-subform" onClick={(e) => e.stopPropagation()}>
                        <div className={`ecom-field ${errors.cardNumber ? 'ecom-has-error' : ''}`}>
                          <label>Card Number *</label>
                          <input
                            type="text"
                            placeholder="4532 8901 2345 6789"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                          />
                          {errors.cardNumber && <span className="ecom-error-hint">{errors.cardNumber}</span>}
                        </div>

                        <div className="ecom-fields-grid">
                          <div className={`ecom-field ${errors.cardExpiry ? 'ecom-has-error' : ''}`}>
                            <label>Expires (MM/YY) *</label>
                            <input
                              type="text"
                              placeholder="08/28"
                              value={formData.cardExpiry}
                              onChange={handleExpiryChange}
                            />
                            {errors.cardExpiry && <span className="ecom-error-hint">{errors.cardExpiry}</span>}
                          </div>
                          <div className={`ecom-field ${errors.cardCvv ? 'ecom-has-error' : ''}`}>
                            <label>CVV / CVC *</label>
                            <input
                              type="password"
                              maxLength="4"
                              placeholder="123"
                              value={formData.cardCvv}
                              onChange={(e) => setFormData((p) => ({ ...p, cardCvv: e.target.value.replace(/\D/g, '') }))}
                            />
                            {errors.cardCvv && <span className="ecom-error-hint">{errors.cardCvv}</span>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Banking / Wallet */}
                <div
                  className={`ecom-choice-card ${formData.paymentMethod === 'bkash' ? 'is-selected' : ''}`}
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'bkash' }))}
                >
                  <div className="ecom-radio-indicator"></div>
                  <div className="ecom-choice-info">
                    <div className="ecom-choice-header">
                      <span>📱 Mobile Banking / Digital Wallet</span>
                      <div className="ecom-pay-logos">
                        <span className="ecom-pay-badge bkash">bKash</span>
                        <span className="ecom-pay-badge nagad">Nagad</span>
                      </div>
                    </div>
                    <p className="ecom-choice-desc">Instant payment through bKash, Nagad, or Apple Pay wallet.</p>

                    {formData.paymentMethod === 'bkash' && (
                      <div className="ecom-subform" onClick={(e) => e.stopPropagation()}>
                        <div className={`ecom-field ${errors.mobileWalletNumber ? 'ecom-has-error' : ''}`}>
                          <label>Wallet Mobile Number *</label>
                          <input
                            type="tel"
                            placeholder="01712345678"
                            value={formData.mobileWalletNumber}
                            onChange={(e) => setFormData((p) => ({ ...p, mobileWalletNumber: e.target.value }))}
                          />
                          {errors.mobileWalletNumber && (
                            <span className="ecom-error-hint">{errors.mobileWalletNumber}</span>
                          )}
                        </div>
                        <p style={{ margin: 0, fontSize: '11px', color: '#666' }}>
                          ℹ️ You will receive a verification prompt to confirm the transaction.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="ecom-btn-primary"
              id="place-order-submit-btn"
              disabled={isSubmitting}
              style={{ height: '56px', fontSize: '16px' }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px' }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"></circle>
                  </svg>
                  <span>Processing Your Order...</span>
                </>
              ) : (
                <>
                  <span>Place Order • {formatMoney(finalTotal)}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </form>

          {/* Right Column: Order Summary */}
          <div className="ecom-checkout-summary-col">
            <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700 }}>Order Summary</h3>
            <span style={{ fontSize: '12px', color: '#666' }}>
              {bagEntries.reduce((s, e) => s + e.quantity, 0)} items in your outfit
            </span>

            {/* Items Mini List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '260px', overflowY: 'auto' }}>
              {bagEntries.map((entry) => {
                const item = findProductVariant(entry.id);
                if (!item) return null;
                const { product, variant } = item;
                return (
                  <div
                    key={entry.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '50px 1fr auto',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '50px',
                        height: '55px',
                        objectFit: 'contain',
                        background: '#fff',
                        borderRadius: '6px',
                        border: '1px solid #eee',
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{product.name}</div>
                      <div style={{ fontSize: '11px', color: '#666' }}>
                        Size {variant.o.join(' / ')} × {entry.quantity}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>
                      {formatMoney(product.price * entry.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Input in Checkout */}
            {promoAppliedCode ? (
              <div className="ecom-promo-applied">
                <span>
                  Code <strong>{promoAppliedCode}</strong> applied
                </span>
                <button
                  type="button"
                  className="ecom-promo-remove"
                  onClick={() => {
                    removePromo();
                    setPromoFeedback(null);
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <form className="ecom-promo-box" onSubmit={handleApplyPromo}>
                <input
                  type="text"
                  placeholder="Discount code"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    if (promoFeedback) setPromoFeedback(null);
                  }}
                />
                <button type="submit" className="ecom-promo-btn">
                  Apply
                </button>
              </form>
            )}

            {/* Breakdown */}
            <div className="ecom-summary-rows">
              <div className="ecom-summary-row">
                <span>Subtotal</span>
                <span>{formatMoney(bagTotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="ecom-summary-row ecom-discount">
                  <span>Discount ({Math.round(promoDiscount * 100)}%)</span>
                  <span>-{formatMoney(discountAmount)}</span>
                </div>
              )}
              <div className="ecom-summary-row">
                <span>Shipping</span>
                <span>{isFreeShip ? 'FREE' : formatMoney(shippingCost)}</span>
              </div>
              <div className="ecom-summary-row">
                <span>Estimated Tax</span>
                <span>{formatMoney(0)}</span>
              </div>
              <div className="ecom-summary-row ecom-total-row">
                <span>Total Due</span>
                <span>{formatMoney(finalTotal)}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="ecom-trust-row">
              <div className="ecom-trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>SSL Secured</span>
              </div>
              <div className="ecom-trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                  <path d="M3 21v-5h5"></path>
                </svg>
                <span>30-Day Returns</span>
              </div>
              <div className="ecom-trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>100% Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
