import React, { useState, useMemo } from 'react';
import { CATALOG_PRODUCTS, CatalogProduct } from '../data/catalogData.ts';

interface CatalogSectionProps {
  onQuickView: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct) => void;
  savedItemIds: Set<string>;
  onToggleSaved: (product: CatalogProduct) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onQuickView,
  onAddToCart,
  savedItemIds,
  onToggleSaved,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = ['All', 'Outerwear', 'Dresses', 'Tops', 'Trousers', 'Bags', 'Accessories'];

  const filteredProducts = useMemo(() => {
    let result = [...CATALOG_PRODUCTS];

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.runwayLook && `look ${p.runwayLook}`.includes(q))
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceNumber - b.priceNumber);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceNumber - a.priceNumber);
    } else if (sortBy === 'new') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [activeCategory, searchFilter, sortBy]);

  return (
    <section className="catalog-section" id="collection">
      <div className="catalog-container">
        <div className="catalog-header">
          <div className="catalog-title-area">
            <span className="section-eyebrow wide">FULL READY-TO-WEAR COLLECTION</span>
            <h2 className="catalog-heading wide">THE RUNWAY ARCHIVE</h2>
            <p className="catalog-subhead">
              Every garment reflects our dedication to tactile delicacy and sculptural integrity.
              Crafted in limited atelier quantities for discerning patrons.
            </p>
          </div>

          <div className="catalog-controls">
            <div className="catalog-search-box">
              <svg viewBox="0 0 24 24">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m15.5 15.5 5 5" />
              </svg>
              <input
                type="text"
                placeholder="Filter pieces or look..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
              {searchFilter && (
                <button onClick={() => setSearchFilter('')} aria-label="Clear filter">
                  ✕
                </button>
              )}
            </div>

            <div className="catalog-sort-box">
              <label htmlFor="sort-select" className="wide">SORT:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="catalog-select wide"
              >
                <option value="featured">FEATURED</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="new">NEW ARRIVALS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="catalog-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill wide ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.toUpperCase()}
              {cat === 'All'
                ? ` (${CATALOG_PRODUCTS.length})`
                : ` (${CATALOG_PRODUCTS.filter((p) => p.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="catalog-empty">
            <h3 className="wide">NO PIECES MATCH YOUR CRITERIA</h3>
            <p>Try refining your search keyword or selecting a different category filter.</p>
            <button
              className="catalog-reset-btn wide"
              onClick={() => {
                setActiveCategory('All');
                setSearchFilter('');
              }}
            >
              SHOW ALL PIECES
            </button>
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredProducts.map((product) => {
              const isSaved = savedItemIds.has(product.id);
              return (
                <article key={product.id} className="catalog-card">
                  <div
                    className="catalog-card-image-wrap"
                    onClick={() => onQuickView(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="catalog-card-img"
                    />

                    {product.runwayLook && (
                      <span className="card-look-badge wide">LOOK {product.runwayLook}</span>
                    )}

                    {product.isNew && <span className="card-new-badge wide">NEW</span>}

                    <button
                      className={`card-fav-btn ${isSaved ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaved(product);
                      }}
                      aria-label="Save piece"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.6 4.6 0 0 1 20.500 9C20.500 15 12 20 12 20Z" />
                      </svg>
                    </button>

                    <button
                      className="card-quickview-btn wide"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                    >
                      QUICK VIEW
                    </button>
                  </div>

                  <div className="catalog-card-body">
                    <div className="catalog-card-meta">
                      <span className="catalog-card-cat wide">{product.category}</span>
                      <h3
                        className="catalog-card-title wide"
                        onClick={() => onQuickView(product)}
                      >
                        {product.name}
                      </h3>
                      <span className="catalog-card-price">{product.price}</span>
                    </div>

                    <button
                      className="catalog-card-add-btn wide"
                      onClick={() => onAddToCart(product)}
                    >
                      + ADD TO BAG
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
