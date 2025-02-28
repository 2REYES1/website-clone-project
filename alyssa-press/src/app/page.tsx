"use client";

import Sidebar from "@/components/features/Sidebar";
import Book from "@/components/features/Book";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [pressedBookIndex, setPressedBookIndex] = useState<number | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const holdDuration = 200; // milliseconds to hold before showing description
  let holdTimer: NodeJS.Timeout;

  const books = Array.from({ length: 10 }, (_, index) => ({
    spineImg: `/assets/book-spine-${index + 1}.png`,
    coverImg: `/assets/book-cover-${index + 1}.png`,
    title: `Book ${index + 1}`,
    descriptionTxt: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  }));

  const handleMouseDown = (index: number) => {
    holdTimer = setTimeout(() => {
      setIsHolding(true);
      setPressedBookIndex(index);
    }, holdDuration);
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimer);
    if (isHolding) {
      setIsHolding(false);
      setPressedBookIndex(null);
    }
  };

  useEffect(() => {
    // Cleanup timer on unmount
    return () => clearTimeout(holdTimer);
  }, []);

  return (
    <main className="flex min-h-screen">
      {/* Sticky Sidebar */}
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar books={books} />
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-[200px] flex items-center justify-center" style={{ marginTop: '150px', marginBottom: '150px', paddingTop: '150px', paddingBottom: '150px' }}>
        <div className="w-full h-full overflow-y-auto">
          <div className="flex flex-col items-center gap-8 w-full">
            <AnimatePresence>
              {books.map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{
                    opacity: pressedBookIndex === null || pressedBookIndex === index ? 1 : 0,
                    scale: pressedBookIndex === index ? 1.1 : 1,
                    filter: pressedBookIndex === index ? 'brightness(1.1)' : 'brightness(1)'
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onMouseDown={() => handleMouseDown(index)}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className="relative w-[95%] sm:w-[85%] md:w-[75%] flex flex-col items-center"
                >
                  <div className="w-full">
                    <Book
                      spineImg={book.spineImg}
                      coverImg={book.coverImg}
                      descriptionTxt={book.descriptionTxt}
                      title={book.title}
                    />
                  </div>
                  
                  {/* Description Box */}
                  <AnimatePresence>
                    {isHolding && pressedBookIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full max-w-[600px] mt-8 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg"
                      >
                        <div style={{padding: '20px'}}>
                          <h3 className="text-xl font-bold mb-3 text-[#617D51]">{book.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{book.descriptionTxt}</p>
                        </div>
                        
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
