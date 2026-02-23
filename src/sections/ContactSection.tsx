import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import ShinyText from '../components/ShinyText'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, amount: 0.2 } as const,
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
})

const socials = [
  { icon: FaFacebook, href: 'https://m.facebook.com/utsavbmsce', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/bmsce_utsav/', label: 'Instagram' },
  { icon: FaXTwitter, href: 'https://twitter.com/bmsce_utsav', label: 'X / Twitter' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@BMSCE_UTSAV', label: 'YouTube' },
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center px-4 py-20 sm:py-28"
    >
      {/* Title */}
      <motion.h2
        {...fadeUp(0)}
        className="mb-2 text-center font-playfair text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.4)] sm:text-6xl md:text-7xl"
      >
        <ShinyText
          text="Get In Touch"
          speed={4}
          color="rgba(209,213,219,0.8)"
          shineColor="#ffffff"
          spread={120}
          yoyo
        />
      </motion.h2>

      {/* Social icons */}
      <motion.div {...fadeUp(0.1)} className="mt-10 flex gap-6">
        {socials.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="group relative"
          >
            <div className="absolute inset-0 rounded-full bg-purple-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-400 backdrop-blur-md transition-all duration-300 group-hover:border-purple-500/50 group-hover:text-white md:h-16 md:w-16">
              <social.icon size={28} />
            </div>
          </a>
        ))}
      </motion.div>

      {/* Address glass panel */}
      <motion.div
        {...fadeUp(0.2)}
        className="mt-12 w-full rounded-3xl border border-gray-500/20 bg-white/[0.02] p-8 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 hover:border-purple-500/30 md:w-1/2"
      >
        <p className="text-lg font-light leading-relaxed text-gray-300 md:text-xl">
          <span className="font-semibold text-gray-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            B. M. S. College of Engineering
          </span>
          <br />
          <span className="text-base text-gray-400 md:text-lg">
            #1908, Bull Temple Road, Basavanagudi, Bangalore - 560029
          </span>
          <br />
          <a
            href="mailto:utsav@bmsce.ac.in"
            className="mt-2 inline-block font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            utsav@bmsce.ac.in
          </a>
        </p>
      </motion.div>
    </section>
  )
}
