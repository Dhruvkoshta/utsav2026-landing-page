import { motion } from 'framer-motion'
import ShinyText from '../components/ShinyText'

/* ── Shared animation presets ─────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, amount: 0.2 } as const,
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
})

const hoverLift = {
  whileHover: { y: -5, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

/* ── Liquid-glass card wrapper ────────────────────────────────────────────── */

function GlassCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.article
      {...fadeUp(delay)}
      {...hoverLift}
      className={`
        relative overflow-hidden rounded-[1.75rem]
        border border-white/10
        bg-white/[0.03]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.04),0_32px_72px_-28px_rgba(0,0,0,0.7)]
        backdrop-blur-xl
        transition-all duration-500
        hover:bg-white/[0.05]
        hover:border-white/15
        hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(255,255,255,0.06),0_36px_80px_-24px_rgba(0,0,0,0.8)]
        ${className}
      `}
    >
      {/* Refraction highlight — top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
      {/* Refraction highlight — left edge */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-white/15 to-transparent" />
      {children}
    </motion.article>
  )
}

/* ── Section ──────────────────────────────────────────────────────────────── */

export default function ThemeAboutSection() {
  return (
    <section
      aria-labelledby="theme-heading"
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">

          {/* ──────── Column 1 — Theme (Utsav Ananta) ──────── */}
          <GlassCard delay={0} className="p-8 sm:p-10 lg:-mt-3">
            {/* Warm accent glow inside card */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-amber-300/9 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-rose-300/7 blur-3xl" />

            <motion.p
              {...fadeUp(0.1)}
              className="relative mb-3 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-amber-200/70"
            >
              <ShinyText
                text="Utsav Ananta"
                speed={3}
                color="rgba(253,230,138,0.7)"
                shineColor="#ffffff"
                spread={100}
                yoyo
              />
            </motion.p>

            <motion.h2
              {...fadeUp(0.15)}
              id="theme-heading"
              className="relative mb-6 font-playfair text-3xl font-semibold italic leading-tight text-white sm:text-4xl"
            >
              Theme
            </motion.h2>

            {/* Decorative accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="mb-7 h-px w-16 origin-left bg-linear-to-r from-amber-300/50 to-transparent"
            />

            <motion.p
              {...fadeUp(0.25)}
              className="relative max-w-prose font-inter text-[0.95rem] leading-[1.85] text-white/80 sm:text-base sm:leading-8"
            >
              A grand celebration where imagination knows no bounds and creativity takes
              center stage. True to its name, Ananta signifies infinite ideas, talents,
              and dreams coming together in one vibrant celebration. This fest is a tribute
              to the limitless potential within every individual, where art, culture,
              technology, and innovation merge into a spectacular showcase of passion and
              skill. Join us as we transform our campus into a canvas of colors, rhythms,
              and energy — because every moment at Utsav Ananta is a celebration of
              creativity that never ends.
            </motion.p>
          </GlassCard>

          {/* ──────── Column 2 — About Us (BMSCE) ──────── */}
          <GlassCard delay={0.12} className="p-8 sm:p-10 lg:mt-8">
            {/* Cool-toned accent glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-slate-300/6 blur-3xl" />

            {/* Header row: logo + titles */}
            <motion.div
              {...fadeUp(0.18)}
              className="relative mb-7 flex items-center gap-4 border-b border-white/10 pb-5"
            >
              <img
                src="/bmsce.png"
                alt="BMSCE Logo"
                className="h-14 w-14 rounded-xl border border-white/15 bg-white/7 object-contain p-1.5"
                loading="lazy"
              />
              <div>
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-slate-300/70">
                  <ShinyText
                    text="Est. 1946"
                    speed={4}
                    color="rgba(203,213,225,0.7)"
                    shineColor="#ffffff"
                    spread={100}
                    yoyo
                    delay={0.5}
                  />
                </p>
                <h3 className="font-playfair text-[1.85rem] font-semibold leading-tight text-white sm:text-3xl">
                  About Us
                </h3>
              </div>
            </motion.div>

            <div className="relative space-y-5 font-inter text-[0.95rem] leading-[1.85] text-white/75 sm:text-base sm:leading-8">
              <motion.p {...fadeUp(0.26)}>
                Founded in 1946, B.&thinsp;M.&thinsp;S. College of Engineering (BMSCE) stands as
                an early trailblazer in engineering education. Envisioned by the late
                Sri B.&thinsp;M.&thinsp;Sreenivasaiah, the college was established in
                Basavanagudi, with the ambition of becoming a cornerstone of higher
                education in Bengaluru. This dream was passionately pursued by his son,
                the late Sri B.&thinsp;S.&thinsp;Narayan, who was committed to providing
                quality education to students globally.
              </motion.p>

              <motion.p {...fadeUp(0.32)}>
                Today, BMSCE has grown to offer 18 undergraduate and 13 postgraduate
                programs across various engineering and management fields. The college
                boasts a team of highly qualified faculty and staff, dedicated to
                delivering outstanding education while keeping pace with the future.
              </motion.p>
            </div>
          </GlassCard>

        </div>
      </div>
    </section>
  )
}
