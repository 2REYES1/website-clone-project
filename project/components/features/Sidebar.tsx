"use client";

import Image from "next/image";
import Link from "next/link";

function Sidebar({ books }: { books: { coverImg: string; descriptionTxt: string }[] }) {
  return (
    <div className="fixed top-0 left-0 w-[100px] h-full bg-white shadow-md flex flex-col items-center p-4">
      {/* Logo */}
      <Image src="/assets/logo.jpg" alt="Logo" width={40} height={40} />

      {/* Navigation Tabs */}
      <div className="mt-6 flex flex-col gap-4">
        {books.map((book, index) => (
          <Link
            key={index}
            href={{
              pathname: "/book-cover",
              query: { coverImg: book.coverImg, descriptionTxt: book.descriptionTxt },
            }}
          >
            <button className="text-xs cursor-pointer hover:font-bold">-----</button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
