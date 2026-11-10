import React, { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
}) => {
  const [activeTab, setActiveTab] = useState('Runway');

  const navItems = [
    { label: 'Runway', href: '#runway' },
    { label: 'The Maison', href: '#vision' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Shop', href: '#collection' },
  ];

  const departments = [
    { label: 'Collections', href: '#collection' },
    { label: 'Clothing', href: '#collection' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Savoir-Faire', href: '#craft' },
    { label: 'Accessories', href: '#collection' },
    { label: 'Our World', href: '#vision' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    label: string,
    href: string
  ) => {
    e.preventDefault();
    setActiveTab(label);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="r1">
        <a
          className="brand wide"
          href="#runway"
          aria-label="Maison Vell"
          onClick={(e) => handleNavClick(e, 'Runway', '#runway')}
        >
          Maison Vell
        </a>

        <nav className="tabs wide" aria-label="Sections">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={activeTab === item.label ? 'on' : ''}
              href={item.href}
              aria-current={activeTab === item.label ? 'page' : undefined}
              onClick={(e) => handleNavClick(e, item.label, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="acct wide">
          <a
            href="#login"
            onClick={(e) => {
              e.preventDefault();
              alert('Maison Vell Client Account Portal: Guest Session Active');
            }}
          >
            Login
          </a>

          <button
            type="button"
            className="acct-btn"
            aria-label="Search Collection"
            onClick={onOpenSearch}
          >
            <svg viewBox="0 0 24 24">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 5 5" />
            </svg>
          </button>

          <button
            type="button"
            className="acct-btn wishlist-icon-btn"
            aria-label="Saved Pieces"
            onClick={onOpenWishlist}
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.6 4.6 0 0 1 20.500 9C20.500 15 12 20 12 20Z" />
            </svg>
            {wishlistCount > 0 && <span className="acct-badge">{wishlistCount}</span>}
          </button>

          <button
            type="button"
            className="acct-btn cart-icon-btn"
            aria-label="Shopping Bag"
            onClick={onOpenCart}
          >
            <svg viewBox="0 0 24 24">
              <path d="M5 8h14l1 13H4Z" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
            {cartCount > 0 && <span className="acct-badge">{cartCount}</span>}
          </button>

          <button
            type="button"
            className="cart-label-btn"
            onClick={onOpenCart}
          >
            Cart (<span id="cart">{cartCount}</span>)
          </button>
        </div>
      </div>

      <nav className="r2 wide" aria-label="Departments">
        {departments.map((dept) => (
          <a
            key={dept.label}
            href={dept.href}
            onClick={(e) => handleNavClick(e, dept.label, dept.href)}
          >
            {dept.label}
          </a>
        ))}
      </nav>
    </header>
  );
};
