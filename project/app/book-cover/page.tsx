"use client";

import Image from "next/image";
import Sidebar from "@/components/features/Sidebar";
import { useState, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export default function BookCover() {
  const searchParams = useSearchParams();
  const selectedCoverImg = searchParams.get("coverImg");

  const books = Array.from({ length: 10 }, (_, index) => ({
    spineImg: `/assets/book-spine-${index + 1}.png`,
    coverImg: `/assets/book-cover-${index + 1}.png`,
    descriptionTxt: `Book ${index + 1}`,
  }));

  const bookRefs = books.map(() => useRef<HTMLDivElement>(null));

  const [currentBookIndex, setCurrentBookIndex] = useState<number | null>(null);

  // Update the current book index when the selected cover image changes
  useLayoutEffect(() => {
    if (selectedCoverImg) {
      const targetIndex = books.findIndex((book) => book.coverImg === selectedCoverImg);
      if (targetIndex !== -1) {
        setCurrentBookIndex(targetIndex);
      }
    }
  }, [selectedCoverImg]); // Re-run when selectedCoverImg changes

  // Scroll to the selected book and zoom it in
  useLayoutEffect(() => {
    if (currentBookIndex !== null && bookRefs[currentBookIndex].current) {
      bookRefs[currentBookIndex].current.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, [currentBookIndex]); // Scroll when currentBookIndex changes

  // Reference for the 3D model container
  const modelContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!modelContainerRef.current) return;
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    modelContainerRef.current.appendChild(renderer.domElement);
  
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
  
    const loader = new GLTFLoader();
    loader.load(
      "/assets/3D_Book.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0, 0); // Position model at the center
        scene.add(model);
    
        // Log the model's position and size to check if it's within the camera's view
        console.log(model.position);
        console.log(model.scale);
    
        // Camera setup
        camera.position.set(0, 0, 5);  // Make sure camera is not too close
        camera.lookAt(0, 0, 0);  // Ensure camera is looking at the center
    
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );
    
  
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
      if (modelContainerRef.current) {
        modelContainerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  

  return (
    <div className="flex">
      {/* Sticky Sidebar */}
      <Sidebar books={books} />

      {/* Book Cover Display */}
      <div className="flex-1 max-w-screen-lg mx-auto p-8 flex flex-col items-center gap-8 mt-20">
        {/* 3D Model Container */}
        <div
          ref={modelContainerRef}
          className="w-full h-[400px] mb-8"
        />
        
        {books.map((book, index) => (
          <div
            key={index}
            ref={bookRefs[index]}
            className="flex flex-col items-center"
          >
            {book.coverImg === selectedCoverImg ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={book.coverImg}
                  alt={`Book ${index + 1}`}
                  width={300}
                  height={450}
                  className="shadow-lg"
                />
              </motion.div>
            ) : (
              <Image
                src={book.coverImg}
                alt={`Book ${index + 1}`}
                width={300}
                height={450}
                className="shadow-lg"
              />
            )}
            <p className="mt-4 text-lg text-center">{book.descriptionTxt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
