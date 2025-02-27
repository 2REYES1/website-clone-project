"use client";

import Image from "next/image";
import Sidebar from "@/components/features/Sidebar";
import { useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function BookCover() {
  const searchParams = useSearchParams();
  const selectedCoverImg = searchParams.get("coverImg");

  const books = Array.from({ length: 5 }, (_, index) => ({
    spineImg: "/assets/book-spine.png",
    coverImg: `/assets/book-cover-${index + 1}.png`,
    descriptionTxt: `Book ${index + 1}`,
  }));

  const bookRefs = books.map(() => useRef<HTMLDivElement>(null));

  useLayoutEffect(() => {
    if (selectedCoverImg) {
      const targetIndex = books.findIndex((book) => book.coverImg === selectedCoverImg);
      if (targetIndex !== -1 && bookRefs[targetIndex].current) {
        bookRefs[targetIndex].current?.scrollIntoView({ behavior: "instant", block: "start" });
      }
    }
  }, [selectedCoverImg]);

  return (
    <div className="flex">
      {/* Sticky Sidebar */}
      <Sidebar books={books} />

      {/* Book Cover Display */}
      <div className="flex-1 max-w-screen-lg mx-auto p-8 flex flex-col items-center gap-8 mt-20">
        {books.map((book, index) => (
          <div key={index} ref={bookRefs[index]} className="flex flex-col items-center">
            {book.coverImg === selectedCoverImg ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image src={book.coverImg} alt={`Book ${index + 1}`} width={300} height={450} className="shadow-lg" />
              </motion.div>
            ) : (
              <Image src={book.coverImg} alt={`Book ${index + 1}`} width={300} height={450} className="shadow-lg" />
            )}
            <p className="mt-4 text-lg text-center">{book.descriptionTxt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
