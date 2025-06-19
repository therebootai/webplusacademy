"use server";
import "@/models/Students";
import "@/models/Batches";
import "@/models/Courses";
import "@/models/Attendance";

import { connectToDataBase } from "@/db/connection";
import Students from "@/models/Students";
import { uploadFile } from "@/util/cloudinary";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import { parseImage } from "@/util/parseImage";
import { IStudentType } from "@/types/StudentType";
import { generateStudentId } from "@/util/generateStudentId";
import { generateToken } from "@/util/jsonToken";
import { cookies } from "next/headers";

export async function createStudent(data: any) {
  try {
    await connectToDataBase();

    if (!data.student_id) {
      data.student_id = await generateStudentId(Students, "student_id", "WAVE");
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
  mon,
  year,
  startDate,
  endDate,
}: {
  page?: number;
  limit?: number;
  mobileNumber?: string;
  studentName?: string;
  currentCourse?: string;
  currentBatch?: string;
  studentId?: string;
  mon?: string;
  year?: number | string;
  startDate?: string;
  endDate?: string;
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

    if (mon && year) {
      filter.studentData = filter.studentData || {};
      filter.studentData.$elemMatch = filter.studentData.$elemMatch || {};
      filter.studentData.$elemMatch["hostelFees.monthsDue"] = {
        $elemMatch: {
          month: mon,
          year: Number(year),
        },
      };
    }

    if (startDate && endDate) {
      const toISO = (d: string) => {
        const separator = d.includes("/") ? "/" : "-";
        const [day, month, year] = d.split(separator);
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      };

      const startISO = toISO(startDate);
      const endISO = toISO(endDate);

      filter.$expr = {
        $and: [
          {
            $gte: [
              {
                $dateFromString: {
                  dateString: {
                    $concat: [
                      { $substr: ["$dateOfAdmission", 6, 4] },
                      "-",
                      { $substr: ["$dateOfAdmission", 3, 2] },
                      "-",
                      { $substr: ["$dateOfAdmission", 0, 2] },
                    ],
                  },
                  format: "%Y-%m-%d",
                },
              },
              new Date(startISO),
            ],
          },
          {
            $lte: [
              {
                $dateFromString: {
                  dateString: {
                    $concat: [
                      { $substr: ["$dateOfAdmission", 6, 4] },
                      "-",
                      { $substr: ["$dateOfAdmission", 3, 2] },
                      "-",
                      { $substr: ["$dateOfAdmission", 0, 2] },
                    ],
                  },
                  format: "%Y-%m-%d",
                },
              },
              new Date(endISO),
            ],
          },
        ],
      };
    }

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    const totalCount = await Students.countDocuments(filter);

    const students = await Students.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("studentData.currentBatch")
      .populate("studentData.currentCourse")
      .populate("studentData.attendance_id")
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
      {
        $or: [
          { student_id: studentId },
          {
            _id: mongoose.Types.ObjectId.isValid(studentId)
              ? studentId
              : undefined,
          },
        ],
      },
      updatedData,
      { new: true }
    ).lean();

    if (!updatedStudent) {
      return { success: false, message: "Student not found" };
    }

    return {
      success: true,
      student: JSON.parse(JSON.stringify(updatedStudent)),
    };
  } catch (error: any) {
    console.error("Error updating student:", error);
    return { success: false, message: error.message || "Unknown error" };
  }
}

