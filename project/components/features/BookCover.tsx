"use client"; // Needed in App Router when using hooks

import { useSearchParams } from "next/navigation";

export default function BookCover() {
  const searchParams = useSearchParams();
  const coverImg = searchParams.get("coverImg");
  const descriptionTxt = searchParams.get("descriptionTxt");

  return (
    <div>
      {coverImg && <img src={coverImg} alt="Book Cover" />}
      {descriptionTxt && <p>{descriptionTxt}</p>}
    </div>
  );
}
