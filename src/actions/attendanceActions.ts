"use server";

import { connectToDataBase } from "@/db/connection";
import Attendance from "@/models/Attendance";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function createNewAttendance(data: any) {
  try {
    await connectToDataBase();
    const newAttendance = new Attendance(data);
    const savedAttendance = await newAttendance.save();
    revalidatePath("/admin/student-management/batches");
    return { success: true, message: "Attendance created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}
