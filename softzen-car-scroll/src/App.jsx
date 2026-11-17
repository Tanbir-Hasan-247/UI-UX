import { useCallback, useEffect, useState } from 'react'
import BrandLogo from './components/BrandLogo'
import ConfiguratorSection from './components/ConfiguratorSection'
import EngineeringSection from './components/EngineeringSection'
import FinanceSection from './components/FinanceSection'
import Footer from './components/Footer'
import GallerySection from './components/GallerySection'
import HeroScroll from './components/HeroScroll'
import HomeHighlights from './components/HomeHighlights'
import ModelsSection from './components/ModelsSection'
import {
  ConfiguratorTimelineBand,
  EngineeringDeepDiveBand,
  FinanceFaqBand,
  HomeEditorialBand,
  ModelsAssuranceBand,
  ShowroomsDirectoryBand,
} from './components/PageExtras'
import PageHeader from './components/PageHeader'
import ReserveSection from './components/ReserveSection'

const NAV_ITEMS = [
  { path: '/', label: 'Overview' },
  { path: '/models', label: 'Models' },
  { path: '/configurator', label: 'Configurator' },
  { path: '/engineering', label: 'Engineering' },
  { path: '/finance', label: 'Finance' },
  { path: '/gallery', label: 'Gallery' },
]

const VALID_PATHS = new Set([...NAV_ITEMS.map((i) => i.path), '/reserve'])

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  const clean = pathname.replace(/\/+$/, '')
  return VALID_PATHS.has(clean) ? clean : '/'
}

function getInitialTheme() {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') return attr
  }
  try {
    const saved = localStorage.getItem('aci-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // ignore storage access errors
  }
  return 'dark'
}

function ThemeIcon({ theme }) {
  if (theme === 'dark') {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    )
  }
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

