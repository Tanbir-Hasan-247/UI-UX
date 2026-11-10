import React, { useRef, useState, useEffect } from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { LOOKS } from '../data/runwayCatalog.js';
import { Stage } from './Stage.jsx';
import { LookPanel } from './LookPanel.jsx';
import { SizePicker } from './SizePicker.jsx';

export const RunwaySection = () => {
  const runwayRef = useRef(null);
  const {
    activeLookIndex,
    isPlaying,
    isZoomed,
    setIsZoomed,
    openPickerKey,
    setOpenPickerKey,
    isStill,
  } = useRunway();

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 749px)').matches : false
  );
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 749px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Staged intro reveal observer
  useEffect(() => {
    const el = runwayRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -22% 0px' }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  // Escape key closes picker or zoom
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (openPickerKey) {
          setOpenPickerKey(null);
        } else if (isZoomed) {
          setIsZoomed(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openPickerKey, isZoomed, setOpenPickerKey, setIsZoomed]);

  // Determine current active picker product if on mobile
  let mobilePickerProduct = null;
  if (isMobile && openPickerKey) {
    const [lIdx, cardId] = openPickerKey.split('-').map(Number);
    const look = LOOKS[lIdx];
    if (look) {
      mobilePickerProduct = look.products.find((p) => p.cardId === cardId);
    }
  }

  const modeClass = isMobile ? 'rw--classic' : 'rw--ring';

  return (
    <>
      <runway-section
        id="Runway-template--28035983671601__the_runway_wdM8BG"
        ref={runwayRef}
        className={`rw rw--add-icon rw--list has-dividers has-border rw--js ${modeClass} ${
          isRevealed ? 'is-revealed' : ''
        } ${isStill ? 'rw--still' : ''} ${isPlaying ? 'is-playing' : ''} ${isZoomed ? 'rw--zoom' : ''} ${
          openPickerKey && isMobile ? 'rw--picking' : ''
        }`}
        data-feel="balanced"
        data-blur="true"
        data-mblur="true"
        data-style="ring"
        data-mstyle="classic"
        data-fit="true"
        data-height-mode="original"
        data-height-vh="100"
        data-mheight-mode="custom"
        data-mheight-vh="109"
        data-reflect="false"
        data-autoplay="true"
        data-speed="5000"
        data-after-add="stay"
        data-bundle-code=""
        data-msg-choose="Pick a size for: [items]"
        data-msg-error="Couldn’t add to bag. Please try again."
        data-msg-soldout="Sold out"
        style={{
          '--rw-c-stage': '#ffffff',
          '--rw-c-panel': '#ffffff',
          '--rw-c-text': '#151413',
          '--rw-c-muted': '#66625c',
          '--rw-c-accent': '#0e0e0e',
          '--rw-c-on-accent': '#ffffff',
          '--rw-c-line': '#c8c8c8',
          '--rw-card': '#DFDFDF',
          '--rw-hf': 'inherit',
          '--rw-hw': 400,
          '--rw-h-d': '46px',
          '--rw-h-m': '24px',
          '--rw-sub-d': '12px',
          '--rw-sub-m': '12px',
          '--rw-eyebrow-d': '11px',
          '--rw-eyebrow-m': '10px',
          '--rw-label-d': '10px',
          '--rw-label-m': '9px',
          '--rw-chip-d': '17px',
          '--rw-chip-m': '18px',
          '--rw-ph-d': '18px',
          '--rw-ph-m': '16px',
          '--rw-pt-size-d': '13px',
          '--rw-pt-size-m': '12px',
          '--rw-price-d': '12px',
          '--rw-price-m': '12px',
          '--rw-opt-d': '11px',
          '--rw-opt-m': '11px',
          '--rw-total-d': '16px',
          '--rw-total-m': '16px',
          '--rw-thumb-d': '92px',
          '--rw-thumb-m': '62px',
          '--rw-tag-top': '18px',
          '--rw-tag-left': '0px',
          '--rw-thumb-radius': '0px',
          '--rw-morph': '900ms',
          '--rw-bar-r': '20px',
          '--rw-panel-w': '380px',
          '--rw-panel-pad-d': '32px',
          '--rw-radius': '0px',
          '--rw-max': 'none',
          '--rw-speed': '5s',
          '--rw-ax': '40%',
          '--rw-btn-radius': '0px',
          '--rw-pill-radius': '30px',
          '--rw-add-radius': '20px',
        }}
      >
        <div className="rw__sticky">
          <div className="rw__grid">
            <Stage isMobile={isMobile} runwayRef={runwayRef} />
            <LookPanel isMobile={isMobile} />
          </div>
        </div>
      </runway-section>

      {/* Mobile Bottom Sheet Host */}
      {isMobile && openPickerKey && mobilePickerProduct && (
        <div
          className={`rw-sheet-host ${openPickerKey ? 'is-open' : ''}`}
          style={{
            '--rw-panel': '#ffffff',
            '--rw-text': '#151413',
            '--rw-muted': '#66625c',
            '--rw-line': '#c8c8c8',
            '--rw-accent': '#0e0e0e',
            '--rw-on-accent': '#ffffff',
            '--rw-bar-r': '20px',
            '--rw-pill-radius': '30px',
          }}
        >
          <button
            type="button"
            className="rw__pick-scrim"
            tabIndex="-1"
            aria-hidden="true"
            data-rw-pick-close
            onClick={() => setOpenPickerKey(null)}
          ></button>
          <SizePicker
            lookIndex={activeLookIndex}
            productInfo={mobilePickerProduct}
            onClose={() => setOpenPickerKey(null)}
            isMobileSheet={true}
          />
        </div>
      )}
    </>
  );
};
