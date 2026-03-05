import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false)

  // Wait until the user scrolls past the hero section to show the navbar
  useEffect(() => {
    const handleScroll = () => {
      // 0.9 = 90% of the viewport height. Adjust if you want it to appear sooner/later.
      if (window.scrollY > window.innerHeight * 0.9) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: '2rem',
        left: '50%',
        // Centers it and handles the slide-down animation
        transform: `translateX(-50%) translateY(${isVisible ? '0' : '-150%'})`,
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 100,
        
        // Big Oval styling
        width: 'min(90vw, 700px)', // Responsive width
        height: '70px',
        borderRadius: '9999px',
        
        // Glassmorphism effects
        background: 'rgba(20, 10, 30, 0.45)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        
        // Layout 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Centers the logo perfectly
        padding: '0 2rem',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <img 
        src="/ut-2026.svg" 
        alt="Utsav 2026 Logo" 
        style={{
          height: '40px', // Tweak this based on your SVG's exact aspect ratio
          width: 'auto',
          objectFit: 'contain',
          userSelect: 'none' // Prevents the image from being highlighted accidentally
        }}
        draggable={false}
      />
    </nav>
  )
}