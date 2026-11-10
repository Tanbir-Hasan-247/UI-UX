import React, { useState } from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { formatMoney } from '../data/runwayCatalog.js';

export const ProductDetailModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addBagItems,
    setIsCheckoutOpen,
  } = useRunway();

  const [selectedSize, setSelectedSize] = useState(() => {
    return quickViewProduct?.sizes?.[0] || 'M';
  });

  if (!quickViewProduct) return null;

  const currentVariant = quickViewProduct.variants?.find((v) => v.o.includes(selectedSize)) || quickViewProduct.variants?.[0];

  const handleAddToBag = () => {
    if (currentVariant) {
      addBagItems([{ id: currentVariant.id }]);
      setQuickViewProduct(null);
    }
  };

  const handleBuyNow = () => {
    if (currentVariant) {
      addBagItems([{ id: currentVariant.id }]);
      setQuickViewProduct(null);
      setIsCheckoutOpen(true);
    }
  };

  return (
    <div
      className="ecom-dialog-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) setQuickViewProduct(null);
      }}
    >
      <div className="ecom-detail-modal" role="dialog" aria-modal="true" aria-label="Product Details">
        <div className="ecom-detail-grid">
          {/* Image */}
          <div className="ecom-detail-img-box">
            <img src={quickViewProduct.image} alt={quickViewProduct.name} />
          </div>

          {/* Details */}
          <div className="ecom-detail-info-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#666', fontWeight: 600 }}>
                  {quickViewProduct.type}
                </span>
                <h3 style={{ marginTop: '4px' }}>{quickViewProduct.name}</h3>
              </div>
              <button
                type="button"
                className="ecom-close-btn"
                aria-label="Close"
                onClick={() => setQuickViewProduct(null)}
              >
                ×
              </button>
            </div>

            <div className="ecom-detail-price">
              {formatMoney(quickViewProduct.price)}
            </div>

            <p className="ecom-detail-desc">
              Engineered with premium performance materials, clean lines, and iconic streetwear aesthetics. Built for effortless daily style and all-day comfort.
            </p>

            {/* Highlights */}
            <ul className="ecom-detail-highlights">
              <li>✓ Authentic Nike design and craftsmanship</li>
              <li>✓ Premium breathable fabric and reinforced stitching</li>
              <li>✓ Free standard shipping on orders over $200</li>
              <li>✓ 30-day hassle-free return guarantee</li>
            </ul>

            {/* Size Picker */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                  Select {quickViewProduct.optName || 'Size'}:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      style={{
                        minWidth: '42px',
                        height: '42px',
                        padding: '0 12px',
                        borderRadius: '999px',
                        border: '1.5px solid',
                        borderColor: selectedSize === sz ? '#111' : '#ddd',
                        background: selectedSize === sz ? '#111' : '#fff',
                        color: selectedSize === sz ? '#fff' : '#111',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              <button
                type="button"
                className="ecom-btn-primary"
                onClick={handleAddToBag}
              >
                Add to Bag • {formatMoney(quickViewProduct.price)}
              </button>
              <button
                type="button"
                className="ecom-btn-secondary"
                onClick={handleBuyNow}
              >
                Buy Now (Instant Checkout)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
