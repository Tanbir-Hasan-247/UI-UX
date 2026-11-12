import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 85

function getFramePath(index) {
  const num = String(index + 1).padStart(5, '0')
  return `/frames/frame${num}.png`
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

function getBeatStyle(progress, fadeInStart, peakStart, peakEnd, fadeOutEnd) {
  let opacity = 0
  if (progress >= fadeInStart && progress < peakStart) {
    opacity = (progress - fadeInStart) / (peakStart - fadeInStart)
  } else if (progress >= peakStart && progress <= peakEnd) {
    opacity = 1
  } else if (progress > peakEnd && progress <= fadeOutEnd) {
    opacity = 1 - (progress - peakEnd) / (fadeOutEnd - peakEnd)
  }

  opacity = clamp(opacity, 0, 1)
  const translateY = (1 - opacity) * 20

  return {
    opacity,
    transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
    pointerEvents: opacity > 0.5 ? 'auto' : 'none',
  }
}

export default function HeroScroll() {
  const trackRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const targetProgressRef = useRef(0)
  const smoothProgressRef = useRef(0)
  const lastDrawnFrameRef = useRef(-1)

  const [loadProgress, setLoadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [uiProgress, setUiProgress] = useState(0)

  // Preload all 85 frames
  useEffect(() => {
    let isCancelled = false
    let loadedCount = 0
    const images = new Array(TOTAL_FRAMES)

    const safetyTimer = setTimeout(() => {
      if (!isCancelled) setIsReady(true)
    }, 5000)

    for (let i = 0; i < TOTAL_FRAMES; i += 1) {
      const img = new Image()
      img.src = getFramePath(i)
      img.onload = () => {
        if (isCancelled) return
        loadedCount += 1
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))
        if (loadedCount === TOTAL_FRAMES) {
          clearTimeout(safetyTimer)
          setIsReady(true)
        }
      }
      img.onerror = () => {
        if (isCancelled) return
        loadedCount += 1
        if (loadedCount === TOTAL_FRAMES) {
          clearTimeout(safetyTimer)
          setIsReady(true)
        }
      }
      images[i] = img
    }

    imagesRef.current = images

    return () => {
      isCancelled = true
      clearTimeout(safetyTimer)
    }
  }, [])

  // Draw frame with object-fit: cover math & HiDPI support
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      lastDrawnFrameRef.current = -1
    }

    const drawFrame = (frameIndex) => {
      const img = imagesRef.current[frameIndex]
      if (!img || !img.complete || img.naturalWidth === 0) return

      const vw = window.innerWidth
      const vh = window.innerHeight
      const iw = img.naturalWidth
      const ih = img.naturalHeight

      const scale = Math.max(vw / iw, vh / ih)
      const drawW = iw * scale
      const drawH = ih * scale
      const offsetX = (vw - drawW) / 2
      const offsetY = (vh - drawH) / 2

      ctx.clearRect(0, 0, vw, vh)
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
    }

    const updateScrollTarget = () => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const scrollable = track.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const raw = -rect.top / scrollable
      targetProgressRef.current = clamp(raw, 0, 1)
    }

    resizeCanvas()
    updateScrollTarget()

    window.addEventListener('resize', resizeCanvas, { passive: true })
    window.addEventListener('scroll', updateScrollTarget, { passive: true })

    let rafId = 0
    let lastUiUpdate = -1

    const tick = () => {
      const target = targetProgressRef.current
      const current = smoothProgressRef.current
      const next = current + (target - current) * 0.14
      smoothProgressRef.current = Math.abs(target - next) < 0.0005 ? target : next

      const frameIndex = clamp(
        Math.round(smoothProgressRef.current * (TOTAL_FRAMES - 1)),
        0,
        TOTAL_FRAMES - 1,
      )

      if (frameIndex !== lastDrawnFrameRef.current) {
        drawFrame(frameIndex)
        lastDrawnFrameRef.current = frameIndex
      }

      if (Math.abs(smoothProgressRef.current - lastUiUpdate) > 0.003) {
        lastUiUpdate = smoothProgressRef.current
        setUiProgress(smoothProgressRef.current)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', updateScrollTarget)
    }
  }, [isReady])

  const currentFrameNumber = clamp(
    Math.round(uiProgress * (TOTAL_FRAMES - 1)) + 1,
    1,
    TOTAL_FRAMES,
  )

  const currentPhase =
    uiProgress < 0.32
      ? '01 / IGNITION'
      : uiProgress < 0.66
        ? '02 / SILHOUETTE'
        : '03 / HORIZON'

  const beat1Style = getBeatStyle(uiProgress, -0.1, 0, 0.22, 0.31)
  const beat2Style = getBeatStyle(uiProgress, 0.3, 0.38, 0.56, 0.65)
  const beat3Style = getBeatStyle(uiProgress, 0.66, 0.76, 1.05, 1.1)

  return (
    <section ref={trackRef} className="hero-scroll-track" id="overview">
      <div className="hero-sticky-viewport">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-scrim" />

        {/* Preloader */}
        <div className={`hero-loader ${isReady ? 'hero-loader--hidden' : ''}`}>
          <div className="loader-label">Loading Sequence · {loadProgress}%</div>
          <div className="loader-bar-track">
            <div
              className="loader-bar-fill"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>

        {/* Scroll-choreographed Story Beats */}
        <div className="hero-overlay">
          {/* Beat 1: Headlight Close-up */}
          <div className="story-beat" style={beat1Style}>
            <div className="beat-eyebrow">ACI Motors · Shadow Edition</div>
            <h1 className="beat-title">PRECISION IN THE DARK.</h1>
            <p className="beat-subtitle">
              Laser-etched amber DRLs meet matte obsidian bodywork. Engineered to
              command every mile from dusk till dawn.
            </p>
          </div>

          {/* Beat 2: Side Profile Pull-Back */}
          <div className="story-beat" style={beat2Style}>
            <div className="beat-eyebrow">Aerodynamic Architecture</div>
            <h2 className="beat-title">SCULPTED BY WIND.</h2>
            <p className="beat-subtitle">
              A low-slung coupe stance balanced with carbon-reinforced proportions
              and track-calibrated response.
            </p>
            <div className="beat-specs">
              <div className="beat-spec-item">
                <div className="beat-spec-value">503 HP</div>
                <div className="beat-spec-label">TwinPower Inline-6</div>
              </div>
              <div className="beat-spec-item">
                <div className="beat-spec-value">3.4s</div>
                <div className="beat-spec-label">0–60 MPH</div>
              </div>
              <div className="beat-spec-item">
                <div className="beat-spec-value">180 MPH</div>
                <div className="beat-spec-label">Track Top Speed</div>
              </div>
            </div>
          </div>

          {/* Beat 3: Wide Waterfront Skyline Reveal */}
          <div className="story-beat" style={beat3Style}>
            <div className="beat-eyebrow">Harbor Twilight Showcase</div>
            <h2 className="beat-title">COMMAND THE SKYLINE.</h2>
            <p className="beat-subtitle">
              Where raw motorsport heritage meets midnight luxury. Experience the
              Shadow Edition in person.
            </p>
            <div className="beat-actions">
              <a href="#engineering" className="btn-primary">
                Explore Engineering
              </a>
              <a href="#reserve" className="btn-ghost">
                Book a Test Drive
              </a>
            </div>
          </div>
        </div>

        {/* Telemetry HUD */}
        <div className="hero-hud" aria-hidden="true">
          <div className="hud-meta">
            <span className="hud-phase">{currentPhase}</span>
            <span>
              FRAME {String(currentFrameNumber).padStart(2, '0')} / {TOTAL_FRAMES}
            </span>
          </div>
          <div className="hud-progress-track">
            <div
              className="hud-progress-fill"
              style={{ width: `${Math.round(uiProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* Scroll Cue (visible at start) */}
        <div
          className="scroll-cue"
          style={{ opacity: uiProgress < 0.08 ? 1 : 0 }}
          aria-hidden="true"
        >
          <span className="scroll-cue-text">Scroll to explore</span>
          <span className="scroll-cue-line" />
        </div>
      </div>
    </section>
  )
}
