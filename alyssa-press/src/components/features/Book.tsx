import BookSpine from "./BookSpine";

interface BookProps {
  spineImg: string;
  coverImg: string;
  descriptionTxt: string;
}

export default function Book({ spineImg, coverImg, descriptionTxt }: BookProps) {
  return (
    <div
      className="flex justify-center items-center"
      style={{ width: "40vw", height: "auto", margin: "0 auto" }}
    >
      <BookSpine spineImg={spineImg} coverImg={coverImg} descriptionTxt={descriptionTxt} />
    </div>
  );
}
