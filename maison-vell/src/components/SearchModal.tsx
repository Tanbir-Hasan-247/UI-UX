import React, { useState, useEffect, useRef } from 'react';
import { CATALOG_PRODUCTS, CatalogProduct } from '../data/catalogData.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? CATALOG_PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.runwayLook && `look ${p.runwayLook}`.includes(q))
        );
      })
    : [];

  const quickTags = ['Trench Dress', 'Cashmere Coat', 'Pleated Gown', 'Silk Blouse', 'Bucket Bag', 'Gold Belt'];

  return (
    <div className="search-backdrop" onClick={onClose}>
      <div className="search-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="search-top">
          <div className="search-input-wrap">
            <svg className="search-icon" viewBox="0 0 24 24">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 5 5" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="search-input wide"
              placeholder="SEARCH PIECES, LOOKS, FABRICS..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button className="search-close wide" onClick={onClose} aria-label="Close search">
            ESC / CLOSE
          </button>
        </div>

        <div className="search-tags">
          <span className="search-tags-label wide">TRENDING:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              className="search-tag-chip"
              onClick={() => setQuery(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="search-body">
          {query.trim() === '' ? (
            <div className="search-empty-state">
              <p className="wide">Explore the Spring Summer 2027 Runway Archive</p>
              <span>Type a look number (e.g. &ldquo;Look 15&rdquo;), silk, coat, or accessories.</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="search-empty-state">
              <p className="wide">No pieces found matching &ldquo;{query}&rdquo;</p>
              <span>Please check your spelling or browse our curated collections.</span>
            </div>
          ) : (
            <div className="search-results-grid">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="search-item-card"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <div className="search-item-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="search-item-info">
                    {product.runwayLook && (
                      <span className="search-item-look wide">LOOK {product.runwayLook}</span>
                    )}
                    <h4 className="wide">{product.name}</h4>
                    <span className="search-item-price">{product.price}</span>
                  </div>
                  <button
                    className="search-item-add wide"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                  >
                    + ADD
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
