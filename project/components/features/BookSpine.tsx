import Link from "next/link";

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
      >
        <img src={spineImg} alt="Book Spine" className="w-full" />
      </Link>
    </div>
  );
}
