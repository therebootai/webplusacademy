"use server";
import { connectToDataBase } from "@/db/connection";
import Students from "@/models/Students";
import { generateCustomId } from "@/util/generateCustomId";
import mongoose from "mongoose";

export async function createStudent(data: any) {
  try {
    await connectToDataBase();

    if (!data.student_id) {
      data.student_id = await generateCustomId(
        Students,
        "student_id",
        "STUDENTS-"
      );
    }
    const newStudent = new Students(data);
    const savedStudent = await newStudent.save();

    return { success: true, student: JSON.parse(JSON.stringify(savedStudent)) };
  } catch (error: any) {
    console.error("Error creating student:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
}

export async function getStudents({
  page = 1,
  limit = 10,
  mobileNumber,
  studentName,
  currentCourse,
  currentBatch,
}: {
  page?: number;
  limit?: number;
  mobileNumber?: string;
  studentName?: string;
  currentCourse?: string;
  currentBatch?: string;
} = {}) {
  try {
    await connectToDataBase();

    const filter: any = {};

    if (mobileNumber) {
      filter.mobileNumber = { $regex: mobileNumber, $options: "i" };
    }
    if (studentName) {
      filter.studentName = { $regex: studentName, $options: "i" };
    }

    if (currentCourse || currentBatch) {
      filter.studentData = { $elemMatch: {} };
      if (currentCourse) {
        filter.studentData.$elemMatch.currentCourse =
          new mongoose.Types.ObjectId(currentCourse);
      }
      if (currentBatch) {
        filter.studentData.$elemMatch.currentBatch =
          new mongoose.Types.ObjectId(currentBatch);
      }
    }

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    const totalCount = await Students.countDocuments(filter);

    const students = await Students.find(filter)
      .skip(skip)
      .limit(pageSize)
      .populate({
        path: "studentData.currentBatch",
        model: "Batches",
      })
      .populate({
        path: "studentData.currentCourse",
        model: "Courses",
      })
      .lean();

    return {
      success: true,
      data: students,
      pagination: {
        totalCount,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error: any) {
    console.error("Error fetching students:", error);
    return {
      success: false,
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        limit: 10,
        totalPages: 0,
      },
      error: error.message || "Unknown error",
    };
  }
}
