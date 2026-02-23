import { useRef, useEffect, useState, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './sections/HeroSection'
import LogoSection from './sections/LogoSection'
import CountdownSection from './sections/CountdownSection'
import DarkVeil from './components/DarkVeil'
import './index.css'

// Lazy-load below-fold sections to reduce initial bundle size
const ThemeAboutSection = lazy(() => import('./sections/ThemeAboutSection'))
const GallerySection    = lazy(() => import('./sections/GallerySection'))
const SponsorsSection   = lazy(() => import('./sections/SponsorsSection'))
const PatronsSection    = lazy(() => import('./sections/PatronsSection'))
const ContactSection    = lazy(() => import('./sections/ContactSection'))
const FooterSection     = lazy(() => import('./sections/FooterSection'))

export default function App() {
  const heroRef      = useRef<HTMLElement>(null)
  const countdownRef = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)

  // Set up hero scroll behavior only after loading animation completes
  useEffect(() => {
    if (!loaded) return
    const hero = heroRef.current
    const countdown = countdownRef.current
    if (!hero || !countdown) return

    // Pin the hero, fade it out, countdown is revealed underneath
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    })
    heroTl.to(hero, {
      opacity: 0,
      scale: 1.06,
      ease: 'none',
    })

    // Defer refresh by one frame so the DOM has fully painted after the overlay is hidden
    const rafId = requestAnimationFrame(() => { ScrollTrigger.refresh() })

    return () => {
      cancelAnimationFrame(rafId)
      ScrollTrigger.getAll().forEach((t) => { t.kill() })
    }
  }, [loaded])

  return (
    <div style={{ background: '#07050a' }}>
      {/* Fixed DarkVeil background behind all sections */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <DarkVeil
          hueShift={340}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <LogoSection onAnimationComplete={() => setLoaded(true)} />
        <HeroSection sectionRef={heroRef} nextSectionRef={countdownRef} />
        <CountdownSection sectionRef={countdownRef} />
        <Suspense fallback={null}>
          <ThemeAboutSection />
          <GallerySection />
          <SponsorsSection />
          <PatronsSection />
          <ContactSection />
          <FooterSection />
        </Suspense>
      </div>
    </div>
  )
}
