import Image from "next/image";

export default function ProjectArt({ screenshot }) {
  return (
    <Image
      className="art"
      src={screenshot}
      width={800}
      height={600}
      sizes="(max-width: 700px) 100vw, 45vw"
      alt=""
    >
    </Image>
  );
}
