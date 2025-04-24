"use client";

import { createComponent } from "@/actions/sliderActions";
import { UploadedFile } from "@/types/ImageFileTypes";
import { useActionState } from "react";

export default function AddNewSlider() {
  async function addNewSlider(prevState: unknown, formData: FormData) {
    try {
      const name = formData.get("name") as string;
      const slider_image = formData.get("component_image") as File;

      if (!name || !slider_image) {
        return {
          success: false,
          data: null,
          message: "All fields are required",
        };
      }

      const slider = await createComponent(name, slider_image);
      console.log(slider);
      return slider;
    } catch (error) {
      console.log(error);
    }
  }

  const [, formActions, isPending] = useActionState(addNewSlider, null);
  return (
    <form className="flex gap-2 items-center" action={formActions}>
      <input
        type="text"
        pattern="^\S+$"
        required
        placeholder={`SliderName`}
        name="name"
        className="px-2 h-[3rem] border border-custom-gray-border outline-none placeholder:text-site-gray rounded-md flex-1 capitalize placeholder:capitalize"
      />
      <div className="relative flex-1 h-[3rem] border border-custom-gray-border rounded-md truncate">
        <label
          htmlFor="file-input"
          className="absolute capitalize top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer truncate"
        >
          Choose Slider Image
        </label>
        <input
          id="file-input"
          type="file"
          name="component_image"
          accept="image/*"
          required
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer truncate"
        />
      </div>
      <button
        className="h-[3rem] flex justify-center items-center flex-1 bg-site-yellow text-base font-medium text-white rounded-md"
        type="submit"
      >
        {isPending ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
