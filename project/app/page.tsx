import Book from "@/components/features/Book";
import Image from "next/image";

function Header() {
  return (
    <div className="relative flex items-center p-4 bg-white shadow-md">
      {/* Sticky Logo */}
      <div className="fixed top-0 left-0 p-4 bg-white">
        <Image src="/assets/logo.jpg" alt="Logo" width={50} height={50} />
      </div>

      {/* Normal Scrolling Text (With Left Padding to Avoid Overlap) */}
      <div className="pl-[70px]">
        <p className="text-2xl font-bold">Alyssa Press</p>
      </div>
    </div>
  );
}


export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto p-8 text-center">
      <Header />

      <div className="flex flex-col items-center gap-8 mt-20 mb-12">
        <Book 
          spineImg="/assets/book-spine.png"
          coverImg="/assets/book-spine.png"
          descriptionTxt="Hello World"
        />
        <Book 
          spineImg="/assets/book-spine.png"
          coverImg="/assets/book-spine.png"
          descriptionTxt="Hello World"
        />
        <Book 
          spineImg="/assets/book-spine.png"
          coverImg="/assets/book-spine.png"
          descriptionTxt="Hello World"
        />
        <Book 
          spineImg="/assets/book-spine.png"
          coverImg="/assets/book-spine.png"
          descriptionTxt="Hello World"
        />
        <Book 
          spineImg="/assets/book-spine.png"
          coverImg="/assets/book-spine.png"
          descriptionTxt="Hello World"
        />
      </div>
    </div>
  );
}