function App() {
  const [route, setRoute] = useState(() =>
    normalizePath(window.location.pathname),
  )
  const [theme, setTheme] = useState(getInitialTheme)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedTrim, setSelectedTrim] = useState('Mercedes-Benz S 450 4MATIC')
  const [buildSummary, setBuildSummary] = useState('')
  const [configuredPrice, setConfiguredPrice] = useState(22500000)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('aci-theme', theme)
    } catch {
      // ignore storage access errors
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const navigate = useCallback((nextPath) => {
    const normalized = normalizePath(nextPath)
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized)
    }
    setRoute(normalized)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizePath(window.location.pathname))
      setMenuOpen(false)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = route === '/'
  const solidNavbar = !isHome || scrolled

  return (
    <>
      <header className={`navbar ${solidNavbar ? 'navbar--scrolled' : ''}`}>
        <a
          href="/"
          className="nav-brand"
          aria-label="ACI Motors Limited"
          onClick={(e) => {
            e.preventDefault()
            navigate('/')
          }}
        >
          <BrandLogo className="nav-brand-logo" />
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={route === item.path ? 'nav-link--active' : ''}
              onClick={(e) => {
                e.preventDefault()
                navigate(item.path)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Switch to white theme'
                : 'Switch to dark theme'
            }
            title={theme === 'dark' ? 'White theme' : 'Dark theme'}
          >
            <ThemeIcon theme={theme} />
            <span className="theme-toggle-label">
              {theme === 'dark' ? 'White' : 'Dark'}
            </span>
          </button>

          <a
            href="/reserve"
            className={`nav-cta nav-cta-desktop ${route === '/reserve' ? 'nav-cta--active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              navigate('/reserve')
            }}
          >
            Reserve Now
          </a>

          <button
            type="button"
            className="nav-mobile-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-drawer" role="dialog" aria-label="Mobile menu">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={route === item.path ? 'mobile-link--active' : ''}
              onClick={(e) => {
                e.preventDefault()
                navigate(item.path)
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/reserve"
            className="btn-primary mobile-drawer-cta"
            onClick={(e) => {
              e.preventDefault()
              navigate('/reserve')
            }}
          >
            Reserve Now
          </a>
        </div>
      )}

      <main className={!isHome ? 'subpage-main' : ''}>
        {route === '/' && (
          <>
            <HeroScroll />
            <HomeHighlights
              onNavigate={navigate}
              onSelectTrim={setSelectedTrim}
            />
            <HomeEditorialBand onNavigate={navigate} />
          </>
        )}

        {route === '/models' && (
          <>
            <PageHeader
              eyebrow="Curated Inventory · 20 Models"
              title="Executive &amp; Performance Fleet"
              subtitle="Explore flagship Saloons, luxury SUVs, high-performance AMG/M coupés, and all-electric architectures—curated for Bangladesh with transparent BDT pricing and full BRTA support."
              breadcrumb="Models"
              bgImage="https://images.unsplash.com/photo-1616591938133-8d6fac01df84?auto=format&fit=crop&w=2000&q=85"
              badge="2025 Showroom Collection"
              onNavigate={navigate}
            />
            <ModelsSection
              onSelectTrim={setSelectedTrim}
              onNavigate={navigate}
            />
            <ModelsAssuranceBand />
          </>
        )}

        {route === '/configurator' && (
          <>
            <PageHeader
              eyebrow="Bespoke Studio · Bangladesh"
              title="Tailor Your Specification"
              subtitle="Customize exterior finishes, forged wheel packages, and hand-stitched Nappa leather trims across our 20-car lineup with real-time BDT calculation."
              breadcrumb="Configurator"
              bgImage="https://images.unsplash.com/photo-1666195782998-5189c6a40793?auto=format&fit=crop&w=2000&q=85"
              badge="Atelier Studio"
              onNavigate={navigate}
            />
            <ConfiguratorSection
              selectedTrim={selectedTrim}
              onSelectTrim={setSelectedTrim}
              onLockBuild={setBuildSummary}
              onPriceChange={setConfiguredPrice}
              onNavigate={navigate}
            />
            <ConfiguratorTimelineBand />
          </>
        )}

        {route === '/engineering' && (
          <>
            <PageHeader
              eyebrow="Affalterbach &amp; M Division DNA"
              title="Engineering &amp; Telemetry"
              subtitle="Twin-turbocharged V8 &amp; inline-six architectures, carbon-ceramic braking assemblies, and active aero telemetry tuned for high-speed poise."
              breadcrumb="Engineering"
              bgImage="https://images.unsplash.com/photo-1631828919462-3a4054d88eac?auto=format&fit=crop&w=2000&q=85"
              badge="Aerodynamics &amp; Chassis"
              onNavigate={navigate}
            />
            <EngineeringSection />
            <EngineeringDeepDiveBand />
          </>
        )}

        {route === '/finance' && (
          <>
            <PageHeader
              eyebrow="ACI Financial Services"
              title="Ownership &amp; EMI Planner"
              subtitle="Estimate customized monthly installments tailored to your configured vehicle price, down payment percentage, and preferred tenure in BDT."
              breadcrumb="Finance"
              bgImage="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=85"
              badge="Flexible BDT Terms"
              onNavigate={navigate}
            />
            <FinanceSection
              vehiclePriceBdt={configuredPrice}
              onNavigate={navigate}
            />
            <FinanceFaqBand />
          </>
        )}

        {route === '/gallery' && (
          <>
            <PageHeader
              eyebrow="Visual Archive · 18 Frames"
              title="Flagship Fleet &amp; Atelier Gallery"
              subtitle="High-resolution exterior stances, executive Nappa lounge cockpits, forged monoblock alloys, and all-electric architectures."
              breadcrumb="Gallery"
              bgImage="https://images.unsplash.com/photo-1602200059552-39ed78989991?auto=format&fit=crop&w=2000&q=85"
              badge="4K Visual Archive"
              onNavigate={navigate}
            />
            <GallerySection />
          </>
        )}

        {route === '/reserve' && (
          <>
            <PageHeader
              eyebrow="Private Concierge"
              title="Showroom &amp; Private Test Drive"
              subtitle="Schedule an accompanied twilight drive or reserve your vehicle allocation at our flagship Dhaka (Gulshan &amp; Tejgaon), Chattogram, or Sylhet lounges."
              breadcrumb="Reserve"
              bgImage="https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=2000&q=85"
              badge="VIP Allocation Priority"
              onNavigate={navigate}
            />
            <ReserveSection buildSummary={buildSummary} />
            <ShowroomsDirectoryBand />
          </>
        )}
      </main>

      <Footer onNavigate={navigate} />

      <div className="powered-badge" aria-label="Powered by SoftZen IT">
        <span className="powered-badge-text">Powered by</span>
        <img src="/softzen.png" alt="SoftZen IT" className="powered-badge-logo" />
      </div>
    </>
  )
}

export default App
