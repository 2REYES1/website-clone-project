// components/3DBook.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from 'three';

const ThreeDModel = ({ scale = 25 }) => {
  const { scene } = useGLTF("/assets/3D_Book.glb");
  const modelRef = useRef<THREE.Group>();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in the model
    const timer = setTimeout(() => setOpacity(1), 100);
    
    return () => {
      clearTimeout(timer);
      // Cleanup when component unmounts
      if (modelRef.current) {
        modelRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <group>
      <primitive
        ref={modelRef}
        object={scene.clone()} // Clone the scene to avoid sharing materials
        scale={scale}
        position={[0, 0, 0]}
        style={{ opacity }}
        rotation={[Math.PI / 2, Math.PI / 1, 0]}
      />
    </group>
  );
};

// Create a singleton renderer instance
let rendererInstance: THREE.WebGLRenderer | null = null;

export const ThreeDBook = ({ scale = 25 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      // Cleanup only if this is the last instance being unmounted
      if (containerRef.current && !document.querySelector('canvas')) {
        rendererInstance?.dispose();
        rendererInstance = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        height: "100%", 
        position: "absolute", 
        left: 0, 
        top: 0,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75}}
        style={{ width: "100%", height: "100%", background: 'transparent' }}
        gl={{ 
          powerPreference: "low-power",
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          premultipliedAlpha: true,
          // Share the renderer instance
          onCreated: ({ gl }) => {
            if (!rendererInstance) {
              rendererInstance = gl;
            }
          }
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ThreeDModel scale={scale} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};
