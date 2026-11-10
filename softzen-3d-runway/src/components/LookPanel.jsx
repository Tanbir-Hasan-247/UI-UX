import React, { useState } from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { LOOKS, PRODUCTS, formatMoney } from '../data/runwayCatalog.js';
import { ProductCard } from './ProductCard.jsx';

export const LookPanel = ({ isMobile }) => {
  const {
    activeLookIndex,
    setHotPin,
    setHotCard,
    setEngaged,
    addedItems,
    setAddedItems,
    selectedVariants,
    touchedCards,
    setOpenPickerKey,
    addBagItems,
    setIsPanelHovered,
  } = useRunway();

  const [bundleMsg, setBundleMsg] = useState('');
  const [bundleLoading, setBundleLoading] = useState(false);

  const look = LOOKS[activeLookIndex];
  if (!look) return null;

  // Check if look is completely added
  const lookAdded = addedItems[activeLookIndex] || {};
  const isComplete =
    look.products.length > 0 &&
    look.products.every((prod) => lookAdded[prod.cardId]);

  const handleCardHover = (cardId) => {
    setHotCard(cardId);
    setHotPin(cardId);
  };

  const handleCardLeave = () => {
    setHotCard(null);
    setHotPin(null);
  };

  const handleAddFullLook = async () => {
    setEngaged(true);
    if (isComplete || bundleLoading) return;

    setBundleMsg('');
    const itemsToAdd = [];
    const pendingProducts = [];

    look.products.forEach((prod) => {
      if (lookAdded[prod.cardId]) return;
      const cardKey = `${activeLookIndex}-${prod.cardId}`;
      const isTouched = touchedCards[cardKey];
      const variantId = selectedVariants[cardKey];

      if (isTouched && variantId) {
        itemsToAdd.push({ id: Number(variantId), quantity: 1, cardId: prod.cardId });
      } else {
        pendingProducts.push(prod);
      }
    });

    if (itemsToAdd.length > 0) {
      setBundleLoading(true);
      try {
        addBagItems(itemsToAdd.map((it) => ({ id: it.id, quantity: it.quantity })));
        setAddedItems((prev) => {
          const updated = { ...(prev[activeLookIndex] || {}) };
          itemsToAdd.forEach((it) => {
            updated[it.cardId] = true;
          });
          return { ...prev, [activeLookIndex]: updated };
        });
      } catch (err) {
        setBundleMsg(err.message || 'Couldn’t add to bag. Please try again.');
      } finally {
        setBundleLoading(false);
      }
    }

    if (pendingProducts.length > 0) {
      // Open the picker for the first pending product
      setOpenPickerKey(`${activeLookIndex}-${pendingProducts[0].cardId}`);
      const names = pendingProducts
        .map((p) => PRODUCTS[p.productId]?.name || '')
        .filter(Boolean)
        .join(', ');
      setBundleMsg(`Pick a size for: ${names}`);
    }
  };

  return (
    <aside
      className="rw__panel has-rule"
      aria-label="In this look"
      onPointerEnter={() => setIsPanelHovered(true)}
      onPointerLeave={() => setIsPanelHovered(false)}
    >
      <div className="rw__panel-inner">
        <div className="rw__panel-head">
          <h3 className="rw__panel-title">In this look</h3>
          <span className="rw__label" data-rw-pieces>
            {look.piecesText}
          </span>
        </div>

        <div
          className={`rw__look-panel is-in ${isComplete ? 'is-complete' : ''}`}
          data-rw-panel={activeLookIndex}
        >
          <div className="rw__mhead">
            <span className="rw__mhead-title">{look.name}</span>
            <span className="rw__label">{look.piecesText}</span>
          </div>

          <ul className="rw__items" role="list">
            {look.products.map((productInfo) => (
              <ProductCard
                key={productInfo.cardId}
                lookIndex={activeLookIndex}
                productInfo={productInfo}
                isMobile={isMobile}
                onCardHover={handleCardHover}
                onCardLeave={handleCardLeave}
              />
            ))}
          </ul>

          <div className="rw__bundle has-rule">
            <p className="rw__msg" data-rw-msg role="status" aria-live="polite">
              {bundleMsg}
            </p>
            <div className="rw__bundle-row">
              <div className="rw__bundle-copy">
                <span className="rw__bundle-title">Complete the look</span>
                <span className="rw__bundle-note">Bundle all 3 and save 10%</span>
              </div>
              <div className="rw__bundle-price">
                <s>{formatMoney(look.originalPrice)}</s>
                <strong>{formatMoney(look.bundlePrice)}</strong>
              </div>
            </div>
            <button
              type="button"
              className={`rw__cta ${bundleLoading ? 'is-loading' : ''}`}
              data-rw-all
              onClick={handleAddFullLook}
            >
              <span className="rw__cta-add">Add full look to bag</span>
              <span className="rw__cta-m">Add full look — {formatMoney(look.bundlePrice)}</span>
              <span className="rw__cta-done">Full look in your bag</span>
              <svg
                className="rw__i-arrow"
                width="22"
                height="12"
                viewBox="0 0 26 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M1 7h24M19 1l6 6-6 6" />
              </svg>
              <svg
                className="rw__i-spin"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 3a9 9 0 1 1-9 9" />
              </svg>
            </button>

            {/* Right bottom corner: Powered by Softzen IT */}
            <a
              href="https://softzenit.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                marginTop: '10px',
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
              title="Powered by SoftZen IT"
            >
              <span style={{ fontSize: '11px', color: '#777', fontWeight: 500, letterSpacing: '0.02em' }}>
                Powered by
              </span>
              <img
                src="/images/softzen-it-logo-transparent.png"
                alt="SoftZen IT"
                style={{ height: '18px', width: 'auto', display: 'block' }}
              />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
