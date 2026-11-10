import React, { useState } from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { findProductVariant, formatMoney } from '../data/runwayCatalog.js';

export const BagDialog = () => {
  const {
    isBagOpen,
    setIsBagOpen,
    bagEntries,
    bagTotal,
    cartCount,
    updateBagQuantity,
    removeBagItem,
    clearBag,
    exportBagShortlist,
    setIsCheckoutOpen,
    promoCode,
    setPromoCode,
    promoDiscount,
    promoAppliedCode,
    applyPromo,
    removePromo,
    setQuickViewProduct,
  } = useRunway();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState(null);

  if (!isBagOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoFeedback(res);
  };

  const discountAmount = promoDiscount > 0.001 ? Math.round(bagTotal * promoDiscount) : 0;
  const isFreeShip = promoAppliedCode === 'FREESHIP' || bagTotal >= 200;
  const shippingCost = bagEntries.length === 0 ? 0 : isFreeShip ? 0 : 12;
  const finalTotal = Math.max(0, bagTotal - discountAmount + shippingCost);

  return (
    <div
      className="ecom-dialog-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsBagOpen(false);
      }}
    >
      <div className="ecom-cart-modal" role="dialog" aria-modal="true" aria-label="Shopping Bag">
        {/* Header */}
        <div className="ecom-modal-header">
          <h2>
            Your Bag
            {cartCount > 0 && <span className="ecom-badge">{cartCount}</span>}
          </h2>
          <button
            type="button"
            className="ecom-close-btn"
            id="close-bag"
            aria-label="Close bag"
            onClick={() => setIsBagOpen(false)}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="ecom-modal-body">
          {bagEntries.length === 0 ? (
            <div className="ecom-empty-state">
              <svg
                className="ecom-empty-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <h3>Your bag is currently empty</h3>
              <p>Explore the looks on the runway, choose your sizes, and add your favorite pieces to shop.</p>
              <button
                type="button"
                className="ecom-btn-secondary"
                onClick={() => setIsBagOpen(false)}
              >
                Browse the Runway
              </button>
            </div>
          ) : (
            <>
              {/* Item Rows */}
              <div className="ecom-cart-items-list" id="bag-items">
                {bagEntries.map((entry) => {
                  const item = findProductVariant(entry.id);
                  if (!item) return null;
                  const { product, variant } = item;
                  return (
                    <div className="ecom-cart-item" key={entry.id}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="ecom-cart-thumb"
                        onClick={() => {
                          setQuickViewProduct(product);
                          setIsBagOpen(false);
                        }}
                        style={{ cursor: 'pointer' }}
                        title="Click to view details"
                      />
                      <div className="ecom-cart-info">
                        <h4
                          onClick={() => {
                            setQuickViewProduct(product);
                            setIsBagOpen(false);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          {product.name}
                        </h4>
                        <div className="ecom-cart-meta">
                          <span className="ecom-cart-size-pill">
                            Size: {variant.o.join(' / ')}
                          </span>
                          <span>•</span>
                          <span>{formatMoney(product.price)}</span>
                        </div>
                        <div className="ecom-stepper">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            disabled={entry.quantity <= 1}
                            onClick={() => updateBagQuantity(entry.id, entry.quantity - 1)}
                          >
                            −
                          </button>
                          <span>{entry.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            disabled={entry.quantity >= 20}
                            onClick={() => updateBagQuantity(entry.id, entry.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="ecom-cart-price-col">
                        <span className="ecom-cart-total-price">
                          {formatMoney(product.price * entry.quantity)}
                        </span>
                        <button
                          type="button"
                          className="ecom-cart-delete-btn"
                          aria-label={`Remove ${product.name}`}
                          onClick={() => removeBagItem(entry.id)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code Input */}
              {promoAppliedCode ? (
                <div className="ecom-promo-applied">
                  <span>
                    🎉 Code <strong>{promoAppliedCode}</strong> applied ({promoDiscount > 0.001 ? `${Math.round(promoDiscount * 100)}% OFF` : 'FREE SHIPPING'})
                  </span>
                  <button
                    type="button"
                    className="ecom-promo-remove"
                    onClick={() => {
                      removePromo();
                      setPromoFeedback(null);
                    }}
                    title="Remove discount"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <form className="ecom-promo-box" onSubmit={handleApplyPromo}>
                  <input
                    type="text"
                    placeholder="PROMO CODE (e.g. RUNWAY10)"
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
              {promoFeedback && !promoAppliedCode && (
                <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#dc2626' }}>
                  {promoFeedback.message}
                </p>
              )}

              {/* Cost Summary Breakdown */}
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
                  <span>Estimated Shipping</span>
                  <span>{isFreeShip ? 'FREE' : formatMoney(shippingCost)}</span>
                </div>
                <div className="ecom-summary-row ecom-total-row" id="bag-total">
                  <span>Total</span>
                  <span>{formatMoney(finalTotal)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {bagEntries.length > 0 && (
          <div className="ecom-modal-footer">
            <button
              type="button"
              className="ecom-btn-primary"
              id="proceed-checkout-btn"
              onClick={() => {
                setIsBagOpen(false);
                setIsCheckoutOpen(true);
              }}
            >
              <span>Proceed to Checkout</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <button
              type="button"
              className="ecom-btn-secondary"
              id="export-bag"
              onClick={exportBagShortlist}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download Shortlist (.txt)</span>
            </button>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '11px',
                  color: '#888888',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: '4px',
                }}
                onClick={clearBag}
              >
                Clear all items from bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
