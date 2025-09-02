import { getAStudentbyId } from "@/actions/studentAction";
import StudentTemplate from "@/templates/StudentTemplate";
import { verifyToken } from "@/util/jsonToken";
import { cookies } from "next/headers";

export default async function StudentDashboard() {
  const studentData = await pageData();

  return <StudentTemplate></StudentTemplate>;
}

async function pageData() {
  try {
    const cookieStore = await cookies(); // Get cookies from request
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return { success: false, user: null };
    }

    const decodedPayload = verifyToken(token);

    if (
      !decodedPayload ||
      typeof decodedPayload !== "object" ||
      !decodedPayload._id
    ) {
      return { success: false, user: null };
    }

    const user = await getAStudentbyId(decodedPayload?._id);
    return { ...user.student };
  } catch (err) {
    console.log(err);
    return null;
  }
}
