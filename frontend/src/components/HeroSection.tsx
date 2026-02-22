import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface HeroProps {
  isMobile: boolean;
  startAnimation: boolean; 
}

const PersistentLogo = () => {
  const curve = useMemo(() => {
    const pts = [];
    const INF_WIDTH = 5.4; 
    const INF_DEPTH = 2.4;
    const HEIGHT = 1.65; 
    
    for (let i = 0; i < 100; i++) {
      const t = (i / 100) * Math.PI * 2 + 0.15;
      const yElevated = HEIGHT + Math.cos(t) * 0.15;
      pts.push(new THREE.Vector3(INF_WIDTH * Math.sin(t), yElevated, INF_DEPTH * Math.sin(2 * t)));
    }
    return new THREE.CatmullRomCurve3(pts, true);
  }, []);

  return (
    <mesh>
      <tubeGeometry args={[curve, 400, 0.08, 16, true]} />
      <meshBasicMaterial color="#FDE08B" toneMapped={false} depthWrite={false} transparent={true} opacity={1} />
    </mesh>
  );
};

const HeroSection: React.FC<HeroProps> = ({ isMobile, startAnimation }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsiveScale = useMemo(() => {
    if (isMobile) {
       const rawScale = windowWidth / 1000;
       return Math.max(0.40, Math.min(rawScale, 0.60));
    }
    return 1;
  }, [isMobile, windowWidth]);

  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-transparent">
      
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        {/* OPTIMIZATION: Applied high-performance gl preset and capped dpr to match the Intro precisely */}
        <Canvas 
          gl={{ powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 22, 0.1], fov: isMobile ? 55 : 40 }} 
          onCreated={({ camera }) => {
            camera.lookAt(0, 0, 0); 
          }}
        >
          <Suspense fallback={null}>
            <group scale={[responsiveScale, responsiveScale, responsiveScale]}>
              <PersistentLogo />
            </group>
            <fog attach="fog" args={['#0f0510', 15, 45]} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute z-20 bottom-[20%] md:bottom-[15%] text-center px-4 w-full pointer-events-none select-none">
        <h1 className="sr-only">Utsav Trayana: Echoes of Every Path</h1>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={startAnimation ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="text-[#FDE08B] font-light tracking-[0.2em] md:tracking-[0.5em] uppercase text-xs md:text-lg lg:text-xl drop-shadow-lg shadow-black">
            Echoes of Every Path
          </h2>
          <div className="mt-6 h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-[#C69A4C] to-transparent opacity-70" />
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 z-20 text-white/30 mix-blend-screen pointer-events-none"
        initial={{ opacity: 0 }}
        animate={startAnimation ? { y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ 
          opacity: { duration: 1.0 },
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <span className="text-sm uppercase tracking-widest text-[10px]">Scroll to Explore</span>
        <div className="w-px h-8 bg-white mx-auto mt-2 opacity-50"></div>
      </motion.div>
      
    </section>
  );
};

export default HeroSection;