import { getAStudentbyId } from "@/actions/studentAction";
import StudentAttendanceChart from "@/components/guardian/StudentAttendanceChart";
import StudentTemplate from "@/templates/StudentTemplate";
import { verifyToken } from "@/util/jsonToken";
import { cookies } from "next/headers";

export default async function StudentDashboard() {
  const studentData = await pageData();

  return (
    <StudentTemplate>
      <StudentAttendanceChart
        attendance={studentData.studentData[0].attendance_id}
      />
      <h3 className="text-sm text-center tracking-widest uppercase underline text-site-gray">
        Student Attendance Graph Chart
      </h3>
    </StudentTemplate>
  );
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
