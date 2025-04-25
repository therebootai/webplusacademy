"use server";
import { connectToDataBase } from "@/db/connection";
import Gallery, { GalleryDocument } from "@/models/Gallery";
import { deleteFile, uploadFile } from "@/util/cloudinary";
import { generateCustomId } from "@/util/generateCustomId";
import { parseImage } from "@/util/parseImage";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function addNewGallery(
  name: string,
  image: File,
  type: string,
  video: string
) {
  try {
    if (!name || !type) {
      return { success: false, message: "All fields required" };
    }

    if (type === "video" && !video) {
      return { success: false, message: "Video Path required" };
    }

    if (type === "image" && !image) {
      return { success: false, message: "Image required" };
    }

    await connectToDataBase();

    const galleryId = await generateCustomId(Gallery, "galleryId", "galleryId");

    let fileUploadResult = null;

    if (type === "image") {
      const tempFilePath = await parseImage(image);
      fileUploadResult = await uploadFile(tempFilePath, image.type);
    }

    if (fileUploadResult instanceof Error) {
      return { success: false, message: "Image Upload failed" };
    }

    const newGallery = new Gallery({
      galleryId,
      name,
      image: fileUploadResult
        ? {
            secure_url: fileUploadResult.secure_url,
            public_id: fileUploadResult.public_id,
          }
        : null,
      type,
      video: video ? video : "",
    });

    const savedGallery = await newGallery.save();

    const plainGallery = savedGallery.toObject();

    revalidatePath("/admin/media");

    return { success: true, data: JSON.parse(JSON.stringify(plainGallery)) };
  } catch (error) {
    console.error("Error creating Gallery details:", error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteGallery(galleryId: string) {
  try {
    await connectToDataBase();
    const deletedGallery = await Gallery.findOne({
      $or: [
        { componentId: galleryId },
        {
          _id: mongoose.Types.ObjectId.isValid(galleryId)
            ? galleryId
            : undefined,
        },
      ],
    });

    if (!deletedGallery) {
      return { success: false, message: "Gallery not found" };
    }

    if (deletedGallery.type === "image") {
      await deleteFile(deletedGallery.image.public_id);
    }

    await Gallery.findByIdAndDelete(deletedGallery._id);

    revalidatePath("/admin/media");
    return { success: true, message: "Gallery deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function getAllGalleries(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
  status?: boolean,
  type?: string
) {
  try {
    let filter: { status?: boolean; type?: string } = {};

    if (status !== undefined) filter.status = status;

    if (type !== undefined) filter.type = type;

    // Pagination
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

    await connectToDataBase();

    // Fetch components with filters, pagination, and sorting
    const allSliders = await Gallery.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .lean<GalleryDocument[]>();

    // Get total count for pagination metadata
    const totalGalleries = await Gallery.countDocuments(filter);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allSliders)),
      pagination: {
        totalCount: totalGalleries,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalGalleries / pageSize),
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

export async function updateGallery(
  galleryId: string,
  name?: string,
  status?: boolean
) {
  try {
    await connectToDataBase();
    const updatedGallery = await Gallery.findOne({
      $or: [
        { galleryId: galleryId },
        {
          _id: mongoose.Types.ObjectId.isValid(galleryId)
            ? galleryId
            : undefined,
        },
      ],
    });

    if (!updatedGallery) {
      return { success: false, message: "Result not found", data: null };
    }

    updatedGallery.name = name ?? updatedGallery.name;
    updatedGallery.status = status ?? updatedGallery.status;

    const savedGallery = await updatedGallery.save();

    revalidatePath("/admin/media");

    const plainGallery = savedGallery.toObject();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(plainGallery)),
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", data: {} };
  }
}
