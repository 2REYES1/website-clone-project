"use client";

// import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BookSpineProps {
  spineImg: string;
  coverImg: string;
  descriptionTxt: string;
  title: string;
}

export default function BookSpine({ spineImg, coverImg, descriptionTxt, title }: BookSpineProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/book-cover?coverImg=${coverImg}&descriptionTxt=${descriptionTxt}&title=${title}`);
  };

  return (
    <div className="transition-transform duration-300 hover:scale-110" onClick={handleClick}>
      <Image src={spineImg} alt="Book Spine" width="500" height="200" className="w-full cursor-pointer" />
    </div>
  );
}
