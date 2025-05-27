"use server";
import "@/models/Students";
import "@/models/Batches";
import "@/models/Courses";

import { connectToDataBase } from "@/db/connection";
import Students from "@/models/Students";
import { uploadFile } from "@/util/cloudinary";
import { generateCustomId } from "@/util/generateCustomId";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import { parseImage } from "@/util/parseImage";
import { IStudentType } from "@/types/StudentType";

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

    revalidatePath("/admin/student-management/students");
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
  studentId,
}: {
  page?: number;
  limit?: number;
  mobileNumber?: string;
  studentName?: string;
  currentCourse?: string;
  currentBatch?: string;
  studentId?: string;
} = {}) {
  try {
    await connectToDataBase();

    const filter: any = { $or: [] };

    if (studentId) {
      filter.student_id = studentId;
    }

    if (mobileNumber) {
      filter.$or.push({
        mobileNumber: { $regex: mobileNumber, $options: "i" },
      });
    }
    if (studentName) {
      filter.$or.push({
        studentName: { $regex: studentName, $options: "i" },
      });
    }

    if (currentCourse || currentBatch) {
      filter.studentData = { $elemMatch: {} };

      if (currentCourse && mongoose.Types.ObjectId.isValid(currentCourse)) {
        filter.studentData.$elemMatch.currentCourse =
          new mongoose.Types.ObjectId(currentCourse);
      }

      if (currentBatch && mongoose.Types.ObjectId.isValid(currentBatch)) {
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
      .sort({ studentName: 1 })
      .populate("studentData.currentBatch")
      .populate("studentData.currentCourse")
      .populate("courseFees.currentBatch")
      .populate("courseFees.currentCourse")
      .lean<IStudentType[]>();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(students)),
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

export async function updateStudent(studentId: string, updatedData: any) {
  try {
    await connectToDataBase();

    const updatedStudent = await Students.findOneAndUpdate(
      { student_id: studentId },
      updatedData,
      { new: true }
    ).lean();

    if (!updatedStudent) {
      return { success: false, message: "Student not found" };
    }

    return { success: true, student: updatedStudent };
  } catch (error: any) {
    console.error("Error updating student:", error);
    return { success: false, message: error.message || "Unknown error" };
  }
}

export async function updateCourseFees(
  studentId: string,
  emiId: string,
  paid: boolean
) {
  try {
    await connectToDataBase();

    const updated = await Students.updateOne(
      {
        $or: [
          { student_id: studentId },
          {
            _id: mongoose.Types.ObjectId.isValid(studentId)
              ? studentId
              : undefined,
          },
        ],
        "courseFees.emis._id": emiId,
      },
      { $set: { "courseFees.emis.$.paid": paid } }
    );

    if (updated.modifiedCount === 0) {
      return { success: false, message: "EMI not found or no change made" };
    }
    revalidatePath("/admin/fees");
    return { success: true, message: "EMI updated successfully" };
  } catch (error: any) {
    console.error("Error updating EMI paid status:", error);
    return { success: false, message: error.message || "Unknown error" };
  }
}

export async function updateHostelFees(
  studentId: string,
  studentDataId: string,
  hostelFeeMonth: any,
  receiptFile?: File,
  method: "add" | "remove" = "add"
) {
  try {
    await connectToDataBase();

    if (receiptFile && receiptFile.size > 0) {
      const receiptFilePath = await parseImage(receiptFile);
      const result = await uploadFile(receiptFilePath, receiptFile.type);

      if (result instanceof Error) {
        throw new Error("Failed to upload receipt to Cloudinary");
      }

      hostelFeeMonth.uploadReceipt = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(receiptFilePath);
    }

    const updatedData =
      method === "add"
        ? {
            $push: {
              "studentData.$.hostelFees.monthsDue": hostelFeeMonth,
            },
          }
        : {
            $pull: {
              "studentData.$.hostelFees.monthsDue": hostelFeeMonth,
            },
          };

    const result = await Students.updateOne(
      {
        $or: [
          { student_id: studentId },
          {
            _id: mongoose.Types.ObjectId.isValid(studentId)
              ? studentId
              : undefined,
          },
        ],
        "studentData._id": new mongoose.Types.ObjectId(studentDataId),
      },
      updatedData
    );

    if (result.modifiedCount === 0) {
      return { success: false, message: "Failed to update hostel fees" };
    }

    revalidatePath("/admin/fees");
    return { success: true, message: "Hostel fee month added successfully" };
  } catch (error: any) {
    console.error("Error updating hostel fees:", error);
    return { success: false, message: error.message || "Unknown error" };
  }
}

export async function deleteStudent(studentId: string) {
  try {
    await connectToDataBase();

    const deletedStudent = await Students.findOneAndDelete({
      student_id: studentId,
    });

    if (!deletedStudent) {
      return { success: false, message: "Student not found" };
    }

    return { success: true, message: "Student deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting student:", error);
    return { success: false, message: error.message || "Unknown error" };
  }
}
