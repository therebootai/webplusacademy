"use client";

import { deleteGallery, updateGallery } from "@/actions/galleryActions";
import { GalleryDocument } from "@/models/Gallery";
import AdminCard from "@/ui/AdminCard";

export default function MediaList({
  Media,
  videoOnly = false,
}: {
  Media: GalleryDocument[];
  videoOnly?: boolean;
}) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Media.map((slider: GalleryDocument) => (
        <AdminCard
          img={videoOnly ? slider.video : slider.image.secure_url}
          name={slider.name}
          key={slider.galleryId}
          status={slider.status}
          deleteCard={() => deleteGallery(slider._id as string)}
          video={videoOnly}
          changeStatus={() =>
            updateGallery(slider._id as string, undefined, !slider.status)
          }
        />
      ))}
    </div>
  );
}
