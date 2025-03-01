"use client";

import Sidebar from "@/components/features/Sidebar";
import Book from "@/components/features/Book";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [pressedBookIndex, setPressedBookIndex] = useState<number | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const holdDuration = 200;
  let holdTimer: NodeJS.Timeout;

  const books = Array.from({ length: 10 }, (_, index) => ({
    spineImg: `/assets/book-spine-${index + 1}.png`,
    coverImg: `/assets/book-cover-${index + 1}.png`,
    titlePath: `/assets/book-title-${index + 1}.txt`,
    descriptionPath: `/assets/book-desc-${index + 1}.txt`,
    descriptionTxt: '', // Add this line
  }));

  // State for storing fetched titles and descriptions
  const [bookData, setBookData] = useState<{ [key: number]: { title: string; description: string } }>({});

  useEffect(() => {
    books.forEach((book, index) => {
      Promise.all([
        fetch(book.titlePath).then(response => response.text()),
        fetch(book.descriptionPath).then(response => response.text())
      ])
        .then(([title, description]) => {
          setBookData(prev => ({
            ...prev,
            [index]: { title, description }
          }));
        })
        .catch(err => console.error('Error loading book data:', err));
    });
  }, []);

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
                      descriptionTxt={bookData[index]?.description || 'Loading...'}
                      title={bookData[index]?.title || 'Loading...'}
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
                          <h3 className="text-xl font-bold mb-3 text-[#617D51]">
                            {bookData[index]?.title || 'Loading...'}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {bookData[index]?.description || 'Loading...'}
                          </p>
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
