"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ThreeDBook } from 'ui-library';

interface Book {
  spineImg: string;
  coverImg: string;
  descriptionTxt: string;
}

interface SidebarProps {
  books: Book[];
}

export default function Sidebar({ books }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isBookCoverPage = pathname === "/book-cover";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full w-[200px] bg-transparent" style={{ paddingLeft: '20px' }}>
      {/* Sticky Logo */}
      <div className="sticky top-8 z-20 flex mb-8">
        <Link href="/">
          <div className="w-[100px] h-[100px] relative cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <ThreeDBook scale={25} />
            </div>
          </div>
        </Link>
      </div>
      
      {/* Navigation items - hidden on mobile, centered vertically */}
      <div className="hidden sm:flex flex-col flex-1 justify-center">
        {/* Back Arrow and Navigation Container */}
        <div className="flex flex-col gap-8">
          {isBookCoverPage && (
            <motion.button
              onClick={() => router.push('/')}
              className="flex items-center p-4 pl-0"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#617D51"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </motion.button>
          )}

          {/* Book navigation tabs */}
          <motion.div 
            className="flex flex-col items-start gap-1.5 py-8 overflow-y-auto scrollbar-hide"
            animate={{ 
              width: hoveredIndex !== null ? "180px" : "100px"
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 0.5
            }}
          >
            <div className="w-full flex flex-col items-start gap-1.5">
              {books.map((book, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    onClick={() => router.push(`/book-cover?coverImg=${book.coverImg}`)}
                    className="h-[12px] bg-[#617D51] rounded-sm cursor-pointer"
                    animate={{ 
                      width: hoveredIndex === null ? "50px" : 
                             hoveredIndex === index ? "100px" : "70px"
                    }}
                    whileHover={{ 
                      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }}
                    role="button"
                    aria-label={`Navigate to book ${index + 1}`}
                  />
                  <motion.span
                    className="text-sm text-[#617D51] whitespace-nowrap"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      x: hoveredIndex === index ? 0 : -10
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Book {index + 1}
                  </motion.span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx-global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
