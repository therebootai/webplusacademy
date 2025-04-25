"use client";
import { GalleryDocument } from "@/models/Gallery";
import Image from "next/image";
import ReactPlayer from "react-player";

export default function GalleryList({
  data,
  type,
}: {
  data: GalleryDocument[];
  type: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:px-16 lg:px-8 px-4">
      {data.map((item: GalleryDocument) => (
        <div key={item._id as string}>
          {type === "video" ? (
            <ReactPlayer width={"100%"} url={item.video} />
          ) : (
            <Image
              src={item.image.secure_url}
              alt={item.name}
              width={416}
              height={416}
              className="aspect-square object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
