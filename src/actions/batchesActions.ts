"use server";
import "@/models/Students";
import "@/models/Batches";
import "@/models/Courses";

import { connectToDataBase } from "@/db/connection";
import Batches, { BatchesDocument } from "@/models/Batches";
import Courses, { CourseDocument } from "@/models/Courses";

import mongoose from "mongoose";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

export async function createNewBatch({
  batch_name,
  course,
  year,
  start_date,
  end_date,
}: {
  batch_name: string;
  course: string;
  year: string;
  start_date?: Date;
  end_date?: Date;
}) {
  try {
    await connectToDataBase();
    const newBatch = new Batches({
      batch_name,
      course,
      year,
      start_date,
      end_date,
    });

    const savedBatch = await newBatch.save();

    await Courses.findByIdAndUpdate(course, {
      $push: { batches: savedBatch._id },
    });

    revalidatePath("/admin/student-management/batches");
    return {
      success: true,
      message: "Batch created successfully",
      data: JSON.parse(JSON.stringify(savedBatch.toObject())),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to create batch",
    };
  }
}

export async function getAllBatches({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "desc",
  status,
  year,
  course,
}: {
  page?: number | string;
  limit?: number | string;
  sort?: string;
  order?: "asc" | "desc";
  status?: boolean;
  year?: string;
  course?: string;
}) {
  try {
    let filter: { status?: boolean; year?: string; course?: string } = {};

    if (status !== undefined) filter.status = status;

    if (year !== undefined) filter.year = year;

    if (course !== undefined) filter.course = course;

    // Pagination
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

    await connectToDataBase();

    // Fetch components with filters, pagination, and sorting
    const allBatches = await Batches.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .populate("course")
      .lean<BatchesDocument[]>();

    // Get total count for pagination metadata
    const totalBatches = await Batches.countDocuments(filter);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allBatches)),
      pagination: {
        totalCount: totalBatches,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalBatches / pageSize),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}

export async function deleteaBatch(batch_id: string) {
  try {
    await connectToDataBase();
    const deletedBatch = await Batches.findOneAndDelete({
      $or: [
        { batch_id },
        {
          _id: mongoose.Types.ObjectId.isValid(batch_id) ? batch_id : undefined,
        },
      ],
    });

    if (!deletedBatch) {
      return { success: false, message: "Batch not found" };
    }

    revalidatePath("/admin/student-management/batches");
    return {
      success: true,
      message: "Batch deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to create batch",
    };
  }
}

export async function updateaBatch(
  batch_id: string,
  updatedData: {
    batch_name?: string;
    start_date?: Date;
    end_date?: Date;
    status?: boolean;
    year?: string;
    course?: string | Types.ObjectId | CourseDocument;
  }
) {
  try {
    await connectToDataBase();
    const updatedBatch = await Batches.findOne({
      $or: [
        { batch_id },
        {
          _id: mongoose.Types.ObjectId.isValid(batch_id) ? batch_id : undefined,
        },
      ],
    });

    if (!updatedBatch) {
      return {
        success: false,
        message: "Batch not found",
      };
    }

    updatedBatch.batch_name = updatedData.batch_name ?? updatedBatch.batch_name;
    updatedBatch.year = updatedData.year ?? updatedBatch.year;
    updatedBatch.start_date = updatedData.start_date ?? updatedBatch.start_date;
    updatedBatch.end_date = updatedData.end_date ?? updatedBatch.end_date;
    updatedBatch.status = updatedData.status ?? updatedBatch.status;
    if (updatedData.course) {
      updatedBatch.course =
        typeof updatedData.course === "string"
          ? new mongoose.Types.ObjectId(updatedData.course)
          : updatedData.course;
    }

    await updatedBatch.save();

    revalidatePath("/admin/student-management/batches");

    return {
      success: true,
      message: "Batch updated successfully",
      data: JSON.parse(JSON.stringify(updatedBatch.toObject())),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to update batch",
    };
  }
}

export async function searchBatches(search: string) {
  try {
    await connectToDataBase();
    const allBatches = await Batches.find({
      batch_name: { $regex: search, $options: "i" },
    })
      .limit(100)
      .lean<BatchesDocument[]>();
    return {
      success: true,
      message: "Batches fetched successfully",
      data: JSON.parse(JSON.stringify(allBatches)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
}
