import React from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { ALL_PRODUCTS } from '../data/runwayCatalog.js';

export const WishlistModal = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addBagItems,
    formatPrice,
    setQuickViewProduct,
  } = useRunway();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div
      className="ecom-dialog-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsWishlistOpen(false);
      }}
    >
      <div className="ecom-cart-modal" role="dialog" aria-modal="true" aria-label="My Wishlist">
        <div className="ecom-modal-header">
          <h2>
            My Wishlist
            {wishlistedProducts.length > 0 && (
              <span className="ecom-badge">{wishlistedProducts.length}</span>
            )}
          </h2>
          <button
            type="button"
            className="ecom-close-btn"
            aria-label="Close"
            onClick={() => setIsWishlistOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="ecom-modal-body">
          {wishlistedProducts.length === 0 ? (
            <div className="ecom-empty-state">
              <svg
                className="ecom-empty-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <h3>Your wishlist is empty</h3>
              <p>Click the heart icon on any piece you love to save it for later.</p>
              <button
                type="button"
                className="ecom-btn-secondary"
                onClick={() => setIsWishlistOpen(false)}
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="ecom-cart-items-list">
              {wishlistedProducts.map((p) => (
                <div className="ecom-cart-item" key={p.id}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="ecom-cart-thumb"
                    onClick={() => {
                      setQuickViewProduct(p);
                      setIsWishlistOpen(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  />

                  <div className="ecom-cart-info">
                    <h4
                      onClick={() => {
                        setQuickViewProduct(p);
                        setIsWishlistOpen(false);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {p.name}
                    </h4>
                    <div className="ecom-cart-meta">
                      <span>{p.type || p.category}</span>
                      <span>•</span>
                      <strong>{formatPrice(p.price)}</strong>
                    </div>

                    <button
                      type="button"
                      className="ecom-btn-primary"
                      style={{ padding: '6px 14px', fontSize: '11px', width: 'auto' }}
                      onClick={() => {
                        const variant = p.variants?.[0];
                        if (variant) {
                          addBagItems([{ id: variant.id, quantity: 1 }]);
                          toggleWishlist(p.id);
                        }
                      }}
                    >
                      Move to Bag
                    </button>
                  </div>

                  <div className="ecom-cart-price-col">
                    <button
                      type="button"
                      className="ecom-cart-delete-btn"
                      aria-label="Remove"
                      onClick={() => toggleWishlist(p.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
