import BookSpine from "./BookSpine";

interface BookProps {
  spineImg: string;
  coverImg: string;
  descriptionTxt: string;
}

export default function Book({ spineImg, coverImg, descriptionTxt }: BookProps) {
  return (
    <div style={{ width: "40vw", height: "auto" }}>
      <BookSpine spineImg={spineImg} coverImg={coverImg} descriptionTxt={descriptionTxt} />
    </div>
  );
}
