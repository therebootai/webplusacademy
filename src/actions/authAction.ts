"use server";
import { connectToDataBase } from "@/db/connection";
import Students from "@/models/Students";
import User from "@/models/User";
import { verifyToken } from "@/util/jsonToken";
import { cookies } from "next/headers";

export async function checkTokenAuth() {
  try {
    await connectToDataBase();

    const cookieStore = await cookies(); // Get cookies from request
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return { success: false, user: null };
    }

    const decodedPayload = verifyToken(token);

    if (
      !decodedPayload ||
      typeof decodedPayload !== "object" ||
      !decodedPayload._id ||
      !decodedPayload.role
    ) {
      // If token is invalid or payload is malformed
      (await cookies()).delete("token");
      return {
        success: false,
        user: null,
      };
    }

    const { _id: userId, role } = decodedPayload;

    let foundUser = null;

    if (role === "admin") {
      // Query the Admin collection if the role is 'admin'
      // Replace 'Admin' with your actual Mongoose Admin model
      foundUser = await User.findById(userId).select("-password"); // Exclude password for security
    } else if (role === "student") {
      // Query the Student collection if the role is 'student'
      // Replace 'Student' with your actual Mongoose Student model
      foundUser = await Students.findById(userId)
        .select("-password")
        .populate("studentData.currentBatch")
        .populate("studentData.currentCourse")
        .populate("studentData.attendance_id")
        .populate("courseFees.currentBatch")
        .populate("courseFees.currentCourse"); // Exclude password for security
    } else {
      // Handle an unknown or unhandled role
      console.warn(`Attempted authentication with unknown role: ${role}`);
      (await cookies()).delete("token");
      return {
        success: false,
        user: null,
      };
    }

    if (!foundUser) {
      // User not found in the respective collection
      (await cookies()).delete("token");
      return { success: false, user: null };
    }

    // Return success with the found user object
    const plainUser = foundUser.toObject();
    return { success: true, user: JSON.parse(JSON.stringify(plainUser)) };
  } catch (error) {
    console.log(error);
    (await cookies()).delete("token");
    return { success: false, user: null };
  }
}
