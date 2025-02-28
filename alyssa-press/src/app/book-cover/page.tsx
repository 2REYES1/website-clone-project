"use client";

import Image from "next/image";
import Sidebar from "@/components/features/Sidebar";
import { useState, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Load the 3D Model
function BookModel() {
  const { scene } = useGLTF("/assets/3D_Book.glb"); // Load the GLB model
  return <primitive object={scene} scale={1.5} />;
}

export default function BookCover() {
  const searchParams = useSearchParams();
  const selectedCoverImg = searchParams.get("coverImg");

  const books = Array.from({ length: 10 }, (_, index) => ({
    spineImg: `/assets/book-spine-${index + 1}.png`,
    coverImg: `/assets/book-cover-${index + 1}.png`,
    descriptionTxt: `Book ${index + 1} Lorem ipsum dolor sit amet...`,
  }));

  const bookRefs = books.map(() => useRef<HTMLDivElement>(null));
  const [currentBookIndex, setCurrentBookIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (selectedCoverImg) {
      const targetIndex = books.findIndex((book) => book.coverImg === selectedCoverImg);
      if (targetIndex !== -1) {
        setCurrentBookIndex(targetIndex);
      }
    }
  }, [selectedCoverImg]);

  useLayoutEffect(() => {
    if (currentBookIndex !== null && bookRefs[currentBookIndex].current) {
      bookRefs[currentBookIndex].current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [currentBookIndex]);

  return (
    <div className="flex flex-col items-center">
      {/* 3D Book Model */}
      <div className="w-full h-[400px]">
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <BookModel />
          <OrbitControls />
        </Canvas>
      </div>

      {/* Page Content */}
      <div className="flex w-full">
        {/* Sticky Sidebar */}
        <Sidebar books={books} />

        {/* Book Cover Display */}
        <div className="flex-1 max-w-screen-lg mx-auto p-8 flex flex-col gap-8 mt-20">
          {books.map((book, index) => (
            <div key={index} ref={bookRefs[index]} className="flex items-center gap-8 flex-wrap">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} whileHover={{ scale: 1.1 }}>
                <Image src={book.coverImg} alt={`Book ${index + 1}`} width={300} height={450} style={{ height: "auto" }} className="shadow-lg" />
              </motion.div>
              <p className="text-lg text-left p-6 flex-1 min-w-[300px]">{book.descriptionTxt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
