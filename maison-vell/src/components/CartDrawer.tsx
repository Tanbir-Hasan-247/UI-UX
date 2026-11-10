import React from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  priceNumber: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.priceNumber * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3 className="wide">SHOPPING BAG</h3>
            <span className="drawer-count">({totalCount} {totalCount === 1 ? 'PIECE' : 'PIECES'})</span>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close bag">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <svg viewBox="0 0 24 24" className="drawer-empty-icon">
                <path d="M5 8h14l1 13H4Z" />
                <path d="M9 10V6a3 3 0 0 1 6 0v4" />
              </svg>
              <h4 className="wide">YOUR BAG IS EMPTY</h4>
              <p>Explore the runway collection and select pieces to create your bespoke ensemble.</p>
              <button className="drawer-continue-btn wide" onClick={onClose}>
                CONTINUE BROWSING
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-thumb">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h4 className="wide">{item.name}</h4>
                      <button
                        className="cart-item-remove"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>
                    {item.size && <span className="cart-item-meta">Size: {item.size}</span>}
                    {item.color && <span className="cart-item-meta">Color: {item.color}</span>}
                    <div className="cart-item-footer">
                      <div className="cart-qty-ctrl">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="cart-item-subtotal">
                        ${(item.priceNumber * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-shipping-note">
              <span>✓ Complimentary White Glove Global Delivery</span>
              <span>✓ Bespoke Gift Packaging with Maison Seal</span>
            </div>
            <div className="drawer-subtotal-row">
              <span className="wide">SUBTOTAL</span>
              <span className="drawer-total-price wide">${total.toLocaleString()}</span>
            </div>
            <button className="drawer-checkout-btn wide" onClick={onCheckout}>
              PROCEED TO SECURE CHECKOUT
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
