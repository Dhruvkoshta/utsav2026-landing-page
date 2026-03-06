import { useState } from 'react'
import ShinyText from '../components/ShinyText'
import { GlassCard } from '../components/GlassCard'

// How many cards to show per tier before "View All" appears
const TIER_INITIAL_COUNT = 4

/* ── Types ────────────────────────────────────────────────────────────────── */

interface Sponsor {
  name: string
  tier: 'title' | 'platinum' | 'gold' | 'silver'
  logo?: string
  url?: string
}

/* ── Placeholder sponsors — replace logo paths once assets arrive ─────────── */

const SPONSORS: Sponsor[] = [
  { tier: 'title',    name: 'Title Sponsor',      logo: undefined },
  { tier: 'platinum', name: 'Platinum Sponsor 1', logo: undefined },
  { tier: 'platinum', name: 'Platinum Sponsor 2', logo: undefined },
  { tier: 'gold',     name: 'Gold Sponsor 1',     logo: undefined },
  { tier: 'gold',     name: 'Gold Sponsor 2',     logo: undefined },
  { tier: 'gold',     name: 'Gold Sponsor 3',     logo: undefined },
  { tier: 'silver',   name: 'Silver Sponsor 1',   logo: undefined },
  { tier: 'silver',   name: 'Silver Sponsor 2',   logo: undefined },
  { tier: 'silver',   name: 'Silver Sponsor 3',   logo: undefined },
  { tier: 'silver',   name: 'Silver Sponsor 4',   logo: undefined },
]

/* ── Tier config ──────────────────────────────────────────────────────────── */

const TIER_CONFIG = {
  title: {
    label:       'Title Sponsor',
    accent:      '#de5bea',
    accentAlpha: 'rgba(222,91,234,0.15)',
    borderColor: 'rgba(222,91,234,0.35)',
    logoHeight:  'h-20 sm:h-28',
    gridCols:    'grid-cols-1 max-w-sm mx-auto',
    badgeGlow:   'shadow-[0_0_24px_rgba(222,91,234,0.35)]',
  },
  platinum: {
    label:       'Platinum Sponsors',
    accent:      '#e8e0f5',
    accentAlpha: 'rgba(232,224,245,0.08)',
    borderColor: 'rgba(232,224,245,0.2)',
    logoHeight:  'h-16 sm:h-20',
    gridCols:    'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto',
    badgeGlow:   'shadow-[0_0_18px_rgba(232,224,245,0.15)]',
  },
  gold: {
    label:       'Gold Sponsors',
    accent:      '#D4AF37',
    accentAlpha: 'rgba(212,175,55,0.08)',
    borderColor: 'rgba(212,175,55,0.25)',
    logoHeight:  'h-12 sm:h-16',
    gridCols:    'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto',
    badgeGlow:   'shadow-[0_0_14px_rgba(212,175,55,0.2)]',
  },
  silver: {
    label:       'Silver Sponsors',
    accent:      '#9ca3af',
    accentAlpha: 'rgba(156,163,175,0.06)',
    borderColor: 'rgba(156,163,175,0.18)',
    logoHeight:  'h-10 sm:h-14',
    gridCols:    'grid-cols-2 sm:grid-cols-4 max-w-5xl mx-auto',
    badgeGlow:   '',
  },
} as const

/* ── SponsorCard ──────────────────────────────────────────────────────────── */

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const cfg = TIER_CONFIG[sponsor.tier]

  const inner = (
    <div
      className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 hover:scale-[1.03]"
      style={{
        background:  cfg.accentAlpha,
        borderColor: cfg.borderColor,
        boxShadow:   `inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 48px -20px rgba(0,0,0,0.6)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 40px ${cfg.accentAlpha}` }}
      />
      <div className={`flex w-full items-center justify-center ${cfg.logoHeight}`}>
        {sponsor.logo ? (
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="max-h-full max-w-full object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-full w-full max-w-[160px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed"
            style={{ borderColor: cfg.borderColor }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={cfg.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span
              className="text-[0.6rem] font-medium uppercase tracking-[0.25em]"
              style={{ color: cfg.accent, opacity: 0.45 }}
            >
              Logo
            </span>
          </div>
        )}
      </div>
      {!sponsor.logo && (
        <p
          className="text-center text-[0.75rem] font-light tracking-widest"
          style={{ color: cfg.accent, opacity: 0.5 }}
        >
          {sponsor.name}
        </p>
      )}
    </div>
  )

  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={sponsor.name}>
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  )
}

/* ── TierRow — with per-tier collapse ────────────────────────────────────── */

