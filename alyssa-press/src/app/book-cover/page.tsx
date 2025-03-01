"use client";

import Sidebar from "@/components/features/Sidebar";
import { useState, useLayoutEffect, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ThreeDBook, Button } from 'ui-library';
import { useInView } from 'react-intersection-observer';
import {Vibrant} from 'node-vibrant/browser';

// Add a new type for book colors
type BookColors = {
  [key: string]: string;
};

function BookItem({ 
  book, 
  index, 
  bookRef, 
  setBackgroundColor,
  bookColors 
}: { 
  book: { spineImg: string; coverImg: string; titlePath: string; descriptionPath: string },
  index: number,
  bookRef: { current: HTMLDivElement | null },
  setBackgroundColor: (color: string) => void,
  bookColors: BookColors
}) {
  const [title, setTitle] = useState('Loading...');
  const [description, setDescription] = useState('Loading...');
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.9,
    triggerOnce: false,
    rootMargin: "10px 0px",
    delay: 200
  });

  useEffect(() => {
    // Fetch title and description when component mounts
    fetch(book.titlePath)
      .then(response => response.text())
      .then(text => setTitle(text))
      .catch(err => console.error('Error loading title:', err));

    fetch(book.descriptionPath)
      .then(response => response.text())
      .then(text => setDescription(text))
      .catch(err => console.error('Error loading description:', err));
  }, [book.titlePath, book.descriptionPath]);

  useEffect(() => {
    if (inView && bookColors[book.coverImg]) {
      setBackgroundColor(bookColors[book.coverImg]);
    }
  }, [inView, book.coverImg, bookColors, setBackgroundColor]);

  return (
    <div 
      key={index} 
      ref={bookRef} 
      className="flex flex-col lg:flex-row items-center justify-center w-full gap-8 px-4 sm:px-6 md:px-8 lg:px-12"
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      <div 
        ref={inViewRef}
        className="w-[200px] h-[300px] xs:w-[250px] xs:h-[375px] sm:w-[300px] sm:h-[450px] md:w-[400px] md:h-[525px] relative transition-opacity duration-500 shrink-0 flex items-center justify-center"
        style={{ 
          opacity: inView ? 1 : 0,
          transform: `scale(${inView ? 1 : 0.95})`,
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        }}
      >
        {inView && <ThreeDBook scale={30}/>}  
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:px-0">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 transition-all duration-700"
          style={{ 
            opacity: inView ? 1 : 0,
            transform: `translateY(${inView ? '0' : '20px'})`,
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.2s'
          }}
        >
          {title}
        </h1>
        <p 
          className="text-base sm:text-lg max-w-[500px] transition-all duration-700"
          style={{ 
            opacity: inView ? 1 : 0,
            transform: `translateY(${inView ? '0' : '20px'})`,
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.4s',
            paddingTop: '10px',
          }}
        >
          {description}
        </p>
        <div 
          className="mt-6 transition-all duration-700"
          style={{ 
            opacity: inView ? 1 : 0,
            transform: `translateX(${inView ? '0px' : '20px'})`,
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.4s',
          }}
        >
          <Button>Buy Now</Button>
        </div>
      </div>
    </div>
  );
}

function BookCover() {
  const searchParams = useSearchParams();
  const selectedCoverImg = searchParams.get("coverImg");
  const [bookColors, setBookColors] = useState<BookColors>({});
  const [colorsLoaded, setColorsLoaded] = useState(false);

  const books = Array.from({ length: 10 }, (_, index) => ({
    spineImg: `/assets/book-spine-${index + 1}.png`,
    coverImg: `/assets/book-cover-${index + 1}.png`,
    titlePath: `/assets/book-title-${index + 1}.txt`,
    descriptionPath: `/assets/book-desc-${index + 1}.txt`,
    descriptionTxt: '', // Add this line
  }));

  // Preload all book colors when component mounts
  useEffect(() => {
    const loadColors = async () => {
      const colorPromises = books.map(book => 
        Vibrant.from(book.coverImg)
          .getPalette()
          .then(palette => ({ 
            [book.coverImg]: palette.Vibrant?.hex || '#ffffff'
          }))
          .catch(() => ({ 
            [book.coverImg]: '#ffffff'
          }))
      );

      const colors = await Promise.all(colorPromises);
      const mergedColors = Object.assign({}, ...colors);
      setBookColors(mergedColors);
      setColorsLoaded(true);
    };

    loadColors();
  }, []);

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

  if (!colorsLoaded) {
    return <div>Loading colors...</div>;
  }

  return (
    <main className="flex min-h-screen w-full" style={{ backgroundColor }}>
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar books={books} />
      </div>
      <div className="flex-1 " style={{ marginLeft: '50px', marginTop: '150px', marginBottom: '150px' }}>
        <div className="w-full">
          <div className="flex flex-col items-center gap-16">
            {books.map((book, index) => (
              <BookItem 
                key={index}
                book={book}
                index={index}
                bookRef={bookRefs.current[index]}
                setBackgroundColor={setBackgroundColor}
                bookColors={bookColors}
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