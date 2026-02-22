import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const PersistentLogo = () => {
  const curve = useMemo(() => {
    const pts = [];
    const INF_WIDTH = 3.6; 
    const INF_DEPTH = 1.6;
    const HEIGHT = 1.425; 
    
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2 + 0.15;
      pts.push(new THREE.Vector3(INF_WIDTH * Math.sin(t), HEIGHT, INF_DEPTH * Math.sin(2 * t)));
    }
    return new THREE.CatmullRomCurve3(pts, true);
  }, []);

  return (
    <mesh>
      <tubeGeometry args={[curve, 120, 0.08, 12, true]} />
      {/* Opacity is 1 permanently since it's the main site now */}
      <meshBasicMaterial color="#FDE08B" toneMapped={false} />
    </mesh>
  );
};

export const PersistentLogoScene = () => {
  return (
    <Canvas>
      {/* Matches the EXACT ending camera coordinates of the intro sequence */}
      <PerspectiveCamera 
        makeDefault 
        position={[0, 30, 0.1]} 
        fov={40} 
        onUpdate={c => c.lookAt(0, 0, 0)} 
      />
      <PersistentLogo />
    </Canvas>
  );
};