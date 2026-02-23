import CircularGallery from '../components/CircularGallery'

export default function GallerySection() {
  return (
    <section style={{ height: '600px', position: 'relative' }}>
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
