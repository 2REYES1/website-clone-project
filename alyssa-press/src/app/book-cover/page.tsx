"use client";

import Sidebar from "@/components/features/Sidebar";
import { useState, useLayoutEffect, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ThreeDBook, Button } from 'ui-library';
import { useInView } from 'react-intersection-observer';
import {Vibrant} from 'node-vibrant/browser';  // Updated import statement

function BookItem({ 
  book, 
  index, 
  bookRef, 
  setBackgroundColor 
}: { 
  book: { spineImg: string; coverImg: string; title: string; descriptionTxt: string },
  index: number,
  bookRef: { current: HTMLDivElement | null },
  setBackgroundColor: (color: string) => void
}) {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.9,
    triggerOnce: false,
    rootMargin: "10px 0px",
    delay: 200
  });

  useEffect(() => {
    if (inView) {
      Vibrant.from(book.coverImg)
        .getPalette()
        .then(palette => {
          setBackgroundColor(palette.Vibrant?.hex || '#ffffff');
        })
        .catch(err => {
          console.error('Error getting palette:', err);
          setBackgroundColor('#ffffff');
        });
    }
  }, [inView, book.coverImg, setBackgroundColor]);

  return (
    <div 
      key={index} 
      ref={bookRef} 
      className="flex flex-col lg:flex-row items-center gap-8 px-4 sm:px-6 md:px-8 lg:px-12"
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      <div 
        ref={inViewRef}
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
            transitionDelay: '0.4s',
            paddingTop: '10px',
          }}
        >
          {book.descriptionTxt}
        </p>
        <div className="text-base sm:text-lg text-left max-w-[500px] transition-all duration-700"
          style={{ 
            opacity: inView ? 1 : 0,
            transform: `translateX(${inView ? '0px' : '20px'})`,
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.4s',
            paddingTop: '20px',
          }}>
          <Button>Buy Now</Button>
        </div>
      </div>
    </div>
  );
}

function BookCover() {
  const searchParams = useSearchParams();
  const selectedCoverImg = searchParams.get("coverImg");

  const books = Array.from({ length: 10 }, (_, index) => ({
    spineImg: `/assets/book-spine-${index + 1}.png`,
    coverImg: `/assets/book-cover-${index + 1}.png`,
    title: `Book ${index + 1}`,
    descriptionTxt: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  }));

  // Initialize bookRefs with a single useRef call
  const bookRefs = useRef<{ current: HTMLDivElement | null }[]>([]);

  // Populate the refs array once on mount
  useEffect(() => {
    // Only set the array if it hasn't been initialized or if length has changed
    if (bookRefs.current.length !== books.length) {
      bookRefs.current = Array(books.length).fill(null).map(() => ({ current: null }));
    }
  }, [books.length]); // Dependency on books.length to handle potential changes

  const [currentBookIndex, setCurrentBookIndex] = useState<number | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  useLayoutEffect(() => {
    if (selectedCoverImg) {
      const targetIndex = books.findIndex((book) => book.coverImg === selectedCoverImg);
      if (targetIndex !== -1) {
        setCurrentBookIndex(targetIndex);
      }
    }
  }, [selectedCoverImg, books]);

  useLayoutEffect(() => {
    if (currentBookIndex !== null && bookRefs.current[currentBookIndex].current) {
      bookRefs.current[currentBookIndex].current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [currentBookIndex]);

  return (
    <main className="flex min-h-screen w-full" style={{ backgroundColor }}>
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar books={books} />
      </div>
      <div className="flex-1" style={{ marginLeft: '50px', marginTop: '150px', marginBottom: '150px' }}>
        <div className="w-full py-[150px]">
          <div className="flex flex-col items-center gap-16">
            {books.map((book, index) => (
              <BookItem 
                key={index}
                book={book}
                index={index}
                bookRef={bookRefs.current[index]}
                setBackgroundColor={setBackgroundColor}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookCover />
    </Suspense>
  );
}