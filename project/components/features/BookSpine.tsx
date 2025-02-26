import Link from "next/link";
interface BookSpineProps {
  spineImg: string;
  coverImg: string;
  descriptionTxt: string;
}

export default function BookSpine({ spineImg, coverImg, descriptionTxt }: BookSpineProps) {
  return (
    <div>
      <Link
        href={{
          pathname: "/book-cover",
          query: { coverImg, descriptionTxt },
        }}
      >
        <img src={spineImg} alt="Book Spine" />
      </Link>
    </div>
  );
}
