import React, { useState } from 'react';
import { RUNWAY_LOOKS_DETAILED, CATALOG_PRODUCTS, CatalogProduct } from '../data/catalogData.ts';

interface LookbookSectionProps {
  onQuickView: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct) => void;
  onAddMultipleToCart: (products: CatalogProduct[]) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  onQuickView,
  onAddToCart,
  onAddMultipleToCart,
}) => {
  const [activeLookNum, setActiveLookNum] = useState<number>(15);

  const currentLook =
    RUNWAY_LOOKS_DETAILED.find((l) => l.lookNumber === activeLookNum) ||
    RUNWAY_LOOKS_DETAILED[0];

  const ensembleProducts = currentLook.ensembleIds
    .map((id) => CATALOG_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is CatalogProduct => p !== undefined);

  const handleAddEntireLook = () => {
    onAddMultipleToCart(ensembleProducts);
  };

  return (
    <section className="lookbook-section" id="lookbook">
      <div className="lookbook-container">
        <div className="lookbook-header">
          <span className="section-eyebrow wide">CURATED ENSEMBLES</span>
          <h2 className="lookbook-title wide">SHOP THE RUNWAY LOOKS</h2>
          <p className="lookbook-subhead">
            Select a runway silhouette to examine each constituent piece or acquire the complete ensemble in a single touch.
          </p>

          <div className="look-tabs-row">
            {RUNWAY_LOOKS_DETAILED.map((look) => (
              <button
                key={look.lookNumber}
                className={`look-tab-btn wide ${activeLookNum === look.lookNumber ? 'active' : ''}`}
                onClick={() => setActiveLookNum(look.lookNumber)}
              >
                LOOK {look.lookNumber}
              </button>
            ))}
          </div>
        </div>

        <div className="lookbook-display-card">
          <div className="lookbook-card-info">
            <span className="lookbook-theme-badge wide">{currentLook.theme}</span>
            <h3 className="lookbook-ensemble-title wide">{currentLook.title}</h3>
            <p className="lookbook-ensemble-desc">{currentLook.subtitle}</p>

            <div className="lookbook-total-box">
              <span className="wide">COMPLETE ENSEMBLE:</span>
              <span className="lookbook-total-price wide">{currentLook.totalPrice}</span>
            </div>

            <button
              className="lookbook-add-entire-btn wide"
              onClick={handleAddEntireLook}
            >
              + ADD COMPLETE LOOK TO BAG ({ensembleProducts.length} PIECES)
            </button>
          </div>

          <div className="lookbook-pieces-grid">
            {ensembleProducts.map((product) => (
              <div key={product.id} className="lookbook-piece-card">
                <div
                  className="lookbook-piece-img-wrap"
                  onClick={() => onQuickView(product)}
                >
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="lookbook-piece-meta">
                  <span className="lookbook-piece-cat wide">{product.category}</span>
                  <h4
                    className="lookbook-piece-name wide"
                    onClick={() => onQuickView(product)}
                  >
                    {product.name}
                  </h4>
                  <span className="lookbook-piece-price">{product.price}</span>
                  <button
                    className="lookbook-piece-add-btn wide"
                    onClick={() => onAddToCart(product)}
                  >
                    + ADD PIECE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
