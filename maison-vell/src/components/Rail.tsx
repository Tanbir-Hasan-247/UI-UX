import React from 'react';
import { ITEMS, PIECES_IMAGE, ItemData } from '../data/runwayData.ts';
import { SvgCrop } from './SvgCrop.tsx';

interface RailProps {
  railRef: React.RefObject<HTMLElement | null>;
  cardRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  savedItems: Record<number, boolean>;
  onToggleFav: (index: number) => void;
  onAddToCart: () => void;
}

export const Rail: React.FC<RailProps> = ({
  railRef,
  cardRefs,
  savedItems,
  onToggleFav,
  onAddToCart,
}) => {
  return (
    <aside className="rail" id="rail" ref={railRef} aria-label="Pieces in this look">
      {ITEMS.map((item: ItemData, i: number) => (
        <article
          key={i}
          className={`card${i % 2 ? ' alt' : ''}`}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
        >
          <button
            className="fav"
            aria-pressed={!!savedItems[i]}
            aria-label={`Save ${item.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav(i);
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.600 4.600 0 0 1 20.500 9C20.500 15 12 20 12 20Z" />
            </svg>
          </button>
          <span className="shot">
            <SvgCrop
              href={PIECES_IMAGE}
              x0={item.x0}
              y0={item.y0}
              w={item.x1 - item.x0}
              h={item.y1 - item.y0}
              sheetW={960}
              sheetH={720}
            />
          </span>
          <div className="meta">
            <h3 className="wide">{item.name}</h3>
            <span>{item.price}</span>
            <button
              className="add"
              aria-label={`Add ${item.name} to cart`}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            />
          </div>
        </article>
      ))}
    </aside>
  );
};
