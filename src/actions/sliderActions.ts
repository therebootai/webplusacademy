"use server";

import { connectToDataBase } from "@/db/connection";
import Sliders from "@/models/Sliders";
import { deleteFile, uploadFile } from "@/util/cloudinary";
import { generateCustomId } from "@/util/generateCustomId";
import { parseImage } from "@/util/parseImage";
import mongoose from "mongoose";

export async function createComponent(name: string, component_image: File) {
  try {
    if (!name || !component_image) {
      return { success: false, message: "All fields required" };
    }

    await connectToDataBase();

    let uploadedFile = component_image;

    const tempFilePath = await parseImage(component_image);

    const [fileUploadResult, componentId] = await Promise.all([
      uploadFile(tempFilePath, component_image.type),
      generateCustomId(Sliders, "componentId", "componentId"),
    ]);

    if (fileUploadResult instanceof Error) {
      return { success: false, message: "Image Upload failed" };
    }

    const newComponent = new Sliders({
      componentId,
      name,
      slider_image: {
        secure_url: fileUploadResult.secure_url,
        public_id: fileUploadResult.public_id,
      },
    });

    const savedComponent = await newComponent.save();

    const plainComponent = savedComponent.toObject();

    return { success: true, data: JSON.parse(JSON.stringify(plainComponent)) };
  } catch (error) {
    console.error("Error creating Component details:", error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteComponent(sliderId: string) {
  try {
    const deletedSlider = await Sliders.findOne({
      $or: [
        { componentId: sliderId },
        {
          _id: mongoose.Types.ObjectId.isValid(sliderId) ? sliderId : undefined,
        },
      ],
    });

    if (!deletedSlider) {
      return { success: false, message: "Slider not found" };
    }

    await deleteFile(deletedSlider.slider_image.public_id);
    await Sliders.findByIdAndDelete(deletedSlider._id);
    return { success: true, message: "Slider deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function getAllSliders(){
  try {
    
  } catch (error) {
    console.log(error)
    return {success:false, data:[]}
  }
}