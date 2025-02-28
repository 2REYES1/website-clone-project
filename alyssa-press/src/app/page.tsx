"use client";

import Sidebar from "@/components/features/Sidebar";
import Book from "@/components/features/Book";

export default function Home() {
  const books = Array.from({ length: 10 }, (_, index) => ({
    spineImg: `/assets/book-spine-${index + 1}.png`,
    coverImg: `/assets/book-cover-${index + 1}.png`,
    title: `Book ${index + 1}`,
    descriptionTxt: `Book ${index + 1}`,
  }));

  return (
    <main className="flex min-h-screen w-full" style={{ marginTop: '150px', marginBottom: '150px' }}>
      {/* Sticky Sidebar */}
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar books={books} />
      </div>
      {/* Content */}
      <div className="flex-1 flex justify-center">
        <div className="max-w-screen-lg w-full p-8">
          <div className="flex flex-col items-center gap-8 mt-20 mb-12">
            {books.map((book, index) => (
              <div key={index}>
                <Book spineImg={book.spineImg} coverImg={book.coverImg} descriptionTxt={book.descriptionTxt} title={book.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
