import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedShape = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    // Original rotation
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    
    // Mouse movement interaction (subtle parallax tilt)
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;
    
    // Smoothly interpolate current rotation towards target based on mouse
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -targetX, 0.05);
    
    // Subtle positional shift based on mouse
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, state.pointer.x * 0.5, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, state.pointer.y * 0.5, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.9}>
        <MeshDistortMaterial 
          color="#F59E0B" 
          attach="material" 
          distort={0.4} 
          speed={2} 
          roughness={0.2} 
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedShape />
      </Canvas>
    </div>
  );
};

export default Hero3D;
