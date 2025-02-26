import { useRouter } from "next/router";

export default function BookCover() {
  const router = useRouter();
  const { coverImg, descriptionTxt } = router.query;

  return (
    <div>
      {coverImg && <img src={coverImg as string} alt="Book Cover" />}
      {descriptionTxt && <p>{descriptionTxt}</p>}
    </div>
  );
}
