import { useCallback, useEffect, useState } from 'react'
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

function App() {
  const [route, setRoute] = useState(() =>
    normalizePath(window.location.pathname),
  )
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedTrim, setSelectedTrim] = useState('M4 Shadow Edition')
  const [buildSummary, setBuildSummary] = useState('')
  const [configuredPrice, setConfiguredPrice] = useState(10200000)

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
          <img
            src="/acimotors-logo.svg"
            alt="ACI Motors"
            className="nav-brand-logo"
          />
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
          <a
            href="/reserve"
            className={`nav-cta ${route === '/reserve' ? 'nav-cta--active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              navigate('/reserve')
            }}
          >
            Reserve Now
          </a>
        </nav>

        <button
          type="button"
          className="nav-mobile-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
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
            <HomeHighlights onNavigate={navigate} />
            <HomeEditorialBand onNavigate={navigate} />
          </>
        )}

        {route === '/models' && (
          <>
            <PageHeader
              eyebrow="ACI Motors Lineup"
              title="MODELS & SPECIFICATIONS."
              subtitle="Explore all three Shadow platform trims—engineered for twilight grand touring, executive comfort, and pure circuit pace."
              breadcrumb="Models"
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
              eyebrow="Bespoke Studio"
              title="CONFIGURE YOUR M4."
              subtitle="Customize exterior paint, forged wheel architecture, and cabin leather in real time with transparent BDT pricing for Bangladesh."
              breadcrumb="Configurator"
              onNavigate={navigate}
            />
            <ConfiguratorSection
              selectedTrim={selectedTrim}
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
              eyebrow="Motorsport DNA"
              title="ENGINEERING & TELEMETRY."
              subtitle="TwinPower Turbo inline-six architecture, 50:50 chassis balance, and adaptive M drive mode calibration."
              breadcrumb="Engineering"
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
              title="OWNERSHIP & EMI PLANNER."
              subtitle="Estimate monthly installments tailored to your configured vehicle price, down payment, and preferred tenure."
              breadcrumb="Finance"
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
              eyebrow="Visual Archive"
              title="TWILIGHT IN MOTION."
              subtitle="High-resolution exterior stances, driver cockpit craftsmanship, and laser-etched optical details."
              breadcrumb="Gallery"
              onNavigate={navigate}
            />
            <GallerySection />
          </>
        )}

        {route === '/reserve' && (
          <>
            <PageHeader
              eyebrow="Private Concierge"
              title="SHOWROOM & TEST DRIVE."
              subtitle="Schedule an accompanied twilight drive or lock your factory allocation at our Dhaka, Chattogram, or Sylhet lounges."
              breadcrumb="Reserve"
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
