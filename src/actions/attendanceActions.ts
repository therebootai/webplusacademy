"use server";

import { connectToDataBase } from "@/db/connection";
import Attendance from "@/models/Attendance";
import Batches from "@/models/Batches";
import Students from "@/models/Students";

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

// export async function performDailyAttendanceBulkWrite(
//   studentsDailyAttendanceRecords: any
// ) {
//   await connectToDataBase();

//   const bulkOperations = [];
//   const uniqueBatchIds = new Set<string>();
//   const uniqueStudentIds = new Set<string>();

//   for (const studentRecords of studentsDailyAttendanceRecords) {
//     for (const dailyRecord of studentRecords) {
//       let batchObjectId: Types.ObjectId;
//       let studentObjectId: Types.ObjectId;

//       try {
//         batchObjectId = new Types.ObjectId(dailyRecord.batch_id);
//         studentObjectId = new Types.ObjectId(dailyRecord.student_id);

//         uniqueBatchIds.add(batchObjectId.toHexString());
//         uniqueStudentIds.add(studentObjectId.toHexString());
//       } catch (e) {
//         console.error(e);
//         continue;
//       }

//       const filter = {
//         student_id: studentObjectId,
//         batch_id: batchObjectId,
//         attendance_date: dailyRecord.attendance_date,
//         attendance_month: dailyRecord.attendance_month,
//         attendance_year: dailyRecord.attendance_year,
//       };

//       if (dailyRecord.attendance_status === "") {
//         bulkOperations.push({
//           deleteOne: {
//             filter: filter,
//           },
//         });
//       } else {
//         const existingAttendance = await Attendance.findOne(filter).lean();

//         const updateData: Partial<AttendanceDocument> = {
//           attendance_status: dailyRecord.attendance_status,
//           leave_reason:
//             dailyRecord.attendance_status === "leave"
//               ? dailyRecord.leave_reason
//               : null,
//           batch_subject: dailyRecord.batch_subject,
//         };

//         if (existingAttendance) {
//           bulkOperations.push({
//             updateOne: {
//               filter: filter,
//               update: { $set: updateData },
//             },
//           });
//         } else {
//           const latestRecord = await Attendance.findOne(
//             {},
//             { attendance_id: 1 }
//           )
//             .sort({ attendance_id: -1 })
//             .lean();

//           let lastNumber = latestRecord
//             ? parseInt(
//                 (latestRecord.attendance_id as string).replace(
//                   "Attendance_ID-",
//                   ""
//                 ),
//                 10
//               )
//             : 0;
//           const newAttendanceId = await generateCustomId(
//             Attendance,
//             "attendance_id",
//             "Attendance_ID-",
//             ++lastNumber
//           );

//           bulkOperations.push({
//             insertOne: {
//               document: {
//                 attendance_id: newAttendanceId,
//                 batch_id: batchObjectId,
//                 student_id: studentObjectId,
//                 attendance_date: dailyRecord.attendance_date,
//                 attendance_month: dailyRecord.attendance_month,
//                 attendance_year: dailyRecord.attendance_year,
//                 attendance_status: updateData.attendance_status,
//                 leave_reason: updateData.leave_reason,
//                 batch_subject: updateData.batch_subject,
//               } as AttendanceDocument,
//             },
//           });
//         }
//       }
//     }
//   }

//   if (bulkOperations.length === 0) {
//     console.log("No bulk operations to perform.");
//     return { success: true, message: "No bulk operations to perform" };
//   }

//   let bulkResult;
//   try {
//     bulkResult = await Attendance.bulkWrite(bulkOperations);
//   } catch (error: any) {
//     throw new Error(`Attendance bulk write failed: ${error.message}`);
//   }

//   const linkingPromises: Promise<any>[] = [];

//   for (const batchIdHex of uniqueBatchIds) {
//     const batchId = new mongoose.Types.ObjectId(batchIdHex);
//     linkingPromises.push(
//       (async () => {
//         const currentAttendanceIds = await Attendance.find(
//           { batch_id: batchId },
//           { _id: 1 }
//         ).lean();
//         const idsToSet = currentAttendanceIds.map((att) => att._id);

//         return Batches.findByIdAndUpdate(
//           batchId,
//           { $set: { attendance_list: idsToSet } },
//           { new: true, upsert: false }
//         );
//       })()
//     );
//   }

//   for (const studentIdHex of uniqueStudentIds) {
//     const studentId = new mongoose.Types.ObjectId(studentIdHex);
//     linkingPromises.push(
//       (async () => {
//         const currentAttendanceIds = await Attendance.find(
//           { student_id: studentId },
//           { _id: 1 }
//         ).lean();
//         const idsToSet = currentAttendanceIds.map((att) => att._id);

//         return Students.findByIdAndUpdate(
//           studentId,
//           { $set: { "studentData.$[].attendance_id": idsToSet } },
//           { new: true, upsert: false }
//         );
//       })()
//     );
//   }

//   try {
//     await Promise.all(linkingPromises);
//     console.log(
//       "Batch and student linking successful for all batches and students"
//     );
//   } catch (error: any) {
//     console.error("Batch and student linking failed:", error);
//     throw new Error(`Batch and student linking failed: ${error.message}`);
//   }

//   return {
//     success: true,
//     message: "Attendance updated successfully",
//   };
// }

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