function TierRow({ tier, sponsors }: { tier: keyof typeof TIER_CONFIG; sponsors: Sponsor[] }) {
  const [expanded, setExpanded] = useState(false)
  if (!sponsors.length) return null

  const cfg = TIER_CONFIG[tier]
  const needsCollapse = sponsors.length > TIER_INITIAL_COUNT
  const visible = needsCollapse && !expanded ? sponsors.slice(0, TIER_INITIAL_COUNT) : sponsors
  const hidden = sponsors.length - TIER_INITIAL_COUNT

  return (
    <div className="mb-14 last:mb-0">
      {/* Tier label */}
      <div className="mb-6 flex items-center justify-center gap-3">
        <div
          className="h-px flex-1 max-w-[120px]"
          style={{ background: `linear-gradient(to right, transparent, ${cfg.accent}44)` }}
        />
        <span
          className={`rounded-full border px-4 py-1 font-cinzel text-[0.65rem] font-semibold uppercase tracking-[0.3em] ${cfg.badgeGlow}`}
          style={{ color: cfg.accent, borderColor: cfg.borderColor, background: cfg.accentAlpha }}
        >
          {cfg.label}
        </span>
        <div
          className="h-px flex-1 max-w-[120px]"
          style={{ background: `linear-gradient(to left, transparent, ${cfg.accent}44)` }}
        />
      </div>

      {/* Cards grid */}
      <div className={`grid gap-4 sm:gap-6 ${cfg.gridCols}`}>
        {visible.map((s) => (
          <SponsorCard key={s.name} sponsor={s} />
        ))}
      </div>

      {/* View All / Show Less — only shown when tier exceeds TIER_INITIAL_COUNT */}
      {needsCollapse && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <div
            className="h-px w-48"
            style={{ background: `linear-gradient(to right, transparent, ${cfg.borderColor}, transparent)` }}
          />
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-2 rounded-full border px-6 py-2 text-[0.72rem] font-medium uppercase tracking-[0.28em] backdrop-blur-md transition-all duration-300 hover:scale-105"
            style={{ color: cfg.accent, borderColor: cfg.borderColor, background: cfg.accentAlpha }}
          >
            <span>{expanded ? 'Show Less' : `View All  (+${hidden} more)`}</span>
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'transform 0.3s ease', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <polyline points="2 4 6 8 10 4" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

/* ── Section ──────────────────────────────────────────────────────────────── */

export default function SponsorsSection() {
  const byTier = (tier: Sponsor['tier']) => SPONSORS.filter((s) => s.tier === tier)

  return (
    <section
      id="sponsors"
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
    >
      <div className="pointer-events-none absolute top-1/4 right-0 h-100 w-100 rounded-full bg-purple-900/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-100 w-100 rounded-full bg-purple-900/10 blur-[100px]" />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.25) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="font-cinzel text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-gray-200 via-gray-400 to-gray-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.3)] sm:text-5xl md:text-6xl">
            <ShinyText
              text="Our Sponsors"
              speed={4}
              color="rgba(209,213,219,0.8)"
              shineColor="#ffffff"
              spread={120}
              yoyo
            />
          </h2>
          <p className="mt-4 text-[0.8rem] font-light tracking-[0.35em] uppercase text-white/30">
            Powering Utsav · BMSCE · 2026
          </p>
        </div>

        <GlassCard className="p-8 sm:p-12">
          <div
            className="mb-10 h-px w-full"
            style={{ background: 'linear-gradient(to right, transparent, rgba(222,91,234,0.3), transparent)' }}
          />

          <TierRow tier="title"    sponsors={byTier('title')}    />
          <TierRow tier="platinum" sponsors={byTier('platinum')} />
          <TierRow tier="gold"     sponsors={byTier('gold')}     />
          <TierRow tier="silver"   sponsors={byTier('silver')}   />

          <div
            className="mt-10 h-px w-full"
            style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)' }}
          />
          <p className="mt-6 text-center text-[0.75rem] tracking-widest text-white/25 uppercase">
            Interested in sponsoring?{' '}
            <a href="mailto:utsav@bmsce.ac.in" className="text-purple-400/60 hover:text-purple-300/80 transition-colors">
              Get in touch
            </a>
          </p>
        </GlassCard>
      </div>
    </section>
  )
}









// import { useState } from 'react'
// import ShinyText from '../components/ShinyText'
// import { GlassCard } from '../components/GlassCard'

// // How many cards to show before "View All" appears
// const INITIAL_COUNT = 8

// interface Sponsor {
//   name: string
//   logo?: string
//   url?: string
// }

// const SPONSORS: Sponsor[] = [
//   { name: 'Sponsor 1',  logo: undefined },
//   { name: 'Sponsor 2',  logo: undefined },
//   { name: 'Sponsor 3',  logo: undefined },
//   { name: 'Sponsor 4',  logo: undefined },
//   { name: 'Sponsor 5',  logo: undefined },
//   { name: 'Sponsor 6',  logo: undefined },
//   { name: 'Sponsor 7',  logo: undefined },
//   { name: 'Sponsor 8',  logo: undefined },
// ]

// function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
//   const inner = (
//     <div
//       className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 hover:scale-[1.03]"
//       style={{
//         background:  'rgba(222,91,234,0.04)',
//         borderColor: 'rgba(222,91,234,0.15)',
//         boxShadow:   'inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 48px -20px rgba(0,0,0,0.6)',
//       }}
//     >
//       <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//         style={{ boxShadow: '0 0 36px rgba(222,91,234,0.12)' }}
//       />

//       <div className="flex h-16 sm:h-20 w-full items-center justify-center">
//         {sponsor.logo ? (
//           <img
//             src={sponsor.logo}
//             alt={sponsor.name}
//             className="max-h-full max-w-full object-contain opacity-75 transition-opacity duration-300 group-hover:opacity-100"
//             loading="lazy"
//           />
//         ) : (
//           <div
//             className="flex h-full w-full max-w-[140px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed"
//             style={{ borderColor: 'rgba(222,91,234,0.2)' }}
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#de5bea" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
//               <rect x="3" y="3" width="18" height="18" rx="3"/>
//               <circle cx="8.5" cy="8.5" r="1.5"/>
//               <polyline points="21 15 16 10 5 21"/>
//             </svg>
//             <span className="text-[0.58rem] font-medium uppercase tracking-[0.25em] text-purple-300/40">Logo</span>
//           </div>
//         )}
//       </div>

//       {!sponsor.logo && (
//         <p className="text-center text-[0.72rem] font-light tracking-widest text-white/30">
//           {sponsor.name}
//         </p>
//       )}
//     </div>
//   )

//   return sponsor.url ? (
//     <a href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={sponsor.name}>{inner}</a>
//   ) : (
//     <div>{inner}</div>
//   )
// }

// export default function SponsorsSection() {
//   const [expanded, setExpanded] = useState(false)

//   const needsCollapse = SPONSORS.length > INITIAL_COUNT
//   const visible = needsCollapse && !expanded ? SPONSORS.slice(0, INITIAL_COUNT) : SPONSORS
//   const hidden = SPONSORS.length - INITIAL_COUNT

//   return (
//     <section id="sponsors" className="relative w-full overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
//       <div className="pointer-events-none absolute top-1/4 right-0 h-100 w-100 rounded-full bg-purple-900/10 blur-[100px]" />
//       <div className="pointer-events-none absolute bottom-1/4 left-0 h-100 w-100 rounded-full bg-purple-900/10 blur-[100px]" />

//       <div className="relative z-10 mx-auto w-full max-w-6xl">
//         <div className="mb-14 text-center">
//           <h2 className="font-cinzel text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-gray-200 via-gray-400 to-gray-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.3)] sm:text-5xl md:text-6xl">
//             <ShinyText text="Our Sponsors" speed={4} color="rgba(209,213,219,0.8)" shineColor="#ffffff" spread={120} yoyo />
//           </h2>
//           <p className="mt-4 text-[0.8rem] font-light tracking-[0.35em] uppercase text-white/30">
//             Powering Utsav · BMSCE · 2026
//           </p>
//         </div>

//         <GlassCard className="p-8 sm:p-12">
//           <div className="mb-10 h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(222,91,234,0.3), transparent)' }} />

//           <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
//             {visible.map((s) => (
//               <SponsorCard key={s.name} sponsor={s} />
//             ))}
//           </div>

//           {/* View All / Show Less — only rendered when SPONSORS exceeds INITIAL_COUNT */}
//           {needsCollapse && (
//             <div className="mt-8 flex flex-col items-center gap-2">
//               <div className="h-px w-48"
//                 style={{ background: 'linear-gradient(to right, transparent, rgba(222,91,234,0.25), transparent)' }}
//               />
//               <button
//                 onClick={() => setExpanded((v) => !v)}
//                 className="flex items-center gap-2 rounded-full border px-6 py-2 text-[0.72rem] font-medium uppercase tracking-[0.28em] backdrop-blur-md transition-all duration-300 hover:scale-105"
//                 style={{
//                   color:       '#de5bea',
//                   borderColor: 'rgba(222,91,234,0.25)',
//                   background:  'rgba(222,91,234,0.06)',
//                 }}
//               >
//                 <span>{expanded ? 'Show Less' : `View All  (+${hidden} more)`}</span>
//                 <svg
//                   width="12" height="12" viewBox="0 0 12 12" fill="none"
//                   stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
//                   style={{ transition: 'transform 0.3s ease', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
//                 >
//                   <polyline points="2 4 6 8 10 4" />
//                 </svg>
//               </button>
//             </div>
//           )}

//           <div className="mt-10 h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(222,91,234,0.3), transparent)' }} />
//           <p className="mt-6 text-center text-[0.75rem] tracking-widest text-white/25 uppercase">
//             Interested in sponsoring?{' '}
//             <a href="mailto:utsav@bmsce.ac.in" className="text-purple-400/60 hover:text-purple-300/80 transition-colors">
//               Get in touch
//             </a>
//           </p>
//         </GlassCard>
//       </div>
//     </section>
//   )
// }