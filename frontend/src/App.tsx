import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion'; 
import HeroSection from './components/HeroSection';
import { IntroSequence } from './components/IntroSequence'; 
import { CosmicBackground } from './components/CosmicBackground';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  // NEW STATE: Tracks when the text should start appearing, independent of the intro unmounting
  const [startHeroAnim, setStartHeroAnim] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  const menuItems = ['EVENTS', 'GALLERY', 'TICKETS'];

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[100dvh] -z-50 bg-[#0f0510] pointer-events-none overflow-hidden">
        <CosmicBackground />
      </div>

      <main className="w-full min-h-screen relative text-fest-text selection:bg-fest-accent selection:text-fest-bg overflow-x-hidden bg-transparent">
        
        <AnimatePresence>
          {showIntro && (
            <IntroSequence 
              // Trigger the Hero text immediately when the fade begins!
              onFadeStart={() => setStartHeroAnim(true)} 
              onComplete={() => setShowIntro(false)} 
              isMobile={isMobile} 
            />
          )}
        </AnimatePresence>

        <nav className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference pointer-events-none">
          <div className="font-bold tracking-widest text-sm pointer-events-auto cursor-pointer z-[70]">
            UT.2025
          </div>
          
          <div className="hidden md:flex gap-8 text-xs font-medium tracking-widest pointer-events-auto">
            <button className="hover:text-fest-primary transition-colors">EVENTS</button>
            <button className="hover:text-fest-primary transition-colors">GALLERY</button>
            <button className="hover:text-fest-primary transition-colors">TICKETS</button>
          </div>

          <div className="md:hidden pointer-events-auto z-[70]">
             <button 
              onClick={toggleMenu} 
              className={`flex flex-col gap-1.5 p-2 focus:outline-none transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="w-6 h-0.5 bg-fest-text mb-1.5"></div>
              <div className="w-6 h-0.5 bg-fest-text"></div>
            </button>
          </div>
        </nav>

        <div 
          className={`fixed inset-0 bg-fest-bg z-[60] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
            isMenuOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-10 pointer-events-none'
          }`}
        >
          <button 
            onClick={toggleMenu}
            className="absolute top-8 left-6 flex items-center gap-3 text-sm font-bold tracking-widest text-fest-text/70 hover:text-fest-primary transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            BACK
          </button>

          <nav className="flex flex-col items-center gap-10">
            {menuItems.map((item, i) => (
              <button 
                key={item}
                onClick={toggleMenu}
                className={`text-2xl font-bold tracking-widest hover:text-fest-primary transition-all duration-500 transform ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* FIX: Now uses the new startHeroAnim state instead of waiting for !showIntro */}
        <HeroSection isMobile={isMobile} startAnimation={startHeroAnim} />

        <section className="w-full py-32 px-8 flex flex-col items-center justify-center min-h-screen relative z-10 bg-[#0f0510]/60 backdrop-blur-xl border-t border-white/5">
          <p className="text-fest-text/50 max-w-md text-center leading-relaxed">
            The journey continues below. <br/>
            More components would be loaded here as the user scrolls.
          </p>
        </section>

      </main>
    </>
  );
}

export default App;