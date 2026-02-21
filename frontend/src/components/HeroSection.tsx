import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ParticleText } from './ParticleText';

interface HeroProps {
  isMobile: boolean;
  startAnimation: boolean; // Prop added to listen to App.tsx
}

const HeroSection: React.FC<HeroProps> = ({ isMobile, startAnimation }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // "BULLETPROOF FIT" LOGIC:
  const responsiveScale = useMemo(() => {
    if (isMobile) {
       const rawScale = windowWidth / 1000;
       return Math.max(0.25, Math.min(rawScale, 0.50));
    }
    return 1;
  }, [isMobile, windowWidth]);

  return (
    /* bg-transparent ensures the CosmicBackground in App.tsx is visible */
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
      
      <div className="absolute inset-0 z-10 w-full h-full">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 45 }} 
          dpr={isMobile ? 1 : [1, 2]} 
        >
          <Suspense fallback={null}>
            
            {/* The 3D text only renders/swarms when startAnimation is true */}
            {startAnimation && (
              isMobile ? (
                // --- MOBILE LAYOUT ---
                <group scale={[responsiveScale, responsiveScale, responsiveScale]}>
                  
                  {/* UTSAV */}
                  <group position={[0, 0.8, 0]}>
                    <ParticleText 
                      text="UTSAV" 
                      size={1} 
                      density={280} 
                      startAnimation={true}
                    />
                  </group>
                  
                  {/* TRAYANA */}
                  <group position={[0, -0.8, 0]}>
                    <ParticleText 
                      text="TRAYANA" 
                      size={1} 
                      density={280} 
                      startAnimation={true}
                    />
                  </group>
                </group>
              ) : (
                // --- DESKTOP LAYOUT ---
                <group scale={[1, 1, 1]}>
                  <ParticleText 
                    text="UTSAV TRAYANA" 
                    size={1.2} 
                    density={1500} 
                    startAnimation={true}
                  />
                </group>
              )
            )}
            
            <fog attach="fog" args={['#0f0510', 5, 25]} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute z-20 bottom-[20%] md:bottom-[15%] text-center px-4 w-full pointer-events-none select-none">
        <h1 className="sr-only">Utsav Trayana: Echoes of Every Path</h1>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 3.5, duration: 1.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="text-fest-secondary font-light tracking-[0.2em] md:tracking-[0.5em] uppercase text-xs md:text-lg lg:text-xl drop-shadow-lg shadow-black">
            Echoes of Every Path
          </h2>
          <div className="mt-6 h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-fest-accent to-transparent opacity-70" />
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 z-20 text-white/30 mix-blend-screen"
        animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-sm uppercase tracking-widest text-[10px]">Scroll to Explore</span>
        <div className="w-px h-8 bg-white mx-auto mt-2 opacity-50"></div>
      </motion.div>
      
    </section>
  );
};

export default HeroSection;