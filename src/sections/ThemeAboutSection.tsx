import ShinyText from '../components/ShinyText'
import { GlassCard } from '../components/GlassCard'

/* ── Section ──────────────────────────────────────────────────────────────── */

export default function ThemeAboutSection() {
  return (
    <section
      aria-labelledby="theme-heading"
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
    >
      {/* Top fade to blend with Countdown section */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-20" style={{ height: '10rem', background: 'linear-gradient(to bottom, rgb(7,5,10), transparent)' }} />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">

          {/* ──────── Column 1 — Theme (Utsav Ananta) ──────── */}
          <GlassCard delay={0} className="p-8 sm:p-10">
            {/* Warm accent glow inside card */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-amber-300/9 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-rose-300/7 blur-3xl" />

            <p className="relative mb-3 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-amber-200/70">
              <ShinyText
                text="Utsav Ananta"
                speed={3}
                color="rgba(253,230,138,0.7)"
                shineColor="#ffffff"
                spread={100}
                yoyo
              />
            </p>

            <h2
              id="theme-heading"
              className="relative mb-6 font-cinzel text-3xl font-bold leading-tight text-transparent bg-clip-text bg-linear-to-r from-gray-200 via-gray-400 to-gray-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.3)] sm:text-4xl"
            >
              <ShinyText
                text="Theme"
                speed={4}
                color="rgba(209,213,219,0.8)"
                shineColor="#ffffff"
                spread={120}
                yoyo
              />
            </h2>

            {/* Decorative accent line */}
            <div className="mb-7 h-px w-16 origin-left bg-linear-to-r from-amber-300/50 to-transparent" />

            <p className="relative max-w-prose font-inter text-[0.95rem] leading-[1.85] text-white/80 sm:text-base sm:leading-8">
              Utsav Trayana is a festival where lots of different people come together. Everyone has their own story, their own culture, and their own talents. Some people like to dance, some like to sing, some like to draw, speak, or create new ideas.
              <br /><br />
              "Celebration of Creativity, Culture and Journeys coming together" simply means this: People from different places and backgrounds meet in one place and share what makes them special.
              <br /><br />
              Trayana shows that even though we are all different, we can work together and make something beautiful. Like when different colors mix to make a bright painting or when many instruments play together to make one song.
              <br /><br />
              At Utsav, everyone gets a chance to shine. No one loses who they are. Instead, when everyone joins in, the festival becomes bigger, happier, and more exciting.
              <br /><br />
              It is not just a fest. It is many stories coming together to create one big, joyful memory.
            </p>
          </GlassCard>

          {/* ──────── Column 2 — About Us (BMSCE) ──────── */}
          <GlassCard delay={0.12} className="p-8 sm:p-10">
            {/* Cool-toned accent glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-slate-300/6 blur-3xl" />

            {/* Header row: logo + titles */}
            <div className="relative mb-7 flex items-center gap-4 border-b border-white/10 pb-5">
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
                <h3 className="font-cinzel text-[1.85rem] font-bold leading-tight text-transparent bg-clip-text bg-linear-to-r from-gray-200 via-gray-400 to-gray-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.3)] sm:text-3xl">
                  <ShinyText
                    text="About Us"
                    speed={4}
                    color="rgba(209,213,219,0.8)"
                    shineColor="#ffffff"
                    spread={120}
                    yoyo
                    delay={0.5}
                  />
                </h3>
              </div>
            </div>

            <div className="relative space-y-5 font-inter text-[0.95rem] leading-[1.85] text-white/75 sm:text-base sm:leading-8">
              <p>
                Founded in 1946, B.&thinsp;M.&thinsp;S. College of Engineering (BMSCE) stands as
                an early trailblazer in engineering education. Envisioned by the late
                Sri B.&thinsp;M.&thinsp;Sreenivasaiah, the college was established in
                Basavanagudi, with the ambition of becoming a cornerstone of higher
                education in Bengaluru. This dream was passionately pursued by his son,
                the late Sri B.&thinsp;S.&thinsp;Narayan, who was committed to providing
                quality education to students globally.
              </p>

              <p>
                Today, BMSCE has grown to offer 18 undergraduate and 13 postgraduate
                programs across various engineering and management fields. The college
                boasts a team of highly qualified faculty and staff, dedicated to
                delivering outstanding education while keeping pace with the future.
              </p>
            </div>
          </GlassCard>

        </div>
      </div>
    </section>
  )
}
