// components/3DBook.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei"; // OrbitControls is already correct here
import * as THREE from "three";

/**
 * This component must be rendered as a child of <Canvas> because it uses
 * React Three Fiber elements (<group>, <primitive>).
 */
function BookModel({ scale = 25 }: { scale?: number }) {
  const { scene } = useGLTF("/assets/3D_Book.glb");
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Cleanup geometries and materials to avoid memory leaks
    return () => {
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
    <group ref={modelRef}>
      <primitive
        object={scene.clone()} // Clone the scene to avoid sharing materials
        scale={[scale, scale, scale]}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, Math.PI, 0]}
      />
    </group>
  );
}

export function ThreeDBook({ scale = 25 }: { scale?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fade in the container after 100ms
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => {
      clearTimeout(timer);
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
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        gl={{
          powerPreference: "low-power",
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          premultipliedAlpha: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BookModel scale={scale} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}