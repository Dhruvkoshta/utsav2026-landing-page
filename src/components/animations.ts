/* Shared animation presets for framer-motion sections */

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, amount: 0.2 } as const,
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
})

export const hoverLift = {
  whileHover: { y: -5, transition: { duration: 0.35, ease: 'easeOut' as const } },
}
