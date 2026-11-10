import React, { useState } from 'react';
import { useRunway } from '../context/RunwayContext.jsx';

export const ShopCollectionGrid = ({ products, onSelectCategory }) => {
  const {
    formatPrice,
    addBagItems,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct,
  } = useRunway();

  // State to track selected size per product card: productId -> size
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes?.[0];
    const variant = product.variants?.find((v) => v.o.includes(chosenSize)) || product.variants?.[0];
    if (variant) {
      addBagItems([{ id: variant.id, quantity: 1 }]);
    }
  };

  if (products.length === 0) {
    return (
      <section className="ecom-grid-section">
        <div className="ecom-container">
          <div className="ecom-empty-grid">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h3>No products found</h3>
            <p>Try searching for a different keyword or browse our main categories.</p>
            <button
              type="button"
              className="ecom-btn-secondary"
              onClick={() => onSelectCategory && onSelectCategory('All Pieces')}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ecom-grid-section">
      <div className="ecom-container">
        <div className="ecom-products-grid">
          {products.map((product) => {
            const isFav = isWishlisted(product.id);
            const activeSize = selectedSizes[product.id] || product.sizes?.[0];

            return (
              <div className="ecom-card" key={product.id}>
                {/* Media & Badges */}
                <div className="ecom-card-media-box">
                  {product.badge && (
                    <span className="ecom-card-badge">{product.badge}</span>
                  )}

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    className={`ecom-card-fav-btn ${isFav ? 'is-fav' : ''}`}
                    aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={isFav ? '#ef4444' : 'none'}
                      stroke={isFav ? '#ef4444' : 'currentColor'}
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="ecom-card-img"
                    loading="lazy"
                    onClick={() => setQuickViewProduct(product)}
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Quick View Overlay on Hover */}
                  <button
                    type="button"
                    className="ecom-quick-view-btn"
                    onClick={() => setQuickViewProduct(product)}
                  >
                    Quick View
                  </button>
                </div>

                {/* Info & Pricing */}
                <div className="ecom-card-info">
                  <div className="ecom-card-cat-row">
                    <span className="ecom-card-cat">{product.type || product.category}</span>
                    <div className="ecom-card-rating">
                      <span style={{ color: '#f59e0b' }}>★</span>
                      <span>{product.rating}</span>
                      <span style={{ color: '#888' }}>({product.reviewCount})</span>
                    </div>
                  </div>

                  <h3
                    className="ecom-card-name"
                    onClick={() => setQuickViewProduct(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    {product.name}
                  </h3>

                  <div className="ecom-card-price-row">
                    <span className="ecom-card-price">
                      {formatPrice(product.price)}
                    </span>
                    <span className="ecom-card-stock">In Stock</span>
                  </div>

                  {/* Size Selection Pills */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="ecom-card-sizes">
                      <span className="ecom-size-label">Size:</span>
                      <div className="ecom-size-pills-row">
                        {product.sizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            className={`ecom-size-pill ${activeSize === sz ? 'is-selected' : ''}`}
                            onClick={() => handleSizeSelect(product.id, sz)}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to Bag Button */}
                  <button
                    type="button"
                    className="ecom-card-add-btn"
                    onClick={() => handleAdd(product)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
