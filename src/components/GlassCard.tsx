import { motion } from 'framer-motion'
import { fadeUp, hoverLift } from './animations'

/* ── Liquid-glass card wrapper ────────────────────────────────────────────── */

export function GlassCard({
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
