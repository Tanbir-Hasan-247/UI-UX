import React from 'react';
import { useRunway } from '../context/RunwayContext.jsx';

export const Header = () => {
  const {
    cartCount,
    setIsBagOpen,
    orders,
    setIsOrderHistoryOpen,
    wishlist,
    setIsWishlistOpen,
  } = useRunway();

  return (
    <header className="site-header shopify-section-group-header-group">
      <a href="./" className="brand" aria-label="Damlook home">
        VELVORYX
      </a>

      <nav aria-label="Main navigation">
        <a href="./" aria-current="page">Runway</a>
        <a
          href="#shop-catalog"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('shop-catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Shop Collection
        </a>
      </nav>

      {/* Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => setIsWishlistOpen(true)}
          title="View Wishlist"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: 'inherit',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length > 0 ? '#111' : 'none'} stroke="currentColor" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {wishlist.length > 0 && (
            <span
              style={{
                fontSize: '10px',
                background: '#111',
                color: '#fff',
                borderRadius: '999px',
                padding: '1px 6px',
                fontWeight: 700,
              }}
            >
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Orders Button */}
        <button
          type="button"
          onClick={() => setIsOrderHistoryOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: 'inherit',
          }}
        >
          <span>Orders</span>
          {orders.length > 0 && (
            <span
              style={{
                fontSize: '10px',
                background: '#111',
                color: '#fff',
                borderRadius: '999px',
                padding: '1px 6px',
                fontWeight: 700,
              }}
            >
              {orders.length}
            </span>
          )}
        </button>

        {/* Bag Button */}
        <button
          id="open-bag"
          aria-label="Open styling bag"
          type="button"
          onClick={() => setIsBagOpen(true)}
        >
          <svg
            width="22"
            height="24"
            viewBox="0 0 24 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <path d="M4 8h16l1 16H3L4 8zM8 8V6a4 4 0 0 1 8 0v2" />
          </svg>
          <span data-cart-count>{cartCount}</span>
        </button>
      </div>
    </header>
  );
};
