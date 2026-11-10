import React, { useState } from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { PRODUCTS, formatMoney } from '../data/runwayCatalog.js';

export const SizePicker = ({
  lookIndex,
  productInfo,
  onClose,
  isMobileSheet = false,
}) => {
  const {
    addBagItems,
    selectedVariants,
    setSelectedVariants,
    setTouchedCards,
    setAddedItems,
    setOpenPickerKey,
    setEngaged,
  } = useRunway();

  const product = PRODUCTS[productInfo.productId];
  if (!product) return null;

  const cardKey = `${lookIndex}-${productInfo.cardId}`;
  const currentSelectedVariantId = selectedVariants[cardKey] || product.variants[0]?.id;
  const currentVariant = product.variants.find((v) => v.id === currentSelectedVariantId) || product.variants[0];
  const [selectedOption, setSelectedOption] = useState(currentVariant?.o[0] || product.sizes[0]);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (size) => {
    setSelectedOption(size);
    setEngaged(true);
    setTouchedCards((prev) => ({ ...prev, [cardKey]: true }));
    const match = product.variants.find((v) => v.o[0] === size);
    if (match) {
      setSelectedVariants((prev) => ({ ...prev, [cardKey]: match.id }));
    }
  };

  const handleConfirm = async () => {
    setTouchedCards((prev) => ({ ...prev, [cardKey]: true }));
    const match = product.variants.find((v) => v.o[0] === selectedOption && v.a);
    if (!match) return;

    setLoading(true);
    try {
      addBagItems([{ id: match.id, quantity: 1 }]);
      setAddedItems((prev) => ({
        ...prev,
        [lookIndex]: { ...(prev[lookIndex] || {}), [productInfo.cardId]: true },
      }));
      setOpenPickerKey(null);
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rw__picker"
      id={`Picker-template--28035983671601__the_runway_wdM8BG-${lookIndex}-${productInfo.cardId}`}
      data-rw-picker
    >
      <div className="rw__picker-head">
        <span className="rw__picker-thumb" aria-hidden="true">
          <img
            src={product.image}
            loading="lazy"
            decoding="async"
            alt=""
            width="160"
            height={product.height > 500 ? '225' : '160'}
          />
        </span>
        <span className="rw__picker-meta">
          <span className="rw__picker-title">{product.name}</span>
          <span className="rw__picker-price">{formatMoney(product.price)}</span>
        </span>
        <button
          type="button"
          className="rw__picker-close"
          data-rw-pick-close
          aria-label="Close"
          onClick={onClose}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>

      <fieldset className="rw__opt">
        <legend className="rw__opt-name">{product.optName}</legend>
        <div className="rw__opt-values">
          {product.sizes.map((size) => {
            const variantForSize = product.variants.find((v) => v.o[0] === size);
            const isAvailable = variantForSize ? variantForSize.a : false;
            const isChecked = selectedOption === size;

            return (
              <label
                key={size}
                className={`rw__pill ${!isAvailable ? 'is-unavailable' : ''}`}
              >
                <input
                  type="radio"
                  name={`Opt-template--28035983671601__the_runway_wdM8BG-${lookIndex}-${productInfo.cardId}`}
                  value={size}
                  data-rw-option="0"
                  checked={isChecked}
                  onChange={() => handleOptionChange(size)}
                />
                <span className="rw__pill-label">{size}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        className={`rw__confirm ${loading ? 'is-loading' : ''}`}
        data-rw-confirm
        onClick={handleConfirm}
      >
        <span data-rw-confirm-label data-add="Add to bag">
          Add to bag
        </span>
        <span className="rw__sr"> — {product.name}</span>
      </button>
    </div>
  );
};
