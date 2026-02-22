//introsequence
import React, { useRef, useLayoutEffect, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface IntroSequenceProps {
  onComplete: () => void;
  onFadeStart: () => void;
  isMobile: boolean; 
}

// --- OPTIMIZATION 1: GLOBAL GEOMETRIES ---
// We calculate these shapes exactly ONCE and reuse them across all 64 stickmen.
// We also slightly reduced the radial segments (from 16 to 12/8) since they are so thin!
const headGeo = new THREE.SphereGeometry(0.25, 12, 12);
const bodyGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8);
const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8);
const innerArmGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
const outerArmGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.55, 8);

const Stickman = ({ 
  startPos, circlePos, finalPos, rotCircle, rotFinal, delay, color, isInner 
}: { 
  startPos: number[], circlePos: number[], finalPos: number[], rotCircle: number, rotFinal: number, delay: number, color: string, isInner: boolean 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftShoulderRef = useRef<THREE.Group>(null);
  const rightShoulderRef = useRef<THREE.Group>(null);
  const leftElbowRef = useRef<THREE.Group>(null);
  const rightElbowRef = useRef<THREE.Group>(null);

  const mat = useMemo(() => {
    return new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 1, toneMapped: false });
  }, [color]);

  const armGeo = isInner ? innerArmGeo : outerArmGeo;
  const armLen = isInner ? 0.5 : 0.55;

  useLayoutEffect(() => {
    if (!groupRef.current || !leftShoulderRef.current || !rightShoulderRef.current || !leftElbowRef.current || !rightElbowRef.current) return;
    
    const fastDelay = delay * 0.45;
    const tl = gsap.timeline({ delay: fastDelay });

    tl.fromTo(groupRef.current.position,
      { x: startPos[0], y: startPos[1], z: startPos[2] },
      { x: circlePos[0], y: circlePos[1], z: circlePos[2], duration: 1.0, ease: "power3.out" }, 0
    );
    tl.fromTo(groupRef.current.rotation,
      { y: rotCircle }, { y: rotCircle, duration: 1.0 }, 0
    );
    
    tl.fromTo(leftShoulderRef.current.rotation, 
      { z: -0.1, y: 0 }, { z: -Math.PI / 2.2, y: 0, duration: 0.3, ease: "power2.out" }, 0.6);
    tl.fromTo(rightShoulderRef.current.rotation, 
      { z: 0.1, y: 0 }, { z: Math.PI / 2.2, y: 0, duration: 0.3, ease: "power2.out" }, 0.6);
    tl.fromTo(leftElbowRef.current.rotation, 
      { z: 0 }, { z: -0.1, duration: 0.3, ease: "power2.out" }, 0.6);
    tl.fromTo(rightElbowRef.current.rotation, 
      { z: 0 }, { z: 0.1, duration: 0.3, ease: "power2.out" }, 0.6);

    if (isInner) {
      tl.to(leftShoulderRef.current.rotation, { z: -0.2, duration: 0.2, ease: "power2.in" }, 1.0);
      tl.to(rightShoulderRef.current.rotation, { z: 0.2, duration: 0.2, ease: "power2.in" }, 1.0);
      tl.to(leftElbowRef.current.rotation, { z: -0.4, duration: 0.2, ease: "power2.in" }, 1.0);
      tl.to(rightElbowRef.current.rotation, { z: 0.4, duration: 0.2, ease: "power2.in" }, 1.0);

      tl.to(groupRef.current.position, {
        x: finalPos[0], y: finalPos[1], z: finalPos[2], duration: 1.0, ease: "power3.inOut"
      }, 1.2);
      
      tl.to(groupRef.current.rotation, {
        y: rotFinal, duration: 1.0, ease: "power3.inOut"
      }, 1.2);

      tl.to(leftShoulderRef.current.rotation, { z: -Math.PI / 2, y: 0, duration: 0.3, ease: "power2.out" }, 2.2);
      tl.to(rightShoulderRef.current.rotation, { z: Math.PI / 2, y: 0, duration: 0.3, ease: "power2.out" }, 2.2);
      tl.to(leftElbowRef.current.rotation, { z: 0.4, duration: 0.3, ease: "power2.out" }, 2.2); 
      tl.to(rightElbowRef.current.rotation, { z: -0.4, duration: 0.3, ease: "power2.out" }, 2.2); 

      const randomPopDelay = 2.3 + ((delay * 2) % 0.3); 
      tl.to(mat.color, {
        r: 1, g: 1, b: 1, duration: 0.2, ease: "power2.out"
      }, randomPopDelay);

    } else {
      tl.to(groupRef.current.position, { y: 0.3, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 1.2);
    }

    tl.to(mat, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 3.0);

    // --- OPTIMIZATION 2: GSAP MEMORY CLEANUP ---
    return () => { tl.kill(); };

  }, [startPos, circlePos, finalPos, rotCircle, rotFinal, delay, isInner, mat]);

  return (
    <group ref={groupRef} scale={0.75}>
      <mesh position={[0, 2.3, 0]} geometry={headGeo} material={mat} />
      <mesh position={[0, 1.4, 0]} geometry={bodyGeo} material={mat} />

      <group ref={leftShoulderRef} position={[-0.1, 1.9, 0]}>
        <mesh position={[0, -armLen / 2, 0]} geometry={armGeo} material={mat} />
        <group ref={leftElbowRef} position={[0, -armLen, 0]}>
          <mesh position={[0, -armLen / 2, 0]} geometry={armGeo} material={mat} />
        </group>
      </group>

      <group ref={rightShoulderRef} position={[0.1, 1.9, 0]}>
        <mesh position={[0, -armLen / 2, 0]} geometry={armGeo} material={mat} />
        <group ref={rightElbowRef} position={[0, -armLen, 0]}>
          <mesh position={[0, -armLen / 2, 0]} geometry={armGeo} material={mat} />
        </group>
      </group>

      <mesh position={[-0.2, 0.35, 0]} rotation={[0, 0, -Math.PI / 8]} geometry={legGeo} material={mat} />
      <mesh position={[0.2, 0.35, 0]} rotation={[0, 0, Math.PI / 8]} geometry={legGeo} material={mat} />
    </group>
  );
};

