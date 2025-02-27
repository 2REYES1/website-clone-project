"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function Sidebar({ books }: { books: { coverImg: string; descriptionTxt: string }[] }) {
  const pathname = usePathname();
  const isBookCoverPage = pathname === "/book-cover";

  return (
    <div className="fixed top-0 left-0 w-[100px] h-full bg-white shadow-md flex flex-col items-center p-4">
      {/* Logo */}
      <Image src="/assets/logo.jpg" alt="Logo" width={40} height={40} />

      {/* Back Arrow (only on book cover page) */}
      {isBookCoverPage && (
        <Link href="/">
          <button className="mt-4 text-lg font-bold hover:scale-110 transition-transform">⬅</button>
        </Link>
      )}

      {/* Navigation Tabs */}
      <div className="mt-6 flex flex-col justify-center items-center gap-4 flex-grow">
        {books.map((book, index) => (
          <Link
            key={index}
            href={{
              pathname: "/book-cover",
              query: { coverImg: book.coverImg, descriptionTxt: book.descriptionTxt },
            }}
          >
            <motion.button
              className="text-xs cursor-pointer hover:font-bold"
              whileHover={{ scale: 1.2 }} // Zoom in on hover
              transition={{ duration: 0.3 }} // Duration of the zoom effect
            >
              -----
            </motion.button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
