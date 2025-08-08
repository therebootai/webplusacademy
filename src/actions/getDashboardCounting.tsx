import { connectToDataBase } from "@/db/connection";
import Batches from "@/models/Batches";
import Courses from "@/models/Courses";
import Students from "@/models/Students";

export async function getDashboardCounting() {
  await connectToDataBase();

  // Count students, batches, and courses
  const totalStudentPromise = Students.countDocuments();
  const totalBatchPromise = Batches.countDocuments();
  const totalCoursePromise = Courses.countDocuments();

  // Calculate total due
  const students = await Students.find({}, { courseFees: 1 }).lean();
  let totalDue = 0;
  for (const student of students) {
    for (const feeObj of student.courseFees ?? []) {
      for (const emi of feeObj.emis ?? []) {
        totalDue += emi?.totalDue ?? 0;
      }
    }
  }

  const [totalStudent, totalBatch, totalCourse] = await Promise.all([
    totalStudentPromise,
    totalBatchPromise,
    totalCoursePromise,
  ]);

  return {
    totalStudent,
    totalBatch,
    totalCourse,
    totalDue,
  };
}
