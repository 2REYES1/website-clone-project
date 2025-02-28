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
    title: `Book ${index + 1}`,
    descriptionTxt: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
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
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar books={books} />
      </div>

      {/* Book Cover Display */}
      <div className="flex-1" style={{ marginLeft: '50px', marginTop: '150px', marginBottom: '150px' }}>
        <div className="w-full py-[150px]">
          <div className="flex flex-col items-center gap-16">
            {books.map((book, index) => {
              const { ref, inView } = useInView({
                threshold: .9,
                triggerOnce: false,
                rootMargin: "10px 0px",
                delay: 200
              });

              return (
                <div 
                  key={index} 
                  ref={bookRefs[index]} 
                  className="flex flex-col lg:flex-row items-center gap-8 px-4 sm:px-6 md:px-8 lg:px-12"
                  style={{ maxWidth: '1200px', margin: '0 auto' }}
                >
                  <div 
                    ref={ref} 
                    className="w-[200px] h-[300px] xs:w-[250px] xs:h-[375px] sm:w-[300px] sm:h-[450px] md:w-[600px] md:h-[525px] relative transition-opacity duration-500 shrink-0"
                    style={{ 
                      opacity: inView ? 1 : 0,
                      transform: `scale(${inView ? 1 : 0.95})`,
                      transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
                    }}
                  >
                    {inView && <ThreeDBook scale={30}/>}
                  </div>
                  <div className="w-full lg:flex-1 pl-[60px] lg:pl-12 pr-8">
                    <h1 
                      className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 transition-all duration-700"
                      style={{ 
                        opacity: inView ? 1 : 0,
                        transform: `translateY(${inView ? '0' : '20px'})`,
                        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                        transitionDelay: '0.2s'
                      }}
                    >
                      {book.title}
                    </h1>
                    <p 
                      className="text-base sm:text-lg text-left max-w-[500px] transition-all duration-700"
                      style={{ 
                        opacity: inView ? 1 : 0,
                        transform: `translateY(${inView ? '0' : '20px'})`,
                        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                        transitionDelay: '0.4s'
                      }}
                    >
                      {book.descriptionTxt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
