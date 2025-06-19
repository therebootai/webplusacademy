"use server";

import { connectToDataBase } from "@/db/connection";
import Notice, { NoticeDocument } from "@/models/Notice";
import { deleteFile, uploadFile } from "@/util/cloudinary";
import { generateCustomId } from "@/util/generateCustomId";
import { parseImage } from "@/util/parseImage";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function createNewNotice(name: string, image?: File) {
  try {
    if (!name) {
      return { success: false, message: "All fields required" };
    }

    await connectToDataBase();

    const noticeId = await generateCustomId(Notice, "noticeId", "noticeId");

    let fileUploadResult = null;

    if (image && image.size > 0) {
      const tempFilePath = await parseImage(image);
      fileUploadResult = await uploadFile(tempFilePath, image.type);
    }

    if (fileUploadResult instanceof Error) {
      return { success: false, message: "Image Upload failed" };
    }

    const newNotice = new Notice({
      noticeId,
      title: name,
      notice_file: fileUploadResult
        ? {
            secure_url: fileUploadResult.secure_url,
            public_id: fileUploadResult.public_id,
          }
        : null,
    });

    const savedNotice = await newNotice.save();

    const plainNotice = savedNotice.toObject();

    revalidatePath("/admin/notices");

    return { success: true, data: JSON.parse(JSON.stringify(plainNotice)) };
  } catch (error) {
    console.error("Error creating Notice details:", error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteNotice(noticeId: string) {
  try {
    await connectToDataBase();
    const deletedNotice = await Notice.findOne({
      $or: [
        { noticeId: noticeId },
        {
          _id: mongoose.Types.ObjectId.isValid(noticeId) ? noticeId : undefined,
        },
      ],
    });

    if (!deletedNotice) {
      return { success: false, message: "Notice not found" };
    }

    if (deletedNotice.notice_file?.public_id) {
      await deleteFile(deletedNotice.notice_file.public_id);
    }

    await Notice.findByIdAndDelete(deletedNotice._id);

    revalidatePath("/admin/notices");
    return { success: true, message: "Notice deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function getAllNotices({
  page,
  limit = 10,
  sort = "createdAt",
  order = "desc",
  status,
}: {
  page?: number | string;
  limit?: number | string;
  sort?: string;
  order?: "asc" | "desc";
  status?: boolean;
}) {
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
    const allNotices = await Notice.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .lean<NoticeDocument[]>();

    // Get total count for pagination metadata
    const totalNotices = await Notice.countDocuments(filter);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allNotices)),
      pagination: {
        totalCount: totalNotices,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalNotices / pageSize),
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

export async function updateNotice(noticeId: string, status?: boolean) {
  try {
    await connectToDataBase();
    const updatedNotice = await Notice.findOne({
      $or: [
        { noticeId: noticeId },
        {
          _id: mongoose.Types.ObjectId.isValid(noticeId) ? noticeId : undefined,
        },
      ],
    });

    if (!updatedNotice) {
      return { success: false, message: "Result not found", data: null };
    }

    updatedNotice.status = status ?? updatedNotice.status;

    const savedNotice = await updatedNotice.save();

    revalidatePath("/admin/notices");

    const plainNotice = savedNotice.toObject();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(plainNotice)),
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", data: {} };
  }
}
