export default function FooterSection() {
  return (
    <footer className="relative w-full border-t border-white/5 px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <img
            src="/ut-2026.svg"
            alt="Utsav 2026"
            className="h-8 w-auto opacity-60"
            loading="lazy"
          />
          <span className="text-sm tracking-widest text-gray-500 uppercase">
            © UTSAV 2026
          </span>
        </div>

        <p className="text-xs text-gray-600">
          B. M. S. College of Engineering, Bangalore
        </p>
      </div>
    </footer>
  )
}