export async function updateCourseFees(
  studentId: string,
  emiId: string,
  updateData: Partial<{
    paid: boolean | string;
    due: string;
    remarks: string;
    scholarship: string;
    amount: number;
    uploadReceipt?: { public_id: string; secure_url: string };
  }>,
  receiptFile?: File
) {
  try {
    await connectToDataBase();

    if (receiptFile && receiptFile.size > 0) {
      const receiptFilePath = await parseImage(receiptFile);
      const result = await uploadFile(receiptFilePath, receiptFile.type);

      if (result instanceof Error) {
        throw new Error("Failed to upload receipt to Cloudinary");
      }

      updateData.uploadReceipt = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(receiptFilePath);
    }

    const setObj: any = {};
    for (const key in updateData) {
      setObj[`courseFees.$[].emis.$[emi].${key}`] = (updateData as any)[key];
    }

    const updateResult = await Students.updateOne(
      {
        $or: [
          { student_id: studentId },
          {
            _id: mongoose.Types.ObjectId.isValid(studentId)
              ? new mongoose.Types.ObjectId(studentId)
              : undefined,
          },
        ],
        "courseFees.emis._id": new mongoose.Types.ObjectId(emiId),
      },
      {
        $set: setObj,
      },
      {
        arrayFilters: [{ "emi._id": new mongoose.Types.ObjectId(emiId) }],
      }
    );

    if (updateResult.modifiedCount === 0) {
      return { success: false, message: "EMI not found or no change made" };
    }

    return { success: true, message: "EMI updated successfully" };
  } catch (error: any) {
    console.error("Error updating EMI:", error);
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

    if (method === "add") {
      const updateResult = await Students.updateOne(
        {
          _id: new mongoose.Types.ObjectId(studentId),
          "studentData._id": new mongoose.Types.ObjectId(studentDataId),
          "studentData.hostelFees.monthsDue.month": hostelFeeMonth.month,
          "studentData.hostelFees.monthsDue.year": +hostelFeeMonth.year,
        },
        {
          $set: {
            "studentData.$[sd].hostelFees.monthsDue.$[md]": hostelFeeMonth,
          },
        },
        {
          arrayFilters: [
            { "sd._id": new mongoose.Types.ObjectId(studentDataId) },
            {
              "md.month": hostelFeeMonth.month,
              "md.year": +hostelFeeMonth.year,
            },
          ],
        }
      );

      console.log("Update result:", updateResult);
      if (updateResult.matchedCount === 0) {
        console.log(
          "No existing monthDue found for update, attempting to push new monthDue..."
        );

        const pushResult = await Students.updateOne(
          {
            _id: new mongoose.Types.ObjectId(studentId),
            "studentData._id": new mongoose.Types.ObjectId(studentDataId),
          },
          {
            $push: {
              "studentData.$[sd].hostelFees.monthsDue": hostelFeeMonth,
            },
          },
          {
            arrayFilters: [
              { "sd._id": new mongoose.Types.ObjectId(studentDataId) },
            ],
          }
        );
        console.log("Push result:", pushResult);

        if (pushResult.modifiedCount === 0) {
          console.error(
            "Failed to add new hostel fee month - push operation did not modify any document"
          );
          throw new Error("Failed to add new hostel fee month");
        }
      }
    } else if (method === "remove") {
      const removeResult = await Students.updateOne(
        {
          _id: new mongoose.Types.ObjectId(studentId),
          "studentData._id": new mongoose.Types.ObjectId(studentDataId),
        },
        {
          $pull: {
            "studentData.$.hostelFees.monthsDue": hostelFeeMonth,
          },
        }
      );

      if (removeResult.modifiedCount === 0) {
        throw new Error("Failed to remove hostel fee month");
      }
    }

    return { success: true, message: "Hostel fee month updated successfully" };
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

export async function loginStudent(phone: string, password: string) {
  try {
    await connectToDataBase();

    if (!phone) {
      return { success: false, data: null, message: "All fields are required" };
    }

    const user = await Students.findOne({ mobileNumber: phone })
      .populate("studentData.currentBatch")
      .populate("studentData.currentCourse")
      .populate("studentData.attendance_id")
      .populate("courseFees.currentBatch")
      .populate("courseFees.currentCourse");

    if (!user || !(await user.matchPassword(password))) {
      return { success: false, data: null, message: "Credentials mismatch" };
    }

    const plainUser = user.toObject();

    const token = generateToken({ ...plainUser });

    const cookieStore = await cookies();
    cookieStore.set("token", token ?? "");

    return { success: true, data: JSON.parse(JSON.stringify(plainUser)) };
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
  }
}

export async function logoutStudent() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
