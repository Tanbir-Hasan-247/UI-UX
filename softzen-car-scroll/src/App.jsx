import { useEffect, useState } from 'react'
import ConfiguratorSection from './components/ConfiguratorSection'
import EngineeringSection from './components/EngineeringSection'
import Footer from './components/Footer'
import GallerySection from './components/GallerySection'
import HeroScroll from './components/HeroScroll'
import ModelsSection from './components/ModelsSection'
import ReserveSection from './components/ReserveSection'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [selectedTrim, setSelectedTrim] = useState('M4 Shadow Edition')
  const [buildSummary, setBuildSummary] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <a href="#overview" className="nav-brand">
          <span className="nav-brand-dot" />
          <span>ACI MOTORS</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#overview">Overview</a>
          <a href="#models">Models</a>
          <a href="#configurator">Configurator</a>
          <a href="#engineering">Engineering</a>
          <a href="#gallery">Gallery</a>
          <a href="#reserve" className="nav-cta">
            Reserve Now
          </a>
        </nav>
      </header>

      <main>
        <HeroScroll />
        <ModelsSection onSelectTrim={setSelectedTrim} />
        <ConfiguratorSection
          selectedTrim={selectedTrim}
          onLockBuild={setBuildSummary}
        />
        <EngineeringSection />
        <GallerySection />
        <ReserveSection buildSummary={buildSummary} />
      </main>

      <Footer />

      <div className="powered-badge" aria-label="Powered by SoftZen IT">
        <span className="powered-badge-text">Powered by</span>
        <img src="/softzen.png" alt="SoftZen IT" className="powered-badge-logo" />
      </div>
    </>
  )
}

export default App
