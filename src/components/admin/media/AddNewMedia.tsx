"use client";

import { addNewGallery } from "@/actions/galleryActions";
import { useActionState, useState } from "react";

export default function AddNewMedia() {
  const [type, setType] = useState<string>("image");
  async function addNewMedia(prevState: unknown, formData: FormData) {
    try {
      const name = formData.get("name") as string;
      const image = formData.get("image") as File;
      const type = formData.get("type") as string;
      const video = formData.get("video") as string;

      if (!name || !type) {
        return {
          success: false,
          data: null,
          message: "All fields are required",
        };
      }

      const media = await addNewGallery(name, image, type, video);
      return media;
    } catch (error) {
      console.log(error);
    }
  }

  const [, formActions, isPending] = useActionState(addNewMedia, null);
  return (
    <form className="flex gap-2 items-center" action={formActions}>
      <select
        name="type"
        defaultValue="image"
        onChange={(e) => setType(e.target.value)}
        className="px-2 h-[3rem] border border-[#cccccc] outline-none placeholder:text-site-gray rounded-md flex-1 capitalize placeholder:capitalize"
      >
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      <input
        type="text"
        required
        placeholder={`Media Name`}
        name="name"
        className="px-2 h-[3rem] border border-[#cccccc] outline-none placeholder:text-site-gray rounded-md flex-1 capitalize placeholder:capitalize"
      />
      {type === "image" && (
        <div className="relative flex-1 h-[3rem] border border-[#cccccc] rounded-md truncate">
          <label
            htmlFor="file-input"
            className="absolute capitalize top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer truncate"
          >
            Choose Media Image
          </label>
          <input
            id="file-input"
            type="file"
            name="image"
            accept="image/*"
            required
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer truncate"
          />
        </div>
      )}
      {type === "video" && (
        <input
          type="url"
          pattern="^\S+$"
          required
          placeholder={`Video URL`}
          name="video"
          className="px-2 h-[3rem] border border-[#cccccc] outline-none placeholder:text-site-gray rounded-md flex-1 capitalize placeholder:capitalize"
        />
      )}
      <button
        className="h-[3rem] flex justify-center items-center flex-1 bg-site-yellow text-base font-medium text-white rounded-md"
        type="submit"
      >
        {isPending ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
