"use client";

import Image from "next/image";
import Sidebar from "@/components/features/Sidebar";
import { useState, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function BookCover() {
  const searchParams = useSearchParams();
  const selectedCoverImg = searchParams.get("coverImg");

  const books = Array.from({ length: 10 }, (_, index) => ({
    spineImg: `/assets/book-spine-${index + 1}.png`,
    coverImg: `/assets/book-cover-${index + 1}.png`,
    descriptionTxt: `Book ${index + 1} Lorem ipsum dolor sit amet. Ut praesentium harum est magni assumenda et quae aliquid aut blanditiis iure cum quos corrupti et alias tenetur. Et exercitationem ratione et quia doloribus est enim maxime non voluptatem perspiciatis id galisum architecto? Sed aliquam omnis et unde officia quo itaque dolores eos fugiat quos ut cupiditate iusto a obcaecati illo ea accusamus explicabo. Aut incidunt minima est porro eius qui impedit expedita. </p><p>Ut quaerat internos et odit cumque et porro explicabo! Ut quidem tenetur sed internos nesciunt non esse exercitationem sit rerum iusto in minus voluptatem. </p><p>Et esse sunt qui enim doloribus At neque tenetur non ipsum nostrum in quia sint! Et sequi placeat ut repellendus sint sit quisquam nihil qui porro ullam qui iure dolor aut consequuntur minus est quaerat eligendi! Quo soluta laudantium aut sunt esse sit expedita suscipit in sequi eaque sed laboriosam molestiae non omnis voluptate. `,
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
    <div className="flex">
      {/* Sticky Sidebar */}
      <Sidebar books={books} />

      {/* Book Cover Display */}
      <div className="flex-1 max-w-screen-lg mx-auto p-8 flex flex-col gap-8 mt-20">
        {books.map((book, index) => (
          <div
            key={index}
            ref={bookRefs[index]}
            className="flex items-center gap-8 flex-wrap"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={book.coverImg}
                alt={`Book ${index + 1}`}
                width={300}
                height={450}
                className="shadow-lg"
              />
            </motion.div>
            <p className="text-lg text-left p-6 flex-1 min-w-[300px]">{book.descriptionTxt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
