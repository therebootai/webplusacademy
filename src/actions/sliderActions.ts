"use server";

import { connectToDataBase } from "@/db/connection";
import Sliders, { Component } from "@/models/Sliders";
import { deleteFile, uploadFile } from "@/util/cloudinary";
import { generateCustomId } from "@/util/generateCustomId";
import { parseImage } from "@/util/parseImage";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function createComponent(name: string, component_image: File) {
  try {
    if (!name || !component_image) {
      return { success: false, message: "All fields required" };
    }

    await connectToDataBase();

    const latestRecord = await Sliders.findOne({}, { componentId: 1 })
      .sort({ componentId: -1 })
      .lean();

    let lastNumber = latestRecord
      ? parseInt(
          (latestRecord.componentId as string).replace("componentId-", ""),
          10
        )
      : 0;

    const newComponentId = await generateCustomId(
      Sliders,
      "componentId",
      "componentId-",
      ++lastNumber
    );

    if (!newComponentId) {
      throw new Error("Failed to generate component ID");
    }

    const componentId = newComponentId;

    const tempFilePath = await parseImage(component_image);

    const [fileUploadResult] = await Promise.all([
      uploadFile(tempFilePath, component_image.type),
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

    revalidatePath("/admin");

    return { success: true, data: JSON.parse(JSON.stringify(plainComponent)) };
  } catch (error) {
    console.error("Error creating Component details:", error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteComponent(sliderId: string) {
  try {
    await connectToDataBase();
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
    revalidatePath("/admin");
    return { success: true, message: "Slider deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function getAllSliders(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
  status?: boolean
) {
  try {
    let filter: { status?: boolean } = {};

    if (status !== undefined) filter.status = status;

    // Pagination
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

    await connectToDataBase();

    // Fetch components with filters, pagination, and sorting
    const allSliders = await Sliders.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .lean<Component[]>();

    // Get total count for pagination metadata
    const totalSliders = await Sliders.countDocuments(filter);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allSliders)),
      pagination: {
        totalCount: totalSliders,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalSliders / pageSize),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      pagination: { totalCount: 0, currentPage: 1, limit: 10, totalPages: 0 },
    };
  }
}

export async function updateSlider(
  sliderId: string,
  name?: string,
  status?: boolean
) {
  try {
    await connectToDataBase();
    const updatedSlider = await Sliders.findOne({
      $or: [
        { sliderId: sliderId },
        {
          _id: mongoose.Types.ObjectId.isValid(sliderId) ? sliderId : undefined,
        },
      ],
    });

    if (!updatedSlider) {
      return { success: false, message: "Result not found", data: null };
    }

    updatedSlider.name = name ?? updatedSlider.name;
    updatedSlider.status = status ?? updatedSlider.status;

    const savedSlider = await updatedSlider.save();

    revalidatePath("/admin");

    const plainSlider = savedSlider.toObject();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(plainSlider)),
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", data: {} };
  }
}
