import React from 'react';
import { LOOKS, Y0, Y1, FIRST_LOOK_NUM, MODELS_IMAGE } from '../data/runwayData.ts';
import { SvgCrop } from './SvgCrop.tsx';

interface StageProps {
  stageRef: React.RefObject<HTMLElement | null>;
  modelRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  rollRef: React.RefObject<HTMLSpanElement | null>;
  ringRef: React.RefObject<HTMLDivElement | null>;
  onShopLookClick?: () => void;
}

export const Stage: React.FC<StageProps> = ({
  stageRef,
  modelRefs,
  rollRef,
  ringRef,
  onShopLookClick,
}) => {
  const N = LOOKS.length;

  return (
    <section
      className="stage"
      id="stage"
      ref={stageRef}
      aria-label="Runway looks. Drag, scroll or use the arrow keys to change look."
      tabIndex={0}
    >
      <div className="line" id="line">
        {LOOKS.map(([a, b], i) => (
          <div
            key={i}
            className="m"
            data-i={i}
            ref={(el) => {
              modelRefs.current[i] = el;
            }}
          >
            <SvgCrop
              href={MODELS_IMAGE}
              x0={a}
              y0={Y0}
              w={b - a}
              h={Y1 - Y0}
              sheetW={960}
              sheetH={540}
            />
          </div>
        ))}
      </div>

      <div className="intro">
        <h2 className="wide">Spring Summer 2027</h2>
        <p>
          A study in softness and strength. The new season collection from Maison
          Vell blends delicate textures and modern silhouettes, crafted for a more
          beautiful tomorrow.
        </p>
      </div>

      <div className="tag">
        <div className="look wide" aria-live="polite">
          <span>Look</span>
          <span className="win">
            <span className="roll" id="roll" ref={rollRef}>
              {Array.from({ length: N + 1 }, (_, i) => (
                <b key={i}>{FIRST_LOOK_NUM + (i % N)}</b>
              ))}
            </span>
          </span>
        </div>
        <a
          className="shop wide"
          href="#lookbook"
          onClick={(e) => {
            e.preventDefault();
            if (onShopLookClick) {
              onShopLookClick();
            } else {
              document.querySelector('#lookbook')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Shop the look
        </a>
      </div>

      <a
        href="#collection"
        className="scroll-hint wide"
        aria-label="Discover Full Collection"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>DISCOVER FULL COLLECTION</span>
        <svg viewBox="0 0 24 24" className="scroll-arrow">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>

      <div className="ring" id="ring" ref={ringRef} />
    </section>
  );
};
