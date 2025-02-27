"use client";

import Sidebar from "@/components/features/Sidebar";
import Book from "@/components/features/Book";

export default function Home() {
  const books = Array.from({ length: 5 }, (_, index) => ({
    coverImg: `/assets/book-${index + 1}.png`,
    descriptionTxt: `Book ${index + 1}`,
  }));

  return (
    <div className="flex">
      {/* Sticky Sidebar */}
      <Sidebar books={books} />

      {/* Content */}
      <div className="flex-1 max-w-screen-lg mx-auto p-8">
        <div className="flex flex-col items-center gap-8 mt-20 mb-12">
          {books.map((book, index) => (
            <div key={index}>
              <Book spineImg="/assets/book-spine.png" coverImg={book.coverImg} descriptionTxt={book.descriptionTxt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
