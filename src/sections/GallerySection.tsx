import CircularGallery from '../components/CircularGallery'
import ShinyText from '../components/ShinyText'

const items = [
  { image: '/gallery/img1.webp', text: '' },
  { image: '/gallery/img2.webp', text: '' },
  { image: '/gallery/img3.webp', text: '' },
  { image: '/gallery/img4.webp', text: '' },
  { image: '/gallery/img5.webp', text: '' },
  { image: '/gallery/img6.webp', text: '' },
  { image: '/gallery/img7.webp', text: '' },
  { image: '/gallery/img8.webp', text: '' },
  { image: '/gallery/img9.webp', text: '' },
  { image: '/gallery/img10.webp', text: '' },
  { image: '/gallery/img11.webp', text: '' }
]

export default function GallerySection() {
  return (
    <section className="relative w-full py-10 md:py-20 overflow-hidden">
      <h2 className="text-center font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide text-transparent bg-clip-text bg-linear-to-r from-gray-200 via-gray-400 to-gray-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.3)] mb-8 md:mb-12">
        <ShinyText
          text="Utsav 2025 Gallery"
          speed={4}
          color="rgba(209,213,219,0.8)"
          shineColor="#ffffff"
          spread={120}
          yoyo
        />
      </h2>

      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery
          items={items}
          bend={1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
          autoScrollSpeed={0.1} 
        />
      </div>
    </section>
  )
}