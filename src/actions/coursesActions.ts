"use server";
import "@/models/Students";
import "@/models/Batches";
import "@/models/Courses";

import { connectToDataBase } from "@/db/connection";
import Courses, { CourseDocument } from "@/models/Courses";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function createNewCourse({
  course_name,
  course_class,
}: {
  course_name: string;
  course_class: string;
}) {
  try {
    await connectToDataBase();
    const newCourse = new Courses({
      course_name,
      course_class,
    });

    const savedCourse = await newCourse.save();
    revalidatePath("/admin/courses");
    return {
      success: true,
      message: "Course created successfully",
      data: JSON.parse(JSON.stringify(savedCourse.toObject())),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
}

export async function getAllCourses({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "desc",
  status,
  batches,
}: {
  page?: number | string;
  limit?: number | string;
  sort?: string;
  order?: "asc" | "desc";
  status?: boolean;
  batches?: string;
}) {
  try {
    let filter: {
      status?: boolean;
      batches?: {
        $in: string[] | string;
      };
    } = {};

    if (status !== undefined) filter.status = status;

    if (batches !== undefined) filter.batches = { $in: batches };
    // Pagination
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

    await connectToDataBase();

    const allCourses = await Courses.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .populate("batches")
      .lean<CourseDocument[]>();

    const totalCourses = await Courses.countDocuments(filter);

    return {
      success: true,
      message: "Courses fetched successfully",
      data: JSON.parse(JSON.stringify(allCourses)),
      pagination: {
        totalCount: totalCourses,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalCourses / pageSize),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
      data: [],
      pagination: { totalCount: 0, currentPage: 1, limit: 10, totalPages: 0 },
    };
  }
}

export async function searchCourses(search: string) {
  try {
    await connectToDataBase();
    const allCourses = await Courses.find({
      course_name: { $regex: search, $options: "i" },
    })
      .limit(100)
      .lean<CourseDocument[]>();
    return {
      success: true,
      message: "Courses fetched successfully",
      data: JSON.parse(JSON.stringify(allCourses)),
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

export async function deleteaCourse(courseId: string) {
  try {
    await connectToDataBase();
    await Courses.findByIdAndDelete({
      $or: [
        { course_id: courseId },
        {
          _id: mongoose.Types.ObjectId.isValid(courseId) ? courseId : undefined,
        },
      ],
    });
    revalidatePath("/admin/courses");
    return { success: true, message: "Course deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function updateaCourse(
  courseId: string,
  data: {
    course_name?: string;
    status?: boolean;
    batches?: string | string[];
    course_class?: string;
  }
) {
  try {
    await connectToDataBase();
    const updatedCourse = await Courses.findOne({
      $or: [
        { course_id: courseId },
        {
          _id: mongoose.Types.ObjectId.isValid(courseId) ? courseId : undefined,
        },
      ],
    });

    if (!updatedCourse) {
      return { success: false, message: "Course not found" };
    }

    updatedCourse.course_name = data.course_name ?? updatedCourse.course_name;
    updatedCourse.status = data.status ?? updatedCourse.status;
    updatedCourse.course_class =
      data.course_class ?? updatedCourse.course_class;

    if (data.batches !== undefined) {
      let batchArray: string[] = [];

      if (typeof data.batches === "string") {
        batchArray = [data.batches];
      } else if (Array.isArray(data.batches)) {
        batchArray = data.batches;
      }

      updatedCourse.batches = batchArray.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
    }

    await updatedCourse.save();
    revalidatePath("/admin/courses");
    return { success: true, message: "Course updated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}
