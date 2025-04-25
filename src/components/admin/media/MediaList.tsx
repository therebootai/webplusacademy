"use client";

import { updateGallery } from "@/actions/galleryActions";
import { deleteComponent } from "@/actions/sliderActions";
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
    <div className="grid grid-cols-4">
      {Media.map((slider: any) => (
        <AdminCard
          img={videoOnly ? slider.video : slider.image.secure_url}
          name={slider.name}
          key={slider.galleryId}
          status={slider.status}
          deleteCard={() => deleteComponent(slider._id)}
          video={videoOnly}
          changeStatus={() =>
            updateGallery(slider._id as string, undefined, !slider.status)
          }
        />
      ))}
    </div>
  );
}
