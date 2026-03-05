import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

interface LogoSectionProps {
  /** Called once the logo reveal + fade-out finishes */
  onAnimationComplete?: () => void
}

const LAYERS = [
  { file: 'logo-path8.svg',  color: '#50096d', label: 'silhouette' },
  { file: 'logo-path9.svg',  color: '#6c228f', label: 'shadow' },
  { file: 'logo-path10.svg', color: '#62676e', label: 'dark-gray' },
  { file: 'logo-path11.svg', color: '#9028af', label: 'purple' },
  { file: 'logo-path12.svg', color: '#79868a', label: 'mid-gray' },
  { file: 'logo-path13.svg', color: '#969a9f', label: 'light-gray' },
  { file: 'logo-path14.svg', color: '#de5bea', label: 'magenta' },
]

const STACK_Z: Record<string, number> = {
  'logo-path8.svg':  7,
  'logo-path9.svg':  6,
  'logo-path10.svg': 5,
  'logo-path11.svg': 4,
  'logo-path12.svg': 3,
  'logo-path13.svg': 2,
  'logo-path14.svg': 1,
}

export default function LogoSection({ onAnimationComplete }: LogoSectionProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const layerRefs  = useRef<(HTMLImageElement | null)[]>([])
  const glowRef    = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)

  // State to track if the user has scrolled past the hero section
  const [showNav, setShowNav] = useState(false)
  // State for the "Dynamic Island" expansion
  const [isIslandExpanded, setIsIslandExpanded] = useState(false)

  // Scroll listener to toggle the floating navbar
  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar visibility after scrolling down 90vh
      if (window.scrollY > window.innerHeight * 0.9) {
        setShowNav(true)
      } else {
        setShowNav(false)
        setIsIslandExpanded(false) // Auto-collapse if we scroll back up
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const overlay        = overlayRef.current
    const layers         = layerRefs.current
    const glow           = glowRef.current
    const tagline        = taglineRef.current
    const line           = lineRef.current
    const logoContainer  = logoContainerRef.current
    if (!overlay || layers.some((l) => !l) || !glow || !tagline || !line || !logoContainer) return

    layers.forEach((el) => {
      gsap.set(el, { opacity: 0, scale: 0.94, filter: 'blur(12px)' })
    })
    gsap.set(glow,    { opacity: 0, scale: 0.5 })
    gsap.set(tagline, { opacity: 0, y: 16 })
    gsap.set(line,    { scaleX: 0, opacity: 0 })

    const tl = gsap.timeline({
      onComplete: () => {
        onAnimationComplete?.()

        // ── Smooth Outro Animation ──────────────────────────────────
        // 1. Fade out decorative elements
        gsap.to([glow, line, tagline], { opacity: 0, duration: 0.35, ease: 'power2.out' })
        
        // 2. Elegantly scale up and fade out the logo container
        gsap.to(logoContainer, {
          opacity: 0,
          scale: 1.15,
          duration: 0.6,
          ease: 'power2.inOut',
        })

        // 3. Fade out the overlay background completely
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          ease: 'power2.inOut',
          onComplete: () => { overlay.style.display = 'none' },
        })
      },
    })

    // --- Original Reveal Animations Below ---
    tl.to(glow, {
      opacity: 0.6, scale: 1.6,
      duration: 1.8, ease: 'power2.out',
    }, 0)

    tl.to(layers[0], {
      opacity: 1, scale: 1, filter: 'blur(0px)',
      duration: 1.1, ease: 'expo.out',
    }, 0.1)

    for (let i = 1; i <= 5; i++) {
      tl.to(layers[i], {
        opacity: 1, scale: 1, filter: 'blur(0px)',
        duration: 0.9, ease: 'power3.out',
      }, 0.1 + i * 0.28)
    }

    tl.to(glow, {
      scale: 1.1, opacity: 0.5,
      duration: 1.2, ease: 'power2.inOut',
    }, 0.8)

    tl.to(layers[6], {
      opacity: 1, scale: 1.04, filter: 'blur(0px)',
      duration: 0.5, ease: 'power4.out',
    }, 0.1 + 6 * 0.28)

    tl.to(layers[6], {
      scale: 1,
      duration: 0.6, ease: 'elastic.out(1, 0.6)',
    }, 0.1 + 6 * 0.28 + 0.5)

    tl.to(glow, {
      opacity: 0.9, scale: 1.25,
      duration: 0.35, ease: 'power4.out',
    }, 0.1 + 6 * 0.28)

    tl.to(glow, {
      opacity: 0.3, scale: 1.0,
      duration: 1.4, ease: 'power2.inOut',
    }, 0.1 + 6 * 0.28 + 0.35)

    tl.to(layers, {
      scale: 1.015,
      duration: 0.4, ease: 'sine.inOut',
      stagger: 0,
    }, 0.1 + 6 * 0.28 + 0.6)
    tl.to(layers, {
      scale: 1,
      duration: 0.5, ease: 'sine.inOut',
      stagger: 0,
    }, 0.1 + 6 * 0.28 + 1.0)

    const lineStart = 0.1 + 6 * 0.28 + 0.7
    tl.to(line, {
      scaleX: 1, opacity: 1,
      duration: 0.8, ease: 'power3.out',
    }, lineStart)

    tl.to(tagline, {
      opacity: 1, y: 0,
      duration: 0.9, ease: 'power3.out',
    }, lineStart + 0.2)

    return () => {
      tl.kill()
    }
  }, [onAnimationComplete])

  return (
    <>
      {/* Floating "Dynamic Island" Navbar 
        Expands from a small pill to a full navbar on hover/click 
      */}
      <nav
        onMouseEnter={() => setIsIslandExpanded(true)}
        onMouseLeave={() => setIsIslandExpanded(false)}
        onClick={() => setIsIslandExpanded(!isIslandExpanded)} // For touch devices
        style={{
          position: 'fixed',
          top: '2rem',
          left: '50%',
          // Slide down when showNav is true. The X-translation keeps it perfectly centered even as width changes.
          transform: `translateX(-50%) translateY(${showNav ? '0' : '-150%'})`,
          opacity: showNav ? 1 : 0,
          
          // DYNAMIC ISLAND SIZING
          // 58px = collapsed pill (just enough for the 42px logo + padding). 
          // 320px = expanded state (adjust this if you add/remove links).
          width: isIslandExpanded ? '320px' : '58px',
          height: '58px',
          
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem', // Equal padding to form a perfect circle when collapsed
          borderRadius: '9999px',
          background: 'rgba(20, 10, 30, 0.45)', 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isIslandExpanded 
            ? '0 20px 50px rgba(0, 0, 0, 0.4)' 
            : '0 10px 30px rgba(0, 0, 0, 0.2)',
          cursor: isIslandExpanded ? 'default' : 'pointer',
          pointerEvents: showNav ? 'auto' : 'none',
          overflow: 'hidden', // Crucial to hide links when collapsed

          // The signature Apple springy animation curve
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
        }}
      >
        {/* Small Logo embedded in the Navbar */}
        <div style={{ 
          position: 'relative', 
          minWidth: '42px', 
          height: '42px',
          aspectRatio: '997.05 / 892.10',
          marginLeft: '0.1rem', // Slight visual centering tweak inside the pill
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isIslandExpanded ? 'scale(0.9)' : 'scale(1)', // slight shrink when expanded
        }}>
          {LAYERS.map((layer, i) => (
            <img
              key={`nav-${layer.file}`}
              src={`/${layer.file}`}
              alt=""
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                zIndex: STACK_Z[layer.file],
                userSelect: 'none',
              }}
              draggable={false}
            />
          ))}
        </div>

        {/* Nav Links */}
        <div style={{
          display: 'flex',
          gap: '1.8rem',
          marginLeft: '1.5rem', // Space between logo and links
          whiteSpace: 'nowrap', // Prevent links from wrapping during the animation
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.85rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.85)',
          
          // Animate the links fading in and sliding slightly
          opacity: isIslandExpanded ? 1 : 0,
          transform: isIslandExpanded ? 'translateX(0)' : 'translateX(-20px)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: isIslandExpanded ? '0.1s' : '0s', // Delay fade-in slightly so the island opens first
        }}>
          <a href="#about" className="hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
          <a href="#events" className="hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>Events</a>
          <a href="#gallery" className="hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>Gallery</a>
        </div>
      </nav>

      {/* Loading overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          background: '#07050a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 65% 65% at 50% 50%, #150d22 0%, #07050a 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }} />

        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            width: '60vmin',
            height: '60vmin',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(144,40,175,0.5) 0%, rgba(222,91,234,0.22) 40%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div
          ref={logoContainerRef}
          style={{
            position: 'relative',
            zIndex: 2,
            width: 'min(70vmin, 500px)',
            aspectRatio: '997.05 / 892.10',
          }}>
          {LAYERS.map((layer, i) => (
            <img
              key={layer.file}
              ref={(el) => { layerRefs.current[i] = el }}
              src={`/${layer.file}`}
              alt=""
              aria-hidden={i < LAYERS.length - 1 ? true : undefined}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                zIndex: STACK_Z[layer.file],
                userSelect: 'none',
                pointerEvents: 'none',
              }}
              draggable={false}
            />
          ))}
          <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            Utsav 2026 — BMSCE
          </span>
        </div>

        <div style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '2.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.9rem',
          width: 'min(70vmin, 500px)',
        }}>
          <div
            ref={lineRef}
            style={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(222,91,234,0.5), transparent)',
              transformOrigin: 'center',
            }}
          />
          <p
            ref={taglineRef}
            style={{
              margin: 0,
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(0.65rem, 1.2vw, 0.82rem)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(222, 91, 234, 0.7)',
            }}
          >
            Utsav · BMSCE · 2026
          </p>
        </div>
      </div>
    </>
  )
}