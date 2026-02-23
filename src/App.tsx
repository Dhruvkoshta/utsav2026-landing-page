import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/HeroSection'
import LogoSection from './components/LogoSection'
import CountdownSection from './components/CountdownSection'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

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
      <LogoSection onAnimationComplete={() => setLoaded(true)} />
      <HeroSection sectionRef={heroRef} nextSectionRef={countdownRef} />
      <CountdownSection sectionRef={countdownRef} />
    </div>
  )
}
