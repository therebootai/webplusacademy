"use server";

import { connectToDataBase } from "@/db/connection";
import Result, { ResultDocument } from "@/models/Results";
import { deleteFile, uploadFile } from "@/util/cloudinary";
import { generateCustomId } from "@/util/generateCustomId";
import { parseImage } from "@/util/parseImage";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function addNewResult(
  classFor: string,
  result_file: File,
  year: string
) {
  try {
    if (!classFor || !year || !result_file) {
      return { success: false, message: "All fields required" };
    }

    await connectToDataBase();

    const resultId = await generateCustomId(Result, "resultId", "resultId");

    let fileUploadResult = null;
    const tempFilePath = await parseImage(result_file);
    fileUploadResult = await uploadFile(tempFilePath, result_file.type);

    if (fileUploadResult instanceof Error) {
      return { success: false, message: "Image Upload failed" };
    }

    const newResult = new Result({
      resultId,
      classFor,
      result_file: fileUploadResult
        ? {
            secure_url: fileUploadResult.secure_url,
            public_id: fileUploadResult.public_id,
          }
        : null,
      year,
    });

    const savedResult = await newResult.save();

    const plainResult = savedResult.toObject();

    revalidatePath("/admin/result");

    return { success: true, data: JSON.parse(JSON.stringify(plainResult)) };
  } catch (error) {
    console.error("Error creating Result details:", error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteResult(resultId: string) {
  try {
    await connectToDataBase();
    const deletedResult = await Result.findOne({
      $or: [
        { resultId: resultId },
        {
          _id: mongoose.Types.ObjectId.isValid(resultId) ? resultId : undefined,
        },
      ],
    });

    if (!deletedResult) {
      return { success: false, message: "Result not found" };
    }

    await deleteFile(deletedResult.result_file.public_id);

    await Result.findByIdAndDelete(deletedResult._id);

    revalidatePath("/admin/result");
    return { success: true, message: "Result deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function getAllResults(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
  status?: boolean,
  year?: string
) {
  try {
    let filter: { status?: boolean; year?: string } = {};

    if (status !== undefined) filter.status = status;

    if (year !== undefined) filter.year = year;

    // Pagination
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

    await connectToDataBase();

    // Fetch components with filters, pagination, and sorting
    const allResults = await Result.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .lean<ResultDocument[]>();

    // Get total count for pagination metadata
    const totalResults = await Result.countDocuments(filter);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allResults)),
      pagination: {
        totalCount: totalResults,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalResults / pageSize),
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

export async function updateResult(
  resultId: string,
  year?: string,
  status?: boolean
) {
  try {
    await connectToDataBase();
    const updatedResult = await Result.findOne({
      $or: [
        { resultId: resultId },
        {
          _id: mongoose.Types.ObjectId.isValid(resultId) ? resultId : undefined,
        },
      ],
    });

    if (!updatedResult) {
      return { success: false, message: "Result not found", data: null };
    }

    updatedResult.year = year ?? updatedResult.year;
    updatedResult.status = status ?? updatedResult.status;

    const savedResult = await updatedResult.save();

    revalidatePath("/admin/result");

    const plainResult = savedResult.toObject();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(plainResult)),
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", data: {} };
  }
}
