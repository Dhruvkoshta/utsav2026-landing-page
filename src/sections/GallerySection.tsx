import CircularGallery from '../components/CircularGallery'
import ShinyText from '../components/ShinyText'
import { motion } from 'framer-motion'

export default function GallerySection() {
  return (
    <section style={{ height: '600px', position: 'relative' }}>
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center font-cinzel text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.3)] sm:text-4xl"
      >
        <ShinyText
          text="Gallery"
          speed={4}
          color="rgba(209,213,219,0.8)"
          shineColor="#ffffff"
          spread={120}
          yoyo
        />
      </motion.h2>

      <CircularGallery
        textColor="#ffffff"
        borderRadius={0.05}
        bend={1}
        scrollSpeed={2}
        scrollEase={0.05}
      />
    </section>
  )
}