const GlowingLogo = () => {
  const geoRef = useRef<THREE.TubeGeometry>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  
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

  useLayoutEffect(() => {
    if (!matRef.current || !geoRef.current) return;
    
    const maxVertices = geoRef.current.index ? geoRef.current.index.count : geoRef.current.attributes.position.count;
    
    geoRef.current.setDrawRange(0, 0);
    matRef.current.opacity = 1;

    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: maxVertices,
      duration: 0.8, 
      ease: "power2.inOut",
      delay: 2.3, 
      onUpdate: () => {
        if (geoRef.current) {
          geoRef.current.setDrawRange(0, Math.floor(proxy.val));
        }
      }
    });

  }, []);

  return (
    <mesh>
      <tubeGeometry ref={geoRef} args={[curve, 400, 0.08, 16, true]} />
      <meshBasicMaterial ref={matRef} color="#FDE08B" transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  );
};

const IntroScene = ({ onFadeStart, onIntroEnd, responsiveScale, isMobile }: { onFadeStart: () => void, onIntroEnd: () => void, responsiveScale: number, isMobile: boolean }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const dummyTarget = new THREE.Vector3(0, 0, 0);

  const stickmenData = useMemo(() => {
    const data = [];
    const colors = ['#FF3366', '#33CCFF', '#FDE08B', '#00FF66', '#FF9933', '#CC33FF'];
    const RADIUS_START = 35; 

    const NUM_OUTER = 32;
    const RADIUS_OUTER = 6.4; 
    for (let i = 0; i < NUM_OUTER; i++) {
      const angle = (i / NUM_OUTER) * Math.PI * 2;
      const startPos = [Math.cos(angle) * RADIUS_START, 0, Math.sin(angle) * RADIUS_START];
      const circlePos = [Math.cos(angle) * RADIUS_OUTER, 0, Math.sin(angle) * RADIUS_OUTER];
      const rotCircle = -angle - Math.PI / 2; 
      
      data.push({
        isInner: false,
        startPos, circlePos, finalPos: circlePos, 
        rotCircle, rotFinal: rotCircle, delay: 0.1, color: colors[(i + 1) % colors.length]
      });
    }

    const NUM_INNER = 32;
    const RADIUS_INNER = 3.2;
    const INF_WIDTH = 5.4; 
    const INF_DEPTH = 2.4;
    const HEIGHT = 1.65;

    for (let i = 0; i < NUM_INNER; i++) {
      const angle = (i / NUM_INNER) * Math.PI * 2;
      const startPos = [Math.cos(angle) * (RADIUS_START - 4), 0, Math.sin(angle) * (RADIUS_START - 4)];
      const circlePos = [Math.cos(angle) * RADIUS_INNER, 0, Math.sin(angle) * RADIUS_INNER];
      const rotCircle = -angle - Math.PI / 2;
      
      const t = (i / NUM_INNER) * Math.PI * 2 + 0.15;
      const yElevated = HEIGHT + Math.cos(t) * 0.15;
      
      const infinityPos = [INF_WIDTH * Math.sin(t), 0, INF_DEPTH * Math.sin(2 * t)];
      
      const dx = INF_WIDTH * Math.cos(t);
      const dz = INF_DEPTH * 2 * Math.cos(2 * t);
      const rotFinal = Math.atan2(dx, dz) + Math.PI / 2;
      
      data.push({
        isInner: true,
        startPos, circlePos, finalPos: infinityPos,
        rotCircle, rotFinal, delay: 0.15, color: colors[(i + 3) % colors.length]
      });
    }

    return data;
  }, []);

  useLayoutEffect(() => {
    if (!cameraRef.current) return;
    const tl = gsap.timeline();

    tl.to(cameraRef.current.position, {
      y: 20, z: 2.0, duration: 1.8, ease: "power3.inOut", delay: 0.1,
    }, 0);

    tl.to(cameraRef.current.position, {
      y: 22, z: 0.1, duration: 1.8, ease: "power2.inOut",
    }, 1.8);

    tl.to({}, { duration: 0.1, onComplete: onFadeStart }, 3.8);
    tl.to({}, { duration: 0.1, onComplete: onIntroEnd }, 4.5);

    return () => { tl.kill(); };
  }, [onFadeStart, onIntroEnd]);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(dummyTarget);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 16, 26]} fov={isMobile ? 55 : 40} />
      <group scale={[responsiveScale, responsiveScale, responsiveScale]}>
        {stickmenData.map((data, index) => (
          <Stickman 
            key={index}
            isInner={data.isInner}
            startPos={data.startPos} 
            circlePos={data.circlePos}
            finalPos={data.finalPos}
            rotCircle={data.rotCircle}
            rotFinal={data.rotFinal}
            delay={data.delay} 
            color={data.color}
          />
        ))}
        <GlowingLogo />
      </group>
    </>
  );
};

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete, onFadeStart, isMobile }) => {
  const [isFading, setIsFading] = useState(false);
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
    <div 
      className="fixed inset-0 z-[100] w-full h-[100dvh] overflow-hidden transition-opacity duration-700 ease-in-out"
      style={{ 
        opacity: isFading ? 0 : 1, 
        backgroundColor: '#13071e',
        pointerEvents: isFading ? 'none' : 'auto'
      }}
    >
      {/* --- OPTIMIZATION 3: R3F Canvas Settings --- */}
      {/* We request high-performance mode and strictly cap the dpr to 1.5 to save mobile batteries! */}
      <Canvas gl={{ powerPreference: "high-performance" }} dpr={[1, 1.5]}>
        <IntroScene 
          onFadeStart={() => {
            setIsFading(true);    
            onFadeStart();        
          }} 
          onIntroEnd={onComplete} 
          responsiveScale={responsiveScale}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
};