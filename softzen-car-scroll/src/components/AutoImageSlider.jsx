import { useEffect, useState } from 'react'

export default function AutoImageSlider({
  slides = [],
  intervalMs = 3800,
  badge,
  imageFilter = 'none',
  preferredType,
  topRightSlot,
  className = '',
  onSlideChange,
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [prevPreferred, setPrevPreferred] = useState(preferredType)

  if (preferredType !== prevPreferred) {
    setPrevPreferred(preferredType)
    const matchIdx = slides.findIndex((s) => s.type === preferredType)
    if (matchIdx !== -1) {
      setIndex(matchIdx)
    }
  }

  useEffect(() => {
    if (paused || slides.length <= 1) return undefined
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [paused, slides.length, intervalMs])

  useEffect(() => {
    if (slides[index]) {
      onSlideChange?.(slides[index], index)
    }
  }, [index, slides, onSlideChange])

  if (!slides.length) return null

  const safeIndex = index % slides.length
  const current = slides[safeIndex]

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goNext = () => {
    setIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <div
      className={`auto-slider ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="auto-slider-viewport">
        {slides.map((slide, idx) => {
          const isActive = idx === safeIndex
          const filter =
            slide.type === 'interior' ? 'none' : imageFilter || 'none'
          return (
            <img
              key={`${slide.src}-${idx}`}
              src={slide.src}
              alt={slide.label || 'Vehicle preview'}
              className={`auto-slider-img ${isActive ? 'auto-slider-img--active' : ''}`}
              style={{ filter }}
              loading={idx === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                if (slide.fallback) e.currentTarget.src = slide.fallback
              }}
            />
          )
        })}

        <div className="auto-slider-scrim" />

        {topRightSlot && (
          <div className="auto-slider-top-right">{topRightSlot}</div>
        )}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="auto-slider-arrow auto-slider-arrow--prev"
              onClick={goPrev}
              aria-label="Previous vehicle image"
            >
              ‹
            </button>
            <button
              type="button"
              className="auto-slider-arrow auto-slider-arrow--next"
              onClick={goNext}
              aria-label="Next vehicle image"
            >
              ›
            </button>
          </>
        )}

        <div className="auto-slider-bottom">
          <div className="auto-slider-meta">
            {badge && <span className="auto-slider-pill">{badge}</span>}
            {current.label && (
              <span className="auto-slider-caption">{current.label}</span>
            )}
          </div>

          {slides.length > 1 && (
            <div
              className="auto-slider-dots"
              role="tablist"
              aria-label="Slide navigation"
            >
              {slides.map((slide, idx) => (
                <button
                  key={`${slide.label}-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={idx === safeIndex}
                  aria-label={`View slide ${idx + 1}`}
                  className={`auto-slider-dot ${idx === safeIndex ? 'auto-slider-dot--active' : ''}`}
                  onClick={() => setIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
