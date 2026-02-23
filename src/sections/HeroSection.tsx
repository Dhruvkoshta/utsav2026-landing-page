import { useRef } from 'react'
import { motion } from 'framer-motion'
import ShinyText from '../components/ShinyText'

interface HeroSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>
  nextSectionRef?: React.RefObject<HTMLElement | null>
}

export default function HeroSection({ sectionRef, nextSectionRef }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const baseTransition = { ease: 'easeOut' as const }

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', zIndex: 10 }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      >
        <source src="/utsav.webm" type="video/webm" />
      </video>

      {/* Subtle dark overlay for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.55) 100%)',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '6%',
          right: '4%',
          textAlign: 'right',
          zIndex: 2,
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...baseTransition, duration: 1.2, delay: 0.3 }}
          style={{
            margin: 0,
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
            letterSpacing: '0.08em',
            color: '#ffffff',
            lineHeight: 1.2,
          }}
        >
          BMSCE
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...baseTransition, duration: 0.9, delay: 0.5 }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(8rem, 20vw, 22rem)',
            lineHeight: 0.85,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            margin: '0.05em 0 0',
          }}
        >
          1946
        </motion.div>

        {/* Year subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...baseTransition, duration: 1.2, delay: 0.9 }}
          style={{
            margin: '2.1em 0 0',
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
            letterSpacing: '0.04em',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.4,
          }}
        >
          (Year of The first blah blah blah)
        </motion.p>
      </div>

      {/* Bottom-left tagline */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '4%',
          zIndex: 2,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...baseTransition, duration: 0.9, delay: 1.1 }}
          style={{
            margin: 0,
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 4vw, 3.5rem)',
            letterSpacing: '0.02em',
            color: '#ffffff',
            lineHeight: 1.15,
          }}
        >
          <ShinyText
            text="Let's continue the Legacy"
            speed={3}
            color="rgba(255,255,255,0.85)"
            shineColor="#ffffff"
            spread={100}
            yoyo
          />
        </motion.h1>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '3%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
        }}
        onClick={() => {
          nextSectionRef?.current?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M1 1L10 10L19 1"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
