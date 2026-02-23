import LogoLoop from '../components/LogoLoop'

const sponsors = [
  { src: 'https://placehold.co/200x80/0a0a0a/444?text=Sponsor+1', alt: 'Sponsor 1' },
  { src: 'https://placehold.co/200x80/0a0a0a/444?text=Sponsor+2', alt: 'Sponsor 2' },
  { src: 'https://placehold.co/200x80/0a0a0a/444?text=Sponsor+3', alt: 'Sponsor 3' },
  { src: 'https://placehold.co/200x80/0a0a0a/444?text=Sponsor+4', alt: 'Sponsor 4' },
  { src: 'https://placehold.co/200x80/0a0a0a/444?text=Sponsor+5', alt: 'Sponsor 5' },
  { src: 'https://placehold.co/200x80/0a0a0a/444?text=Sponsor+6', alt: 'Sponsor 6' },
  { src: 'https://placehold.co/200x80/0a0a0a/444?text=Sponsor+7', alt: 'Sponsor 7' },
  { src: 'https://placehold.co/200x80/0a0a0a/444?text=Sponsor+8', alt: 'Sponsor 8' },
]

export default function SponsorsSection() {
  return (
    <section className="relative w-full py-16 sm:py-20">
      <h2 className="mb-30 text-center font-playfair text-3xl font-bold tracking-wide text-white/90 sm:text-4xl">
        Our Sponsors
      </h2>

      <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }}>
        <LogoLoop
          logos={sponsors}
          speed={80}
          direction="left"
          logoHeight={100}
          gap={60}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#07050a"
          ariaLabel="Our sponsors"
        />
      </div>
    </section>
  )
}
