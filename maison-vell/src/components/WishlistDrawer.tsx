import React from 'react';
import { CatalogProduct } from '../data/catalogData.ts';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: CatalogProduct[];
  onRemoveFromWishlist: (id: string) => void;
  onMoveToCart: (product: CatalogProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  savedProducts,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3 className="wide">SAVED PIECES</h3>
            <span className="drawer-count">({savedProducts.length} {savedProducts.length === 1 ? 'ITEM' : 'ITEMS'})</span>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close wishlist">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {savedProducts.length === 0 ? (
            <div className="drawer-empty">
              <svg viewBox="0 0 24 24" className="drawer-empty-icon">
                <path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.6 4.6 0 0 1 20.500 9C20.500 15 12 20 12 20Z" />
              </svg>
              <h4 className="wide">NO SAVED PIECES</h4>
              <p>Click the bookmark or heart icon on any runway look or collection piece to curate your private selection.</p>
              <button className="drawer-continue-btn wide" onClick={onClose}>
                DISCOVER RUNWAY
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {savedProducts.map((product) => (
                <div key={product.id} className="cart-item-row">
                  <div className="cart-item-thumb">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h4 className="wide">{product.name}</h4>
                      <button
                        className="cart-item-remove"
                        onClick={() => onRemoveFromWishlist(product.id)}
                        aria-label={`Remove ${product.name}`}
                      >
                        ✕
                      </button>
                    </div>
                    {product.runwayLook && (
                      <span className="cart-item-meta wide">Runway Look {product.runwayLook}</span>
                    )}
                    <span className="cart-item-subtotal">{product.price}</span>
                    <button
                      className="wishlist-add-btn wide"
                      onClick={() => onMoveToCart(product)}
                    >
                      + ADD TO BAG
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
