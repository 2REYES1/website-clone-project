"use client";

import Sidebar from "@/components/features/Sidebar";
import { useState, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ThreeDBook } from 'ui-library';
import { useInView } from 'react-intersection-observer';

export default function BookCover() {
  const searchParams = useSearchParams();
  const selectedCoverImg = searchParams.get("coverImg");

  const books = Array.from({ length: 10 }, (_, index) => ({
    spineImg: `/assets/book-spine-${index + 1}.png`,
    coverImg: `/assets/book-cover-${index + 1}.png`,
    descriptionTxt: `Book ${index + 1}\n Lorem ipsum dolor sit amet...`,
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
    <main className="flex min-h-screen w-full">
      {/* Sticky Sidebar */}
      <Sidebar books={books} />

      {/* Book Cover Display */}
      <div className="flex-1 flex justify-center">
        <div className="max-w-screen-lg w-full p-8">
          <div className="flex flex-col items-center gap-8 mt-20">
            {books.map((book, index) => {
              const { ref, inView } = useInView({
                threshold: .9,
                triggerOnce: false,
                rootMargin: "10px 0px",
                delay: 200
              });

              return (
                <div key={index} ref={bookRefs[index]} className="flex items-center gap-8 flex-wrap justify-center">
                  <div 
                    ref={ref} 
                    className="w-[300px] h-[450px] relative bg-gray-100 rounded-lg transition-opacity duration-500"
                    style={{ 
                      opacity: inView ? 1 : 0,
                      transform: `scale(${inView ? 1 : 0.95})`,
                      transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
                    }}
                  >
                    {inView && <ThreeDBook />}
                  </div>
                  <p className="text-lg text-left p-6 flex-1 min-w-[300px] max-w-[500px]">{book.descriptionTxt}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
