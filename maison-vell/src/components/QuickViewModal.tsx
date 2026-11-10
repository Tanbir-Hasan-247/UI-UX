import React, { useState } from 'react';
import { CatalogProduct } from '../data/catalogData.ts';

interface QuickViewModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
  onAddToCart: (product: CatalogProduct, size?: string, color?: string) => void;
  isSaved: boolean;
  onToggleSaved: (product: CatalogProduct) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isSaved,
  onToggleSaved,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0] : ''
  );
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="quickview-backdrop" onClick={onClose}>
      <div className="quickview-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="quickview-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="quickview-grid">
          <div className="quickview-media">
            <img src={product.image} alt={product.name} />
            {product.runwayLook && (
              <span className="quickview-badge wide">RUNWAY LOOK {product.runwayLook}</span>
            )}
          </div>

          <div className="quickview-content">
            <div className="quickview-header">
              <span className="quickview-category wide">{product.category}</span>
              <h2 className="quickview-title wide">{product.name}</h2>
              <span className="quickview-price wide">{product.price}</span>
            </div>

            <p className="quickview-desc">{product.description}</p>

            <div className="quickview-fabric">
              <span className="quickview-spec-label wide">MATERIAL & ATELIER ORIGIN</span>
              <span className="quickview-spec-val">{product.fabric} — Handcrafted in Milan</span>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="quickview-section">
                <span className="quickview-spec-label wide">
                  COLOR: <b>{selectedColor}</b>
                </span>
                <div className="quickview-colors-row">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`quickview-color-pill ${selectedColor === c ? 'active' : ''}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="quickview-section">
                <div className="quickview-size-header">
                  <span className="quickview-spec-label wide">SELECT SIZE</span>
                  <a href="#size-guide" className="quickview-size-guide" onClick={(e) => e.preventDefault()}>
                    Size Guide
                  </a>
                </div>
                <div className="quickview-sizes-row">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`quickview-size-btn wide ${selectedSize === s ? 'active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="quickview-actions">
              <button
                className={`quickview-add-btn wide ${addedNotice ? 'added' : ''}`}
                onClick={handleAdd}
              >
                {addedNotice ? '✓ ADDED TO BAG' : '+ ADD TO BAG'}
              </button>
              <button
                className={`quickview-fav-btn ${isSaved ? 'active' : ''}`}
                onClick={() => onToggleSaved(product)}
                aria-label="Save to wishlist"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.6 4.6 0 0 1 20.500 9C20.500 15 12 20 12 20Z" />
                </svg>
              </button>
            </div>

            <div className="quickview-perks">
              <div className="quickview-perk-item">
                <svg viewBox="0 0 24 24">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>Complimentary insured express delivery</span>
              </div>
              <div className="quickview-perk-item">
                <svg viewBox="0 0 24 24">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span>30-day effortless complimentary returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
