import React from 'react';
import { CATEGORIES } from '../data/runwayCatalog.js';

export const SearchAndFilterHub = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  totalResults,
}) => {
  return (
    <section className="ecom-hub-section" id="shop-catalog">
      <div className="ecom-container">
        {/* Section Header */}
        <div className="ecom-hub-header">
          <div>
            <span className="ecom-eyebrow">Flagship Storefront</span>
            <h2 className="ecom-hub-title">Explore The Full Collection</h2>
            <p className="ecom-hub-subtitle">
              Discover street-engineered silhouettes, iconic retros, and heavyweight layering essentials designed for the runway and the streets.
            </p>
          </div>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="ecom-controls-bar">
          {/* Live Search Input */}
          <div className="ecom-search-box">
            <svg
              className="ecom-search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search sneakers, hoodies, tees, cargos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                type="button"
                className="ecom-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="ecom-sort-box">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="ecom-categories-pills">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`ecom-pill-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="ecom-results-count">
          Showing <strong>{totalResults}</strong> items
          {selectedCategory !== 'All Pieces' && ` in ${selectedCategory}`}
          {searchQuery && ` for "${searchQuery}"`}
        </div>
      </div>
    </section>
  );
};
