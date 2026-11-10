import React, { useState } from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { PRODUCTS, formatMoney } from '../data/runwayCatalog.js';
import { SizePicker } from './SizePicker.jsx';

export const ProductCard = ({
  lookIndex,
  productInfo,
  isMobile,
  onCardHover,
  onCardLeave,
}) => {
  const {
    addBagItems,
    addedItems,
    setAddedItems,
    openPickerKey,
    setOpenPickerKey,
    selectedVariants,
    touchedCards,
    hotCard,
    setEngaged,
    setQuickViewProduct,
  } = useRunway();

  const product = PRODUCTS[productInfo.productId];
  if (!product) return null;

  const cardKey = `${lookIndex}-${productInfo.cardId}`;
  const isAdded = !!addedItems[lookIndex]?.[productInfo.cardId];
  const isPicking = openPickerKey === cardKey;
  const isHot = hotCard === productInfo.cardId;
  const [loading, setLoading] = useState(false);

  const handleAddClick = async () => {
    setEngaged(true);
    if (isAdded || loading) return;

    // If size was already selected or default
    if (touchedCards[cardKey]) {
      const variantId = selectedVariants[cardKey];
      if (variantId) {
        setLoading(true);
        try {
          addBagItems([{ id: Number(variantId), quantity: 1 }]);
          setAddedItems((prev) => ({
            ...prev,
            [lookIndex]: { ...(prev[lookIndex] || {}), [productInfo.cardId]: true },
          }));
          setOpenPickerKey(null);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
        return;
      }
    }

    // Otherwise toggle picker
    setOpenPickerKey(isPicking ? null : cardKey);
  };

  return (
    <li
      className={`rw__item ${isHot ? 'is-hot' : ''} ${isPicking ? 'is-picking' : ''} ${
        isAdded ? 'is-added' : ''
      } ${loading ? 'is-loading' : ''}`}
      data-rw-card={productInfo.cardId}
      style={{ '--i': productInfo.cardId }}
      data-title={product.name}
      onPointerEnter={() => onCardHover && onCardHover(productInfo.cardId)}
      onPointerLeave={() => onCardLeave && onCardLeave()}
    >
      {productInfo.tag && (
        <span className="rw__tag" aria-hidden="true">
          <span className="rw__tag-text">{productInfo.tag}</span>
        </span>
      )}
      <button
        type="button"
        className="rw__media"
        style={{ border: 'none', background: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}
        tabIndex="-1"
        aria-hidden="true"
        onClick={(e) => {
          e.preventDefault();
          setQuickViewProduct(product);
        }}
      >
        <img
          src={product.image}
          loading="lazy"
          decoding="async"
          alt=""
          width={product.width}
          height={product.height}
        />
        <span className="rw__num">{productInfo.cardId}</span>
      </button>

      <div className="rw__info">
        <span className="rw__type">{product.type}</span>
        <button
          type="button"
          className="rw__name"
          style={{ border: 'none', background: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
          onClick={(e) => {
            e.preventDefault();
            setQuickViewProduct(product);
          }}
        >
          {product.name}
        </button>
        <span className="rw__price">
          <span>{formatMoney(product.price)}</span>
        </span>
      </div>

      <button
        type="button"
        className="rw__add"
        data-rw-add
        aria-expanded={isPicking ? 'true' : 'false'}
        aria-label={
          isAdded ? `Added to bag: ${product.name}` : `Add to bag: ${product.name}`
        }
        onClick={handleAddClick}
      >
        <svg
          className="rw__i-plus"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M12 4v16M4 12h16" />
        </svg>
        <svg
          className="rw__i-check"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4.5 12.5l5 5L19.5 7" />
        </svg>
        <svg
          className="rw__i-spin"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M12 3a9 9 0 1 1-9 9" />
        </svg>
      </button>

      {!isMobile && isPicking && (
        <SizePicker
          lookIndex={lookIndex}
          productInfo={productInfo}
          onClose={() => setOpenPickerKey(null)}
        />
      )}
    </li>
  );
};
