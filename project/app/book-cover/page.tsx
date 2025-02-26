import Image from "next/image";

export default function BookCover({ searchParams }: { searchParams: { coverImg: string; descriptionTxt: string } }) {
  return (
    <div>
      {searchParams.coverImg && <Image src={searchParams.coverImg} alt="Book Cover" width={200} height={300} />}
      {searchParams.descriptionTxt && <p>{searchParams.descriptionTxt}</p>}
    </div>
  );
}
