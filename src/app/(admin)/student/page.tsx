import { checkTokenAuth } from "@/actions/authAction";
import StudentAttendanceChart from "@/components/guardian/StudentAttendanceChart";
import StudentTemplate from "@/templates/StudentTemplate";

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
    const user = await checkTokenAuth();
    return user.user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
