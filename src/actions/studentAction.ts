"use server";
import { connectToDataBase } from "@/db/connection";
import Students from "@/models/Students";
import { generateCustomId } from "@/util/generateCustomId";

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

export async function getStudents(filter = {}) {
  try {
    await connectToDataBase();

    const students = await Students.find(filter)
      .populate({
        path: "studentData.currentBatch",
        model: "Batches",
      })
      .populate({
        path: "studentData.currentCourse",
        model: "Courses",
      });

    return { success: true, students };
  } catch (error: any) {
    console.error("Error fetching students:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
}
