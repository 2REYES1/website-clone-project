"use client";

import Link from "next/link";
import Image from "next/image";

interface BookSpineProps {
  spineImg: string;
  coverImg: string;
  descriptionTxt: string;
}

export default function BookSpine({ spineImg, coverImg, descriptionTxt }: BookSpineProps) {
  return (
    <div className="transition-transform duration-300 hover:scale-110">
      <Link
        href={{
          pathname: "/book-cover",
          query: { coverImg, descriptionTxt },
        }}
        scroll={false} // Prevents automatic scrolling
      >
        <Image src={spineImg} alt="Book Spine" width={50} height={200} className="w-full cursor-pointer" />
      </Link>
    </div>
  );
}
