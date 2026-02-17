import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ParticleText } from './ParticleText';
import { CosmicBackground } from './CosmicBackground'; 

interface HeroProps {
  isMobile: boolean;
}

const HeroSection: React.FC<HeroProps> = ({ isMobile }) => {
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
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f0510]">
      
      <CosmicBackground />

      <div className="absolute inset-0 z-10 w-full h-full">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 45 }} 
          dpr={isMobile ? 1 : [1, 2]} 
        >
          <Suspense fallback={null}>
            
            {isMobile ? (
              // --- MOBILE LAYOUT ---
              <group scale={[responsiveScale, responsiveScale, responsiveScale]}>
                
                {/* UTSAV */}
                <group position={[0, 0.8, 0]}>
                  <ParticleText 
                    text="UTSAV" 
                    size={1} 
                    // REDUCED DENSITY: Dropped from 450 -> 280 to fix the "all white" look
                    density={280} 
                  />
                </group>
                
                {/* TRAYANA */}
                <group position={[0, -0.8, 0]}>
                  <ParticleText 
                    text="TRAYANA" 
                    size={1} 
                    // REDUCED DENSITY: Dropped from 450 -> 280
                    density={280} 
                  />
                </group>
              </group>
            ) : (
              // --- DESKTOP LAYOUT (Unchanged) ---
              <group scale={[1, 1, 1]}>
                <ParticleText 
                  text="UTSAV TRAYANA" 
                  size={1.2} 
                  density={1500} 
                />
              </group>
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