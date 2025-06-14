"use server";

import { connectToDataBase } from "@/db/connection";
import Attendance from "@/models/Attendance";
import Batches from "@/models/Batches";
import Students from "@/models/Students";
import mongoose from "mongoose";
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

