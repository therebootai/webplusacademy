"use server";

import { connectToDataBase } from "@/db/connection";
import Attendance, { AttendanceDocument } from "@/models/Attendance";
import Batches from "@/models/Batches";
import Students from "@/models/Students";
import { generateCustomId } from "@/util/generateCustomId";
import { Types } from "mongoose";

import { revalidatePath } from "next/cache";

export async function createNewAttendance(data: any) {
  try {
    await connectToDataBase();
    const newAttendance = new Attendance(data);
    const savedAttendance = await newAttendance.save();
    await Promise.all([
      Batches.findByIdAndUpdate(data.batch_id, {
        $push: { attendance_list: savedAttendance._id },
      }),
      Students.findByIdAndUpdate(data.student_id, {
        $push: { attendance_id: savedAttendance._id },
      }),
    ]);
    revalidatePath("/admin/student-management/batches");
    return { success: true, message: "Attendance created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function performDailyAttendanceBulkWrite(
  studentsDailyAttendanceRecords: any
) {
  // It's good practice to ensure a connection is established, though often handled by the calling context.
  await connectToDataBase();

  const bulkOperations: any = [];
  const uniqueBatchIds = new Set<string>();
  const uniqueStudentIds = new Set<string>();

  for (const studentRecords of studentsDailyAttendanceRecords) {
    for (const dailyRecord of studentRecords) {
      let batchObjectId: Types.ObjectId;
      let studentObjectId: Types.ObjectId;

      try {
        // Explicitly check for valid ObjectId strings
        if (
          !Types.ObjectId.isValid(dailyRecord.batch_id) ||
          !Types.ObjectId.isValid(dailyRecord.student_id)
        ) {
          console.error(
            `Invalid ObjectId provided for a record: ${JSON.stringify(
              dailyRecord
            )}`
          );
          continue;
        }

        batchObjectId = new Types.ObjectId(dailyRecord.batch_id);
        studentObjectId = new Types.ObjectId(dailyRecord.student_id);

        uniqueBatchIds.add(batchObjectId.toHexString());
        uniqueStudentIds.add(studentObjectId.toHexString());
      } catch (e) {
        console.error(
          `Failed to create ObjectId for record: ${JSON.stringify(
            dailyRecord
          )}`,
          e
        );
        continue;
      }

      const filter = {
        student_id: studentObjectId,
        batch_id: batchObjectId,
        attendance_date: dailyRecord.attendance_date,
        attendance_month: dailyRecord.attendance_month,
        attendance_year: dailyRecord.attendance_year,
      };

      if (dailyRecord.attendance_status === "") {
        bulkOperations.push({
          deleteOne: {
            filter: filter,
          },
        });
      } else {
        const updateData: Partial<AttendanceDocument> = {
          attendance_status: dailyRecord.attendance_status,
          leave_reason:
            dailyRecord.attendance_status === "leave"
              ? dailyRecord.leave_reason
              : null,
          batch_subject: dailyRecord.batch_subject,
        };

        const newAttendanceId = `Attendance_ID-${new Types.ObjectId().toHexString()}`;

        // Use updateOne with upsert to handle both updates and inserts efficiently
        bulkOperations.push({
          updateOne: {
            filter: filter,
            update: {
              $set: updateData,
              // We'll let MongoDB handle _id generation on insert for simplicity and safety
              $setOnInsert: {
                attendance_id: newAttendanceId,
                batch_id: batchObjectId,
                student_id: studentObjectId,
                attendance_date: dailyRecord.attendance_date,
                attendance_month: dailyRecord.attendance_month,
                attendance_year: dailyRecord.attendance_year,
              },
            },
            upsert: true,
          },
        });
      }
    }
  }

  if (bulkOperations.length === 0) {
    return {
      success: true,
      message: "No bulk operations to perform.",
    };
  }

  let bulkResult;
  try {
    bulkResult = await Attendance.bulkWrite(bulkOperations, {
      ordered: false,
    });
  } catch (error: any) {
    throw new Error(`Attendance bulk write failed: ${error.message}`);
  }

  const linkingPromises: Promise<any>[] = [];

  // Prepare and execute batch linking updates
  const batchBulkOps = [];
  for (const batchIdHex of uniqueBatchIds) {
    const batchId = new Types.ObjectId(batchIdHex);
    const currentAttendanceIds = await Attendance.find(
      {
        batch_id: batchId,
      },
      {
        _id: 1,
      }
    ).lean();
    const idsToSet = currentAttendanceIds.map((att) => att._id);
    batchBulkOps.push({
      updateOne: {
        filter: {
          _id: batchId,
        },
        update: {
          $set: {
            attendance_list: idsToSet,
          },
        },
      },
    });
  }

  if (batchBulkOps.length > 0) {
    linkingPromises.push(
      Batches.bulkWrite(batchBulkOps, {
        ordered: false,
      })
    );
  }

  // Prepare and execute student linking updates
  const studentBulkOps = [];
  for (const studentIdHex of uniqueStudentIds) {
    const studentId = new Types.ObjectId(studentIdHex);
    const currentAttendanceIds = await Attendance.find(
      {
        student_id: studentId,
      },
      {
        _id: 1,
      }
    ).lean();
    const idsToSet = currentAttendanceIds.map((att) => att._id);
    studentBulkOps.push({
      updateOne: {
        filter: {
          _id: studentId,
        },
        update: {
          $set: {
            "studentData.$[].attendance_id": idsToSet,
          },
        },
      },
    });
  }

  if (studentBulkOps.length > 0) {
    linkingPromises.push(
      Students.bulkWrite(studentBulkOps, {
        ordered: false,
      })
    );
  }

  try {
    await Promise.all(linkingPromises);
  } catch (error: any) {
    throw new Error(`Batch and student linking failed: ${error.message}`);
  }

  const sanitizedBulkResult = {
    insertedCount: bulkResult.insertedCount,
    matchedCount: bulkResult.matchedCount,
    modifiedCount: bulkResult.modifiedCount,
    deletedCount: bulkResult.deletedCount,
    upsertedCount: bulkResult.upsertedCount,
    // Convert ObjectId objects to strings for serialization
    upsertedIds: Object.fromEntries(
      Object.entries(bulkResult.upsertedIds).map(([key, value]) => [
        key,
        (value as Types.ObjectId).toHexString(),
      ])
    ),
    insertedIds: Object.fromEntries(
      Object.entries(bulkResult.insertedIds).map(([key, value]) => [
        key,
        (value as Types.ObjectId).toHexString(),
      ])
    ),
  };

  return {
    success: true,
    message: "Attendance and linking updated successfully",
    bulkResult: sanitizedBulkResult,
  };
}

export async function getAllAttendance({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "desc",
  batch_id,
  student_id,
  attendance_date,
  attendance_month,
  attendance_year,
  attendance_status,
}: {
  page?: number | string;
  limit?: number | string;
  sort?: string;
  order?: "asc" | "desc";
  batch_id?: string;
  student_id?: string;
  attendance_date?: string | number;
  attendance_month?: string | number;
  attendance_year?: string | number;
  attendance_status?: string;
}) {
  try {
    let filter: {
      batch_id?: string;
      student_id?: string;
      attendance_date?: string | number;
      attendance_month?: string | number;
      attendance_year?: string | number;
      attendance_status?: string;
    } = {};

    if (batch_id) filter.batch_id = batch_id;

    if (student_id) filter.student_id = student_id;

    if (attendance_date) filter.attendance_date = attendance_date;

    if (attendance_month) filter.attendance_month = attendance_month;

    if (attendance_year) filter.attendance_year = attendance_year;

    if (attendance_status) filter.attendance_status = attendance_status;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

    await connectToDataBase();

    const data = await Attendance.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .lean();

    const totalCount = await Attendance.countDocuments(filter);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
      pagination: {
        totalCount,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
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
