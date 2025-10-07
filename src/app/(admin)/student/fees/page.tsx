import { getAStudentbyId } from "@/actions/studentAction";
import StudentFees from "@/components/guardian/StudentFees";
import StudentTemplate from "@/templates/StudentTemplate";
import { verifyToken } from "@/util/jsonToken";
import { cookies } from "next/headers";

export default async function StudentDashboard({
  searchParams,
}: {
  searchParams: Promise<{ mon: string; year: string }>;
}) {
  const { mon, year } = await searchParams;

  const student = await pageData();

  const studentData = student.studentData[0];

  const courseFees = student.courseFees;

  return (
    <StudentTemplate>
      <div className="flex flex-col gap-6 py-4">
        <h1 className="font-bold lg:text-2xl text-xl text-site-darkgreen">
          Fees Details
        </h1>
        <StudentFees
        student={student}
          studentData={studentData}
          courseFees={courseFees}
          mon={mon}
          year={year}
        />
      </div>
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
